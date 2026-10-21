import { pricing, PROP_TYPES, type PackageDef, type PropType, type ZoneId } from "./pricing";

export type Counts = Record<PropType, number>;

export type LineItem = {
  kind: "package" | "control" | "prop" | "controller" | "install" | "travel" | "accommodation";
  label: string;
  detail?: string;
  qty: number;
  unit: number;
  total: number;
};

export type Estimate = {
  counts: Counts;
  pkg: PackageDef | null;
  hardware: LineItem[];
  hardwareTotal: number;
  crewDays: number;
  install: LineItem[];
  installTotal: number;
  total: number;
  zone: ZoneId;
};

export const emptyCounts = (): Counts => ({ mega: 0, roof: 0, deciduous: 0, evergreen: 0, arch: 0 });

export const totalProps = (c: Counts) => PROP_TYPES.reduce((s, t) => s + c[t], 0);

export const controllersNeeded = (c: Counts) => Math.max(0, Math.ceil(totalProps(c) / pricing.propsPerController) - 1);

const contains = (c: Counts, inner: Counts) => PROP_TYPES.every((t) => c[t] >= inner[t]);

/** The largest package whose props are all inside this layout. */
export function bestPackage(c: Counts): PackageDef | null {
  const sorted = [...pricing.packages].sort((a, b) => b.price - a.price);
  return sorted.find((p) => contains(c, p.contents)) ?? null;
}

export function describeCounts(c: Counts): string {
  const parts = PROP_TYPES.filter((t) => c[t] > 0).map((t) => {
    const p = pricing.props[t];
    return `${c[t]} ${c[t] === 1 ? p.label.toLowerCase() : p.plural.toLowerCase()}`;
  });
  return parts.length ? parts.join(", ") : "control system only";
}

export function estimate(c: Counts, zone: ZoneId): Estimate {
  const pkg = bestPackage(c);
  const hardware: LineItem[] = [];

  if (pkg) {
    hardware.push({
      kind: "package",
      label: pkg.fullName,
      detail: totalProps(pkg.contents) ? `Control system + ${describeCounts(pkg.contents)}` : pricing.controlSystem.detail,
      qty: 1,
      unit: pkg.price,
      total: pkg.price,
    });
  } else {
    const cs = pricing.controlSystem;
    hardware.push({ kind: "control", label: cs.label, detail: cs.detail, qty: 1, unit: cs.price, total: cs.price });
  }

  for (const t of PROP_TYPES) {
    const extra = c[t] - (pkg ? pkg.contents[t] : 0);
    if (extra <= 0) continue;
    const p = pricing.props[t];
    hardware.push({
      kind: "prop",
      label: extra === 1 ? p.label : p.plural,
      detail: p.detail,
      qty: extra,
      unit: p.price,
      total: extra * p.price,
    });
  }

  const ctlNeeded = controllersNeeded(c);
  const ctlExtra = ctlNeeded - (pkg ? controllersNeeded(pkg.contents) : 0);
  if (ctlExtra > 0) {
    const x = pricing.extraController;
    hardware.push({ kind: "controller", label: x.label, detail: x.detail, qty: ctlExtra, unit: x.price, total: ctlExtra * x.price });
  }

  const inst = pricing.installation;
  const rawDays =
    pricing.controlSystem.crewDays +
    PROP_TYPES.reduce((s, t) => s + c[t] * pricing.props[t].crewDays, 0) +
    ctlNeeded * pricing.extraController.crewDays;
  const crewDays = Math.max(inst.minimumDays, Math.ceil(rawDays / inst.roundTo - 1e-9) * inst.roundTo);

  const install: LineItem[] = [
    {
      kind: "install",
      label: "Installation",
      detail: `${crewDays} crew-day${crewDays === 1 ? "" : "s"} × ${inst.crewLabel} day rate`,
      qty: crewDays,
      unit: inst.crewDayRate,
      total: crewDays * inst.crewDayRate,
    },
  ];

  const z = pricing.travel.zones[zone];
  const crews = Math.ceil(crewDays / inst.maxDaysPerTrip);
  if (z.tripFee > 0) {
    install.push({
      kind: "travel",
      label: `Travel · ${z.name}`,
      detail: `${crews} crew trip${crews === 1 ? "" : "s"}`,
      qty: crews,
      unit: z.tripFee,
      total: crews * z.tripFee,
    });
  }
  if (zone !== "home" && crewDays >= 2 && z.accommodationPerNight > 0) {
    const nights = Math.ceil(crewDays);
    install.push({
      kind: "accommodation",
      label: "Accommodation",
      detail: `${nights} crew-night${nights === 1 ? "" : "s"} (multi-day job outside ${pricing.travel.homeRegion})`,
      qty: nights,
      unit: z.accommodationPerNight,
      total: nights * z.accommodationPerNight,
    });
  }

  const hardwareTotal = hardware.reduce((s, l) => s + l.total, 0);
  const installTotal = install.reduce((s, l) => s + l.total, 0);
  return { counts: { ...c }, pkg, hardware, hardwareTotal, crewDays, install, installTotal, total: hardwareTotal + installTotal, zone };
}

/**
 * The order props are added as the budget grows: a Starter mega tree, then the
 * planner recipe repeated (skipping types at their cap). Each step only adds, so
 * the 3D scene grows and never loses a prop as the slider moves up.
 */
function buildSequence(): Counts[] {
  const seq: Counts[] = [];
  const c = emptyCounts();
  seq.push({ ...c });
  const { recipe, caps } = pricing.planner;
  let progressed = true;
  while (progressed) {
    progressed = false;
    for (const t of recipe) {
      if (c[t] >= caps[t]) continue;
      c[t] += 1;
      seq.push({ ...c });
      progressed = true;
    }
  }
  return seq;
}

let SEQUENCE: Counts[] | null = null;

export type Plan = { counts: Counts; estimate: Estimate; underMinimum: boolean; remaining: number; atCap: boolean };

/** Best layout for an all-in budget (hardware + installation + travel, before tax). */
export function planForBudget(budget: number, zone: ZoneId): Plan {
  SEQUENCE ??= buildSequence();
  let best = 0;
  for (let i = 0; i < SEQUENCE.length; i++) {
    if (estimate(SEQUENCE[i], zone).total <= budget) best = i;
    else break;
  }
  const counts = SEQUENCE[best];
  const est = estimate(counts, zone);
  const underMinimum = est.total > budget;
  return {
    counts,
    estimate: est,
    underMinimum,
    remaining: Math.max(0, budget - est.total),
    atCap: best === SEQUENCE.length - 1,
  };
}

/** Typical all-in figure for a package in a zone (used on city pages). */
export function packageEstimate(slug: string, zone: ZoneId) {
  const pkg = pricing.packages.find((p) => p.slug === slug);
  return pkg ? estimate(pkg.contents, zone) : null;
}

export function encodeCounts(c: Counts): string {
  return PROP_TYPES.map((t) => `${t}-${c[t]}`).join(".");
}

export function decodeCounts(s: string | undefined | null): Counts | null {
  if (!s) return null;
  const c = emptyCounts();
  let any = false;
  for (const part of s.split(".")) {
    const [k, v] = part.split("-");
    if ((PROP_TYPES as string[]).includes(k)) {
      const n = Math.max(0, Math.min(99, parseInt(v, 10) || 0));
      c[k as PropType] = n;
      any = true;
    }
  }
  return any ? c : null;
}

/** Plain-language list of what ships in a package. */
export function kitIncludes(contents: Counts): string[] {
  const items = totalProps(contents)
    ? ["The complete control system (everything in the Starter Kit)"]
    : [...pricing.controlSystem.includes];
  for (const t of PROP_TYPES) {
    const n = contents[t];
    if (!n) continue;
    const p = pricing.props[t];
    items.push(`${n} × ${n === 1 ? p.label.toLowerCase() : p.plural.toLowerCase()}: ${p.detail.charAt(0).toLowerCase()}${p.detail.slice(1)}`);
  }
  const ctl = controllersNeeded(contents);
  if (ctl) items.push(`${ctl} additional pixel controller${ctl === 1 ? "" : "s"} with power distribution`);
  if (totalProps(contents)) items.push("12 V WS2811 pixels, extension cabling and mounting hardware for the props");
  items.push("Lifetime access to the Light Show software, updates included");
  return items;
}
