import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceexcellenceawards.ca";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/auth/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
