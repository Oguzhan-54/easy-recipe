// Recalculates ingredient amounts for a different number of servings.
// Amounts stay numbers; rounding for display happens in formatAmount.
export function scaleIngredients(ingredients, fromServings, toServings) {
  // Without a valid base we cannot calculate a factor, so keep the original amounts
  if (!fromServings || !toServings) return ingredients

  const factor = toServings / fromServings
  return ingredients.map((ingredient) =>
    // amount = null means "a pinch of" etc. – nothing to scale
    ingredient.amount == null
      ? ingredient
      : { ...ingredient, amount: ingredient.amount * factor },
  )
}
