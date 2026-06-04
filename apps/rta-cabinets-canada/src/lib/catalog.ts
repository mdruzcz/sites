import cabinets from "@/content/cabinets.json";
import packages from "@/content/packages.json";

export type Cabinet = {
  slug: string;
  sku: string;
  name: string;
  group: string;
  group_label: string;
  width_in: number | null;
  price_cad: number | null;
  quote_only: boolean;
  description: string;
  images: string[];
};

export type PackageItem = {
  sku: string;
  name: string;
  qty: number;
  unit_price_cad: number | null;
  line_total: number | null;
};

export type KitchenPackage = {
  slug: string;
  name: string;
  tagline: string;
  layout: string;
  bestFor: string;
  hero_image: string;
  items: PackageItem[];
  subtotal_cad: number;
  from_price: boolean;
};

// Display order + blurbs. Slugs match generated cabinets.json exactly.
export const GROUPS: { slug: string; label: string; blurb: string }[] = [
  { slug: "base", label: "Base Cabinets", blurb: "Floor-standing cabinets that form the foundation of your kitchen." },
  { slug: "drawer-base", label: "Drawer Base Cabinets", blurb: "Three-drawer base cabinets for pots, utensils and more." },
  { slug: "sink-base", label: "Sink Base Cabinets", blurb: "Open-back base cabinets built for sinks and plumbing." },
  { slug: "corner", label: "Corner & Specialty Base", blurb: "Lazy susan, blind base and corner solutions." },
  { slug: "wall", label: "Wall Cabinets", blurb: "Upper cabinets for dishes, glassware and everyday essentials." },
  { slug: "tall", label: "Pantry & Tall", blurb: "Full-height pantry and utility cabinets for maximum storage." },
  { slug: "specialty", label: "Specialty", blurb: "Wine rack, microwave and refrigerator wall cabinets." },
  { slug: "accessories", label: "Accessories & Trim", blurb: "Fillers, panels, mouldings, toe kick and organizers." },
];

const LABELS: Record<string, string> = Object.fromEntries(GROUPS.map((g) => [g.slug, g.label]));

export function getCabinets(): Cabinet[] {
  return cabinets as Cabinet[];
}

export function getCabinet(slug: string): Cabinet | undefined {
  return (cabinets as Cabinet[]).find((c) => c.slug === slug);
}

export function getCabinetBySku(sku: string): Cabinet | undefined {
  return (cabinets as Cabinet[]).find((c) => c.sku === sku);
}

export function getGroups(): string[] {
  // only groups that actually have items, in display order
  const present = new Set((cabinets as Cabinet[]).map((c) => c.group));
  return GROUPS.filter((g) => present.has(g.slug)).map((g) => g.slug);
}

export function groupLabel(slug: string): string {
  return LABELS[slug] ?? slug;
}

export function getCabinetsByGroup(group: string): Cabinet[] {
  return (cabinets as Cabinet[]).filter((c) => c.group === group);
}

export function groupPriceRange(group: string): string {
  const prices = getCabinetsByGroup(group)
    .map((c) => c.price_cad)
    .filter((p): p is number => p !== null);
  if (prices.length === 0) return "Quote only";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

export function getPackages(): KitchenPackage[] {
  return packages as KitchenPackage[];
}

export function getPackage(slug: string): KitchenPackage | undefined {
  return (packages as KitchenPackage[]).find((p) => p.slug === slug);
}
