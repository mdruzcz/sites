import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

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
export const imageSrc = (url: string | null | undefined) =>
  url && url.trim() ? url : PLACEHOLDER_IMAGE;
