/* Caterists, Kitchen: what Aylin can cook. Private matching profile, never a buyer-facing menu. */
const { useState: useStateKit } = React;

function ToggleChip({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={cn('rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
        active ? 'border-brand bg-brand/10 text-brand' : 'border-border text-muted-foreground hover:border-foreground/30')}>
      {active && <Icon name="check" className="size-3.5 -ml-0.5 mr-1 inline-block align-[-2px]" />}
      {children}
    </button>
  );
}

function KitchenScreen({ goTo }) {
  const [cuisines, setCuisines] = useStateKit(KITCHEN.cuisines);
  const [dietary, setDietary] = useStateKit(KITCHEN.dietary);
  const [allergens, setAllergens] = useStateKit(KITCHEN.allergensHandled);
  const [radius, setRadius] = useStateKit(KITCHEN.radiusKm);

  const toggleList = (list, set, v) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  return (
    <div className="tablo-in max-w-3xl mx-auto">
      <PageHead title="Kitchen" sub="What you can cook. Caterists uses this to send you only the orders that fit." />

      {/* private note */}
      <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 flex items-start gap-3 mb-6">
        <SoftIcon name="lock" tone="brand" />
        <div className="text-sm text-foreground/80">
          <span className="font-medium text-brand">Private, not a menu.</span> Buyers don't browse cooks or dishes. They post a request for the meals they want; Caterists broadcasts it to every eligible cook, and the first to accept gets it. This profile only decides which requests reach you.
        </div>
      </div>

      <div className="space-y-6">
        {/* cuisines */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-1"><Icon name="utensils" className="size-4 text-brand shrink-0" /><span>What you cook</span></h3>
          <p className="text-xs text-muted-foreground mb-4">Pick the styles you're confident cooking at volume. Requests for these reach you first.</p>
          <div className="flex flex-wrap gap-2">
            {KITCHEN.cuisineOptions.map(c => (
              <ToggleChip key={c} active={cuisines.includes(c)} onClick={() => toggleList(cuisines, setCuisines, c)}>{c}</ToggleChip>
            ))}
          </div>
        </div>

        {/* dietary */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Icon name="leaf" className="size-4 text-brand shrink-0" /><span>Dietary you can cater</span></h3>
          <div className="divide-y">
            {dietary.map((d, i) => (
              <div key={d.label} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <span className="text-sm font-medium">{d.label}</span>
                <Switch checked={d.on} onCheckedChange={(v) => setDietary(arr => arr.map((x, j) => j === i ? { ...x, on: v } : x))} />
              </div>
            ))}
          </div>
        </div>

        {/* allergens handled */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-1"><Icon name="shield-check" className="size-4 text-brand shrink-0" /><span>Allergens your kitchen handles safely</span></h3>
          <p className="text-xs text-muted-foreground mb-4">Only requests whose allergen needs you can meet will reach you. Be honest, this is part of your verification.</p>
          <div className="flex flex-wrap gap-2">
            {ALLERGENS.map(a => (
              <ToggleChip key={a} active={allergens.includes(a)} onClick={() => toggleList(allergens, setAllergens, a)}>{a}</ToggleChip>
            ))}
          </div>
        </div>

        {/* capacity & area */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Icon name="map-pin" className="size-4 text-brand shrink-0" /><span>Reach & capacity</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Delivery radius</Label>
                <span className="text-sm font-bold tabular">{radius} km</span>
              </div>
              <Slider min={1} max={15} step={1} defaultValue={[radius]} onValueChange={(v) => setRadius(v[0])} />
              <div className="flex justify-between text-[0.65rem] text-muted-foreground mt-1"><span>1 km</span><span>15 km</span></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-2xl font-bold tabular leading-none">{KITCHEN.maxCovers}</div>
                <div className="text-xs text-muted-foreground mt-1.5">Max covers / day</div>
              </div>
              <div className="w-px self-stretch bg-border" />
              <div className="flex-1">
                <div className="text-2xl font-bold tabular leading-none">{KITCHEN.minLeadHours}h</div>
                <div className="text-xs text-muted-foreground mt-1.5">Min lead time</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Daily covers are set per day in your availability.</span>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => goTo && goTo('calendar')}><Icon name="calendar" className="size-4" />Edit availability</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KitchenScreen });
