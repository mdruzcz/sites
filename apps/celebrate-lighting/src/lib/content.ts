import { cache } from "react";
import servicesData from "@/content/services.json";
import projectsData from "@/content/projects.json";
import testimonialsData from "@/content/testimonials.json";
import serviceLinesData from "@/content/service-lines.json";
import citiesData from "@/content/cities.json";
import guidesData from "@/content/guides.json";
import occasionsData from "@/content/occasions.json";
import faqData from "@/content/faq.json";
import photosData from "@/content/photos.json";

export type Service = (typeof servicesData)[number];
export type Project = (typeof projectsData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type ServiceLine = (typeof serviceLinesData)[number];

/* ---------- Explicit shapes for the authored content files ---------- */

export interface City {
  slug: string;
  name: string;
  county: string;
  region: string;
  population: string;
  driveFromWoodstock: string;
  neighbourhoods: string[];
  housingStock: string;
  climateNote: string;
  landmarks: string[];
  intro: string;
  permanentCopy: string[];
  seasonalCopy: string[];
  commercialNote: string;
  faqs: { question: string; answer: string }[];
  meta: { area: string; permanent: string; seasonal: string };
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { columns: string[]; rows: string[][] };
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  summary: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  related: string[];
  cta: { heading: string; body: string; label: string; href: string };
}

export interface Occasion {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  season: string;
  eyebrow: string;
  heading: string;
  intro: string;
  colourRecipes: { name: string; colours: string[]; description: string }[];
  scenes: { name: string; description: string }[];
  tips: string[];
  body: string[];
  faq: { question: string; answer: string }[];
}

export interface FaqGroup {
  category: string;
  items: { question: string; answer: string }[];
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  colour: string;
  category: "residential" | "commercial" | "detail" | string;
  blurDataURL: string;
}

const cities = citiesData as unknown as City[];
const guides = guidesData as unknown as Guide[];
const occasions = occasionsData as unknown as Occasion[];
const faqGroups = faqData as unknown as FaqGroup[];
const photos = photosData as unknown as Photo[];

/* ---------- Service lines ---------- */
export const getServiceLines = cache(() => serviceLinesData);
export const getServiceLine = cache((slug: string) => serviceLinesData.find((l) => l.slug === slug));
export const getOtherServiceLine = cache((slug: string) => serviceLinesData.find((l) => l.slug !== slug));

/* ---------- Services (repair, maintenance, etc.) ---------- */
export const getServices = cache(() => [...servicesData].sort((a, b) => a.order - b.order));
export const getServiceBySlug = cache((slug: string) => servicesData.find((s) => s.slug === slug));

/* ---------- Cities ---------- */
export const getCities = cache(() => cities);
export const getCityBySlug = cache((slug: string) => cities.find((c) => c.slug === slug));
/** Nearby cities for cross-linking: everything except the current one, first 8. */
export const getNearbyCities = cache((slug: string, n = 8) => cities.filter((c) => c.slug !== slug).slice(0, n));

/* ---------- Guides ---------- */
export const getGuides = cache(() => guides);
export const getGuideBySlug = cache((slug: string) => guides.find((g) => g.slug === slug));
export const getGuideCategories = cache(() => Array.from(new Set(guides.map((g) => g.category))));

/* ---------- Occasions ---------- */
export const getOccasions = cache(() => occasions);
export const getOccasionBySlug = cache((slug: string) => occasions.find((o) => o.slug === slug));

/* ---------- FAQ ---------- */
export const getFaqGroups = cache(() => faqGroups);
export const getAllFaqs = cache(() => faqGroups.flatMap((g) => g.items));

/* ---------- Photos ---------- */
export const getPhotos = cache(() => photos);
export const getPhotosByCategory = cache((category: string) => photos.filter((p) => p.category === category));
export const getPhoto = cache((needle: string) => photos.find((p) => p.src.includes(needle)) ?? photos[0]);

/* ---------- Projects + testimonials ---------- */
export const getProjects = cache(() => projectsData);
export const getTestimonials = cache(() => testimonialsData);
export const getFeaturedTestimonials = cache(() => testimonialsData.filter((t) => t.featured));
