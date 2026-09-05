import type { MetadataRoute } from "next";
import { getCategories, listProducts } from "@/lib/catalog";
import { articles } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);
  const now = new Date();
  const staticPages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/diy-kits", 0.95, "weekly"],
    ["/shop", 0.9, "weekly"],
    ["/how-it-works", 0.8, "monthly"],
    ["/compare", 0.8, "monthly"],
    ["/gallery", 0.7, "monthly"],
    ["/resources", 0.8, "weekly"],
    ["/installers", 0.7, "monthly"],
    ["/professional-installer", 0.6, "monthly"],
    ["/faq", 0.6, "monthly"],
    ["/warranty", 0.5, "yearly"],
    ["/shipping-returns", 0.5, "yearly"],
    ["/contact-us", 0.6, "yearly"]
  ];
  return [
    ...staticPages.map(([p, priority, changeFrequency]) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority, changeFrequency })),
    ...articles.map((a) => ({ url: `${SITE_URL}/resources/${a.slug}`, lastModified: new Date(a.updated), priority: 0.7, changeFrequency: "monthly" as const })),
    ...categories.map((c) => ({ url: `${SITE_URL}/product-category/${c.slug}`, lastModified: now, priority: 0.8, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${p.slug}`, lastModified: now, priority: p.slug.startsWith("led-housing-package") ? 0.9 : 0.7, changeFrequency: "weekly" as const }))
  ];
}
