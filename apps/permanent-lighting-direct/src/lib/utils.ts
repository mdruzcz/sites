import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined, decimals?: number) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: decimals ?? (Number.isInteger(n) ? 0 : 2),
        maximumFractionDigits: decimals ?? 2
      }).format(n);

export const STORE_SLUG = process.env.STORE_SLUG ?? "permanent-lighting-direct";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://permanentlightingdirect.ca";
export const FREE_SHIPPING_THRESHOLD_DEFAULT = 500;

export const BRAND = {
  name: "Permanent Lighting Direct",
  shortName: "PLD",
  tagline: "DIY permanent LED roofline lighting, shipped from London, Ontario.",
  city: "London",
  region: "Ontario",
  country: "Canada",
  email: "service@masterdecker.com",
  warrantyYears: 5,
  freeShippingOver: 500,
  domain: "permanentlightingdirect.ca"
} as const;
