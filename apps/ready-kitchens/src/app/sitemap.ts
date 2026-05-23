import type { MetadataRoute } from "next";
import { getAllKits } from "@/lib/kits";
import { SITE } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = [
    "",
    "/kits",
    "/how-it-works",
    "/pickup",
    "/faq",
    "/about",
    "/contact",
    "/request",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const kitRoutes = (await getAllKits()).map((kit) => ({
    url: `${SITE.url}/kits/${kit.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...kitRoutes];
}
