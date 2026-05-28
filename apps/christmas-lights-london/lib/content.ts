import { cache } from "react";
import servicesData from "@/content/services.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";
import faqData from "@/content/faq.json";

export type Service = (typeof servicesData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceArea = (typeof serviceAreasData)[number];
export type FAQ = (typeof faqData)[number];

export const getServices = cache(() => servicesData);
export const getTestimonials = cache(() => testimonialsData);
export const getServiceAreas = cache(() => serviceAreasData);
export const getFaq = cache(() => faqData);

export const getServiceBySlug = cache((slug: string) =>
  servicesData.find((s) => s.slug === slug)
);

export const getServiceAreaBySlug = cache((slug: string) =>
  serviceAreasData.find((a) => a.slug === slug)
);

export const getFeaturedTestimonials = cache(() =>
  testimonialsData.filter((t) => t.featured)
);

export const getFeaturedFaqs = cache(() =>
  faqData.filter((f) => f.featured)
);

export const getCityPages = cache(() =>
  ["london", "kitchener", "hamilton", "mississauga", "brantford"]
);
