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

export function formatDim(value: number) {
  if (value === Math.floor(value)) return `${value}"`;
  const whole = Math.floor(value);
  const frac = value - whole;
  const eighths = Math.round(frac * 8);
  const map: Record<number, string> = {
    1: "1⁄8",
    2: "1⁄4",
    3: "3⁄8",
    4: "1⁄2",
    5: "5⁄8",
    6: "3⁄4",
    7: "7⁄8",
  };
  if (eighths === 0) return `${whole}"`;
  if (eighths === 8) return `${whole + 1}"`;
  return whole === 0 ? `${map[eighths]}"` : `${whole} ${map[eighths]}"`;
}

export const SITE = {
  name: "Forever Cabinets",
  domain: "forevercabinets.ca",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://forevercabinets.ca",
  tagline: "Premium White Shaker kitchen cabinets, built for Southern Ontario homes.",
  shortDescription:
    "Find the cabinet you're missing. Free local delivery across Southern Ontario in 2–3 weeks.",
  email: "service@masterdecker.com",
  phone: "+1 (519) 555-0123",
  leadTime: "2–3 weeks",
  shippingNote: "Local delivery across Southern Ontario",
  returnsWindow: "30-day returns",
  sampleDoorPrice: 35,
  serviceArea: "Southern Ontario",
  freeLocalShippingThreshold: 500,
  freeLocalShippingCities: [
    "London",
    "Brantford",
    "St Thomas",
    "Woodstock",
    "Hamilton",
    "Kitchener-Waterloo",
  ],
} as const;

// Cities we ship to with affordable freight. The closer to London ON the better.
export const SERVICE_CITIES = [
  "London", "Hamilton", "Kitchener", "Waterloo", "Cambridge", "Guelph",
  "Burlington", "Oakville", "Mississauga", "Brampton", "Toronto",
  "Brantford", "Woodstock", "Stratford", "St. Thomas", "Tillsonburg",
  "Sarnia", "Chatham-Kent", "Windsor", "Niagara Falls", "St. Catharines",
  "Welland", "Grimsby", "Fort Erie", "Simcoe", "Goderich", "Owen Sound",
];
