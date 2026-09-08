import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getCities, getGuides, getServiceCities } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const b = site.url;
  const now = new Date();
  const e = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${b}${path}`, lastModified: now, changeFrequency, priority });
  return [
    e("", 1, "weekly"),
    e("/services", 0.9, "weekly"),
    e("/service-areas", 0.8),
    e("/gallery", 0.8, "weekly"),
    e("/resources", 0.8, "weekly"),
    e("/about-us", 0.6),
    e("/contact-us", 0.9),
    ...getServices().map((s) => e(`/${s.slug}`, 0.9)),
    ...getCities().map((c) => e(`/${c.slug}`, c.slug.startsWith("london") ? 1 : 0.8)),
    ...getServiceCities().map((p) => e(`/${p.slug}`, 0.7)),
    ...getGuides().map((g) => e(`/${g.slug}`, 0.6, "yearly")),
    e("/privacy-policy", 0.2, "yearly"),
    e("/terms-of-service", 0.2, "yearly"),
  ];
}
