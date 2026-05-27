import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = [
    { url: base, priority: 1.0 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/our-network`, priority: 0.9 },
    { url: `${base}/projects`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.8 },
  ];
  return pages.map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
