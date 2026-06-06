import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type SlideProps = {
  children: ReactNode
  eyebrow: string
  tag?: string
  tone?: 'blue' | 'white'
}

// 1 · Hook + Problem
const persona = 'Office managers, team assistants, event organizers and coworking teams in Hamburg.'

const todaySteps = [
  'Call five caterers, one by one',
  'Chase prices, allergens and delivery windows by phone',
  'Still get no binding commitment',
  'If one drops out, it all starts over',
  'Local micro-caterers are underserved',
]

const supplyNote =
  'They have the talent and capacity, but no steady stream of demand that matches their specialty.'

// 2 · Solution
const solutionSteps = [
  'A form or free text captures date, headcount, diet, allergens, budget, location and delivery window.',
  'AI intake turns it into a checkable, fixed-price brief.',
  'Hard filters send it to every matching, verified cook at once.',
  'First binding accept: the first cook to commit closes the order.',
  'If a cook cancels, the order goes back to the pool automatically.',
]

// 3 · Live Demo
const demoSteps = [
  'An office manager needs lunch for 35 people.',
  'The request goes live to matching, verified cooks in Hamburg.',
  'Brigitte commits first, and the order closes for everyone else.',
  'In chat, both sides sort out setup, delivery and special requests.',
  'Confirmation and invoice are ready. If she cancels, it re-broadcasts to Mehmet.',
]

// 4 · Market
const segments = ['Office lunches', 'Workshops and meetings', 'Coworking events', 'One-off events for 15 to 50 people']

const marketPoints = [
  'MVP: Hamburg, office / coworking / event teams.',
  'Supply: verified local micro-caterers in a curated pool.',
  'Standard packages plus add-ons: veggie, vegan, gluten-free, dessert, drinks.',
  'DACH expansion stays on the roadmap, not a launch promise.',
]

// 5 · Competition
const competitionPoints = [
  'A verified pool instead of profile shopping and star ratings.',
  'A binding commitment instead of comparing quotes.',
  'Automatic re-broadcast if the cook who accepted cancels.',
]

const winPoints = [
  'Every cook is verified up front.',
  'The fastest matching accept wins, and it is binding.',
  'Standing controls eligibility internally, not a public ranking.',
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
    note: 'Verified pool, AI intake, one binding accept, auto re-broadcast.',
  },
  {
    cls: 'bl',
    title: 'Food delivery',
    note: 'Lieferando and Wolt. Individual meals, not event catering.',
  },
  {
    cls: 'br',
    title: 'Office-lunch subscriptions',
    note: 'One fixed provider and menu, not a curated pool of verified cooks.',
  },
]

const axisX = 'You coordinate / collect quotes  →  one binding match'
const axisY = 'National  →  local and verified'

// 6 · Business Model + GTM + Traction
const model = [
  { label: 'Model', body: '12% take-rate on confirmed bookings. Buyers post for free.' },
  { label: 'Later', body: 'Optional Pro plan for caterers, with no paid priority in matching.' },
  { label: 'GTM', body: 'Coworking partnerships plus founder-led office outreach in Hamburg.' },
]

const traction = [
  { label: 'Demand', body: 'Goal: 15 to 30 waitlist signups.' },
  { label: 'Micro-caterers', body: 'Goal: 5 to 10 signups or qualified conversations.' },
  { label: 'Home-cook pathway', body: 'Goal: 10 to 20 expressions of interest.' },
]

const evidence = [
  '“Today we call four to six caterers per event. One binding yes would be enough.” (office manager)',
  '“Unpredictable, mismatched demand is my biggest problem.” (micro-caterer)',
]

const mission =
  'Vision: we make home-cook catering legally possible. The MVP places only stage-1 micro-caterers; home cooks join a separate pathway waitlist.'

const pathwayStages = ['Verified Micro-Caterer', 'Home-Pro + partner pro kitchen', 'Resident model (roadmap)']

const trackingNote =
  'Tracking sheet with three tabs: demand, micro-caterers, home-cook pathway, each with status, source and quote.'

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
  'Two founders covering full-stack, AI, product and design. The next step is not capital, but the first solid Hamburg pilot.'

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

function Slide({ children, eyebrow, tag = 'CATERISTS', tone = 'white' }: SlideProps) {
  return (
    <section className={`slide slide-${tone}`}>
      <div className="slide-grid" aria-hidden="true" />
      <div className="slide-meta top-left">{eyebrow}</div>
      <div className="slide-meta top-right">{tag}</div>
      <div className="slide-meta bottom-left">HAMBURG</div>
      <div className="slide-content">{children}</div>
    </section>
  )
}

function ProblemSlide() {
  return (
    <Slide eyebrow="Hook + Problem">
      <div className="problem-layout">
        <div className="problem-head">
          <p className="kicker">Offices and cooks don’t find each other.</p>
          <h2>Five calls, no binding yes.</h2>
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
          <p className="problem-supply">{supplyNote}</p>
        </div>
      </div>
    </Slide>
  )
}

function SolutionSlide() {
  return (
    <Slide eyebrow="Solution" tone="blue">
      <div className="solution-flow">
        <div className="solution-copy">
          <h2>
            One request.
            <br />
            Verified pool.
            <br />
            First binding accept wins.
          </h2>
          <p className="body-copy">
            Caterists is not a profile marketplace. The buyer posts one checked request, every matching
            cook sees it at the same time, and the first binding yes closes the order.
          </p>
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
            <span>Budget · allergens · cuisine · delivery window · invoice.</span>
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
            <StatusLine label="Pool notified" state="hot" />
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
    <Slide eyebrow="Live Demo">
      <div className="live-demo-layout">
        <div className="live-demo-copy">
          <h2>The golden path in 90 seconds</h2>
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
            <span>AI intake structures date, headcount, diet, allergens, budget, location and delivery window.</span>
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
    <Slide eyebrow="Market">
      <div className="market-layout">
        <div className="market-copy">
          <h2>Hamburg first, DACH later</h2>
          <div className="segment-chips">
            {segments.map((segment) => (
              <span key={segment}>{segment}</span>
            ))}
          </div>
          <ul className="win-list">
            {marketPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="channel-primary market-card">
          <span className="tag">MVP wedge</span>
          <strong>We bring verified cooks and B2B demand together</strong>
          <p>
            Focused on office managers, coworking spaces and event teams who juggle several caterers
            today and need one binding commitment.
          </p>
        </div>
      </div>
    </Slide>
  )
}

function CompetitionSlide() {
  return (
    <Slide eyebrow="Competition">
      <div className="market-layout">
        <div className="market-copy">
          <h2>No profile shopping, no bidding</h2>
          <ul className="win-list">
            {competitionPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="segment-chips">
            {winPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
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
    <Slide eyebrow="Business + GTM + Traction" tone="blue">
      <div className="business-layout business-compact">
        <h2>12% take-rate, Hamburg pilots, three waitlist tracks</h2>
        <div className="model-row">
          {model.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="traction-row">
          {traction.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="evidence-row">
          <p className="evidence-label">{trackingNote}</p>
          <div className="evidence-cards">
            {evidence.map((quote) => (
              <blockquote key={quote}>{quote}</blockquote>
            ))}
          </div>
        </div>
        <div className="mission-strip">
          <p>{mission}</p>
          <div className="stage-chips">
            {pathwayStages.map((stage, index) => (
              <span key={stage}>
                {index + 1}. {stage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

function TeamSlide() {
  return (
    <Slide eyebrow="Team + Ask">
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
          <p className="contact">Hamburg, Germany</p>
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
  return (
    <div className={`status-line ${state}`}>
      <span />
      <p>{label}</p>
    </div>
  )
}
