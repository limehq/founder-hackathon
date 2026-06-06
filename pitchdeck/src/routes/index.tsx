import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/')({
  component: PitchDeck,
})

type Slide = {
  eyebrow: string
  title: string
  proof: string
  bullets: string[]
  panel: 'problem' | 'solution' | 'demo' | 'why' | 'market' | 'pathway' | 'team'
}

type DemoStep = {
  label: string
  title: string
  body: string
  meta: string
}

const slides: Slide[] = [
  {
    eyebrow: '01 / Problem + Customer',
    title: 'Last-minute team catering still runs on phone calls.',
    proof: 'Hamburg office managers, coworking teams, and event organizers lose time when tomorrow’s lunch becomes a supplier chase.',
    bullets: [
      'They call multiple caterers for capacity, allergens, delivery windows, and prices.',
      'Responses are inconsistent, hard to compare, and rarely invoice-ready.',
      'If one caterer declines or goes silent, the search starts again.',
    ],
    panel: 'problem',
  },
  {
    eyebrow: '02 / Solution + Product',
    title: 'Tablo turns one request into reliable catering options.',
    proof: 'One structured request reaches verified local micro-caterers, then Tablo keeps the booking moving with comparable offers and backup matching.',
    bullets: [
      'AI-assisted intake extracts date, headcount, diet, budget, address, and delivery window.',
      'Verified micro-caterers receive requests that match capacity, cuisine, and coverage.',
      'The buyer compares structured offers and books through one B2B flow.',
    ],
    panel: 'solution',
  },
  {
    eyebrow: '03 / Clickable Demo',
    title: 'From panic to booked in one flow.',
    proof: 'Click through the golden path: intake, AI parse, matches, timeout, backup, comparison, confirmation.',
    bullets: [
      'The demo is scripted mockup behavior, not a fake backend.',
      'It shows the specific workflow judges need to understand in under one minute.',
      'The core proof is not AI novelty; it is reduced coordination failure.',
    ],
    panel: 'demo',
  },
  {
    eyebrow: '04 / Why Now',
    title: 'AI makes messy catering requests machine-readable.',
    proof: 'The wedge works now because intake chaos can be structured instantly while local supply needs better demand than phone calls and Google listings.',
    bullets: [
      'Hybrid teams create short-notice workshops, offsites, and team lunches.',
      'AI converts natural language into the fields caterers need to quote quickly.',
      'Tablo is more than a wrapper because fulfillment depends on verified local supply and backup operations.',
    ],
    panel: 'why',
  },
  {
    eyebrow: '05 / Market + Competition',
    title: 'Start with Hamburg teams that cannot afford catering failure.',
    proof: 'The first market is bottom-up: offices, coworking spaces, and event teams buying 15-50 person catering with 24-72h lead time.',
    bullets: [
      'Status quo: phone calls, Google searches, spreadsheets, and fragmented invoices.',
      'Large caterers are often slow or inflexible for last-minute smaller events.',
      'Generic food platforms do not solve B2B trust, allergens, invoices, or backup reliability.',
    ],
    panel: 'market',
  },
  {
    eyebrow: '06 / Business + GTM + Pathway',
    title: 'Verified supply today. A compliant path for home cooks tomorrow.',
    proof: 'Tablo starts with verified micro-caterers, then opens a Pathway for talented home cooks to become trusted Home-Pro providers.',
    bullets: [
      'Business model: 12% take-rate on confirmed bookings; later optional Pro visibility for caterers.',
      'First 50 customers: direct outreach to Hamburg offices, coworking spaces, event organizers, and micro-caterers.',
      'Compliance line: unverified private kitchens are not listed for B2B catering.',
    ],
    panel: 'pathway',
  },
  {
    eyebrow: '07 / Team + Ask',
    title: 'A small team building the operational wedge first.',
    proof: 'Jurij Koch and Sebil Satici cover product, engineering, AI prototyping, design, pitch, and market validation for the hackathon sprint.',
    bullets: [
      'Ask: 3-5 Hamburg pilot offices or coworking spaces.',
      'Ask: 10 pilot micro-caterers and 1-2 professional kitchen or cloud-kitchen partners.',
      'Ask: a mentor for DACH food-law and hygiene compliance.',
    ],
    panel: 'team',
  },
]

const demoSteps: DemoStep[] = [
  {
    label: 'Intake',
    title: '“Workshop lunch tomorrow, 35 people.”',
    body: 'Office manager enters a natural-language request with vegetarian options, nut allergy, budget, and HafenCity delivery.',
    meta: 'Thursday 16:00 / 24-72h window',
  },
  {
    label: 'AI parse',
    title: 'The request becomes quote-ready fields.',
    body: 'Date, delivery time, headcount, allergens, diet, budget, location, and delivery window are extracted for review.',
    meta: 'No caterer has to decode a messy brief',
  },
  {
    label: 'Matches',
    title: 'Three verified caterers are selected.',
    body: 'Hard filters check delivery area, capacity, diet fit, budget, and lead time; soft ranking weighs reliability and response speed.',
    meta: 'Verified Micro-Caterer / Stage 1 supply',
  },
  {
    label: 'Failure',
    title: 'One declines. One stays silent.',
    body: 'The status flow makes failure visible instead of forcing the buyer to chase suppliers manually.',
    meta: 'Reliability is operational, not a star rating',
  },
  {
    label: 'Backup',
    title: 'Backup matching activates automatically.',
    body: 'A qualified backup caterer receives the same structured brief and clear deadline.',
    meta: 'Core wedge: last-minute reliability',
  },
  {
    label: 'Compare',
    title: 'Two structured offers are compared.',
    body: 'The buyer compares menu package, allergens, delivery window, price range, and verification signals side by side.',
    meta: 'B2B decision without phone chaos',
  },
  {
    label: 'Booked',
    title: 'The team lunch is confirmed.',
    body: 'Booking confirmation, invoice-ready summary, delivery status, and caterer reliability updates close the loop.',
    meta: 'Outcome: tomorrow is handled',
  },
]

function PitchDeck() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [demoStep, setDemoStep] = useState(0)
  const slide = slides[activeSlide]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        setActiveSlide((current) => Math.min(current + 1, slides.length - 1))
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveSlide((current) => Math.max(current - 1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setDemoStep(0)
  }, [activeSlide])

  const progress = useMemo(() => ((activeSlide + 1) / slides.length) * 100, [activeSlide])

  return (
    <main className="deck-shell">
      <div className="grain" aria-hidden="true" />
      <header className="top-bar" aria-label="Deck controls">
        <a className="brand" href="#slide" aria-label="Tablo pitch deck home">
          <span className="brand-mark">T</span>
          <span>Tablo</span>
        </a>
        <nav className="slide-dots" aria-label="Slide navigation">
          {slides.map((item, index) => (
            <button
              aria-label={`Go to slide ${index + 1}: ${item.title}`}
              className={index === activeSlide ? 'dot active' : 'dot'}
              key={item.eyebrow}
              onClick={() => setActiveSlide(index)}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </nav>
        <div className="share-note">Public pitch / 7 slides</div>
      </header>

      <section className={`slide slide-${slide.panel}`} id="slide">
        <div className="slide-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="proof">{slide.proof}</p>
          <div className="bullets" aria-label="Slide points">
            {slide.bullets.map((bullet) => (
              <p key={bullet}>{bullet}</p>
            ))}
          </div>
        </div>

        <SlidePanel panel={slide.panel} demoStep={demoStep} setDemoStep={setDemoStep} />
      </section>

      <footer className="bottom-bar">
        <button
          disabled={activeSlide === 0}
          onClick={() => setActiveSlide((current) => Math.max(current - 1, 0))}
          type="button"
        >
          Previous
        </button>
        <div className="progress-track" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <button
          disabled={activeSlide === slides.length - 1}
          onClick={() => setActiveSlide((current) => Math.min(current + 1, slides.length - 1))}
          type="button"
        >
          Next
        </button>
      </footer>
    </main>
  )
}

function SlidePanel({
  panel,
  demoStep,
  setDemoStep,
}: Readonly<{
  panel: Slide['panel']
  demoStep: number
  setDemoStep: (step: number) => void
}>) {
  if (panel === 'demo') {
    const step = demoSteps[demoStep]

    return (
      <aside className="visual-card demo-card" aria-label="Clickable demo">
        <div className="demo-screen">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <strong>tablo.app/request</strong>
          </div>
          <p className="kicker">{step.label}</p>
          <h2>{step.title}</h2>
          <p>{step.body}</p>
          <div className="demo-meta">{step.meta}</div>
        </div>
        <div className="demo-steps">
          {demoSteps.map((item, index) => (
            <button
              className={index === demoStep ? 'demo-step active' : 'demo-step'}
              key={item.label}
              onClick={() => setDemoStep(index)}
              type="button"
            >
              <span>{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    )
  }

  if (panel === 'pathway') {
    return (
      <aside className="visual-card pathway-card" aria-label="Pathway stages">
        <div className="pathway-stage live">
          <span>Stage 1 / Live MVP</span>
          <strong>Verified Micro-Caterer</strong>
          <p>Business registration, professional kitchen, hygiene self-check, allergens, capacity, delivery area, liability confirmation.</p>
        </div>
        <div className="pathway-stage vision">
          <span>Stage 2 / Vision</span>
          <strong>Home-Pro Pathway</strong>
          <p>Home cooks, housewives, parents on leave, retirees, and side-hustlers register interest, then complete business, hygiene, allergen, liability, and partner-kitchen steps.</p>
        </div>
        <div className="compliance-line">Private kitchens without verification are not listed for B2B catering.</div>
      </aside>
    )
  }

  if (panel === 'team') {
    return (
      <aside className="visual-card team-card" aria-label="Team and ask">
        <div className="team-names">
          <strong>Jurij Koch</strong>
          <strong>Sebil Satici</strong>
        </div>
        <div className="ask-grid">
          <span>3-5 pilot offices</span>
          <span>10 micro-caterers</span>
          <span>1-2 kitchen partners</span>
          <span>Food-law mentor</span>
        </div>
        <div className="contact-card">tablo / Hamburg-first / June 2026</div>
      </aside>
    )
  }

  const panelContent: Record<Exclude<Slide['panel'], 'demo' | 'pathway' | 'team'>, { title: string; rows: string[] }> = {
    problem: {
      title: 'Current workflow',
      rows: ['Call caterers', 'Ask about allergens', 'Wait for quotes', 'Chase silence', 'Restart after failure'],
    },
    solution: {
      title: 'Tablo workflow',
      rows: ['One request', 'AI-structured brief', 'Verified supply', 'Comparable offers', 'Backup matching'],
    },
    why: {
      title: 'Why now',
      rows: ['Hybrid work events', 'AI intake quality', 'Local supply pressure', 'B2B trust gap', 'Cost of coordination'],
    },
    market: {
      title: 'Beachhead',
      rows: ['Hamburg offices', 'Coworking spaces', 'Event teams', '15-50 people', '24-72h lead time'],
    },
  }

  const content = panelContent[panel]

  return (
    <aside className="visual-card stack-card" aria-label={content.title}>
      <h2>{content.title}</h2>
      {content.rows.map((row, index) => (
        <div className="stack-row" key={row}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{row}</strong>
        </div>
      ))}
    </aside>
  )
}
