import { site } from "./site";
import { kitArea, kitName, kitSummary, kits, lowestPrice, type Guide, type Kit } from "./content";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const ORG = { "@id": `${site.url}/#organization` };

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineStore"],
        "@id": ORG["@id"],
        name: site.name,
        url: site.url,
        description: site.description,
        logo: `${site.url}/icon.svg`,
        image: `${site.url}/og.jpg`,
        areaServed: { "@type": "Country", name: "Canada" },
        ...(site.phone ? { telephone: site.phone } : {}),
        knowsAbout: ["Backyard sport courts", "Modular sport court tiles", "Basketball court kits", "Pickleball court kits", "Multi-sport courts", "Tennis court resurfacing", "Shuffleboard courts"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Court kits",
          numberOfItems: kits.length,
          itemListElement: kits.map((k) => ({ "@type": "Offer", name: kitName(k), price: k.price, priceCurrency: "CAD", url: abs(`/court-kits/${k.slug}`) })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-CA",
        publisher: ORG,
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function kitLd(k: Kit) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kitName(k),
    sku: k.code,
    mpn: k.code,
    description: kitSummary(k),
    category: "Sport court kits",
    url: abs(`/court-kits/${k.slug}`),
    image: `${site.url}/court-kits/${k.slug}/opengraph-image`,
    brand: { "@type": "Brand", name: site.name },
    width: { "@type": "QuantitativeValue", value: Math.min(k.w, k.d), unitCode: "FOT" },
    depth: { "@type": "QuantitativeValue", value: Math.max(k.w, k.d), unitCode: "FOT" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Coverage", value: `${kitArea(k)} sq ft` },
      { "@type": "PropertyValue", name: "Price per square foot", value: `${(k.price / kitArea(k)).toFixed(2)} CAD` },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: k.price,
      // Kits are produced in the buyer's colours after the layout is approved.
      availability: "https://schema.org/MadeToOrder",
      itemCondition: "https://schema.org/NewCondition",
      url: abs(`/court-kits/${k.slug}`),
      seller: ORG,
      eligibleRegion: { "@type": "Country", name: "CA" },
    },
  };
}

export function itemListLd(list: Kit[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: kitName(k), url: abs(`/court-kits/${k.slug}`) })),
  };
}

/** Price range across a set of kits, for sport and listing pages. */
export function aggregateOfferLd(name: string, path: string, list: Kit[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    url: abs(path),
    image: `${site.url}/og.jpg`,
    description: `${name} in modular sport tile from ${site.name}.`,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: lowestPrice(list),
      highPrice: Math.max(...list.map((k) => k.price)),
      offerCount: list.length,
    },
  };
}

export function articleLd(g: Guide, modified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.metaDescription,
    image: `${site.url}/og.jpg`,
    mainEntityOfPage: abs(`/guides/${g.slug}`),
    author: ORG,
    publisher: ORG,
    datePublished: modified,
    dateModified: modified,
    inLanguage: "en-CA",
  };
}

export function howToLd(name: string, description: string, steps: readonly { title: string; body: readonly string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title.replace(/^\d+\.\s*/, ""), text: s.body.join(" ") })),
  };
}
