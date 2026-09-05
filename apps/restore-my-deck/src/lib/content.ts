import fs from "fs";
import path from "path";
import { PICKS } from "@/lib/photos";

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] };

export interface ServiceContent {
  slug: string;
  title: string;
  category: "pressure-washing" | "sealing" | "repair";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  excerpt: string;
  keyPoints: string[];
  included: { title: string; body: string }[];
  body: Block[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export interface CityContent {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  neighbourhoods: string[];
  localFact: string;
  body: Block[];
  faqs: { q: string; a: string }[];
  nearby: string[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  updated: string;
  heroAlt: string;
  keyTakeaways: string[];
  body: Block[];
  faq: { q: string; a: string }[];
}

function load<T>(dir: string): T[] {
  const full = path.join(process.cwd(), "src/content", dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T);
}

const SERVICE_ORDER = ["deck-restoration", "deck-staining", "deck-cleaning", "deck-power-washing", "deck-sealing", "deck-sanding", "deck-repair-and-maintenance", "deck-rebuilding", "fence-cleaning", "fence-staining", "fence-painting", "pressure-washing-services", "sealing-services"];
const CITY_ORDER = ["kitchener-deck-fence-staining", "waterloo-deck-fence-staining", "cambridge-deck-staining", "guelph-deck-fence-staining", "hamilton-deck-fence-staining", "stratford-deck-staining", "woodstock-deck-staining", "fergus-deck-staining", "paris-deck-staining"];
const GUIDE_ORDER = [
  "how-much-does-deck-staining-cost-in-kitchener-waterloo",
  "how-often-should-you-restain-your-deck",
  "best-time-of-year-to-stain-a-deck-in-ontario",
  "oil-based-vs-water-based-deck-stain",
  "semi-transparent-vs-semi-solid-vs-solid-deck-stain",
  "cedar-vs-pressure-treated-decks-how-staining-differs",
  "how-to-prepare-your-deck-for-staining",
  "pressure-washing-vs-soft-washing-deck",
  "5-signs-your-deck-needs-restoration",
  "how-to-save-money-restore-dont-replace",
  "how-to-maintain-a-stained-deck-between-restorations",
  "fence-staining-vs-fence-painting-which-lasts-longer",
];
const orderBy = <T extends { slug: string }>(items: T[], order: string[]) => [...items].sort((a, b) => (order.indexOf(a.slug) === -1 ? 99 : order.indexOf(a.slug)) - (order.indexOf(b.slug) === -1 ? 99 : order.indexOf(b.slug)));

let _services: ServiceContent[] | null = null;
let _cities: CityContent[] | null = null;
let _guides: Guide[] | null = null;

export const getServices = () => (_services ??= orderBy(load<ServiceContent>("services"), SERVICE_ORDER));
export const getCities = () => (_cities ??= orderBy(load<CityContent>("cities"), CITY_ORDER));
export const getGuides = () => (_guides ??= orderBy(load<Guide>("guides"), GUIDE_ORDER));
export const getService = (slug: string) => getServices().find((s) => s.slug === slug) ?? null;
export const getCity = (slug: string) => getCities().find((c) => c.slug === slug) ?? null;
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug) ?? null;
/** Primary (non-hub) services for menus and grids. */
export const getCoreServices = () => getServices().filter((s) => !["pressure-washing-services", "sealing-services"].includes(s.slug));

const SERVICE_PHOTO: Record<string, string> = {
  "deck-restoration": PICKS.heroRestoration,
  "deck-staining": PICKS.heroStaining,
  "deck-cleaning": PICKS.heroCleaning,
  "deck-power-washing": PICKS.heroPowerWashing,
  "deck-sealing": PICKS.heroSealing,
  "deck-sanding": PICKS.heroSanding,
  "deck-repair-and-maintenance": PICKS.heroRepair,
  "deck-rebuilding": PICKS.heroRebuilding,
  "fence-cleaning": PICKS.heroFenceCleaning,
  "fence-staining": PICKS.heroFenceStaining,
  "fence-painting": PICKS.heroFencePainting,
  "pressure-washing-services": PICKS.heroPressureHub,
  "sealing-services": PICKS.heroSealingHub,
};
export const servicePhoto = (slug: string) => SERVICE_PHOTO[slug] ?? PICKS.heroServices;

const SERVICE_PHOTO_SETS: Record<string, string[]> = {
  "deck-restoration": [PICKS.heroRestoration, PICKS.stepsBeforeAfter, PICKS.refinish, PICKS.lakeside],
  "deck-staining": [PICKS.heroStaining, PICKS.stairs, PICKS.pergola, PICKS.waterloo],
  "deck-cleaning": [PICKS.heroCleaning, PICKS.cambridge, PICKS.closeupWash, PICKS.refinish],
  "deck-power-washing": [PICKS.heroPowerWashing, PICKS.closeupWash, PICKS.heroCleaning, PICKS.refinish],
  "deck-sealing": [PICKS.heroSealing, PICKS.heroBlog, PICKS.coveredWide, PICKS.stratford],
  "deck-sanding": [PICKS.heroSanding, PICKS.heroSealing, PICKS.stairs, PICKS.kitchener],
  "deck-repair-and-maintenance": [PICKS.heroRepair, PICKS.hamilton, PICKS.guelph, PICKS.stairs],
  "deck-rebuilding": [PICKS.heroRebuilding, PICKS.pergolaWide, PICKS.fergus, PICKS.heroProjects],
  "fence-cleaning": [PICKS.heroFenceCleaning, PICKS.fenceSplit, PICKS.sideFence, PICKS.fenceBoards],
  "fence-staining": [PICKS.heroFenceStaining, PICKS.fenceCedar, PICKS.fenceProject, PICKS.fenceBoards],
  "fence-painting": [PICKS.heroFencePainting, PICKS.fenceCedar, PICKS.sideFence, PICKS.fenceProject],
  "pressure-washing-services": [PICKS.heroPressureHub, PICKS.heroCleaning, PICKS.fenceSplit, PICKS.closeupWash],
  "sealing-services": [PICKS.heroSealingHub, PICKS.heroStaining, PICKS.fenceCedar, PICKS.pergola],
};
export const servicePhotos = (slug: string) => SERVICE_PHOTO_SETS[slug] ?? [PICKS.heroServices, PICKS.pergola, PICKS.stairs, PICKS.fenceCedar];

const CITY_PHOTO: Record<string, string> = {
  "kitchener-deck-fence-staining": PICKS.kitchener,
  "waterloo-deck-fence-staining": PICKS.waterloo,
  "cambridge-deck-staining": PICKS.cambridge,
  "guelph-deck-fence-staining": PICKS.guelph,
  "hamilton-deck-fence-staining": PICKS.hamilton,
  "stratford-deck-staining": PICKS.stratford,
  "woodstock-deck-staining": PICKS.woodstock,
  "fergus-deck-staining": PICKS.fergus,
  "paris-deck-staining": PICKS.paris,
};
export const cityPhoto = (slug: string) => CITY_PHOTO[slug] ?? PICKS.heroCity;

const GUIDE_PHOTO: Record<string, string> = {
  "how-much-does-deck-staining-cost-in-kitchener-waterloo": PICKS.heroStaining,
  "how-often-should-you-restain-your-deck": PICKS.stairs,
  "best-time-of-year-to-stain-a-deck-in-ontario": PICKS.heroProjects,
  "oil-based-vs-water-based-deck-stain": PICKS.heroSealing,
  "semi-transparent-vs-semi-solid-vs-solid-deck-stain": PICKS.pergola,
  "cedar-vs-pressure-treated-decks-how-staining-differs": PICKS.kitchener,
  "how-to-prepare-your-deck-for-staining": PICKS.heroSanding,
  "pressure-washing-vs-soft-washing-deck": PICKS.heroPowerWashing,
  "5-signs-your-deck-needs-restoration": PICKS.heroRestoration,
  "how-to-save-money-restore-dont-replace": PICKS.stepsBeforeAfter,
  "how-to-maintain-a-stained-deck-between-restorations": PICKS.coveredWide,
  "fence-staining-vs-fence-painting-which-lasts-longer": PICKS.heroFenceStaining,
};
export const guidePhoto = (slug: string) => GUIDE_PHOTO[slug] ?? PICKS.heroBlog;

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const cur = getGuide(slug);
  const same = getGuides().filter((a) => a.slug !== slug && a.category === cur?.category);
  const rest = getGuides().filter((a) => a.slug !== slug && a.category !== cur?.category);
  return [...same, ...rest].slice(0, limit);
}
