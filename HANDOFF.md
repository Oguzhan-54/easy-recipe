# Übergabe – Stand 28.10.2026

Diese Datei fasst den letzten Arbeitsstand zusammen, damit es an einem anderen Rechner
(oder in einer neuen Claude-Code-Sitzung) nahtlos weitergehen kann.
**Claude: Lies zuerst `CLAUDE.md`, dann diese Datei.** Nach Abschluss des nächsten Schritts
kann die Datei gelöscht oder aktualisiert werden.

---

## Wichtige Rahmenbedingungen (nicht im Code ablesbar)

- **Live-Seite ist pausiert** (Vercel „Pause Project“, Besucher sehen 503). Erst wieder
  freischalten, wenn ich es ausdrücklich sage. Pushes auf `main` werden von Vercel in der
  Zeit blockiert („Deployment was blocked“, rotes X bei GitHub) – das ist erwartet, kein Fehler.
  Nach dem Freischalten muss der neueste Commit einmal neu deployt werden.
- **Alles muss kostenlos bleiben.** Kein Billing bei Google, Vercel, Upstash oder anderen
  Diensten. Keine Bezahl-Tarife vorschlagen.
- GitHub-Repo ist privat; öffentlich machen ist eine eigene Entscheidung.
- Arbeitsweise: pro Thema ein Branch, `git merge --no-ff` nach `main`, pushen nur auf Ansage.

## Was zuletzt erledigt wurde

- Redesign (Farben, Header-/Footer-Box, Hero mit Zutaten-Etiketten, breite Upload-Karte)
- Neue Seite `/rezepte`; fertige Rezepte liegen als JSON in `src/recipes/` (Fotos in
  `public/recipes/`), Startseite zeigt die ersten drei aus `src/recipes/index.js`
- 4 neue Rezepte (Pancakes, Linsensuppe, Butter Chicken, Gemüse-Rührei)
- Impressum und Datenschutzerklärung nach Recherche neu geschrieben
  (§ 5 DDG, § 18 MStV, Art. 13 DSGVO; Vercel, Google Gemini, Upstash, LDI NRW)

## Problem: Gemini darf so nicht live laufen

Die Gemini-API-Bedingungen (Stand 28.04.2026, https://ai.google.dev/gemini-api/terms) sagen:
„You may use only Paid Services when making API Clients available to users in the European
Economic Area.“ Eine öffentliche App für EU-Nutzer geht also nur mit Bezahl-Tarif – ausgeschlossen.

## Nächster Schritt: Umstieg auf Cloudflare Workers AI (Empfehlung)

Recherche-Ergebnis (Okt. 2026):

| Option                                                                     | Ergebnis                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Workers AI + `@cf/mistralai/mistral-small-3.1-24b-instruct`** | **Empfehlung:** 10.000 Neurons/Tag gratis ohne Kreditkarte (danach schlagen Anfragen fehl, keine Kosten), kein Training, keine Speicherung von Ein-/Ausgaben, Bildverständnis, `guided_json` für JSON-Schema, Apache-2.0-Lizenz |
| Mistral eigene API                                                         | Training standardmäßig an, Gratis-Plan/Business-Pflicht unklar                                                                                                                                                                  |
| Groq                                                                       | Bildmodell ist Llama 4 → Lizenz schließt Entwickler mit Sitz in der EU aus                                                                                                                                                      |
| Llama-Vision-Modelle (überall)                                             | gleiches EU-Lizenzproblem                                                                                                                                                                                                       |
| OpenRouter `:free`                                                         | nur 50 Anfragen/Tag, Training je nach zufälligem Anbieter                                                                                                                                                                       |

Schätzung (nicht gemessen): ca. 150–250 Neurons pro Analyse → etwa 40–60 Analysen/Tag.
Preise: Mistral Small 3.1 = 31.876 Neurons pro 1 Mio. Input-Token, 50.488 pro 1 Mio. Output-Token.

### Ablauf

1. **Ich:** kostenlosen Cloudflare-Account anlegen, API-Token mit Recht „Workers AI“ erstellen,
   `CF_ACCOUNT_ID` und `CF_API_TOKEN` in die `.env` eintragen (Claude bekommt die Werte nie zu sehen).
2. **Testaufruf** mit einem Foto aus `public/recipes/`: klären, in welchem Format das Bild
   übergeben wird (die Modellseite zeigt kein Bildbeispiel) und ob die Rezeptqualität reicht.
   REST-Endpunkt: `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistralai/mistral-small-3.1-24b-instruct`
3. **Umbau** (erst Plan zeigen, dann umsetzen):
   - `api/_lib/gemini.js` → Cloudflare-Modul per `fetch` (kein SDK), Fallback-/Retry-Logik,
     Timeout, `isValidRecipe` und Fehlerklassen beibehalten
   - `recipeSchema` als `guided_json` übergeben, System-Prompt übernehmen
   - `tests/gemini.test.js` und `tests/analyze.test.js` anpassen
   - Tageslimit in `api/_lib/rateLimit.js` von 100 auf ca. 40 senken
   - `@google/genai` aus `package.json` entfernen
   - `.env.example`, README (Tech-Stack, Entscheidungen), `CLAUDE.md` (Tech-Stack, Abschnitt 9)
   - Datenschutzerklärung `src/components/PrivacyPage.jsx` Abschnitte 2, 5, 8 und 10
     auf Cloudflare umschreiben

### Vor dem Livegang noch prüfen

- Gilt Cloudflares Auftragsverarbeitungsvertrag (DPA) auch für Gratis-Konten?
- Wo verarbeitet Cloudflare die Anfrage (evtl. USA)? Ist Cloudflare unter dem EU-US
  Data Privacy Framework zertifiziert? (dataprivacyframework.gov)
- Upstash-Region Frankfurt im Upstash-Dashboard bestätigen (steht so in der Datenschutzerklärung)

## Sonstige offene Punkte

- `CLAUDE.md` Abschnitt 9 sagt noch, der Gemini-Gratis-Tarif nutze Daten zum Training –
  für EWR-Entwickler stimmt das nicht mehr (und nach dem Umstieg ist Gemini ohnehin raus).
- `CLAUDE.md` verlangt den Hinweis „Mengen geschätzt anhand des Bildes“ bei den Zutaten –
  der Hinweis wurde auf Wunsch von der Ergebnisseite entfernt. Ggf. nur bei analysierten Fotos wieder einbauen.
- Fotografen-Namen für die 4 neuen Rezeptfotos fehlen (`photoCredit` in den JSON-Dateien),
  falls die Bilder von Unsplash sind.
- `butter-chicken.jpg` zeigt vermutlich Paneer statt Hähnchen – ggf. als Paneer Butter Masala umbenennen.
- Live-Upload/Ladeanzeige wurde noch nie im Browser mit echtem Foto getestet
  (lokal mit `MOCK_AI=recipe` und `npm run dev:vercel` möglich).
