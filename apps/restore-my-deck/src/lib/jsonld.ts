import { site } from "./site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: "Professional deck and fence restoration, staining, cleaning, and repair serving Kitchener-Waterloo, Guelph, Hamilton and surrounding areas.",
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    openingHours: "Mo-Fr 08:00-17:00",
    priceRange: "$$",
    sameAs: [],
  };
}

export function serviceSchema(name: string, description: string, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${name} in ${city}` : name,
    description,
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
    areaServed: city
      ? { "@type": "City", name: city }
      : site.serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    serviceType: name,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}
