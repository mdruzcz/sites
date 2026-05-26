import { site } from "./site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lon,
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"],
    areaServed: site.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    hasCredential: site.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert,
    })),
    priceRange: "$$",
    description: site.description,
  };
}

export function serviceSchema(service: { title: string; fullDescription: string; slug: string }, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} in ${city}` : service.title,
    description: service.fullDescription,
    provider: {
      "@type": "HVACBusiness",
      name: site.name,
      url: site.url,
    },
    areaServed: city
      ? { "@type": "City", name: city }
      : site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    url: city
      ? `${site.url}/services/${service.slug}/${city.toLowerCase().replace(/\s+/g, "-")}`
      : `${site.url}/services/${service.slug}`,
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
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

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
