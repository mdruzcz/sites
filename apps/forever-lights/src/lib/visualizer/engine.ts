// Light Visualizer — pure estimating engine.
// Identical copy lives in permanent-lighting-direct/src/lib/visualizer/engine.ts. Keep them in sync.
//
// A design is a photo (width/height in px), an optional scale reference (two
// points a known distance apart), a set of runs drawn in image-pixel space and a
// few answers. Everything here is deterministic and framework-free so the same
// numbers come out on the client, in the API route and on the saved-design page.

export type Pt = { x: number; y: number };
export type RunKind = 'lit' | 'jump';

export interface Run {
  id: string;
  kind: RunKind;
  points: Pt[];
  /** Detached garage, shed, fence — needs its own controller + power. */
  separate?: boolean;
}

export interface ScaleRef {
  a: Pt;
  b: Pt;
  feet: number;
  label: string;
}

export type OutletDistance = 'under5' | '5to20' | '20to40' | 'over40';

export const OUTLET_OPTIONS: { key: OutletDistance; label: string; ext20: number }[] = [
  { key: 'under5', label: 'Under 5 ft', ext20: 0 },
  { key: '5to20', label: '5 to 20 ft', ext20: 1 },
  { key: '20to40', label: '20 to 40 ft', ext20: 2 },
  { key: 'over40', label: 'More than 40 ft', ext20: 3 },
];

export interface Design {
  v: 1;
  site: string;
  createdAt: string;
  image: { w: number; h: number };
  scale: ScaleRef | null;
  /** Used when the customer skips the scale step and types their roofline length. */
  manualFeet: number | null;
  runs: Run[];
  colour: string;
  outlet: OutletDistance;
  /** null = accept the automatic suggestion. */
  kitSlug: string | null;
  /** null = accept the recommended add-ons. Keyed by component key. */
  addons: Record<string, number> | null;
  notes?: string;
}

export interface VzVariant {
  id: string;
  label: string;
  price: number | null;
}

export interface VzComponent {
  key: string;
  name: string;
  blurb: string;
  image: string | null;
  price: number | null;
  url: string | null;
  /** How many feet of roofline one purchasable unit covers (strand / track only). */
  packFeet?: number;
  /** Store variants (colour etc.) when the site has a cart. */
  variants?: VzVariant[];
}

export interface VzKit {
  slug: string;
  feet: number;
  price: number;
  suits: string;
  bom: Record<string, number>;
  url: string;
  variants?: VzVariant[];
}

export interface VzColour {
  key: string;
  label: string;
  hex: string | null;
}

export interface VzCatalog {
  siteName: string;
  domain: string;
  kits: VzKit[];
  components: VzComponent[];
  colours: VzColour[];
  trackPieceFeet: number;
  lightsPerStrand: number;
  /** True when the site can add lines straight to a cart. */
  cart: boolean;
}

export interface Addon {
  key: string;
  qty: number;
  /** Recommended add-ons are pre-selected; optional ones start unchecked. */
  recommended: boolean;
  reason: string;
}

export interface SegmentLength {
  runId: string;
  index: number;
  feet: number;
}

export interface Estimate {
  hasScale: boolean;
  pxPerFt: number | null;
  litFeet: number;
  jumpFeet: number;
  litRuns: number;
  jumpRuns: number;
  corners: number;
  branches: number;
  separateBuildings: number;
  allowanceFeet: number;
  requiredFeet: number;
  kit: VzKit | null;
  overflowFeet: number;
  addons: Addon[];
  runFeet: Record<string, number>;
  segments: SegmentLength[];
}

export const ALLOWANCE_RATE = 0.1;
export const ALLOWANCE_MIN_FEET = 5;

/* ─────────────────────────── ids + defaults ─────────────────────────── */

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyDesign(site: string, w: number, h: number, defaultColour: string): Design {
  return {
    v: 1,
    site,
    createdAt: new Date().toISOString(),
    image: { w, h },
    scale: null,
    manualFeet: null,
    runs: [],
    colour: defaultColour,
    outlet: '5to20',
    kitSlug: null,
    addons: null,
  };
}

/** Defensive normaliser for anything read back from storage / the network. */
export function normalizeDesign(raw: unknown, fallbackSite = ''): Design {
  const r = (raw ?? {}) as Partial<Design> & Record<string, unknown>;
  const num = (v: unknown, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
  const pt = (p: unknown): Pt | null => {
    const q = p as Partial<Pt> | null;
    if (!q || typeof q.x !== 'number' || typeof q.y !== 'number') return null;
    return { x: q.x, y: q.y };
  };
  const image = { w: Math.max(1, num((r.image as { w?: number })?.w, 1)), h: Math.max(1, num((r.image as { h?: number })?.h, 1)) };
  let scale: ScaleRef | null = null;
  const s = r.scale as Partial<ScaleRef> | null;
  if (s && pt(s.a) && pt(s.b) && num(s.feet) > 0) scale = { a: pt(s.a)!, b: pt(s.b)!, feet: num(s.feet), label: String(s.label ?? 'Reference').slice(0, 60) };
  const runs: Run[] = Array.isArray(r.runs)
    ? (r.runs as unknown[])
        .map((x) => {
          const q = x as Partial<Run>;
          const points = Array.isArray(q.points) ? (q.points.map(pt).filter(Boolean) as Pt[]) : [];
          return { id: String(q.id ?? uid()).slice(0, 16), kind: q.kind === 'jump' ? 'jump' : 'lit', points, separate: !!q.separate } as Run;
        })
        .filter((run) => run.points.length > 0)
        .slice(0, 60)
    : [];
  const addonsRaw = r.addons as Record<string, unknown> | null | undefined;
  const addons = addonsRaw && typeof addonsRaw === 'object'
    ? Object.fromEntries(Object.entries(addonsRaw).map(([k, v]) => [k.slice(0, 32), Math.max(0, Math.min(99, Math.round(num(v))))]))
    : null;
  const outlet = OUTLET_OPTIONS.some((o) => o.key === r.outlet) ? (r.outlet as OutletDistance) : '5to20';
  return {
    v: 1,
    site: String(r.site ?? fallbackSite).slice(0, 40),
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : new Date().toISOString(),
    image,
    scale,
    manualFeet: num(r.manualFeet) > 0 ? Math.min(2000, num(r.manualFeet)) : null,
    runs,
    colour: String(r.colour ?? '').slice(0, 24),
    outlet,
    kitSlug: typeof r.kitSlug === 'string' ? r.kitSlug.slice(0, 40) : null,
    addons,
    notes: typeof r.notes === 'string' ? r.notes.slice(0, 2000) : undefined,
  };
}

/* ─────────────────────────── geometry ─────────────────────────── */

export const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

export function pathPx(points: Pt[]): number {
  let n = 0;
  for (let i = 1; i < points.length; i++) n += dist(points[i - 1], points[i]);
  return n;
}

export function pxPerFoot(design: Design): number | null {
  if (!design.scale) return null;
  const px = dist(design.scale.a, design.scale.b);
  if (px < 4 || design.scale.feet <= 0) return null;
  return px / design.scale.feet;
}

/** Interior vertices where the run turns by more than `minDeg`. */
export function countCorners(points: Pt[], minDeg = 25): number {
  let n = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1], b = points[i], c = points[i + 1];
    const v1 = { x: b.x - a.x, y: b.y - a.y };
    const v2 = { x: c.x - b.x, y: c.y - b.y };
    const l1 = Math.hypot(v1.x, v1.y), l2 = Math.hypot(v2.x, v2.y);
    if (l1 < 1 || l2 < 1) continue;
    const cos = Math.max(-1, Math.min(1, (v1.x * v2.x + v1.y * v2.y) / (l1 * l2)));
    const deg = (Math.acos(cos) * 180) / Math.PI;
    if (deg > minDeg) n++;
  }
  return n;
}

/** Union-find over lit runs: runs touching each other, or joined by a jump, share a branch. */
function connectedComponents(design: Design, tolPx: number): { components: Run[][] } {
  const lit = design.runs.filter((r) => r.kind === 'lit' && r.points.length > 1);
  const jumps = design.runs.filter((r) => r.kind === 'jump' && r.points.length > 1);
  const parent = lit.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const union = (a: number, b: number) => { parent[find(a)] = find(b); };
  const ends = (r: Run) => [r.points[0], r.points[r.points.length - 1]];
  const touches = (p: Pt, r: Run) => ends(r).some((e) => dist(e, p) <= tolPx);

  for (let i = 0; i < lit.length; i++) {
    for (let j = i + 1; j < lit.length; j++) {
      if (ends(lit[i]).some((p) => touches(p, lit[j]))) union(i, j);
    }
  }
  for (const jump of jumps) {
    const [a, b] = ends(jump);
    const ia = lit.findIndex((r) => touches(a, r));
    const ib = lit.findIndex((r) => touches(b, r));
    if (ia >= 0 && ib >= 0 && ia !== ib) union(ia, ib);
  }
  const groups = new Map<number, Run[]>();
  lit.forEach((r, i) => {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(r);
  });
  return { components: [...groups.values()] };
}

/* ─────────────────────────── estimate ─────────────────────────── */

export function pickKit(catalog: VzCatalog, requiredFeet: number): { kit: VzKit | null; overflowFeet: number } {
  const sorted = [...catalog.kits].sort((a, b) => a.feet - b.feet);
  if (!sorted.length) return { kit: null, overflowFeet: 0 };
  if (requiredFeet <= 0) return { kit: null, overflowFeet: 0 };
  const fit = sorted.find((k) => k.feet >= requiredFeet);
  if (fit) return { kit: fit, overflowFeet: 0 };
  const last = sorted[sorted.length - 1];
  return { kit: last, overflowFeet: requiredFeet - last.feet };
}

export function connectorForFeet(feet: number): { key: string; qty: number } {
  if (feet <= 1.25) return { key: 'conn1', qty: 1 };
  if (feet <= 5.5) return { key: 'conn5', qty: 1 };
  if (feet <= 10.5) return { key: 'conn10', qty: 1 };
  if (feet <= 20.5) return { key: 'conn20', qty: 1 };
  return { key: 'conn20', qty: Math.ceil(feet / 20) };
}

export function estimate(design: Design, catalog: VzCatalog): Estimate {
  const ppf = pxPerFoot(design);
  const hasScale = ppf !== null;
  const toFt = (px: number) => (ppf ? px / ppf : 0);

  const runFeet: Record<string, number> = {};
  const segments: SegmentLength[] = [];
  let litFeet = 0, jumpFeet = 0, litRuns = 0, jumpRuns = 0, corners = 0;

  for (const run of design.runs) {
    if (run.points.length < 2) { runFeet[run.id] = 0; continue; }
    const ft = toFt(pathPx(run.points));
    runFeet[run.id] = ft;
    for (let i = 1; i < run.points.length; i++) {
      segments.push({ runId: run.id, index: i - 1, feet: toFt(dist(run.points[i - 1], run.points[i])) });
    }
    if (run.kind === 'lit') { litFeet += ft; litRuns++; corners += countCorners(run.points); }
    else { jumpFeet += ft; jumpRuns++; }
  }

  if (!hasScale && design.manualFeet) litFeet = design.manualFeet;

  litFeet = Math.round(litFeet);
  jumpFeet = Math.round(jumpFeet);
  const allowanceFeet = litFeet > 0 ? Math.max(ALLOWANCE_MIN_FEET, Math.round(litFeet * ALLOWANCE_RATE)) : 0;
  const requiredFeet = litFeet + allowanceFeet;
  const { kit, overflowFeet } = pickKit(catalog, requiredFeet);

  const diag = Math.hypot(design.image.w, design.image.h);
  const { components } = connectedComponents(design, diag * 0.03);
  const separateComponents = components.filter((c) => c.some((r) => r.separate));
  const separateBuildings = separateComponents.length;
  const mainBranches = components.length - separateBuildings;
  const branches = components.length;

  const addons: Addon[] = [];
  const has = (key: string) => catalog.components.some((c) => c.key === key);
  const bomQty = (key: string) => kit?.bom[key] ?? 0;
  const push = (key: string, needed: number, recommended: boolean, reason: string) => {
    if (!has(key)) return;
    const short = needed - bomQty(key);
    if (short > 0) addons.push({ key, qty: short, recommended, reason });
  };

  if (kit && litFeet > 0) {
    // Unlit jumps → extension connectors, one per jump segment.
    const need: Record<string, number> = {};
    for (const s of segments) {
      const run = design.runs.find((r) => r.id === s.runId);
      if (!run || run.kind !== 'jump' || s.feet <= 0) continue;
      const c = connectorForFeet(s.feet);
      need[c.key] = (need[c.key] ?? 0) + c.qty;
    }
    const connLabel: Record<string, string> = { conn1: '1 ft', conn5: '5 ft', conn10: '10 ft', conn20: '20 ft' };
    for (const key of ['conn1', 'conn5', 'conn10', 'conn20']) {
      const n = need[key] ?? 0;
      if (!n) continue;
      const inKit = bomQty(key);
      push(key, n, true, `Your drawing has ${n} unlit gap${n === 1 ? '' : 's'} that need${n === 1 ? 's' : ''} a ${connLabel[key]} jumper; the kit includes ${inKit}.`);
    }

    // Corners and peaks: optional short jumpers.
    if (corners > 0) {
      const inKit = bomQty('conn1');
      const already = need.conn1 ?? 0;
      const short = corners - Math.max(0, inKit - already);
      if (short > 0 && has('conn1')) {
        addons.push({ key: 'conn1', qty: short, recommended: false, reason: `You drew ${corners} peak${corners === 1 ? '' : 's'} or corner${corners === 1 ? '' : 's'}. Track usually mitres cleanly, but a 1 ft jumper makes an awkward corner easy. Optional.` });
      }
    }

    // Separate buildings get their own controller, power supply and feed cable.
    if (separateBuildings > 0) {
      const s = separateBuildings;
      push('controller', 1 + s, true, `${s} run${s === 1 ? ' is' : 's are'} on a separate building. Each needs its own WiFi controller so it can run without a long data cable back to the house.`);
      push('powerSupply', Math.max(1, Math.ceil(litFeet / 100)) + s, true, `A separate building needs its own power supply next to its controller.`);
      push('powerExt20', (OUTLET_OPTIONS.find((o) => o.key === design.outlet)?.ext20 ?? 1) + s, true, `Reaches the outlet on the separate building and covers the distance you chose for the main run.`);
    } else {
      push('powerExt20', OUTLET_OPTIONS.find((o) => o.key === design.outlet)?.ext20 ?? 1, true, `Based on the distance from your outlet to where the lights start.`);
    }

    // More than one branch on the main house → light T per extra branch.
    if (mainBranches > 1) {
      push('lightT', mainBranches - 1, true, `Your lit runs form ${mainBranches} separate branches that are not joined by a jump. Each extra branch needs a T so one controller output can feed it.`);
    }

    // Long total paths need a data amplifier every ~100 ft.
    const pathFeet = litFeet + jumpFeet;
    push('amplifier', Math.floor(pathFeet / 100), true, `Lights plus jumps total about ${pathFeet} ft of signal path; an amplifier every 100 ft keeps the far pucks in sync.`);

    // Beyond the largest kit → extra strands and track.
    if (overflowFeet > 0) {
      for (const key of ['strand', 'track']) {
        const comp = catalog.components.find((c) => c.key === key);
        if (!comp) continue;
        const per = comp.packFeet ?? catalog.trackPieceFeet;
        const qty = Math.ceil(overflowFeet / per);
        addons.push({ key, qty, recommended: true, reason: `Your roofline needs about ${overflowFeet} ft more than the largest kit. Each unit adds ${per} ft.` });
      }
    }
  }

  return {
    hasScale,
    pxPerFt: ppf,
    litFeet,
    jumpFeet,
    litRuns,
    jumpRuns,
    corners,
    branches,
    separateBuildings,
    allowanceFeet,
    requiredFeet,
    kit,
    overflowFeet,
    addons,
    runFeet,
    segments,
  };
}

/* ─────────────────────────── selection (what the customer actually chose) ─────────────────────────── */

export interface SelectionLine {
  component: VzComponent;
  qty: number;
  unitPrice: number | null;
  recommended: boolean;
  reason: string | null;
}

export interface Selection {
  kit: VzKit | null;
  kitPrice: number | null;
  lines: SelectionLine[];
  extrasTotal: number | null;
  total: number | null;
  allPriced: boolean;
}

export function resolveSelection(design: Design, est: Estimate, catalog: VzCatalog): Selection {
  const kit = (design.kitSlug && catalog.kits.find((k) => k.slug === design.kitSlug)) || est.kit;
  const chosen: Record<string, number> = design.addons ?? Object.fromEntries(est.addons.filter((a) => a.recommended).map((a) => [a.key, a.qty]));
  const lines: SelectionLine[] = [];
  for (const [key, qty] of Object.entries(chosen)) {
    if (!qty) continue;
    const component = catalog.components.find((c) => c.key === key);
    if (!component) continue;
    const rec = est.addons.find((a) => a.key === key);
    lines.push({ component, qty, unitPrice: component.price, recommended: !!rec?.recommended, reason: rec?.reason ?? null });
  }
  const allPriced = !!kit && lines.every((l) => l.unitPrice !== null);
  const extrasTotal = lines.every((l) => l.unitPrice !== null) ? lines.reduce((s, l) => s + (l.unitPrice ?? 0) * l.qty, 0) : null;
  const kitPrice = kit ? kit.price : null;
  const total = allPriced && kitPrice !== null && extrasTotal !== null ? kitPrice + extrasTotal : null;
  return { kit, kitPrice, lines, extrasTotal, total, allPriced };
}

/** Components present in a kit, in catalogue order. */
export function kitContents(kit: VzKit, catalog: VzCatalog): { component: VzComponent; qty: number }[] {
  return catalog.components.map((component) => ({ component, qty: kit.bom[component.key] ?? 0 })).filter((r) => r.qty > 0);
}

export function formatFeet(ft: number): string {
  return `${Math.round(ft)} ft`;
}

export function formatMoney(n: number | null | undefined, decimals = 2): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
}

/** Plain-text summary used in emails and lead rows. */
export function summaryText(design: Design, est: Estimate, sel: Selection, catalog: VzCatalog): string {
  const lines: string[] = [];
  lines.push(`Lights: ≈ ${est.litFeet} ft (${est.litRuns} run${est.litRuns === 1 ? '' : 's'})`);
  if (est.jumpFeet) lines.push(`Unlit jumps: ≈ ${est.jumpFeet} ft (${est.jumpRuns})`);
  lines.push(`Allowance: +${est.allowanceFeet} ft → practical requirement ≈ ${est.requiredFeet} ft`);
  if (!est.hasScale) lines.push(design.manualFeet ? `Scale: none (customer typed ${design.manualFeet} ft)` : 'Scale: none set — lengths unknown');
  else if (design.scale) lines.push(`Scale reference: ${design.scale.label} = ${design.scale.feet} ft`);
  if (est.separateBuildings) lines.push(`Separate buildings: ${est.separateBuildings}`);
  lines.push(`Kit: ${sel.kit ? `${sel.kit.feet} ft kit (${formatMoney(sel.kit.price)})` : 'none'}${design.kitSlug ? ' [customer changed]' : ' [suggested]'}`);
  if (est.overflowFeet) lines.push(`Overflow beyond largest kit: ${est.overflowFeet} ft`);
  if (sel.lines.length) {
    lines.push('Add-ons:');
    for (const l of sel.lines) lines.push(`  - ${l.qty} × ${l.component.name}${l.unitPrice !== null ? ` @ ${formatMoney(l.unitPrice)}` : ''}`);
  } else lines.push('Add-ons: none');
  const colour = catalog.colours.find((c) => c.key === design.colour)?.label ?? design.colour ?? 'not chosen';
  lines.push(`Track colour: ${colour}`);
  lines.push(`Outlet distance: ${OUTLET_OPTIONS.find((o) => o.key === design.outlet)?.label ?? design.outlet}`);
  if (sel.total !== null) lines.push(`Estimated total (before shipping/tax): ${formatMoney(sel.total)}`);
  return lines.join('\n');
}
