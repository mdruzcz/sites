import fs from "node:fs";
import path from "node:path";

/**
 * Page copy lives in JSON under src/content/{cities,industries,services}/<slug>.json
 * so every landing page carries unique, editable content. Loaded in Server
 * Components only (fs). Edit the JSON and redeploy to change copy.
 */

export type Faq = { q: string; a: string };
export type Section = { heading: string; text: string };

export type CityContent = {
  slug: string;
  name: string;
  displayName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  intro: string[];
  neighbourhoods: string[];
  sections: Section[];
  commercial: { heading: string; text: string; examples: string[] };
  faq: Faq[];
  nearby: string[];
};

export type IndustryContent = {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  intro: string[];
  whatWeInstall: string[];
  whyItPays: Section[];
  process: string[];
  faq: Faq[];
};

export type ServiceContent = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  intro: string[];
  included: string[];
  sections: Section[];
  pricing: string;
  faq: Faq[];
};

export type Photo = {
  file: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const ROOT = path.join(process.cwd(), "src", "content");
const cache = new Map<string, Map<string, unknown>>();

function readDir<T extends { slug: string }>(dir: string): Map<string, T> {
  const hit = cache.get(dir);
  if (hit && process.env.NODE_ENV === "production") return hit as Map<string, T>;
  const map = new Map<string, T>();
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) {
    for (const f of fs.readdirSync(full)) {
      if (!f.endsWith(".json")) continue;
      const data = JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T;
      map.set(data.slug ?? f.replace(/\.json$/, ""), data);
    }
  }
  cache.set(dir, map);
  return map;
}

export const getCityContent = (slug: string) => readDir<CityContent>("cities").get(slug) ?? null;
export const getAllCityContent = () => [...readDir<CityContent>("cities").values()];
export const getIndustryContent = (slug: string) => readDir<IndustryContent>("industries").get(slug) ?? null;
export const getServiceContent = (slug: string) => readDir<ServiceContent>("services").get(slug) ?? null;

let photoCache: Photo[] | null = null;
export function getPhotos(): Photo[] {
  if (photoCache && process.env.NODE_ENV === "production") return photoCache;
  const p = path.join(ROOT, "photos.json");
  photoCache = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as Photo[]) : [];
  return photoCache;
}

/** Deterministic photo picks so each page gets a stable, distinct set. */
export function pickPhotos(category: string | string[], count: number, seed = ""): Photo[] {
  const cats = Array.isArray(category) ? category : [category];
  const pool = getPhotos().filter((p) => cats.includes(p.category));
  if (pool.length === 0) return [];
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const start = h % pool.length;
  const out: Photo[] = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) out.push(pool[(start + i * 7) % pool.length]);
  // de-dup in case the stride wrapped onto the same item
  return [...new Map(out.map((p) => [p.file, p])).values()];
}

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbJsonLd = (base: string, items: { name: string; path?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    ...(it.path ? { item: `${base}${it.path}` } : {}),
  })),
});
