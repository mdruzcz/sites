import { site } from "@/lib/site";
import { amenityLabels, cities, type Faq } from "@/lib/content";
import { fullAddress } from "@/lib/format";
import type { Property } from "@/lib/types";

export interface Crumb {
  name: string;
  href: string;
}

/** Resolve a site-relative path to an absolute URL. */
export function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

const ORG_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO = `${site.url}/icon.svg`;
const OG = `${site.url}/og.jpg`;

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

/**
 * The site-wide knowledge graph — Organization + LodgingBusiness + WebSite.
 * Rendered once in the root layout. Rich enough that an AI search engine can
 * answer "who rents Port Stanley cottages in the winter" without guessing.
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
        image: OG,
        email: site.email,
        telephone: site.phone,
        slogan: site.tagline,
        areaServed: cities.map((c) => ({ "@type": "City", name: c.name, address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" } }))
      },
      {
        "@type": ["LodgingBusiness", "RealEstateAgent"],
        "@id": BUSINESS_ID,
        name: site.name,
        description: site.tagline,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        image: [OG],
        logo: LOGO,
        priceRange: "$$",
        currenciesAccepted: "CAD",
        paymentAccepted: "E-transfer, Cheque, Credit Card",
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude
        },
        areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: site.geo.latitude,
            longitude: site.geo.longitude
          },
          geoRadius: 45000
        },
        knowsAbout: [
          "Off-season cottage rentals",
          "Winter monthly rentals Port Stanley",
          "Furnished mid-term rentals Elgin County",
          "Travel nurse housing St. Thomas",
          "Insurance and renovation displacement housing",
          "Lake Erie vacation property management"
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "19:00"
          }
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneHref.replace("tel:", ""),
          email: site.email,
          contactType: "reservations",
          areaServed: "CA-ON",
          availableLanguage: "English"
        }
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: "en-CA",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/rentals?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}

/**
 * VacationRental JSON-LD for one listing.
 *
 * Google's vacation-rental rich result wants the accommodation facts
 * (bedrooms, bathrooms, occupancy, amenities) plus a priced Offer. The
 * monthly rate is expressed as a UnitPriceSpecification so the "per month"
 * part survives into the SERP rather than reading as a nightly price.
 */
export function propertyLd(p: Property) {
  const images = p.photos.length ? p.photos.slice(0, 12).map((ph) => abs(ph.url)) : [OG];
  const url = abs(`/rentals/${p.slug}`);

  const offers: Record<string, unknown>[] = [];
  if (p.monthly_rate) {
    offers.push({
      "@type": "Offer",
      url,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      businessFunction: "https://purl.org/goodrelations/v1#LeaseOut",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.monthly_rate,
        priceCurrency: "CAD",
        unitCode: "MON",
        unitText: "month",
        description: p.utilities_included ? "Monthly off-season rate, utilities included" : "Monthly off-season rate"
      },
      eligibleDuration: {
        "@type": "QuantitativeValue",
        minValue: p.min_stay_nights,
        unitCode: "DAY"
      }
    });
  }
  if (p.weekly_rate) {
    offers.push({
      "@type": "Offer",
      url,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.weekly_rate,
        priceCurrency: "CAD",
        unitCode: "WEE",
        unitText: "week"
      }
    });
  }

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${url}#accommodation`,
    name: `${p.name} — ${p.city}, ${p.region}`,
    description: p.summary,
    url,
    image: images,
    identifier: p.slug,
    accommodationCategory: p.property_type,
    numberOfBedrooms: p.bedrooms,
    numberOfBathroomsTotal: p.bathrooms,
    numberOfRooms: p.bedrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: p.sleeps, unitText: "guests" },
    petsAllowed: p.pets_allowed,
    smokingAllowed: p.smoking_allowed,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.unit ? `${p.street_address} ${p.unit}` : p.street_address,
      addressLocality: p.city,
      addressRegion: p.region,
      postalCode: p.postal_code ?? undefined,
      addressCountry: p.country || "CA"
    },
    containsPlace: {
      "@type": "Accommodation",
      occupancy: { "@type": "QuantitativeValue", maxValue: p.sleeps },
      numberOfBedrooms: p.bedrooms,
      numberOfBathroomsTotal: p.bathrooms
    },
    amenityFeature: amenityLabels(p.amenities).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
      value: true
    })),
    provider: { "@id": BUSINESS_ID },
    isPartOf: { "@id": WEBSITE_ID }
  };

  if (p.beds) node.numberOfBeds = p.beds;
  if (p.latitude && p.longitude) {
    node.geo = { "@type": "GeoCoordinates", latitude: p.latitude, longitude: p.longitude };
  }
  if (p.square_feet) {
    node.floorSize = { "@type": "QuantitativeValue", value: p.square_feet, unitCode: "FTK" };
  }
  if (offers.length) node.offers = offers;

  return node;
}

/** ItemList for a listings index — helps Google understand the collection. */
export function propertyListLd(properties: Property[], listName: string, listUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: abs(listUrl),
    numberOfItems: properties.length,
    itemListElement: properties.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/rentals/${p.slug}`),
      name: `${p.name} — ${fullAddress(p)}`
    }))
  };
}

/** FAQPage JSON-LD from any subset of the FAQ content. */
export function faqLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}

/** A plain WebPage node — used on thin utility pages so nothing is unlabelled. */
export function webPageLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    inLanguage: "en-CA"
  };
}
