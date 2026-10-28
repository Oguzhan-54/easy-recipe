// Checks the body of POST /api/analyze. The frontend checks too, but anyone can call
// the API directly (e.g. with curl), so the backend must not trust the browser.

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// Base64 length, ≈ 2.2 MB image. Resized photos from the frontend are ~100–300 KB.
const MAX_IMAGE_LENGTH = 3_000_000
const MAX_DESCRIPTION_LENGTH = 300
const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/

// Returns { code, message } for the error response, or null if the body is fine.
export function validateAnalyzeRequest(body) {
  if (!body || typeof body !== 'object') {
    return error('INVALID_REQUEST', 'Die Anfrage ist ungültig.')
  }

  const { image, mimeType, description } = body

  if (typeof image !== 'string' || image.length === 0) {
    return error('MISSING_IMAGE', 'Bitte ein Bild mitschicken.')
  }
  if (!ALLOWED_TYPES.includes(mimeType)) {
    return error(
      'INVALID_IMAGE_TYPE',
      'Bitte ein Foto im Format JPG, PNG oder WebP verwenden.',
    )
  }
  if (image.length > MAX_IMAGE_LENGTH) {
    return error('IMAGE_TOO_LARGE', 'Das Foto ist zu groß.')
  }
  if (!BASE64_PATTERN.test(image)) {
    return error('INVALID_IMAGE', 'Das Foto konnte nicht gelesen werden.')
  }
  if (description !== undefined && typeof description !== 'string') {
    return error('INVALID_DESCRIPTION', 'Die Beschreibung ist ungültig.')
  }
  if (description && description.length > MAX_DESCRIPTION_LENGTH) {
    return error(
      'DESCRIPTION_TOO_LONG',
      `Die Beschreibung darf höchstens ${MAX_DESCRIPTION_LENGTH} Zeichen lang sein.`,
    )
  }

  return null
}

function error(code, message) {
  return { code, message }
}
