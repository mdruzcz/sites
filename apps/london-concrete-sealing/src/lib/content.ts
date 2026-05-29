import siteData from '@/content/site.json';
import servicesData from '@/content/services.json';
import serviceAreasData from '@/content/service-areas.json';
import testimonialsData from '@/content/testimonials.json';
import faqsData from '@/content/faqs.json';

export const site = siteData;
export const services = servicesData;
export const serviceAreas = serviceAreasData;
export const testimonials = testimonialsData;
export const faqs = faqsData;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServiceArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
