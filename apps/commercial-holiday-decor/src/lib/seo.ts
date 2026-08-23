import { site } from "@/lib/site";
import { products } from "@/lib/content";

export interface Crumb {
  name: string;
  href: string;
}

/** Resolve a site-relative path to an absolute URL. */
export function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** BreadcrumbList JSON-LD. "Home" is always prepended. */
export function breadcrumbLd(crumbs: Crumb[]) {
  const items = [{ name: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.href)
    }))
  };
}

const ORG_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO = `${site.url}/icon.svg`;
const HERO_IMG = `${site.url}/images/photos/disp-scene-1.webp`;

/**
 * The site-wide knowledge graph — Organization + LocalBusiness + WebSite.
 * Rendered once in the root layout. Rich enough for rich results and for AI
 * search engines to answer "who does commercial Christmas decor in SW Ontario".
 */
export function businessGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        url: site.url,
        logo: { "@type": "ImageObject", url: LOGO, width: 512, height: 512 },
        image: HERO_IMG,
        email: site.email,
        telephone: site.phone,
        slogan: site.tagline,
        areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c }))
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": BUSINESS_ID,
        name: site.name,
        description: site.tagline,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        image: [HERO_IMG, `${site.url}/og.jpg`],
        logo: LOGO,
        priceRange: "$$$",
        currenciesAccepted: "CAD",
        paymentAccepted: "Invoice, Purchase Order, EFT, Cheque",
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country
        },
        geo: { "@type": "GeoCoordinates", latitude: 42.9849, longitude: -81.2453 },
        areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 42.9849, longitude: -81.2453 },
          geoRadius: 160000
        },
        knowsAbout: [
          "Commercial Christmas decor",
          "Municipal holiday lighting",
          "Commercial Christmas trees",
          "Commercial wreaths and garland",
          "Pole-mounted LED motifs",
          "Custom holiday display fabrication"
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00"
          }
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneHref.replace("tel:", ""),
          email: site.email,
          contactType: "sales",
          areaServed: "CA-ON",
          availableLanguage: "English"
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Commercial holiday decor product lines",
          itemListElement: products.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: p.name,
              description: p.summary,
              url: `${site.url}/products/${p.slug}`
            }
          }))
        }
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: "en-CA",
        publisher: { "@id": ORG_ID }
      }
    ]
  };
}
