# EasyRecipe

Foto von einem Gericht hochladen und ein Rezept bekommen: Die KI erkennt das Gericht, schätzt Zutaten und Mengen und erklärt Schritt für Schritt, wie man es nachkocht.

**Live-Demo: [easy-recipe-sand.vercel.app](https://easy-recipe-sand.vercel.app)**. Die Beispielbilder funktionieren ohne Wartezeit und ohne KI-Anfrage.

<p>
  <img src=".github/screenshots/start-desktop.jpg" alt="Startseite am Desktop mit Upload-Karte" width="64%">
</p>
<img src=".github/screenshots/result-desktop.jpg" alt="Ergebnisseite am Desktop mit Foto, Eckdaten, Zutaten und Zubereitung" width="64%">
<img src=".github/screenshots/result-mobile.jpg" alt="Zutatenliste mit Portionen-Regler auf dem Handy" width="30%">

## Features

- **Foto analysieren:** Upload per Drag & Drop, Dateiauswahl oder direkt mit der Handykamera, optional mit kurzer Notiz („vegetarisch“, „für 4 Personen“)
- **Rezept mit Zutaten, Mengen und Schritten**, dazu Dauer, Schwierigkeit und Portionen
- **Portionen umrechnen** mit +/- (alle Mengen skalieren mit)
- **Zutaten abhaken** wie auf einer Einkaufsliste, **Rezept kopieren** als Text
- **Beispielbilder (Demo-Modus):** sofort ausprobieren, ohne eigenes Foto und ohne KI-Kontingent
- **Mobile-first und barrierearm:** Tastaturbedienung, sichtbarer Fokus, Alt-Texte, ausreichender Kontrast, reduzierte Animationen bei Bedarf

## Datenschutz

- Eigene Fotos werden zur Analyse an die Gemini API von Google übertragen. Im kostenlosen Tarif kann Google Eingaben zur Verbesserung seiner Dienste nutzen. Deshalb weist die App vor dem Upload darauf hin, keine Fotos mit Personen oder privaten Daten hochzuladen.
- EasyRecipe speichert keine Fotos und loggt weder Bilder noch Anfragen.
- Für das Rate-Limit wird die IP-Adresse bei Upstash (Frankfurt) gespeichert und nach spätestens zwei Stunden automatisch gelöscht.
- Keine Cookies, kein Tracking. Schriften und Bilder werden selbst gehostet.

Details stehen auf der Seite [/datenschutz](https://easy-recipe-sand.vercel.app/datenschutz).

## Bekannte Grenzen

- Mengen und Zeiten sind Schätzungen aus einem Foto und keine exakten Rezeptangaben.
- Gerichte können falsch erkannt werden, besonders bei ähnlich aussehendem Essen oder schlechtem Licht. Die KI gibt dann eine niedrigere Sicherheit an.
- Das kostenlose Kontingent von Gemini ist begrenzt. An vollen Tagen helfen die Beispielbilder.
- Das Rate-Limit gilt pro IP. Mehrere Personen im selben Netz (z. B. Firmen-WLAN) teilen sich ihr Limit.

## Ausblick

- Allergen-Hinweise und geschätzte Nährwerte pro Portion
- Einkaufsliste bzw. Rezept als PDF exportieren
- Verlauf der letzten Rezepte im `localStorage`
- Umstieg auf TypeScript
- Antwort streamen, damit das Rezept schon während der Analyse erscheint
