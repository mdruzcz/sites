// Guides hub. Articles are JSON in src/content/resources and must be
// registered here; order within a category follows this list.
import type { ArticleBlock } from "@/components/article-body";
import budget from "@/content/resources/commercial-christmas-decoration-budget-planning-guide.json";
import bia from "@/content/resources/bia-downtown-holiday-lighting-guide.json";
import mall from "@/content/resources/shopping-mall-christmas-decor-checklist.json";
import municipal from "@/content/resources/municipal-holiday-lighting-procurement-guide.json";
import c9 from "@/content/resources/c9-led-christmas-lights-commercial-buying-guide.json";
import gradeVsRetail from "@/content/resources/commercial-grade-vs-retail-christmas-lights.json";
import displays3d from "@/content/resources/3d-led-christmas-light-displays-buying-guide.json";
import wreaths from "@/content/resources/commercial-wreaths-garland-bows-sizing-guide.json";
import treeWrap from "@/content/resources/how-to-wrap-trees-with-christmas-lights-commercial.json";
import power from "@/content/resources/power-planning-for-large-holiday-light-displays.json";
import permanent from "@/content/resources/permanent-led-lighting-for-commercial-buildings.json";

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

export const articles: Article[] = [budget, bia, mall, municipal, c9, gradeVsRetail, displays3d, wreaths, treeWrap, power, permanent] as Article[];

export function getArticle(slug: string): Article | null {
  return articles.find((a) => a.slug === slug) ?? null;
}

export interface ArticleGroup {
  category: string;
  items: Article[];
}

const CATEGORY_ORDER = ["Commercial planning", "Buying guides", "How-to", "Permanent lighting"];

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

/** Editorial photo per article (falls back to the category photo). */
export const ARTICLE_PHOTO: Record<string, string> = {
  "commercial-christmas-decoration-budget-planning-guide": "plaza-tree",
  "bia-downtown-holiday-lighting-guide": "downtown-street-trees",
  "shopping-mall-christmas-decor-checklist": "mall-red-tree",
  "municipal-holiday-lighting-procurement-guide": "town-square",
  "c9-led-christmas-lights-commercial-buying-guide": "commercial-roofline",
  "commercial-grade-vs-retail-christmas-lights": "office-tower-entrance",
  "3d-led-christmas-light-displays-buying-guide": "golden-cone-tree",
  "commercial-wreaths-garland-bows-sizing-guide": "lobby-potted-trees",
  "how-to-wrap-trees-with-christmas-lights-commercial": "town-park-trees",
  "power-planning-for-large-holiday-light-displays": "boulevard-cone-trees",
  "permanent-led-lighting-for-commercial-buildings": "mansion-roofline"
};

export const CATEGORY_PHOTO: Record<string, string> = {
  "Commercial planning": "plaza-tree-night",
  "Buying guides": "commercial-roofline",
  "How-to": "town-park-trees",
  "Permanent lighting": "estate-roofline"
};

export function articlePhoto(a: Pick<Article, "slug" | "category">) {
  return ARTICLE_PHOTO[a.slug] ?? CATEGORY_PHOTO[a.category] ?? "plaza-tree";
}
