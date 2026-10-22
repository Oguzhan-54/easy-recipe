import styles from './ErrorMessage.module.css'

// Shows an understandable message. With onRetry, a "try again" button is shown.
// tone: 'error' (red) | 'info' (neutral, e.g. "no food recognized")
function ErrorMessage({ message, onRetry, tone = 'error' }) {
  return (
    // role="alert" makes screen readers announce the message immediately
    <div className={`${styles.message} ${styles[tone]}`} role="alert">
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Erneut versuchen
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
