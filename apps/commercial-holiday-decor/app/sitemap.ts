import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products, serviceAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/products", "/installation", "/service-areas", "/gallery", "/about", "/faq", "/quote", "/contact", "/privacy-policy", "/terms-of-service"];
  return [
    ...statics.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : path === "/quote" ? 0.9 : 0.7
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...serviceAreas.map((a) => ({
      url: `${site.url}/service-areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
