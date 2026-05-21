import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const areas = getServiceAreas();

  const staticPages = [
    { url: site.url, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${site.url}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${site.url}/service-areas`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${site.url}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${site.url}/faq`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${site.url}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const cityPages = areas.cities.map((c) => ({
    url: `${site.url}/service-areas/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages, ...cityPages].map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
