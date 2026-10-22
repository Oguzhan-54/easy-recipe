import styles from './ErrorMessage.module.css'

// Shows an understandable error. With onRetry, a "try again" button is shown.
function ErrorMessage({ message, onRetry }) {
  return (
    // role="alert" makes screen readers announce the message immediately
    <div className={styles.error} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Erneut versuchen
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
