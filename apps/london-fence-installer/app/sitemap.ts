import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/about-us`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/contact-us`, priority: 0.9, changeFrequency: "monthly" as const },
    // Service pages
    { url: `${base}/wood-fencing-contractor`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/chainlink-fencing`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/vinyl-fence-installation`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/metal-fence-installation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/black-aluminum-fencing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/fence-repair`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/fence-staining`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/noise-wall-and-highway-fencing`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/guardrail-installation`, priority: 0.7, changeFrequency: "monthly" as const },
    // City pages
    { url: `${base}/woodstock-fence-builder`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/wood-fence-alymer`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/tilsonburg-fence-builder`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/strathroy-fence-builder`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/st-thomas-wood-fence`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/st-marys-fence-builder`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/ingersoll-wood-fence-builder`, priority: 0.8, changeFrequency: "monthly" as const },
    // Blog posts
    { url: `${base}/an-ultimate-guide-to-staining-fences-tips-and-tricks-from-the-experts`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/the-right-sequence-installing-your-fence-deck-or-concrete-patio-in-the-perfect-order`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/choosing-the-perfect-fence-style-a-guide-to-enhancing-your-propertys-aesthetics`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/the-ultimate-guide-to-fencing-materials-which-one-is-right-for-you`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/top-3-tips-to-prolong-the-lifespan-of-your-wood-fence`, priority: 0.6, changeFrequency: "yearly" as const },
    // Legal
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
