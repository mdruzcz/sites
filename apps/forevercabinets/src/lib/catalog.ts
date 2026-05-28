import data from "@/content/cabinets.json";

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
  features: string[];
  in_stock: boolean;
  image_urls: string[];
};

const CABINETS = data as Cabinet[];

export function getAllCabinets(): Cabinet[] {
  return CABINETS;
}

export function getCabinetBySlug(slug: string): Cabinet | undefined {
  return CABINETS.find((c) => c.slug === slug);
}

export function getCabinetBySku(sku: string): Cabinet | undefined {
  return CABINETS.find((c) => c.sku === sku);
}

export function getCabinetsByType(type: CabinetType): Cabinet[] {
  return CABINETS.filter((c) => c.type === type);
}

export function getRelatedAccessories(c: Cabinet, limit = 4): Cabinet[] {
  return CABINETS.filter((x) => x.type === "accessory" && x.sku !== c.sku).slice(0, limit);
}

export function getOtherWidthsInSeries(c: Cabinet): Cabinet[] {
  if (c.type === "accessory") return [];
  const prefix = c.sku.replace(/\d+(-\d+)?$/, "");
  if (!prefix || prefix === c.sku) return [];
  return CABINETS.filter(
    (x) => x.sku !== c.sku && x.type === c.type && x.sku.startsWith(prefix),
  ).sort((a, b) => (a.width_in ?? 0) - (b.width_in ?? 0));
}

export const TYPE_LABEL: Record<CabinetType, string> = {
  base: "Base Cabinets",
  drawer: "Drawer Cabinets",
  wall: "Wall Cabinets",
  accessory: "Accessories",
};

export const TYPE_SHORT: Record<CabinetType, string> = {
  base: "Base",
  drawer: "Drawer",
  wall: "Wall",
  accessory: "Accessory",
};

export const TYPE_BLURB: Record<CabinetType, string> = {
  base: "Floor-standing cabinets — 34½″ standard counter height, 24″ deep.",
  drawer: "Drawer-front base cabinets — stacked drawer banks for pots, utensils, and pantry.",
  wall: "Above-counter wall cabinets — most are 12″ deep, available 12″–36″ tall.",
  accessory: "Mouldings, fillers, panels, toe kicks, and finishing touches.",
};

export const TYPE_PATH: Record<CabinetType, string> = {
  base: "/base-cabinets",
  drawer: "/drawer-cabinets",
  wall: "/wall-cabinets",
  accessory: "/accessories",
};

export const SLUG_TO_TYPE: Record<string, CabinetType> = {
  base: "base",
  drawer: "drawer",
  wall: "wall",
  accessory: "accessory",
};
