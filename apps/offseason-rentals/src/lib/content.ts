import audiencesJson from "@/content/audiences.json";
import citiesJson from "@/content/cities.json";
import amenitiesJson from "@/content/amenities.json";
import faqsJson from "@/content/faqs.json";

export interface Audience {
  slug: string;
  label: string;
  short: string;
  icon: string;
  headline: string;
  intro: string;
  why: string[];
  meta: string;
}

export interface City {
  slug: string;
  name: string;
  isHome: boolean;
  minutes: number;
  km: number;
  headline: string;
  intro: string;
  body: string;
  anchors: string[];
  why: string[];
  meta: string;
}

export interface Amenity {
  slug: string;
  label: string;
  group: string;
  icon: string;
}

export interface Faq {
  audience: "renter" | "owner";
  q: string;
  a: string;
}

export const audiences: Audience[] = audiencesJson as Audience[];
export const cities: City[] = citiesJson as City[];
export const amenities: Amenity[] = amenitiesJson as Amenity[];
export const faqs: Faq[] = faqsJson as Faq[];

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug);
}

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Amenity slugs resolved to their labels, unknown slugs passed through. */
export function amenityLabels(slugs: string[]): Amenity[] {
  return slugs.map(
    (slug) =>
      amenities.find((a) => a.slug === slug) ?? {
        slug,
        label: slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
        group: "Other",
        icon: "check"
      }
  );
}

/** Amenities bucketed by their display group, in catalogue order. */
export function groupAmenities(slugs: string[]): { group: string; items: Amenity[] }[] {
  const resolved = amenityLabels(slugs);
  const order: string[] = [];
  const map = new Map<string, Amenity[]>();
  for (const a of resolved) {
    if (!map.has(a.group)) {
      map.set(a.group, []);
      order.push(a.group);
    }
    map.get(a.group)!.push(a);
  }
  return order.map((group) => ({ group, items: map.get(group)! }));
}

export const renterFaqs = faqs.filter((f) => f.audience === "renter");
export const ownerFaqs = faqs.filter((f) => f.audience === "owner");
