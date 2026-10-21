import { cache } from "react";
import kitsData from "@/content/kits.json";
import servicesData from "@/content/services.json";
import marketsData from "@/content/markets.json";
import faqsData from "@/content/faqs.json";
import galleryData from "@/content/gallery.json";
import citiesData from "@/content/cities.json";
import { formatCad, getPackage, pricing, type PackageDef } from "./pricing";

export type Kit = (typeof kitsData)[number] & { pkg: PackageDef };
export type Service = (typeof servicesData)[number];
export type Market = (typeof marketsData)[number];
export type Faq = { question: string; answer: string; category?: string };
export type GalleryItem = (typeof galleryData)[number];
export type City = (typeof citiesData)[number];

export const getKits = cache((): Kit[] => kitsData.map((k) => ({ ...k, pkg: getPackage(k.slug)! })));
export const getServices = cache(() => servicesData);
export const getMarkets = cache(() => marketsData);
export const getGallery = cache(() => galleryData);
export const getCities = cache(() => citiesData);

export const getKitBySlug = cache((slug: string) => getKits().find((k) => k.slug === slug));
export const getMarketBySlug = cache((slug: string) => marketsData.find((m) => m.slug === slug));
export const getCityBySlug = cache((slug: string) => citiesData.find((c) => c.slug === slug));

/** FAQ answers that quote prices are written from the pricing config so they never drift. */
export function pricingFaqs(): Faq[] {
  const pk = pricing.packages.map((p) => `${p.fullName} ${p.priceLabel.toLowerCase()} ${formatCad(p.price)}`).join("; ");
  const z = pricing.travel.zones;
  const inst = pricing.installation;
  return [
    {
      category: "Pricing",
      question: "How much does a kit cost?",
      answer: `Starting prices in Canadian dollars, plus applicable taxes, with installation extra: ${pk}. Every kit includes the control system and lifetime software access. The budget planner on our pricing page builds an itemised estimate for any layout.`,
    },
    {
      category: "Pricing",
      question: "How is installation priced?",
      answer: `Installation is billed by the crew-day at ${formatCad(inst.crewDayRate)} per day for a ${inst.crewLabel}. Travel is by zone: no trip fee in ${pricing.travel.homeRegion}, our home region (mileage beyond ${pricing.travel.homeFreeRadiusKm} km of our base); ${z.prairies.name} ${formatCad(z.prairies.tripFee)}, ${z.national.name} ${formatCad(z.national.tripFee)}, ${z.east.name} ${formatCad(z.east.tripFee)} and ${z.north.name} from ${formatCad(z.north.tripFee)} per crew trip. Multi-day jobs outside ${pricing.travel.homeRegion} add accommodation per crew-night, from ${formatCad(z.prairies.accommodationPerNight)}.`,
    },
  ];
}

export const getFaqs = cache((): Faq[] => {
  const all: Faq[] = [...faqsData];
  const at = all.findIndex((f) => f.category === "Pricing");
  all.splice(at < 0 ? all.length : at, 0, ...pricingFaqs());
  return all;
});
