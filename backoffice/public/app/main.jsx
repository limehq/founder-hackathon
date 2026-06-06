/* Caterists, app shell: sidebar, topbar, routing, incoming-lead flow, tweaks. */
const { useState: useStateMain, useEffect: useEffectMain, useRef: useRefMain } = React;

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'leads', label: 'Requests', icon: 'inbox' },
  { id: 'calendar', label: 'Availability', icon: 'calendar-days' },
  { id: 'kitchen', label: 'Kitchen', icon: 'chef-hat' },
  { id: 'earnings', label: 'Earnings', icon: 'banknote' },
  { id: 'profile', label: 'Profile', icon: 'badge-check' },
];

/* the lead that "arrives" live during the demo */
function makeIncoming() {
  return {
    id: 'L-2042', status: 'new', company: 'Velt Studios', contact: 'Hanna Weiss', avatar: 'assets/avatars/02.png',
    role: 'Office Manager', eventType: 'Friday team lunch', dateLabel: 'Fri, 12 Jun', time: '12:30',
    headcount: 24, leadInLabel: 'in 3 days', dietary: ['3 vegetarian', '1 vegan'], allergens: ['No nuts'],
    budgetPerPerson: 16, budgetTotal: 384, district: 'Ottensen', distanceKm: 0.9, window: '11:45 – 12:15',
    package: 'Anatolian Mezze Spread', matchScore: 98, deadline: Date.now() + 15 * 60 * 1000, isRebroadcast: false,
    reasons: [
      { icon: 'map-pin', text: '0.9 km, in your home district, Ottensen' },
      { icon: 'utensils', text: 'Matches what you cook, mezze platters' },
      { icon: 'users', text: '24 covers leaves room in your Friday capacity' },
      { icon: 'check', text: 'Fixed package & price, accept at known terms' },
    ],
    note: 'Casual Friday team lunch, shared platters preferred. Easy ground-floor delivery.',
  };
}

/* ---- incoming-lead toast ---- */
function IncomingToast({ lead, onView, onAccept, onDismiss }) {
  const c = useCountdown(lead.deadline);
  return (
    <div className="fixed top-4 right-4 z-[60] w-[360px] max-w-[calc(100vw-2rem)] toast-in">
      <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
        <div className="h-1 bg-brand" />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 text-brand px-2 py-0.5 text-xs font-semibold">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />Live request
            </span>
            <span className="ml-auto"><CountdownPill deadline={lead.deadline} /></span>
            <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground"><Icon name="x" className="size-4" /></button>
          </div>
          <div className="flex items-start gap-3">
            <img src={lead.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-border" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{lead.company}</div>
              <div className="text-xs text-muted-foreground">{lead.eventType} · {lead.headcount} covers · {fmtEUR(lead.budgetTotal)}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs"><Icon name="zap" className="size-3 text-brand" /><span className="font-semibold text-brand">First to accept wins</span><span className="text-muted-foreground">· {lead.distanceKm} km away</span></div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button size="sm" className="gap-1.5 flex-1" onClick={onAccept}><Icon name="check" className="size-4" />Accept order</Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={onView}>View details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- transient action toast ---- */
function ActionToast({ toast }) {
  if (!toast) return null;
  const tones = { success: 'text-success', info: 'text-[var(--info)]', muted: 'text-muted-foreground' };
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] toast-in">
      <div className="flex items-center gap-2.5 rounded-full border bg-card shadow-md px-4 py-2.5">
        <Icon name={toast.icon} className={cn('size-4', tones[toast.tone] || '')} />
        <span className="text-sm font-medium">{toast.msg}</span>
      </div>
    </div>
  );
}

/* ---- sidebar ---- */
function Sidebar({ route, goTo, newCount }) {
  return (
    <aside className="w-60 shrink-0 border-r bg-sidebar flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground font-bold">C</span>
        <div className="leading-none">
          <div className="font-bold tracking-tight">Caterists</div>
          <div className="text-[0.62rem] text-muted-foreground mt-0.5">Caterer back office</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(n => {
          const on = route === n.id;
          return (
            <button key={n.id} onClick={() => goTo(n.id)}
              className={cn('w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                on ? 'bg-brand/10 text-brand' : 'text-sidebar-foreground hover:bg-sidebar-accent')}>
              <Icon name={n.icon} className="size-[1.05rem]" />
              {n.label}
              {n.id === 'leads' && newCount > 0 && (
                <span className={cn('ml-auto rounded-full px-1.5 text-xs font-semibold', on ? 'bg-brand text-brand-foreground' : 'bg-brand/15 text-brand')}>{newCount}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div className="rounded-xl bg-brand/5 border border-brand/15 p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand"><Icon name="sprout" className="size-3.5 shrink-0" />Home-Pro · Stage 2</div>
          <p className="text-[0.7rem] text-muted-foreground leading-snug mt-1.5">1 step left to stay verified this month.</p>
          <button onClick={() => goTo('profile')} className="block text-xs font-medium text-brand mt-2 hover:underline">View pathway →</button>
        </div>
        <button onClick={() => goTo('profile')} className="w-full flex items-center gap-3 mt-3 rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
          <img src={COOK.avatar} alt="" className="size-9 rounded-full object-cover ring-1 ring-border" />
          <div className="min-w-0 text-left">
            <div className="text-sm font-medium truncate">{COOK.name}</div>
            <div className="text-xs text-muted-foreground truncate">{COOK.district}</div>
          </div>
          <Icon name="chevron-right" className="size-4 text-muted-foreground ml-auto" />
        </button>
      </div>
    </aside>
  );
}

/* ---- topbar ---- */
function Topbar({ route, onSimulate, canSimulate, newCount }) {
  const title = NAV.find(n => n.id === route)?.label || 'Caterists';
  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur sticky top-0 z-40 flex items-center gap-4 px-6">
      <div className="font-semibold">{title}</div>
      <div className="relative hidden md:block ml-2">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input placeholder="Search requests, companies…" className="h-9 w-64 rounded-md border bg-transparent pl-9 pr-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative inline-flex size-9 items-center justify-center rounded-md border hover:bg-accent">
          <Icon name="bell" className="size-[1.05rem]" />
          {newCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand ring-2 ring-background" />}
        </button>
        <img src={COOK.avatar} alt="" className="size-9 rounded-full object-cover ring-1 ring-border" />
      </div>
    </header>
  );
}

/* =================== APP =================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "calm",
  "accent": "#c2683f",
  "density": "regular"
}/*EDITMODE-END*/;

const ACCENTS = ['#c2683f', '#bd4b3b', '#5f7d4f', '#c8902e'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateMain('dashboard');
  const [leads, setLeads] = useStateMain(LEADS);
  const [selId, setSelId] = useStateMain(null);
  const [incoming, setIncoming] = useStateMain(null);
  const [simUsed, setSimUsed] = useStateMain(false);
  const [toast, setToast] = useStateMain(null);
  const toastTimer = useRefMain(null);
  const firstArrival = useRefMain(false);

  const flash = (msg, icon = 'check', tone = 'success') => {
    setToast({ msg, icon, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  /* apply tweaks → CSS vars + body attr */
  useEffectMain(() => {
    const r = document.documentElement;
    r.style.setProperty('--brand', t.accent);
    r.style.setProperty('--primary', t.accent);
    r.style.setProperty('--ring', t.accent);
    r.style.setProperty('--sidebar-primary', t.accent);
    document.body.setAttribute('data-density', t.density);
  }, [t.accent, t.density]);

  /* the lead arrives ~4.5s after first load */
  useEffectMain(() => {
    if (firstArrival.current) return;
    firstArrival.current = true;
    const tm = setTimeout(() => triggerIncoming(), 4500);
    return () => clearTimeout(tm);
  }, []);

  function triggerIncoming() {
    const l = makeIncoming();
    setLeads(prev => prev.find(x => x.id === l.id) ? prev : [l, ...prev]);
    setIncoming(l);
  }

  const goTo = (r) => { setSelId(null); setRoute(r); };
  const openLead = (id) => { setSelId(id); setRoute('leads'); setIncoming(cur => cur && cur.id === id ? null : cur); };

  const acceptLead = (id) => {
    setLeads(ps => ps.map(l => l.id === id ? { ...l, status: 'accepted', acceptedAt: Date.now() } : l));
    setIncoming(cur => cur && cur.id === id ? null : cur);
    flash("You've got it, order secured · standing ↑", 'party-popper', 'success');
  };
  const declineLead = (id) => {
    setLeads(ps => ps.map(l => l.id === id ? { ...l, status: 'dismissed' } : l));
    setIncoming(cur => cur && cur.id === id ? null : cur);
    if (selId === id) setSelId(null);
    flash('Passed, still live for other cooks', 'eye-off', 'muted');
  };
  const cancelLead = (id) => {
    setLeads(ps => ps.map(l => l.id === id ? { ...l, status: 'rebroadcast' } : l));
    flash('Cancelled, re-broadcast to the pool · standing affected', 'rotate-ccw', 'muted');
  };

  const newCount = leads.filter(l => l.status === 'new').length;
  const selLead = selId ? leads.find(l => l.id === selId) : null;

  let content;
  if (selLead) {
    content = <LeadDetail lead={selLead} onBack={() => setSelId(null)} onAccept={acceptLead} onDecline={declineLead} onCancel={cancelLead} />;
  } else if (route === 'dashboard') {
    content = <Dashboard leads={leads} onOpen={openLead} onAccept={acceptLead} onDecline={declineLead} layout={t.layout} goTo={goTo} />;
  } else if (route === 'leads') {
    content = <LeadsInbox leads={leads} onOpen={openLead} onAccept={acceptLead} onDecline={declineLead} />;
  } else if (route === 'calendar') {
    content = <CalendarScreen />;
  } else if (route === 'kitchen') {
    content = <KitchenScreen goTo={goTo} />;
  } else if (route === 'earnings') {
    content = <EarningsScreen />;
  } else if (route === 'profile') {
    content = <ProfileScreen />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar route={route} goTo={goTo} newCount={newCount} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar route={route} onSimulate={() => { triggerIncoming(); setSimUsed(true); }} canSimulate={!incoming} newCount={newCount} />
        <main className="flex-1 p-6 max-w-[1180px] w-full mx-auto">{content}</main>
      </div>

      {incoming && (
        <IncomingToast lead={incoming}
          onView={() => openLead(incoming.id)}
          onAccept={() => acceptLead(incoming.id)}
          onDismiss={() => setIncoming(null)} />
      )}
      <ActionToast toast={toast} />

      <TweaksPanel>
        <TweakSection label="Dashboard" />
        <TweakRadio label="Layout" value={t.layout} options={['focus', 'command', 'calm']} onChange={(v) => { setTweak('layout', v); setRoute('dashboard'); setSelId(null); }} />
        <TweakSection label="Appearance" />
        <TweakColor label="Accent" value={t.accent} options={ACCENTS} onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Density" value={t.density} options={['compact', 'regular', 'comfy']} onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
