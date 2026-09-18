import type { MetadataRoute } from "next";
import { cities, services, industries, site } from "@/lib/site";
import { POST_SLUGS } from "@/app/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticUrls: [string, number][] = [
    ["", 1.0],
    ["/commercial-christmas-lighting", 0.9],
    ["/residential-services", 0.8],
    ["/lighting-packages", 0.8],
    ["/service-areas", 0.7],
    ["/gallery", 0.6],
    ["/about-us", 0.5],
    ["/contact-us", 0.6],
    ["/faq", 0.5],
    ["/blog", 0.5],
    ["/disclaimer", 0.2],
    ["/terms-of-use", 0.2],
    ["/privacy-policy", 0.2],
  ];

  return [
    ...staticUrls.map(([p, priority]) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...cities.map((c) => ({ url: `${base}/cities/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...POST_SLUGS.map((slug) => ({ url: `${base}/blog/${slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
