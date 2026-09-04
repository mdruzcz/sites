// Resource-hub article loader.
// Articles live as JSON in src/content/resources/. Each new article must be
// imported explicitly here and added to the `articles` index array below.

import type { ArticleBlock } from '@/components/ArticleBody';
import arePermanentChristmasLightsWorthIt from '@/content/resources/are-permanent-christmas-lights-worth-it.json';
import howPermanentLedLightingWorks from '@/content/resources/how-permanent-led-lighting-works.json';
import permanentChristmasLightsCostOntario from '@/content/resources/permanent-christmas-lights-cost-ontario.json';
import permanentLightingBrandsCompared from '@/content/resources/permanent-lighting-brands-compared.json';
import permanentVsSeasonalChristmasLights from '@/content/resources/permanent-vs-seasonal-christmas-lights.json';
import yearRoundUsesPermanentLights from '@/content/resources/year-round-uses-permanent-lights.json';
import diyPermanentLightsVsProfessionalInstallation from '@/content/resources/diy-permanent-lights-vs-professional-installation.json';
import howMuchElectricityDoPermanentLightsUse from '@/content/resources/how-much-electricity-do-permanent-lights-use.json';
import permanentLightsOnVinylAluminumWoodSoffit from '@/content/resources/permanent-lights-on-vinyl-aluminum-wood-soffit.json';
import questionsToAskAPermanentLightingInstaller from '@/content/resources/questions-to-ask-a-permanent-lighting-installer.json';
import permanentLightingColourGuideWarmWhiteVsCoolWhite from '@/content/resources/permanent-lighting-colour-guide-warm-white-vs-cool-white.json';
import aYearOfPermanentLightingHolidayScheduleIdeas from '@/content/resources/a-year-of-permanent-lighting-holiday-schedule-ideas.json';
import doesPermanentLightingIncreaseHomeValue from '@/content/resources/does-permanent-lighting-increase-home-value.json';
import permanentLightingForBusinessesStorefrontsPlazas from '@/content/resources/permanent-lighting-for-businesses-storefronts-plazas.json';
import howPermanentLightsSurviveOntarioWinters from '@/content/resources/how-permanent-lights-survive-ontario-winters.json';
import doYouNeedAPermitOrHoaApprovalForPermanentLightsOntario from '@/content/resources/do-you-need-a-permit-or-hoa-approval-for-permanent-lights-ontario.json';

// The block shape is owned by ArticleBody (shared with the support hub).
// Re-exported so existing `import { ArticleBlock } from '@/lib/resources'` keeps working.
export type { ArticleBlock };

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
  keyTakeaways: string[];
  body: ArticleBlock[];
  faq: ArticleFaq[];
}

// Master index — order here drives listing order within a category.
export const articles: Article[] = [
  howPermanentLedLightingWorks,
  howMuchElectricityDoPermanentLightsUse,
  permanentLightsOnVinylAluminumWoodSoffit,
  howPermanentLightsSurviveOntarioWinters,
  permanentChristmasLightsCostOntario,
  arePermanentChristmasLightsWorthIt,
  doesPermanentLightingIncreaseHomeValue,
  questionsToAskAPermanentLightingInstaller,
  permanentLightingColourGuideWarmWhiteVsCoolWhite,
  aYearOfPermanentLightingHolidayScheduleIdeas,
  permanentLightingForBusinessesStorefrontsPlazas,
  doYouNeedAPermitOrHoaApprovalForPermanentLightsOntario,
  permanentVsSeasonalChristmasLights,
  permanentLightingBrandsCompared,
  diyPermanentLightsVsProfessionalInstallation,
  yearRoundUsesPermanentLights,
] as Article[];

export function getArticle(slug: string): Article | null {
  return articles.find(a => a.slug === slug) ?? null;
}

export interface ArticleGroup {
  category: string;
  items: Article[];
}

// Groups articles by their `category`, preserving first-seen category order.
export function getArticlesByCategory(): ArticleGroup[] {
  const groups: ArticleGroup[] = [];
  for (const article of articles) {
    let group = groups.find(g => g.category === article.category);
    if (!group) {
      group = { category: article.category, items: [] };
      groups.push(group);
    }
    group.items.push(article);
  }
  return groups;
}

// Related articles = same category first, then fill from the rest.
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.filter(a => a.slug !== slug).slice(0, limit);
  const sameCategory = articles.filter(a => a.slug !== slug && a.category === current.category);
  const others = articles.filter(a => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
