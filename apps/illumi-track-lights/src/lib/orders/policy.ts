// Shipping + sales-tax policy for Illumi Track Lights online orders. Pure
// functions, safe to import from client components (the checkout page previews
// the same numbers the server charges).
//
// THIS COPY IS ILLUMI'S OWN. permanent-lighting-direct and forever-lights share
// a different policy (free within 200 km, flat rate beyond); Illumi's is simpler:
//
// Shipping: free on every order to any Canadian address. No minimum, no zones.
// Pickup:   free, from the Woodstock shop, once we email that the order is ready.
//
// Tax: Master Decker Inc. charges GST/HST by destination province. A pickup is
// supplied in Ontario, so it carries Ontario HST whatever the buyer's home
// province. Provincial sales taxes (BC PST, SK PST, MB RST, QC QST) are not
// collected — add them here only once the company is registered there.

export const SHOP = {
  name: "Illumi Track Lights",
  street: "631 Peel Street",
  town: "Woodstock",
  province: "ON",
  postal: "N4S 1K9",
  address: "631 Peel Street, Woodstock, ON N4S 1K9"
} as const;

export type FulfilmentMethod = "ship" | "pickup";

export function isFulfilmentMethod(v: unknown): v is FulfilmentMethod {
  return v === "ship" || v === "pickup";
}

export const PROVINCES = [
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"]
] as const;

export type ProvinceCode = (typeof PROVINCES)[number][0];

export function isProvince(code: string): code is ProvinceCode {
  return PROVINCES.some(([c]) => c === code);
}

export function provinceName(code: string): string {
  return PROVINCES.find(([c]) => c === code)?.[1] ?? code;
}

const TAX: Record<ProvinceCode, { rate: number; label: "HST" | "GST" }> = {
  ON: { rate: 13, label: "HST" },
  NB: { rate: 15, label: "HST" },
  NL: { rate: 15, label: "HST" },
  PE: { rate: 15, label: "HST" },
  NS: { rate: 14, label: "HST" },
  AB: { rate: 5, label: "GST" },
  BC: { rate: 5, label: "GST" },
  MB: { rate: 5, label: "GST" },
  SK: { rate: 5, label: "GST" },
  QC: { rate: 5, label: "GST" },
  NT: { rate: 5, label: "GST" },
  NU: { rate: 5, label: "GST" },
  YT: { rate: 5, label: "GST" }
};

export interface TaxRule {
  province: ProvinceCode;
  rate: number;
  label: "HST" | "GST";
  /** e.g. "HST 13% (ON)" */
  display: string;
}

export function taxFor(province: string): TaxRule | null {
  if (!isProvince(province)) return null;
  const t = TAX[province];
  return { province, rate: t.rate, label: t.label, display: `${t.label} ${t.rate}% (${province})` };
}

/** Canada Post's first-letter → province map, used to stop a postal code from
 *  one province being paired with an address in another. */
const POSTAL_PROVINCES: Record<string, ProvinceCode[]> = {
  A: ["NL"],
  B: ["NS"],
  C: ["PE"],
  E: ["NB"],
  G: ["QC"],
  H: ["QC"],
  J: ["QC"],
  K: ["ON"],
  L: ["ON"],
  M: ["ON"],
  N: ["ON"],
  P: ["ON"],
  R: ["MB"],
  S: ["SK"],
  T: ["AB"],
  V: ["BC"],
  X: ["NT", "NU"],
  Y: ["YT"]
};

/** "n0l1b0" / "N0L-1B0" → "N0L 1B0"; null when it isn't a Canadian postal code. */
export function normalizePostal(raw: string | null | undefined): string | null {
  const s = String(raw ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/.test(s)) return null;
  return `${s.slice(0, 3)} ${s.slice(3)}`;
}

export function postalMatchesProvince(postal: string, province: string): boolean {
  const allowed = POSTAL_PROVINCES[postal.charAt(0).toUpperCase()];
  return !!allowed && allowed.includes(province as ProvinceCode);
}

export interface ShippingQuote {
  /** Destination postal code; the shop's own for a pickup. */
  postal: string;
  fsa: string;
  /** Kept for the shared order documents; Illumi does not price by distance. */
  km: number | null;
  free: boolean;
  amountCad: number;
  /** Stored on the order as shipping_service_code. */
  code: "FREE_SHIPPING" | "PICKUP_WOODSTOCK";
  label: string;
}

export const SHIPPING_LABEL = "Free shipping";
export const PICKUP_LABEL = `Pickup at ${SHOP.street}, ${SHOP.town}`;

/** Every Canadian postal code ships free. Null only when the code isn't valid. */
export function quoteShipping(rawPostal: string): ShippingQuote | null {
  const postal = normalizePostal(rawPostal);
  if (!postal) return null;
  return { postal, fsa: postal.slice(0, 3), km: null, free: true, amountCad: 0, code: "FREE_SHIPPING", label: SHIPPING_LABEL };
}

export function quotePickup(): ShippingQuote {
  return { postal: SHOP.postal, fsa: SHOP.postal.slice(0, 3), km: 0, free: true, amountCad: 0, code: "PICKUP_WOODSTOCK", label: PICKUP_LABEL };
}

export const isPickupCode = (code: string | null | undefined) => code === "PICKUP_WOODSTOCK";

/** Label for an order already saved with shipping_service_code. The two legacy
 *  codes are orders placed before 2026-11-27, when shipping was priced by distance. */
export function shippingLabelFor(code: string | null | undefined, _postal?: string | null): string {
  if (code === "FREE_SHIPPING") return SHIPPING_LABEL;
  if (code === "PICKUP_WOODSTOCK") return PICKUP_LABEL;
  if (code === "FREE_LOCAL") return "Free local delivery";
  if (code === "FLAT_CANADA") return "Flat-rate shipping across Canada";
  return "Shipping";
}

export const SHIPPING_POLICY_SHORT = `Free shipping on every order, anywhere in Canada · Free pickup in ${SHOP.town}, Ontario`;

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface OrderTotals {
  subtotal: number;
  shipping: ShippingQuote | null;
  tax: TaxRule | null;
  taxCad: number;
  total: number;
}

/** Totals as the checkout page shows them. Stripe computes the final tax per line,
 *  so the charged figure can differ from this by a cent; the webhook stores Stripe's. */
export function estimateTotals(subtotal: number, postal: string, province: string, method: FulfilmentMethod = "ship"): OrderTotals {
  const pickup = method === "pickup";
  const shipping = pickup ? quotePickup() : quoteShipping(postal);
  const tax = taxFor(pickup ? SHOP.province : province);
  const shippingCad = shipping?.amountCad ?? 0;
  const taxCad = tax ? round2(((subtotal + shippingCad) * tax.rate) / 100) : 0;
  return { subtotal: round2(subtotal), shipping, tax, taxCad, total: round2(subtotal + shippingCad + taxCad) };
}
