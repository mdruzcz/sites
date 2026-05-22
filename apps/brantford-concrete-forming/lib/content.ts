import { cache } from "react";
import servicesData from "@/content/services.json";
import projectsData from "@/content/projects.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  order: number;
};

export type Project = {
  slug: string;
  title: string;
  service: string;
  city: string;
  image: string;
  featured: boolean;
  order: number;
};

export type Testimonial = {
  author: string;
  role: string;
  quote: string;
  rating: number;
  service: string;
  featured: boolean;
};

export type City = {
  slug: string;
  name: string;
  description: string;
};

export type ServiceAreas = {
  primaryCity: string;
  region: string;
  cities: City[];
};

export const getServices = cache((): Service[] => {
  return (servicesData as Service[]).sort((a, b) => a.order - b.order);
});

export const getService = cache((slug: string): Service | undefined => {
  return (servicesData as Service[]).find((s) => s.slug === slug);
});

export const getProjects = cache((): Project[] => {
  return (projectsData as Project[]).sort((a, b) => a.order - b.order);
});

export const getFeaturedProjects = cache((): Project[] => {
  return (projectsData as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
});

export const getTestimonials = cache((): Testimonial[] => {
  return testimonialsData as Testimonial[];
});

export const getFeaturedTestimonials = cache((): Testimonial[] => {
  return (testimonialsData as Testimonial[]).filter((t) => t.featured);
});

export const getServiceAreas = cache((): ServiceAreas => {
  return serviceAreasData as ServiceAreas;
});

export const getCity = cache((slug: string): City | undefined => {
  return (serviceAreasData as ServiceAreas).cities.find((c) => c.slug === slug);
});
