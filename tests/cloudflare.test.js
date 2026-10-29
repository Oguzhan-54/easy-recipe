import { beforeEach, describe, expect, it, vi } from 'vitest'

const { analyzeDishCloudflare } = await import('../api/_lib/cloudflare.js')
const { AiQuotaError } = await import('../api/_lib/gemini.js')

const recipe = {
  isFood: true,
  dishName: 'Pasta',
  ingredients: [{ name: 'Spaghetti', amount: 200, unit: 'g' }],
  steps: [{ number: 1, title: 'Kochen', text: 'Nudeln kochen.' }],
}
const input = { image: 'aGVsbG8=', mimeType: 'image/jpeg', description: '' }

// Replaces fetch with a Cloudflare answer: { result: { response: <text> } }
function answer(text, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { success: status === 200, result: { response: text } },
          { status },
        ),
      ),
  )
}

describe('analyzeDishCloudflare', () => {
  beforeEach(() => vi.unstubAllGlobals())

  it('parses JSON wrapped in a Markdown code block', async () => {
    answer('```json\n' + JSON.stringify(recipe) + '\n```')
    await expect(analyzeDishCloudflare(input)).resolves.toEqual(recipe)
  })

  it('parses plain JSON and sends the image as data URI', async () => {
    answer(JSON.stringify(recipe))
    await analyzeDishCloudflare(input)
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.messages[1].content[1].image_url.url).toBe(
      'data:image/jpeg;base64,aGVsbG8=',
    )
  })

  it('throws AiQuotaError on 429', async () => {
    answer('', 429)
    await expect(analyzeDishCloudflare(input)).rejects.toBeInstanceOf(
      AiQuotaError,
    )
  })

  it('throws on broken JSON or missing fields', async () => {
    answer('{"isFood": true, "dishName": "Pas')
    await expect(analyzeDishCloudflare(input)).rejects.toThrow('not valid JSON')
    answer(JSON.stringify({ isFood: true, dishName: 'Pasta' }))
    await expect(analyzeDishCloudflare(input)).rejects.toThrow(
      'required fields',
    )
  })
})
