import { describe, expect, it } from 'vitest'
import { scaleIngredients } from '../src/lib/scaleIngredients.js'

const ingredients = [
  { name: 'Spaghetti', amount: 200, unit: 'g' },
  { name: 'Eier', amount: 2, unit: 'Stück' },
  { name: 'Salz', amount: null, unit: 'Prise' },
]

describe('scaleIngredients', () => {
  it('doubles the amounts from 2 to 4 servings', () => {
    const scaled = scaleIngredients(ingredients, 2, 4)
    expect(scaled.map((i) => i.amount)).toEqual([400, 4, null])
  })

  it('halves the amounts from 2 to 1 serving', () => {
    const scaled = scaleIngredients(ingredients, 2, 1)
    expect(scaled.map((i) => i.amount)).toEqual([100, 1, null])
  })

  it('keeps the amounts when the original servings are unknown', () => {
    expect(scaleIngredients(ingredients, null, 4)).toBe(ingredients)
  })

  it('does not change the original list', () => {
    scaleIngredients(ingredients, 2, 4)
    expect(ingredients[0].amount).toBe(200)
  })
})
