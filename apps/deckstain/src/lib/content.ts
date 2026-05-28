import servicesData from "@/content/services.json";
import serviceAreasData from "@/content/service-areas.json";
import testimonialsData from "@/content/testimonials.json";
import faqsData from "@/content/faqs.json";
import projectsData from "@/content/projects.json";
import stainColorsData from "@/content/stain-colors.json";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  image: string;
  order: number;
};

export type City = {
  name: string;
  slug: string;
  region: string;
  description: string;
};

export type ServiceAreas = {
  headline: string;
  description: string;
  cities: City[];
};

export type Testimonial = {
  id: number;
  author: string;
  city: string;
  rating: number;
  quote: string;
  featured: boolean;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type Project = {
  id: number;
  image: string;
  alt: string;
  title: string;
  city: string;
  service: string;
  featured: boolean;
};

export type StainColor = {
  name: string;
  slug: string;
  description: string;
  swatchHex: string;
};

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getService(slug: string): Service | undefined {
  return (servicesData as Service[]).find((s) => s.slug === slug);
}

export function getServiceAreas(): ServiceAreas {
  return serviceAreasData as ServiceAreas;
}

export function getCities(): City[] {
  return (serviceAreasData as ServiceAreas).cities;
}

export function getCity(slug: string): City | undefined {
  return (serviceAreasData as ServiceAreas).cities.find((c) => c.slug === slug);
}

export function getTestimonials(featuredOnly = false): Testimonial[] {
  const testimonials = testimonialsData as Testimonial[];
  return featuredOnly ? testimonials.filter((t) => t.featured) : testimonials;
}

export function getFaqs(): Faq[] {
  return faqsData as Faq[];
}

export function getProjects(featuredOnly = false, limit?: number): Project[] {
  const projects = projectsData as Project[];
  const filtered = featuredOnly ? projects.filter((p) => p.featured) : projects;
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getStainColors(): StainColor[] {
  return stainColorsData as StainColor[];
}
