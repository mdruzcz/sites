import type { MetadataRoute } from "next";
import { getCategories, listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/diy-kits`, lastModified: now, priority: 0.95 },
    { url: `${SITE_URL}/shop`, lastModified: now, priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`, lastModified: now, priority: 0.8 },
    { url: `${SITE_URL}/installers`, lastModified: now, priority: 0.75 },
    { url: `${SITE_URL}/professional-installer`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/gallery`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/track-order`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/shipping-returns`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/warranty`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: now, priority: 0.5 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/product-category/${c.slug}`,
      lastModified: now,
      priority: 0.8
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: now,
      priority: 0.7
    }))
  ];
}
