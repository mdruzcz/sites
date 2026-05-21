import type { MetadataRoute } from "next";
import { site, services, cities } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/gallery`, priority: 0.7 },
    { url: `${base}/service-areas`, priority: 0.8 },
    { url: `${base}/faq`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: now, changeFrequency: "monthly" as const }));

  const servicePages = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const cityPages = cities.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
