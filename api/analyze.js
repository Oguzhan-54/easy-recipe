import { analyzeDish } from './_lib/gemini.js'
import { analyzeDishMock, getMockMode } from './_lib/mockAi.js'

// POST /api/analyze  –  body: { image, mimeType, description }
// Full input validation, rate limiting and error codes follow in phase 5.
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

  const { image, mimeType, description = '' } = body
  if (!image || !mimeType) {
    return errorResponse(400, 'MISSING_IMAGE', 'Bitte ein Bild mitschicken.')
  }

  try {
    // In mock mode (local development) a stored answer is returned instead of calling Gemini
    const mockMode = getMockMode()
    const recipe = mockMode
      ? await analyzeDishMock(mockMode)
      : await analyzeDish({ image, mimeType, description })
    return Response.json(recipe)
  } catch (error) {
    // Only log the error message – never the image or the full request
    console.error('Gemini request failed:', error.message)
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
