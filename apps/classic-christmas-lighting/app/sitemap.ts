import { MetadataRoute } from "next";
import servicesData from "@/content/services.json";
import serviceAreasData from "@/content/service-areas.json";

const BASE = "https://classicchristmaslighting.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/service-areas`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/gallery`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const servicePages = servicesData.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const areaPages = serviceAreasData.map((a) => ({
    url: `${BASE}/service-areas/${a.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages, ...areaPages];
}
