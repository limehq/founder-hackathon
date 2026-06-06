/* Caterists, Availability & daily capacity calendar. */
const { useState: useStateCal } = React;
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function dayTone(status) {
  return {
    open: 'border-border hover:border-brand/50',
    limited: 'border-warning/40 bg-warning-muted/40',
    blocked: 'border-border bg-muted/60',
  }[status] || 'border-border';
}

function CalendarScreen() {
  const days = CALENDAR.days;
  const todayIdx = days.findIndex(d => d.isToday);
  const [sel, setSel] = useStateCal(todayIdx >= 0 ? todayIdx : 0);
  const [cap, setCap] = useStateCal({});      // overrides {iso: capacityTotal}
  const [blocked, setBlocked] = useStateCal({}); // overrides {iso: bool}

  const day = days[sel];
  const dayCapTotal = cap[day.iso] ?? day.total;
  const isBlocked = blocked[day.iso] ?? (day.status === 'blocked');
  const monthLabel = `${MONTHS[days[7].month]} ${days[7].date.getFullYear()}`;

  const weekRows = [];
  for (let w = 0; w < 5; w++) weekRows.push(days.slice(w * 7, w * 7 + 7));

  return (
    <div className="tablo-in">
      <PageHead title="Availability" sub="Set how many covers you can take each day so Caterists only matches what you can deliver.">
        <Button variant="outline" size="sm" className="gap-1.5"><Icon name="repeat" className="size-4" />Weekly defaults</Button>
        <Button size="sm" className="gap-1.5"><Icon name="plus" className="size-4" />Block time off</Button>
      </PageHead>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* calendar */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{monthLabel}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-brand/30" />Booked</span>
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border border-warning/50 bg-warning-muted" />Limited</span>
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-muted" />Blocked</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {DOW.map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>)}
          </div>
          <div className="space-y-1.5">
            {weekRows.map((row, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1.5">
                {row.map((d, di) => {
                  const idx = wi * 7 + di;
                  const total = cap[d.iso] ?? d.total;
                  const blk = blocked[d.iso] ?? (d.status === 'blocked');
                  const used = blk ? 0 : d.used;
                  const pct = total ? (used / total) * 100 : 0;
                  const seld = idx === sel;
                  return (
                    <button key={d.iso} onClick={() => setSel(idx)}
                      className={cn('relative h-[68px] rounded-lg border p-1.5 text-left transition-all',
                        blk ? 'bg-muted/60 border-border' : dayTone(used > 30 ? 'limited' : 'open'),
                        seld && 'ring-2 ring-brand ring-offset-1', d.past && 'opacity-45')}>
                      <div className="flex items-center justify-between">
                        <span className={cn('text-xs font-semibold tabular', d.isToday && 'text-brand')}>{d.day}</span>
                        {d.isToday && <span className="text-[0.55rem] font-bold text-brand">TODAY</span>}
                        {blk && <Icon name="lock" className="size-3 text-muted-foreground" />}
                      </div>
                      {!blk && total > 0 && (
                        <div className="absolute bottom-1.5 left-1.5 right-1.5">
                          {used > 0 && <div className="text-[0.6rem] text-muted-foreground tabular mb-0.5">{used}/{total}</div>}
                          <div className="h-1 rounded-full bg-muted overflow-hidden">
                            <div className={cn('h-full rounded-full', pct > 80 ? 'bg-warning' : 'bg-brand')} style={{ width: pct + '%' }} />
                          </div>
                        </div>
                      )}
                      {blk && <div className="absolute bottom-1.5 left-1.5 text-[0.6rem] text-muted-foreground">Off</div>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* day editor */}
        <div className="rounded-xl border bg-card p-5 h-fit lg:sticky lg:top-6">
          <div className="text-xs text-muted-foreground">{DOW[day.d]}</div>
          <div className="text-lg font-bold mb-4">{day.day} {MONTHS[day.month]}</div>

          <div className="flex items-center justify-between rounded-lg border p-3 mb-4">
            <div>
              <div className="text-sm font-medium">Accepting orders</div>
              <div className="text-xs text-muted-foreground">{isBlocked ? 'Day blocked' : 'Open for matching'}</div>
            </div>
            <Switch checked={!isBlocked} onCheckedChange={(v) => setBlocked(b => ({ ...b, [day.iso]: !v }))} />
          </div>

          {!isBlocked && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Daily capacity</Label>
                  <span className="text-sm font-bold tabular">{dayCapTotal} covers</span>
                </div>
                <Slider key={day.iso} min={0} max={80} step={5} defaultValue={[dayCapTotal]} onValueChange={(v) => setCap(c => ({ ...c, [day.iso]: v[0] }))} />
                <div className="flex justify-between text-[0.65rem] text-muted-foreground mt-1"><span>0</span><span>80</span></div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Booked</span>
                  <span className="font-medium tabular">{day.used} / {dayCapTotal}</span>
                </div>
                <Progress value={dayCapTotal ? (day.used / dayCapTotal) * 100 : 0} />
                <div className="text-xs text-muted-foreground mt-1.5">{Math.max(0, dayCapTotal - day.used)} covers still available</div>
              </div>
              {day.label && (
                <div>
                  <div className="section-label mb-2">On this day</div>
                  <div className="flex items-center gap-2 text-sm rounded-lg border p-2.5">
                    <SoftIcon name="utensils" tone="brand" size="size-7" />
                    <span>{day.label}</span>
                  </div>
                </div>
              )}
              <div className="rounded-lg border border-brand/20 bg-brand/5 p-3 flex items-start gap-2.5">
                <Icon name="sprout" className="size-4 text-brand mt-0.5" />
                <div className="text-xs text-foreground/80">
                  <span className="font-medium text-brand">Pro-kitchen:</span> {COOK.partnerKitchen} booked for this week ({COOK.partnerHoursThisWeek}h). Capacity here is capped by your booked hours.
                </div>
              </div>
            </div>
          )}
          {isBlocked && (
            <div className="text-sm text-muted-foreground rounded-lg bg-muted/50 p-3">
              No requests will be matched to you on this day. Re-open it anytime.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CalendarScreen });
