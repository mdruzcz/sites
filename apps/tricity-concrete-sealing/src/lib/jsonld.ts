import { site } from "./site";
import type { Service, Faq } from "./content";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    email: site.email,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    description: site.description,
    openingHours: "Mo-Fr 08:00-17:00",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Concrete Sealing Services",
    },
  };
}

export function serviceSchema(service: Service, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} in ${city}` : service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
    },
    ...(city && { areaServed: { "@type": "City", name: city } }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
