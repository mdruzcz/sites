import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCad = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

export const STORE_SLUG = process.env.STORE_SLUG ?? "illumi-track-lights";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3103";
export const FREE_SHIPPING_THRESHOLD_DEFAULT = 500;
