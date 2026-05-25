import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import servicesData from "@/content/services.json";
import serviceAreasData from "@/content/service-areas.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/service-areas`, priority: 0.9 },
    { url: `${base}/gallery`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/faq`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: now, changeFrequency: "monthly" as const }));

  const servicePages = servicesData.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const cityPages = serviceAreasData.cities.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityServicePages = servicesData.flatMap((s) =>
    serviceAreasData.cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticPages, ...servicePages, ...cityPages, ...cityServicePages];
}
