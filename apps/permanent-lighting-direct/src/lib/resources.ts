// Guides hub. Articles are JSON in src/content/resources and must be registered here.
import type { ArticleBlock } from "@/components/article-body";
import type { PhotoKey } from "@/lib/photos";
import measure from "@/content/resources/how-to-measure-your-roofline-for-permanent-lighting.json";
import cost from "@/content/resources/permanent-lighting-cost-in-canada-diy-vs-professional.json";
import install from "@/content/resources/how-to-install-permanent-led-lights-on-your-soffit.json";
import power from "@/content/resources/12v-power-supplies-and-power-injection-for-permanent-lights.json";
import wled from "@/content/resources/wled-controller-setup-guide-for-permanent-lights.json";
import trackColour from "@/content/resources/choosing-a-track-colour-to-match-your-soffit.json";
import permVsSeasonal from "@/content/resources/permanent-vs-seasonal-christmas-lights.json";
import colourIdeas from "@/content/resources/permanent-lighting-colour-ideas-for-every-holiday.json";
import winters from "@/content/resources/do-permanent-lights-work-in-canadian-winters.json";
import brands from "@/content/resources/permanent-holiday-lighting-brands-compared.json";
import rgbw from "@/content/resources/rgbw-vs-rgb-permanent-lights.json";
import troubleshooting from "@/content/resources/troubleshooting-permanent-led-lights.json";

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
  measure,
  cost,
  winters,
  brands,
  permVsSeasonal,
  trackColour,
  rgbw,
  install,
  power,
  wled,
  troubleshooting,
  colourIdeas
] as Article[];

export const getArticle = (slug: string): Article | null => articles.find((a) => a.slug === slug) ?? null;

export interface ArticleGroup {
  category: string;
  items: Article[];
}

const CATEGORY_ORDER = ["Planning", "Buying guides", "How-to", "Inspiration"];

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

/** Hero photo per article (falls back to the category photo). */
const ARTICLE_PHOTO: Record<string, PhotoKey> = {
  "how-to-measure-your-roofline-for-permanent-lighting": "home-daytime-hidden",
  "permanent-lighting-cost-in-canada-diy-vs-professional": "home-example-warm-white",
  "how-to-install-permanent-led-lights-on-your-soffit": "install-track-mounting",
  "12v-power-supplies-and-power-injection-for-permanent-lights": "detail-pucks-closeup",
  "wled-controller-setup-guide-for-permanent-lights": "home-blue-app-control",
  "choosing-a-track-colour-to-match-your-soffit": "detail-tracks",
  "permanent-vs-seasonal-christmas-lights": "home-warm-white-christmas",
  "permanent-lighting-colour-ideas-for-every-holiday": "track-four-seasons",
  "do-permanent-lights-work-in-canadian-winters": "home-cottage-evening",
  "permanent-holiday-lighting-brands-compared": "home-example-multicolour",
  "rgbw-vs-rgb-permanent-lights": "home-warm-white-twilight",
  "troubleshooting-permanent-led-lights": "soffit-lights-day"
};
export const CATEGORY_PHOTO: Record<string, PhotoKey> = {
  Planning: "home-daytime-hidden",
  "Buying guides": "home-blue-night",
  "How-to": "install-track-mounting",
  Inspiration: "hero-multicolour-wide"
};
export const articlePhoto = (a: Pick<Article, "slug" | "category">): PhotoKey =>
  ARTICLE_PHOTO[a.slug] ?? CATEGORY_PHOTO[a.category] ?? "home-blue-night";
