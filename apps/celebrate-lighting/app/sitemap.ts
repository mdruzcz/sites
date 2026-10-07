import { MetadataRoute } from "next";
import { getServices, getCities, getServiceLines, getGuides, getOccasions } from "@/lib/content";
import { site } from "@/lib/site";

const BLOG_SLUGS = ["7-helpful-tips-choosing-permanent-outdoor-lighting", "recommended-lighting-supplier-ontario", "how-to-use-permanent-lighting-year-round"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;
  const services = getServices();
  const cities = getCities();
  const lines = getServiceLines();
  const guides = getGuides();
  const occasions = getOccasions();

  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1.0, "weekly"),
    entry("/permanent-lighting", 0.95, "weekly"),
    entry("/seasonal-lighting", 0.95, "weekly"),
    entry("/commercial", 0.85),
    entry("/ai-preview", 0.9, "weekly"),
    entry("/contact", 0.9),
    entry("/gallery", 0.8, "weekly"),
    entry("/compare", 0.8),
    entry("/service-areas", 0.8),
    entry("/services", 0.7),
    entry("/guides", 0.8, "weekly"),
    entry("/occasions", 0.75),
    entry("/faq", 0.75),
    entry("/about", 0.7),
    entry("/reviews", 0.6),
    entry("/our-process", 0.6),
    entry("/blog", 0.6, "weekly"),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-of-service", 0.2, "yearly"),
    ...lines.flatMap((l) => [entry(`/${l.slug}/commercial`, 0.8), ...cities.map((c) => entry(`/${l.slug}/${c.slug}`, 0.8))]),
    ...cities.map((c) => entry(`/service-areas/${c.slug}`, 0.75)),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.7)),
    ...services.flatMap((s) => cities.map((c) => entry(`/services/${s.slug}/${c.slug}`, 0.55))),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.7)),
    ...occasions.map((o) => entry(`/occasions/${o.slug}`, 0.65)),
    ...BLOG_SLUGS.map((s) => entry(`/blog/${s}`, 0.5)),
  ];
}
