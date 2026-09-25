import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCabinets, getGroups, getPackages } from "@/lib/catalog";
import { getCities, getGuides } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/planner",
    "/kitchen-packages",
    "/how-to-measure",
    "/about",
    "/contact",
    "/faq",
    "/request",
    "/sale",
    "/gallery",
    "/resources",
    "/financing",
    "/lowest-price-guarantee",
    "/shipping-and-delivery",
    "/assembly-service",
    "/warranty",
    "/privacy-policy",
    "/terms-of-service",
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

  const cityRoutes = getCities().map((c) => ({
    url: `${base}/kitchen-cabinets/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guideRoutes = getGuides().map((g) => ({
    url: `${base}/resources/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cityRoutes, ...groupRoutes, ...cabinetRoutes, ...packageRoutes, ...guideRoutes];
}
