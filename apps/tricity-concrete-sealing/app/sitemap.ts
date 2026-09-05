import { MetadataRoute } from "next";
import servicesData from "@/content/services.json";
import { cities } from "@/lib/cities";
import { FINISHES } from "@/lib/finishes";
import { ARTICLES } from "@/lib/resources";

const BASE = "https://tricityconcretesealing.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/services`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/finishes`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/service-areas`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/gallery`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/resources`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/warranty`, lastModified: now, priority: 0.7, changeFrequency: "yearly" },
    { url: `${BASE}/about`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/faq`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/privacy-policy`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/terms-of-service`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
  ];
  const finishPages: MetadataRoute.Sitemap = FINISHES.map((f) => ({ url: `${BASE}/finishes/${f.slug}`, lastModified: now, priority: 0.85, changeFrequency: "monthly" }));
  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({ url: `${BASE}/services/${s.slug}`, lastModified: now, priority: 0.85, changeFrequency: "monthly" }));
  const areaPages: MetadataRoute.Sitemap = cities.map((c) => ({ url: `${BASE}/service-areas/${c.slug}`, lastModified: now, priority: 0.85, changeFrequency: "monthly" }));
  const serviceCity: MetadataRoute.Sitemap = servicesData.flatMap((s) => cities.map((c) => ({ url: `${BASE}/services/${s.slug}/${c.slug}`, lastModified: now, priority: 0.7, changeFrequency: "monthly" as const })));
  const guidePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({ url: `${BASE}/resources/${a.slug}`, lastModified: new Date(a.updated), priority: 0.7, changeFrequency: "monthly" }));
  return [...staticPages, ...finishPages, ...servicePages, ...areaPages, ...serviceCity, ...guidePages];
}
