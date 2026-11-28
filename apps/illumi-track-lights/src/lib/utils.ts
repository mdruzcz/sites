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

export const STORE_SLUG = process.env.STORE_SLUG ?? "illumi-track-lights";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://illumitracklights.ca";

export const BRAND = {
  name: "Illumi Track Lights",
  shortName: "ITL",
  tagline: "Permanent LED track lighting kits and parts. Free shipping on every order, free pickup in Woodstock, Ontario.",
  street: "631 Peel Street",
  city: "Woodstock",
  region: "Ontario",
  regionCode: "ON",
  postal: "N4S 1K9",
  country: "Canada",
  /** One line, for footers and policy pages. */
  address: "631 Peel Street, Woodstock, ON N4S 1K9",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=631+Peel+Street%2C+Woodstock%2C+ON+N4S+1K9",
  email: "service@masterdecker.com",
  warrantyYears: 5,
  domain: "illumitracklights.ca"
} as const;

/** Schema.org PostalAddress for the shop, reused by every JSON-LD block. */
export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: BRAND.street,
  addressLocality: BRAND.city,
  addressRegion: BRAND.regionCode,
  postalCode: BRAND.postal,
  addressCountry: "CA"
} as const;
