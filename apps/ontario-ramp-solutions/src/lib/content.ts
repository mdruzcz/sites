import { cache } from "react";
import servicesData from "@/content/services.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";
import faqsData from "@/content/faqs.json";

export type Service = (typeof servicesData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceArea = typeof serviceAreasData;
export type City = ServiceArea["cities"][number];
export type Faq = (typeof faqsData)[number];

export const getServices = cache(() => servicesData);
export const getTestimonials = cache(() => testimonialsData);
export const getServiceAreas = cache(() => serviceAreasData);
export const getFaqs = cache(() => faqsData);

export const getServiceBySlug = cache((slug: string) =>
  servicesData.find((s) => s.slug === slug)
);

export const getCityBySlug = cache((slug: string) =>
  serviceAreasData.cities.find((c) => c.slug === slug)
);

export const getFeaturedTestimonials = cache(() =>
  testimonialsData.filter((t) => t.featured)
);
