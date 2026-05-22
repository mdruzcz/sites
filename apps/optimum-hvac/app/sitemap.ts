import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const areas = getServiceAreas();
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/heat-pump-rebates`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/maintenance-plans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/emergency`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/financing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${base}/service-areas/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    areas.map((a) => ({
      url: `${base}/services/${s.slug}/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  return [...staticPages, ...servicePages, ...cityPages, ...serviceCityPages];
}
