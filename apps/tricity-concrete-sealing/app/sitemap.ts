import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const areas = getServiceAreas();
  const base = site.url;

  const serviceUrls = services.flatMap((s) => [
    { url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    ...areas.cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const cityUrls = areas.cities.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/warranty`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    ...serviceUrls,
    ...cityUrls,
  ];
}
