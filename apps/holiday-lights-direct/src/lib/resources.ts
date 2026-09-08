// Guides hub. Articles are JSON in src/content/resources and must be
// registered here; order within a category follows this list.
import type { ArticleBlock } from "@/components/article-body";
import spt1VsSpt2 from "@/content/resources/spt-1-vs-spt-2-wire-which-do-you-need.json";
import customRuns from "@/content/resources/how-to-make-custom-length-christmas-light-runs.json";
import ledVsIncandescent from "@/content/resources/c9-led-vs-incandescent-bulbs.json";
import clipsGuide from "@/content/resources/christmas-light-clips-guide-shingle-parapet-universal.json";
import diyKitInstall from "@/content/resources/how-to-install-a-permanent-led-lighting-kit-diy.json";
import powerInjection from "@/content/resources/power-injection-and-amplifiers-explained.json";
import measureRoofline from "@/content/resources/how-to-measure-your-roofline-for-lights.json";
import permanentVsSeasonal from "@/content/resources/permanent-vs-seasonal-christmas-lights-for-homeowners.json";
import whiteVsMulti from "@/content/resources/warm-white-vs-cool-white-vs-multicolour-c9.json";
import circuitLoad from "@/content/resources/how-many-christmas-lights-can-you-run-on-one-circuit.json";
import installBusiness from "@/content/resources/starting-a-christmas-light-installation-business.json";
import storage from "@/content/resources/storing-and-maintaining-led-christmas-lights.json";

export type { ArticleBlock };

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

export const articles: Article[] = [
  measureRoofline,
  circuitLoad,
  installBusiness,
  spt1VsSpt2,
  ledVsIncandescent,
  clipsGuide,
  whiteVsMulti,
  customRuns,
  storage,
  diyKitInstall,
  powerInjection,
  permanentVsSeasonal,
] as Article[];

export function getArticle(slug: string): Article | null {
  return articles.find((a) => a.slug === slug) ?? null;
}

export interface ArticleGroup {
  category: string;
  items: Article[];
}

const CATEGORY_ORDER = ["Planning", "Buying guides", "How-to", "Permanent lighting"];

export function getArticlesByCategory(): ArticleGroup[] {
  const groups: ArticleGroup[] = [];
  for (const article of articles) {
    let group = groups.find((g) => g.category === article.category);
    if (!group) {
      group = { category: article.category, items: [] };
      groups.push(group);
    }
    group.items.push(article);
  }
  return groups.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.filter((a) => a.slug !== slug).slice(0, limit);
  const same = articles.filter((a) => a.slug !== slug && a.category === current.category);
  const rest = articles.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

/** Lifestyle photo used for each category's cards and article headers. */
export const CATEGORY_PHOTO: Record<string, string> = {
  Planning: "home-wide-elevation",
  "Buying guides": "home-christmas-warm-white",
  "How-to": "detail-track-mounting",
  "Permanent lighting": "track-night-glow",
};
