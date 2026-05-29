import type { MetadataRoute } from "next";
import { cities, services, industries, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticUrls = [
    "",
    "/about-us",
    "/contact-us",
    "/faq",
    "/service-areas",
    "/lighting-packages",
    "/residential-services",
    "/blog",
    "/disclaimer",
    "/terms-of-use",
    "/privacy-policy",
  ];

  return [
    ...staticUrls.map((p) => ({
      url: `${base}${p || ""}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cities.map((c) => ({
      url: `${base}/cities/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((i) => ({
      url: `${base}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
