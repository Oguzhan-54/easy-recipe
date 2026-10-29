// JSON schema for the AI answer (see CLAUDE.md, section 6).
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
