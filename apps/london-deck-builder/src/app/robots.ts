import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://londondeckbuilder.ca/sitemap.xml",
    host: "https://londondeckbuilder.ca",
  };
}
