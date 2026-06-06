# Caterists — Design Direction v2: „Soft-Brutalist Editorial"

Übertragungsprotokoll für Pencil-Agenten. Quelle: 3 Inspirationsbilder (NIBLL + The Lunch Box).
**Wichtig:** Inhalt, Copy, Positionierung und Sektionsstruktur der bestehenden Consumer-Landing in `mockups.pen` **bleiben**. Es ändert sich **nur die visuelle Sprache**. Positionierung weiterhin: hausgemachtes Catering von geprüften Privatköch:innen.

---

## 1. Design-DNA (was die Bilder ausmacht)
1. **Soft Brutalism** — flache Farbblöcke, **dünne Hairline-Outlines (1.5px)** um Sektionen/Cards/Buttons, **keine Schatten, keine Verläufe**, harte Kanten.
2. **Pastell in großen Blöcken** auf Creme — Sage-Mint, Butter-Gelb, Blush, Sky-Blue. Sektionen wechseln die Blockfarbe.
3. **Editorial Type** — großer **Display-Serif** + cleaner **Grotesk**, viel Weißraum, Klarheit statt Fülle.
4. **Signatur-Deko** (das Einzigartige) — Monoline-Geometrie-Bänder, ◆-Sparkle-Akzente, Starburst-Bildrahmen, Pill-Buttons mit Kreis-Pfeil.

---

## 2. Farb-Tokens (Pastell) — ersetzt die warmen v1-Tokens
Gleiche Variablennamen wie heute → per `set_variables` einfach überschreiben.

| Token | Neu (v2) | Rolle |
|---|---|---|
| `surface` | `#F4F0E6` | Creme/Paper — dominanter Hintergrund |
| `surface-alt` | `#ECE5D4` | tiefere Creme (neutrale Wechsel-Sektion) |
| `surface-dark` | `#2F4A39` | Pine-Green Block (statt Braun) |
| `accent` | `#2F4A39` | Pine — Solid-Buttons, aktive Elemente, Ink-Akzent |
| `accent-soft` | `#CBE0CF` | Mint — soft Fills, Badges |
| `olive` | `#5C6B4E` | sekundäres Grün (Icons) |
| `text` | `#1B1A17` | Near-Black Ink — Text + Hairlines |
| `text-muted` | `#5B574E` | Sekundärtext |
| `text-on-dark` | `#F4F0E6` | Text auf Pine |
| `border` | `#1B1A17` | **Hairline-Ink** (1.5px) — der brutalist-Look |
| `white` | `#FFFFFF` | Karten/Felder |

**Neue Block-Tokens ergänzen:**
`block-mint #CBE0CF` · `block-butter #F7E6A8` · `block-blush #F2CDC8` · `block-sky #C2D8E2`
**Macro/Trust-Dots (optional, aus Lunch Box):** `dot-pink #E597A9` · `dot-lime #A9C24E` · `dot-yellow #E8B948`

> Hinweis: Das ersetzt die frühere Terrakotta-Welt. Primärfarbe ist jetzt **Pine-Green + Pastell-Blöcke**. Falls ein warmer Pop gewünscht: Blush/Butter sparsam als Block, nicht als Button.

---

## 3. Typografie
| Rolle | v2-Font (Google) | Ersetzt | Einsatz |
|---|---|---|---|
| `font-heading` | **Fraunces** | Playfair Display | Display-Serif für Hero/Section-Headlines & Quotes. Gewicht 400/600, optisch weich. (≈ „Austen") |
| `font-body` | **Space Grotesk** | Inter | UI, Labels, Body. (≈ „Mabry Pro") |

- **Alternativen Serif:** Newsreader · DM Serif Display · Instrument Serif.
- **Alternativen Grotesk:** Hanken Grotesk (weicher) · Familjen Grotesk.
- **Casing-Regeln:** Eyebrows/Labels/Nav = **UPPERCASE + letterSpacing ~1.5**, Grotesk. Headlines = Serif, gemischt. Body = Grotesk regular, ≥15px.
- **Optionaler „lauter" Weg (NIBLL-Route):** statt Serif bold ALL-CAPS-Grotesk-Headlines (Space Grotesk/Archivo Bold). → **Empfehlung: Serif-Route als Primär** (einzigartiger, weniger AI-Slop).

---

## 4. Form & Geometrie (Soft Brutalism)
- **Strokes:** 1.5px `border`-Ink-Hairline auf Sektionsgrenzen, Cards, Buttons, Inputs, Divider.
- **Radius:** Blöcke/Cards **0–6px** (NICHT die 16–24px Soft-Cards aus v1). Buttons/Chips = Pill (9999).
- **Elevation:** **0** — alle Schatten entfernen (`effect` raus). Flach.
- **Sektionen:** vollflächige flache Pastell-Rechtecke, alternierend; dazwischen Hairline-Rules.
- **Raster:** dünne durchgehende Hairlines dürfen Flächen teilen (vgl. Lunch-Box-Kreuzlinien) — sparsam.

---

## 5. Signatur-Deko (Pencil-Bauanleitung)
1. **PatternBand** (NIBLL) — horizontale Leiste, ~80–110px hoch, aus wiederholten **Monoline-Motiven**: Tropfen, Bogen/Regenbogen, konzentrische Kreise, Welle/Zigzag, Halbkreis, kleines Raster. Stroke 1.5px `border`/`olive`, **fill transparent**.
   - Reusable Component: horizontale Reihe, Motive als `icon` (lucide: `droplet`, `waves`; sonst `path`-SVGs) in Schleife wiederholen. Als oberer/unterer Sektions-Trenner.
2. **◆ Sparkle** — 4-Punkt-Stern als Bullet/Separator (zwischen Schritten, in Eyebrows). Pencil: `polygon` (4 spitze Zacken) oder `path`-Diamant, fill `pine`/`ink`.
3. **Starburst-Frame** (Lunch Box) — gezackter Stern-Rahmen für **ein** Hero-/Feature-Foto (Signature, sparsam). Pencil: `polygon` mit vielen Zacken oder `path` als Rahmen hinter dem Bild.
4. **Buttons — zwei Stile:** (a) **Solid Pine Rechteck/Pill**, Caps-Grotesk-Label (NIBLL); (b) **Outline-Pill mit Kreis-Pfeil-Icon** (`arrow-right` im Kreis, Lunch Box). Primär = (a), CTA-Sekundär = (b).
5. **Macro/Trust-Dots** — kleine farbige Kreis-Icons (dot-pink/lime/yellow) für Trust-Signale/Tags.

---

## 6. Foto-Stil
- Helle, **echte** Food-Fotografie, top-down, frisch; gern **farbige Pastell-Hintergründe** (mint/blush/sky/butter) wie bei den Bento-Boxen.
- **Kein AI-Slob:** keine über-glänzenden Renders, kein Bokeh/Glow-Kitsch, keine generischen Stockfoto-Klischees.

---

## 7. Sektions-Mapping (auf bestehende Landing)
| Sektion | v2-Restyle |
|---|---|
| **Nav** | Creme, Hairline-bottom, Serif/Caps-Logo, Outline-Pill-CTA (Kreis-Pfeil) |
| **Hero** | Split: links **Mint-Block** mit großer Fraunces-Headline + Solid-Pine-Button; rechts full-bleed Food-Foto (optional Starburst-Rahmen). PatternBand oben & unten |
| **TrustBar** | Hairline-Streifen, Caps-Labels + ◆-Separatoren, Monoline-Icons |
| **Warum** | 2 **Hairline-Outline-Blöcke** flach (kein Shadow); „Mit Caterists" in Mint |
| **So funktioniert's** | 3 Schritte mit **◆ zwischen** den Cards, Monoline-Step-Icons, Hairline-Divider (NIBLL-Logik) |
| **Köch:innen** | Cards mit Hairline-Outline, flach, Pastell-Foto-Hintergrund, Verifiziert als Dot-Badge |
| **Verified** | **Pine-Block** (statt Braun) oder Butter-Block; Hairline-Cards, ◆-Akzente |
| **Testimonial** | **Butter-Block**, große Serif-Quote, ◆/Anführungs-Mark |
| **CTA** | **Pine- oder Mint-Block**, Serif-Headline, Subscribe-Style Inline-Form (NIBLL-Footer-Logik) |
| **Footer** | Pine/Ink-Block, **PatternBand**, Caps-Links |

---

## 8. Pencil-Build-Hinweise (Engine-Eigenheiten — wichtig für die Agenten)
- **Zentrieren/Rechts-Verteilen ist in dieser .pen-Umgebung unzuverlässig:** `justifyContent: center/end/space_between` und Cross-Achsen-`alignItems:center` setzen die Vorderkante auf den Punkt → Overflow. `fill_container` verteilt nur bei **2** Kindern korrekt.
- **Verlässlich:** vertikale Stacks · horizontaler Start-Flow mit **fit/Fix-Breiten** · `fill_container` mit genau 2 Kindern.
- **Zentrieren:** Text via `textAlign:"center"` auf `fill_container`-Breite; Blöcke via **symmetrischem horizontalem Padding**. Mehrspaltige Reihen: **feste Pixelbreiten** + gap im Start-Flow.
- Soft-Brutalism hilft hier sogar: **flach (keine Schatten)** + Hairlines via `stroke`/`strokeWidth` (auch pro Seite möglich).
- **PatternBand/Starburst/◆** als `path`/`polygon`/`icon`-Loops bauen.
- Screenshots rendern direkt nach `batch_design` oft **leer** (Render-Timing) → mit `snapshot_layout` Geometrie prüfen, danach erneut screenshoten.

---

## 9. Don'ts (Anti-AI-Slop)
- Keine generischen Soft-Shadow-Rounded-Cards, keine Verläufe, kein Glow/Neon.
- Keine drei-gleiche-Icon-Bento-Grids ohne Eigenheit.
- Keine zentrierten Emojis, keine Stockfoto-Klischees, keine über-perfekten AI-Food-Renders.
- Outlines/Flächen bewusst & reduziert — Klarheit vor Fülle.

---

## 10. Wenn nur 5 Dinge umgesetzt werden (Prioritäten)
1. Palette → Creme + Pine + Pastell-Blöcke; alle Schatten raus.
2. Fonts → Fraunces (Serif) + Space Grotesk (Grotesk).
3. Hairline-Outlines (1.5px Ink) überall statt Soft-Cards.
4. PatternBand + ◆-Sparkles als Signatur-Deko.
5. Alternierende vollflächige Pastell-Sektionsblöcke.
