import { site } from "./site";
import type { Service } from "./content";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    telephone: site.phone,
    url: site.url,
    email: site.email,
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
    openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-14:00",
    priceRange: "$$",
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
      telephone: site.phone,
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

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
