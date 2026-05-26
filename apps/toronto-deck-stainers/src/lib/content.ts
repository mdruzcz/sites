import { cache } from "react";
import servicesData from "@/content/services.json";
import projectsData from "@/content/projects.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";
import faqsData from "@/content/faqs.json";
import postsData from "@/content/posts.json";

export type Service = (typeof servicesData)[number];
export type Project = (typeof projectsData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceArea = typeof serviceAreasData;
export type City = ServiceArea["cities"][number];
export type Faq = (typeof faqsData)[number];
export type Post = (typeof postsData)[number];

export const getServices = cache(() => servicesData);
export const getProjects = cache(() => projectsData);
export const getTestimonials = cache(() => testimonialsData);
export const getServiceAreas = cache(() => serviceAreasData);
export const getFaqs = cache(() => faqsData);
export const getPosts = cache(() => postsData);

export const getServiceBySlug = cache((slug: string) =>
  servicesData.find((s) => s.slug === slug)
);

export const getCityBySlug = cache((slug: string) =>
  serviceAreasData.cities.find((c) => c.slug === slug)
);

export const getPostBySlug = cache((slug: string) =>
  postsData.find((p) => p.slug === slug)
);

export const getFeaturedProjects = cache(() =>
  projectsData.filter((p) => p.featured)
);

export const getFeaturedTestimonials = cache(() =>
  testimonialsData.filter((t) => t.featured)
);
