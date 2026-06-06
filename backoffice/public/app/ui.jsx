/* Caterists, shared presentational helpers, used across all screens. */
const { useState: useStateUI, useEffect: useEffectUI, useRef: useRefUI } = React;

const fmtEUR = (n, dec = 0) =>
  '€' + Number(n).toLocaleString('en-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });

/* ---- live countdown to a deadline ---- */
function useCountdown(deadline) {
  const [now, setNow] = useStateUI(Date.now());
  useEffectUI(() => {
    if (!deadline) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [deadline]);
  if (!deadline) return { expired: true, total: 0, mins: 0, secs: 0, label: ', ', urgent: false };
  const total = Math.max(0, deadline - now);
  const mins = Math.floor(total / 60000);
  const secs = Math.floor((total % 60000) / 1000);
  return {
    total, mins, secs, expired: total <= 0,
    urgent: total > 0 && total < 8 * 60000,
    label: total <= 0 ? 'Expired' : `${mins}:${String(secs).padStart(2, '0')}`,
  };
}

/* ---- countdown pill ---- */
function CountdownPill({ deadline, className = '' }) {
  const c = useCountdown(deadline);
  const tone = c.expired
    ? 'bg-muted text-muted-foreground border-border'
    : c.urgent
      ? 'bg-destructive/10 text-destructive border-destructive/30'
      : 'bg-warning-muted text-warning-foreground border-warning/30';
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tabular', tone, c.urgent && !c.expired && 'pulse-ring', className)}>
      <Icon name={c.expired ? 'timer-off' : 'timer'} className="size-3.5" />
      {c.expired ? 'Expired' : `${c.label} left`}
    </span>
  );
}

/* ---- tinted icon tile ---- */
function SoftIcon({ name, tone = 'brand', className = '', size = 'size-9' }) {
  const tones = {
    brand: 'bg-brand/10 text-brand',
    success: 'bg-success-muted text-success',
    warning: 'bg-warning-muted text-warning-foreground',
    muted: 'bg-muted text-muted-foreground',
    info: 'bg-[var(--info-muted)] text-[var(--info)]',
    destructive: 'bg-destructive/10 text-destructive',
  };
  return (
    <span className={cn('inline-flex items-center justify-center rounded-lg', size, tones[tone], className)}>
      <Icon name={name} className="size-[1.05rem]" />
    </span>
  );
}

/* ---- status badge for leads ---- */
const LEAD_STATUS = {
  new: { label: 'Live in pool', tone: 'bg-brand/10 text-brand border-brand/25', dot: 'bg-brand' },
  accepted: { label: 'Confirmed', tone: 'bg-success-muted text-success border-success/25', dot: 'bg-success' },
  rebroadcast: { label: 'Re-broadcast', tone: 'bg-warning-muted text-warning-foreground border-warning/30', dot: 'bg-warning' },
  completed: { label: 'Completed', tone: 'bg-muted text-muted-foreground border-border', dot: 'bg-muted-foreground' },
  dismissed: { label: 'Passed', tone: 'bg-muted text-muted-foreground border-border', dot: 'bg-muted-foreground' },
  expired: { label: 'Taken by another', tone: 'bg-muted text-muted-foreground border-border', dot: 'bg-muted-foreground' },
};
function StatusBadge({ status }) {
  const s = LEAD_STATUS[status] || LEAD_STATUS.completed;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium', s.tone)}>
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}

/* ---- circular score ring ---- */
function ScoreRing({ value, size = 84, stroke = 8, label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--brand)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tabular leading-none">{value}</span>
        {sub && <span className="text-[0.6rem] text-muted-foreground mt-0.5">{sub}</span>}
      </div>
    </div>
  );
}

/* ---- sparkline ---- */
function Sparkline({ data, width = 120, height = 36, stroke = 'var(--brand)' }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 6) - 3;
    return [x, y];
  });
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = d + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={area} fill="var(--brand)" opacity="0.08" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill="var(--brand)" />
    </svg>
  );
}

/* ---- vertical bar chart (earnings) ---- */
function BarChart({ data, height = 160 }) {
  const max = Math.max(...data.map(d => d.net));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.net / max) * (height - 26);
        const last = i === data.length - 1;
        return (
          <div key={d.m} className="flex-1 flex flex-col items-center justify-end gap-1.5 group">
            <span className={cn('text-[0.62rem] font-semibold tabular opacity-0 group-hover:opacity-100 transition', last && 'opacity-100')}>
              {fmtEUR(d.net)}
            </span>
            <div className="w-full rounded-md transition-all" style={{
              height: h,
              background: last ? 'var(--brand)' : 'color-mix(in oklch, var(--brand) 22%, transparent)',
            }} />
            <span className="text-[0.62rem] text-muted-foreground">{d.m}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---- small stat ---- */
function MiniStat({ icon, tone = 'muted', label, value, delta, deltaTone = 'success' }) {
  return (
    <div className="flex items-start gap-3">
      <SoftIcon name={icon} tone={tone} />
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight tabular leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
          {label}
          {delta && (
            <span className={cn('inline-flex items-center gap-0.5 font-medium', deltaTone === 'success' ? 'text-success' : 'text-destructive')}>
              <Icon name={deltaTone === 'success' ? 'trending-up' : 'trending-down'} className="size-3" />
              {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- allergen / diet chip ---- */
function Chip({ children, tone = 'muted', icon }) {
  const tones = {
    muted: 'bg-muted text-muted-foreground',
    brand: 'bg-brand/10 text-brand',
    success: 'bg-success-muted text-success',
    warning: 'bg-warning-muted text-warning-foreground',
    outline: 'border border-border text-foreground',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium', tones[tone])}>
      {icon && <Icon name={icon} className="size-3" />}
      {children}
    </span>
  );
}

/* ---- pathway stage badge ---- */
function PathwayBadge({ stage = 2, className = '' }) {
  const map = { 1: 'Verified', 2: 'Home-Pro', 3: 'Resident' };
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand', className)}>
      <Icon name="sprout" className="size-3 shrink-0" />
      {map[stage]}
    </span>
  );
}

/* ---- page header ---- */
function PageHead({ title, sub, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

Object.assign(window, {
  fmtEUR, useCountdown, CountdownPill, SoftIcon, StatusBadge, LEAD_STATUS,
  ScoreRing, Sparkline, BarChart, MiniStat, Chip, PathwayBadge, PageHead,
});
