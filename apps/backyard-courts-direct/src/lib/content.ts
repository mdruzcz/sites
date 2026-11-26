import kitsJson from "@/content/kits.json";
import sportsJson from "@/content/sports.json";
import citiesJson from "@/content/cities.json";
import faqJson from "@/content/faq.json";
import { site } from "./site";
import type { PhotoKey } from "./photos";

export type Layout = "half" | "full" | "pickleball" | "multi" | "tennis" | "shuffleboard" | "shuffleboard-double";

export interface Kit {
  slug: string;
  code: string;
  sport: string;
  layout: Layout;
  /** Short side in feet (for a half court: the baseline width). */
  w: number;
  /** Long side in feet (for a half court: the depth from the baseline). */
  d: number;
  tag?: string;
  bestFor: string;
  popular?: boolean;
}

export interface Sport {
  slug: string;
  name: string;
  kitLabel: string;
  photo: PhotoKey;
  photoPosition: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  body: string[];
  facts: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

export interface City {
  slug: string;
  name: string;
  province: string;
  provinceCode: string;
  intro: string;
  local: string[];
  nearby: string[];
}

export const kits = kitsJson as Kit[];
export const sports = sportsJson as Sport[];
export const cities = citiesJson as City[];
export const faqGroups = faqJson as { group: string; items: { q: string; a: string }[] }[];

export const getKit = (slug: string) => kits.find((k) => k.slug === slug);
export const getSport = (slug: string) => sports.find((s) => s.slug === slug);
export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
export const kitsFor = (sport: string) => kits.filter((k) => k.sport === sport);

const LAYOUT_NAME: Record<Layout, string> = {
  half: "Basketball Half Court Kit",
  full: "Basketball Full Court Kit",
  pickleball: "Pickleball Court Kit",
  multi: "Multi-Sport Court Kit",
  tennis: "Tennis Court Kit",
  shuffleboard: "Shuffleboard Court Kit",
  "shuffleboard-double": "Double Shuffleboard Court Kit",
};

/** "30 ft x 25 ft", long side first. */
export const kitSize = (k: Kit) => `${Math.max(k.w, k.d)} ft x ${Math.min(k.w, k.d)} ft`;
export const kitSizeShort = (k: Kit) => `${Math.max(k.w, k.d)}' x ${Math.min(k.w, k.d)}'`;
export const kitName = (k: Kit) => `${LAYOUT_NAME[k.layout]} ${kitSize(k)}`;
export const kitTypeName = (k: Kit) => LAYOUT_NAME[k.layout];
export const kitArea = (k: Kit) => k.w * k.d;

/** "From" price in whole dollars, or null while pricing is not set. */
export function kitPrice(k: Kit): number | null {
  if (!site.pricePerSqFt) return null;
  return Math.round((kitArea(k) * site.pricePerSqFt) / 5) * 5;
}

export const money = (n: number) => `$${n.toLocaleString("en-CA")}`;

/** What the game lines on each layout cover, for the spec list. */
export function kitLines(k: Kit): string {
  switch (k.layout) {
    case "half":
      return "Key, free-throw line and three-point arc";
    case "full":
      return "Two keys, three-point arcs, centre line and centre circle";
    case "pickleball":
      return "Full 20 ft x 44 ft court with both kitchens";
    case "multi":
      return "Pickleball court plus a basketball key and arc in a second colour";
    case "tennis":
      return "Full 78 ft x 36 ft doubles court with singles lines";
    case "shuffleboard":
      return "Scoring triangles, dead lines and baselines";
    case "shuffleboard-double":
      return "Two lanes with scoring triangles and dead lines";
  }
}

export function kitSummary(k: Kit): string {
  const sport = getSport(k.sport)?.name.toLowerCase() ?? "sport";
  return `A ${kitSize(k)} modular tile ${sport === "multi-sport" ? "multi-sport court" : `${sport} court`} covering ${kitArea(k).toLocaleString("en-CA")} square feet. ${k.bestFor}. Ships across Canada with a numbered layout plan and your choice of colours.`;
}
