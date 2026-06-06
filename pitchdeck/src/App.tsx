import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock, Sparkles, X } from 'lucide-react'

type Tone = 'cream' | 'purple'
type Accent = 'coral' | 'sky' | 'purple' | 'pink' | 'lime' | 'yellow'

type SlideProps = {
  children: ReactNode
  eyebrow: string
  tone?: Tone
  accent?: Accent
}

// 1 · Hook + Problem
const persona = 'Office managers, team assistants, event organizers, coworking teams in Hamburg'

const todaySteps = [
  'Call five caterers, one by one',
  'Chase prices, allergens, delivery windows by phone',
  'Still no binding commitment',
  'One drops out, start over',
  'Local micro-caterers underserved',
]

// 2 · Solution
const solutionSteps = [
  'Form or free-text request',
  'Filter-based matching',
  'First binding accept closes the order',
  'Cook cancels, order auto re-broadcasts to the network',
]

// 3 · Live Demo
const demoSteps = [
  'Office manager needs lunch for 35 people',
  'Request goes live to matching, verified cooks in Hamburg',
  'Brigitte commits first, order closes for everyone else',
  'Chat sorts setup, delivery, special requests',
  'Confirmation and invoice ready. She cancels, auto re-broadcast to Mehmet.',
]

// 4 · Market
const marketPoints = [
  'MVP: Hamburg, office / coworking / event teams',
  'Supply: verified local micro-caterers, curated network',
  'Standard packages plus add-ons: veggie, vegan, gluten-free, dessert, drinks',
  'DACH expansion on roadmap, not a launch promise',
]

// 5 · Competition
const competitionPoints = [
  'Verified network, not profile shopping and star ratings',
  'Binding commitment, not comparing quotes',
  'Auto re-broadcast if the accepting cook cancels',
]

const quadrants = [
  {
    cls: 'tl',
    title: 'Status quo',
    note: 'Phone calls, classic caterers, freelance sites. Local, but quote-based.',
  },
  {
    cls: 'tr win',
    title: 'Caterists',
    note: 'Verified network, one binding accept, auto re-broadcast',
  },
  {
    cls: 'bl',
    title: 'Food delivery',
    note: 'Lieferando and Wolt. Individual meals, not event catering.',
  },
  {
    cls: 'br',
    title: 'Office-lunch subscriptions',
    note: 'One fixed provider and menu, not a curated network of verified cooks',
  },
]

const axisX = 'You coordinate / collect quotes  →  one binding match'
const axisY = 'National  →  local and verified'

// 6 · Business Model + GTM + Traction
const model = [
  { label: 'Model', body: '12% take-rate, buyers post free' },
  { label: 'Later', body: 'Optional Pro plan, no paid priority' },
  { label: 'GTM', body: 'Coworking partnerships, founder-led outreach' },
]

const traction = [
  { label: 'Demand', body: 'Goal: 15–30 waitlist signups' },
  { label: 'Micro-caterers', body: 'Goal: 5–10 signups or conversations' },
  { label: 'Home-cook pathway', body: 'Goal: 10–20 expressions of interest' },
]

const mission =
  'Vision: make home-cook catering legally possible. MVP places only stage-1 micro-caterers; home cooks join a separate pathway waitlist.'

// 7 · Team + Ask
const team = [
  {
    name: 'Jurij Koch',
    role: 'Full-stack and AI',
    email: 'jurij@limehq.dev',
    image: 'https://avatars.githubusercontent.com/u/1895950?v=4',
  },
  {
    name: 'Sebil Satici',
    role: 'Product and Design',
    email: 'sebil@limehq.dev',
    image: 'https://avatars.githubusercontent.com/u/22053023?v=4',
  },
]

const teamEdge =
  'Two founders covering full-stack, AI, product, design. Next step isn’t capital, it’s the first solid Hamburg pilot.'

const askItems = [
  '3 to 5 pilot offices in Hamburg',
  '10 pilot micro-caterers',
  '1 to 2 cloud-kitchen partners',
  'A mentor for DACH food law',
]

export default function PitchDeck() {
  const slides = useMemo(
    () => [
      { label: 'Problem', element: <ProblemSlide /> },
      { label: 'Solution', element: <SolutionSlide /> },
      { label: 'Demo', element: <LiveDemoSlide /> },
      { label: 'Market', element: <MarketSlide /> },
      { label: 'Competition', element: <CompetitionSlide /> },
      { label: 'Business', element: <BusinessSlide /> },
      { label: 'Team', element: <TeamSlide /> },
    ],
    [],
  )
  const [activeSlide, setActiveSlide] = useState(0)
  const progress = ((activeSlide + 1) / slides.length) * 100

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
  }, [slides.length])

  return (
    <main className="deck">
      <DeckHeader activeSlide={activeSlide} labels={slides.map((slide) => slide.label)} setActiveSlide={setActiveSlide} />
      <div className="slide-stage">{slides[activeSlide].element}</div>
      <footer className="deck-controls">
        <button
          disabled={activeSlide === 0}
          onClick={() => setActiveSlide((current) => Math.max(current - 1, 0))}
          type="button"
        >
          <ArrowLeft size={16} />
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
          <ArrowRight size={16} />
        </button>
      </footer>
    </main>
  )
}

function DeckHeader({
  activeSlide,
  labels,
  setActiveSlide,
}: Readonly<{
  activeSlide: number
  labels: string[]
  setActiveSlide: (slide: number) => void
}>) {
  return (
    <header className="deck-header" aria-label="Pitch deck header">
      <img className="deck-logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="Caterists" />
      <nav className="slide-dots" aria-label="Slide navigation">
        {labels.map((label, index) => (
          <button
            aria-label={`Go to slide ${index + 1}: ${label}`}
            className={index === activeSlide ? 'dot active' : 'dot'}
            key={label}
            onClick={() => setActiveSlide(index)}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </header>
  )
}

function Slide({ children, eyebrow, tone = 'cream', accent = 'purple' }: SlideProps) {
  return (
    <section className={`slide slide-${tone} slide-accent-${accent}`}>
      <div className="slide-deco" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <Sparkles className="slide-spark spark-a" />
        <Sparkles className="slide-spark spark-b" />
      </div>
      <span className="sticker sticker-eyebrow">{eyebrow}</span>
      <div className="slide-content">{children}</div>
    </section>
  )
}

function ProblemSlide() {
  return (
    <Slide eyebrow="Hook + Problem" accent="coral">
      <div className="problem-layout">
        <div className="problem-head">
          <p className="kicker">Events and micro-caterers don’t find each other.</p>
          <h2>Five calls, no commitment.</h2>
          <p className="persona">{persona}</p>
        </div>
        <div className="problem-today">
          <p className="mini-label">What happens today</p>
          <ol className="today-list">
            {todaySteps.map((step, index) => (
              <li className={index === todaySteps.length - 1 ? 'highlight' : undefined} key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Slide>
  )
}

function SolutionSlide() {
  return (
    <Slide eyebrow="Solution" tone="purple" accent="lime">
      <div className="solution-flow">
        <div className="solution-copy">
          <h2>
            One request.
            <br />
            Verified network.
            <br />
            First binding accept wins.
          </h2>
          <ol className="flow-steps">
            {solutionSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="demo-stage" aria-label="Product flow">
          <div className="demo-phone request">
            <div className="phone-bar" />
            <p className="mini-label">Request</p>
            <strong>Lunch for 35, next Thursday</strong>
            <span>Budget · allergens · cuisine · delivery window · invoice</span>
          </div>
          <div className="demo-phone matches">
            <div className="phone-bar" />
            <p className="mini-label">Broadcast</p>
            <CookCard name="Brigitte" status="matches the order" />
            <CookCard name="Mehmet" status="matches the order" />
            <CookCard name="Mina" status="matches the order" />
          </div>
          <div className="demo-phone status">
            <div className="phone-bar" />
            <p className="mini-label">Accept + fallback</p>
            <StatusLine label="Network notified" state="hot" />
            <StatusLine label="Brigitte accepts" state="ok" />
            <StatusLine label="Brigitte cancels" state="bad" />
            <StatusLine label="Re-broadcast → Mehmet" state="ok" />
          </div>
        </div>
      </div>
    </Slide>
  )
}

function LiveDemoSlide() {
  return (
    <Slide eyebrow="Live Demo" accent="sky">
      <div className="live-demo-layout">
        <div className="live-demo-copy">
          <h2>The golden path</h2>
          <ol className="today-list">
            {demoSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="demo-stage live-demo-stage" aria-label="Golden path demo">
          <div className="demo-phone request">
            <div className="phone-bar" />
            <p className="mini-label">Intake</p>
            <strong>“Monday, 35 people, veggie, 12:00 to 12:30, invoice.”</strong>
            <span>Structured into date, headcount, diet, allergens, budget, location, delivery window</span>
          </div>
          <div className="demo-phone matches">
            <div className="phone-bar" />
            <p className="mini-label">Broadcast</p>
            <CookCard name="Brigitte" status="matches capacity, area, budget" />
            <CookCard name="Mehmet" status="matches capacity, area, budget" />
            <CookCard name="Mina" status="matches capacity, area, budget" />
          </div>
          <div className="demo-phone status">
            <div className="phone-bar" />
            <p className="mini-label">Secured</p>
            <StatusLine label="Brigitte accepted" state="ok" />
            <StatusLine label="Chat open for details" state="hot" />
            <StatusLine label="Confirmation & invoice" state="ok" />
            <StatusLine label="Fallback: re-broadcast" state="hot" />
          </div>
        </div>
      </div>
    </Slide>
  )
}

function MarketSlide() {
  return (
    <Slide eyebrow="Market" accent="purple">
      <div className="market-layout">
        <div className="market-copy">
          <h2>Hamburg pilot</h2>
          <ul className="win-list">
            {marketPoints.map((point) => (
              <li key={point}>
                <Check size={22} strokeWidth={3} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="channel-primary market-card">
          <span className="tag">MVP wedge</span>
          <strong>Verified cooks meet B2B demand</strong>
          <p>
            For office managers, coworking spaces and event teams juggling several caterers, who need
            one binding commitment.
          </p>
        </div>
      </div>
    </Slide>
  )
}

function CompetitionSlide() {
  return (
    <Slide eyebrow="Competition" accent="pink">
      <div className="market-layout">
        <div className="market-copy">
          <h2>No profile shopping, no bidding</h2>
          <ul className="win-list">
            {competitionPoints.map((point) => (
              <li key={point}>
                <Check size={22} strokeWidth={3} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="matrix" aria-label="Competitive positioning matrix">
          {quadrants.map((quadrant) => (
            <div className={`matrix-cell ${quadrant.cls}`} key={quadrant.title}>
              <strong>{quadrant.title}</strong>
              <p>{quadrant.note}</p>
            </div>
          ))}
          <span className="axis axis-x">{axisX}</span>
          <span className="axis axis-y">{axisY}</span>
        </div>
      </div>
    </Slide>
  )
}

function BusinessSlide() {
  return (
    <Slide eyebrow="Business + GTM + Traction" tone="purple" accent="lime">
      <div className="business-layout business-compact">
        <h2>Hamburg pilots, three waitlist tracks</h2>
        <div className="model-row">
          {[...model, ...traction].map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mission-strip">
          <p>{mission}</p>
        </div>
      </div>
    </Slide>
  )
}

function TeamSlide() {
  return (
    <Slide eyebrow="Team + Ask" accent="yellow">
      <div className="team-layout">
        <div className="team-head">
          <h2>Team and the ask</h2>
          <div className="team-cards">
            {team.map((member) => (
              <article key={member.name}>
                <img className="team-avatar" src={member.image} alt={member.name} width={88} height={88} />
                <div className="team-meta">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                  <a className="team-email" href={`mailto:${member.email}`}>
                    {member.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="team-edge">{teamEdge}</p>
        </div>
        <div className="ask-block">
          <p className="mini-label">No money, just the right first partners</p>
          <div className="ask-grid">
            {askItems.map((item) => (
              <article key={item}>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

function CookCard({ name, status }: Readonly<{ name: string; status: string }>) {
  return (
    <article className="match-card">
      <span />
      <div>
        <strong>{name}</strong>
        <p>{status}</p>
      </div>
    </article>
  )
}

function StatusLine({ label, state }: Readonly<{ label: string; state: 'ok' | 'bad' | 'hot' }>) {
  const Icon = state === 'ok' ? Check : state === 'bad' ? X : Clock
  return (
    <div className={`status-line ${state}`}>
      <span className="sl-badge">
        <Icon size={13} strokeWidth={3} />
      </span>
      <p>{label}</p>
    </div>
  )
}
