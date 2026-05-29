import { MetadataRoute } from "next";
import { SITE, SERVICES, SERVICE_AREAS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const statics = [
    { url: base, priority: 1.0 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/financing`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.9 },
    { url: `${base}/service-areas`, priority: 0.8 },
    { url: `${base}/privacy-policy`, priority: 0.3 },
    { url: `${base}/terms-of-service`, priority: 0.3 },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.85,
  }));

  const areaPages = SERVICE_AREAS.map((a) => ({
    url: `${base}/service-areas/${a.slug}`,
    priority: 0.9,
  }));

  return [...statics, ...servicePages, ...areaPages].map((p) => ({
    url: p.url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));
}
