import styles from './DescriptionInput.module.css'

// Same limit as planned for the backend validation (CLAUDE.md, section 8)
export const MAX_DESCRIPTION_LENGTH = 300

// Optional short note about the dish, e.g. "vegetarische Variante" or "für 4 Personen".
function DescriptionInput({ value, onChange, disabled }) {
  return (
    <div className={styles.field}>
      <label htmlFor="description" className={styles.label}>
        Notiz hinzufügen <span className={styles.optional}>(optional)</span>
      </label>
      <textarea
        id="description"
        className={styles.textarea}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={MAX_DESCRIPTION_LENGTH}
        rows={2}
        placeholder="z. B. vegetarische Variante, für 4 Personen"
        disabled={disabled}
      />
    </div>
  )
}

export default DescriptionInput
