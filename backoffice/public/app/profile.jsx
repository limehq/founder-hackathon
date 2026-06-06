/* Caterists, Profile: Home-Pro pathway, Verified Gate, and what's left to advance. */
function StageRow({ s, last }) {
  const tone = {
    done: { tile: 'bg-success text-white', badge: <Chip tone="success" icon="check">Done</Chip> },
    current: { tile: 'bg-brand text-brand-foreground', badge: <Chip tone="brand">You are here</Chip> },
    locked: { tile: 'bg-muted text-muted-foreground', badge: <Chip tone="muted">Roadmap</Chip> },
  }[s.state];
  const doneCount = s.requirements.filter(r => r.done).length;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className={cn('inline-flex size-9 items-center justify-center rounded-full shrink-0 font-bold', tone.tile)}>
          {s.state === 'done' ? <Icon name="check" className="size-[1.05rem]" /> : s.state === 'locked' ? <Icon name="lock" className="size-4" /> : s.stage}
        </span>
        {!last && <span className="w-px flex-1 bg-border my-1.5" />}
      </div>
      <div className={cn('flex-1 min-w-0', last ? 'pb-0' : 'pb-7')}>
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold">Stage {s.stage} · {s.name}</h4>
          {tone.badge}
          {s.state === 'current' && <span className="text-xs text-muted-foreground tabular">{doneCount}/{s.requirements.length} met</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-snug">{s.blurb}</p>
        <div className="mt-3 space-y-2">
          {s.requirements.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              <Icon name={r.done ? 'check-circle-2' : 'circle-dashed'} className={cn('size-4 shrink-0', r.done ? 'text-success' : 'text-muted-foreground/50')} />
              <span className={cn(r.done ? 'text-muted-foreground' : 'font-medium')}>{r.label}</span>
              {r.progress && <span className="text-xs text-muted-foreground tabular">{r.progress}</span>}
              {r.due && <Chip tone="warning" icon="clock">{r.due}</Chip>}
            </div>
          ))}
        </div>
        {s.note && <div className="mt-3 text-xs text-muted-foreground flex items-start gap-1.5"><Icon name="info" className="size-3.5 mt-0.5 shrink-0" /><span>{s.note}</span></div>}
        {s.state === 'locked' && <Button size="sm" variant="outline" className="mt-3 gap-1.5"><Icon name="bell" className="size-3.5" />Notify me when my region opens</Button>}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const gateDone = VERIFIED_GATE.filter(v => v.done).length;
  const current = PATHWAY.find(s => s.state === 'current');
  const nextSteps = current.requirements.filter(r => !r.done);

  return (
    <div className="tablo-in max-w-4xl">
      <PageHead title="Verification & pathway" sub="Where you are on the Home-Pro pathway, and what's left to advance." />

      {/* slim status strip */}
      <div className="rounded-xl border bg-card p-4 mb-6 flex items-center gap-4 flex-wrap">
        <img src={COOK.avatar} alt="" className="size-11 rounded-full object-cover ring-1 ring-border shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">{COOK.name}</span>
            <PathwayBadge stage={COOK.pathwayStage} />
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{COOK.standingLabel} · {gateDone}/{VERIFIED_GATE.length} verification steps complete</div>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <ScoreRing value={COOK.reliability} size={52} stroke={6} />
          <div className="text-xs text-muted-foreground leading-tight">Standing<br /><span className="text-foreground font-medium">keeps you in the pool</span></div>
        </div>
      </div>

      {/* pathway timeline — the hero */}
      <div className="rounded-xl border bg-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="font-semibold flex items-center gap-2"><Icon name="route" className="size-4 text-brand shrink-0" /><span>The Home-Pro pathway</span></h3>
          <span className="text-sm text-muted-foreground hidden sm:inline">· a legal, planbar route to earning from home cooking</span>
        </div>
        {PATHWAY.map((s, i) => <StageRow key={s.stage} s={s} last={i === PATHWAY.length - 1} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* verified gate */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Icon name="shield-check" className="size-4 text-brand shrink-0" /><span>Verified Gate</span></h3>
            <span className="text-sm text-muted-foreground tabular">{gateDone}/{VERIFIED_GATE.length}</span>
          </div>
          <div className="space-y-2.5">
            {VERIFIED_GATE.map(v => (
              <div key={v.key} className="flex items-center gap-3">
                <span className={cn('inline-flex size-8 items-center justify-center rounded-lg shrink-0', v.done ? 'bg-success-muted text-success' : 'bg-warning-muted text-warning-foreground')}>
                  <Icon name={v.done ? 'check' : 'alert-triangle'} className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{v.label}</div>
                  <div className="text-xs text-muted-foreground">{v.detail}</div>
                </div>
                {!v.done && <Button size="sm" variant="outline">Renew</Button>}
              </div>
            ))}
          </div>
        </div>

        {/* what you can do next */}
        <div className="rounded-xl border border-brand/20 bg-brand/5 p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-1"><Icon name="list-checks" className="size-4 text-brand shrink-0" /><span>What you can do next</span></h3>
          <p className="text-xs text-muted-foreground mb-4">Finish these to stay Home-Pro this month.</p>
          <div className="space-y-3">
            {nextSteps.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <SoftIcon name={r.label.includes('kitchen') ? 'chef-hat' : 'umbrella'} tone="brand" size="size-8" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{r.label}</div>
                  <div className="text-xs text-muted-foreground">{r.progress || (r.due ? `Due ${r.due}` : '')}</div>
                </div>
                <Button size="sm" className="shrink-0">{r.action}</Button>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-lg border border-dashed p-3 text-muted-foreground">
              <SoftIcon name="graduation-cap" tone="muted" size="size-8" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-foreground">Coaching for Stage 3</div>
                <div className="text-xs">Premises & food-law guidance for regulated home production</div>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">Learn</Button>
            </div>
          </div>
        </div>
      </div>

      {/* compliance honesty */}
      <div className="rounded-xl border border-brand/20 bg-brand/5 p-5 mt-6 flex items-start gap-3">
        <SoftIcon name="scale" tone="brand" />
        <div>
          <div className="font-semibold text-sm">Why a pathway, not a free-for-all</div>
          <p className="text-sm text-foreground/75 mt-1 leading-relaxed max-w-3xl">
            A private kitchen without a business registration can't legally sell catering today, so Caterists doesn't pretend otherwise. The pathway coaches you through Gewerbe registration, IfSG §43 hygiene, allergen competence and insured pro-kitchen hours, so your income is planbar <span className="italic">and</span> rechtssicher. That honesty is the trust promise buyers pay for.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
