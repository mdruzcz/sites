import type { Property } from "@/lib/types";

const CAD = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/** "$2,650". Returns null for missing prices so callers can hide the row. */
export function money(value: number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  return CAD.format(value);
}

export interface Rate {
  /** What the renter pays — the discount when there is one. */
  amount: number;
  /** The list price to strike through, or null when nothing is discounted. */
  original: number | null;
  unit: string;
  /** Formatted effective amount, e.g. "$2,400". */
  display: string;
  /** Formatted list price, e.g. "$2,500". Null when not discounted. */
  originalDisplay: string | null;
}

/**
 * The headline price for a card, a rate panel or a schema Offer.
 *
 * Monthly wins when present. When a discount is set it becomes the amount, and
 * the list price is returned alongside so the UI can strike it through — the
 * effective figure is the one that should reach a renter, a filter or Google.
 */
export function headlineRate(p: Property): Rate | null {
  const tiers: [number | null, number | null, string][] = [
    [p.monthly_rate, p.discount_monthly_rate, "month"],
    [p.weekly_rate, p.discount_weekly_rate, "week"],
    [p.nightly_rate, null, "night"]
  ];

  for (const [list, discount, unit] of tiers) {
    if (!list && !discount) continue;
    const amount = discount ?? list!;
    const original = discount && list && list > discount ? list : null;
    return {
      amount,
      original,
      unit,
      display: CAD.format(amount),
      originalDisplay: original ? CAD.format(original) : null
    };
  }
  return null;
}

/** What a renter actually pays per month — used by budget filtering. */
export function effectiveMonthly(p: Property): number | null {
  return p.discount_monthly_rate ?? p.monthly_rate;
}

/** "3 bedrooms · 2 baths · Sleeps 6" — the standard sub-line under a title. */
export function specLine(p: Property): string {
  const parts = [
    `${p.bedrooms} ${p.bedrooms === 1 ? "bedroom" : "bedrooms"}`,
    `${p.bathrooms} ${p.bathrooms === 1 ? "bath" : "baths"}`,
    `Sleeps ${p.sleeps}`
  ];
  return parts.join(" · ");
}

/** "4488 East Road #1, Port Stanley, ON" */
export function fullAddress(p: Property): string {
  const street = p.unit ? `${p.street_address} ${p.unit}` : p.street_address;
  return `${street}, ${p.city}, ${p.region}`;
}

/** The address without the civic number — safe for public display before booking. */
export function areaLabel(p: Property): string {
  return `${p.city}, ${p.region}`;
}

/** Split a description into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Availability window as a readable phrase, or a sensible default. */
export function availabilityLabel(p: Property): string {
  if (p.available_from && p.available_to) return `${p.available_from} – ${p.available_to}`;
  if (p.available_from) return `From ${p.available_from}`;
  if (p.available_to) return `Until ${p.available_to}`;
  return "September – May";
}

/** Minimum stay phrased for humans: 30 nights reads better as "1 month". */
export function minStayLabel(nights: number): string {
  if (nights >= 28 && nights <= 31) return "1 month minimum";
  if (nights >= 56 && nights <= 62) return "2 month minimum";
  if (nights % 30 === 0) return `${nights / 30} month minimum`;
  if (nights === 7) return "1 week minimum";
  return `${nights} night minimum`;
}

/** A URL-safe slug from a property name. Used by the admin when creating. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
