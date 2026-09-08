import fs from "node:fs";
import path from "node:path";

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "callout"; text: string };

export interface Section { heading: string; blocks: Block[] }
export interface Faq { q: string; a: string }
export type PhotoMaterial = "segmental-block" | "timber" | "poured-concrete" | "natural-stone" | "armour-stone" | "repair" | "mixed";

export interface BasePage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: Section[];
  faqs: Faq[];
  cta: string;
}
export interface ServicePage extends BasePage {
  shortName: string;
  cardBlurb: string;
  photoMaterial: PhotoMaterial;
  bestFor: string[];
  priceNote: string;
  relatedGuides: string[];
}
export interface CityPage extends BasePage {
  city: string;
  region: string;
  county: string;
  nearby: string[];
  areas: string[];
  terrainNote: string;
  driveNote: string;
}
export interface GuidePage extends BasePage {
  category: string;
  readMinutes: number;
  summary: string;
  publishedDate: string;
  photoMaterial: PhotoMaterial;
}
export interface ServiceCityPage extends BasePage {
  service: string;
  city: string;
  region: string;
  photoMaterial: PhotoMaterial;
}

const ROOT = path.join(process.cwd(), "src", "content");

function readDir<T>(dir: string): T[] {
  const p = path.join(ROOT, dir);
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(p, f), "utf8")) as T);
}

let cache: { services?: ServicePage[]; cities?: CityPage[]; guides?: GuidePage[]; serviceCity?: ServiceCityPage[] } = {};
if (process.env.NODE_ENV !== "production") cache = {};

export const getServices = () => (cache.services ??= readDir<ServicePage>("services"));
export const getCities = () => (cache.cities ??= readDir<CityPage>("cities"));
export const getGuides = () => (cache.guides ??= readDir<GuidePage>("guides").sort((a, b) => a.h1.localeCompare(b.h1)));
export const getServiceCities = () => (cache.serviceCity ??= readDir<ServiceCityPage>("service-city"));

export const getService = (slug: string) => getServices().find((s) => s.slug === slug);
export const getCityByRoute = (route: string) => getCities().find((c) => c.slug === route);
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug);
export const getServiceCity = (service: string, city: string) => getServiceCities().find((p) => p.slug === `${service}/${city}`);

export const wordCount = (page: BasePage) => {
  let t = page.intro + " ";
  for (const s of page.sections) {
    t += s.heading + " ";
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "callout") t += b.text + " ";
      else if (b.type === "ul") t += b.items.join(" ") + " ";
      else t += b.items.map((i) => i.title + " " + i.text).join(" ") + " ";
    }
  }
  t += page.faqs.map((f) => f.q + " " + f.a).join(" ");
  return t.split(/\s+/).filter(Boolean).length;
};
