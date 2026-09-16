import { cache } from "react";
import servicesData from "@/content/services.json";
import eventTypesData from "@/content/event-types.json";
import packagesData from "@/content/packages.json";
import projectsData from "@/content/projects.json";
import testimonialsData from "@/content/testimonials.json";
import serviceAreasData from "@/content/service-areas.json";
import faqData from "@/content/faq.json";
import blogPostsData from "@/content/blog-posts.json";

export type Service = (typeof servicesData)[number];
export type EventType = (typeof eventTypesData)[number];
export type PackageGroup = (typeof packagesData.groups)[number];
export type Package = PackageGroup["packages"][number];
export type Project = (typeof projectsData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceArea = typeof serviceAreasData;
export type City = ServiceArea["cities"][number];
export type FAQ = (typeof faqData)[number];
export type BlogPost = (typeof blogPostsData)[number];

export const getServices = cache(() => servicesData);
export const getEventTypes = cache(() => eventTypesData);
export const getPackageGroups = cache(() => packagesData.groups);
export const getPackageNote = () => packagesData.note;
export const getAddOns = () => packagesData.addOns;
export const getProjects = cache(() => [...projectsData].sort((a, b) => a.order - b.order));
export const getTestimonials = cache(() => testimonialsData);
export const getServiceAreas = cache(() => serviceAreasData);
export const getFaq = cache(() => faqData);
export const getBlogPosts = cache(() => blogPostsData);

export const getServiceBySlug = cache((slug: string) => servicesData.find((s) => s.slug === slug));
export const getEventTypeBySlug = cache((slug: string) => eventTypesData.find((e) => e.slug === slug));
export const getCityBySlug = cache((slug: string) => serviceAreasData.cities.find((c) => c.slug === slug));
export const getBlogPostBySlug = cache((slug: string) => blogPostsData.find((p) => p.slug === slug));

export const getAllPackages = cache(() => packagesData.groups.flatMap((g) => g.packages));
export const getPackageBySlug = cache((slug: string) => getAllPackages().find((p) => p.slug === slug));

export const getFeaturedProjects = cache(() => getProjects().filter((p) => p.featured));
export const getProjectsByCategory = cache((category: string) => getProjects().filter((p) => p.category === category));
export const getProjectsByService = cache((service: string) => getProjects().filter((p) => p.service === service));
export const getFeaturedTestimonials = cache(() => testimonialsData.filter((t) => t.featured));

export const galleryCategories = [
  { slug: "all", label: "All" },
  { slug: "weddings", label: "Weddings" },
  { slug: "corporate-events", label: "Corporate" },
  { slug: "holiday-parties", label: "Holiday Parties" },
  { slug: "private-parties", label: "Backyard & Private" },
  { slug: "commercial", label: "Commercial & Mall Decor" },
] as const;
