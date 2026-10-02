// Shipping + sales-tax policy for online orders. Pure functions, safe to import
// from client components (the checkout page previews the same numbers the
// server charges).
//
// SAME FILE in apps/permanent-lighting-direct and apps/forever-lights — keep the
// two copies identical.
//
// Shipping: free within FREE_RADIUS_KM of the Belmont shop (straight-line
// distance from the centre of the destination's forward sortation area, the
// first three characters of the postal code); FLAT_RATE_CAD anywhere else in
// Canada. fsa-km.json lists every FSA inside the radius with its distance,
// built from the GeoNames CA postal-code centroids (CC BY 4.0).
//
// Tax: Master Decker Inc. charges GST/HST by destination province. Provincial
// sales taxes (BC PST, SK PST, MB RST, QC QST) are not collected — add them
// here only once the company is registered in that province.

import fsaKm from "./fsa-km.json";

export const SHOP = {
  name: "Master Decker Inc.",
  town: "Belmont",
  province: "ON",
  postal: "N0L 1B0",
  address: "50432 Yorke Line, Belmont, ON N0L 1B0"
} as const;

export const FREE_RADIUS_KM = 200;
export const FLAT_RATE_CAD = 200;

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
  postal: string;
  fsa: string;
  /** Distance from the shop when the FSA is inside the free radius, else null. */
  km: number | null;
  free: boolean;
  amountCad: number;
  /** Stored on the order as shipping_service_code. */
  code: "FREE_LOCAL" | "FLAT_CANADA";
  label: string;
}

const KM = fsaKm as Record<string, number>;

export function quoteShipping(rawPostal: string): ShippingQuote | null {
  const postal = normalizePostal(rawPostal);
  if (!postal) return null;
  const fsa = postal.slice(0, 3);
  const km = KM[fsa];
  if (typeof km === "number") {
    return {
      postal,
      fsa,
      km,
      free: true,
      amountCad: 0,
      code: "FREE_LOCAL",
      label: `Free local delivery (about ${km} km from our ${SHOP.town} shop)`
    };
  }
  return {
    postal,
    fsa,
    km: null,
    free: false,
    amountCad: FLAT_RATE_CAD,
    code: "FLAT_CANADA",
    label: "Flat-rate shipping across Canada"
  };
}

/** Label for an order already saved with shipping_service_code. */
export function shippingLabelFor(code: string | null | undefined, postal?: string | null): string {
  if (code === "FREE_LOCAL") {
    const q = postal ? quoteShipping(postal) : null;
    return q?.km != null ? `Free local delivery (about ${q.km} km)` : "Free local delivery";
  }
  if (code === "FLAT_CANADA") return "Flat-rate shipping across Canada";
  return "Shipping";
}

export const SHIPPING_POLICY_SHORT = `Free shipping within ${FREE_RADIUS_KM} km of our ${SHOP.town}, ON shop · $${FLAT_RATE_CAD} flat rate elsewhere in Canada`;

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
export function estimateTotals(subtotal: number, postal: string, province: string): OrderTotals {
  const shipping = quoteShipping(postal);
  const tax = taxFor(province);
  const shippingCad = shipping?.amountCad ?? 0;
  const taxCad = tax ? round2(((subtotal + shippingCad) * tax.rate) / 100) : 0;
  return { subtotal: round2(subtotal), shipping, tax, taxCad, total: round2(subtotal + shippingCad + taxCad) };
}
