import Button from './Button.jsx'
import styles from './ServingsControl.module.css'

const MIN_SERVINGS = 1
const MAX_SERVINGS = 20

// "− 2 Portionen +" – changes the number of servings, the parent scales the amounts.
function ServingsControl({ servings, onChange }) {
  return (
    <div className={styles.control} role="group" aria-label="Portionen">
      <Button
        variant="outline"
        className={styles.button}
        onClick={() => onChange(servings - 1)}
        disabled={servings <= MIN_SERVINGS}
        aria-label="Eine Portion weniger"
      >
        −
      </Button>
      {/* aria-live: screen readers read the new value after each click */}
      <span className={styles.value} aria-live="polite">
        {servings} {servings === 1 ? 'Portion' : 'Portionen'}
      </span>
      <Button
        variant="outline"
        className={styles.button}
        onClick={() => onChange(servings + 1)}
        disabled={servings >= MAX_SERVINGS}
        aria-label="Eine Portion mehr"
      >
        +
      </Button>
    </div>
  )
}

export default ServingsControl
