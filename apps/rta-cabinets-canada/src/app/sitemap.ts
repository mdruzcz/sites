import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCabinets, getGroups, getPackages } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/kitchen-packages",
    "/how-to-measure",
    "/about",
    "/contact",
    "/faq",
    "/request",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const groupRoutes = getGroups().map((g) => ({
    url: `${base}/shop/${g}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const cabinetRoutes = getCabinets().map((c) => ({
    url: `${base}/cabinets/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const packageRoutes = getPackages().map((p) => ({
    url: `${base}/kitchen-packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...groupRoutes, ...cabinetRoutes, ...packageRoutes];
}
