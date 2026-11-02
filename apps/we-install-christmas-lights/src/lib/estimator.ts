/**
 * Price rules for the /estimator page. Edit the numbers here and redeploy.
 *
 * Calibrated to the published packages (Classic from $700, Festive from $1,400,
 * Griswold from $2,800, most homes $700 to $3,500). The result is a range to set
 * expectations; the firm price still comes from the quote.
 */

export type HomeSize = "bungalow" | "two" | "large";
export type Coverage = "front" | "sides" | "full";

export type EstimateInput = {
  home: HomeSize;
  coverage: Coverage;
  trees: number;
  shrubs: number;
  wreaths: number;
};

export const HOME_OPTIONS: { value: HomeSize; label: string; hint: string }[] = [
  { value: "bungalow", label: "Bungalow", hint: "One storey or a townhome" },
  { value: "two", label: "Two-storey", hint: "A standard family home" },
  { value: "large", label: "Large or custom", hint: "Three storeys, wraparound rooflines, tall peaks" },
];

export const COVERAGE_OPTIONS: { value: Coverage; label: string; hint: string }[] = [
  { value: "front", label: "Front only", hint: "The roofline you see from the street" },
  { value: "sides", label: "Front and sides", hint: "Plus the side rooflines and peaks" },
  { value: "full", label: "Whole home", hint: "Every roofline, all the way around" },
];

export const COUNT_OPTIONS = [
  { key: "trees", label: "Yard trees to wrap", hint: "Trunk and main branches", max: 8 },
  { key: "shrubs", label: "Shrubs or hedges", hint: "Net lights or wrapped", max: 12 },
  { key: "wreaths", label: "Wreaths", hint: "Door, window or garage", max: 6 },
] as const;

// Typical all-in price for the roofline alone, before trees, shrubs and wreaths.
const ROOFLINE: Record<HomeSize, Record<Coverage, number>> = {
  bungalow: { front: 800, sides: 1100, full: 1450 },
  two: { front: 1000, sides: 1450, full: 1900 },
  large: { front: 1400, sides: 2000, full: 2800 },
};
const PER_TREE = 175;
const PER_SHRUB = 60;
const PER_WREATH = 60;

// How far a real quote usually moves with roof pitch, access and exact footage.
const SPREAD_LOW = 0.88;
const SPREAD_HIGH = 1.15;

// Above this the range stops being useful, so we show a floor instead.
const CUSTOM_ABOVE = 3500;

export const TIERS = [
  { name: "Classic", from: 700 },
  { name: "Festive", from: 1400 },
  { name: "Griswold", from: 2800 },
] as const;

export type Estimate = { low: number; high: number; custom: boolean; tier: (typeof TIERS)[number]["name"] };

const to50 = (n: number) => Math.round(n / 50) * 50;

export function estimate(i: EstimateInput): Estimate {
  const mid = ROOFLINE[i.home][i.coverage] + i.trees * PER_TREE + i.shrubs * PER_SHRUB + i.wreaths * PER_WREATH;
  const tier = [...TIERS].reverse().find((t) => mid >= t.from) ?? TIERS[0];
  // Never quote below the published "from" price of the package it lands in.
  const low = Math.max(tier.from, to50(mid * SPREAD_LOW));
  const high = Math.max(low + 100, to50(mid * SPREAD_HIGH));
  return { low, high, custom: high > CUSTOM_ABOVE, tier: tier.name };
}

export const money = (n: number) => `$${n.toLocaleString("en-CA")}`;

export const rangeLabel = (e: Estimate) => (e.custom ? `${money(e.low)}+` : `${money(e.low)} to ${money(e.high)}`);

/** One line for the lead email, so we quote from what the customer picked. */
export function describe(i: EstimateInput, e: Estimate) {
  const home = HOME_OPTIONS.find((o) => o.value === i.home)?.label;
  const cover = COVERAGE_OPTIONS.find((o) => o.value === i.coverage)?.label;
  return `Estimator: ${home}, ${cover}, ${i.trees} trees, ${i.shrubs} shrubs or hedges, ${i.wreaths} wreaths. Shown ${rangeLabel(e)} (${e.tier}).`;
}
