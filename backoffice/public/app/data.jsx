/* Caterists, mock data for the caterer back office.
 * Persona: Aylin Demir, a Home-Pro cook (Pathway Stufe 2) in Ottensen, Hamburg.
 * Everything is in-memory; the prototype mutates React state, never this object. */

const NOW = Date.now();
const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const COOK = {
  name: 'Aylin Demir',
  kitchen: "Aylin's Anatolian Table",
  handle: '@aylins-table',
  avatar: 'assets/avatars/03.png',
  district: 'Ottensen, Hamburg',
  memberSince: 'March 2026',
  cuisine: 'Anatolian home cooking · mezze platters',
  pathwayStage: 2,            // 1 = Verified Micro-Caterer, 2 = Home-Pro, 3 = Resident
  reliability: 92,            // internal reliability score 0-100
  responseMins: 14,          // avg first response
  acceptanceRate: 81,
  onTimeRate: 98,
  standingLabel: 'In good standing',
  standingNote: 'Reliable acceptance keeps you in the pool',
  partnerKitchen: 'Cloud Kitchen Altona',
  partnerHoursThisWeek: 12,
};

/* ---- Lightweight Verified Gate state ---- */
const VERIFIED_GATE = [
  { key: 'identity', label: 'Identity', icon: 'badge-check', done: true, detail: 'ID verified · 12 Mar 2026' },
  { key: 'business', label: 'Business registration', icon: 'briefcase', done: true, detail: 'Gewerbe #HH-2026-44812' },
  { key: 'hygiene', label: 'Hygiene self-declaration', icon: 'shield-check', done: true, detail: 'IfSG §43 completed' },
  { key: 'allergens', label: 'Allergen competence', icon: 'wheat-off', done: true, detail: 'Course passed · 14 allergens' },
  { key: 'capacity', label: 'Capacity & delivery area', icon: 'map-pin', done: true, detail: '5 km radius · 40 covers/day' },
  { key: 'liability', label: 'Liability insurance', icon: 'umbrella', done: false, detail: 'Renewal due in 9 days' },
];

/* ---- Pathway program (Home-Pro journey) ---- */
const PATHWAY = [
  {
    stage: 1, name: 'Verified Micro-Caterer', state: 'done',
    blurb: 'Registered business with its own professional kitchen, passed the Verified Gate.',
    requirements: [
      { label: 'Business registration (Gewerbe)', done: true },
      { label: 'Access to a professional kitchen', done: true },
      { label: 'Lightweight Verified Gate passed', done: true },
    ],
  },
  {
    stage: 2, name: 'Home-Pro', state: 'current',
    blurb: 'Home cook with hygiene training, allergen competence, insurance and booked hours in a partner pro-kitchen.',
    requirements: [
      { label: 'IfSG §43 hygiene briefing', done: true },
      { label: 'Allergen competence course', done: true },
      { label: 'Liability insurance on file', done: false, action: 'Renew', due: 'in 9 days' },
      { label: 'Pro-kitchen hours this month', done: false, action: 'Book hours', progress: '12 / 16 h' },
    ],
  },
  {
    stage: 3, name: 'Resident-Home', state: 'locked',
    blurb: 'Fully regulated production from your own home, where food law and premises allow.',
    requirements: [
      { label: 'Region opens regulated home production', done: false },
      { label: 'Premises check (EU 852/2004 Annex II)', done: false },
      { label: 'Local food-authority approval', done: false },
    ],
    note: 'On the roadmap. We notify you the moment your region qualifies.',
  },
];

const PATHWAY_TASKS = [
  { label: 'Gewerbe registration', done: true },
  { label: 'IfSG §43 hygiene briefing', done: true },
  { label: 'Allergen competence course', done: true },
  { label: 'Liability insurance on file', done: false, due: 'in 9 days' },
  { label: 'Book 4 more pro-kitchen hours this month', done: false, progress: '12 / 16 h' },
];

/* ---- Packages ---- */
const ALLERGENS = ['Gluten', 'Milk', 'Egg', 'Nuts', 'Sesame', 'Soy', 'Mustard', 'Celery', 'Fish'];

/* ---- Kitchen: what Aylin can cook. Private, used only to match her to orders.
 * Buyers never browse this; they post a request and the first eligible cook accepts. */
const KITCHEN = {
  cuisineOptions: ['Anatolian', 'Mezze & dips', 'Mediterranean', 'Turkish breakfast', 'Levantine', 'Vegan bowls', 'Soups & stews', 'Börek & baking', 'Desserts', 'Salads & grains'],
  cuisines: ['Anatolian', 'Mezze & dips', 'Mediterranean', 'Turkish breakfast', 'Börek & baking'],
  dietary: [
    { label: 'Vegetarian', on: true },
    { label: 'Vegan options', on: true },
    { label: 'Gluten-free options', on: true },
    { label: 'Halal', on: true },
    { label: 'Dairy-free options', on: false },
  ],
  allergensHandled: ['Gluten', 'Milk', 'Egg', 'Sesame', 'Mustard', 'Celery'],
  maxCovers: 40,
  radiusKm: 5,
  minLeadHours: 24,
};

/* ---- Leads ----
 * status: new | accepted | completed | dismissed | rebroadcast | expired
 * the first lead is the HERO incoming request with a live deadline. */
const LEADS = [
  {
    id: 'L-2041', status: 'new',
    company: 'Northloop Studio', contact: 'Jonas Reinhardt', avatar: 'assets/avatars/01.png',
    role: 'Office Manager', eventType: 'Team workshop lunch',
    dateLabel: 'Thu, 11 Jun', time: '12:30', headcount: 28, leadInLabel: 'in 2 days',
    dietary: ['4 vegetarian', '2 vegan'], allergens: ['No nuts'],
    budgetPerPerson: 17, budgetTotal: 476, district: 'Sternschanze', distanceKm: 2.4,
    window: '11:45 – 12:15', package: 'Anatolian Mezze Spread',
    matchScore: 96, deadline: NOW + 14 * MIN + 38 * 1000, isRebroadcast: false,
    reasons: [
      { icon: 'map-pin', text: '2.4 km away, inside your delivery area' },
      { icon: 'utensils', text: 'Matches what you cook, mezze platters' },
      { icon: 'users', text: '28 covers fits your 40/day capacity for Thu' },
      { icon: 'wheat-off', text: 'Veg & nut-free handled by your allergen profile' },
    ],
    note: 'Quarterly design review, relaxed shared-table vibe. Delivery to 3rd floor, lift available.',
  },
  {
    id: 'L-2038', status: 'new',
    company: 'Hafen Coworking', contact: 'Mara Velasquez', avatar: 'assets/avatars/02.png',
    role: 'Community Lead', eventType: 'Member breakfast',
    dateLabel: 'Wed, 10 Jun', time: '09:00', headcount: 18, leadInLabel: 'tomorrow',
    dietary: ['Vegetarian'], allergens: ['Gluten-free for 2'],
    budgetPerPerson: 12, budgetTotal: 216, district: 'HafenCity', distanceKm: 4.1,
    window: '08:15 – 08:45', package: 'Börek & Breakfast',
    matchScore: 88, deadline: NOW + 42 * MIN, isRebroadcast: false,
    reasons: [
      { icon: 'utensils', text: 'You cook Turkish breakfast & börek' },
      { icon: 'map-pin', text: '4.1 km, edge of your area, still next-day OK' },
      { icon: 'clock', text: 'Early window fits your prep schedule' },
    ],
    note: 'Monthly members’ breakfast. Two gluten-free guests, please label clearly.',
  },
  {
    id: 'L-2033', status: 'new', urgent: true,
    company: 'Br13 Agency', contact: 'Tom Albrecht', avatar: 'assets/avatars/04.png',
    role: 'Event Organizer', eventType: 'Client offsite lunch',
    dateLabel: 'Fri, 12 Jun', time: '13:00', headcount: 34, leadInLabel: 'in 3 days',
    dietary: ['6 vegan', 'Halal preferred'], allergens: ['No shellfish'],
    budgetPerPerson: 19, budgetTotal: 646, district: 'St. Pauli', distanceKm: 3.0,
    window: '12:15 – 12:45', package: 'Warm Lunch Bowls',
    matchScore: 84, deadline: NOW + 6 * MIN + 20 * 1000, isRebroadcast: true,
    reasons: [
      { icon: 'rotate-ccw', text: 'Re-broadcast, a cook cancelled, back in the pool' },
      { icon: 'utensils', text: 'You cater vegan & halal meals' },
      { icon: 'users', text: '34 covers, near your daily ceiling' },
    ],
    note: 'This order was just re-broadcast to the pool. First cook to accept gets it, be quick.',
  },
  {
    id: 'L-2029', status: 'accepted',
    company: 'Meridian Labs', contact: 'Priya Nair', avatar: 'assets/avatars/05.png',
    role: 'Office Manager', eventType: 'Sprint kickoff lunch',
    dateLabel: 'Tue, 9 Jun', time: '12:00', headcount: 22, leadInLabel: 'today',
    dietary: ['3 vegetarian'], allergens: ['No nuts'],
    budgetPerPerson: 15, budgetTotal: 330, district: 'Altona', distanceKm: 1.2,
    window: '11:30 – 12:00', package: 'Warm Lunch Bowls',
    matchScore: 94, isRebroadcast: false, acceptedAt: NOW - 20 * HOUR,
    reasons: [], note: 'Confirmed. Out for delivery prep.',
  },
  {
    id: 'L-2024', status: 'completed',
    company: 'Forsa GmbH', contact: 'Niklas Berg', avatar: 'assets/avatars/01.png',
    role: 'Office Manager', eventType: 'Board lunch',
    dateLabel: 'Fri, 5 Jun', time: '12:30', headcount: 16, leadInLabel: 'last week',
    dietary: ['Vegetarian'], allergens: [],
    budgetPerPerson: 18, budgetTotal: 288, district: 'Winterhude', distanceKm: 5.6,
    window: '12:00 – 12:30', package: 'Anatolian Mezze Spread',
    matchScore: 90, isRebroadcast: false, payout: 253.44,
    reasons: [], note: 'Delivered on time. Payout cleared.',
  },
  {
    id: 'L-2019', status: 'dismissed',
    company: 'Kuppel Media', contact: 'Sara Lindqvist', avatar: 'assets/avatars/02.png',
    role: 'Event Organizer', eventType: 'Launch party canapés',
    dateLabel: 'Sat, 6 Jun', time: '18:00', headcount: 50, leadInLabel: 'last week',
    dietary: ['Mixed'], allergens: [],
    budgetPerPerson: 22, budgetTotal: 1100, district: 'Eimsbüttel', distanceKm: 3.8,
    window: '17:15 – 17:45', package: 'Celebration Feast',
    matchScore: 71, isRebroadcast: false,
    reasons: [], note: 'You passed, it stayed live for other cooks in the pool.',
  },
  {
    id: 'L-2015', status: 'expired',
    company: 'Tideline Co', contact: 'Felix Maes', avatar: 'assets/avatars/04.png',
    role: 'Office Manager', eventType: 'All-hands snacks',
    dateLabel: 'Mon, 1 Jun', time: '15:00', headcount: 30, leadInLabel: '2 weeks ago',
    dietary: ['Vegan'], allergens: [],
    budgetPerPerson: 9, budgetTotal: 270, district: 'Barmbek', distanceKm: 7.9,
    window: '14:30 – 15:00', package: 'Warm Lunch Bowls',
    matchScore: 64, isRebroadcast: false,
    reasons: [], note: 'Another cook accepted this before you.',
  },
];

/* ---- Calendar: 5 weeks from the Monday of the current week ---- */
function buildCalendar() {
  const days = [];
  const today = new Date();
  const dow = (today.getDay() + 6) % 7; // Mon=0
  const monday = new Date(today); monday.setDate(today.getDate() - dow); monday.setHours(0,0,0,0);
  // deterministic-ish pattern of capacity
  const plan = [
    { used: 22, total: 40, status: 'open', label: 'Meridian Labs · 22' },
    { used: 0, total: 40, status: 'open' },
    { used: 28, total: 40, status: 'open', label: 'Northloop · 28 (pending)' },
    { used: 18, total: 40, status: 'open', label: 'Hafen Coworking · 18 (pending)' },
    { used: 34, total: 40, status: 'limited', label: 'Br13 Agency · 34 (pending)' },
    { used: 0, total: 0, status: 'blocked', label: 'Pro-kitchen closed' },
    { used: 0, total: 0, status: 'blocked', label: 'Day off' },
  ];
  for (let w = 0; w < 5; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(monday); date.setDate(monday.getDate() + w * 7 + d);
      let cell;
      if (w === 0) cell = plan[d];
      else {
        // generate light future pattern
        const blocked = (d >= 5);
        const used = blocked ? 0 : [0, 12, 0, 24, 16, 0, 0][(d + w) % 7];
        cell = { used, total: blocked ? 0 : 40, status: blocked ? 'blocked' : (used > 30 ? 'limited' : 'open') };
      }
      days.push({
        date, w, d,
        iso: date.toISOString().slice(0, 10),
        day: date.getDate(),
        month: date.getMonth(),
        isToday: date.toDateString() === today.toDateString(),
        past: date < new Date(today.toDateString()),
        ...cell,
      });
    }
  }
  return { monday, days };
}
const CALENDAR = buildCalendar();

/* ---- Earnings ---- */
const EARNINGS = {
  takeRate: 0.12,
  pendingPayout: 506.88,
  thisMonthGross: 4280,
  thisMonthNet: 3766.4,
  lastMonthNet: 3120,
  completedOrders: 23,
  avgOrder: 312,
  series: [ // last 7 months net
    { m: 'Dec', net: 1240 }, { m: 'Jan', net: 1680 }, { m: 'Feb', net: 2110 },
    { m: 'Mar', net: 2480 }, { m: 'Apr', net: 2960 }, { m: 'May', net: 3120 }, { m: 'Jun', net: 3766 },
  ],
  payouts: [
    { id: 'PO-3391', date: '6 Jun 2026', status: 'paid', gross: 288, fee: 34.56, net: 253.44, orders: 1 },
    { id: 'PO-3380', date: '30 May 2026', status: 'paid', gross: 742, fee: 89.04, net: 652.96, orders: 3 },
    { id: 'PO-3366', date: '23 May 2026', status: 'paid', gross: 555, fee: 66.6, net: 488.4, orders: 2 },
    { id: 'PO-3352', date: '16 May 2026', status: 'paid', gross: 968, fee: 116.16, net: 851.84, orders: 4 },
  ],
  next: { date: '13 Jun 2026', net: 506.88, orders: 2 },
};

/* ---- reliability sparkline (last 12 weeks) ---- */
const RELIABILITY_HISTORY = [78, 80, 79, 83, 85, 84, 87, 88, 86, 89, 91, 92];

Object.assign(window, {
  TABLO_NOW: NOW, TABLO_MIN: MIN, TABLO_HOUR: HOUR, TABLO_DAY: DAY,
  COOK, VERIFIED_GATE, PATHWAY, PATHWAY_TASKS, ALLERGENS, KITCHEN,
  LEADS, CALENDAR, EARNINGS, RELIABILITY_HISTORY,
});
