import { DEMO_EXAMPLES } from '../lib/demoData.js'
import styles from './ExampleImages.module.css'

// Example photos below the upload card. A click shows a stored recipe (demo mode, no AI request).
function ExampleImages({ onSelect, disabled }) {
  return (
    <section className={styles.examples} aria-labelledby="examples-heading">
      <h2 id="examples-heading" className={styles.heading}>
        Kein Foto zur Hand? Probier ein Beispiel
      </h2>
      <ul className={styles.list}>
        {DEMO_EXAMPLES.map((example) => (
          <li key={example.id}>
            <button
              type="button"
              className={styles.button}
              onClick={() => onSelect(example)}
              disabled={disabled}
            >
              {/* Empty alt: the label below already names the button */}
              <img src={example.imageSrc} alt="" className={styles.image} />
              <span className={styles.label}>{example.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        Beispiele zeigen gespeicherte Ergebnisse, ohne KI-Anfrage.
      </p>
    </section>
  )
}

export default ExampleImages
