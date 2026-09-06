import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getCities, getGuides } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/finishes`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const services = getServices();
  const cities = getCities();
  return [
    ...statics,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...cities.map((c) => ({ url: `${base}/service-areas/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...services.flatMap((s) => cities.map((c) => ({ url: `${base}/services/${s.slug}/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }))),
    ...getGuides().map((g) => ({ url: `${base}/resources/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
