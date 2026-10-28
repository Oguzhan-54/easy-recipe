import { formatAmount } from '../lib/formatRecipe.js'
import ServingsControl from './ServingsControl.jsx'
import styles from './IngredientList.module.css'

// Ingredient card with checkboxes, so it can be used as a shopping list.
// The amounts come in already scaled to the chosen servings (see ResultView).
function IngredientList({ ingredients, servings, onServingsChange }) {
  return (
    <section className={styles.card} aria-labelledby="ingredients-heading">
      <div className={styles.header}>
        <h2 id="ingredients-heading" className={styles.heading}>
          Zutaten
        </h2>
        {servings && (
          <ServingsControl servings={servings} onChange={onServingsChange} />
        )}
      </div>
      <p className={styles.hint}>Hake beim Einkaufen ab.</p>

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
