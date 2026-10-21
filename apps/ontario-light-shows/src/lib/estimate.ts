import { pricing, PROP_TYPES, type PropType, type RegionId } from "./pricing";

export type Counts = Record<PropType, number>;
export type LineItem = { kind: "control" | "prop" | "install" | "travel" | "accommodation"; label: string; detail: string; qty: number; unit: number; total: number };
export type Estimate = { counts: Counts; hardware: LineItem[]; hardwareTotal: number; install: LineItem[]; installTotal: number; total: number; region: RegionId };

export const emptyCounts = (): Counts => ({ stage: 0, flake: 0, mega: 0, singing: 0, cane: 0, arch: 0 });
export const totalProps = (c: Counts) => PROP_TYPES.reduce((s, t) => s + c[t], 0);

export function describeCounts(c: Counts): string {
  const parts = PROP_TYPES.filter((t) => c[t] > 0).map((t) => {
    const p = pricing.props[t];
    return `${c[t]} ${c[t] === 1 ? p.label.toLowerCase() : p.plural.toLowerCase()}`;
  });
  return parts.length ? parts.join(", ") : "show control system only";
}

export function estimate(c: Counts, region: RegionId): Estimate {
  const cs = pricing.controlSystem;
  const hardware: LineItem[] = [{ kind: "control", label: cs.label, detail: cs.detail, qty: 1, unit: cs.price, total: cs.price }];
  for (const t of PROP_TYPES) {
    if (!c[t]) continue;
    const p = pricing.props[t];
    hardware.push({ kind: "prop", label: c[t] === 1 ? p.label : p.plural, detail: p.detail, qty: c[t], unit: p.price, total: c[t] * p.price });
  }
  const inst = pricing.installation;
  const raw = cs.crewDays + PROP_TYPES.reduce((s, t) => s + c[t] * pricing.props[t].crewDays, 0);
  const days = Math.max(inst.minimumDays, Math.ceil(raw / inst.roundTo - 1e-9) * inst.roundTo);
  const install: LineItem[] = [{ kind: "install", label: "Installation and show-night setup", detail: "", qty: 1, unit: days * inst.crewDayRate, total: days * inst.crewDayRate }];
  const r = pricing.travel.regions[region];
  const crews = Math.ceil(days / inst.maxDaysPerTrip);
  if (r.tripFee) install.push({ kind: "travel", label: `Travel · ${r.name}`, detail: "", qty: crews, unit: r.tripFee, total: crews * r.tripFee });
  if (region !== "home" && days >= 2 && r.accommodationPerNight) {
    const nights = Math.ceil(days);
    install.push({ kind: "accommodation", label: "Crew accommodation", detail: "", qty: 1, unit: nights * r.accommodationPerNight, total: nights * r.accommodationPerNight });
  }
  const hardwareTotal = hardware.reduce((s, l) => s + l.total, 0);
  const installTotal = install.reduce((s, l) => s + l.total, 0);
  return { counts: { ...c }, hardware, hardwareTotal, install, installTotal, total: hardwareTotal + installTotal, region };
}

let SEQ: Counts[] | null = null;
function sequence(): Counts[] {
  const seq: Counts[] = [];
  const c = emptyCounts();
  seq.push({ ...c });
  for (const [t, n] of pricing.planner.recipe) {
    for (let k = 0; k < n && c[t] < pricing.planner.caps[t]; k++) c[t]++;
    seq.push({ ...c });
  }
  return seq;
}

export type Plan = { counts: Counts; estimate: Estimate; underMinimum: boolean; remaining: number };

/** Largest layout in the recipe order that fits an all-in budget (props only ever get added). */
export function planForBudget(budget: number, region: RegionId): Plan {
  SEQ ??= sequence();
  let best = 0;
  for (let i = 0; i < SEQ.length; i++) {
    if (estimate(SEQ[i], region).total <= budget) best = i;
    else break;
  }
  const est = estimate(SEQ[best], region);
  return { counts: SEQ[best], estimate: est, underMinimum: est.total > budget, remaining: Math.max(0, budget - est.total) };
}

export function encodeCounts(c: Counts) {
  return PROP_TYPES.map((t) => `${t}-${c[t]}`).join(".");
}

export function decodeCounts(s?: string | null): Counts | null {
  if (!s) return null;
  const c = emptyCounts();
  let any = false;
  for (const part of s.split(".")) {
    const [k, v] = part.split("-");
    if ((PROP_TYPES as string[]).includes(k)) {
      c[k as PropType] = Math.max(0, Math.min(99, parseInt(v, 10) || 0));
      any = true;
    }
  }
  return any ? c : null;
}
