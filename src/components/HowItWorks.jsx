import styles from './HowItWorks.module.css'

// Photos from Unsplash, stored in /public/steps
const STEPS = [
  {
    title: 'Foto hochladen',
    text: 'Fotografiere dein Gericht oder wähle ein Bild aus deiner Galerie. Mit einer kurzen Notiz, etwa „vegetarisch“ oder „für 4 Personen“, wird das Rezept noch passender.',
    image: '/steps/food.jpg',
    alt: 'Bunte Bowl mit Tofu, Gemüse und Mais von oben fotografiert',
  },
  {
    title: 'KI analysiert das Gericht',
    text: 'Die KI schaut sich das Foto genau an, erkennt das Gericht und schätzt, welche Zutaten in welcher Menge darin stecken.',
    image: '/steps/food-analyse.png',
    alt: 'Dieselbe Bowl mit einer Scan-Linie, die das Foto abtastet',
  },
  {
    title: 'Mitkochen',
    text: 'Du bekommst eine Zutatenliste zum Abhaken und klare, nummerierte Schritte. So kochst du das Gericht ganz entspannt nach.',
    image: '/steps/cook.jpg',
    alt: 'Hände schneiden bunte Kirschtomaten auf einem Holzbrett',
  },
]

// The id is the target of the "So funktioniert's" link in the header
function HowItWorks() {
  return (
    <section
      id="so-funktionierts"
      className={styles.section}
      aria-labelledby="how-it-works-heading"
    >
      <div className={styles.inner}>
        <h2 id="how-it-works-heading" className={styles.heading}>
          In drei Schritten vom Foto zum Teller
        </h2>
        <ol className={styles.list}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.imageWrapper}>
                {/* loading="lazy": the browser only loads the image when it is scrolled into view */}
                <img
                  src={step.image}
                  alt={step.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <span className={styles.number} aria-hidden="true">
                  {index + 1}
                </span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
