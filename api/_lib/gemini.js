import { GoogleGenAI } from '@google/genai'
import { recipeSchema } from './recipeSchema.js'
import { systemPrompt } from './systemPrompt.js'

// Stable Flash model (checked in the Gemini docs, Oct 2026). gemini-3.8-flash is newer,
// but often overloaded (503 "high demand"), so it is only used if set via GEMINI_MODEL.
const DEFAULT_MODEL = 'gemini-3.6-flash'
const TIMEOUT_MS = 25_000
// The model "thinks" before answering, and these thought tokens count towards this limit.
// With the default thinking level it sometimes used up to ~2000 tokens just for thinking,
// so the recipe JSON got cut off. "low" keeps thinking short (~100–350 tokens in tests).
const THINKING_LEVEL = 'low'
const MAX_OUTPUT_TOKENS = 4096

// Sends the image (and optional description) to Gemini and returns the parsed recipe object.
export async function analyzeDish({ image, mimeType, description }) {
  // The SDK reads GEMINI_API_KEY from process.env automatically
  const client = new GoogleGenAI({})

  const input = [{ type: 'image', data: image, mime_type: mimeType }]
  if (description) {
    // Clearly marked as user info, so the model does not treat it as an instruction
    input.push({
      type: 'text',
      text: `Beschreibung des Nutzers: """${description}"""`,
    })
  }

  const interaction = await client.interactions.create(
    {
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      input,
      system_instruction: systemPrompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: recipeSchema,
      },
      generation_config: {
        max_output_tokens: MAX_OUTPUT_TOKENS,
        thinking_level: THINKING_LEVEL,
      },
      // Do not store the request (and the image) on Google's side
      store: false,
    },
    {
      timeout_ms: TIMEOUT_MS,
      // No automatic SDK retries: under `vercel dev` the retried request fails with
      // "TypeError: unusable", and each retry costs quota (free tier: 5 requests/minute).
      retries: { strategy: 'none' },
    },
  )

  // "incomplete" means the answer was cut off (e.g. token limit reached) – the JSON would be broken
  if (interaction.status !== 'completed') {
    throw new Error(`Gemini response is ${interaction.status}`)
  }

  return JSON.parse(interaction.output_text)
}
