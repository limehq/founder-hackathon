/* shadcn/ui — component source for prototypes
 * These are vanilla-JSX (no type annotations) reproductions of the key
 * components. Attach to window so they're globally available. Require:
 *   - React 18
 *   - Tailwind CSS (with shadcn var mapping — see SKILL.md)
 *   - Lucide icons global (`window.lucide`)
 */
const { useState, useRef, useEffect, useLayoutEffect, createContext, useContext, cloneElement, Children, forwardRef } = React;

/* ---------- cn helper ---------- */
const cn = (...cls) => cls.filter(Boolean).join(' ');

/* ---------- Lucide icon wrapper ---------- */
const Icon = ({ name, className = 'w-4 h-4', strokeWidth = 2, ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    // NOTE: createIcons applies attrs to ALL pending icons globally, so we must
    // NOT pass per-icon `class` here (it leaks across every icon on the page).
    // Sizing/color/position live on the wrapper span; the svg just fills it.
    window.lucide.createIcons({ attrs: { 'stroke-width': strokeWidth, width: '100%', height: '100%' } });
  }, [name, strokeWidth]);
  return <span ref={ref} className={cn('inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full', className)} {...rest} />;
};

/* ---------- Button ---------- */
const buttonVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
    destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20',
    outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-9 px-4 py-2 has-[>svg]:px-3',
    sm: 'h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5',
    lg: 'h-10 rounded-full px-6 has-[>svg]:px-4',
    icon: 'size-9',
  },
};
const Button = forwardRef(({ className, variant = 'default', size = 'default', asChild, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
      "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      buttonVariants.variant[variant], buttonVariants.size[size], className,
    )}
    {...props}
  >{children}</button>
));

/* ---------- Badge ---------- */
const badgeVariants = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-white',
  outline: 'text-foreground',
};
const Badge = ({ className, variant = 'default', children, ...props }) => (
  <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit', badgeVariants[variant], className)} {...props}>
    {children}
  </span>
);

/* ---------- Input ---------- */
const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref} type={type}
    className={cn(
      'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
      'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));

/* ---------- Textarea ---------- */
const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
      'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'disabled:cursor-not-allowed disabled:opacity-50', className,
    )}
    {...props}
  />
));

/* ---------- Label ---------- */
const Label = ({ className, children, ...props }) => (
  <label className={cn('text-sm font-medium leading-none select-none peer-disabled:opacity-50', className)} {...props}>{children}</label>
);

/* ---------- Card ---------- */
const Card = ({ className, children, ...props }) => (
  <div className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)} {...props}>{children}</div>
);
const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6', className)} {...props}>{children}</div>
);
const CardTitle = ({ className, children, ...props }) => (
  <div className={cn('leading-none font-semibold', className)} {...props}>{children}</div>
);
const CardDescription = ({ className, children, ...props }) => (
  <div className={cn('text-muted-foreground text-sm', className)} {...props}>{children}</div>
);
const CardContent = ({ className, children, ...props }) => (
  <div className={cn('px-6', className)} {...props}>{children}</div>
);
const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('flex items-center px-6 [.border-t]:pt-6', className)} {...props}>{children}</div>
);

/* ---------- Alert ---------- */
const alertVariants = {
  default: 'bg-card text-card-foreground',
  destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
};
const Alert = ({ className, variant = 'default', children, ...props }) => (
  <div role="alert" className={cn(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    alertVariants[variant], className
  )} {...props}>{children}</div>
);
const AlertTitle = ({ className, children, ...props }) => (
  <div className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)} {...props}>{children}</div>
);
const AlertDescription = ({ className, children, ...props }) => (
  <div className={cn('col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed', className)} {...props}>{children}</div>
);

/* ---------- Avatar ---------- */
const Avatar = ({ className, children, ...props }) => (
  <span className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)} {...props}>{children}</span>
);
const AvatarImage = ({ className, ...props }) => (
  <img className={cn('aspect-square size-full object-cover', className)} {...props} />
);
const AvatarFallback = ({ className, children, ...props }) => (
  <span className={cn('bg-muted flex size-full items-center justify-center rounded-full text-xs font-medium', className)} {...props}>{children}</span>
);

/* ---------- Separator ---------- */
const Separator = ({ className, orientation = 'horizontal', ...props }) => (
  <div
    role="separator"
    className={cn('bg-border shrink-0', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
    {...props}
  />
);

/* ---------- Switch ---------- */
const Switch = ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }) => {
  const [on, setOn] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : on;
  return (
    <button
      role="switch" aria-checked={value} disabled={disabled}
      onClick={() => { if (!isControlled) setOn(!value); onCheckedChange?.(!value); }}
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        value ? 'bg-primary' : 'bg-input', className,
      )}
      {...props}
    >
      <span className={cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
        value ? 'translate-x-4' : 'translate-x-0')} />
    </button>
  );
};

/* ---------- Checkbox ---------- */
const Checkbox = ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }) => {
  const [on, setOn] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : on;
  return (
    <button
      role="checkbox" aria-checked={value} disabled={disabled}
      onClick={() => { if (!isControlled) setOn(!value); onCheckedChange?.(!value); }}
      className={cn(
        'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none flex items-center justify-center',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        value ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent', className,
      )}
      {...props}
    >
      {value && <Icon name="check" className="size-3.5" strokeWidth={3} />}
    </button>
  );
};

/* ---------- Radio ---------- */
const RadioGroupContext = createContext(null);
const RadioGroup = ({ value, defaultValue, onValueChange, className, children, ...props }) => {
  const [v, setV] = useState(defaultValue);
  const isControlled = value !== undefined;
  const cur = isControlled ? value : v;
  return (
    <RadioGroupContext.Provider value={{ value: cur, set: (x) => { if (!isControlled) setV(x); onValueChange?.(x); } }}>
      <div className={cn('grid gap-2', className)} {...props}>{children}</div>
    </RadioGroupContext.Provider>
  );
};
const RadioGroupItem = ({ value, className, ...props }) => {
  const ctx = useContext(RadioGroupContext);
  const selected = ctx?.value === value;
  return (
    <button
      role="radio" aria-checked={selected} onClick={() => ctx?.set(value)}
      className={cn('aspect-square size-4 rounded-full border shadow-xs outline-none flex items-center justify-center',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        selected ? 'border-primary' : '', className)}
      {...props}
    >
      {selected && <span className="size-2 rounded-full bg-primary" />}
    </button>
  );
};

/* ---------- Slider (simple uncontrolled) ---------- */
const Slider = ({ defaultValue = [50], min = 0, max = 100, step = 1, className, onValueChange, ...props }) => {
  const [val, setVal] = useState(defaultValue[0]);
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div className={cn('relative flex w-full items-center select-none py-2', className)}>
      <div className="relative w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: pct + '%' }} />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={val}
        onChange={(e) => { const v = +e.target.value; setVal(v); onValueChange?.([v]); }}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        {...props}
      />
      <span className="absolute size-4 rounded-full bg-background border-2 border-primary shadow-sm" style={{ left: `calc(${pct}% - 8px)` }} />
    </div>
  );
};

/* ---------- Progress ---------- */
const Progress = ({ value = 0, className, ...props }) => (
  <div className={cn('relative w-full overflow-hidden rounded-full bg-muted h-2', className)} {...props}>
    <div className="h-full bg-primary transition-all" style={{ width: value + '%' }} />
  </div>
);

/* ---------- Skeleton ---------- */
const Skeleton = ({ className, ...props }) => (
  <div className={cn('animate-pulse rounded-md bg-accent', className)} {...props} />
);

/* ---------- Tabs ---------- */
const TabsContext = createContext(null);
const Tabs = ({ defaultValue, value, onValueChange, className, children, ...props }) => {
  const [v, setV] = useState(defaultValue);
  const isControlled = value !== undefined;
  const cur = isControlled ? value : v;
  return (
    <TabsContext.Provider value={{ value: cur, set: (x) => { if (!isControlled) setV(x); onValueChange?.(x); } }}>
      <div className={cn('flex flex-col gap-2', className)} {...props}>{children}</div>
    </TabsContext.Provider>
  );
};
const TabsList = ({ className, children, ...props }) => (
  <div className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className)} {...props}>{children}</div>
);
const TabsTrigger = ({ value, className, children, ...props }) => {
  const ctx = useContext(TabsContext);
  const on = ctx?.value === value;
  return (
    <button
      onClick={() => ctx?.set(value)}
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow]",
        on ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground', className,
      )}
      {...props}
    >{children}</button>
  );
};
const TabsContent = ({ value, className, children, ...props }) => {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={cn('flex-1 outline-none', className)} {...props}>{children}</div>;
};

/* ---------- Dropdown (very light) ---------- */
const Dropdown = ({ trigger, children, align = 'start' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open && (
        <div className={cn(
          'absolute z-50 mt-1 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          align === 'end' ? 'right-0' : 'left-0'
        )}>
          {children}
        </div>
      )}
    </div>
  );
};
const DropdownItem = ({ className, children, onSelect, ...props }) => (
  <div onClick={onSelect} className={cn(
    'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
    'hover:bg-accent hover:text-accent-foreground', className,
  )} {...props}>{children}</div>
);
const DropdownLabel = ({ className, children }) => (
  <div className={cn('px-2 py-1.5 text-sm font-medium', className)}>{children}</div>
);
const DropdownSeparator = ({ className }) => (
  <div className={cn('-mx-1 my-1 h-px bg-border', className)} />
);

/* ---------- Table ---------- */
const Table = ({ className, children }) => (
  <div className="relative w-full overflow-auto">
    <table className={cn('w-full caption-bottom text-sm', className)}>{children}</table>
  </div>
);
const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>;
const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
const TableRow = ({ className, children, ...props }) => (
  <tr className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} {...props}>{children}</tr>
);
const TableHead = ({ className, children, ...props }) => (
  <th className={cn('text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap', className)} {...props}>{children}</th>
);
const TableCell = ({ className, children, ...props }) => (
  <td className={cn('p-2 align-middle whitespace-nowrap', className)} {...props}>{children}</td>
);

/* ---------- Select (native-styled) ---------- */
const Select = ({ className, children, ...props }) => (
  <div className="relative">
    <select className={cn(
      'flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none appearance-none pr-9',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'disabled:cursor-not-allowed disabled:opacity-50', className
    )} {...props}>{children}</select>
    <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50" />
  </div>
);

/* ---------- Tooltip (CSS-only hover tooltip for simplicity) ---------- */
const Tooltip = ({ children, content, side = 'top' }) => (
  <span className="group relative inline-flex">
    {children}
    <span className={cn(
      'pointer-events-none absolute z-50 rounded-md bg-primary text-primary-foreground text-xs px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap',
      side === 'top' && 'bottom-full mb-2 left-1/2 -translate-x-1/2',
      side === 'bottom' && 'top-full mt-2 left-1/2 -translate-x-1/2',
      side === 'right' && 'left-full ml-2 top-1/2 -translate-y-1/2',
      side === 'left' && 'right-full mr-2 top-1/2 -translate-y-1/2',
    )}>{content}</span>
  </span>
);

/* ---------- Dialog (simple modal) ---------- */
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => onOpenChange?.(false)}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-10" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
const DialogContent = ({ className, children }) => (
  <div className={cn('bg-background grid w-full max-w-lg gap-4 rounded-lg border p-6 shadow-lg', className)}>{children}</div>
);
const DialogHeader = ({ className, children }) => <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)}>{children}</div>;
const DialogTitle = ({ className, children }) => <h2 className={cn('text-lg leading-none font-semibold', className)}>{children}</h2>;
const DialogDescription = ({ className, children }) => <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>;
const DialogFooter = ({ className, children }) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}>{children}</div>;

/* ---------- Toggle / ToggleGroup ---------- */
const Toggle = ({ pressed, defaultPressed, onPressedChange, className, children, variant = 'default', size = 'default', ...props }) => {
  const [on, setOn] = useState(defaultPressed ?? false);
  const isControlled = pressed !== undefined;
  const value = isControlled ? pressed : on;
  return (
    <button
      data-state={value ? 'on' : 'off'}
      onClick={() => { if (!isControlled) setOn(!value); onPressedChange?.(!value); }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[color,box-shadow] outline-none',
        'hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        variant === 'outline' && 'border bg-transparent shadow-xs',
        size === 'sm' && 'h-8 px-1.5',
        size === 'default' && 'h-9 px-2',
        size === 'lg' && 'h-10 px-2.5', className,
      )}
      {...props}
    >{children}</button>
  );
};

/* ---------- Breadcrumb ---------- */
const Breadcrumb = ({ children }) => <nav aria-label="breadcrumb"><ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5">{children}</ol></nav>;
const BreadcrumbItem = ({ className, children }) => <li className={cn('inline-flex items-center gap-1.5', className)}>{children}</li>;
const BreadcrumbLink = ({ className, children, href = '#' }) => <a href={href} className={cn('hover:text-foreground transition-colors', className)}>{children}</a>;
const BreadcrumbPage = ({ className, children }) => <span className={cn('text-foreground font-normal', className)}>{children}</span>;
const BreadcrumbSeparator = () => <li role="presentation" className="[&>svg]:size-3.5"><Icon name="chevron-right" className="size-3.5" /></li>;

/* ---------- Pagination (just layout) ---------- */
const Pagination = ({ children }) => <nav className="mx-auto flex w-full justify-center"><ul className="flex flex-row items-center gap-1">{children}</ul></nav>;
const PaginationItem = ({ children }) => <li>{children}</li>;

/* Expose everything to window */
Object.assign(window, {
  cn, Icon,
  Button, Badge, Input, Textarea, Label,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Alert, AlertTitle, AlertDescription,
  Avatar, AvatarImage, AvatarFallback,
  Separator, Switch, Checkbox, RadioGroup, RadioGroupItem, Slider, Progress, Skeleton,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dropdown, DropdownItem, DropdownLabel, DropdownSeparator,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Select, Tooltip, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Toggle,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  Pagination, PaginationItem,
});
