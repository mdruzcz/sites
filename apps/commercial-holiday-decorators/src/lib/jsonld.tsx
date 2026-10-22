import { site } from "./site";
import type { QA } from "./content";

const OG_IMAGE = `${site.url}/images/gallery/corporate-lobby-christmas-tree-gold-ribbon-01.jpg`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    image: OG_IMAGE,
    logo: `${site.url}/images/logo.png`,
    telephone: site.phone,
    priceRange: "$$$",
    foundingDate: String(site.since),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    url: site.url,
    sameAs: Object.values(site.socials),
    areaServed: [{ "@type": "State", name: "Ontario" }],
    knowsAbout: ["Commercial holiday decorating", "Commercial Christmas light installation", "Lobby Christmas tree rental", "Hotel holiday decor", "Condo lobby decorating", "Shopping centre holiday lighting"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    ],
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; city?: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.type ?? opts.name,
    name: opts.city ? `${opts.name} in ${opts.city}` : opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name, url: site.url, telephone: site.phone },
    areaServed: opts.city ? { "@type": "City", name: opts.city } : { "@type": "State", name: "Ontario" },
    audience: { "@type": "BusinessAudience", name: "Commercial property owners and managers" },
  };
}

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

export function webPageSchema(opts: { name: string; description: string; url: string }) {
  return { "@context": "https://schema.org", "@type": "WebPage", name: opts.name, description: opts.description, url: opts.url, isPartOf: { "@type": "WebSite", name: site.name, url: site.url } };
}

export function articleSchema(opts: { title: string; description: string; url: string; image: string; datePublished: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: `${site.url}${opts.image}`,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` } },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
