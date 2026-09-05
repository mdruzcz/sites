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
  heroHome: "estate-home-warm-white-roofline-christmas-lights-lit-trees",
  heroInstall: "warm-white-c9-roofline-lights-brick-country-home",
  heroHomes: "warm-white-roofline-christmas-lights-stone-home-with-lit-spruce",
  heroBusiness: "blue-white-roofline-lighting-commercial-building",
  heroTree: "estate-cool-white-tree-wrapping-christmas-lights",
  heroRental: "municipal-park-christmas-tree-multicolour-lights-night",
  heroDecor: "warm-white-roofline-lights-front-entrance-wreath-home",
  heroAbout: "installer-in-bucket-hanging-roofline-christmas-lights",
  heroGallery: "warm-white-roofline-christmas-lights-stone-coach-house",
  heroAreas: "warm-white-c9-roofline-lights-country-home-wide",
  heroContact: "white-c9-roofline-lights-stone-home-front-entry",
  heroFaq: "two-storey-brick-home-white-christmas-roofline-lights-snow",
  heroResources: "warm-white-roofline-and-wreath-christmas-lights-home",
  install1: "christmas-light-installer-bucket-lift-two-storey-home",
  install2: "aerial-lift-christmas-light-installation-brick-home",
  install3: "bucket-truck-installing-roofline-christmas-lights",
  treeWrap: "multicolour-led-wrapped-tree-estate-snow-night",
  treeColour: "estate-tree-wrapped-colorful-christmas-lights",
  church: "historic-church-outlined-warm-white-roofline-lights",
  wreath: "warm-white-roofline-lights-front-entrance-wreath-home",
  snowHome: "warm-white-roofline-christmas-lights-two-storey-home-snow",
  driveway: "luxury-home-driveway-christmas-lights-landscape-lighting",
  hedges: "front-yard-net-lights-hedges-wrapped-tree",
  multicolour: "ranch-home-multicolour-christmas-lights-wide-view",
  greenTree: "ranch-home-green-wrapped-tree-and-roofline-christmas-lights",
  reindeer: "lit-reindeer-and-red-warm-white-roofline-christmas-lights",
  spiralTrees: "giant-evergreen-spiral-lights-cone-tree-row",
  parkTrees: "park-trees-wrapped-warm-white-lights-night",
  courtyard: "commercial-courtyard-red-green-christmas-tree-lights",
  office: "downtown-office-entrance-warm-white-blue-lights",
  storefront: "commercial-storefront-warm-white-christmas-lights-wreath",
  lobbyTree: "installer-decorating-large-atrium-christmas-tree",
  frontEntrance: "two-storey-home-warm-white-christmas-lights-front-entrance",
  moonlit: "two-storey-home-warm-white-roofline-lights-moonlit",
  colourRoofline: "colour-changing-roofline-uplighting-stone-home-night",
  blueSpruce: "tall-evergreen-blue-white-lights-front-yard",
  goldenCone: "giant-golden-cone-christmas-tree-city-plaza-night",
  pavilion: "blue-light-cone-trees-nativity-community-pavilion-display",
} as const;
