import styles from './App.module.css'

function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>EasyRecipe</h1>
      <p className={styles.subtitle}>
        Lade ein Foto von einem Gericht hoch und erhalte Zutaten, Rezept und
        Anleitung.
      </p>
    </main>
  )
}

export default App
