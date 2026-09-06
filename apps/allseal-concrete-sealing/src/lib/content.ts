import fs from "fs";
import path from "path";
import { PICKS, CITY_PHOTO } from "@/lib/photos";
import testimonialsData from "@/content/testimonials.json";

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] };

export interface ServiceContent {
  slug: string;
  title: string;
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
  recommendedSheen: "High Gloss" | "Semi-Gloss" | "Matte";
  sheenWhy: string;
  cityBlurb: string;
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

export type Testimonial = (typeof testimonialsData)[number];
export const getTestimonials = () => testimonialsData;

function load<T>(dir: string): T[] {
  const full = path.join(process.cwd(), "src/content", dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T);
}

const SERVICE_ORDER = ["driveway-sealing", "patio-sealing", "stamped-concrete-sealing", "decorative-concrete-sealing", "walkway-sealing", "pool-deck-sealing", "garage-floor-sealing"];
const CITY_ORDER = ["woodstock", "st-thomas", "brantford", "hamilton", "kitchener-waterloo", "cambridge"];
const GUIDE_ORDER = [
  "high-gloss-vs-semi-gloss-vs-matte-which-sheen-for-your-concrete",
  "what-affects-the-cost-of-concrete-sealing-in-southwestern-ontario",
  "how-long-does-concrete-sealer-last-in-ontario",
  "fall-concrete-sealing-checklist-before-the-first-salt",
  "acrylic-vs-polyurethane-vs-penetrating-concrete-sealers",
  "can-you-seal-over-previously-sealed-concrete",
  "restoring-faded-stamped-concrete-colour-with-sealer",
  "anti-slip-additives-for-sealed-concrete-steps-pools-and-walkways",
  "sealing-a-garage-floor-hot-tire-pickup-salt-and-oil",
  "pool-deck-sealing-chlorine-sun-and-slip-resistance",
];
const orderBy = <T extends { slug: string }>(items: T[], order: string[]) => [...items].sort((a, b) => (order.indexOf(a.slug) === -1 ? 99 : order.indexOf(a.slug)) - (order.indexOf(b.slug) === -1 ? 99 : order.indexOf(b.slug)));

let _s: ServiceContent[] | null = null;
let _c: CityContent[] | null = null;
let _g: Guide[] | null = null;
export const getServices = () => (_s ??= orderBy(load<ServiceContent>("services"), SERVICE_ORDER));
export const getCities = () => (_c ??= orderBy(load<CityContent>("cities"), CITY_ORDER));
export const getGuides = () => (_g ??= orderBy(load<Guide>("guides"), GUIDE_ORDER));
export const getService = (slug: string) => getServices().find((s) => s.slug === slug) ?? null;
export const getCity = (slug: string) => getCities().find((c) => c.slug === slug) ?? null;
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug) ?? null;

const SERVICE_PHOTO: Record<string, string> = {
  "driveway-sealing": PICKS.driveway,
  "patio-sealing": PICKS.patio,
  "garage-floor-sealing": PICKS.garage,
  "pool-deck-sealing": PICKS.pool,
  "walkway-sealing": PICKS.walkway,
  "decorative-concrete-sealing": PICKS.decorative,
  "stamped-concrete-sealing": PICKS.stamped,
};
export const servicePhoto = (slug: string) => SERVICE_PHOTO[slug] ?? PICKS.heroServices;

const SERVICE_SETS: Record<string, string[]> = {
  "driveway-sealing": [PICKS.driveway, PICKS.estate, PICKS.border, PICKS.longDrive],
  "patio-sealing": [PICKS.patio, PICKS.wide, PICKS.boulders, PICKS.sunset],
  "garage-floor-sealing": [PICKS.garage, PICKS.broom, PICKS.twoStorey, PICKS.aggregateDrive],
  "pool-deck-sealing": [PICKS.pool, PICKS.patioBrick, PICKS.boulders, PICKS.steps],
  "walkway-sealing": [PICKS.walkway, PICKS.frontWalk, PICKS.steps, PICKS.sideWalk],
  "decorative-concrete-sealing": [PICKS.decorative, PICKS.aggregateDrive, PICKS.pool, PICKS.garage],
  "stamped-concrete-sealing": [PICKS.stamped, PICKS.ashlar, PICKS.wide, PICKS.driveway],
};
export const servicePhotos = (slug: string) => SERVICE_SETS[slug] ?? [PICKS.heroServices, PICKS.patio, PICKS.walkway, PICKS.stamped];
export const cityPhoto = (slug: string) => CITY_PHOTO[slug] ?? PICKS.areas;

const GUIDE_PHOTO: Record<string, string> = {
  "high-gloss-vs-semi-gloss-vs-matte-which-sheen-for-your-concrete": PICKS.gloss,
  "what-affects-the-cost-of-concrete-sealing-in-southwestern-ontario": PICKS.estate,
  "how-long-does-concrete-sealer-last-in-ontario": PICKS.contact,
  "fall-concrete-sealing-checklist-before-the-first-salt": PICKS.autumn,
  "acrylic-vs-polyurethane-vs-penetrating-concrete-sealers": PICKS.process3,
  "can-you-seal-over-previously-sealed-concrete": PICKS.process4,
  "restoring-faded-stamped-concrete-colour-with-sealer": PICKS.stamped,
  "anti-slip-additives-for-sealed-concrete-steps-pools-and-walkways": PICKS.steps,
  "sealing-a-garage-floor-hot-tire-pickup-salt-and-oil": PICKS.garage,
  "pool-deck-sealing-chlorine-sun-and-slip-resistance": PICKS.pool,
};
export const guidePhoto = (slug: string) => GUIDE_PHOTO[slug] ?? PICKS.resources;

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const cur = getGuide(slug);
  const same = getGuides().filter((a) => a.slug !== slug && a.category === cur?.category);
  const rest = getGuides().filter((a) => a.slug !== slug && a.category !== cur?.category);
  return [...same, ...rest].slice(0, limit);
}

export const SHEENS = [
  { key: "High Gloss", short: "Wet look, maximum colour", photo: PICKS.gloss, blurb: "The mirror finish most people picture when they think of freshly sealed stamped concrete. Deepest colour enhancement, biggest impact from the street. Add anti-slip around pools and on steps.", bestFor: ["Stamped driveways and patios", "Coloured and stained concrete", "Showcase entrances"] },
  { key: "Semi-Gloss", short: "Satin, our most requested", photo: PICKS.semi, blurb: "Brings out pattern and colour with a soft satin sheen that hides dust and tire marks better than gloss. The default recommendation for stamped and decorative surfaces.", bestFor: ["Stamped and decorative patios", "Front walkways and porches", "Driveways with coloured borders"] },
  { key: "Matte", short: "Natural, no shine", photo: PICKS.matte, blurb: "Full protection with no reflection. The surface keeps its natural look and texture, which makes matte the pick for broom-finish driveways, garage floors, exposed aggregate and anywhere grip matters.", bestFor: ["Broom-finish driveways and garage floors", "Exposed aggregate", "Pool decks and steps"] },
] as const;
