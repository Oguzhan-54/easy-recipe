import {
  formatDifficulty,
  formatDuration,
  formatServings,
} from '../lib/formatRecipe.js'
import IngredientList from './IngredientList.jsx'
import ResultActions from './ResultActions.jsx'
import StepList from './StepList.jsx'
import { IconClock, IconDifficulty, IconUsers } from './icons.jsx'
import styles from './ResultView.module.css'

// Result page: photo + summary at the top, ingredients and steps below.
function ResultView({ recipe, previewUrl, onNewPhoto }) {
  const duration = formatDuration(recipe.durationMinutes)
  const servings = formatServings(recipe.servings)
  const difficulty = formatDifficulty(recipe.difficulty)

  return (
    <div className={styles.page}>
      <section className={styles.top}>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Dein hochgeladenes Foto"
            className={styles.photo}
          />
        )}

        <div className={styles.summary}>
          <h1 className={styles.dishName}>{recipe.dishName}</h1>
          {recipe.description && (
            <p className={styles.description}>{recipe.description}</p>
          )}

          <ul className={styles.chips} aria-label="Eckdaten">
            {duration && (
              <li className={`${styles.chip} ${styles.chipAccent}`}>
                <IconClock size={16} />
                {duration}
              </li>
            )}
            {servings && (
              <li className={styles.chip}>
                <IconUsers size={16} />
                {servings}
              </li>
            )}
            {difficulty && (
              <li className={styles.chip}>
                <IconDifficulty size={16} />
                {difficulty}
              </li>
            )}
            {/* Only shown when the AI was not sure – otherwise it is not worth the space */}
            {recipe.confidence === 'low' && (
              <li className={styles.chip}>Unsicher erkannt</li>
            )}
          </ul>

          <ResultActions recipe={recipe} onNewPhoto={onNewPhoto} />
        </div>
      </section>

      <div className={styles.columns}>
        {recipe.ingredients.length > 0 && (
          <IngredientList
            ingredients={recipe.ingredients}
            servings={recipe.servings}
          />
        )}
        {recipe.steps.length > 0 && <StepList steps={recipe.steps} />}
      </div>

      {recipe.notes && (
        <p className={styles.notes}>
          <strong>Hinweis:</strong> {recipe.notes}
        </p>
      )}
      <p className={styles.disclaimer}>
        Per KI aus deinem Foto erstellt. Mengen und Zeiten sind Schätzungen,
        passe sie nach Geschmack an.
      </p>
    </div>
  )
}

export default ResultView
