// Planner-shaped view of the RTA catalog (same shape the Kitchen Planner was written against).

import { getCabinets, type Cabinet as RtaCabinet } from "./catalog";

export type CabinetType = "base" | "drawer" | "wall" | "accessory";

export type Cabinet = {
  sku: string;
  slug: string;
  name: string;
  type: CabinetType;
  description: string | null;
  width_in: number | null;
  height_in: number | null;
  depth_in: number | null;
  price_cad: number;
  quote_only: boolean;
  coming_soon: boolean;
  features: string[];
  in_stock: boolean;
  image_urls: string[];
};

const WALL_GROUPS = new Set(["wall", "tall", "specialty"]);
const WALL_CORNER = /^(WDC|WDCG|WBC)/i;

function typeOf(c: RtaCabinet): CabinetType {
  const sku = c.sku.toUpperCase();
  if (c.group === "drawer-base") return sku.startsWith("BWBK") ? "base" : "drawer";
  if (c.group === "base" || c.group === "sink-base") return "base";
  if (c.group === "corner") return WALL_CORNER.test(sku) ? "wall" : "base";
  if (WALL_GROUPS.has(c.group)) return "wall";
  if (sku === "SR9") return "base";
  return "accessory";
}

function featuresOf(c: RtaCabinet): string[] {
  const f = new Set(c.features ?? []);
  const sku = c.sku.toUpperCase();
  if (sku.startsWith("SB")) f.add("sink");
  if (/^LAZY SUSAN/.test(sku)) {
    f.add("lazy-susan");
    f.add("corner");
  }
  if (sku.startsWith("BBC") || sku.startsWith("WBC") || sku.startsWith("WDC") || sku === "BEC24" || sku === "WEC1236") f.add("corner");
  if (sku.startsWith("WGC") || sku.startsWith("WDCG")) f.add("glass-door");
  if (sku.startsWith("WMC")) f.add("microwave");
  if (sku.startsWith("WRC")) f.add("wine-rack");
  if (sku.startsWith("BWBK")) f.add("waste-basket");
  if (sku.startsWith("WP")) f.add("tall");
  if (sku.startsWith("WF")) f.add("filler");
  if (/STEM/.test(sku)) f.add("stemware");
  return [...f];
}

let CACHE: Cabinet[] | null = null;

export function getAllCabinets(): Cabinet[] {
  if (!CACHE) {
    CACHE = getCabinets().map((c) => ({
      sku: c.sku,
      slug: c.slug,
      name: c.name,
      type: typeOf(c),
      description: c.description || null,
      width_in: c.width_in,
      height_in: c.height_in ?? null,
      depth_in: c.depth_in ?? null,
      price_cad: c.price_cad ?? 0,
      quote_only: !!c.quote_only,
      coming_soon: !!c.coming_soon,
      features: featuresOf(c),
      in_stock: true,
      image_urls: c.images,
    }));
  }
  return CACHE;
}

export function getCabinetBySku(sku: string): Cabinet | undefined {
  return getAllCabinets().find((c) => c.sku === sku);
}

export function getCabinetBySlug(slug: string): Cabinet | undefined {
  return getAllCabinets().find((c) => c.slug === slug);
}
