import fs from "node:fs";
import path from "node:path";

/**
 * Editorial content that extends the Supabase winner rows lives here as JSON,
 * keyed by winner slug / guide slug / category slug. Kept out of the database
 * so it can be written, reviewed and versioned like any other site copy.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "callout"; text: string };

export interface Faq { q: string; a: string }

export interface WinnerProfile {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  editorial: { heading: string; text: string }[];
  strengths: string[];
  considerations: string[];
  bestFor: string[];
  questionsToAsk: string[];
  faq: Faq[];
  googleMapsQuery: string;
  /** Verified Google Business Profile URL, when one has been confirmed. */
  googleBusinessProfileUrl?: string;
}

export interface Guide {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  readMinutes: number;
  summary: string;
  publishedDate: string;
  intro: string;
  sections: { heading: string; blocks: Block[] }[];
  checklist: string[];
  faq: Faq[];
  relatedCategories: string[];
}

export interface CategoryGuide {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whatToLookFor: string[];
  typicalCostNotes: string;
  questionsToAsk: string[];
  redFlags: string[];
  relatedGuides: string[];
}

const ROOT = path.join(process.cwd(), "src", "content");

function readDir<T extends { slug: string }>(dir: string): Map<string, T> {
  const p = path.join(ROOT, dir);
  const out = new Map<string, T>();
  if (!fs.existsSync(p)) return out;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".json")) continue;
    const doc = JSON.parse(fs.readFileSync(path.join(p, f), "utf8")) as T;
    out.set(doc.slug, doc);
  }
  return out;
}

const cache: { profiles?: Map<string, WinnerProfile>; guides?: Map<string, Guide>; categories?: Map<string, CategoryGuide> } = {};

export const getProfile = (slug: string) => (cache.profiles ??= readDir<WinnerProfile>("profiles")).get(slug) ?? null;
export const getGuides = () => [...(cache.guides ??= readDir<Guide>("guides")).values()].sort((a, b) => a.h1.localeCompare(b.h1));
export const getGuide = (slug: string) => (cache.guides ??= readDir<Guide>("guides")).get(slug) ?? null;
export const getCategoryGuide = (slug: string) => (cache.categories ??= readDir<CategoryGuide>("category-guides")).get(slug) ?? null;

/** Google Maps search deep link: resolves to the Business Profile when one exists, never fabricates one. */
export const mapsSearchUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
