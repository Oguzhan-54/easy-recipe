import { useEffect } from 'react'
import { IconArrowLeft } from './icons.jsx'
import styles from './LegalPage.module.css'

// Shared layout for the imprint and the privacy page: plain text in the page width.
function LegalPage({ title, children }) {
  useEffect(() => {
    document.title = `${title} – EasyRecipe`
  }, [title])

  return (
    <article className={styles.page}>
      <a href="/" className={styles.back}>
        <IconArrowLeft size={16} />
        Zurück
      </a>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </article>
  )
}

export default LegalPage
