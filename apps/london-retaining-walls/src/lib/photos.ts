import galleryData from "@/content/gallery.json";

export interface Photo {
  image: string;
  alt: string;
  material: string;
  category: string;
  quality?: number;
  width: number;
  height: number;
  blurDataURL: string;
}

export const gallery = galleryData as Photo[];
const byName = new Map(gallery.map((p) => [p.image.split("/").pop() as string, p]));
export const photo = (file: string): Photo => {
  const p = byName.get(file);
  if (!p) throw new Error(`Unknown photo ${file}`);
  return p;
};

/** Hand-picked hero and feature photos (finished, well-lit, no people in the frame). */
export const PICKS = {
  home: photo("long-terraced-timber-retaining-wall-01.jpg"),
  homeCard: photo("curved-segmental-block-retaining-wall-front-yard-garden-01.jpg"),
  homeAlt: photo("sweeping-stacked-block-garden-wall-with-lawn-01.jpg"),
  homeTerrace: photo("long-terraced-timber-retaining-wall-01.jpg"),
  about: photo("terraced-timber-retaining-wall-seating-area-01.jpg"),
  contact: photo("timber-retaining-wall-with-garden-steps-01.jpg"),
  gallery: photo("cedar-plank-retaining-wall-boulder-base-01.jpg"),
  areas: photo("timber-retaining-wall-along-grassy-slope-01.jpg"),
  resources: photo("timber-retaining-wall-drainage-fabric-install-01.jpg"),
  services: photo("parged-concrete-retaining-wall-with-steps-01.jpg"),
  block: photo("curved-stacked-block-garden-retaining-wall-01.jpg"),
  concrete: photo("poured-concrete-retaining-wall-and-staircase-01.jpg"),
  timber: photo("finished-timber-retaining-wall-with-railing-01.jpg"),
  stone: photo("tall-natural-stone-retaining-wall-poolside-01.jpg"),
  boulder: photo("boulder-retaining-wall-poolside-cedar-garden-01.jpg"),
  terrace: photo("tiered-timber-retaining-wall-holding-soil-01.jpg"),
  repair: photo("collapsing-segmental-block-retaining-wall-01.jpg"),
  repairInspect: photo("segmental-block-retaining-wall-repair-assessment-01.jpg"),
  repairOvergrown: photo("overgrown-timber-retaining-wall-before-restoration-01.jpg"),
  repairWeathered: photo("weathered-timber-tie-retaining-wall-with-steps-01.jpg"),
  drainage: photo("timber-retaining-wall-drainage-detail-closeup-01.jpg"),
  drainageFabric: photo("timber-retaining-wall-construction-with-drainage-fabric-01.jpg"),
  tieback: photo("timber-tie-retaining-wall-construction-01.jpg"),
  blockBase: photo("segmental-block-retaining-wall-tiered-install-01.jpg"),
  steps: photo("timber-retaining-wall-beside-hillside-steps-01.jpg"),
  sideyard: photo("wood-timber-retaining-wall-side-yard-01.jpg"),
  curve: photo("timber-retaining-wall-curving-along-lawn-01.jpg"),
  raisedBed: photo("timber-retaining-wall-raised-garden-bed-01.jpg"),
  cedarPool: photo("cedar-plank-retaining-wall-pool-deck-01.jpg"),
  stackedBed: photo("stacked-block-raised-garden-bed-retaining-wall-01.jpg"),
};

export const HERO_BY_MATERIAL: Record<string, Photo> = {
  "segmental-block": PICKS.block,
  timber: PICKS.timber,
  "poured-concrete": PICKS.concrete,
  "natural-stone": PICKS.stone,
  "armour-stone": PICKS.boulder,
  repair: PICKS.repair,
  mixed: PICKS.homeAlt,
};

export const SERVICE_HERO: Record<string, Photo> = {
  "retaining-wall-installation": PICKS.homeAlt,
  "block-retaining-walls": PICKS.block,
  "concrete-retaining-walls": PICKS.concrete,
  "wood-and-timber-retaining-walls": PICKS.timber,
  "natural-stone-retaining-walls": PICKS.stone,
  "terraced-retaining-walls": PICKS.terrace,
  "retaining-wall-repair": PICKS.repair,
};

const CITY_ROTATION = [PICKS.homeCard, PICKS.timber, PICKS.homeTerrace, PICKS.concrete, PICKS.curve, PICKS.block, PICKS.steps, PICKS.stone, PICKS.cedarPool, PICKS.sideyard, PICKS.raisedBed, PICKS.boulder];
export const cityPhoto = (index: number) => CITY_ROTATION[index % CITY_ROTATION.length];

/** Finished-wall photos of a material, best quality first. */
export function finished(material: string | string[], n = 6, exclude: Photo[] = []): Photo[] {
  const mats = Array.isArray(material) ? material : [material];
  const ex = new Set(exclude.map((p) => p.image));
  return gallery
    .filter((p) => mats.includes(p.material) && p.category === "retaining-wall" && !ex.has(p.image))
    .sort((a, b) => (b.quality ?? 3) - (a.quality ?? 3))
    .slice(0, n);
}
export const construction = (n = 6) => gallery.filter((p) => p.category === "construction").slice(0, n);
export const repairs = (n = 6) => gallery.filter((p) => p.category === "repair").slice(0, n);
export const MATERIAL_LABEL: Record<string, string> = {
  "segmental-block": "Interlocking block",
  timber: "Timber",
  "poured-concrete": "Poured concrete",
  "natural-stone": "Natural stone",
  "armour-stone": "Armour stone",
  boulder: "Boulder",
  mixed: "Mixed materials",
};
