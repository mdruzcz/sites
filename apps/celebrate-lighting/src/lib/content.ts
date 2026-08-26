import { cache } from "react";
import servicesData from "@/content/services.json";
import projectsData from "@/content/projects.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";
import serviceLinesData from "@/content/service-lines.json";

export type Service = (typeof servicesData)[number];
export type Project = (typeof projectsData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceArea = typeof serviceAreasData;
export type City = ServiceArea["cities"][number];

/* The two service lines — permanent track lighting and seasonal C9 — are
   genuinely different products sold to different people. All 20 of their
   pages (pillar, commercial, and 8 city pages each) render from this one
   file so the two stories can never drift out of sync. */
export type ServiceLine = (typeof serviceLinesData)[number];

export const getServiceLines = cache(() => serviceLinesData);

export const getServiceLine = cache((slug: string) =>
  serviceLinesData.find((l) => l.slug === slug)
);

/** The other line — powers the "actually, you want the other one" cross-links. */
export const getOtherServiceLine = cache((slug: string) =>
  serviceLinesData.find((l) => l.slug !== slug)
);

export const getServices = cache(() => servicesData);
export const getProjects = cache(() => projectsData);
export const getTestimonials = cache(() => testimonialsData);
export const getServiceAreas = cache(() => serviceAreasData);

export const getServiceBySlug = cache((slug: string) =>
  servicesData.find((s) => s.slug === slug)
);

export const getCityBySlug = cache((slug: string) =>
  serviceAreasData.cities.find((c) => c.slug === slug)
);

export const getFeaturedProjects = cache(() =>
  projectsData.filter((p) => p.featured)
);

export const getFeaturedTestimonials = cache(() =>
  testimonialsData.filter((t) => t.featured)
);
