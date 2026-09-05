import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account", "/api/", "/checkout", "/cart", "/track-order"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"], allow: ["/", "/llms.txt"], disallow: ["/account", "/api/", "/checkout", "/cart"] }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
