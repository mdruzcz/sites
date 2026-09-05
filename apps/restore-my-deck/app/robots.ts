import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"], allow: ["/", "/llms.txt"], disallow: ["/api/"] },
    ],
    sitemap: "https://restoremydeck.ca/sitemap.xml",
    host: "https://restoremydeck.ca",
  };
}
