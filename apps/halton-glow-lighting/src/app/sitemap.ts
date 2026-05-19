import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/#why`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#how`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/#gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/#service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
