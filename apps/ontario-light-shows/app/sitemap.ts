import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas, getCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const cities = getServiceAreas().cities;
  const caseStudies = getCaseStudies();
  const now = new Date();

  const staticRoutes = ["", "/services", "/service-areas", "/case-studies", "/about", "/contact", "/faq", "/privacy-policy", "/terms-of-service"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.flatMap((s) =>
      cities.map((c) => ({
        url: `${site.url}/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
    ...cities.map((c) => ({
      url: `${site.url}/service-areas/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${site.url}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
