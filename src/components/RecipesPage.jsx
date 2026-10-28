import { useEffect } from 'react'
import RecipeGrid from './RecipeGrid.jsx'
import styles from './RecipesPage.module.css'

// /rezepte: all ready-made recipes from src/recipes.
function RecipesPage({ onSelect }) {
  useEffect(() => {
    document.title = 'Rezepte – EasyRecipe'
  }, [])

  return (
    <section className={styles.page} aria-labelledby="recipes-heading">
      <h1 id="recipes-heading" className={styles.title}>
        Rezepte
      </h1>
      <RecipeGrid onSelect={onSelect} />
    </section>
  )
}

export default RecipesPage
