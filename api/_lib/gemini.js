import { GoogleGenAI } from '@google/genai'
import { recipeSchema } from './recipeSchema.js'
import { systemPrompt } from './systemPrompt.js'

// Current stable Flash model (checked in the Gemini docs, Oct 2026)
const MODEL = 'gemini-3.8-flash'
const TIMEOUT_MS = 25_000
const MAX_OUTPUT_TOKENS = 2048

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
      model: MODEL,
      input,
      system_instruction: systemPrompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: recipeSchema,
      },
      generation_config: { max_output_tokens: MAX_OUTPUT_TOKENS },
      // Do not store the request (and the image) on Google's side
      store: false,
    },
    { timeout_ms: TIMEOUT_MS },
  )

  return JSON.parse(interaction.output_text)
}
