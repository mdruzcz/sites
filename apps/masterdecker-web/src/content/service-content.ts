import staining from "./service-content.json";
import woodwork from "./service-content-woodwork.json";
import concrete from "./service-content-concrete.json";
import fencing from "./service-content-fencing.json";

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  lead: string;
  intro: string[];
  sections: { h: string; body: string[] }[];
  includes: string[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceContent: Record<string, ServiceContent> = {
  ...(staining as Record<string, ServiceContent>),
  ...(woodwork as Record<string, ServiceContent>),
  ...(concrete as Record<string, ServiceContent>),
  ...(fencing as Record<string, ServiceContent>),
};

export function contentFor(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
