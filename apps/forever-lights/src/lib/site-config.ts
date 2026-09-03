// Tiny, client-safe site config. Client components import from HERE, not from
// '@/lib/site' — that module pulls every content JSON into the client bundle.
import siteData from '@/content/site.json';

export const site = siteData;
export const phoneHref = `tel:${siteData.phone.replace(/\D/g, '')}`;
