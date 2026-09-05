import { PICKS } from "@/lib/photos";
import expect from "@/content/resources/what-to-expect-from-a-professional-christmas-light-install-in-waterloo-region.json";
import pricing from "@/content/resources/how-christmas-light-installers-price-a-home-in-kitchener-waterloo.json";
import ledVsInc from "@/content/resources/led-vs-incandescent-christmas-lights-for-ontario-winters.json";
import commercial from "@/content/resources/commercial-christmas-lighting-ideas-for-kitchener-waterloo-businesses.json";
import rental from "@/content/resources/christmas-light-rental-vs-buying-for-bias-municipalities-and-events.json";
import prepare from "@/content/resources/how-to-prepare-your-home-for-a-christmas-light-install.json";
import garland from "@/content/resources/garland-wreaths-and-bows-front-entrance-decorating-ideas.json";
import trees from "@/content/resources/wrapping-trees-with-lights-in-waterloo-region-maples-spruces-and-birches.json";

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] };

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
  keyTakeaways: string[];
  body: ArticleBlock[];
  faq: { q: string; a: string }[];
}

export const ARTICLES: Article[] = [expect, pricing, prepare, ledVsInc, garland, trees, commercial, rental] as Article[];

const CATEGORY_ORDER = ["Planning", "Costs", "Design", "Commercial"];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug) ?? null;

export function getByCategory(): { category: string; items: Article[] }[] {
  const groups: { category: string; items: Article[] }[] = [];
  for (const a of ARTICLES) {
    let g = groups.find((x) => x.category === a.category);
    if (!g) groups.push((g = { category: a.category, items: [] }));
    g.items.push(a);
  }
  return groups.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
}

export function getRelated(slug: string, limit = 3): Article[] {
  const cur = getArticle(slug);
  const same = ARTICLES.filter((a) => a.slug !== slug && a.category === cur?.category);
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.category !== cur?.category);
  return [...same, ...rest].slice(0, limit);
}

const ARTICLE_PHOTO: Record<string, string> = {
  "what-to-expect-from-a-professional-christmas-light-install-in-waterloo-region": PICKS.install1,
  "how-christmas-light-installers-price-a-home-in-kitchener-waterloo": PICKS.heroHomes,
  "led-vs-incandescent-christmas-lights-for-ontario-winters": PICKS.heroInstall,
  "commercial-christmas-lighting-ideas-for-kitchener-waterloo-businesses": PICKS.office,
  "christmas-light-rental-vs-buying-for-bias-municipalities-and-events": PICKS.heroRental,
  "how-to-prepare-your-home-for-a-christmas-light-install": PICKS.install2,
  "garland-wreaths-and-bows-front-entrance-decorating-ideas": PICKS.wreath,
  "wrapping-trees-with-lights-in-waterloo-region-maples-spruces-and-birches": PICKS.heroTree,
};
export const articlePhoto = (slug: string) => ARTICLE_PHOTO[slug] ?? PICKS.heroResources;
