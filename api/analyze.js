import { AiQuotaError, analyzeDish } from './_lib/gemini.js'
import { analyzeDishMock, getMockMode } from './_lib/mockAi.js'
import { validateAnalyzeRequest } from './_lib/validateRequest.js'

// POST /api/analyze  –  body: { image, mimeType, description }
// Only POST is exported, so Vercel answers other methods with 405 itself.
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return errorResponse(
      400,
      'INVALID_JSON',
      'Die Anfrage enthält kein gültiges JSON.',
    )
  }

  const validationError = validateAnalyzeRequest(body)
  if (validationError) {
    return errorResponse(400, validationError.code, validationError.message)
  }

  const { image, mimeType, description = '' } = body

  try {
    // In mock mode (local development) a stored answer is returned instead of calling Gemini
    const mockMode = getMockMode()
    const recipe = mockMode
      ? await analyzeDishMock(mockMode)
      : await analyzeDish({ image, mimeType, description: description.trim() })
    return Response.json(recipe)
  } catch (error) {
    // Only log the error message – never the image or the full request
    console.error('Gemini request failed:', error.message)
    if (error instanceof AiQuotaError) {
      return errorResponse(
        429,
        'AI_QUOTA_EXHAUSTED',
        'Die KI ist gerade ausgelastet oder das Tageslimit ist erreicht. Bitte versuche es später noch einmal.',
      )
    }
    return errorResponse(
      502,
      'AI_FAILED',
      'Die Analyse ist fehlgeschlagen. Bitte versuche es erneut.',
    )
  }
}

// Uniform error format (see CLAUDE.md, section 10)
function errorResponse(status, code, message) {
  return Response.json({ error: { code, message } }, { status })
}
