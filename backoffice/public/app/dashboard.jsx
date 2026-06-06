/* Caterists, Dashboard with three layout variations: focus · command · calm. */
const { useState: useStateDash } = React;

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ---- KPI row ---- */
function KpiRow({ leads }) {
  const newCount = leads.filter(l => l.status === 'new').length;
  const accepted = leads.filter(l => l.status === 'accepted').length;
  const items = [
    { icon: 'inbox', tone: 'brand', value: newCount, label: 'Live requests', delta: null },
    { icon: 'calendar-check', tone: 'success', value: accepted, label: 'Confirmed today' },
    { icon: 'gauge', tone: 'brand', value: COOK.reliability, label: 'Standing', delta: '+1' },
    { icon: 'wallet', tone: 'success', value: fmtEUR(EARNINGS.pendingPayout), label: 'Pending payout' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border bg-card p-4">
          <MiniStat icon={it.icon} tone={it.tone} value={it.value} label={it.label} delta={it.delta} />
        </div>
      ))}
    </div>
  );
}

/* ---- reliability widget ---- */
function ReliabilityCard() {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2"><Icon name="gauge" className="size-4 text-brand" /><span>Standing</span></h3>
        <Chip tone="success" icon="check">In the pool</Chip>
      </div>
      <div className="flex items-center gap-5">
        <ScoreRing value={COOK.reliability} sub="/ 100" />
        <div className="flex-1 space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Avg response</span><span className="font-medium tabular">{COOK.responseMins} min</span></div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Acceptance</span><span className="font-medium tabular">{COOK.acceptanceRate}%</span></div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">On-time</span><span className="font-medium tabular">{COOK.onTimeRate}%</span></div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Keeps you eligible</span>
        <Sparkline data={RELIABILITY_HISTORY} />
      </div>
    </div>
  );
}

/* ---- today's schedule ---- */
function TodayCard({ leads, onOpen }) {
  const today = leads.filter(l => ['accepted', 'completed'].includes(l.status)).slice(0, 3);
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="truck" className="size-4 text-brand shrink-0" /><span>Today's deliveries</span></h3>
      {today.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing scheduled today.</p>
      ) : (
        <div className="space-y-3">
          {today.map((l) => (
            <div key={l.id} onClick={() => onOpen(l.id)} className="flex items-center gap-3 cursor-pointer group">
              <div className="text-center w-12 shrink-0">
                <div className="text-sm font-bold tabular">{l.time}</div>
                <div className="text-[0.6rem] text-muted-foreground">{l.window.split('–')[0].trim()}</div>
              </div>
              <div className="w-px self-stretch bg-border" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate group-hover:text-brand transition-colors">{l.company}</div>
                <div className="text-xs text-muted-foreground truncate">{l.package} · {l.headcount} covers</div>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- earnings mini ---- */
function EarningsMini({ goTo }) {
  return (
    <div className="rounded-xl border bg-card p-5 cursor-pointer hover:border-brand/40 transition-colors" onClick={() => goTo('earnings')}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2"><Icon name="banknote" className="size-4 text-brand" />This month</h3>
        <Icon name="arrow-up-right" className="size-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-bold tabular">{fmtEUR(EARNINGS.thisMonthNet)}</div>
      <div className="text-xs text-muted-foreground mt-1">net after 12% · <span className="text-success font-medium">+{Math.round((EARNINGS.thisMonthNet / EARNINGS.lastMonthNet - 1) * 100)}%</span> vs last month</div>
      <div className="mt-3"><Sparkline data={EARNINGS.series.map(s => s.net)} width={240} height={40} /></div>
    </div>
  );
}

/* ---- pathway mini ---- */
function PathwayMini({ goTo }) {
  const done = PATHWAY_TASKS.filter(t => t.done).length;
  return (
    <div className="rounded-xl border bg-card p-5 cursor-pointer hover:border-brand/40 transition-colors" onClick={() => goTo('profile')}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold flex items-center gap-2"><Icon name="sprout" className="size-4 text-brand" />Home-Pro pathway</h3>
        <PathwayBadge stage={2} />
      </div>
      <p className="text-xs text-muted-foreground mb-3">Stage 2 of 3 · {done}/{PATHWAY_TASKS.length} steps to stay verified</p>
      <Progress value={(done / PATHWAY_TASKS.length) * 100} />
      <div className="mt-3 text-xs text-warning-foreground flex items-center gap-1.5">
        <Icon name="alert-triangle" className="size-3.5" />Liability insurance renewal due in 9 days
      </div>
    </div>
  );
}

/* ---- hero lead (focus + calm) ---- */
function HeroLead({ lead, onOpen, onAccept, onDecline }) {
  const c = useCountdown(lead ? lead.deadline : null);
  if (!lead) return (
    <div className="rounded-2xl border border-dashed bg-card/50 p-10 text-center text-muted-foreground">
      <Icon name="check-circle-2" className="size-8 mx-auto mb-3 text-success" />
      <p className="text-sm">You're all caught up, no requests waiting.</p>
    </div>
  );
  return (
    <div className={cn('rounded-2xl border bg-card p-6 shadow-sm tablo-in', lead.urgent && 'border-destructive/30')}>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 text-brand px-2.5 py-1 text-xs font-semibold">
          <span className="size-1.5 rounded-full bg-brand animate-pulse" />Live request
        </span>
        {lead.isRebroadcast && <Chip tone="warning" icon="rotate-ccw">Re-broadcast</Chip>}
        <span className="ml-auto"><CountdownPill deadline={lead.deadline} /></span>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <img src={lead.avatar} alt="" className="size-12 rounded-full object-cover ring-1 ring-border" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">{lead.company}</h2>
            <p className="text-sm text-muted-foreground">{lead.eventType}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Fits you</div>
          <div className={cn('text-2xl font-bold tabular', scoreTone(lead.matchScore))}>{lead.matchScore}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {[
          { icon: 'calendar', label: lead.dateLabel, sub: lead.time },
          { icon: 'users', label: `${lead.headcount} covers`, sub: 'headcount' },
          { icon: 'map-pin', label: `${lead.distanceKm} km`, sub: lead.district },
          { icon: 'euro', label: fmtEUR(lead.budgetTotal), sub: `${lead.budgetPerPerson}/pp` },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2.5">
            <SoftIcon name={f.icon} tone="muted" size="size-8" />
            <div className="min-w-0"><div className="text-sm font-semibold leading-tight whitespace-nowrap">{f.label}</div><div className="text-xs text-muted-foreground truncate">{f.sub}</div></div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {lead.dietary.map(d => <Chip key={d} tone="success" icon="leaf">{d}</Chip>)}
        {lead.allergens.map(a => <Chip key={a} tone="warning" icon="wheat-off">{a}</Chip>)}
      </div>
      <div className="flex items-center gap-2 mt-5 pt-4 border-t">
        <Button className="gap-1.5" disabled={c.expired} onClick={() => onAccept(lead.id)}><Icon name="check" className="size-4" />Accept order</Button>
        <Button variant="ghost" className="text-muted-foreground" onClick={() => onDecline(lead.id)}>Not for me</Button>
        <button onClick={() => onOpen(lead.id)} className="ml-auto text-sm text-brand font-medium inline-flex items-center gap-1 hover:underline">
          View details<Icon name="arrow-right" className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* ---- lean hero (calm layout only) ---- */
function LeanHero({ lead, onOpen, onAccept, onDecline }) {
  const c = useCountdown(lead ? lead.deadline : null);
  if (!lead) return (
    <div className="rounded-2xl border border-dashed bg-card p-8 text-center">
      <Icon name="check-circle-2" className="size-7 mx-auto mb-2 text-success" />
      <p className="text-sm font-medium">All caught up.</p>
    </div>
  );
  return (
    <div className={cn('rounded-2xl border bg-card p-5 shadow-sm', lead.urgent && 'border-destructive/30')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img src={lead.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-border shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight truncate">{lead.company}</h2>
              {lead.isRebroadcast && <Chip tone="warning" icon="rotate-ccw">Re-broadcast</Chip>}
            </div>
            <p className="text-sm text-muted-foreground truncate">{lead.eventType}</p>
          </div>
        </div>
        <CountdownPill deadline={lead.deadline} />
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm text-foreground">
        <span className="font-semibold tabular">{lead.dateLabel}, {lead.time}</span>
        <span className="text-border">·</span>
        <span className="tabular">{lead.headcount} covers</span>
        <span className="text-border">·</span>
        <span className="font-semibold tabular">{fmtEUR(lead.budgetTotal)}</span>
        <span className="ml-auto inline-flex items-center gap-1 font-bold text-brand tabular"><Icon name="sparkles" className="size-3.5" />{lead.matchScore}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {lead.dietary.map(d => <Chip key={d} tone="success">{d}</Chip>)}
        {lead.allergens.map(a => <Chip key={a} tone="warning">{a}</Chip>)}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button className="flex-1 gap-1.5" disabled={c.expired} onClick={() => onAccept(lead.id)}><Icon name="check" className="size-4" />Accept order</Button>
        <Button variant="outline" onClick={() => onOpen(lead.id)}>Details</Button>
        <Button variant="ghost" className="text-muted-foreground" onClick={() => onDecline(lead.id)}>Pass</Button>
      </div>
    </div>
  );
}

/* ---- compact today list (calm layout only) ---- */
function LeanToday({ leads, onOpen }) {
  const today = leads.filter(l => ['accepted', 'completed'].includes(l.status)).slice(0, 3);
  if (today.length === 0) return <div className="rounded-xl border bg-card px-4 py-6 text-center text-sm text-muted-foreground">Nothing scheduled.</div>;
  return (
    <div className="rounded-xl border bg-card divide-y">
      {today.map((l) => (
        <button key={l.id} onClick={() => onOpen(l.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors">
          <span className="text-sm font-bold tabular w-11 shrink-0">{l.time}</span>
          <span className="text-sm font-medium flex-1 truncate">{l.company}</span>
          <StatusBadge status={l.status} />
        </button>
      ))}
    </div>
  );
}

/* =================== DASHBOARD =================== */
function Dashboard({ leads, onOpen, onAccept, onDecline, layout, goTo }) {
  const news = leads.filter(l => l.status === 'new').sort((a, b) => a.deadline - b.deadline);
  const hero = news[0];
  const rest = news.slice(1);

  const Header = (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <img src={COOK.avatar} alt="" className="size-12 rounded-full object-cover ring-2 ring-brand/20" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting()}, {COOK.name.split(' ')[0]}</h1>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
            <span className="whitespace-nowrap">{COOK.kitchen}</span>
            <span className="text-border">·</span>
            <PathwayBadge stage={2} />
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => goTo('calendar')}><Icon name="calendar" className="size-4" />Manage availability</Button>
    </div>
  );

  /* ---------- FOCUS ---------- */
  if (layout === 'focus') {
    return (
      <div className="tablo-in">
        {Header}
        <div className="space-y-6">
          <HeroLead lead={hero} onOpen={onOpen} onAccept={onAccept} onDecline={onDecline} />
          <KpiRow leads={leads} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">More open requests</h3>
                <button onClick={() => goTo('leads')} className="text-sm text-brand hover:underline">View all</button>
              </div>
              {rest.length ? rest.map(l => <LeadCard key={l.id} lead={l} onOpen={onOpen} onAccept={onAccept} onDecline={onDecline} />)
                : <p className="text-sm text-muted-foreground">No other requests waiting.</p>}
            </div>
            <div className="space-y-6">
              <ReliabilityCard />
              <PathwayMini goTo={goTo} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- COMMAND (dense) ---------- */
  if (layout === 'command') {
    return (
      <div className="tablo-in">
        {Header}
        <KpiRow leads={leads} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2"><Icon name="inbox" className="size-4 text-brand shrink-0" /><span>Open requests</span> <span className="text-muted-foreground font-normal">· first to accept wins</span></h3>
              <button onClick={() => goTo('leads')} className="text-sm text-brand hover:underline">Open inbox</button>
            </div>
            {news.length ? news.map(l => <LeadCard key={l.id} lead={l} onOpen={onOpen} onAccept={onAccept} onDecline={onDecline} />)
              : <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No open requests.</div>}
          </div>
          <div className="space-y-6">
            <ReliabilityCard />
            <TodayCard leads={leads} onOpen={onOpen} />
            <EarningsMini goTo={goTo} />
            <PathwayMini goTo={goTo} />
          </div>
        </div>
      </div>
    );
  }

  /* ---------- CALM (reduced & focused) ---------- */
  return (
    <div className="tablo-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 min-w-0">
          <img src={COOK.avatar} alt="" className="size-11 rounded-full object-cover ring-2 ring-brand/20 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight leading-none truncate">{greeting()}, {COOK.name.split(' ')[0]}</h1>
            <div className="mt-2"><PathwayBadge stage={2} /></div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0" onClick={() => goTo('calendar')}><Icon name="calendar" className="size-4" />Availability</Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="section-label">Respond first</div>
            {news.length > 1 && <button onClick={() => goTo('leads')} className="text-xs font-medium text-brand hover:underline">{news.length - 1} more</button>}
          </div>
          <LeanHero lead={hero} onOpen={onOpen} onAccept={onAccept} onDecline={onDecline} />
        </div>

        <div className="grid grid-cols-3 divide-x rounded-xl border bg-card">
          {[
            { label: 'Standing', value: COOK.reliability },
            { label: 'Response', value: COOK.responseMins + 'm' },
            { label: 'This month', value: fmtEUR(EARNINGS.thisMonthNet) },
          ].map(s => (
            <div key={s.label} className="px-4 py-4 text-center">
              <div className="text-lg font-bold tabular leading-none">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="section-label mb-2">Today</div>
          <LeanToday leads={leads} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
