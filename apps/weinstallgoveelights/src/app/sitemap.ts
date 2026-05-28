import { MetadataRoute } from "next";
import serviceAreas from "@/content/service-areas.json";

const base = "https://weinstallgoveelights.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = [
    { url: base, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/gallery`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/service-areas`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/faq`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/warranty`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const city_pages = serviceAreas.map((area) => ({
    url: `${base}/services/permanent-govee-lighting/${area.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...static_pages, ...city_pages];
}
