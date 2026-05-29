import siteData from '@/content/site.json';
import servicesData from '@/content/services.json';
import serviceAreasData from '@/content/service-areas.json';
import faqData from '@/content/faq.json';
import testimonialsData from '@/content/testimonials.json';
import galleryData from '@/content/gallery.json';

export const site = siteData;
export const services = servicesData;
export const serviceAreas = serviceAreasData;
export const faqs = faqData;
export const testimonials = testimonialsData;
export const gallery = galleryData;

export function getArea(slug: string) {
  return serviceAreasData.find(a => a.slug === slug) ?? null;
}
