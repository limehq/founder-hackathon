# Caterists — Haftung, Gewährleistung & Versicherung

Status: Arbeitsgrundlage. **Kein Rechtsrat** (⚖️ = Fachanwält:in). Ergänzt [01-legal-compliance.md](01-legal-compliance.md).

---

## A. Haftungskette im Schadensfall (z. B. Lebensmittelinfektion)
| Anspruchsgegner | Grundlage | Greift wann |
|---|---|---|
| **Köch:in (primär)** | Produkthaftungsgesetz (fehlerhaftes Produkt), §823 BGB (Delikt), Vertragshaftung ggü. Kund:in | Immer bei Mangel der Speise — sie ist Herstellerin & Lebensmittelunternehmerin |
| **Caterists (sekundär)** | nur **eigene** Pflichtverletzung: mangelhafte Verifikation, falsche Allergen-Darstellung im Listing, Listen ungeprüfter Anbieter | Bei Sorgfaltsverstoß der Plattform |
| **Caterists als „Verkäufer"** | volle Produzentenhaftung | **Nur falls** Vermittler-Konstruktion kippt (→ Memo 01.B) |

**Kernprinzip:** Vermittlerrolle + lückenlose Verifikation halten die Plattform aus der Primärhaftung. Das Restrisiko der Plattform ist **Sorgfaltshaftung**, nicht Produzentenhaftung.

---

## B. Vertragsarchitektur (3-seitig)
```
        Anbieter-AGB                     Nutzer-AGB
Köch:in ───────────► CATERISTS ◄─────────── Kund:in
   │                  (Vermittler)                │
   └──────── Speisen-/Leistungsvertrag ───────────┘
              (kommt DIREKT zustande)
```
**Schlüsselklauseln:**
- **Freistellung (Indemnification):** Köch:in stellt Caterists von Ansprüchen Dritter aus ihrer Zubereitung frei.
- **Versicherungspflicht** der Köch:in als Vertragsbedingung (Gate).
- **Haftungs-Cap** der Plattform (eigene Pflichtverletzungen) — ⚖️ Grenze in B2B-AGB via §307 BGB beachten; Vorsatz/grobe Fahrlässigkeit/Körperschäden nicht beschränkbar.
- **Pflichten-Katalog Köch:in:** Einhaltung Lebensmittelrecht, korrekte Allergenangabe, Kühlkette bis Übergabe, Rückverfolgbarkeit.
- **Ranking-/Sperr-Transparenz** (P2B): wann Reliability Score sinkt, wann Sperre.

---

## C. Versicherungen
| Police | Träger | Funktion | Status |
|---|---|---|---|
| **Betriebs- & Produkthaftpflicht** (inkl. Personenschäden Lebensmittel) | **Köch:in** | deckt den Hauptschadensfall | **Pflicht-Gate** im Onboarding |
| **E&O / Vermögensschaden-Haftpflicht** | Caterists | Vermittlungs-/Beratungsfehler | ab Pilot |
| **Betriebshaftpflicht + Cyber** | Caterists | Allgemein + Datenschutz/IT | ab Pilot |
| **Rahmen-/Gruppenversicherung** „Caterists Schutz" | Caterists organisiert, Köch:innen nutzen | Conversion-Booster: Köch:innen kommen leichter ins Gate; einheitliches Deckungsniveau | ⚖️ Konstruktion ohne §34d-Erlaubnis prüfen (Kooperation mit Maklerpool) |

→ Die **Rahmenversicherung ist gleichzeitig Trust-Feature und Supply-Acquisition-Hebel**: Sie senkt die Onboarding-Hürde der Köch:innen und garantiert Kund:innen ein Mindest-Deckungsniveau.

---

## D. Gewährleistung vs. Reklamationsprozess
Klassische BGB-Gewährleistung (Nacherfüllung) passt bei **verderblicher Ware/Dienstleistung** kaum — niemand „bessert" ein verdorbenes Buffet nach.
**Lösung = operativer Reklamations-/Erstattungsprozess** als Produktfeature:
- Definierte Mängel (zu spät, falsche Menge, Qualitäts-/Hygienemangel) → **sofortige Teil-/Vollerstattung** und/oder
- **Backup-Lieferung** über das automatische Backup-Matching (PRD-Kernfeature → hier zahlt es doppelt: Reliability *und* Gewährleistungsersatz).
- Klare SLAs & Eskalation; dokumentiert für Trust und für etwaige Behördenmeldung.

---

## E. Incident- & Rückruf-Prozess (muss vor Stufe-2-Launch stehen)
1. **Meldung/Trigger:** Kund:innen-Report, Beschwerde, Verdacht Lebensmittelinfektion.
2. **Sofortmaßnahme:** betroffene Köch:in/Gericht **sperren**, andere Bestellungen prüfen.
3. **Behörden:** ⚖️ Mitteilungspflicht des Lebensmittelunternehmers nach **Art. 19 VO 178/2002** (Köch:in; Plattform unterstützt) ans zuständige Amt.
4. **Kund:innen-Info** der betroffenen Aufträge (Rückverfolgbarkeit greift hier).
5. **Erstattung/Backup** + Dokumentation.
6. **Review:** Re-Zertifizierung oder dauerhafte Entfernung; Reliability-Score-Effekt.

Dieser Prozess ist **kein Nice-to-have** — seine Existenz ist Teil der Sorgfalt, die die Plattform aus der Haftung hält, und ein hartes Diligence-Item für Investoren.
