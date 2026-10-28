import { beforeEach, describe, expect, it, vi } from 'vitest'

// Replace the AI and the rate limit, so the test checks only the endpoint itself
vi.mock('../api/_lib/gemini.js', async (importOriginal) => ({
  ...(await importOriginal()),
  analyzeDish: vi.fn(),
}))
vi.mock('../api/_lib/rateLimit.js', () => ({ checkRateLimit: vi.fn() }))

const { POST } = await import('../api/analyze.js')
const { AiQuotaError, analyzeDish } = await import('../api/_lib/gemini.js')
const { checkRateLimit } = await import('../api/_lib/rateLimit.js')

const validBody = { image: 'aGVsbG8=', mimeType: 'image/jpeg', description: '' }

function post(body) {
  return POST(
    new Request('http://localhost/api/analyze', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )
}

describe('POST /api/analyze', () => {
  beforeEach(() => {
    vi.stubEnv('MOCK_AI', '')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    analyzeDish.mockReset()
    checkRateLimit.mockReset().mockResolvedValue(null)
  })

  it('returns the recipe and checks the limit for the visitor IP', async () => {
    analyzeDish.mockResolvedValue({ isFood: false })
    const response = await post(validBody)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ isFood: false })
    expect(checkRateLimit).toHaveBeenCalledWith('1.2.3.4')
  })

  it('rejects broken JSON and invalid input before the limit and the AI', async () => {
    expect((await post('not json')).status).toBe(400)
    const response = await post({ ...validBody, mimeType: 'image/gif' })
    expect(response.status).toBe(400)
    expect((await response.json()).error.code).toBe('INVALID_IMAGE_TYPE')
    expect(checkRateLimit).not.toHaveBeenCalled()
    expect(analyzeDish).not.toHaveBeenCalled()
  })

  it('answers 429 when the rate limit is reached, without calling the AI', async () => {
    checkRateLimit.mockResolvedValue({ code: 'RATE_LIMITED', message: 'Limit' })
    const response = await post(validBody)
    expect(response.status).toBe(429)
    expect((await response.json()).error.code).toBe('RATE_LIMITED')
    expect(analyzeDish).not.toHaveBeenCalled()
  })

  it('answers 429 when every Gemini model is used up', async () => {
    analyzeDish.mockRejectedValue(new AiQuotaError('quota'))
    const response = await post(validBody)
    expect(response.status).toBe(429)
    expect((await response.json()).error.code).toBe('AI_QUOTA_EXHAUSTED')
  })

  it('answers 502 when the AI fails', async () => {
    analyzeDish.mockRejectedValue(new Error('boom'))
    const response = await post(validBody)
    expect(response.status).toBe(502)
    expect((await response.json()).error.code).toBe('AI_FAILED')
  })
})
