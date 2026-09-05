import { MetadataRoute } from "next";
import servicesData from "@/content/services.json";
import serviceAreasData from "@/content/service-areas.json";
import { ARTICLES } from "@/lib/resources";

const BASE = "https://classicchristmaslighting.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/services`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/service-areas`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/gallery`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/resources`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/about`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/faq`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({ url: `${BASE}/services/${s.slug}`, lastModified: now, priority: 0.85, changeFrequency: "monthly" }));
  const areaPages: MetadataRoute.Sitemap = serviceAreasData.map((a) => ({ url: `${BASE}/service-areas/${a.slug}`, lastModified: now, priority: 0.9, changeFrequency: "monthly" }));
  const guidePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({ url: `${BASE}/resources/${a.slug}`, lastModified: new Date(a.updated), priority: 0.7, changeFrequency: "monthly" }));

  return [...staticPages, ...servicePages, ...areaPages, ...guidePages];
}
