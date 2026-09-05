import type { PhotoKey } from "@/lib/photos";

import choosingPowerSupply from "@/content/resources/choosing-led-power-supply-60w-150w-300w.json";
import diyVsPro from "@/content/resources/diy-vs-professional-permanent-lighting.json";
import howToInstall from "@/content/resources/how-to-install-permanent-soffit-lights.json";
import canadianWinter from "@/content/resources/permanent-lights-canadian-winter.json";
import costCanada from "@/content/resources/permanent-lights-cost-canada.json";
import vsChristmas from "@/content/resources/permanent-lights-vs-christmas-lights.json";
import canadaGuide from "@/content/resources/permanent-outdoor-lights-canada-guide.json";
import powerInjection from "@/content/resources/what-is-power-injection.json";
import soffitTypes from "@/content/resources/mounting-track-on-vinyl-aluminum-and-wood-soffits.json";
import commercial from "@/content/resources/permanent-lighting-for-commercial-buildings-and-storefronts.json";
import bylaws from "@/content/resources/hoa-condo-and-bylaw-rules-for-permanent-lights-in-ontario.json";
import zones from "@/content/resources/planning-zones-and-segments-for-permanent-lighting.json";
import wiring from "@/content/resources/wiring-layouts-single-run-t-branch-and-multi-zone.json";
import homeValue from "@/content/resources/does-permanent-lighting-add-home-value.json";

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "steps"; items: string[] };

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  updated: string;
  heroAlt: string;
  isHowTo: boolean;
  keyTakeaways: string[];
  body: ArticleBlock[];
  faq: ArticleFaq[];
}

/** Every article, newest first within the index. */
export const ARTICLES: Article[] = [
  canadaGuide,
  howToInstall,
  soffitTypes,
  wiring,
  costCanada,
  homeValue,
  diyVsPro,
  vsChristmas,
  canadianWinter,
  bylaws,
  commercial,
  powerInjection,
  choosingPowerSupply,
  zones
] as unknown as Article[];

export const CATEGORY_ORDER: string[] = ["Guides", "How-to", "Costs", "Comparisons", "Parts & specs"];

const HERO_PHOTOS: Record<string, PhotoKey> = {
  "how-to-install-permanent-soffit-lights": "detail-track-install",
  "permanent-outdoor-lights-canada-guide": "home-night-lit",
  "permanent-lights-cost-canada": "home-wide",
  "diy-vs-professional-permanent-lighting": "home-install",
  "permanent-lights-vs-christmas-lights": "scene-red",
  "permanent-lights-canadian-winter": "home-elevation-blue",
  "what-is-power-injection": "detail-pucks",
  "choosing-led-power-supply-60w-150w-300w": "track-night",
  "mounting-track-on-vinyl-aluminum-and-wood-soffits": "soffit-lights-installed",
  "permanent-lighting-for-commercial-buildings-and-storefronts": "home-red-canada-day",
  "hoa-condo-and-bylaw-rules-for-permanent-lights-in-ontario": "home-daytime-hidden",
  "planning-zones-and-segments-for-permanent-lighting": "home-blue-app-control",
  "wiring-layouts-single-run-t-branch-and-multi-zone": "soffit-lights-day",
  "does-permanent-lighting-add-home-value": "home-example-warm-white"
};

export function heroPhotoFor(slug: string): PhotoKey {
  return HERO_PHOTOS[slug] ?? "home-night-lit";
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getByCategory(): { category: string; articles: Article[] }[] {
  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));
  categories.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  return categories.map((category) => ({ category, articles: ARTICLES.filter((a) => a.category === category) }));
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, limit);
  const same = ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export const ALL_ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
