/* Caterists, Leads (Uber-style pool model):
 * a request is broadcast live to every eligible cook; first binding Accept wins
 * and closes it for everyone. No offers, no comparison, no counter. On cancel
 * the order is re-broadcast to the pool. After accepting, cook & buyer chat. */
const { useState: useStateLeads, useEffect: useEffectLeads, useRef: useRefLeads } = React;

function scoreTone(s) {
  if (s >= 90) return 'text-success';
  if (s >= 78) return 'text-brand';
  return 'text-muted-foreground';
}

/* compact "fits you" meter, private to the cook, never shown to buyers */
function FitMeter({ score }) {
  return (
    <div className="flex items-center gap-1.5" title="How well this request fits what you cook, your area and capacity">
      <Icon name="sparkles" className="size-3.5 text-brand" />
      <span className="text-xs font-medium text-muted-foreground">Fits you</span>
      <span className={cn('text-xs font-bold tabular', scoreTone(score))}>{score}</span>
    </div>
  );
}

/* small live indicator */
function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 text-brand px-2 py-0.5 text-xs font-semibold">
      <span className="size-1.5 rounded-full bg-brand animate-pulse" />Live in pool
    </span>
  );
}

/* ---- a lead row card (inbox + dashboard) ---- */
function LeadCard({ lead, onOpen, onAccept, onDecline }) {
  const isNew = lead.status === 'new';
  return (
    <div
      onClick={() => onOpen(lead.id)}
      className={cn(
        'group rounded-xl border bg-card p-4 transition-all cursor-pointer hover:border-brand/40 hover:shadow-sm',
        isNew && lead.urgent && 'border-destructive/30',
      )}
    >
      <div className="flex items-start gap-4">
        <img src={lead.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-border" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold truncate">{lead.company}</span>
            {lead.isRebroadcast && <Chip tone="warning" icon="rotate-ccw">Re-broadcast</Chip>}
            {!isNew && <StatusBadge status={lead.status} />}
          </div>
          <div className="text-sm text-muted-foreground mt-0.5 truncate">
            {lead.eventType} · {lead.headcount} covers
          </div>
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap mt-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Icon name="calendar" className="size-3.5" />{lead.dateLabel}, {lead.time}</span>
            <span className="inline-flex items-center gap-1"><Icon name="map-pin" className="size-3.5" />{lead.district} · {lead.distanceKm} km</span>
            <span className="inline-flex items-center gap-1"><Icon name="euro" className="size-3.5" />{lead.budgetPerPerson}/pp · {fmtEUR(lead.budgetTotal)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          {isNew ? <CountdownPill deadline={lead.deadline} /> : <span className="text-xs text-muted-foreground">{lead.leadInLabel}</span>}
          <FitMeter score={lead.matchScore} />
        </div>
      </div>
      {isNew && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t" onClick={(e) => e.stopPropagation()}>
          <Button size="sm" onClick={() => onAccept(lead.id)} className="gap-1.5">
            <Icon name="check" className="size-4" />Accept order
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDecline(lead.id)} className="gap-1.5 text-muted-foreground">
            Not for me
          </Button>
          <span className="ml-auto text-xs text-muted-foreground inline-flex items-center gap-1">
            <Icon name="zap" className="size-3.5 text-brand" />First to accept wins
          </span>
        </div>
      )}
    </div>
  );
}

/* ---- broadcast / pool flow ---- */
function BroadcastFlow({ lead }) {
  const steps = lead.isRebroadcast
    ? [
        { label: 'First cook cancelled', note: 'Order re-opened automatically', icon: 'rotate-ccw', state: 'past' },
        { label: 'Re-broadcast to the pool', note: 'Sent again to every eligible cook', icon: 'radio', state: 'past' },
        { label: 'Open, first to accept wins', note: 'Including you · accept to claim it', icon: 'zap', state: 'active' },
      ]
    : [
        { label: 'Buyer posted the request', note: 'Fixed package & price, no bidding', icon: 'clipboard-list', state: 'past' },
        { label: 'Broadcast to the matching pool', note: 'Every eligible cook sees it at once', icon: 'radio', state: 'past' },
        { label: 'Open, first to accept wins', note: 'Claim it before another cook does', icon: 'zap', state: 'active' },
      ];
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold flex items-center gap-2"><Icon name="radio" className="size-4 text-brand" /><span>How this reached you</span></h3>
        <LivePill />
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Caterists sends each request to the whole eligible pool at once, like hailing a ride. There's no offer comparison: the first cook to accept gets it, and it instantly closes for everyone else.
      </p>
      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={i} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5', s.state === 'active' ? 'bg-brand/8 ring-1 ring-brand/20' : 'bg-muted/40')}>
            <span className={cn('inline-flex size-7 items-center justify-center rounded-full',
              s.state === 'active' ? 'bg-brand text-brand-foreground' : 'bg-background border text-muted-foreground')}>
              <Icon name={s.icon} className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className={cn('text-sm font-medium', s.state === 'active' && 'text-brand')}>{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.note}</div>
            </div>
            {s.state === 'active' && <CountdownPill deadline={lead.deadline} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- request fact grid ---- */
function FactGrid({ lead }) {
  const facts = [
    { icon: 'calendar', label: 'Date & time', value: `${lead.dateLabel} · ${lead.time}` },
    { icon: 'users', label: 'Headcount', value: `${lead.headcount} covers` },
    { icon: 'map-pin', label: 'Delivery', value: `${lead.district} · ${lead.distanceKm} km` },
    { icon: 'clock', label: 'Delivery window', value: lead.window },
    { icon: 'euro', label: 'Fixed price', value: `${fmtEUR(lead.budgetPerPerson)} / person · ${fmtEUR(lead.budgetTotal)} total` },
    { icon: 'package', label: 'Requested meal', value: lead.package },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {facts.map((f) => (
        <div key={f.label} className="flex items-start gap-3">
          <SoftIcon name={f.icon} tone="muted" size="size-8" />
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">{f.label}</div>
            <div className="text-sm font-medium">{f.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- dismiss dialog ---- */
function DismissDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pass on this request?</DialogTitle>
          <DialogDescription>It stays live for the other eligible cooks in the pool. Passing doesn't affect your standing, only cancelling after you've accepted does.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Keep it</Button>
          <Button variant="ghost" className="text-muted-foreground" onClick={onConfirm}>Pass, hide from my list</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---- accept (binding) confirm ---- */
function AcceptDialog({ open, onClose, onConfirm, lead }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept and commit to {lead.company}?</DialogTitle>
          <DialogDescription>Accepting is binding: the order becomes yours, closes for every other cook, and you commit to deliver at the fixed price. Cancelling later lowers your standing.</DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1.5">
          <div className="flex justify-between"><span className="text-muted-foreground">{lead.package}</span><span className="font-medium">{lead.headcount} covers</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{lead.dateLabel} · {lead.time}</span><span className="font-semibold tabular">{fmtEUR(lead.budgetTotal)}</span></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Back</Button>
          <Button className="gap-1.5" onClick={onConfirm}><Icon name="check" className="size-4" />Accept order, it's binding</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---- cancel (re-broadcast) dialog ---- */
function CancelDialog({ open, onClose, onConfirm, lead }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this confirmed order?</DialogTitle>
          <DialogDescription>The order is re-broadcast to the pool so another cook can take it. {lead.company} is notified. Cancelling a confirmed order lowers your standing and, if repeated, can remove you from the pool.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Keep the order</Button>
          <Button variant="destructive" className="gap-1.5" onClick={onConfirm}><Icon name="rotate-ccw" className="size-4" />Cancel & re-broadcast</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---- chat with the buyer (after acceptance) ---- */
function ChatPanel({ lead }) {
  const seed = [
    { from: 'them', text: `Hi! Thanks for taking our ${lead.eventType.toLowerCase()}, looking forward to it.`, t: 'just now' },
    { from: 'me', text: 'My pleasure! Anything I should know about access or setup?', t: 'just now' },
    { from: 'them', text: 'Ground-floor delivery, ring at reception. We have a table ready.', t: 'just now' },
  ];
  const [msgs, setMsgs] = useStateLeads(seed);
  const [draft, setDraft] = useStateLeads('');
  const endRef = useRefLeads(null);
  useEffectLeads(() => { endRef.current && endRef.current.scrollIntoView && endRef.current.scrollIntoView({ block: 'nearest' }); }, [msgs.length]);
  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, { from: 'me', text: draft.trim(), t: 'just now' }]);
    setDraft('');
  };
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold mb-3 flex items-center gap-2"><Icon name="message-circle" className="size-4 text-brand" /><span>Chat with {lead.contact.split(' ')[0]}</span></h3>
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {msgs.map((m, i) => (
          <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[80%] rounded-2xl px-3 py-2 text-sm', m.from === 'me' ? 'bg-brand text-brand-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm')}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Message…" className="h-9 flex-1 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring" />
        <Button size="icon" onClick={send} className="shrink-0"><Icon name="send" className="size-4" /></Button>
      </div>
    </div>
  );
}

/* ---- LEAD DETAIL ---- */
function LeadDetail({ lead, onBack, onAccept, onDecline, onCancel }) {
  const [showDismiss, setShowDismiss] = useStateLeads(false);
  const [showAccept, setShowAccept] = useStateLeads(false);
  const [showCancel, setShowCancel] = useStateLeads(false);
  const isNew = lead.status === 'new';
  const isAccepted = lead.status === 'accepted';
  const c = useCountdown(isNew ? lead.deadline : null);

  return (
    <div className="tablo-in">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <Icon name="arrow-left" className="size-4" />All requests
      </button>

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <img src={lead.avatar} alt="" className="size-12 rounded-full object-cover ring-1 ring-border" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{lead.company}</h1>
              {lead.isRebroadcast && <Chip tone="warning" icon="rotate-ccw">Re-broadcast</Chip>}
              {!isNew && <StatusBadge status={lead.status} />}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{isAccepted ? `${lead.contact} · ${lead.role}` : `${lead.role} · request ${lead.id}`}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isNew && <CountdownPill deadline={lead.deadline} />}
          {isNew && <FitMeter score={lead.matchScore} />}
        </div>
      </div>

      {/* status banners */}
      {isAccepted && (
        <div className="mb-6 rounded-xl border border-success/30 bg-success-muted p-4 flex items-start gap-3 tablo-in">
          <SoftIcon name="party-popper" tone="success" />
          <div>
            <div className="font-semibold text-success">You've got it, the order is yours</div>
            <p className="text-sm text-foreground/80 mt-0.5">Closed to every other cook. {lead.company} has been notified and a confirmation invoice is queued. Use the chat to sort out the final details.</p>
          </div>
        </div>
      )}
      {lead.status === 'rebroadcast' && (
        <div className="mb-6 rounded-xl border border-warning/40 bg-warning-muted p-4 flex items-start gap-3 tablo-in">
          <SoftIcon name="rotate-ccw" tone="warning" />
          <div>
            <div className="font-semibold text-warning-foreground">Cancelled, re-broadcast to the pool</div>
            <p className="text-sm text-foreground/80 mt-0.5">The order is open again for other cooks. Your standing was affected.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="clipboard-list" className="size-4 text-brand" /><span>Request details</span></h3>
            <FactGrid lead={lead} />
            <div className="mt-5 pt-4 border-t space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {lead.dietary.map(d => <Chip key={d} tone="success" icon="leaf">{d}</Chip>)}
                {lead.allergens.map(a => <Chip key={a} tone="warning" icon="wheat-off">{a}</Chip>)}
              </div>
              {lead.note && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <Icon name="message-square" className="size-4 mt-0.5 shrink-0" />
                  <span>{lead.note}</span>
                </div>
              )}
            </div>
          </div>

          {isAccepted && <ChatPanel lead={lead} />}

          {isNew && lead.reasons?.length > 0 && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="sparkles" className="size-4 text-brand" /><span>Why this fits you</span></h3>
              <div className="space-y-2.5">
                {lead.reasons.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SoftIcon name={r.icon} tone="brand" size="size-8" />
                    <span className="text-sm">{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* right */}
        <div className="space-y-6">
          {isNew && <BroadcastFlow lead={lead} />}
          {isAccepted && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Icon name="badge-check" className="size-4 text-brand" /><span>Shared with the buyer</span></h3>
              <p className="text-xs text-muted-foreground mb-3">Now that you've accepted, {lead.company} can see your verified profile and pathway stage.</p>
              <div className="flex items-center gap-3">
                <img src={COOK.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-border" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{COOK.kitchen}</div>
                  <div className="mt-0.5"><PathwayBadge stage={COOK.pathwayStage} /></div>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Icon name="gauge" className="size-4 text-brand" /><span>Fit against your day</span></h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Capacity for {lead.dateLabel}</span>
                  <span className="font-medium tabular">{lead.headcount} / 40</span>
                </div>
                <Progress value={(lead.headcount / 40) * 100} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Inside delivery area</span>
                <Chip tone={lead.distanceKm <= 5 ? 'success' : 'warning'} icon={lead.distanceKm <= 5 ? 'check' : 'alert-triangle'}>
                  {lead.distanceKm <= 5 ? 'Yes' : 'Edge'}
                </Chip>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lead time</span>
                <span className="font-medium">{lead.leadInLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sticky action bar */}
      {isNew && (
        <div className="sticky bottom-0 mt-6 -mx-6 px-6 py-3 bg-background/85 backdrop-blur border-t flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-1.5">
            <Icon name={c.urgent ? 'alarm-clock' : 'zap'} className={cn('size-4', c.urgent ? 'text-destructive' : 'text-brand')} />
            {c.expired ? 'Another cook took this one' : 'First to accept wins, accepting is binding'}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => setShowDismiss(true)}>Not for me</Button>
            <Button className="gap-1.5" disabled={c.expired} onClick={() => setShowAccept(true)}><Icon name="check" className="size-4" />Accept order</Button>
          </div>
        </div>
      )}
      {isAccepted && (
        <div className="sticky bottom-0 mt-6 -mx-6 px-6 py-3 bg-background/85 backdrop-blur border-t flex items-center gap-3">
          <span className="text-sm text-success hidden sm:flex items-center gap-1.5"><Icon name="check-circle-2" className="size-4" />Confirmed, you're committed to deliver</span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => setShowCancel(true)}>Cancel order</Button>
          </div>
        </div>
      )}

      <DismissDialog open={showDismiss} onClose={() => setShowDismiss(false)} onConfirm={() => { setShowDismiss(false); onDecline(lead.id); }} />
      <AcceptDialog open={showAccept} lead={lead} onClose={() => setShowAccept(false)} onConfirm={() => { setShowAccept(false); onAccept(lead.id); }} />
      <CancelDialog open={showCancel} lead={lead} onClose={() => setShowCancel(false)} onConfirm={() => { setShowCancel(false); onCancel(lead.id); }} />
    </div>
  );
}

/* ---- LEADS INBOX ---- */
function LeadsInbox({ leads, onOpen, onAccept, onDecline }) {
  const [tab, setTab] = useStateLeads('new');
  const groups = {
    new: leads.filter(l => l.status === 'new'),
    active: leads.filter(l => l.status === 'accepted'),
    history: leads.filter(l => ['completed', 'dismissed', 'rebroadcast', 'expired'].includes(l.status)),
  };
  const list = groups[tab];
  return (
    <div>
      <PageHead title="Open requests" sub="Live requests you're eligible for. First to accept wins, fixed price, no bidding.">
        <Button variant="outline" size="sm" className="gap-1.5"><Icon name="sliders-horizontal" className="size-4" />Filters</Button>
      </PageHead>

      <Tabs value={tab} onValueChange={setTab} className="mb-5">
        <TabsList>
          <TabsTrigger value="new">Live <span className="ml-1.5 rounded-full bg-brand/15 text-brand px-1.5 text-xs font-semibold">{groups.new.length}</span></TabsTrigger>
          <TabsTrigger value="active">Confirmed <span className="ml-1.5 text-muted-foreground text-xs">{groups.active.length}</span></TabsTrigger>
          <TabsTrigger value="history">History <span className="ml-1.5 text-muted-foreground text-xs">{groups.history.length}</span></TabsTrigger>
        </TabsList>
      </Tabs>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card/50 p-12 text-center text-muted-foreground">
          <Icon name="inbox" className="size-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No requests here right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {list.map(l => <LeadCard key={l.id} lead={l} onOpen={onOpen} onAccept={onAccept} onDecline={onDecline} />)}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LeadCard, LeadDetail, LeadsInbox, BroadcastFlow, FitMeter, scoreTone });
