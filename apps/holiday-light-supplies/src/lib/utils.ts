import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

/** Whole-dollar money for large display pieces (no trailing .00). */
export const formatCadRound = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n);

export const STORE_SLUG = process.env.STORE_SLUG ?? "holiday-light-supplies";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3102";
export const FREE_SHIPPING_THRESHOLD_DEFAULT = 150;

/**
 * On-brand fallback shown wherever a product/variant image URL is missing.
 * Lives here (not in the server-only catalog module) so client components
 * such as the mini-cart and checkout summary can import it too.
 */
export const PLACEHOLDER_IMAGE = "/images/logo.png";

/** Returns a usable image src, falling back to the brand placeholder. */
export const imageSrc = (url: string | null | undefined) => (url && url.trim() ? url : PLACEHOLDER_IMAGE);

/** A product whose every variant is priced at 0 is a quote-only display piece. */
export const isQuoteOnly = (prices: number[]) => prices.length > 0 && prices.every((p) => !p || p <= 0);

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Shop price filter buckets (CAD), matched against a product's lowest option. */
export const PRICE_BUCKETS = [
  { label: "Under $50", value: "0-50" },
  { label: "$50 – $250", value: "50-250" },
  { label: "$250 – $1,000", value: "250-1000" },
  { label: "$1,000 – $5,000", value: "1000-5000" },
  { label: "$5,000 +", value: "5000-999999" },
  { label: "Quote only", value: "quote" }
];
