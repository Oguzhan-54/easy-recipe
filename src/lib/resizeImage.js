// Image checks and resizing happen in the browser, before anything is sent to the backend.
// Phone photos are often 5+ MB, but a Vercel request body may only be ~4.5 MB.

export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// Upper limit for the original file (before resizing), protects the browser from huge files
const MAX_FILE_SIZE = 20 * 1024 * 1024
// Longest side after resizing – enough for Gemini to recognize a dish
const MAX_DIMENSION = 1024
const OUTPUT_TYPE = 'image/jpeg'
const JPEG_QUALITY = 0.8

// Returns a German error message for the UI, or null if the file is fine.
export function validateImageFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Bitte ein Foto im Format JPG, PNG oder WebP auswählen.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'Das Foto ist zu groß (maximal 20 MB).'
  }
  return null
}

// Scales the image down (never up), converts it to JPEG and returns it as Base64.
export async function resizeImage(file) {
  // createImageBitmap also respects the photo orientation (EXIF), so portrait photos stay upright
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
  )
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  // White background, otherwise transparent PNG areas would turn black in the JPEG
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  // A data URL looks like "data:image/jpeg;base64,/9j/4AAQ..." – the part after the comma is Base64
  const dataUrl = canvas.toDataURL(OUTPUT_TYPE, JPEG_QUALITY)
  return {
    base64: dataUrl.split(',')[1],
    mimeType: OUTPUT_TYPE,
    previewUrl: dataUrl,
  }
}
