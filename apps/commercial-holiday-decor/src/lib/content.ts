import productsJson from "@/content/products.json";
import servicesJson from "@/content/services.json";
import areasJson from "@/content/service-areas.json";
import faqsJson from "@/content/faqs.json";
import type { PhotoKey } from "@/lib/photos";

export interface ProductLine {
  slug: string;
  name: string;
  headline: string;
  eyebrow: string;
  photo: string;
  scenePhoto: PhotoKey;
  summary: string;
  intro: string;
  specs: [string, string][];
  items: { name: string; detail: string; photo?: string }[];
}
export interface Service { slug: string; name: string; summary: string; detail: string }
export interface ServiceArea { slug: string; name: string; blurb: string }
export interface Faq { category: string; q: string; a: string }

export const products = productsJson as ProductLine[];
export const services = servicesJson as Service[];
export const serviceAreas = areasJson as ServiceArea[];
export const faqs = faqsJson as Faq[];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getArea = (slug: string) => serviceAreas.find((a) => a.slug === slug);

/** FAQs grouped in the order the categories first appear. */
export function faqsByCategory(): { category: string; items: Faq[] }[] {
  const order: string[] = [];
  const map = new Map<string, Faq[]>();
  for (const f of faqs) {
    if (!map.has(f.category)) { map.set(f.category, []); order.push(f.category); }
    map.get(f.category)!.push(f);
  }
  return order.map((c) => ({ category: c, items: map.get(c)! }));
}
