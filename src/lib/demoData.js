// Demo mode: example photos with stored answers. A click shows the recipe without calling the AI,
// so it costs no quota. The recipes are real Gemini answers for these photos (generated Oct 2026).
export const DEMO_EXAMPLES = [
  {
    id: 'pasta',
    label: 'Pasta',
    imageSrc: '/examples/pasta.jpg',
    // Photo by Krista Stucchio on Unsplash
    recipe: {
      isFood: true,
      dishName: 'Spaghetti Bolognese',
      confidence: 'high',
      description:
        'Klassische Spaghetti serviert mit einer würzigen Hackfleisch-Tomatensauce.',
      servings: 2,
      durationMinutes: 45,
      difficulty: 'easy',
      ingredients: [
        { name: 'Spaghetti', amount: 200, unit: 'g' },
        { name: 'Rinderhackfleisch', amount: 250, unit: 'g' },
        { name: 'Zwiebel', amount: 1, unit: 'Stück' },
        { name: 'Knoblauchzehe', amount: 1, unit: 'Stück' },
        { name: 'Gehackte Tomaten (Dose)', amount: 400, unit: 'g' },
        { name: 'Tomatenmark', amount: 2, unit: 'EL' },
        { name: 'Olivenöl', amount: 2, unit: 'EL' },
        { name: 'Italienische Kräuter', amount: 1, unit: 'TL' },
        { name: 'Salz und Pfeffer', amount: null, unit: 'nach Geschmack' },
      ],
      steps: [
        {
          number: 1,
          title: 'Gemüse schneiden',
          text: 'Zwiebel und Knoblauch schälen und in feine Würfel schneiden.',
        },
        {
          number: 2,
          title: 'Fleisch anbraten',
          text: 'Olivenöl in einer Pfanne erhitzen. Zwiebeln, Knoblauch und Hackfleisch darin krümelig anbraten.',
        },
        {
          number: 3,
          title: 'Sauce einkochen',
          text: 'Tomatenmark kurz mitanbraten, dann die gehackten Tomaten und Kräuter dazugeben. Bei schwacher Hitze etwa 20 bis 30 Minuten köcheln lassen und mit Salz und Pfeffer abschmecken.',
        },
        {
          number: 4,
          title: 'Spaghetti kochen',
          text: 'Spaghetti in reichlich kochendem Salzwasser nach Packungsanleitung al dente garen.',
        },
        {
          number: 5,
          title: 'Nudeln vermengen',
          text: 'Die Spaghetti abgießen, direkt mit der Bolognese-Sauce vermischen und auf Tellern anrichten.',
        },
      ],
      notes: 'Eindeutig erkennbare Spaghetti mit Bolognese-Sauce.',
    },
  },
  {
    id: 'salad',
    label: 'Salat',
    imageSrc: '/examples/salad.jpg',
    // Photo by Anna Pelzer on Unsplash
    recipe: {
      isFood: true,
      dishName: 'Bunte Buddha Bowl mit Süßkartoffel und Avocado',
      confidence: 'high',
      description:
        'Eine frische, farbenfrohe Buddha Bowl mit gerösteten Süßkartoffeln, Kichererbsen, cremiger Avocado, frischem Gemüse und einem feinen Tahin-Dressing.',
      servings: 2,
      durationMinutes: 30,
      difficulty: 'easy',
      ingredients: [
        { name: 'Süßkartoffel', amount: 1, unit: 'Stück' },
        { name: 'Kichererbsen (gekocht)', amount: 200, unit: 'g' },
        { name: 'Avocado', amount: 1, unit: 'Stück' },
        { name: 'Kirschtomaten', amount: 150, unit: 'g' },
        { name: 'Gelbe Paprika', amount: 0.5, unit: 'Stück' },
        { name: 'Rotkohl', amount: 80, unit: 'g' },
        {
          name: 'Wassermelonen-Rettich oder Radieschen',
          amount: 1,
          unit: 'Stück',
        },
        { name: 'Grüner Salat', amount: 100, unit: 'g' },
        { name: 'Sprossen oder Microgreens', amount: 30, unit: 'g' },
        { name: 'Tahin (Sesammus)', amount: 2, unit: 'EL' },
        { name: 'Zitronensaft', amount: 1, unit: 'EL' },
        { name: 'Olivenöl', amount: 2, unit: 'EL' },
        { name: 'Salz und Pfeffer', amount: null, unit: 'nach Geschmack' },
      ],
      steps: [
        {
          number: 1,
          title: 'Süßkartoffeln rösten',
          text: 'Den Backofen auf 200 °C Ober-/Unterhitze vorheizen. Die Süßkartoffel schälen, in kleine Würfel schneiden, mit 1 EL Olivenöl, Salz und Pfeffer vermengen und ca. 20 Minuten im Ofen weich und leicht braun rösten.',
        },
        {
          number: 2,
          title: 'Gemüse vorbereiten',
          text: 'Salat und Sprossen waschen. Die Avocado halbieren, entkernen und in feine Scheiben schneiden. Paprika in Streifen, Rotkohl in feine Streifen und Rettich in dünne Scheiben schneiden.',
        },
        {
          number: 3,
          title: 'Dressing anrühren',
          text: 'Tahin, Zitronensaft, 1 EL Olivenöl und etwa 2–3 EL lauwarmes Wasser verrühren, bis ein cremiges Dressing entsteht. Mit Salz und Pfeffer abschmecken.',
        },
        {
          number: 4,
          title: 'Bowl anrichten',
          text: 'Den Salat als Basis in zwei Schüsseln verteilen. Die gerösteten Süßkartoffelwürfel, Kichererbsen, Avocado, Tomaten, Paprika, Rotkohl, Rettich und Sprossen nebeneinander anordnen.',
        },
        {
          number: 5,
          title: 'Servieren',
          text: 'Das Tahin-Dressing gleichmäßig über die Bowls träufeln und nach Wunsch mit etwas frischem Pfeffer garnieren.',
        },
      ],
      notes:
        'Das Gemüse kann je nach Saison und Vorliebe variiert werden. Anstelle des Tahin-Dressings passt auch ein Joghurt-Kräuter-Dressing hervorragend.',
    },
  },
  {
    id: 'curry',
    label: 'Curry',
    imageSrc: '/examples/curry.jpg',
    // Photo by Kalindu Waranga on Unsplash
    recipe: {
      isFood: true,
      dishName: 'Hähnchen-Curry (Murgh Curry)',
      confidence: 'high',
      description:
        'Ein aromatisches und würziges indisches Hähnchen-Curry mit einer reichhaltigen Sauce auf Tomaten- und Zwiebelbasis.',
      servings: 4,
      durationMinutes: 45,
      difficulty: 'medium',
      ingredients: [
        {
          name: 'Hähnchenteile (z.B. Keulen und Brust)',
          amount: 800,
          unit: 'g',
        },
        { name: 'Zwiebeln', amount: 2, unit: 'Stück' },
        { name: 'Tomaten', amount: 3, unit: 'Stück' },
        { name: 'Knoblauch', amount: 3, unit: 'Zehen' },
        { name: 'Ingwer', amount: 2, unit: 'cm' },
        { name: 'Pflanzenöl', amount: 3, unit: 'EL' },
        { name: 'Currypulver', amount: 2, unit: 'TL' },
        { name: 'Kurkuma', amount: 1, unit: 'TL' },
        { name: 'Garam Masala', amount: 1, unit: 'TL' },
        { name: 'Salz', amount: null, unit: 'nach Geschmack' },
        { name: 'Wasser', amount: 250, unit: 'ml' },
      ],
      steps: [
        {
          number: 1,
          title: 'Zutaten vorbereiten',
          text: 'Zwiebeln, Tomaten, Knoblauch und Ingwer fein hacken oder pürieren, um eine Pastenbasis zu erhalten.',
        },
        {
          number: 2,
          title: 'Hähnchen anbraten',
          text: 'Öl in einem Topf erhitzen und die Hähnchenteile darin von allen Seiten scharf anbraten, dann herausnehmen.',
        },
        {
          number: 3,
          title: 'Gewürze anrösten',
          text: 'Im gleichen Öl die Zwiebeln, Knoblauch und Ingwer goldbraun anbraten. Die Gewürze (Curry, Kurkuma) hinzufügen und kurz mitrösten.',
        },
        {
          number: 4,
          title: 'Sauce köcheln lassen',
          text: 'Die Tomaten und etwas Wasser hinzufügen. Die Sauce köcheln lassen, bis sich das Öl leicht absetzt.',
        },
        {
          number: 5,
          title: 'Hähnchen garziehen',
          text: 'Das Hähnchen zurück in die Sauce geben, abdecken und bei mittlerer Hitze ca. 25-30 Minuten garen, bis das Fleisch zart ist. Mit Garam Masala verfeinern.',
        },
      ],
      notes:
        'Ein klassisches, herzhaftes Gericht, das hervorragend zu Reis oder Naan-Brot passt.',
    },
  },
]
