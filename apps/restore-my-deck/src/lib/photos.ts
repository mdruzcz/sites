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
export const hasPhoto = (k: string) => byKey.has(k);
export const photosByCategory = (cat: string) => all.filter((p) => p.category === cat);
export const ALL_PHOTOS = all;

export const BEFORE_AFTER: { before: string; after: string; title: string; city: string }[] = [
  { before: "deck-before-staining-black-railing", after: "deck-after-staining-black-railing", title: "Deck with black railing", city: "Kitchener" },
  { before: "raised-deck-before-staining", after: "raised-deck-after-staining", title: "Raised deck and stairs", city: "Waterloo" },
  { before: "deck-restoration-before-washing", after: "deck-restoration-after-washing-black-railing", title: "Grey deck, washed and prepped", city: "Cambridge" },
];

export const PICKS = {
  heroHome: "team-deck-planters-brick-home",
  heroServices: "hero-deck-work-wide",
  heroRestoration: "after-deck-cleaning-and-staining",
  heroStaining: "hero-deck-staining-brick-two-storey",
  heroCleaning: "deck-cleaning-in-progress",
  heroPowerWashing: "hero-power-washing-deck-boards",
  heroSealing: "stained-deck-boards-grain-closeup",
  heroSanding: "technician-sanding-deck-railing",
  heroRepair: "deck12-stairs-brick-home",
  heroRebuilding: "deck-1-stairs-white-house",
  heroFenceCleaning: "fence-pressure-washing-privacy-screen",
  heroFenceStaining: "fence-staining-lattice-top",
  heroFencePainting: "fence-stained-panels-backyard",
  heroPressureHub: "pressure-washing-deck-surface",
  heroSealingHub: "cedar-deck-staining-brick-home",
  heroAreas: "covered-deck-brick-home-banner",
  heroAbout: "technician-sanding-deck-railing",
  heroProjects: "hot-tub-deck-steps-stained",
  heroBlog: "sealing-deck-boards-roller",
  heroContact: "deck-skirting-stained-red-brown",
  heroCity: "after-deck-cleaning-and-staining",
  kitchener: "deck-restoration-cedar-under-deck-kitchener",
  waterloo: "backyard-deck-stained-brown-waterloo",
  cambridge: "deck-after-cleaning-brick-home",
  guelph: "raised-deck-white-railings-stained",
  hamilton: "drc7-deck-stairs-railing",
  stratford: "covered-deck-stained-after-washing",
  woodstock: "deck-refinishing-stained-honey",
  fergus: "hot-tub-deck-steps-stained",
  paris: "deck-lattice-garden-stained",
  pergola: "pergola-deck-stained-cedar-tone",
  pergolaWide: "pergola-and-deck-restored-wide",
  stairs: "deck-stairs-and-landing-freshly-stained",
  fenceCedar: "cedar-fence-stained-vertical-boards",
  fenceProject: "fence-project-cedar-privacy",
  fenceSplit: "fence-before-after-cleaning-split",
  sideFence: "side-yard-fence-and-deck-stained",
  lakeside: "elevated-deck-lakeside-restored",
  closeupWash: "power-washing-deck-boards-closeup",
  refinish: "deck-refinish-after-washing",
  coveredWide: "covered-deck-stained-wide",
  fenceBoards: "hero-fence-boards-stained",
  stepsBeforeAfter: "deck-before-after-steps",
} as const;
