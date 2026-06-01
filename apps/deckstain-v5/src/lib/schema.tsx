import { SITE } from "./site";
import { AREAS } from "./data";

export function Jsonld({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.legalName,
    image: `${SITE.url}/images/after-staining.jpg`,
    "@id": SITE.url,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: SITE.baseCity, addressRegion: "ON", addressCountry: "CA" },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: AREAS.map((a) => ({ "@type": "City", name: a.name })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "16:00" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: SITE.stats.rating, reviewCount: SITE.stats.reviews },
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(name: string, description: string, url: string, areaName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: areaName ? `${name} in ${areaName}, ON` : name,
    description, url,
    provider: { "@type": "HomeAndConstructionBusiness", name: SITE.legalName, telephone: SITE.phone, url: SITE.url },
    areaServed: areaName
      ? { "@type": "City", name: areaName, containedInPlace: { "@type": "State", name: "Ontario" } }
      : AREAS.map((a) => ({ "@type": "City", name: a.name })),
  };
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE.url}${it.url}` })),
  };
}
