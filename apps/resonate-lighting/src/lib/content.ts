import { cache } from "react";
import kitsData from "@/content/kits.json";
import servicesData from "@/content/services.json";
import marketsData from "@/content/markets.json";
import faqsData from "@/content/faqs.json";
import galleryData from "@/content/gallery.json";

export type Kit = (typeof kitsData)[number];
export type Service = (typeof servicesData)[number];
export type Market = (typeof marketsData)[number];
export type Faq = { question: string; answer: string; category?: string };
export type GalleryItem = (typeof galleryData)[number];

export const getKits = cache(() => kitsData);
export const getServices = cache(() => servicesData);
export const getMarkets = cache(() => marketsData);
export const getFaqs = cache((): Faq[] => faqsData);
export const getGallery = cache(() => galleryData);

export const getKitBySlug = cache((slug: string) => kitsData.find((k) => k.slug === slug));
export const getMarketBySlug = cache((slug: string) => marketsData.find((m) => m.slug === slug));
