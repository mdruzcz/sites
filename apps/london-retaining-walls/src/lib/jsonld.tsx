import { site } from "./site";
import type { Faq } from "./content";

const ORG_ID = `${site.url}/#organization`;

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
        "@id": ORG_ID,
        name: site.name,
        url: site.url,
        telephone: "+1-519-914-1908",
        email: site.email,
        image: `${site.url}/images/gallery/curved-segmental-block-retaining-wall-front-yard-garden-01.jpg`,
        logo: `${site.url}/images/logo.png`,
        description: "Owner-led retaining wall contractor building interlocking block, poured concrete, timber and natural stone retaining walls, terracing and repairs across London and Southwestern Ontario.",
        founder: { "@type": "Person", name: site.owner },
        address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        areaServed: site.cities.map((c) => ({ "@type": "City", name: `${c.name}, Ontario` })),
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" }],
        priceRange: "$$",
        knowsAbout: ["retaining walls", "segmental block walls", "poured concrete walls", "timber retaining walls", "armour stone", "retaining wall drainage", "Ontario Building Code retaining wall permits"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Retaining wall services",
          itemListElement: site.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/${s.slug}` } })),
        },
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": ORG_ID }, inLanguage: "en-CA" },
    ],
  };
}

export function serviceSchema(name: string, description: string, url: string, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${name} in ${city}, Ontario` : name,
    description,
    url,
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: city ? { "@type": "City", name: `${city}, Ontario` } : site.cities.map((c) => ({ "@type": "City", name: `${c.name}, Ontario` })),
  };
}

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.href === "/" ? "" : it.href}` })),
});

export const articleSchema = (a: { title: string; description: string; url: string; image: string; published: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  url: a.url,
  image: a.image,
  datePublished: a.published,
  dateModified: a.published,
  author: { "@type": "Organization", "@id": ORG_ID, name: site.name },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: a.url,
  inLanguage: "en-CA",
});

export const JsonLd = ({ data }: { data: object }) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
