import gallery from "@/content/xmas-gallery.json";

export interface GalleryPhoto {
  image: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const all = gallery as GalleryPhoto[];
const key = (p: GalleryPhoto) => p.image.split("/").pop()!.replace(/-0\d\.(jpe?g|webp|png)$/i, "");
const byKey = new Map(all.map((p) => [key(p), p]));

/** Real install photo by filename stem (without the trailing -01.jpg). */
export function photo(k: string): GalleryPhoto {
  const p = byKey.get(k);
  if (!p) throw new Error(`Unknown gallery photo: ${k}`);
  return p;
}
export const hasPhoto = (k: string) => byKey.has(k);
export const photosByCategory = (cat: string) => all.filter((p) => p.category === cat);
export const ALL_PHOTOS = all;

/** Curated picks used across the site. */
export const PICKS = {
  heroHome: "upscale-brick-home-warm-white-roofline-christmas-lights",
  heroClassic: "red-and-warm-white-c9-roofline-brick-home",
  heroPermanent: "home-multicolour-rgb-permanent-led-roofline",
  heroPermanentBlue: "two-storey-home-blue-holiday-permanent-lighting-front",
  heroCommercial: "commercial-storefront-warm-white-christmas-lights-entrance",
  heroMunicipal: "town-square-trees-wrapped-christmas-lights-benches",
  heroTree: "large-spruce-tree-multicolour-christmas-lights-home",
  heroInterior: "corporate-lobby-christmas-tree-gold-ribbon",
  heroResidential: "warm-white-christmas-roofline-lights-stone-house-evening",
  heroAbout: "night-holiday-light-installation-boom-lift",
  heroGallery: "grey-brick-home-white-roofline-lights-lit-window-wreaths",
  heroAreas: "modern-brick-home-tree-wrapped-warm-white-lights-roofline",
  heroContact: "professional-christmas-light-installation-modern-home",
  heroFaq: "warm-white-wrapped-evergreen-and-roofline-christmas-lights-home",
  heroResources: "light-wrapped-tree-front-yard-christmas-display",
  install1: "commercial-building-christmas-light-install-boom-lift",
  install2: "installer-wrapping-blue-lights-downtown-tree",
  wreath: "pre-lit-christmas-wreath-red-berries-gold-bow",
  treeWrap: "colorful-light-wrapped-tree-stone-estate-night",
  church: "warm-white-roofline-lights-historic-brick-church",
  mall: "mall-atrium-giant-red-christmas-tree",
} as const;
