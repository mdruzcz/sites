import type { MetadataRoute } from 'next';
import { serviceAreas, services } from '@/lib/site';
import { articles } from '@/lib/resources';
import { supportGuides } from '@/lib/support';
import { kits } from '@/lib/kits';

const base = 'https://foreverlights.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${base}/`, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/cost-estimator`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/resources`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/financing`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/gallery`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/locations`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/contact`, changeFrequency: 'yearly' as const, priority: 0.9 },
    { url: `${base}/warranty`, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: `${base}/support`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/support/installation-videos`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/support/manuals`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/become-a-dealer`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/kits`, changeFrequency: 'monthly' as const, priority: 0.9 },
  ];

  const kitPages = kits.map(k => ({ url: `${base}/kits/${k.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }));
  const servicePages = services.map(s => ({ url: `${base}/services/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 }));
  const locationPages = serviceAreas.map(a => ({ url: `${base}/locations/${a.slug}`, changeFrequency: 'monthly' as const, priority: 0.9 }));
  const resourcePages = articles.map(a => ({ url: `${base}/resources/${a.slug}`, lastModified: new Date(a.updated), changeFrequency: 'monthly' as const, priority: 0.7 }));
  const supportPages = supportGuides.map(g => ({ url: `${base}/support/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: 'monthly' as const, priority: 0.6 }));

  return [...staticPages, ...kitPages, ...servicePages, ...locationPages, ...resourcePages, ...supportPages];
}
