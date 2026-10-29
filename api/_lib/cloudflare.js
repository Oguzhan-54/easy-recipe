import { AiQuotaError, isValidRecipe } from './gemini.js'
import { recipeSchema } from './recipeSchema.js'
import { systemPrompt } from './systemPrompt.js'

// Main AI: Cloudflare Workers AI (checked in the Cloudflare docs, Oct 2026).
// Free tier: 10,000 neurons per day, one analysis costs ~90–110 (measured).
const MODEL = '@cf/mistralai/mistral-small-3.1-24b-instruct'
// Answers took 13–17 s in tests. After this, the Gemini fallback still has time (see analyze.js).
const TIMEOUT_MS = 25_000
const MAX_TOKENS = 2048
// Forced JSON (guided_json / response_format) does not work with this model: it is ignored or
// the model only produces spaces. So the schema goes into the prompt and the answer is checked.
const instructions = `${systemPrompt}\n\nJSON-Schema der Antwort:\n${JSON.stringify(recipeSchema)}`
// The model wraps its JSON in a Markdown code block (```json ... ```)
const CODE_FENCE = /^\s*```(json)?\s*|\s*```\s*$/g

// Sends the image (and optional description) to Cloudflare and returns the parsed recipe object.
// One attempt only: if it fails, analyze.js falls back to Gemini.
export async function analyzeDishCloudflare({ image, mimeType, description }) {
  const content = [
    { type: 'text', text: 'Erkenne das Gericht auf dem Foto.' },
    {
      type: 'image_url',
      image_url: { url: `data:${mimeType};base64,${image}` },
    },
  ]
  if (description) {
    // Clearly marked as user info, so the model does not treat it as an instruction
    content.push({
      type: 'text',
      text: `Beschreibung des Nutzers: """${description}"""`,
    })
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: instructions },
          { role: 'user', content },
        ],
        max_tokens: MAX_TOKENS,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  )

  // shortcut: assumes Cloudflare answers 429 when the daily neurons are used up (not documented),
  // check the logs once the limit is really reached
  if (response.status === 429) {
    throw new AiQuotaError('Cloudflare quota used up')
  }
  if (!response.ok) {
    throw new Error(`Cloudflare answered ${response.status}`)
  }

  let recipe
  try {
    const { result } = await response.json()
    recipe = JSON.parse(result.response.replace(CODE_FENCE, ''))
  } catch {
    // Also happens when the answer was cut off at MAX_TOKENS
    throw new Error('Cloudflare response is not valid JSON')
  }
  if (!isValidRecipe(recipe)) {
    throw new Error('Cloudflare response misses required fields')
  }
  return recipe
}
