// Mock mode for local development: returns stored answers instead of calling the AI.
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
    'Ein römischer Klassiker: Pasta in einer seidigen Sauce aus Eigelb, Pecorino und knusprigem Speck. Ganz ohne Sahne.',
  servings: 2,
  durationMinutes: 25,
  difficulty: 'easy',
  ingredients: [
    { name: 'Spaghetti', amount: 200, unit: 'g' },
    { name: 'Guanciale oder Pancetta, gewürfelt', amount: 100, unit: 'g' },
    { name: 'Eigelb', amount: 3, unit: '' },
    { name: 'ganzes Ei', amount: 1, unit: '' },
    { name: 'Pecorino Romano, fein gerieben', amount: 50, unit: 'g' },
    { name: 'schwarzer Pfeffer, frisch gemahlen', amount: 1, unit: 'TL' },
    { name: 'Salz, fürs Nudelwasser', amount: 1, unit: 'EL' },
  ],
  steps: [
    {
      number: 1,
      title: 'Wasser aufkochen',
      text: 'Einen großen Topf Wasser zum Kochen bringen und kräftig salzen. Währenddessen Eigelb, ganzes Ei, den Großteil des Pecorino und reichlich Pfeffer in einer Schüssel verquirlen.',
    },
    {
      number: 2,
      title: 'Guanciale auslassen',
      text: 'Den gewürfelten Guanciale in einer kalten, trockenen Pfanne bei mittlerer Hitze 6–8 Minuten braten, bis er goldbraun und knusprig ist. Die Pfanne vom Herd nehmen.',
    },
    {
      number: 3,
      title: 'Nudeln kochen',
      text: 'Die Spaghetti 1 Minute kürzer als auf der Packung angegeben kochen. Eine Tasse Nudelwasser aufheben, dann abgießen.',
    },
    {
      number: 4,
      title: 'Alles vermengen',
      text: 'Die Nudeln in die Pfanne geben, weiterhin vom Herd. Die Eiermischung dazugießen und zügig durchschwenken, dabei nach und nach Nudelwasser zugeben, bis die Sauce glänzt und cremig ist.',
    },
    {
      number: 5,
      title: 'Sofort servieren',
      text: 'Anrichten und mit dem restlichen Pecorino und mehr Pfeffer abschließen. Carbonara wartet auf niemanden.',
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
