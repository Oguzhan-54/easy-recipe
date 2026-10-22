import { formatAmount, formatServings } from '../lib/formatRecipe.js'
import styles from './IngredientList.module.css'

// Ingredient card with checkboxes, so it can be used as a shopping list.
function IngredientList({ ingredients, servings }) {
  const servingsText = formatServings(servings)

  return (
    <section className={styles.card} aria-labelledby="ingredients-heading">
      <div className={styles.header}>
        <h2 id="ingredients-heading" className={styles.heading}>
          Zutaten
        </h2>
        {/* Mobile shows a short "Für 2" next to the heading (see design) */}
        {servings && (
          <span className={styles.servingsShort}>Für {servings}</span>
        )}
      </div>
      <p className={styles.hint}>
        {servingsText && `Für ${servingsText}. `}Hake beim Einkaufen ab.
      </p>

      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => {
          const amount = formatAmount(ingredient.amount, ingredient.unit)
          return (
            // React needs a unique key per list item. The AI might list a name twice, so add the position.
            <li key={`${index}-${ingredient.name}`} className={styles.item}>
              {/* The label makes the whole row clickable, not only the small box */}
              <label className={styles.label}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.text}>
                  {amount && <strong>{amount}</strong>} {ingredient.name}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default IngredientList
