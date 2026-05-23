import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCad(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export const SITE = {
  name: "Ready Kitchens",
  domain: "readykitchens.ca",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://readykitchens.ca",
  tagline: "Complete White Shaker kitchens — assembled, in stock, ready for pickup.",
  shortDescription:
    "Pre-configured White Shaker kitchen cabinet packages, fully assembled and ready for pickup in Belmont, Ontario. Galley, L-shape, U-shape and island layouts. Submit your order — we confirm and arrange pickup before payment.",
  email: "service@masterdecker.com",
  phone: "+1 (519) 902-7717",
  phoneDisplay: "(519) 902-7717",
  address: "50432 Yorke Line, Belmont, ON",
  city: "Belmont",
  province: "Ontario",
  postalCode: "N0L 1B0",
  pickupHours: "Monday to Friday, 9 am – 4 pm (by appointment)",
  leadTime: "Same-week pickup",
  warehouseNote: "All kits stocked and assembled at our Belmont warehouse.",
} as const;
