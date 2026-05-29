import { MetadataRoute } from 'next';
import { services, serviceAreas } from '@/lib/content';

const BASE_URL = 'https://londonconcretesealing.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const area of serviceAreas) {
      cityPages.push({
        url: `${BASE_URL}/services/${service.slug}/${area.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      });
    }
  }

  return [...staticPages, ...servicePages, ...cityPages];
}
