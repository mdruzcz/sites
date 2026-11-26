import type { MetadataRoute } from "next";
import { cities, guides, kits, sports } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "weekly", priority });
  return [
    page("", 1),
    page("/court-kits", 0.9),
    ...sports.map((s) => page(`/sports/${s.slug}`, 0.9)),
    ...kits.map((k) => page(`/court-kits/${k.slug}`, 0.8)),
    page("/custom-court", 0.8),
    page("/guides", 0.8),
    ...guides.map((g) => page(`/guides/${g.slug}`, 0.8)),
    ...cities.map((c) => page(`/locations/${c.slug}`, 0.7)),
    page("/how-it-works", 0.7),
    page("/faq", 0.6),
    page("/contact", 0.6),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
