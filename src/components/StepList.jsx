import styles from './StepList.module.css'

function StepList({ steps }) {
  return (
    <section aria-labelledby="steps-heading">
      <h3 id="steps-heading" className={styles.heading}>
        Zubereitung
      </h3>
      {/* <ol> = ordered list: screen readers announce "step 1 of 7" */}
      <ol className={styles.list}>
        {steps.map((step) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {step.number}
            </span>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default StepList
