import siteData from '@/content/site.json';
import servicesData from '@/content/services.json';
import serviceAreasData from '@/content/service-areas.json';
import faqData from '@/content/faq.json';
import testimonialsData from '@/content/testimonials.json';
import photosData from '@/content/photos.json';

export interface Photo {
  key: string;
  src: string;
  alt: string;
  caption?: string;
  tags?: string[];
  width: number;
  height: number;
  blurDataURL: string;
}

/** @deprecated use Photo */
export type GalleryItem = Photo;

export interface ServiceArea {
  slug: string;
  city: string;
  province: string;
  label: string;
  description: string;
  population: string;
  neighbourhoods: string[];
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  intro?: string;
  body?: string[];
}

export const site = siteData;
export const phoneHref = `tel:${siteData.phone.replace(/\D/g, '')}`;
export const services = servicesData as Service[];
export const serviceAreas = serviceAreasData as ServiceArea[];
export const faqs = faqData;
export const testimonials = testimonialsData;
export const photos = photosData as Photo[];

// Gallery = every photo except the pure technician/install action shot.
export const gallery: Photo[] = photos.filter(p => p.key !== 'technician');

export function getPhoto(key: string): Photo {
  const p = photos.find(x => x.key === key);
  if (!p) throw new Error(`Unknown photo key: ${key}`);
  return p;
}

export function getPhotosByTag(tag: string): Photo[] {
  return photos.filter(p => p.tags?.includes(tag));
}

export function getArea(slug: string): ServiceArea | null {
  return serviceAreas.find(a => a.slug === slug) ?? null;
}

export function getService(slug: string): Service | null {
  return services.find(s => s.slug === slug) ?? null;
}

// Hand-curated geographic adjacency for internal linking between city pages.
const nearbyMap: Record<string, string[]> = {
  'london-ontario': ['st-thomas', 'strathroy', 'dorchester', 'komoka-kilworth', 'ilderton', 'delaware'],
  'st-thomas': ['london-ontario', 'aylmer', 'belmont', 'dorchester', 'delaware', 'woodstock'],
  'woodstock': ['ingersoll', 'tillsonburg', 'stratford', 'london-ontario', 'brantford', 'thorndale'],
  'brantford': ['woodstock', 'ingersoll', 'tillsonburg', 'stratford', 'london-ontario'],
  'stratford': ['st-marys', 'woodstock', 'ingersoll', 'thorndale', 'london-ontario'],
  'ingersoll': ['woodstock', 'london-ontario', 'tillsonburg', 'thorndale', 'dorchester'],
  'tillsonburg': ['woodstock', 'ingersoll', 'aylmer', 'belmont', 'st-thomas'],
  'strathroy': ['london-ontario', 'mount-brydges', 'komoka-kilworth', 'delaware', 'parkhill'],
  'aylmer': ['st-thomas', 'belmont', 'tillsonburg', 'london-ontario'],
  'dorchester': ['london-ontario', 'thorndale', 'ingersoll', 'belmont', 'st-thomas'],
  'komoka-kilworth': ['london-ontario', 'mount-brydges', 'delaware', 'strathroy', 'ilderton'],
  'ilderton': ['london-ontario', 'lucan', 'komoka-kilworth', 'thorndale', 'strathroy'],
  'lucan': ['ilderton', 'london-ontario', 'parkhill', 'exeter', 'strathroy'],
  'mount-brydges': ['strathroy', 'komoka-kilworth', 'delaware', 'london-ontario', 'parkhill'],
  'st-marys': ['stratford', 'exeter', 'thorndale', 'london-ontario', 'ilderton'],
  'exeter': ['lucan', 'parkhill', 'st-marys', 'ilderton', 'london-ontario'],
  'parkhill': ['lucan', 'exeter', 'strathroy', 'ilderton', 'mount-brydges'],
  'belmont': ['aylmer', 'st-thomas', 'dorchester', 'tillsonburg', 'london-ontario'],
  'thorndale': ['london-ontario', 'dorchester', 'ilderton', 'ingersoll', 'st-marys'],
  'delaware': ['london-ontario', 'komoka-kilworth', 'mount-brydges', 'strathroy', 'st-thomas'],
};

// Returns up to `limit` nearby service areas for internal linking.
export function getNearbyAreas(slug: string, limit = 5): ServiceArea[] {
  const slugs = nearbyMap[slug] ?? serviceAreas.filter(a => a.slug !== slug).map(a => a.slug);
  return slugs
    .map(s => getArea(s))
    .filter((a): a is ServiceArea => a !== null)
    .slice(0, limit);
}
