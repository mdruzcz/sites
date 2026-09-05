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

/** Real project photo by filename stem. */
export function photo(k: string): GalleryPhoto {
  const p = byKey.get(k);
  if (!p) throw new Error(`Unknown gallery photo: ${k}`);
  return p;
}
export const hasPhoto = (k: string) => byKey.has(k);
export const photosByCategory = (cat: string) => all.filter((p) => p.category === cat);
export const ALL_PHOTOS = all;

/** Before/after pairs (stems). */
export const BEFORE_AFTER: { before: string; after: string; title: string; city: string; finish: string }[] = [
  { before: "stamped-driveway-before-sealing", after: "stamped-driveway-after-sealing", title: "Stamped driveway", city: "London", finish: "Gloss" },
  { before: "brantford-stamped-patio-before", after: "brantford-stamped-patio-after", title: "Stamped patio", city: "Brantford", finish: "Semi-gloss" },
  { before: "st-thomas-patio-before", after: "st-thomas-patio-after", title: "Stamped patio", city: "St. Thomas", finish: "Gloss" },
  { before: "woodstock-courtyard-patio-before", after: "woodstock-courtyard-patio-after", title: "Courtyard patio", city: "Woodstock", finish: "Gloss" },
  { before: "north-london-walkway-before", after: "north-london-walkway-after", title: "Walkway and steps", city: "North London", finish: "Semi-gloss" },
  { before: "pergola-patio-before-sealing", after: "pergola-patio-after-sealing", title: "Pergola patio", city: "London", finish: "Semi-gloss" },
];

/** Curated picks used across the site. */
export const PICKS = {
  heroHome: "stamped-driveway-sealed-brick-estate-home",
  heroDriveway: "stamped-driveway-cleaned-and-sealed-stone-home",
  heroPatio: "brick-red-stamped-patio-gloss-sealed",
  heroStamped: "sealed-stamped-patio-fence-london",
  heroWalkway: "stamped-garden-walkway-sealed",
  heroAggregate: "exposed-aggregate-patio-steps-sealed",
  heroCommercial: "broom-driveway-two-storey-home",
  heroFinishes: "wet-look-gloss-stamped-driveway-woodstock",
  heroAbout: "back-rolling-solvent-sealer-stamped-concrete",
  heroGallery: "stamped-patio-sealed-at-sunset",
  heroAreas: "stamped-driveway-brick-home-wide",
  heroContact: "sealed-stamped-driveway-stone-garage",
  heroFaq: "stamped-driveway-estate-garage-wide",
  heroResources: "rolling-sealer-stamped-flagstone-closeup",
  heroWarranty: "two-tone-stamped-driveway-sealed",
  process1: "pressure-washing-stamped-patio-before-sealing",
  process2: "pressure-washing-stamped-concrete-prep",
  process3: "back-rolling-solvent-sealer-stamped-concrete",
  process4: "applying-sealer-coloured-concrete-slab",
  matte: "exposed-aggregate-patio-steps-sealed",
  semiGloss: "sealed-stamped-patio-fence-london",
  gloss: "wet-look-gloss-stamped-driveway-woodstock",
  aggregateClose: "exposed-aggregate-closeup-sealed",
  aggregateDriveway: "exposed-aggregate-driveway-garage",
  broomDriveway: "broom-finish-driveway-front-view",
  curvedDriveway: "curved-broom-driveway-landscaped-home",
  longDriveway: "long-broom-driveway-country-home",
  colouredDriveway: "coloured-concrete-driveway-sealed-tan",
  stampedSteps: "stamped-porch-steps-sealed",
  patioBoulders: "stamped-patio-steps-boulders",
  patioBrick: "stamped-patio-sealed-brick-home",
  patioDeck: "stamped-patio-under-deck-sealed",
  sideWalkway: "stamped-side-yard-walkway",
  frontWalkway: "curved-front-walkway-broom-finish",
  ashlar: "ashlar-slate-stamped-patio-steps-sealed",
  greySatin: "grey-stamped-concrete-sealed-satin",
  cracked: "cracked-unsealed-driveway",
  sunset: "stamped-patio-sealed-at-sunset",
  wideLondon: "sealed-stamped-patio-wide-london",
  border: "driveway-with-stamped-border",
  autumn: "broom-driveway-ranch-home-autumn",
} as const;
