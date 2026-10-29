import { GoogleGenAI } from '@google/genai'
import { AiQuotaError, isValidRecipe, recipeSchema } from './recipeSchema.js'
import { systemPrompt } from './systemPrompt.js'

// Models in order of preference (checked in the Gemini docs, Oct 2026). Every model has its own
// free quota, so if one is overloaded or used up, the next one takes over.
// gemini-3.8-flash is newer, but often overloaded (503), so it is only used if set via GEMINI_MODEL.
const FALLBACK_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite']
const DEFAULT_MODEL = 'gemini-3.6-flash'
const TIMEOUT_MS = 25_000
// Runs after a failed Cloudflare attempt (up to 25 s), both together must finish before the frontend gives up (70 s)
const TOTAL_TIME_BUDGET_MS = 30_000
// Short pause before trying the same model again (it is often only briefly overloaded)
const RETRY_DELAY_MS = 1500
const ATTEMPTS_PER_MODEL = 2
// The model "thinks" before answering, and these thought tokens count towards this limit.
// With the default thinking level it sometimes used up to ~2000 tokens just for thinking,
// so the recipe JSON got cut off. "low" keeps thinking short (~100–350 tokens in tests).
const THINKING_LEVEL = 'low'
const MAX_OUTPUT_TOKENS = 4096

// The model answered, but not with a usable recipe (cut off, broken JSON, missing fields)
class InvalidResponseError extends Error {}

// Sends the image (and optional description) to Gemini and returns the parsed recipe object.
// Tries each model up to twice; see nextStep() for which errors are worth another try.
export async function analyzeDish({ image, mimeType, description }) {
  // The SDK reads GEMINI_API_KEY from process.env automatically
  const client = new GoogleGenAI({})
  const input = buildInput({ image, mimeType, description })
  const models = [
    ...new Set([process.env.GEMINI_MODEL || DEFAULT_MODEL, ...FALLBACK_MODELS]),
  ]
  const deadline = Date.now() + TOTAL_TIME_BUDGET_MS
  let onlyRateLimited = true
  let lastError

  for (const model of models) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
      const timeLeft = deadline - Date.now()
      if (timeLeft < 5000) throw lastError

      try {
        return await requestRecipe(client, model, input, timeLeft)
      } catch (error) {
        lastError = error
        // Only the message – never the image or the request
        console.warn(`Gemini ${model} (attempt ${attempt}):`, error.message)
        if (error.status !== 429) onlyRateLimited = false

        const step = nextStep(error)
        if (step === 'fail') throw error
        if (step === 'next-model' || attempt === ATTEMPTS_PER_MODEL) break
        await wait(RETRY_DELAY_MS)
      }
    }
  }

  if (onlyRateLimited)
    throw new AiQuotaError('All Gemini models are rate limited')
  throw lastError
}

// What to do after a failed attempt: 'retry' the same model, try the 'next-model', or 'fail'.
// Error codes: https://ai.google.dev/gemini-api/docs/api-errors
function nextStep(error) {
  if (error instanceof InvalidResponseError) return 'retry'
  // 429: limit of this model reached; 404: model not available (any more)
  if (error.status === 429 || error.status === 404) return 'next-model'
  // 500/503: overloaded or a hiccup on Google's side, usually gone after a moment
  if (error.status >= 500) return 'retry'
  // No status: timeout or network problem – another model is the better bet
  if (error.status === undefined) return 'next-model'
  // 400/401/403: our request or API key is wrong, other models would fail the same way
  return 'fail'
}

function buildInput({ image, mimeType, description }) {
  const input = [{ type: 'image', data: image, mime_type: mimeType }]
  if (description) {
    // Clearly marked as user info, so the model does not treat it as an instruction
    input.push({
      type: 'text',
      text: `Notiz des Nutzers: """${description}"""`,
    })
  }
  return input
}

async function requestRecipe(client, model, input, timeLeft) {
  const interaction = await client.interactions.create(
    {
      model,
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
      timeout_ms: Math.min(TIMEOUT_MS, timeLeft),
      // No automatic SDK retries: under `vercel dev` the retried request fails with
      // "TypeError: unusable". analyzeDish() retries with a fresh request instead.
      retries: { strategy: 'none' },
    },
  )

  // "incomplete" means the answer was cut off (e.g. token limit reached) – the JSON would be broken
  if (interaction.status !== 'completed') {
    throw new InvalidResponseError(`Gemini response is ${interaction.status}`)
  }

  let recipe
  try {
    recipe = JSON.parse(interaction.output_text)
  } catch {
    throw new InvalidResponseError('Gemini response is not valid JSON')
  }
  if (!isValidRecipe(recipe)) {
    throw new InvalidResponseError('Gemini response misses required fields')
  }
  return recipe
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
