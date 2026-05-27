import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const pages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/about-us`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/projects`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact-us`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/service-areas`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    // Service category pages
    { url: `${base}/pressure-washing-services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/sealing-services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/deck-repair-and-maintenance`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/deck-rebuilding`, priority: 0.8, changeFrequency: "monthly" as const },
    // Individual service pages
    { url: `${base}/deck-restoration`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/deck-cleaning`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/deck-power-washing`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/fence-cleaning`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/deck-sealing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/deck-sanding`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/deck-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/fence-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/fence-painting`, priority: 0.8, changeFrequency: "monthly" as const },
    // City pages
    { url: `${base}/kitchener-deck-fence-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/waterloo-deck-fence-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/guelph-deck-fence-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/hamilton-deck-fence-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/cambridge-deck-staining`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/stratford-deck-staining`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/woodstock-deck-staining`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/fergus-deck-staining`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/paris-deck-staining`, priority: 0.8, changeFrequency: "monthly" as const },
    // Blog
    { url: `${base}/how-to-save-money-restore-dont-replace`, priority: 0.6, changeFrequency: "yearly" as const },
    // Legal
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" as const },
  ];
  return pages.map((p) => ({ url: p.url, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
}
