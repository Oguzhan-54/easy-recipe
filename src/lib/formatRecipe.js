// Turns raw values from the recipe JSON into German display texts.

const DIFFICULTY_LABELS = {
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwer',
}

const CONFIDENCE_LABELS = {
  high: 'Sicher erkannt',
  medium: 'Wahrscheinlich',
  low: 'Unsicher',
}

// German number format: 0.5 → "0,5", 1500 → "1.500", at most 2 decimals
const numberFormat = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 2,
})

export function formatDifficulty(difficulty) {
  return DIFFICULTY_LABELS[difficulty] ?? null
}

export function formatConfidence(confidence) {
  return CONFIDENCE_LABELS[confidence] ?? null
}

export function formatDuration(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} Min.`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} Std. ${rest} Min.` : `${hours} Std.`
}

// "200 g", "2 Stück" or "" for amounts like "a pinch of salt" (amount = null)
export function formatAmount(amount, unit) {
  if (amount == null) return unit ?? ''
  return [numberFormat.format(amount), unit].filter(Boolean).join(' ')
}
