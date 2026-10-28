// Turns raw values from the recipe JSON into German display texts.

const DIFFICULTY_LABELS = {
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwer',
}

// German number format: 0.5 → "0,5", 1500 → "1.500", at most 2 decimals
const numberFormat = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 2,
})

export function formatDifficulty(difficulty) {
  return DIFFICULTY_LABELS[difficulty] ?? null
}

export function formatDuration(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} Min.`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} Std. ${rest} Min.` : `${hours} Std.`
}

export function formatServings(servings) {
  if (!servings) return null
  return servings === 1 ? '1 Portion' : `${servings} Portionen`
}

// "200 g", "2 Stück" or "" for amounts like "a pinch of salt" (amount = null)
export function formatAmount(amount, unit) {
  if (amount == null) return unit ?? ''
  return [numberFormat.format(amount), unit].filter(Boolean).join(' ')
}

// The whole recipe as plain text, e.g. for copying it into a notes app
export function recipeToText(recipe) {
  const facts = [
    formatDuration(recipe.durationMinutes),
    formatServings(recipe.servings),
    formatDifficulty(recipe.difficulty),
  ].filter(Boolean)

  const lines = [recipe.dishName]
  if (recipe.description) lines.push(recipe.description)
  if (facts.length > 0) lines.push(facts.join(' · '))

  lines.push('', 'Zutaten')
  for (const ingredient of recipe.ingredients) {
    const amount = formatAmount(ingredient.amount, ingredient.unit)
    lines.push(`- ${[amount, ingredient.name].filter(Boolean).join(' ')}`)
  }

  lines.push('', 'Zubereitung')
  for (const step of recipe.steps) {
    const title = step.title ? `${step.title}: ` : ''
    lines.push(`${step.number}. ${title}${step.text}`)
  }

  return lines.join('\n')
}
