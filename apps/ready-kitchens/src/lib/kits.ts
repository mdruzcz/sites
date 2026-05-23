import kitsData from "@/content/kits.json";
import codesData from "@/content/cabinet-codes.json";

export type KitItem = {
  sku: string;
  name: string;
  qty: number;
  note?: string;
};

export type Kit = {
  slug: string;
  name: string;
  tagline: string;
  shape: string;
  pieces: number;
  price_cad: number;
  layout_fits: string;
  best_for: string;
  summary: string;
  hero_image: string;
  gallery: string[];
  highlights: string[];
  items: KitItem[];
};

export type CabinetCode = {
  code: string;
  label: string;
  description: string;
};

const KITS = kitsData as Kit[];
const CODES = codesData as CabinetCode[];

export function getAllKits(): Kit[] {
  return KITS;
}

export function getKitBySlug(slug: string): Kit | undefined {
  return KITS.find((k) => k.slug === slug);
}

export function getCabinetCodes(): CabinetCode[] {
  return CODES;
}

export function kitTotalPieces(kit: Kit): number {
  return kit.items.reduce((sum, i) => sum + i.qty, 0);
}
