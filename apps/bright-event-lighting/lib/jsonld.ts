import { site } from "./site";
import type { Service, FAQ, Testimonial, BlogPost, Package, EventType } from "./content";

const provider = {
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
};

const areaServed = (city?: string) =>
  city
    ? { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "Ontario" } }
    : site.serviceAreas.map((c) => ({ "@type": "City", name: c, containedInPlace: { "@type": "State", name: "Ontario" } }));

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    image: `${site.url}/images/og-default.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    address: provider.address,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    ],
    url: site.url,
    description: site.description,
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.googleRating, reviewCount: site.googleReviewCount, bestRating: "5", worstRating: "1" },
    areaServed: areaServed(),
    knowsAbout: [
      "Wedding lighting", "Uplighting", "Edison string lighting", "Tent lighting", "Cold spark machines",
      "Corporate event lighting", "Christmas party decor", "Indoor garlands and wreaths", "Commercial holiday lighting", "Mall holiday decor",
    ],
  };
}

export function serviceSchema(service: Service, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} in ${city}, ON` : service.title,
    description: service.shortDescription,
    serviceType: service.title,
    provider,
    areaServed: areaServed(city),
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: service.startingAt,
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "CAD", minPrice: service.startingAt, description: `Starting at $${service.startingAt} (${service.unit})` },
      availability: "https://schema.org/InStock",
    },
  };
}

export function eventTypeSchema(event: EventType) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: event.title,
    description: event.shortDescription,
    serviceType: event.title,
    provider,
    areaServed: areaServed(),
  };
}

export function packageSchema(pkg: Package, groupTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.name} (${groupTitle})`,
    description: pkg.tagline,
    image: `${site.url}${pkg.image}`,
    brand: { "@type": "Brand", name: site.name },
    offers: pkg.price
      ? { "@type": "Offer", priceCurrency: "CAD", price: pkg.price, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "CAD", minPrice: pkg.price }, availability: "https://schema.org/InStock", seller: provider }
      : { "@type": "Offer", priceCurrency: "CAD", availability: "https://schema.org/InStock", seller: provider },
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/images/og-default.jpg` } },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function faqSchema(faqs: Pick<FAQ, "question" | "answer">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function reviewsSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: "5" },
      reviewBody: t.quote,
    })),
  };
}
