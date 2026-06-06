import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/')({
  component: PitchDeck,
})

type SlideProps = {
  children: ReactNode
  eyebrow: string
  tag?: string
  tone?: 'blue' | 'white'
}

// 1 · Problem + Customer
const persona =
  'Office managers and team assistants at companies of 20 to 200 people, plus agencies and coworking spaces in Hamburg.'

const todaySteps = [
  'Call five caterers, one by one',
  'Chase quotes on price, allergens and delivery',
  'Still get no firm yes',
  'One drops out, and the search starts over',
]

const supplyNote =
  'Good local cooks have the talent but no steady, compliant stream of orders that fits their capacity.'

// 2 · Solution + Product
const solutionSteps = [
  'AI intake turns a free-text request into one fixed-price brief.',
  'Hard filters send it to every eligible, verified cook at once.',
  'The first cook to accept is committed to deliver.',
  'If they cancel, it goes back to the pool automatically.',
]

// 3 · Why Now
const catalysts = [
  {
    tag: 'Cost collapse',
    title: 'AI intake got cheap',
    body: 'Parsing a messy request into a structured, fixed-price brief used to be hard. Now it costs cents per request and works well enough to show a buyer.',
  },
  {
    tag: 'Behaviour shift',
    title: 'Office food is recurring now',
    body: 'Hybrid schedules and return-to-office turned catered team days into a regular budget line, not a one-off treat.',
  },
  {
    tag: 'Supply boom',
    title: 'Micro-caterers are everywhere',
    body: 'There are now plenty of small, licensed food businesses and rentable commercial kitchens to build a pool from.',
  },
]

const moat =
  'The AI is just the intake. The hard part to copy is the verified pool of cooks and the dispatch: one binding accept, and an automatic re-broadcast when someone cancels.'

// 4 · Market + Competition
const segments = ['Office lunches, workshops, offsites', 'Coworking member events', 'Events for 15 to 50 people']

const winPoints = [
  'Every cook is verified before an order goes out. No profile shopping.',
  'A firm yes in minutes, not a pile of quotes.',
  'If a cook cancels, the order re-broadcasts on its own.',
]

const quadrants = [
  {
    cls: 'tl',
    title: 'Status quo',
    note: 'Phone-around, classic caterers, freelance-chef sites. Local but quote-based, no firm yes.',
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
    title: 'Office-lunch subs',
    note: 'Like Smunch. Recurring daily lunch, not one-off events.',
  },
]

const axisX = 'You coordinate  →  one binding match'
const axisY = 'National  →  local and verified'

// 5 · Business Model + Traction
const model = [
  { label: 'Who pays', body: 'Cooks pay us. Buyers post for free.' },
  { label: 'How much', body: '12% of each confirmed order. A Pro tier for cooks comes later.' },
  { label: 'How often', body: 'Every booking, and teams book on a regular cadence.' },
]

const evidence = [
  '“We already call four to six caterers per event. I would switch for one firm yes.” (office manager)',
  '“Unpredictable, mismatched demand is my biggest problem.” (micro-caterer)',
]

const mission =
  'Where this goes: a legal, planned way for home cooks to earn on the side. Parents on leave, retirees, people who can really cook.'

const pathwayStages = ['Verified Micro-Caterer', 'Home-Pro + partner kitchen', 'Resident model']

// 6 · Go-to-Market
const gtmPrimary = {
  tag: 'Primary channel',
  title: 'Coworking-space partnerships in Hamburg',
  body: 'Each coworking and flex-office operator hosts dozens of member companies and wants catering they don’t have to run themselves. One partnership brings a cluster of demand, and two founders can walk into ten of them.',
}

const gtmSide = [
  {
    tag: 'Backed by outbound',
    title: 'Founder-led office outreach',
    body: '200 contacted → 25 calls → about 20 pilot teams, via LinkedIn and local ops groups.',
    funnel: true,
  },
  {
    tag: 'In parallel',
    title: 'Seed the pool first',
    body: '10 verified micro-caterers from Maps, local listings and direct DMs. The pool has to exist before demand shows up.',
    funnel: false,
  },
]

// 7 · Team + Ask + Contact
const team = [
  { name: 'Jurij Koch', role: 'Full-stack and AI' },
  { name: 'Sebil Satici', role: 'Product and Design' },
]

const teamEdge =
  'Two of us, covering full-stack, AI and design. We built and shipped this product and this deck during the hackathon, and we will move at that pace to get the first Hamburg cooks and offices live.'

const askItems = [
  '3 to 5 Hamburg pilot offices',
  '10 verified pilot cooks',
  '1 to 2 cloud-kitchen partners',
  'A DACH food-law mentor',
]

function PitchDeck() {
  const slides = useMemo(
    () => [
      { label: 'Problem', element: <ProblemSlide /> },
      { label: 'Solution', element: <SolutionSlide /> },
      { label: 'Why now', element: <WhyNowSlide /> },
      { label: 'Market', element: <MarketSlide /> },
      { label: 'Business', element: <BusinessSlide /> },
      { label: 'GTM', element: <GtmSlide /> },
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
      <strong>Caterists</strong>
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
      <span>Hamburg first</span>
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
    <Slide eyebrow="Problem + Customer">
      <div className="problem-layout">
        <div className="problem-head">
          <p className="kicker">It’s Thursday, 4 PM.</p>
          <h2>Monday’s offsite still has no food.</h2>
          <p className="persona">{persona}</p>
        </div>
        <div className="problem-today">
          <p className="mini-label">What they do today</p>
          <ol className="today-list">
            {todaySteps.map((step, index) => (
              <li key={step}>
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
    <Slide eyebrow="Solution + Product" tone="blue">
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
            Caterists isn’t a profile marketplace. You post one checked request; every eligible, verified
            cook sees it at once, and the first binding yes closes the order.
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
            <CookCard name="Brigitte" status="Eligible" />
            <CookCard name="Mehmet" status="Eligible" />
            <CookCard name="Mina" status="Eligible" />
          </div>
          <div className="demo-phone status">
            <div className="phone-bar" />
            <p className="mini-label">Accept + re-broadcast</p>
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

function WhyNowSlide() {
  return (
    <Slide eyebrow="Why Now">
      <div className="why-layout">
        <h2>Why this works now</h2>
        <div className="catalyst-grid">
          {catalysts.map((catalyst) => (
            <article key={catalyst.title}>
              <span className="tag">{catalyst.tag}</span>
              <strong>{catalyst.title}</strong>
              <p>{catalyst.body}</p>
            </article>
          ))}
        </div>
        <p className="moat-banner">{moat}</p>
      </div>
    </Slide>
  )
}

function MarketSlide() {
  return (
    <Slide eyebrow="Market + Competition">
      <div className="market-layout">
        <div className="market-copy">
          <h2>Where Caterists wins</h2>
          <div className="segment-chips">
            {segments.map((segment) => (
              <span key={segment}>{segment}</span>
            ))}
          </div>
          <ul className="win-list">
            {winPoints.map((point) => (
              <li key={point}>{point}</li>
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
    <Slide eyebrow="Business Model + Traction" tone="blue">
      <div className="business-layout">
        <h2>12% take-rate on confirmed orders</h2>
        <div className="model-row">
          {model.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="evidence-row">
          <p className="evidence-label">What we validated in Hamburg conversations</p>
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

function GtmSlide() {
  return (
    <Slide eyebrow="Go-to-Market">
      <div className="gtm-layout">
        <h2>How the first 50 customers find us</h2>
        <div className="gtm-grid">
          <article className="channel-primary">
            <span className="tag">{gtmPrimary.tag}</span>
            <strong>{gtmPrimary.title}</strong>
            <p>{gtmPrimary.body}</p>
          </article>
          <div className="gtm-side">
            {gtmSide.map((item) => (
              <article key={item.title}>
                <span className="tag">{item.tag}</span>
                <strong>{item.title}</strong>
                <p className={item.funnel ? 'funnel' : undefined}>{item.body}</p>
              </article>
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
          <h2>The team and the ask</h2>
          <div className="team-cards">
            {team.map((member) => (
              <article key={member.name}>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </article>
            ))}
          </div>
          <p className="team-edge">{teamEdge}</p>
        </div>
        <div className="ask-block">
          <p className="mini-label">The ask: no money, just the right first partners</p>
          <div className="ask-grid">
            {askItems.map((item) => (
              <article key={item}>
                <span>{item}</span>
              </article>
            ))}
          </div>
          <p className="contact">hello@caterists.com · Hamburg, Germany</p>
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
        <p>{status} to accept</p>
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
