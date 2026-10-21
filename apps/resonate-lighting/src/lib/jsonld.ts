import { site } from "./site";
import type { Kit, Service, Faq } from "./content";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/images/brand/resonate-mark-512.png`,
    image: `${site.url}/images/brand/og-resonate-lighting.png`,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "State", name: "Ontario" },
      ...site.serviceAreas.map((city) => ({ "@type": "City", name: city })),
    ],
    priceRange: "$$$",
    currenciesAccepted: site.currency,
    openingHours: "Mo-Fr 09:00-19:00, Sa 10:00-16:00",
    knowsAbout: [
      "music-reactive lighting",
      "pixel lighting",
      "WS2811",
      "LedFx",
      "Falcon Player",
      "commercial holiday lighting",
      "BIA streetscape lighting",
      "municipal holiday lighting",
    ],
  };
}

export function kitProductSchema(kit: Kit) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${site.name} ${kit.name}`,
    description: kit.summary,
    image: `${site.url}${kit.image}`,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": orgId },
    category: "Music-reactive pixel lighting kit",
    audience: { "@type": "BusinessAudience", audienceType: kit.audience },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Controller", value: kit.controller },
      { "@type": "PropertyValue", name: "Pixel controller", value: kit.pixelController },
      { "@type": "PropertyValue", name: "Microphone", value: kit.mic },
      { "@type": "PropertyValue", name: "Pixels", value: "12 V WS2811" },
      { "@type": "PropertyValue", name: "Software", value: kit.software },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "State", name: "Ontario" },
      url: `${site.url}/contact?kit=${kit.slug}`,
      description: "Quoted per project. Request a quote.",
      seller: { "@id": orgId },
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} — ${site.name}`,
    serviceType: service.title,
    description: service.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "State", name: "Ontario" },
    url: `${site.url}/services#${service.slug}`,
  };
}

export function marketServiceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Music-reactive pixel lighting for ${name}`,
    serviceType: "Commercial lighting design and installation",
    description,
    provider: { "@id": orgId },
    audience: { "@type": "BusinessAudience", audienceType: name },
    areaServed: { "@type": "State", name: "Ontario" },
    url: `${site.url}/${slug}`,
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
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

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": orgId },
    inLanguage: "en-CA",
  };
}
