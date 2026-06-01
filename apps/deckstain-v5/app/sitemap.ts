import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES, AREAS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const stat: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/finishes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const areas: MetadataRoute.Sitemap = AREAS.map((a) => ({ url: `${SITE.url}/areas/${a.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  return [...stat, ...services, ...areas];
}
