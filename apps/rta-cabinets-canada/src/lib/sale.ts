// Sale rules for rtacabinetscanada.ca. Two promotions run at once:
//
//  1. Kitchen sale — 8% off a whole kitchen designed in the planner or bought as a package.
//  2. Overstock sale — 10–15% off individual cabinets we hold a lot of (from the monthly
//     command-center inventory snapshot). Tiers are by on-hand count.
//
// A planner line gets whichever of the two is better (never both stacked).

import { getStockSync } from "./inventory";

export const KITCHEN_SALE = {
  pct: 8,
  label: "Kitchen sale",
  badge: "SALE −8%",
  blurb: "8% off every complete kitchen — design it in the planner or pick a package.",
} as const;

/** on_hand at or above `min` → `pct` off. First matching tier wins (keep sorted high → low). */
export const OVERSTOCK_TIERS: { min: number; pct: number }[] = [
  { min: 25, pct: 15 },
  { min: 15, pct: 10 },
];

export type Pricing = {
  list: number;
  price: number;
  pct: number;
  onSale: boolean;
  label: string | null;
};

export function discounted(list: number, pct: number): number {
  return Math.round(list * (100 - pct)) / 100;
}

export function overstockPct(onHand: number): number {
  for (const t of OVERSTOCK_TIERS) if (onHand >= t.min) return t.pct;
  return 0;
}

/** Overstock sale for a single catalog cabinet (cards, product pages, cart). */
export function pricingFor(sku: string, list: number | null | undefined, opts: { comingSoon?: boolean } = {}): Pricing | null {
  if (list == null || list <= 0 || opts.comingSoon) return null;
  const stock = getStockSync(sku);
  const pct = stock ? overstockPct(stock.on_hand) : 0;
  if (!pct) return { list, price: list, pct: 0, onSale: false, label: null };
  return { list, price: discounted(list, pct), pct, onSale: true, label: `Overstock −${pct}%` };
}

/** Planner / package line: the better of the kitchen sale and the overstock sale. */
export function kitchenLinePricing(sku: string, list: number): Pricing {
  const over = pricingFor(sku, list);
  const pct = Math.max(KITCHEN_SALE.pct, over?.pct ?? 0);
  return {
    list,
    price: discounted(list, pct),
    pct,
    onSale: true,
    label: pct > KITCHEN_SALE.pct ? `Overstock −${pct}%` : `${KITCHEN_SALE.label} −${pct}%`,
  };
}

/** Whole-kitchen totals from a set of (sku, list price, qty) lines. */
export function kitchenTotals(lines: { sku: string; list: number; qty: number }[]): { list: number; price: number; saved: number; pct: number } {
  let list = 0;
  let price = 0;
  for (const l of lines) {
    const p = kitchenLinePricing(l.sku, l.list);
    list += l.list * l.qty;
    price += p.price * l.qty;
  }
  const saved = Math.round((list - price) * 100) / 100;
  return { list, price: Math.round(price * 100) / 100, saved, pct: list > 0 ? Math.round((saved / list) * 1000) / 10 : 0 };
}

export function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
