import { site } from "./site";
import { pricing } from "./pricing";
import type { City, Faq, Kit, Service } from "./content";

const orgId = `${site.url}/#organization`;
const canada = { "@type": "Country", name: "Canada" };

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
    address: { "@type": "PostalAddress", addressRegion: site.address.region, addressCountry: site.address.country },
    areaServed: [canada, ...site.serviceAreas.map((city) => ({ "@type": "City", name: city }))],
    priceRange: "$$$$",
    currenciesAccepted: site.currency,
    openingHours: "Mo-Fr 09:00-19:00, Sa 10:00-16:00",
    knowsAbout: [
      "music-reactive lighting",
      "pixel lighting kits",
      "mega tree installation",
      "roofline pixel lighting",
      "commercial holiday lighting",
      "BIA streetscape lighting",
      "municipal holiday lighting",
      "WS2811",
      "LedFx",
      "Raspberry Pi 5",
    ],
  };
}

function offer(price: number, url: string, description: string) {
  return {
    "@type": "Offer",
    price,
    priceCurrency: pricing.currency,
    priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: pricing.currency, valueAddedTaxIncluded: false },
    availability: "https://schema.org/InStock",
    areaServed: canada,
    url,
    description,
    seller: { "@id": orgId },
  };
}

export function kitProductSchema(kit: Kit, includes: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}/kits#${kit.slug}`,
    name: `${site.name} ${kit.name}`,
    description: kit.summary,
    image: `${site.url}/images/brand/og-resonate-lighting.png`,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": orgId },
    category: "Music-reactive pixel lighting kit",
    audience: { "@type": "BusinessAudience", audienceType: kit.audience },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Includes", value: includes.join("; ") },
      { "@type": "PropertyValue", name: "Controller", value: "Raspberry Pi 5 Light Show engine (LedFx + Light Show app)" },
      { "@type": "PropertyValue", name: "Pixels", value: "12 V WS2811" },
      { "@type": "PropertyValue", name: "Software", value: "Lifetime access, updates included" },
    ],
    offers: offer(kit.pkg.price, `${site.url}/kits#${kit.slug}`, `${kit.pkg.priceLabel} ${kit.pkg.price} CAD plus tax; installation extra.`),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} | ${site.name}`,
    serviceType: service.title,
    description: service.description,
    provider: { "@id": orgId },
    areaServed: canada,
    url: `${site.url}/services#${service.slug}`,
  };
}

export function installationServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pixel lighting installation",
    serviceType: "Commercial pixel lighting installation",
    provider: { "@id": orgId },
    areaServed: canada,
    offers: {
      "@type": "Offer",
      priceCurrency: pricing.currency,
      price: pricing.installation.crewDayRate,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: pricing.installation.crewDayRate,
        priceCurrency: pricing.currency,
        unitText: "crew-day",
        valueAddedTaxIncluded: false,
      },
      description: `Per crew-day, plus travel by zone and accommodation on multi-day jobs outside ${pricing.travel.homeRegion}.`,
    },
    url: `${site.url}/pricing#installation`,
  };
}

export function marketServiceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Music-reactive pixel lighting for ${name}`,
    serviceType: "Commercial lighting supply and installation",
    description,
    provider: { "@id": orgId },
    audience: { "@type": "BusinessAudience", audienceType: name },
    areaServed: canada,
    url: `${site.url}/${slug}`,
  };
}

export function citySchemas(city: City) {
  const url = `${site.url}/locations/${city.slug}`;
  const area = {
    "@type": "City",
    name: city.name,
    containedInPlace: { "@type": "AdministrativeArea", name: city.provinceName },
    geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
  };
  const starter = pricing.packages[0];
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#business`,
      name: `${site.name} · ${city.name}`,
      url,
      telephone: site.phone,
      email: site.email,
      image: `${site.url}/images/brand/og-resonate-lighting.png`,
      priceRange: "$$$$",
      parentOrganization: { "@id": orgId },
      address: { "@type": "PostalAddress", addressRegion: site.address.region, addressCountry: site.address.country },
      areaServed: area,
      description: city.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Music-reactive pixel lighting in ${city.name}`,
      serviceType: "Pixel lighting kits and installation",
      provider: { "@id": orgId },
      areaServed: area,
      audience: { "@type": "BusinessAudience", audienceType: "Businesses, BIAs and municipalities" },
      offers: offer(starter.price, url, `Kits ${starter.priceLabel.toLowerCase()} ${starter.price} CAD plus tax; installation in ${city.name} with travel charges.`),
      url,
    },
  ];
}

export function howToSchema(name: string, description: string, steps: { name: string; text: string }[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text, url: `${url}#step-${i + 1}` })),
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
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
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
