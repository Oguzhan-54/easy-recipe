import { describe, expect, it } from 'vitest'
import { validateAnalyzeRequest } from '../api/_lib/validateRequest.js'

const valid = { image: 'aGVsbG8=', mimeType: 'image/jpeg', description: '' }

function codeFor(body) {
  return validateAnalyzeRequest(body)?.code ?? null
}

describe('validateAnalyzeRequest', () => {
  it('accepts a valid request, with or without description', () => {
    expect(codeFor(valid)).toBeNull()
    expect(codeFor({ image: valid.image, mimeType: 'image/png' })).toBeNull()
  })

  it('rejects a missing body or image', () => {
    expect(codeFor(null)).toBe('INVALID_REQUEST')
    expect(codeFor({ ...valid, image: '' })).toBe('MISSING_IMAGE')
    expect(codeFor({ ...valid, image: 123 })).toBe('MISSING_IMAGE')
  })

  it('rejects other file types', () => {
    expect(codeFor({ ...valid, mimeType: 'image/gif' })).toBe(
      'INVALID_IMAGE_TYPE',
    )
    expect(codeFor({ ...valid, mimeType: 'text/html' })).toBe(
      'INVALID_IMAGE_TYPE',
    )
  })

  it('rejects images that are too large or not Base64', () => {
    expect(codeFor({ ...valid, image: 'A'.repeat(3_000_001) })).toBe(
      'IMAGE_TOO_LARGE',
    )
    expect(codeFor({ ...valid, image: '<script>' })).toBe('INVALID_IMAGE')
  })

  it('rejects a description that is too long or not text', () => {
    expect(codeFor({ ...valid, description: 'a'.repeat(301) })).toBe(
      'DESCRIPTION_TOO_LONG',
    )
    expect(codeFor({ ...valid, description: { text: 'x' } })).toBe(
      'INVALID_DESCRIPTION',
    )
  })
})
