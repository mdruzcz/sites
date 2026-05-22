import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const services = getServices();
  const areas = getServiceAreas();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/reviews`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/our-process`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/how-long-does-concrete-take-to-cure`, lastModified: new Date("2025-04-15"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/concrete-vs-asphalt-driveway`, lastModified: new Date("2025-03-22"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/stamped-concrete-cost-guide`, lastModified: new Date("2025-02-10"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const cityRoutes: MetadataRoute.Sitemap = areas.cities.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    areas.cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...serviceCityRoutes];
}
