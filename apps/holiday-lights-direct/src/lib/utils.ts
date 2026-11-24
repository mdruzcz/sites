import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

export const STORE_SLUG = process.env.STORE_SLUG ?? "holiday-lights-direct";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3101";
export const FREE_SHIPPING_THRESHOLD_DEFAULT = 500;

/** Orders at or over the threshold ship free anywhere in Canada. */
export const shipsFree = (subtotalCad: number) => subtotalCad >= FREE_SHIPPING_THRESHOLD_DEFAULT;

/** How much more a cart needs before shipping is free (0 once it qualifies). */
export const toFreeShipping = (subtotalCad: number) => Math.max(0, FREE_SHIPPING_THRESHOLD_DEFAULT - subtotalCad);
