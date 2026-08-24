import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities, audiences } from "@/lib/content";
import { getProperties } from "@/lib/properties";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/rentals`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${site.url}/list-your-property`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${site.url}/off-season-rentals/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: c.isHome ? 0.9 : 0.75
  }));

  const audiencePages: MetadataRoute.Sitemap = audiences.map((a) => ({
    url: `${site.url}/perfect-for/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  // Listings change most often, so they carry their own updated_at.
  const properties = await getProperties();
  const listingPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${site.url}/rentals/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.85
  }));

  return [...statics, ...listingPages, ...cityPages, ...audiencePages];
}
