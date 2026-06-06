# Caterists — Style Guide „Consumer Landing v4" (Neo-Brutalist Pop)

Extrahiert aus der Frame **Consumer Landing v4 — Neo-Brutalist Pop** (`mockups.pen`).
Enthält nur, was in dieser Frame tatsächlich verwendet wird: Design-Variablen + alle hartkodierten Hex-Werte.

---

## 🎨 Farben

### Kern-Palette (Design-Variablen)
| Variable | Hex | Verwendung |
|---|---|---|
| `nb-bg` | `#ECEADF` | Haupt-Hintergrund (Seite, Nav, Hero, helle Sections) |
| `nb-bg2` | `#E3E0D2` | Alternativer Section-Hintergrund (How, Trust) |
| `nb-ink` | `#141414` | Text-Primär, **alle Outlines/Strokes**, Borders |
| `nb-white` | `#FFFFFF` | Karten, Buttons, Chips, Input-Felder |
| `nb-muted` | `#57544B` | Sekundärtext, Beschreibungen, Platzhalter |

### Akzentfarben (die „Pop"-Palette)
| Variable | Hex | Verwendung |
|---|---|---|
| `nb-purple` | `#6E3FE0` | Primär-Akzent: CTA-Bereiche, „Mit Caterists"-Karte, Footer, Newsletter-Block, Eyebrows, Avatare |
| `nb-purple-soft` | `#EBE4FB` | Sanfter lila Karten-Hintergrund (Phone-Mockup) |
| `nb-pink` | `#E6197F` | Akzent: Stat-Zahl, Blobs, Sparkles, Step-2-Badge |
| `nb-lime` | `#B7E334` | Akzent: Highlight-Box, Check-Icons, Step-3-Badge, Blobs |
| `nb-sky` | `#46BEEA` | Akzent: Stat-Zahl, Avatar, Blobs |
| `nb-coral` | `#FF6A3D` | Akzent: Stat-Zahl, X-Icons („Ohne Caterists"), Eyebrows |
| `nb-yellow` | `#FFC93C` | Akzent: Testimonial-Avatar |

### Hartkodierte Hex-Werte (nicht als Variable — ggf. tokenisieren)
| Hex | Verwendung |
|---|---|
| `#000000` | „Annahme"-Karte im Phone-Mockup |
| `#8DC153` | Grünes Häkchen-Icon (Annahme) |
| `#EDE7FB` | Heller Text auf lila „Mit Caterists"-Karte |
| `#E7DBFB` | Subhead-Text im Newsletter-Block |
| `#E0D4FA` | Footer-Tagline-Text |
| `#CBBDF5` | Footer-Copyright-Text |
| `#8B6FE8` | Footer-Trennlinie |

### Schatten
| Hex (mit Alpha) | Verwendung |
|---|---|
| `#16161614` (≈8 %) | Weicher Schatten auf kleinen Elementen (Buttons, Inputs, Highlight) |
| `#16161618` (≈9 %) | Schatten auf großen Karten (Stats, Steps, Gates, Blocks) — Offset `y:10`, Blur `26` |

---

## ✍️ Typografie

| Variable | Font | Rolle |
|---|---|---|
| `nb-display` | **Plus Jakarta Sans** | Headlines, Stat-Zahlen, Karten-Titel, Step-Nummern |
| `nb-body` | **DM Sans** | Fließtext, Nav, Buttons, Eyebrows, Labels, Footer |

### Display (Plus Jakarta Sans) — Weight durchgehend `800`
| Stil | Size | Line-Height |
|---|---|---|
| Hero H1/H2 | 54 | 1.0–1.02 |
| Newsletter-Headline | 44 | 1.05 |
| Section-Headline | 42 | 1.1 |
| Section-Headline (Qualität) | 40 | 1.1 |
| Karten-Titel (Vergleich) | 23 | – |
| Step-Titel | 21 | 1.15 |
| Gate-/Phone-Titel | 17–18 | – |
| Stat-Zahlen | 42 | – |
| Step-Nummern | 26 | – |

### Body (DM Sans)
| Stil | Size | Weight |
|---|---|---|
| Subhead / Intro | 18 | normal |
| Newsletter-Subhead | 17 | normal |
| Listen-/Vergleichstext | 16 | normal |
| Nav-Links | 15 | 500 (aktiv: 700) |
| Step-Beschreibung / Footer-Links | 15 | normal |
| Input-Platzhalter | 16 | normal |
| Gate-Beschreibung | 13.5 | normal |
| Eyebrow / Label | 14 | 700 · **letter-spacing 1.5** |
| Social-Proof / Chips / Buttons | 14 | 600–700 |

---

## 🧱 Stil-Konventionen (Neo-Brutalist Pop)
- **Outlines überall:** schwarzer Stroke (`nb-ink`) auf allen Karten/Buttons/Chips/Icon-Badges. Breite `2` (kleine), `2.5` (große Blöcke), `1.5` (Phone-Mockup-Elemente).
- **Pill-Shapes:** `cornerRadius: 9999` für Buttons, Inputs, Chips, Avatare, Icon-Badges.
- **Karten-Radius:** 16–26 (Stats 16, Steps/Gates/Compare 18, Newsletter-Block 26).
- **Verspielte Rotation:** Karten leicht gekippt (≈ −2° bis +2°) für den „Pop"-Look.
- **Deko-Elemente:** Sparkles, Doodle-Pfeile, Squiggles, Herzen, organische Blobs in den Akzentfarben.
