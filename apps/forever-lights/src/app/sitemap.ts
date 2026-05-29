import type { MetadataRoute } from 'next';
import { serviceAreas } from '@/lib/site';

const base = 'https://foreverlights.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${base}/`, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/faq`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/gallery`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/locations`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/contact`, changeFrequency: 'yearly' as const, priority: 0.9 },
    { url: `${base}/warranty`, changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const locationPages = serviceAreas.map(a => ({
    url: `${base}/locations/${a.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...locationPages];
}
