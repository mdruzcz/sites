import { site } from "./site";
import type { Service, Faq } from "./content";

const SERVICE_TYPE_MAP: Record<string, string> = {
  "custom-concrete-driveways": "Concrete driveway installation",
  "stamped-patios-walkways": "Stamped concrete patio installation",
  "concrete-repair-resurfacing": "Concrete repair and resurfacing",
  "garage-basement-floors": "Garage and basement floor installation",
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    telephone: "+1-519-878-6735",
    email: site.email,
    url: site.url,
    image: `${site.url}/images/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: "N4G",
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.8625,
      longitude: -80.7283,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Oxford County",
      },
      ...site.serviceAreas.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
    description: site.description,
    openingHours: "Mo-Fr 08:00-17:00",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "27",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jason M." },
        datePublished: "2026-04-10",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "I was dreading the cost of replacing my entire walkway, but the resurfacing option saved me thousands. Looks completely brand new. Professional crew, clean job site, done in a day.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Mark D." },
        datePublished: "2026-03-22",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "Switched from asphalt to concrete after my old driveway kept cracking every spring. Solid crew, fair price, written warranty. Exactly what I wanted.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Emily R." },
        datePublished: "2026-02-14",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "We had a stamped walkway installed this past spring and couldn't be happier. The pattern looks exactly like natural stone and the communication throughout was excellent.",
      },
    ],
  };
}

export function serviceSchema(service: Service, city?: string) {
  const serviceType = SERVICE_TYPE_MAP[service.slug] ?? service.title;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} in ${city}` : service.title,
    serviceType,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: "+1-519-878-6735",
    },
    areaServed: city
      ? [
          { "@type": "City", name: city },
          { "@type": "AdministrativeArea", name: "Oxford County" },
        ]
      : [{ "@type": "AdministrativeArea", name: "Oxford County" }],
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
