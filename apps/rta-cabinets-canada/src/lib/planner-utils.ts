import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCad(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDim(value: number) {
  if (value === Math.floor(value)) return `${value}"`;
  const whole = Math.floor(value);
  const frac = value - whole;
  const eighths = Math.round(frac * 8);
  const map: Record<number, string> = { 1: "1⁄8", 2: "1⁄4", 3: "3⁄8", 4: "1⁄2", 5: "5⁄8", 6: "3⁄4", 7: "7⁄8" };
  if (eighths === 0) return `${whole}"`;
  if (eighths === 8) return `${whole + 1}"`;
  return whole === 0 ? `${map[eighths]}"` : `${whole} ${map[eighths]}"`;
}

export const SITE = {
  name: site.name,
  domain: site.domain,
  url: site.url,
  email: site.email,
  phone: site.phone,
  leadTime: "2–3 weeks",
} as const;
