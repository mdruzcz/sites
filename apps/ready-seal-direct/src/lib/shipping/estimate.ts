// Distance + weight shipping estimate for Ready Seal Direct.
// Ships from Belmont, ON (FSA N0L). Online ordering is Ontario-only, so zones are
// Ontario distance bands keyed off the destination FSA (first letter of postal code).
// Estimate = zone base + (zone per-kg × total weight). Free over the store threshold.

export interface EstimateItem {
  name: string; // variant name, e.g. "1 Gallon", "5 Gallon", or the brush
  quantity: number;
}

export interface ShippingEstimate {
  amountCad: number;
  zone: number;
  zoneLabel: string;
  totalKg: number;
  free: boolean;
  deliverable: boolean; // false if the postal isn't an Ontario zone we ship to online
}

// Per-unit shipping weight in grams (includes packaging).
export function itemWeightGrams(name: string): number {
  if (/5\s*gal/i.test(name)) return 16800; // ~37 lb pail
  if (/1\s*gal/i.test(name)) return 3360; // ~7.4 lb can
  return 250; // stain brush / accessories
}

// Ontario distance zones from Belmont, ON, by destination FSA first letter.
const ZONES: Record<string, { zone: number; label: string; base: number; perKg: number }> = {
  N: { zone: 1, label: "Southwestern Ontario", base: 9, perKg: 0.9 }, // London, Woodstock, Windsor, KW, Sarnia, Brantford
  L: { zone: 2, label: "GTA West / Hamilton / Niagara", base: 11, perKg: 1.1 },
  M: { zone: 2, label: "Toronto", base: 11, perKg: 1.1 },
  K: { zone: 3, label: "Eastern Ontario / Ottawa", base: 13, perKg: 1.4 },
  P: { zone: 4, label: "Northern Ontario", base: 15, perKg: 1.9 }
};

export function zoneForPostal(postal: string) {
  const first = (postal ?? "").trim().charAt(0).toUpperCase();
  return ZONES[first] ?? null;
}

function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
}

export function totalWeightKg(items: EstimateItem[]): number {
  const grams = items.reduce((s, it) => s + itemWeightGrams(it.name) * it.quantity, 0);
  return grams / 1000;
}

export function estimateShipping(opts: {
  items: EstimateItem[];
  postal: string;
  subtotalCad: number;
  freeThresholdCad: number;
}): ShippingEstimate {
  const kg = totalWeightKg(opts.items);
  const z = zoneForPostal(opts.postal);

  // Free shipping over threshold (still report the zone if known).
  if (opts.subtotalCad >= opts.freeThresholdCad) {
    return {
      amountCad: 0,
      zone: z?.zone ?? 0,
      zoneLabel: z?.label ?? "Ontario",
      totalKg: kg,
      free: true,
      deliverable: !!z
    };
  }

  if (!z) {
    return { amountCad: 0, zone: 0, zoneLabel: "", totalKg: kg, free: false, deliverable: false };
  }

  const amount = roundToHalf(z.base + z.perKg * kg);
  return { amountCad: amount, zone: z.zone, zoneLabel: z.label, totalKg: kg, free: false, deliverable: true };
}
