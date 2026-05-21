import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const areas = getServiceAreas();
  const base = site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = areas.cities.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    areas.cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...serviceCityRoutes];
}
