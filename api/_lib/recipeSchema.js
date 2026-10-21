// JSON schema for the Gemini answer (see CLAUDE.md, section 6).
// Gemini is forced to answer in exactly this structure, so we never get free text.
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
          text: { type: 'string' },
        },
        required: ['number', 'text'],
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
