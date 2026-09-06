import gallery from "@/content/gallery.json";

export interface GalleryPhoto {
  image: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const all = gallery as GalleryPhoto[];
const key = (p: GalleryPhoto) => p.image.split("/").pop()!.replace(/\.(jpe?g|webp|png)$/i, "");
const byKey = new Map(all.map((p) => [key(p), p]));

export function photo(k: string): GalleryPhoto {
  const p = byKey.get(k);
  if (!p) throw new Error(`Unknown gallery photo: ${k}`);
  return p;
}
export const photosByCategory = (cat: string) => all.filter((p) => p.category === cat);
export const ALL_PHOTOS = all.filter((p) => p.width >= 600);

/** All-Seal's own aligned before/after pairs (drag-compare safe). */
export const PAIRS: { before: string; after: string; title: string; city: string; sheen: string }[] = [
  { before: "stamped-driveway-before-sealing", after: "stamped-driveway-after-sealing", title: "Stamped driveway", city: "Southwestern Ontario", sheen: "High Gloss" },
  { before: "brantford-stamped-patio-before", after: "brantford-stamped-patio-after", title: "Stamped patio", city: "Brantford", sheen: "Semi-Gloss" },
  { before: "st-thomas-patio-before", after: "st-thomas-patio-after", title: "Raised patio", city: "St. Thomas", sheen: "High Gloss" },
  { before: "woodstock-courtyard-patio-before", after: "woodstock-courtyard-patio-after", title: "Courtyard patio", city: "Woodstock", sheen: "High Gloss" },
  { before: "north-london-walkway-before", after: "north-london-walkway-after", title: "Walkway and steps", city: "North London", sheen: "Semi-Gloss" },
  { before: "pergola-patio-before-sealing", after: "pergola-patio-after-sealing", title: "Pergola patio", city: "Southwestern Ontario", sheen: "Semi-Gloss" },
];

export const PICKS = {
  heroServices: "sealed-stamped-driveway-stone-garage",
  driveway: "wet-look-gloss-stamped-driveway-woodstock",
  patio: "brick-red-stamped-patio-gloss-sealed",
  garage: "coloured-concrete-driveway-sealed-tan",
  pool: "exposed-aggregate-patio-steps-sealed",
  walkway: "stamped-garden-walkway-sealed",
  decorative: "exposed-aggregate-closeup-sealed",
  stamped: "sealed-stamped-patio-fence-london",
  gloss: "wet-look-gloss-stamped-driveway-woodstock",
  semi: "sealed-stamped-patio-fence-london",
  matte: "exposed-aggregate-patio-steps-sealed",
  process1: "pressure-washing-stamped-patio-before-sealing",
  process2: "pressure-washing-stamped-concrete-prep",
  process3: "back-rolling-solvent-sealer-stamped-concrete",
  process4: "rolling-sealer-stamped-flagstone-closeup",
  about: "back-rolling-solvent-sealer-stamped-concrete",
  areas: "stamped-driveway-estate-garage-wide",
  contact: "stamped-driveway-cleaned-and-sealed-stone-home",
  resources: "applying-sealer-coloured-concrete-slab",
  gallery: "stamped-patio-sealed-at-sunset",
  estate: "stamped-driveway-sealed-brick-estate-home",
  border: "driveway-with-stamped-border",
  aggregateDrive: "exposed-aggregate-driveway-garage",
  broom: "broom-finish-driveway-front-view",
  curved: "curved-broom-driveway-landscaped-home",
  longDrive: "long-broom-driveway-country-home",
  steps: "stamped-porch-steps-sealed",
  boulders: "stamped-patio-steps-boulders",
  ashlar: "ashlar-slate-stamped-patio-steps-sealed",
  wide: "sealed-stamped-patio-wide-london",
  sunset: "stamped-patio-sealed-at-sunset",
  cracked: "cracked-unsealed-driveway",
  autumn: "broom-driveway-ranch-home-autumn",
  twoStorey: "broom-driveway-two-storey-home",
  patioBrick: "stamped-patio-sealed-brick-home",
  frontWalk: "curved-front-walkway-broom-finish",
  sideWalk: "stamped-side-yard-walkway",
} as const;

export const CITY_PHOTO: Record<string, string> = {
  woodstock: "wet-look-gloss-stamped-driveway-woodstock",
  "st-thomas": "st-thomas-patio-after",
  brantford: "brantford-stamped-patio-after",
  hamilton: "stamped-driveway-estate-garage-wide",
  "kitchener-waterloo": "stamped-driveway-cleaned-and-sealed-stone-home",
  cambridge: "driveway-with-stamped-border",
};
