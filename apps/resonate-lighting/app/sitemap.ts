import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCities, getMarkets } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry("", 1.0),
    ...["/kits", "/pricing", "/services", "/how-it-works", "/contact"].map((p) => entry(p, 0.9)),
    ...getMarkets().map((m) => entry(`/${m.slug}`, 0.9)),
    entry("/locations", 0.8),
    ...getCities().map((c) => entry(`/locations/${c.slug}`, 0.8)),
    ...["/care", "/quick-start", "/faq", "/gallery", "/about"].map((p) => entry(p, 0.7)),
    ...["/privacy-policy", "/terms-of-service"].map((p) => entry(p, 0.2, "yearly")),
  ];
}
