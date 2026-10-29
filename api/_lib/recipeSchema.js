// JSON schema for the AI answer (see CLAUDE.md, section 6), plus the check of the answer.
// Gemini gets it as a forced schema, Cloudflare as text in the prompt (see cloudflare.js).
export const recipeSchema = {
  type: 'object',
  properties: {
    isFood: { type: 'boolean' },
    dishName: { type: ['string', 'null'] },
    confidence: {
      type: ['string', 'null'],
      enum: ['high', 'medium', 'low', null],
    },
    description: { type: ['string', 'null'] },
    servings: { type: ['integer', 'null'] },
    durationMinutes: { type: ['integer', 'null'] },
    difficulty: {
      type: ['string', 'null'],
      enum: ['easy', 'medium', 'hard', null],
    },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          // A number (not a string), so the frontend can scale servings
          amount: { type: ['number', 'null'] },
          unit: { type: 'string' },
        },
        required: ['name', 'amount', 'unit'],
      },
    },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          number: { type: 'integer' },
          // Short heading for the step, e.g. "Wasser aufkochen"
          title: { type: 'string' },
          text: { type: 'string' },
        },
        required: ['number', 'title', 'text'],
      },
    },
    notes: { type: ['string', 'null'] },
  },
  required: [
    'isFood',
    'dishName',
    'confidence',
    'description',
    'servings',
    'durationMinutes',
    'difficulty',
    'ingredients',
    'steps',
    'notes',
  ],
}

// Thrown when the AI answers 429 (rate limit or daily quota used up)
export class AiQuotaError extends Error {}

// Gemini is forced into the schema, Cloudflare is not – so check what the frontend relies on
export function isValidRecipe(recipe) {
  if (typeof recipe?.isFood !== 'boolean') return false
  // No food: the frontend only shows a message, the other fields are not used
  if (!recipe.isFood) return true

  return (
    typeof recipe.dishName === 'string' &&
    // Text like "2" would break the servings buttons ("2" + 1 = "21")
    (recipe.servings == null ||
      (Number.isInteger(recipe.servings) && recipe.servings > 0)) &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every(
      (ingredient) =>
        typeof ingredient?.name === 'string' &&
        // A number, so the servings can be scaled (null = "a pinch of" etc.)
        (ingredient.amount === null || Number.isFinite(ingredient.amount)),
    ) &&
    Array.isArray(recipe.steps) &&
    recipe.steps.length > 0 &&
    recipe.steps.every((step) => typeof step?.text === 'string')
  )
}
