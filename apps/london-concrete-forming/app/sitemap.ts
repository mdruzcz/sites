import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/concrete-driveways`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/concrete-patios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/concrete-retaining-walls`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/stamped-concrete-driveway`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/concrete-removal-services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/concrete-shed-pad-installer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/concrete-finishes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/concrete-stamps`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/woodstock-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/st-thomas-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sarnia-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/port-stanley-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/chatham-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/stratford-concrete-contractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/concrete-driveways-woodstock`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveways-st-thomas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveway-contractor-in-london-on`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveways-stratford`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveways-ingersoll`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveways-tilsonburg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/concrete-driveways-aylmer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/advantages-of-a-concrete-driveway`, lastModified: new Date("2025-03-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/stamped-concrete-driveways-cost`, lastModified: new Date("2025-04-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/advantages-of-a-concrete-driveway`, lastModified: new Date("2025-03-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/stamped-concrete-driveways-cost`, lastModified: new Date("2025-04-01"), changeFrequency: "yearly", priority: 0.6 },
  ];
}