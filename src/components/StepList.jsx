import styles from './StepList.module.css'

function StepList({ steps }) {
  return (
    <section className={styles.card} aria-labelledby="steps-heading">
      <h2 id="steps-heading" className={styles.heading}>
        Zubereitung
      </h2>
      {/* <ol> = ordered list: screen readers announce "step 1 of 5" */}
      <ol className={styles.list}>
        {steps.map((step) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {step.number}
            </span>
            <div>
              {step.title && <h3 className={styles.title}>{step.title}</h3>}
              <p className={styles.text}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default StepList
