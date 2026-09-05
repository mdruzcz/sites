import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getCities, getGuides } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const services: MetadataRoute.Sitemap = getServices().map((s) => ({ url: `${base}/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 }));
  const cities: MetadataRoute.Sitemap = getCities().map((c) => ({ url: `${base}/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 }));
  const guides: MetadataRoute.Sitemap = getGuides().map((g) => ({ url: `${base}/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly", priority: 0.7 }));
  return [...statics, ...services, ...cities, ...guides];
}
