import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

export const STORE_SLUG = process.env.STORE_SLUG ?? "ready-seal-direct";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3103";
export const FREE_SHIPPING_THRESHOLD_DEFAULT = 750;

// We don't ship a single gallon on its own — orders must contain at least this
// many gallons of stain. (A 5-gallon pail counts as 5; the brush counts as 0.)
export const MIN_ORDER_GALLONS = 2;

/** Gallons represented by a variant, parsed from its name ("1 Gallon", "5 Gallon"). */
export const gallonsForVariantName = (name: string | null | undefined): number => {
  const m = /(\d+)\s*gallon/i.exec(name ?? "");
  return m ? Number(m[1]) : 0;
};

/** Total gallons of stain across cart lines of shape { variant_name, quantity }. */
export const cartGallons = (items: { variant_name: string; quantity: number }[]): number =>
  items.reduce((sum, l) => sum + gallonsForVariantName(l.variant_name) * l.quantity, 0);
