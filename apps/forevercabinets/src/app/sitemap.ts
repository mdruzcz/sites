import type { MetadataRoute } from "next";
import { getAllCabinets } from "@/lib/catalog";
import { CITIES } from "@/lib/cities";
import { SITE } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/cabinets",
    "/base-cabinets",
    "/drawer-cabinets",
    "/wall-cabinets",
    "/accessories",
    "/our-cabinets",
    "/our-kitchens",
    "/visualizer",
    "/service-area",
    "/how-it-works",
    "/shipping-returns",
    "/contact",
    "/about",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cityEntries = CITIES.map((city) => ({
    url: `${base}/cabinets-${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9, // local landing pages are high-value
  }));

  const productEntries = getAllCabinets().map((c) => ({
    url: `${base}/cabinets/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...cityEntries, ...productEntries];
}
