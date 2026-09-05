import { PICKS } from "@/lib/photos";
import finishGuide from "@/content/resources/matte-vs-semi-gloss-vs-gloss-concrete-sealer-finish.json";
import solventVsWater from "@/content/resources/solvent-based-vs-water-based-concrete-sealers.json";
import howOften from "@/content/resources/how-often-should-you-reseal-concrete-in-southwestern-ontario.json";
import newConcrete from "@/content/resources/when-can-you-seal-new-concrete.json";
import pricing from "@/content/resources/how-concrete-sealing-is-priced.json";
import stamped from "@/content/resources/sealing-stamped-concrete-the-complete-guide.json";
import aggregate from "@/content/resources/sealing-exposed-aggregate-driveways-and-patios.json";
import salt from "@/content/resources/road-salt-and-freeze-thaw-how-sealing-protects-ontario-driveways.json";
import haze from "@/content/resources/white-haze-on-sealed-concrete-causes-and-fixes.json";
import slippery from "@/content/resources/slippery-sealed-concrete-how-non-slip-additives-work.json";
import prep from "@/content/resources/how-to-prepare-concrete-for-sealing.json";
import timing from "@/content/resources/best-time-of-year-to-seal-concrete-in-ontario.json";
import diy from "@/content/resources/diy-vs-professional-concrete-sealing.json";
import cure from "@/content/resources/how-long-does-concrete-sealer-take-to-dry-and-cure.json";
import commercial from "@/content/resources/commercial-concrete-sealing-for-plazas-walkways-and-parking-areas.json";

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

export const ARTICLES: Article[] = [finishGuide, solventVsWater, pricing, howOften, timing, newConcrete, stamped, aggregate, salt, prep, cure, diy, haze, slippery, commercial] as Article[];

const CATEGORY_ORDER = ["Finishes", "Sealers", "Costs", "Planning", "Surfaces", "Process", "Protection", "Problems", "Commercial"];

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
  "matte-vs-semi-gloss-vs-gloss-concrete-sealer-finish": PICKS.gloss,
  "solvent-based-vs-water-based-concrete-sealers": PICKS.process3,
  "how-often-should-you-reseal-concrete-in-southwestern-ontario": PICKS.heroDriveway,
  "when-can-you-seal-new-concrete": PICKS.broomDriveway,
  "how-concrete-sealing-is-priced": PICKS.heroAreas,
  "sealing-stamped-concrete-the-complete-guide": PICKS.heroStamped,
  "sealing-exposed-aggregate-driveways-and-patios": PICKS.aggregateDriveway,
  "road-salt-and-freeze-thaw-how-sealing-protects-ontario-driveways": PICKS.cracked,
  "white-haze-on-sealed-concrete-causes-and-fixes": PICKS.greySatin,
  "slippery-sealed-concrete-how-non-slip-additives-work": PICKS.stampedSteps,
  "how-to-prepare-concrete-for-sealing": PICKS.process1,
  "best-time-of-year-to-seal-concrete-in-ontario": PICKS.autumn,
  "diy-vs-professional-concrete-sealing": PICKS.process4,
  "how-long-does-concrete-sealer-take-to-dry-and-cure": PICKS.heroContact,
  "commercial-concrete-sealing-for-plazas-walkways-and-parking-areas": PICKS.heroCommercial,
};
export const articlePhoto = (slug: string) => ARTICLE_PHOTO[slug] ?? PICKS.heroResources;
