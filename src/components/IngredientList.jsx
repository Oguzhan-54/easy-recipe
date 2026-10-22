import { formatAmount } from '../lib/formatRecipe.js'
import styles from './IngredientList.module.css'

function IngredientList({ ingredients }) {
  return (
    <section aria-labelledby="ingredients-heading">
      <h3 id="ingredients-heading" className={styles.heading}>
        Zutaten
      </h3>
      <p className={styles.hint}>Mengen geschätzt anhand des Bildes</p>
      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => (
          // React needs a unique key per list item. The AI might list a name twice, so add the position.
          <li key={`${index}-${ingredient.name}`} className={styles.item}>
            <span className={styles.amount}>
              {formatAmount(ingredient.amount, ingredient.unit)}
            </span>
            <span>{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IngredientList
