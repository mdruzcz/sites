import { site } from "./site";
import { photos } from "./photos";
import { kitArea, kitName, kitPrice, kitSummary, type Kit } from "./content";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineStore"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        description: site.description,
        image: `${site.url}${photos[site.photos.og].src}`,
        areaServed: { "@type": "Country", name: "Canada" },
        ...(site.phone ? { telephone: site.phone } : {}),
        knowsAbout: ["Backyard sport courts", "Modular sport court tiles", "Basketball court kits", "Pickleball court kits", "Multi-sport courts"],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-CA",
        publisher: { "@id": `${site.url}/#organization` },
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

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function kitLd(k: Kit) {
  const price = kitPrice(k);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kitName(k),
    sku: k.code,
    description: kitSummary(k),
    category: "Sport court kits",
    url: abs(`/court-kits/${k.slug}`),
    image: `${site.url}${photos[site.photos.og].src}`,
    brand: { "@type": "Brand", name: site.name },
    width: { "@type": "QuantitativeValue", value: Math.min(k.w, k.d), unitCode: "FOT" },
    depth: { "@type": "QuantitativeValue", value: Math.max(k.w, k.d), unitCode: "FOT" },
    additionalProperty: [{ "@type": "PropertyValue", name: "Coverage", value: `${kitArea(k)} sq ft` }],
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "CAD",
            price,
            availability: "https://schema.org/InStock",
            url: abs(`/court-kits/${k.slug}`),
            seller: { "@id": `${site.url}/#organization` },
          },
        }
      : {}),
  };
}

export function itemListLd(list: Kit[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: kitName(k), url: abs(`/court-kits/${k.slug}`) })),
  };
}
