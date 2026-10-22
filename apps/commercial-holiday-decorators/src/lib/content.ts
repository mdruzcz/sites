import { cache } from "react";
import servicesData from "@/content/services.json";
import sectorsData from "@/content/sectors.json";
import citiesData from "@/content/cities.json";
import faqData from "@/content/faq.json";
import guidesData from "@/content/guides.json";
import aboutData from "@/content/about.json";
import mediaData from "@/content/media.json";

/* ---------- Shapes of the authored content files ---------- */

export interface QA { question: string; answer: string }
export interface TitledBody { title: string; body: string }

export interface Service {
  slug: string; name: string; shortName: string; navDescription: string;
  title: string; metaDescription: string; h1: string; eyebrow: string;
  intro: string[]; heroImage: string;
  includes: TitledBody[]; process: TitledBody[]; idealFor: string[];
  specs: { label: string; value: string }[]; faqs: QA[]; gallery: string[];
  relatedSectors: string[]; relatedServices: string[]; ctaTitle: string; ctaBody: string;
}

export interface Sector {
  slug: string; name: string; shortName: string; navDescription: string;
  title: string; metaDescription: string; h1: string; eyebrow: string;
  intro: string[]; heroImage: string; heroVideo: string | null;
  challenges: TitledBody[]; spaces: (TitledBody & { image: string })[];
  programs: { name: string; body: string; includes: string[] }[];
  timeline: { when: string; what: string }[]; faqs: QA[]; gallery: string[];
  relatedServices: string[]; keywords: string[]; ctaTitle: string; ctaBody: string;
}

export interface City {
  slug: string; name: string; region: string; title: string; metaDescription: string; h1: string;
  intro: string[]; districts: { name: string; body: string }[];
  sectorsHere: { sector: string; body: string }[];
  logistics: { driveFromLondon: string; access: string; seasonNote: string };
  faqs: QA[]; nearby: string[]; heroImage: string; keywords: string[];
}

export interface FaqGroup { group: string; slug: string; items: QA[] }

export interface GuideSection { heading: string; paragraphs: string[]; bullets?: string[] | null; table?: { columns: string[]; rows: string[][] } | null }
export interface Guide {
  slug: string; title: string; metaDescription: string; excerpt: string; readingTime: string;
  publishedAt: string; heroImage: string; sections: GuideSection[]; faqs: QA[];
  relatedServices: string[]; relatedSectors: string[];
}

export interface About {
  story: string[]; values: TitledBody[]; whyUs: TitledBody[];
  stats: { stat: string; label: string }[];
  process: (TitledBody & { detail: string[] })[];
  guarantees: TitledBody[]; serviceAreaBlurb: string;
}

export interface MediaImage { key: string; src: string; alt: string; category: string; width: number; height: number; blurDataURL: string }
export interface MediaVideo { key: string; src: string; alt: string; category: string; bytes: number }

/* ---------- Loaders ---------- */

export const getServices = cache((): Service[] => servicesData as unknown as Service[]);
export const getService = cache((slug: string) => getServices().find((s) => s.slug === slug));

export const getSectors = cache((): Sector[] => sectorsData as unknown as Sector[]);
export const getSector = cache((slug: string) => getSectors().find((s) => s.slug === slug));

export const getCities = cache((): City[] => citiesData as unknown as City[]);
export const getCity = cache((slug: string) => getCities().find((c) => c.slug === slug));

export const getFaqGroups = cache((): FaqGroup[] => faqData as unknown as FaqGroup[]);
export const getAllFaqs = cache(() => getFaqGroups().flatMap((g) => g.items));

export const getGuides = cache((): Guide[] => guidesData as unknown as Guide[]);
export const getGuide = cache((slug: string) => getGuides().find((g) => g.slug === slug));

export const getAbout = cache((): About => aboutData as unknown as About);

const media = mediaData as unknown as { images: MediaImage[]; videos: MediaVideo[] };
export const getImages = cache((category?: string) => (category ? media.images.filter((i) => i.category === category) : media.images));
export const getVideos = cache(() => media.videos);

/** Look up an image by key; falls back to a substring match, then to the first lobby photo so a typo never 500s a page. */
export const getImage = cache((key: string): MediaImage => {
  const exact = media.images.find((i) => i.key === key);
  if (exact) return exact;
  const loose = media.images.find((i) => i.key.includes(key) || key.includes(i.key));
  return loose ?? media.images.find((i) => i.category === "lobbies") ?? media.images[0];
});
export const getVideo = cache((key: string | null | undefined): MediaVideo | undefined => (key ? media.videos.find((v) => v.key === key || v.key.includes(key)) : undefined));

/** A poster image for a video: the still whose key shares the most words with the clip. */
export const posterFor = cache((video: MediaVideo): MediaImage => {
  const words = video.key.split("-").filter((w) => w.length > 3);
  let best = media.images[0];
  let score = -1;
  for (const img of media.images) {
    const s = words.filter((w) => img.key.includes(w)).length;
    if (s > score) { score = s; best = img; }
  }
  return best;
});

export const MEDIA_CATEGORIES: { slug: string; label: string }[] = [
  { slug: "lobbies", label: "Lobbies & Atriums" },
  { slug: "malls", label: "Malls & Displays" },
  { slug: "storefronts", label: "Storefronts & Plazas" },
  { slug: "exteriors", label: "Buildings & Courtyards" },
  { slug: "municipal", label: "Streets, Parks & Squares" },
];
