# Consumer Landing V3 — „Playful Neo Brutalist" + Uber-Modell

Build-Brief für Pencil. Kombiniert **Modell-Update** (Uber/First-Accept, siehe `PRD.md`) + **Visual** (Playful Neo Brutalist, baut auf `DESIGN-DIRECTION.md` auf). Marke: **Caterists**, hausgemachtes Catering von geprüften Privatköch:innen, Hamburg.

---

## 1. Was das Modell-Update für die Landing ändert (Inhalt)
**Raus** (alte Airbnb/Etsy-Logik):
- ❌ Köch:innen zum Durchstöbern / pickbarer Profil-Katalog
- ❌ „Profil und Bewertung", Sterne, Reliability-% als Auswahlkriterium
- ❌ „Angebote vergleichen / das beste auswählen"
- ❌ benannte Hero-Köch:innen-Cards als Auswahl

**Rein** (Uber/First-Accept):
- ✅ **Eine Anfrage → Broadcast an alle passenden, geprüften Köch:innen → erste:r nimmt verbindlich an**
- ✅ Benachrichtigung „**Brigitte hat deinen Auftrag angenommen**" → Chat zum Feinschliff
- ✅ Wettbewerb = **Schnelligkeit**, nicht „wer ist die Beste"
- ✅ Trust = **gesamter Pool vorab geprüft** (nicht Profil-Shopping); Identität erst **nach** Annahme sichtbar
- ✅ Bei Storno: **automatisches Re-Broadcast**
- ✅ **Festpreis-Logik**: Preis/Paket stehen in der Anfrage, kein Bieten/Verhandeln

---

## 2. Visual: Playful Neo Brutalist
Basis-Palette & Fonts aus `DESIGN-DIRECTION.md` bleiben (Creme/Pine/Mint/Butter/Blush/Sky; Fraunces + Space Grotesk). **Neo-brutalistische Schärfung gegenüber V2:**

| Merkmal | V3 Playful Neo Brutalist |
|---|---|
| **Borders** | **2–3px Ink-Outline** (`#1B1A17`) auf Cards, Buttons, Sektionsblöcken, Inputs — das definierende Element |
| **Schatten** | **Harte Offset-Schatten** (`blur:0`, `offset {x:5,y:5}`, color `#1B1A17`) statt soft — chunky „Sticker"-Look. *(Das überschreibt das „keine Schatten" aus V2 — hier sind harte Schatten gewollt.)* |
| **Ecken** | chunky: 12–18px rounded für Cards/Buttons; 0px für harte Vollblöcke. Mix erlaubt. |
| **Farbe** | flache Pastell-Vollblöcke + **ein punchy Akzent** für CTAs/Sticker (z.B. Tangerine `#F0734A` oder kräftiges Pine) — sparsam, „dezent playful" |
| **Type** | Fraunces groß & chunky (Headlines), Space Grotesk Caps für Labels |
| **Playful-Deko** | **◆ Sparkles**, **Starburst-Sticker-Badges** (leicht rotiert, z.B. „Verbindlich!"/„In Minuten"), optional Monoline-PatternBand. Sticker dürfen leicht **gedreht** sein (`rotation`) |
| **Buttons** | chunky Pill/Block, dicke Outline + harter Schatten („drückbar") |

**Anti-AI-Slop bleibt:** keine soft-blurry Cards, keine Verläufe, keine generischen Bento-Grids, echte helle Food-Fotos.

---

## 3. Sektions-Plan V3 (Reihenfolge & Inhalt)
1. **Nav** — Logo „Caterists", schlanke Links, „Bist du Koch:in? →", CTA-Button (Outline+Schatten). Border-bottom 2px.
2. **Hero** — Modell-forward Headline (s. Copy unten), Subhead erklärt den Mechanismus, Waitlist-CTA. Großes Food-Foto mit 3px-Border + hartem Schatten; ein rotierter Sticker („In Minuten verbindlich").
3. **★ So funktioniert's (3 Schritte)** — **jetzt prominent direkt nach Hero**, denn das IST die Differenzierung. Chunky nummerierte Cards mit Border+Schatten, ◆ zwischen den Schritten.
4. **★ Der Match-Moment (neue Signature-Sektion)** — visualisiert „Anfrage live → ploppt bei mehreren auf → Brigitte nimmt an" als Sticker/Notification-Card. Demo-tauglich, einzigartig.
5. **Warum Caterists** — Ohne/Mit-Vergleich, **Copy gefixt** (s. unten). 2 Blöcke mit Border+Schatten.
6. **Trust / Verified Gate** — **Pool-Level**: „Jede Köch:in ist geprüft, bevor sie annehmen darf." 5 Gate-Items (Identität, Gewerbe, Hygiene, Allergene, Haftpflicht) als Sticker-Cards. Dunkler Pine- oder Butter-Block.
7. **Qualität statt Auswahlstress** *(ersetzt die alte „Köch:innen-Showcase")* — Food-forward Collage + Aussage „Du wählst nicht aus Dutzenden Profilen — du bekommst geprüfte Qualität ohne Recherche. Wer kocht, erfährst du bei der Zusage." **Keine** pickbaren Köch:innen-Cards.
8. **Testimonial** — bleibt (Office-Manager-Zitat), als großes Sticker-Quote.
9. **Waitlist-CTA** — punchy Akzent-Block, Email + Org-Typ-Chips, chunky Button.
10. **Footer** — Pine/Ink-Block, optional PatternBand.

---

## 4. Ready-to-paste Copy (DE)

**Hero**
- Eyebrow: `HAUSGEMACHTES CATERING · HAMBURG`
- Headline (Option A, mechanisch): „Anfrage rein. Geprüfte Köch:innen nehmen an."
- Headline (Option B, Analogie): „Catering bestellen, so einfach wie ein Taxi rufen."
- Subhead: „Beschreib deinen Bedarf — Caterists spielt ihn sofort an alle passenden, geprüften Privatköch:innen in Hamburg. Wer zuerst annimmt, kocht verbindlich. Kein Vergleichen, kein Hinterhertelefonieren."
- CTA: `Auf die Warteliste` · Microtrust: `Geprüfter Pool · Hygiene n. IfSG §43 · Haftpflicht`

**So funktioniert's**
1. **Bedarf beschreiben** — „Anlass, Personen, Termin, Diät — per Formular oder einfach in eigenen Worten."
2. **Geht live an den Pool** — „Deine Anfrage erscheint sofort bei allen passenden, geprüften Köch:innen."
3. **Erste:r nimmt verbindlich an** — „„Brigitte hat angenommen" — ihr klärt im Chat die Details. Fertig, in Minuten statt Tagen."

**Match-Moment (Sticker-Texte)**
- `Deine Anfrage ist live · 12 passende Köch:innen` → `✓ Brigitte hat angenommen` → `Chat geöffnet`

**Warum Caterists (gefixt)**
- *Ohne:* Telefonketten · unverbindliche Zusagen · anonyme Großküche · bei Absage alles von vorn
- *Mit Caterists:* **Verbindliche Zusage in Minuten** · **Geprüfter Pool — kein Profil-Vergleichen** · **Hausgemacht & frisch** · **Bei Storno sofort neu vermittelt**

**Trust**
- Headline: „Geprüft, bevor sie annehmen darf." Sub: „Niemand im Pool kann deinen Auftrag annehmen, ohne unser Verified Gate zu bestehen."

---

## 5. Pencil-Build-Hinweise
- **Harter Schatten:** `effect:[{type:"shadow", shadowType:"outer", color:"#1B1A17", offset:{x:5,y:5}, blur:0, spread:0}]`
- **Dicke Border:** `stroke:"$ink", strokeWidth:2` (oder 3 für Hero-Bild).
- **Sticker-Rotation:** `rotation:` leicht (z.B. -4 bis 6 Grad) für Playfulness.
- **Engine-Quirks (wichtig!):** Zentrieren/Rechts-Verteilen ist unzuverlässig → Texte via `textAlign:"center"` auf `fill_container`-Breite, Blöcke via symmetrischem Padding zentrieren, Mehrspalter mit **festen Pixelbreiten** im Start-Flow, email+button = feste Feldbreite. `fill_container` nur mit **2** Kindern verlässlich.
- **Snapshot-Timing:** direkt nach `batch_design` rendern Screenshots/Snapshots oft falsch (leer/„clipped") — erst nach ein paar weiteren Calls erneut prüfen, nicht vorschnell „reparieren".
- Token `ink #1B1A17` und Akzent-Pop (z.B. `pop #F0734A`) ggf. via `set_variables` ergänzen.

---

## 6. Empfehlung
- **Headline A** (mechanisch) — kommuniziert das einzigartige Modell sofort; B als Alternative.
- **Match-Moment-Sektion** ist das stärkste neue Element — unbedingt einbauen, sie verkauft das Uber-Prinzip visuell.
