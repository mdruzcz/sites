import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

const CITY_SLUGS = ["london", "kitchener", "hamilton", "mississauga", "brantford"];

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const serviceAreas = getServiceAreas();
  const base = site.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${base}/services/christmas-light-installation/${city}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
