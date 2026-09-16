import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas, getBlogPosts, getEventTypes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const areas = getServiceAreas();
  const posts = getBlogPosts();
  const events = getEventTypes();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/packages`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/our-process`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const eventPages: MetadataRoute.Sitemap = events.map((e) => ({ url: `${site.url}/events/${e.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 }));
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const cityPages: MetadataRoute.Sitemap = areas.cities.map((c) => ({ url: `${site.url}/service-areas/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    areas.cities.map((c) => ({ url: `${site.url}/services/${s.slug}/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }))
  );
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.5 }));

  return [...staticPages, ...eventPages, ...servicePages, ...cityPages, ...serviceCityPages, ...blogPages];
}
