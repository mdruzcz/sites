import { cache } from "react";
import servicesData from "@/content/services.json";
import serviceAreasData from "@/content/service-areas.json";
import testimonialsData from "@/content/testimonials.json";
import faqsData from "@/content/faqs.json";

export type Service = (typeof servicesData)[number];
export type ServiceArea = (typeof serviceAreasData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type FAQ = (typeof faqsData)[number];

export const getServices = cache(() => [...servicesData].sort((a, b) => a.order - b.order));

export const getServiceAreas = cache(() => [...serviceAreasData]);

export const getTestimonials = cache(() => [...testimonialsData]);

export const getFaqs = cache(() => [...faqsData]);

export const getServiceBySlug = cache((slug: string) =>
  servicesData.find((s) => s.slug === slug) ?? null
);

export const getCityBySlug = cache((slug: string) =>
  serviceAreasData.find(
    (c) => c.city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "") === slug
  ) ?? null
);

export const getFeaturedTestimonials = cache(() =>
  testimonialsData.filter((t) => t.featured).slice(0, 3)
);

export const getFaqsByCategory = cache((category: string) =>
  faqsData.filter((f) => f.category === category)
);

export const getCitiesByTier = cache((tier: number) =>
  serviceAreasData.filter((c) => c.tier === tier)
);

export const getFeaturedServices = cache(() =>
  servicesData.filter((s) => s.featured).sort((a, b) => a.order - b.order)
);
