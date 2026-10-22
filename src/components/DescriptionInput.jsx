import styles from './DescriptionInput.module.css'

// Same limit as planned for the backend validation (CLAUDE.md, section 8)
export const MAX_DESCRIPTION_LENGTH = 300

// Optional short text about the dish, e.g. "vegetarisch" or "mit Reis".
function DescriptionInput({ value, onChange, disabled }) {
  return (
    <div className={styles.field}>
      <label htmlFor="description" className={styles.label}>
        Beschreibung <span className={styles.optional}>(optional)</span>
      </label>
      <textarea
        id="description"
        className={styles.textarea}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={MAX_DESCRIPTION_LENGTH}
        rows={2}
        placeholder="z. B. vegetarisch, mit Reis, aus dem Restaurant"
        disabled={disabled}
        aria-describedby="description-counter"
      />
      <span id="description-counter" className={styles.counter}>
        {value.length}/{MAX_DESCRIPTION_LENGTH}
      </span>
    </div>
  )
}

export default DescriptionInput
