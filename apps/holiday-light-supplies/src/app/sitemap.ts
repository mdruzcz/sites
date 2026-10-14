import type { MetadataRoute } from "next";
import { getCategories, listProducts } from "@/lib/catalog";
import { articles } from "@/lib/resources";
import { SEGMENTS } from "@/lib/commercial-content";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);
  const now = new Date();
  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
    { path: "/commercial", priority: 0.9, changeFrequency: "monthly" },
    { path: "/request-a-quote", priority: 0.8, changeFrequency: "monthly" },
    { path: "/professional-installer", priority: 0.8, changeFrequency: "monthly" },
    { path: "/municipalities", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact-us", priority: 0.5, changeFrequency: "yearly" },
    { path: "/shipping-returns", priority: 0.4, changeFrequency: "yearly" },
    { path: "/warranty", priority: 0.4, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" }
  ];
  return [
    ...staticPages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, priority: p.priority, changeFrequency: p.changeFrequency })),
    ...SEGMENTS.map((s) => ({ url: `${SITE_URL}/commercial/${s.slug}`, lastModified: now, priority: 0.85, changeFrequency: "monthly" as const })),
    ...categories.map((c) => ({ url: `${SITE_URL}/product-category/${c.slug}`, lastModified: now, priority: 0.8, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${p.slug}`, lastModified: now, priority: 0.7, changeFrequency: "weekly" as const })),
    ...articles.map((a) => ({ url: `${SITE_URL}/resources/${a.slug}`, lastModified: new Date(a.updated), priority: 0.6, changeFrequency: "monthly" as const }))
  ];
}
