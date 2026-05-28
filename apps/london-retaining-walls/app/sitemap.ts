import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const pages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/about-us`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/contact-us`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/service-areas`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    // Service pages
    { url: `${base}/retaining-wall-installation`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/concrete-retaining-walls`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/block-retaining-walls`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/wood-and-timber-retaining-walls`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/retaining-wall-repair`, priority: 0.9, changeFrequency: "monthly" as const },
    // City pages
    { url: `${base}/london-retaining-wall-contractor`, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${base}/woodstock-retaining-wall-contractor`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/brantford-retaining-wall-contractor`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/st-thomas-retaining-wall-contractor`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/strathroy-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/dorchester-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/aylmer-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/ilderton-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/komoka-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/mount-brydges-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/lucan-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/delaware-retaining-wall-contractor`, priority: 0.8, changeFrequency: "monthly" as const },
    // Blog posts
    { url: `${base}/tips-on-how-to-stain-your-wooden-retaining-wall`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/how-to-choose-retaining-wall-material`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/retaining-wall-cost-guide-ontario`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/retaining-wall-maintenance-tips`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/how-long-do-retaining-walls-last`, priority: 0.6, changeFrequency: "yearly" as const },
    // Legal
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" as const },
  ];
  return pages.map((p) => ({ url: p.url, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
}
