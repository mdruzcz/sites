// Pure, isomorphic search types + matcher. Safe to import from client components.
import type { City, Category } from "@/lib/types";

/** Slim, serialisable record used by the client-side lookup and the /winners filter. */
export type WinnerIndexEntry = {
  slug: string;
  name: string;
  tagline: string | null;
  city: string;
  citySlug: string;
  province: string;
  category: string;
  categorySlug: string;
  services: string[];
  areas: string[];
  photo: string | null;
  logo: string | null;
  year: number;
  tier: string;
  reviews: number;
  href: string;
};

export type WinnerIndex = {
  winners: WinnerIndexEntry[];
  cities: Pick<City, "slug" | "name" | "province">[];
  categories: Pick<Category, "slug" | "name">[];
};

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Shared matcher (server + client). Every whitespace-separated term must hit
 * the name, tagline, category, city, a service or a service area. Returns a
 * score so the typeahead can rank name hits above incidental matches.
 */
export function scoreWinner(w: WinnerIndexEntry, query: string): number {
  const terms = norm(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return 1;
  const name = norm(w.name);
  const hay = [w.tagline ?? "", w.category, w.city, ...w.services, ...w.areas].map(norm);
  let score = 0;
  for (const t of terms) {
    if (name.startsWith(t)) score += 6;
    else if (name.includes(t)) score += 4;
    else if (norm(w.category).includes(t)) score += 3;
    else if (norm(w.city).includes(t)) score += 3;
    else if (hay.some((h) => h.includes(t))) score += 1;
    else return 0;
  }
  return score;
}
