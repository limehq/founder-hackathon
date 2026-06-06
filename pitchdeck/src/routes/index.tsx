import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/')({
  component: PitchDeck,
})

type Panel = 'problem' | 'solution' | 'demo' | 'why' | 'market' | 'pathway' | 'team'

type Slide = {
  eyebrow: string
  title: string
  subtitle: string
  focus: string
  points: string[]
  panel: Panel
}

type DemoStep = {
  label: string
  title: string
  detail: string
}

const slides: Slide[] = [
  {
    eyebrow: '01 / Problem + Customer',
    title: 'Talented home cooks need a legal path to real catering income.',
    subtitle: 'Housewives, parents on leave, retirees, and side-hustlers can cook, but cannot safely sell B2B catering from an unverified private kitchen.',
    focus: 'Mission: turn cooking talent into planned, compliant side income.',
    points: ['Cooking talent', 'No safe route', 'Lost income'],
    panel: 'problem',
  },
  {
    eyebrow: '02 / Solution + Product',
    title: 'Tablo is a Pathway marketplace.',
    subtitle: 'We start with verified micro-caterers, then guide home cooks step by step toward Home-Pro supply.',
    focus: 'No uncontrolled hobby-cook marketplace. Trust comes first.',
    points: ['Verified today', 'Pathway tomorrow', 'Trust always'],
    panel: 'solution',
  },
  {
    eyebrow: '03 / Clickable Demo',
    title: 'The first wedge is reliable team catering.',
    subtitle: 'Offices create the paid demand. Tablo makes the request structured, verified, and backed up.',
    focus: 'Demo flow: request → matches → failure → backup → booked.',
    points: ['Paid demand', 'Verified supply', 'Backup matching'],
    panel: 'demo',
  },
  {
    eyebrow: '04 / Why Now',
    title: 'AI makes the pathway operational.',
    subtitle: 'AI turns vague catering needs into structured briefs, while the Pathway turns informal cooking talent into trusted supply.',
    focus: 'AI helps coordination. Compliance protects trust.',
    points: ['AI intake', 'Trust checks', 'Local supply'],
    panel: 'why',
  },
  {
    eyebrow: '05 / Market + Competition',
    title: 'Hamburg is the starting city, not the whole ambition.',
    subtitle: 'Demand starts with offices and events. Supply starts with micro-caterers and expands through the Home-Pro Pathway.',
    focus: 'Win by combining verified local supply with a legal path for new supply.',
    points: ['Offices', 'Micro-caterers', 'Home-Pro future'],
    panel: 'market',
  },
  {
    eyebrow: '06 / Business + GTM + Pathway',
    title: 'The business starts where trust is already possible.',
    subtitle: 'Revenue comes from confirmed catering bookings. The Pathway grows supply without breaking the trust promise.',
    focus: 'Important: unverified private kitchens are never live B2B supply.',
    points: ['12% take-rate', 'Pilot customers', 'Pathway interest'],
    panel: 'pathway',
  },
  {
    eyebrow: '07 / Team + Ask',
    title: 'We need pilots, supply, and compliance help.',
    subtitle: 'Jurij Koch and Sebil Satici are building the first working version and validating both sides: demand and future supply.',
    focus: 'Ask: help us prove the Pathway marketplace in Hamburg.',
    points: ['Pilot offices', 'Micro-caterers', 'Food-law mentor'],
    panel: 'team',
  },
]

const demoSteps: DemoStep[] = [
  {
    label: 'Request',
    title: '“Lunch tomorrow, 35 people.”',
    detail: 'The buyer writes the need like a normal message.',
  },
  {
    label: 'Parse',
    title: 'Tablo extracts the facts.',
    detail: 'Date, time, headcount, diet, allergens, budget, address.',
  },
  {
    label: 'Match',
    title: 'Three verified caterers fit.',
    detail: 'Only suppliers with capacity, coverage, and trust checks appear.',
  },
  {
    label: 'Fail',
    title: 'One declines. One is silent.',
    detail: 'The buyer sees the problem instead of chasing it manually.',
  },
  {
    label: 'Backup',
    title: 'A backup caterer activates.',
    detail: 'Tablo sends the same structured brief to another qualified supplier.',
  },
  {
    label: 'Compare',
    title: 'Two offers are easy to compare.',
    detail: 'Menu, price, allergens, delivery window, verification.',
  },
  {
    label: 'Booked',
    title: 'Tomorrow is handled.',
    detail: 'The buyer gets confirmation and an invoice-ready summary.',
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
          <p className="subtitle">{slide.subtitle}</p>
          <p className="focus">{slide.focus}</p>
        </div>

        <SlidePanel panel={slide.panel} demoStep={demoStep} setDemoStep={setDemoStep} />

        <div className="point-strip" aria-label="Slide keywords">
          {slide.points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
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
  panel: Panel
  demoStep: number
  setDemoStep: (step: number) => void
}>) {
  if (panel === 'demo') {
    const step = demoSteps[demoStep]

    return (
      <aside className="visual-card demo-card" aria-label="Clickable demo">
        <div className="demo-screen">
          <p className="kicker">Step {demoStep + 1}</p>
          <h2>{step.title}</h2>
          <p>{step.detail}</p>
        </div>
        <div className="demo-steps">
          {demoSteps.map((item, index) => (
            <button
              className={index === demoStep ? 'demo-step active' : 'demo-step'}
              key={item.label}
              onClick={() => setDemoStep(index)}
              type="button"
            >
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
        <SimpleStage label="Today" title="Verified Micro-Caterers" text="Already legal, already checked, ready for B2B catering." />
        <SimpleStage label="Next" title="Home-Pro Pathway" text="Housewives, parents, retirees, and side-hustlers get a compliant route into paid cooking." />
        <div className="compliance-line">No unverified private kitchens in the live marketplace.</div>
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
          <span>Pilot offices</span>
          <span>Micro-caterers</span>
          <span>Kitchen partners</span>
          <span>Food-law mentor</span>
        </div>
      </aside>
    )
  }

  const model: Record<Exclude<Panel, 'demo' | 'pathway' | 'team'>, { before: string; after: string; label: string }> = {
    problem: {
      before: 'Talent → No legal route → No income',
      after: 'The supply problem',
      label: 'Mission',
    },
    solution: {
      before: 'Micro-caterer → Home-Pro → Resident-Heim',
      after: 'A staged path, not a free-for-all',
      label: 'Tablo',
    },
    why: {
      before: 'Messy request + informal supply',
      after: 'Structured brief + verified pathway',
      label: 'Why now',
    },
    market: {
      before: 'Demand today → Supply expansion tomorrow',
      after: 'Hamburg offices fund the first Pathway',
      label: 'Beachhead',
    },
  }

  const content = model[panel]

  return (
    <aside className="visual-card simple-card" aria-label={content.label}>
      <p className="kicker">{content.label}</p>
      <strong>{content.before}</strong>
      <span>{content.after}</span>
    </aside>
  )
}

function SimpleStage({ label, title, text }: Readonly<{ label: string; title: string; text: string }>) {
  return (
    <div className="pathway-stage">
      <span>{label}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  )
}
