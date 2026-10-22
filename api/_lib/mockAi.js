// Mock mode for local development: returns stored answers instead of calling Gemini.
// Costs no quota, so the UI (loading state, recipe view, errors) can be tested as often as needed.
//
// Enable it in .env:
//   MOCK_AI=recipe    → example recipe
//   MOCK_AI=not-food  → "no food on the photo" answer
//   MOCK_AI=error     → AI error (the frontend shows the error message)

// Long enough to see the loading animation
const MOCK_DELAY_MS = 3000

const MOCK_MODES = ['recipe', 'not-food', 'error']

// Never active in production on Vercel, even if MOCK_AI is set there by mistake
export function getMockMode() {
  const mode = process.env.MOCK_AI
  if (!mode || process.env.VERCEL_ENV === 'production') return null
  return MOCK_MODES.includes(mode) ? mode : 'recipe'
}

// Same signature as analyzeDish() in gemini.js, so analyze.js can use both the same way
export async function analyzeDishMock(mode) {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

  if (mode === 'error') throw new Error('Mock AI error')
  if (mode === 'not-food') return mockNotFood
  return mockRecipe
}

const mockRecipe = {
  isFood: true,
  dishName: 'Spaghetti Carbonara',
  confidence: 'high',
  description:
    'Klassisches römisches Nudelgericht mit cremiger Sauce aus Eigelb, Pecorino und knusprigem Guanciale.',
  servings: 2,
  durationMinutes: 25,
  difficulty: 'medium',
  ingredients: [
    { name: 'Spaghetti', amount: 200, unit: 'g' },
    { name: 'Guanciale (oder Pancetta)', amount: 100, unit: 'g' },
    { name: 'Eigelb', amount: 3, unit: 'Stück' },
    { name: 'Pecorino Romano, gerieben', amount: 50, unit: 'g' },
    { name: 'Schwarzer Pfeffer, frisch gemahlen', amount: 0.5, unit: 'TL' },
    { name: 'Salz für das Nudelwasser', amount: null, unit: '' },
  ],
  steps: [
    {
      number: 1,
      text: 'Reichlich Wasser zum Kochen bringen, kräftig salzen und die Spaghetti darin al dente kochen.',
    },
    {
      number: 2,
      text: 'Guanciale in Streifen schneiden und in einer Pfanne ohne Öl bei mittlerer Hitze knusprig auslassen.',
    },
    {
      number: 3,
      text: 'Eigelb mit Pecorino und Pfeffer in einer Schüssel zu einer dicken Creme verrühren.',
    },
    {
      number: 4,
      text: 'Spaghetti abgießen, dabei eine Tasse Nudelwasser auffangen. Nudeln zum Guanciale in die Pfanne geben und die Pfanne vom Herd nehmen.',
    },
    {
      number: 5,
      text: 'Eiercreme unterrühren und mit etwas Nudelwasser zu einer cremigen Sauce binden. Sofort servieren.',
    },
  ],
  notes:
    'Dies ist eine Beispielantwort aus dem Mock-Modus (MOCK_AI), keine echte KI-Analyse.',
}

const mockNotFood = {
  isFood: false,
  dishName: null,
  confidence: null,
  description: null,
  servings: null,
  durationMinutes: null,
  difficulty: null,
  ingredients: [],
  steps: [],
  notes: null,
}
