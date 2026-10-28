import { formatDifficulty, formatDuration } from '../lib/formatRecipe.js'
import { RECIPES } from '../recipes/index.js'
import { IconClock, IconDifficulty } from './icons.jsx'
import styles from './RecipeGrid.module.css'

// Recipe cards (used on the start page and on /rezepte).
// A click opens the stored recipe right away, without an AI request.
// limit: only show the first recipes (start page), without it all of them.
function RecipeGrid({ onSelect, limit }) {
  return (
    <ul className={styles.grid}>
      {RECIPES.slice(0, limit).map((example) => (
        <li key={example.id}>
          <button
            type="button"
            className={styles.card}
            onClick={() => onSelect(example)}
          >
            <img
              src={example.imageSrc}
              alt=""
              className={styles.image}
              loading="lazy"
            />
            <span className={styles.body}>
              <span className={styles.name}>{example.recipe.dishName}</span>
              <span className={styles.facts}>
                <span className={styles.fact}>
                  <IconClock size={14} />
                  {formatDuration(example.recipe.durationMinutes)}
                </span>
                <span className={styles.fact}>
                  <IconDifficulty size={14} />
                  {formatDifficulty(example.recipe.difficulty)}
                </span>
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default RecipeGrid
