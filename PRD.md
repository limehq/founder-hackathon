# PRD: Caterists — Hausgemachtes Catering Marketplace (Hackathon Concept)

Status: draft — hackathon concept artifact
Scope: browser-viewable mockups + pitch deck + GTM waitlist
Repo: hackathon-02 (empty at time of writing)

## Mission

Heimarbeit-Köch:innen — Hausfrauen, Eltern in Elternzeit, Rentner:innen, Sidehustler:innen mit Talent fürs Kochen — sollen einen geprüften, planbaren und rechtssicheren Weg zu echtem Nebenverdienst über lokale Catering-Aufträge bekommen. Statt einen unkontrollierten Hobbykoch-Marktplatz aufzumachen (rechtlich und vertrauensseitig nicht tragbar), bauen wir einen **Pathway-Marktplatz**, der heute mit verifizierten Micro-Caterern startet und morgen Heimarbeit-Köch:innen stufenweise einbindet (Pathway-Programm, siehe Implementation Decisions). Diese Mission ist die emotionale Nordstern-Story des Pitches und prägt Roadmap, Vision-Slide und Supply-seitige Kommunikation. Sie ist **nicht** das, was wir im MVP live verkaufen.

## Problem Statement

Office Manager und Event-Organisator:innen in Hamburg stehen regelmäßig vor demselben Problem: kurzfristiger Catering-Bedarf für Workshops, Offsites, Coworking-Events oder Team-Lunches. Aktuell heißt das: mehrere Caterer anrufen, inkonsistente Antworten zu Kapazität, Allergenen, Lieferfenstern und Preisen einsammeln, keine verbindliche Zusage, keine Trust-Signale, keine zentrale Rechnung. Wenn der angefragte Caterer absagt oder nicht antwortet, beginnt der Suchprozess von vorn.

Auf der Angebotsseite haben lokale Micro-Caterer keine verlässliche, planbare Nachfrage-Pipeline. Sie hängen an Mundpropaganda, Google-Listings und unkoordinierten Anrufen, die selten zur eigenen Kapazität und Spezialisierung passen.

## Solution

Ein zweiseitiger, kuratierter Marktplatz, der in Hamburg startet und hausgemachtes Catering von geprüften Privatköch:innen zwischen Büros, Coworking-Spaces und Event-Veranstalter:innen auf der Demand-Seite und verifizierten Köch:innen auf der Supply-Seite vermittelt. Planbare Bestellungen mit Vorlauf sind der Normalfall; kurzfristiger Bedarf (24-72h) wird ebenfalls zuverlässig abgedeckt.

Die Demand-Seite gibt ihren Bedarf in einem Formular ein, optional ergänzt durch einen Freitext, den ein AI-Intake-Widget in strukturierte Felder zerlegt (Datum, Uhrzeit, Personenanzahl, Diät, Allergien, Budget, Lieferort, Lieferfenster). Eine regelbasierte Matching-Engine bestimmt über harte Filter (Liefergebiet, Datum, Kapazität, Diät, Budget, Vorlauf) den passenden Pool. Die Anfrage wird dann an alle passenden, verifizierten Köch:innen gleichzeitig ausgespielt — wie ein Fahrtauftrag bei Uber. Es gibt keinen Angebotsvergleich und keine „Wer-ist-die-Beste"-Konkurrenz: Wer den Auftrag als Erste:r verbindlich annimmt, bekommt ihn — und ist damit zur Ausführung verpflichtet.

Sobald jemand verbindlich annimmt, wird die Demand-Seite benachrichtigt ("Brigitte hat deinen Auftrag angenommen") und beide können sich über die Plattform austauschen, um letzte Details zu klären. Storniert die angenommene Köch:in, wird der Auftrag automatisch erneut an den Pool ausgespielt (Re-Broadcast), sodass die Demand-Seite nie ohne Lösung dasteht. Trust kommt nicht aus Sternen oder Profil-Shopping, sondern daraus, dass **alle infrage kommenden Köch:innen vorab geprüft sind** — über ein **Lightweight Verified Gate** (Identität, Gewerbe, Hygiene-Selbstauskunft, Allergendaten, Kapazität, Liefergebiet, Haftpflichtbestätigung). Ein internes Standing (Annahme- und Ausführungstreue) hält den Pool verlässlich, dient aber der Eligibility, nicht einer öffentlichen Rangliste.

Für den Hackathon ist die Lieferform: zwei Routen einer öffentlich gehosteten Split-Landing-Page, klickbare High-Fidelity-Mockups des Golden Path, klickbare Onboarding-Mockups für die Supply-Seite, optionales AI-Intake-Widget als Live-Beweis, sowie ein 7-Slide-Pitch-Deck und ein parallel laufendes Waitlist-Outreach-Tracking-Sheet.

Parallel dazu kommuniziert die Plattform ihre Mission: Heimarbeit-Köch:innen sollen mittel- bis langfristig über ein gestuftes **Pathway-Programm** integriert werden (Stufe 1 verifizierte Micro-Caterer mit Gewerbe und Profi-Küche → Stufe 2 "Home-Pro" mit Gewerbe-Coaching, Hygiene-Schulung und Stunden in Partner-Profi-Küchen / Cloud Kitchens → Stufe 3 voll regulierte, beheimatete Heimarbeit-Modelle, soweit rechtlich realisierbar). Im MVP selbst werden ausschließlich Stufe-1-Anbieter aktiv vermittelt, die Pathway-Vision lebt im Pitch und in der Caterer-Waitlist als "Home-Pro Interessensbekundung".

## User Stories

### Demand-Seite (Office Manager / Event Organizer / Coworking)

1. Als Office Manager möchte ich meinen Catering-Bedarf in einem einzigen Formular eingeben, damit ich nicht mehrere Caterer einzeln anrufen muss.
2. Als Office Manager möchte ich meinen Bedarf alternativ als Freitext beschreiben können, damit ich Nuancen ausdrücken kann, die in Formularfeldern fehlen.
3. Als Office Manager möchte ich, dass das AI-Intake-Widget meinen Freitext in strukturierte Felder zerlegt (Datum, Uhrzeit, Anzahl Personen, Diät, Allergene, Budget, Lieferort, Lieferfenster), damit ich die Anfrage vor dem Absenden prüfen und korrigieren kann.
4. Als Office Manager möchte ich eine einzige Anfrage stellen, die automatisch an alle passenden, verifizierten Köch:innen ausgespielt wird, damit ich nicht selbst auswählen oder vergleichen muss.
5. Als Office Manager möchte ich, dass meine Anforderungen (Allergene, Kapazität, Lieferfenster, Preisrahmen) bereits in der Anfrage stehen und nur passende Köch:innen sie sehen, damit jede Annahme automatisch zu meinem Bedarf passt.
6. Als Office Manager möchte ich, dass meine Anfrage allen passenden Köch:innen gleichzeitig angezeigt wird, damit die schnellste verfügbare Köch:in sie verbindlich annehmen kann.
7. Als Office Manager möchte ich schnell eine verbindliche Zusage statt unverbindlicher Angebote bekommen, damit auch kurzfristiger Bedarf sofort planbar ist.
8. Als Office Manager möchte ich automatisch benachrichtigt werden, sobald eine Köch:in meinen Auftrag verbindlich angenommen hat, damit ich sofort weiß, dass er gesichert ist.
9. Als Office Manager möchte ich, dass mein Auftrag bei einer Stornierung automatisch erneut an den Pool ausgespielt wird, damit ich nie ohne Lösung dastehe.
10. Als Office Manager möchte ich mich nach der Annahme direkt mit der zugeteilten Köch:in über die Plattform austauschen, damit wir die letzten Details (Lieferung, Aufbau, Sonderwünsche) klären können.
11. Als Office Manager möchte ich über die Plattform buchen und bezahlen mit Rechnung, damit ich keinen separaten Abrechnungsprozess habe.
12. Als Office Manager möchte ich darauf vertrauen, dass jede Köch:in im Pool vorab geprüft ist (verifiziert, allergenkompetent, haftpflichtbestätigt), damit ich nicht einer Profilauswahl, sondern dem geprüften System traue — und nach der Annahme die Verifikation der zugeteilten Köch:in einsehen kann.
13. Als Office Manager möchte ich den Status meiner Buchung bis zur Lieferung verfolgen können, damit ich mein Team verlässlich informieren kann.
14. Als Event-Organisator möchte ich Einzelevents für 15-50 Personen mit 24-72h Vorlauf planen, damit ich auch auf kurzfristige Bedarfe reagieren kann.
15. Als Coworking-Space-Betreiber möchte ich, dass meine Member auf vertrauenswürdiges Event-Catering zugreifen können, damit ich Mehrwert biete, ohne selbst Catering zu operieren.

### Supply-Seite (Micro-Caterer)

16. Als Micro-Caterer möchte ich passende Aufträge sehen, sobald sie eingestellt werden — gefiltert auf meine Kapazität, Spezialisierung und Region —, damit ich keine Zeit auf Fehlanfragen verschwende und sie direkt annehmen kann.
17. Als Micro-Caterer möchte ich meine Catering-Pakete mit Allergenen, Tageskapazität, Mindestvorlauf und Liefergebiet pflegen, damit das Matching präzise wird.
18. Als Micro-Caterer möchte ich Verfügbarkeit und Restkapazität pro Tag setzen, damit ich nicht überbucht werde.
19. Als Micro-Caterer möchte ich einen passenden Auftrag mit einem Klick verbindlich annehmen können (first-come) — ohne Gegenangebot oder Verhandlung —, wobei die Annahme mich zur Ausführung verpflichtet und den Auftrag sofort für alle anderen schließt.
20. Als Micro-Caterer möchte ich, dass zuverlässige Ausführung angenommener Aufträge mein internes Standing stärkt (und Storno/No-Show es senkt), damit der Pool verlässlich bleibt — Standing steuert den Zugang, nicht eine öffentliche Rangliste.
21. Als Micro-Caterer möchte ich ein schlankes Verifikations-Onboarding (Identität, Gewerbe, Hygiene-Selbstauskunft, Allergendaten, Kapazität, Liefergebiet, Haftpflichtbestätigung), damit ich zügig sichtbar werde, ohne durch einen schweren Auditprozess zu müssen.
22. Als Micro-Caterer möchte ich später optional ein Pro-Abo abschließen können für Analytics, Planungstools und einen größeren Aktionsradius, damit ich mitwachse, ohne vorab zu zahlen (keine bezahlte Bevorzugung bei der Auftragsvergabe — die bleibt first-come).

### Supply-Pipeline: Heimarbeit-Köch:innen (Pathway-Programm, Vision)

23. Als Heimarbeit-Köch:in (z.B. Hausfrau, Elternzeit-Eltern, Rentner:in, Sidehustler:in) möchte ich planbar nebenbei mit dem Kochen Geld verdienen, damit ich meine Zeit und mein Talent in echten Nebenverdienst umwandeln kann.
24. Als Heimarbeit-Köch:in möchte ich auf der Caterer-Landing meine Interessensbekundung für das Pathway-Programm hinterlassen, damit ich beim Start der Home-Pro-Stufe kontaktiert werde.
25. Als Heimarbeit-Köch:in möchte ich verständlich erklärt bekommen, welche rechtlichen und hygienischen Anforderungen für mich gelten, damit ich meinen Weg in einen rechtssicheren Nebenverdienst kenne.
26. Als Heimarbeit-Köch:in möchte ich Coaching zur Gewerbeanmeldung, IfSG-§43-Hygieneunterweisung und Allergenkompetenz erhalten, damit ich die Voraussetzungen für die Stufe-2-Aufnahme erfülle.
27. Als Heimarbeit-Köch:in möchte ich planbare Stunden in einer Partner-Profi-Küche (Cloud Kitchen) buchen können, damit ich rechtssicher in einem geeigneten Raum produzieren kann, ohne selbst eine teure Gewerbeküche zu betreiben.
28. Als Heimarbeit-Köch:in möchte ich nach erfolgreicher Pathway-Stufe-2-Aufnahme schrittweise meine eigenen Pakete, Kapazitäten und Liefergebiete pflegen, damit ich genauso behandelt werde wie bestehende Micro-Caterer.
29. Als Heimarbeit-Köch:in möchte ich, dass die Plattform meine Pathway-Stufe transparent ausweist (Badge), damit die Demand-Seite nach der Annahme weiß, ob ich Stufe 1 oder Home-Pro bin und welche Trust-Signale dahinterstehen.

### Waitlist und Pre-Launch

30. Als potenzielle:r Demand-Kund:in möchte ich mich auf eine Waitlist eintragen mit Organisationstyp (Büro, Coworking, Event, Sonstiges), damit ich beim Hamburg-Launch benachrichtigt werde.
31. Als potenzielle:r Supply-Partner:in möchte ich mich auf eine Caterer-Waitlist eintragen mit Auswahl meines aktuellen Status (verifizierter Micro-Caterer mit Gewerbe vs. Heimarbeit-Köch:in mit Interesse am Pathway-Programm), damit ich passend zum richtigen Onboarding-Track kontaktiert werde.

### Hackathon-Team / Pitch-Erlebnis

32. Als Hackathon-Team möchte ich eine browser-aufrufbare Split-Landing-Page mit zwei Routen (`/buero`, `/caterer`), damit ich die öffentliche Eingangstür der Plattform ohne echtes Backend demonstrieren kann.
33. Als Hackathon-Team möchte ich klickbare Golden-Path-Mockups für den Office-Manager-Flow, damit die Jury die End-to-End-Story visualisieren kann.
34. Als Hackathon-Team möchte ich klickbare Onboarding-Mockups für die Caterer-Seite (inkl. eines Pathway-Hinweises für Heimarbeit-Köch:innen), damit Supply-Seite und Mission greifbar werden.
35. Als Hackathon-Team möchte ich ein optionales AI-Intake-Widget, das Freitext sichtbar in strukturierte Felder zerlegt, damit der AI-Differenzierungs-Angle live beweisbar ist.
36. Als Hackathon-Team möchte ich die Mockups öffentlich gehostet auf einer URL, damit Jury und Outreach-Kontakte sie während und nach dem Pitch besuchen können.
37. Als Hackathon-Team möchte ich ein 7-Slide-Pitch-Deck nach dem gelockten Aufbau (Hook+Problem / Lösung / Live Demo / Markt / Wettbewerb / Business+GTM+Traction / Team+Ask), damit ich Konzept, Demo, Markt, Modell, GTM, Traction und Team in 5-7 Minuten transportiere und die Heimarbeit-Mission als Vision in Slide 6 verankere.
38. Als Hackathon-Team möchte ich ein Waitlist-Tracking-Sheet mit getrennten Tabs für Demand, Micro-Caterer und Heimarbeit-Pathway, damit die Anmeldezahlen pro Spur auf der Traction-Slide ausgewiesen werden können.

## Implementation Decisions

### Scope-Festlegung

- Liefergegenstand sind **Mockups, im Browser aufrufbar**, plus ein Pitch Deck plus ein externes Waitlist-Tracking-Sheet. Keine echten Backend-Services, keine Persistierung, kein echter Mailversand, keine Authentifizierung, keine Zahlungsabwicklung.
- Realitätsanker ist ein optionales AI-Intake-Widget, das auf der Demand-Landing live Freitext in strukturierte Felder zerlegt. Erste Streichposition bei Zeitknappheit.

### Architektur und Module (Mockup-Tiefe)

- Eine einzige Frontend-Codebasis (Next.js oder Vergleichbares) hostet die Split-Landing mit zwei sichtbar getrennten Routen: `/` als Split-Hero, `/buero` als Demand-Landing, `/caterer` als Supply-Landing.
- Waitlist-Formulare sind visuell vollständig, aber funktional ohne Backend. Eingaben können clientseitig in den Local State geschrieben werden oder ins Leere laufen. Echtes Tracking läuft parallel in einem externen Spreadsheet.
- AI-Intake-Widget ist eine einzelne Komponente auf der Demand-Landing. Bei ausreichender Zeit ruft sie clientseitig ein LLM auf und zeigt das geparste Ergebnis. Bei Zeitknappheit wird es durch eine vorgeskriptete, animierte Variante ersetzt, die Parse-Output simuliert.
- Golden-Path-Mockups sind eine Sequenz von 5-8 High-Fidelity-Screens, erreichbar über einen "Live Demo"-CTA. Sequenz: Anfrage eingeben → Anfrage geht live an alle passenden Köch:innen (Broadcast-/Wartesicht) → erste verbindliche Annahme erscheint ("Brigitte hat deinen Auftrag angenommen") → Chat zum Feinschliff der Details → Bestätigung & Rechnung.
- Onboarding-Mockups für die Supply-Seite zeigen den **Lightweight Verified Gate** in 4-5 Screens: Identität, Gewerbe, Hygiene-Selbstauskunft, Pakete plus Allergene, Kapazität plus Liefergebiet.
- Catering-Domain-Shapes (Anfrage, Caterer-Profil, Match) liegen in Mockdaten vor. Kein Zod-Schema, keine Validierung im Mockup nötig, da kein Backend.
- Matching-Engine-Logik wird im Mockup als Broadcast-/Annahme-Sicht gezeigt: die Anfrage erscheint gleichzeitig bei den passenden Köch:innen, die erste verbindliche Annahme gewinnt und schließt den Auftrag. Die konzeptionelle Logik "Hard Filter (Eligibility) → Broadcast → First-Accept → Re-Broadcast bei Storno" lebt im Deck und in einer Backup-Slide, nicht im Code.
- Ein internes Standing (Annahme-/Ausführungstreue) steuert nur die Eligibility und wird der Demand-Seite **nicht** als Rangliste oder Auswahlkriterium gezeigt. Die Logik ist eine Konzept-Slide im Deck, keine Laufzeit-Berechnung und kein öffentliches Score-Label.
- Der Annahme- und Re-Broadcast-Flow wird im Mockup als gescripteter Status-Flow visualisiert: Anfrage ist live im Pool → eine Köch:in nimmt verbindlich an (Auftrag geschlossen) → bei Storno wird der Auftrag automatisch erneut an den Pool ausgespielt, bis erneut jemand annimmt.

### Positionierung und Inhalt

- Hero-Positionierung spitz auf Büro / Coworking / Event. Andere Institutionen erscheinen in einem kleinen "auch für…" Block und in einer Roadmap-Slide, nicht im Hero.
- Geo-Scope MVP: Hamburg. DACH-Expansion ist Roadmap-Slide.
- Vorlaufzeit-Versprechen: 24-72h next-day, kein same-day.
- Angebotsform: standardisierte Pakete plus Add-ons (Veggie, vegan, glutenfrei, Dessert, Getränke). Keine voll individuellen Menüs im MVP. Wichtig fürs Modell: Preis/Paket stehen schon in der Anfrage fest — die Köch:in nimmt zu bekannten Konditionen an, es wird nicht geboten oder verhandelt (Uber-Festpreis-Logik).
- Monetarisierung im Deck: 12% Take-rate auf bestätigte Buchungen, optionales Pro-Abo für Caterer zu einem späteren Zeitpunkt.
- Mock-Datensatz mit 3-4 sauber gepflegten Köch:innen plus Fülldaten — sie dienen als Identität nach der Annahme (z.B. "Brigitte") und als Pool, nicht als browsbarer Profil-Katalog. Sie decken unterschiedliche Cuisines und Liefergebiete ab, damit Broadcast und Re-Broadcast nachvollziehbar werden.
- Sprache primär Deutsch, AI-Widget akzeptiert Deutsch und Englisch.
- Brand-Name und Domain sind explizit geparkt und werden am Abend vor dem Hackathon-Tag entschieden, bevor Landing-Copy geschrieben wird.

### Pathway-Programm (Mission-Operationalisierung)

- Das Pathway-Programm ist die Brücke zwischen MVP und Mission. Es wird im MVP **nicht ausgeführt**, sondern als gestuftes Versprechen kommuniziert.
- Stufe 1 — **Verified Micro-Caterer**: bestehendes Gewerbe, eigene gewerbliche Küche, Lightweight Verified Gate. Einzige Stufe, die im MVP-Mockup live als Supply aktiv ist. Alle Hero-Profile sind Stufe 1.
- Stufe 2 — **Home-Pro (Vision)**: Heimarbeit-Köch:in mit Gewerbeanmeldung, abgeschlossener IfSG-§43-Hygieneunterweisung, Allergen-Schulung, Haftpflicht und gebuchten Stunden in einer Partner-Profi-Küche / Cloud Kitchen. Im MVP nur Interessensbekundung auf der Caterer-Waitlist plus Erklärseite. Keine Live-Vermittlung.
- Stufe 3 — **Resident-Heim (Roadmap)**: voll regulierte, beheimatete Heimarbeit-Modelle, soweit das geltende Lebensmittelrecht und die Premises-Anforderungen aus EU 852/2004 Annex II das im Einzelfall zulassen. Reine Roadmap-Slide, kein Versprechen.
- Die Caterer-Landing (`/caterer`) zeigt das Pathway-Programm prominent als 3-Stufen-Grafik mit klarem "wo stehe ich heute?" und Call-to-Action: "verifizierter Micro-Caterer beitreten" vs. "Pathway-Programm vormerken".
- Die Demand-Seite browst keine Profile; sie vertraut darauf, dass der gesamte Pool geprüft ist. Nach der Annahme sieht sie ein **Trust-Badge** der zugeteilten Köch:in, das die Pathway-Stufe transparent ausweist. Im MVP sind alle aktiven Köch:innen Stufe 1.
- Sprache: keine Verharmlosung von Compliance. Wir sagen klar: "Privatküche ohne Gewerbeanmeldung verkauft heute nicht." Das ist Teil unseres Trust-Versprechens, nicht ein Marketing-Disclaimer.

### Pitch Deck

- Sieben Slides nach festgelegtem Gerüst: Hook+Problem, Lösung, Live Demo, Markt, Wettbewerb, Business Model + GTM + Traction, Team + Ask.
- Live Demo ist Slide 3, also Energie-Peak in der Mitte, nicht am Ende.
- **Mission/Vision-Block** in Slide 6 (Business+GTM+Traction): kurze Pathway-Grafik mit drei Stufen, Aussage "wir machen Heimarbeit-Catering rechtssicher möglich", verknüpft mit dem Caterer-Waitlist-Bucket "Heimarbeit-Pathway".
- Anhang-Slides für Compliance/Recht, Standing-Logik (Annahme-/Ausführungstreue), Pathway-Programm-Details, Roadmap DACH, Unit Economics, Trust/Verifikation-Details, Cloud-Kitchen-Partnerschaftsmodell bereithalten.
- Konkreter Ask in der Team-Slide: 3-5 Pilot-Büros in Hamburg, 10 Pilot-Micro-Caterer, 1-2 Cloud-Kitchen-/Profi-Küchen-Partner für Stufe 2, Mentor:in für DACH-Lebensmittelrecht. Kein Geldbetrag.

### GTM und Traction

- Waitlist-Outreach läuft parallel zum Mockup-Build während des Hackathons.
- Zielband: 15-30 Demand-Signups, 5-10 Micro-Caterer-Signups oder qualifizierte Gespräche, zusätzlich 10-20 Heimarbeit-Pathway-Interessensbekundungen (eigene Spur, weil emotional einfacher zu mobilisieren).
- Tracking in einem externen Spreadsheet mit drei Tabs (Demand, Micro-Caterer, Heimarbeit-Pathway), je Status (kontaktiert, geantwortet, eingetragen, interessiert), Zitaten und Quelle.
- Auf der Traction-Slide werden Zahlen pro Spur plus 1-2 wörtliche Zitate gezeigt. Heimarbeit-Pathway-Zitate verstärken die Mission-Story. Bei schwacher Zahl werden Conversations-Statements gezeigt statt nackter Signups.

## Testing Decisions

- Im Hackathon werden keine automatisierten Tests geschrieben. Begründung: Liefergegenstand sind Mockups ohne Geschäftslogik, kein Backend, kein persistenter Zustand.
- Was ein guter Test wäre, falls später produktiv gebaut: ausschließlich externes Verhalten testen, nicht Implementierungsdetails. Konkret: AI-Intake-Parser mit Fixture-Eingaben in Deutsch und Englisch gegen erwartete strukturierte Ausgaben, Matching-Engine mit Fixture-Profilen gegen erwartete Eligibility (welche Köch:innen die Anfrage sehen) sowie korrekte First-Accept- und Re-Broadcast-Logik (genau eine Annahme schließt den Auftrag; Storno öffnet ihn erneut), Waitlist-Service auf Dedup und Count.
- Manuelle Validierung im Hackathon erfolgt über Generalprobe: mindestens ein vollständiger Durchlauf des Decks plus Klick durch jeden Golden-Path- und Onboarding-Screen vor dem Pitch.
- Demo-Day Sanity-Check: öffentliche URL auf Präsentations-Laptop und auf einem zweiten Gerät (Phone) prüfen.

## Out of Scope

- Echte Authentifizierung und Nutzer-Accounts.
- Echte Zahlungsabwicklung.
- Echter E-Mail-Versand und persistierte Waitlist (nur Mockup-UI).
- Voll funktionsfähige Matching-Engine als Service (Mockup-Sicht statt Laufzeit-Logik).
- Echter Verifikations-Workflow für Caterer (Onboarding nur als Mockup-Sequenz).
- Echtes Broadcast-/Re-Broadcast-Matching als Service (animierter Scripted-Flow im Mockup).
- Kitas, Schulen, Krankenhäuser, Pflegeeinrichtungen als Zielsegmente im MVP (Roadmap-Slide).
- DACH-weiter Go-to-Market (Hamburg only; DACH in Roadmap).
- Tech-Stack-Slide im Deck.
- 5-Jahres-Finanzplan.
- Tiefe Unit-Economics (nur Backup-Slide).
- Automatisierte Tests, CI, Deployment-Pipeline jenseits einer einfachen statischen Vercel-/Netlify-Veröffentlichung.
- Brand-Name und Domain (geparkt, am Abend vor Hackathon zu locken).
- Voice-Intake als Primärweg (potenzielle Iteration nach MVP).
- Heimarbeit-Köch:innen als live vermittelte Supply im MVP. Im Mockup nur als Pathway-Interessensbekundung sichtbar, nie als buchbarer Anbieter.
- Direktvermittlung von ungeprüften Privatküchen-Angeboten an B2B-Demand. Wird im Pitch aktiv und ehrlich abgegrenzt, nicht beschönigt.
- Live-Operation des Pathway-Programms (Coaching, Cloud-Kitchen-Buchung, Hygiene-Kurse). Vision-Bestandteil, kein Hackathon-Liefergegenstand.

## Further Notes

### Gelockte Entscheidungen aus dem Grilling-Prozess

1. Demand-Segment: Büro / Coworking / Event-Teams.
2. Supply: kuratierter Micro-Caterer-Marktplatz.
3. Transaktion: Anfrage-first mit verbindlicher First-Accept-Annahme (Uber-Modell: Broadcast an passenden Pool, erste:r nimmt verbindlich an; kein Angebotsvergleich, kein Bieten).
4. Pain: Hausgemachtes Catering ohne Telefonstress (planbar, kurzfristiger Bedarf inklusive).
5. Vorlauf: 24-72h next-day.
6. Angebot: Pakete plus Add-ons.
7. Monetarisierung: hybrid mit 12% Take-rate zuerst, später Pro-Abo.
8. Wirtschaftlicher Hauptkunde: Micro-Caterer.
9. Trust-Versprechen: geprüfter Pool und Zuverlässigkeit, nicht Sterne-Community oder "Wer-ist-die-Beste"-Wettbewerb. Wettbewerb läuft über Schnelligkeit der Annahme, nicht über Bewertungen.
10. Verifikation: Lightweight Verified Gate.
11. Ausfall-Handling: automatisches Re-Broadcast des Auftrags an den Pool bei Storno der angenommenen Köch:in (Kernfeature).
12. Matching-Logik: AI-Layer für Intake und Briefing plus regelbasierte Hard Filter.
13. Intake: Form plus optional AI-Freitext.
14. Geo: Hamburg first, dann DACH.
15. Demo-Daten: Mock-Datensatz mit 3-4 Hero-Profilen.
16. Golden Path: Office-Manager-Story.
17. Team: 2 Full-Stack mit AI, Design, Pitch.
18. Deliverable: Split-Landing plus optional AI-Widget plus Onboarding-Mockups plus Pitch Deck plus GTM-Tracking.
19. Positionierung: Hero spitz auf Büro/Coworking/Event.
20. Name plus Hook: geparkt für den Abend vor Hackathon.
21. Pitch-Deck: 7-Slide-Gerüst.
22. Zeitplan: 24h volles Programm.
23. Waitlist-Ziel: 15-30 Demand, 5-10 Supply.
24. Mission: Heimarbeit-Köch:innen langfristig in einen rechtssicheren, planbaren Nebenverdienst führen.
25. MVP-Wedge: ausschließlich verifizierte Micro-Caterer (Pathway-Stufe 1).
26. Pathway-Programm: 3 Stufen (Verified Micro-Caterer → Home-Pro mit Cloud Kitchen → Resident-Heim) als Mission-Operationalisierung. Im Pitch in Slide 6, im Mockup als Caterer-Landing-Block sichtbar.

### Vor Hackathon-Start zu locken

- Brand-Name und Domain.
- AI-Intake-Widget Felder-Spec, falls implementiert.
- Standing-Logik (Annahme-/Ausführungstreue) als Konzept-Slide — intern, keine öffentliche Rangliste.
- Markt-Zahlen-Quellen (DACH-Catering-Volumen, Office-Lunch-Anteil, Hybrid-Work-Trend).
- Wettbewerbsmatrix-Achsen (Vorschlag: lokal vs. national x Instant-Match/verbindlich vs. Angebots-/Auswahl-Marktplatz).

### Demo-Narrative für Slide 3 (Live Demo)

Donnerstag-16-Uhr-Hook → Office-Manager:in beschreibt Bedarf im Formular oder via AI-Intake-Freitext → Anfrage geht live an alle passenden, verifizierten Köch:innen → die Anfrage "ploppt" bei mehreren gleichzeitig auf, Brigitte nimmt als Erste verbindlich an (Auftrag sofort für alle anderen geschlossen) → Office-Manager:in wird benachrichtigt ("Brigitte hat deinen Auftrag angenommen") und beide klären im Chat die letzten Details → Bestätigung & Rechnung. (Optionaler Twist: Brigitte storniert → Auftrag wird automatisch erneut ausgespielt → Mehmet nimmt an.)

### Tracking

- Dieses Dokument lebt als Markdown im Repo (`PRD.md`).
- Waitlist-Tracking lebt in einem separaten externen Spreadsheet, dessen Link in die Traction-Slide eingebettet wird.
- Pitch Deck lebt außerhalb des Repos in einem Deck-Tool (Pencil/Figma/Slides), URL wird hier nachgepflegt.
