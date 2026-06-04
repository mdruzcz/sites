import siteData from '@/content/site.json';
import servicesData from '@/content/services.json';
import serviceAreasData from '@/content/service-areas.json';
import testimonialsData from '@/content/testimonials.json';
import faqsData from '@/content/faqs.json';

export interface ProcessStep {
  step: string;
  detail: string;
}

export interface FinishType {
  name: string;
  description: string;
}

export interface Service {
  slug: string;
  urlPath: string;
  name: string;
  menuName: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  process: ProcessStep[];
  finishTypes?: FinishType[];
  icon: string;
  image: string;
}

export interface ServiceArea {
  slug: string;
  urlPath: string;
  name: string;
  region: string;
  province: string;
  primary?: boolean;
  image: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const site = siteData;
export const services = servicesData as Service[];
export const serviceAreas = serviceAreasData as ServiceArea[];
export const testimonials = testimonialsData as Testimonial[];
export const faqs = faqsData as Faq[];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServiceByPath(urlPath: string) {
  return services.find((s) => s.urlPath === urlPath);
}

export function getServiceArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
