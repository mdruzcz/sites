import { site } from '@/lib/site-config';
import type { VzSiteConfig } from './server';

export const VZ_SITE: VzSiteConfig = {
  site: 'foreverlights',
  siteName: site.name,
  domain: site.domain,
  baseUrl: `https://${site.domain}`,
  phone: site.phone,
  path: '/visualizer',
};
