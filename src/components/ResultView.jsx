import {
  formatConfidence,
  formatDifficulty,
  formatDuration,
} from '../lib/formatRecipe.js'
import IngredientList from './IngredientList.jsx'
import StepList from './StepList.jsx'
import styles from './ResultView.module.css'

// Shows the recognized recipe in sections instead of raw JSON.
function ResultView({ recipe }) {
  if (!recipe.isFood) {
    return (
      <div className={styles.notFood}>
        <h2 className={styles.notFoodTitle}>Kein Gericht erkannt</h2>
        <p>
          Auf dem Foto konnte kein Essen erkannt werden. Probier es mit einem
          anderen Foto, auf dem das Gericht gut zu sehen ist.
        </p>
      </div>
    )
  }

  // Only show facts the AI actually returned (null values are left out)
  const facts = [
    { label: 'Portionen', value: recipe.servings },
    { label: 'Dauer', value: formatDuration(recipe.durationMinutes) },
    { label: 'Schwierigkeit', value: formatDifficulty(recipe.difficulty) },
    { label: 'Erkennung', value: formatConfidence(recipe.confidence) },
  ].filter((fact) => fact.value)

  return (
    <article className={styles.recipe}>
      <header>
        <h2 className={styles.dishName}>{recipe.dishName}</h2>
        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}
      </header>

      {facts.length > 0 && (
        // <dl> = description list: a list of label/value pairs
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {recipe.ingredients.length > 0 && (
        <IngredientList ingredients={recipe.ingredients} />
      )}
      {recipe.steps.length > 0 && <StepList steps={recipe.steps} />}

      {recipe.notes && (
        <aside className={styles.notes}>
          <h3 className={styles.notesHeading}>Hinweise</h3>
          <p className={styles.notesText}>{recipe.notes}</p>
        </aside>
      )}
    </article>
  )
}

export default ResultView
