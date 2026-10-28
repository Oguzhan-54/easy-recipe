import { useEffect } from 'react'
import styles from './LegalPage.module.css'

// Shared layout for the imprint and the privacy page: narrow column for long text.
function LegalPage({ title, children }) {
  useEffect(() => {
    document.title = `${title} – EasyRecipe`
  }, [title])

  return (
    <article className={styles.page}>
      <a href="/" className={styles.back}>
        ← Zurück zu EasyRecipe
      </a>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </article>
  )
}

export default LegalPage
