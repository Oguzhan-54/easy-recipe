import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Replace the Gemini SDK: each test decides what interactions.create() returns
const create = vi.fn()
vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    interactions = { create }
  },
}))

const { analyzeDish } = await import('../api/_lib/gemini.js')
const { AiQuotaError, isValidRecipe } =
  await import('../api/_lib/recipeSchema.js')

const recipe = {
  isFood: true,
  dishName: 'Pasta',
  ingredients: [{ name: 'Spaghetti', amount: 200, unit: 'g' }],
  steps: [{ number: 1, title: 'Kochen', text: 'Nudeln kochen.' }],
}
const ok = { status: 'completed', output_text: JSON.stringify(recipe) }
const httpError = (status) => Object.assign(new Error(`${status}`), { status })
const input = { image: 'aGVsbG8=', mimeType: 'image/jpeg', description: '' }
const usedModels = () => create.mock.calls.map(([params]) => params.model)

// Runs analyzeDish and skips the waiting time between retries
async function run() {
  const result = analyzeDish(input)
  result.catch(() => {}) // the test checks the error itself
  await vi.runAllTimersAsync()
  return result
}

describe('analyzeDish', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout'] })
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    create.mockReset()
  })
  afterEach(() => vi.useRealTimers())

  it('returns the recipe from the first model', async () => {
    create.mockResolvedValueOnce(ok)
    await expect(run()).resolves.toEqual(recipe)
    expect(usedModels()).toEqual(['gemini-3.6-flash'])
  })

  it('retries an overloaded model once, then uses the next model', async () => {
    create
      .mockRejectedValueOnce(httpError(503))
      .mockRejectedValueOnce(httpError(503))
      .mockResolvedValueOnce(ok)
    await expect(run()).resolves.toEqual(recipe)
    expect(usedModels()).toEqual([
      'gemini-3.6-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
    ])
  })

  it('skips a rate limited model without retrying it', async () => {
    create.mockRejectedValueOnce(httpError(429)).mockResolvedValueOnce(ok)
    await expect(run()).resolves.toEqual(recipe)
    expect(usedModels()).toEqual(['gemini-3.6-flash', 'gemini-3.5-flash-lite'])
  })

  it('retries when the answer is not a valid recipe', async () => {
    create
      .mockResolvedValueOnce({
        status: 'completed',
        output_text: '{"isFood": tr',
      })
      .mockResolvedValueOnce(ok)
    await expect(run()).resolves.toEqual(recipe)
    expect(usedModels()).toEqual(['gemini-3.6-flash', 'gemini-3.6-flash'])
  })

  it('throws AiQuotaError when every model is rate limited', async () => {
    create.mockRejectedValue(httpError(429))
    await expect(run()).rejects.toBeInstanceOf(AiQuotaError)
    expect(create).toHaveBeenCalledTimes(3)
  })

  it('does not retry errors in our own request', async () => {
    create.mockRejectedValue(httpError(400))
    await expect(run()).rejects.toThrow('400')
    expect(create).toHaveBeenCalledTimes(1)
  })
})

describe('isValidRecipe', () => {
  it('accepts a recipe and a "no food" answer', () => {
    expect(isValidRecipe(recipe)).toBe(true)
    expect(isValidRecipe({ isFood: false })).toBe(true)
  })

  it('rejects amounts as text and missing steps', () => {
    const textAmount = {
      ...recipe,
      ingredients: [{ name: 'Eier', amount: '2' }],
    }
    expect(isValidRecipe(textAmount)).toBe(false)
    expect(isValidRecipe({ ...recipe, steps: [] })).toBe(false)
    expect(isValidRecipe(null)).toBe(false)
  })

  it('rejects servings as text or zero, accepts missing servings', () => {
    expect(isValidRecipe({ ...recipe, servings: '2' })).toBe(false)
    expect(isValidRecipe({ ...recipe, servings: 0 })).toBe(false)
    expect(isValidRecipe({ ...recipe, servings: 2 })).toBe(true)
    expect(isValidRecipe({ ...recipe, servings: null })).toBe(true)
  })
})
