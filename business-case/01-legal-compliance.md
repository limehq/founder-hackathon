# Caterists — Legal & Compliance Memo

Status: Arbeitsgrundlage (Hackathon / Pre-Seed). **Kein Rechtsrat.** Finale Prüfung durch Fachanwält:in für Lebensmittel- & Plattformrecht erforderlich (mit ⚖️ markiert).
Kontext: Home-Catering-Marktplatz „Caterists", Start Hamburg. Supply = geprüfte Privatköch:innen.

---

## A. Kernfrage: Darf aus einer Privatküche an B2B verkauft werden?
**Ja — bei korrekter Registrierung.** Verbreiteter Irrtum ist „Privatküche = verboten". Tatsächlich:

- **VO (EG) 852/2004, Anhang II Kapitel III** regelt ausdrücklich Räume, *„die hauptsächlich als privates Wohnhaus genutzt werden, in denen aber regelmäßig Lebensmittel für das Inverkehrbringen zubereitet werden"* — mit **verhältnismäßigen** (nicht industriellen) Hygieneanforderungen.
- Damit ist Home-Catering **rechtlich gangbar**, wenn die Köch:in folgende Schritte erfüllt:

| # | Anforderung | Rechtsgrundlage | Wer |
|---|---|---|---|
| 1 | **Gewerbeanmeldung** (ggf. Kleinunternehmer §19 UStG) | GewO / UStG | Köch:in |
| 2 | **Registrierung als Lebensmittelunternehmer** beim zuständigen Amt (Lebensmittelüberwachung/Veterinäramt) — Registrierung, *nicht* Voll-Zulassung, solange keine zulassungspflichtigen tierischen Erzeugnisse | Art. 6 VO 852/2004 | Köch:in |
| 3 | **IfSG §43-Belehrung** (Erstbelehrung Gesundheitsamt, Folgebelehrung alle 2 Jahre durch Unternehmer) + §42 Tätigkeitsverbote beachten | IfSG | Köch:in |
| 4 | **Verhältnismäßige Küchen-Abnahme** durch das Amt (Anhang II Kap. III) | VO 852/2004 | Amt/Köch:in |
| 5 | **Allergen- & Kennzeichnungspflichten** (14 Hauptallergene; lose Ware nat. LMIDV) | VO 1169/2011 (LMIV) | Köch:in (Plattform stützt) |
| 6 | **Rückverfolgbarkeit** (eine Stufe vor/zurück) + Eigenkontrollen/HACCP-Grundsätze | Art. 18 VO 178/2002 | Köch:in |

⚖️ **Zu klären je Bundesland/Kreis:** Auslegung der „Verhältnismäßigkeit" der Küchen-Anforderungen variiert zwischen Ämtern (Hamburg konkret prüfen). Das ist der operativ kritischste Punkt.

> **Strategische Pointe:** Genau diesen Pfad gangbar zu machen, *ist* das Produkt von Caterists. Die Regulatorik ist kein Hindernis, sondern der **Burggraben** — wer den Compliance-Funnel betreibt, gewinnt das Supply-Netzwerk.

---

## B. Die kritische Weiche: Vermittler vs. Verkäufer
Die wichtigste juristische Designentscheidung der gesamten Firma.

- **Modell Vermittler (empfohlen):** Vertrag über die Speisenleistung kommt **direkt zwischen Köch:in und Kund:in** zustande. Caterists stellt nur Infrastruktur, Matching, Zahlungsabwicklung, Trust-Layer. → Die **primäre lebensmittelrechtliche Haftung trägt die Köch:in** als Lebensmittelunternehmer.
- **Bedingung, damit die Abschirmung trägt:**
  - AGB, Rechnungsfluss und **Außenkommunikation konsequent als Vermittlung** ("Caterists vermittelt geprüfte Köch:innen") — **nicht** "Caterists liefert/kocht".
  - Kein Auftreten als eigener Anbieter (kein eigenes Menü, keine eigene Preishoheit, die wie Verkäuferschaft wirkt).
- **Risiko der Umqualifizierung:** Tritt die Plattform faktisch wie ein Verkäufer auf (Branding, Preissetzung, Eigenleistung), droht **Verkäufer-/Produzentenhaftung**. (Vgl. Plattform-Debatten Uber/Lieferando.) → Konsequenz in Marketing **und** Recht halten.
- **Eigene Pflichten bleiben** auch als Vermittler: sorgfältige Verifikation, Allergen-Transparenz im Listing, Rückverfolgbarkeits-Infrastruktur. Haftung droht bei **eigener** Pflichtverletzung (z. B. Listen ungeprüfter Anbieter).

---

## C. Was die Plattform selbst regulatorisch trifft
- **DSA (Digital Services Act):** Marktplatz-Pflichten, u. a. **Rückverfolgbarkeit der Unternehmer / „Know Your Business Customer"** (Identifizierung & Plausibilisierung der Anbieter), Notice-&-Action-Verfahren, Transparenz. ⚖️ Anwendungsumfang im B2B-Setting prüfen.
- **P2B-Verordnung (2019/1150):** Anbieter (Köch:innen) sind „gewerbliche Nutzer" → **Transparenzpflichten** zu AGB, Ranking-Kriterien (Reliability Score!), Kündigung/Sperre.
- **DSGVO:** Identitäts-, Gewerbe-, Gesundheits-(!)nahe Daten der Köch:innen → Achtung besondere Kategorien bei IfSG-Belehrung; AVV, Löschkonzept, Rechtsgrundlagen sauber.
- **Zahlungsabwicklung:** Treuhand/Payment via lizenzierten PSP (z. B. Stripe Connect) → eigene **E-Geld/ZAG-Lizenz vermeiden** durch PSP-Konstruktion. ⚖️ Geldwäsche/KYC über PSP abdecken.

---

## D. Pathway als Compliance-Stufenmodell (was wann live geht)
| Stufe | Wer | Compliance-Status | Live im MVP? |
|---|---|---|---|
| **1 — Verified Micro-Caterer** | bestehendes Gewerbe + eigene gewerbliche Küche | voll geprüft, geringstes Risiko | **Ja** — Wedge & Hero-Profile |
| **2 — Home-Pro** | Privatköch:in mit Gewerbe + registrierter Privatküche **oder** gebuchten Stunden in Partner-/Cloud-Kitchen | Pfad A–C oben durchlaufen | Pilot nach Legal-Freigabe |
| **3 — Resident-Heim** | voll regulierte Heimmodelle, soweit Amt zulässt | Einzelfall | Roadmap |

→ **Investoren-Botschaft:** „Wir starten mit dem rechtssichersten Segment (Stufe 1) und industrialisieren den Weg, auf dem Privatköch:innen *legal* nachrücken (Stufe 2). Den Schritt, der bei anderen die Firma killt, machen wir zum skalierbaren Prozess."

---

## E. Onboarding-Gate = Rechts-Checkliste (Dokumente pro Anbieter)
1. Ausweis/Identität (KYC) ✔
2. Gewerbeanmeldung / Steuernummer ✔
3. Nachweis Lebensmittelunternehmer-Registrierung beim Amt ✔
4. IfSG §43-Belehrung (Datum, Folgetermin) ✔
5. Allergen-/Zutatendeklaration je Gericht ✔
6. Nachweis Betriebs-/Produkthaftpflicht (siehe Memo 02) ✔
7. Küchen-Selbstauskunft / ggf. Abnahmebestätigung ✔
8. Akzeptierte Anbieter-AGB inkl. Freistellung ✔

Kein Häkchen optional. Re-Zertifizierung jährlich + bei Incident.

---

## F. Offene Fragen für die Fachanwält:in ⚖️
1. Hamburg-spezifische Auslegung Anhang II Kap. III (welche Küchenanforderungen real?).
2. Trägt die Vermittler-Konstruktion belastbar — oder droht Verkäuferhaftung bei unserem Branding/Preisfluss?
3. DSA-/P2B-Pflichtenumfang im B2B-Marktplatz.
4. Zulässige Haftungs-/Gewährleistungsbeschränkungen in B2B-AGB (§307 BGB).
5. Datenschutz-Behandlung gesundheitsnaher Anbieter-Daten (IfSG).
6. Konstruktion „Caterists-Versicherungsschutz" (Rahmenvertrag) ohne eigene Versicherungsvermittler-Erlaubnis (§34d GewO)?
