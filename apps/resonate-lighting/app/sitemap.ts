import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getMarkets } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = ["", "/kits", "/services", "/contact"];
  const secondary = ["/gallery", "/about", "/faq"];
  const legal = ["/privacy-policy", "/terms-of-service"];
  return [
    ...top.map((path) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "monthly" as const, priority: path === "" ? 1.0 : 0.9 })),
    ...getMarkets().map((m) => ({ url: `${site.url}/${m.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...secondary.map((path) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...legal.map((path) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
