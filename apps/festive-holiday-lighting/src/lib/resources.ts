import { PICKS } from "@/lib/photos";
import cost from "@/content/resources/how-much-does-professional-christmas-light-installation-cost-in-ontario.json";
import booking from "@/content/resources/when-to-book-christmas-light-installation.json";
import bulbs from "@/content/resources/c9-bulbs-vs-mini-lights-vs-icicles-choosing-a-look.json";
import permVsSeasonal from "@/content/resources/permanent-vs-seasonal-christmas-lights-southern-ontario.json";
import commercial from "@/content/resources/commercial-holiday-lighting-for-storefronts-plazas-and-hotels.json";
import municipal from "@/content/resources/municipal-and-bia-holiday-lighting-programs.json";
import treeWrap from "@/content/resources/how-professionals-wrap-trees-with-christmas-lights.json";
import safety from "@/content/resources/christmas-light-safety-why-insured-installers-matter.json";
import brick from "@/content/resources/holiday-lighting-design-ideas-for-brick-and-stone-homes.json";
import afterSeason from "@/content/resources/what-happens-after-the-season-takedown-storage-and-next-year.json";
import colours from "@/content/resources/warm-white-vs-multicolour-vs-rgb-picking-a-colour-scheme.json";

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

export const ARTICLES: Article[] = [cost, booking, permVsSeasonal, bulbs, colours, brick, treeWrap, safety, afterSeason, commercial, municipal] as Article[];

const CATEGORY_ORDER = ["Planning", "Costs", "Comparisons", "Design", "Commercial"];

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
  "how-much-does-professional-christmas-light-installation-cost-in-ontario": PICKS.heroResidential,
  "when-to-book-christmas-light-installation": PICKS.install1,
  "c9-bulbs-vs-mini-lights-vs-icicles-choosing-a-look": PICKS.heroClassic,
  "permanent-vs-seasonal-christmas-lights-southern-ontario": PICKS.heroPermanent,
  "commercial-holiday-lighting-for-storefronts-plazas-and-hotels": PICKS.heroCommercial,
  "municipal-and-bia-holiday-lighting-programs": PICKS.heroMunicipal,
  "how-professionals-wrap-trees-with-christmas-lights": PICKS.treeWrap,
  "christmas-light-safety-why-insured-installers-matter": PICKS.install2,
  "holiday-lighting-design-ideas-for-brick-and-stone-homes": PICKS.heroGallery,
  "what-happens-after-the-season-takedown-storage-and-next-year": PICKS.heroAreas,
  "warm-white-vs-multicolour-vs-rgb-picking-a-colour-scheme": PICKS.heroPermanentBlue,
};
export const articlePhoto = (slug: string) => ARTICLE_PHOTO[slug] ?? PICKS.heroResources;
