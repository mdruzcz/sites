import type { MetadataRoute } from "next";
import { site, SECTOR_SLUGS } from "@/lib/site";
import { getCities, getGuides, getServices } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    entry("/", 1, "weekly"),
    entry("/contact", 0.9),
    entry("/services", 0.9),
    ...getServices().map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...SECTOR_SLUGS.map((s) => entry(`/${s}`, 0.95)),
    entry("/gallery", 0.8, "weekly"),
    entry("/service-areas", 0.8),
    ...getCities().map((c) => entry(`/service-areas/${c.slug}`, 0.8)),
    entry("/guides", 0.7),
    ...getGuides().map((g) => entry(`/guides/${g.slug}`, 0.7)),
    entry("/faq", 0.7),
    entry("/about", 0.6),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-of-service", 0.2, "yearly"),
  ];
}
