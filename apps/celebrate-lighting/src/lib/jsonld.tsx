import { site } from "./site";
import type { Service, Testimonial } from "./content";

const OG_IMAGE = `${site.url}/images/gallery/rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home.jpg`;

export function localBusinessSchema(testimonials?: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline,
    image: OG_IMAGE,
    logo: `${site.url}/images/logo.png`,
    priceRange: "$$$",
    foundingDate: "2020",
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
    sameAs: [site.instagram],
    areaServed: site.serviceAreas.map((city) => ({ "@type": "City", name: city })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lighting services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent outdoor LED lighting installation", url: `${site.url}/permanent-lighting` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seasonal C9 Christmas light installation", url: `${site.url}/seasonal-lighting` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial permanent lighting", url: `${site.url}/commercial` } },
        { "@type": "Offer", price: "0", priceCurrency: "CAD", itemOffered: { "@type": "Service", name: "Free on-site lighting demo", url: `${site.url}/contact` } },
        { "@type": "Offer", price: "0", priceCurrency: "CAD", itemOffered: { "@type": "Service", name: "Free AI home lighting preview", url: `${site.url}/ai-preview` } },
      ],
    },
    ...(testimonials && testimonials.length > 0
      ? {
          review: testimonials.map((t) => ({
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5", worstRating: "1" },
            author: { "@type": "Person", name: t.author },
            reviewBody: t.quote,
          })),
        }
      : {}),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "10:00", closes: "16:00" },
    ],
  };
}

export function serviceSchema(service: Service, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: "Permanent Outdoor LED Lighting",
    description: service.shortDescription,
    provider: { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name, url: site.url },
    areaServed: city ? { "@type": "City", name: city } : site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
  };
}

/** Generic Service schema for the line pages (permanent / seasonal / commercial). */
export function lineServiceSchema(input: { name: string; description: string; url: string; serviceType: string; city?: string; priceRange?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: input.url,
    provider: { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name, url: site.url },
    areaServed: input.city ? { "@type": "City", name: input.city, containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } } : site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    ...(input.priceRange ? { offers: { "@type": "Offer", priceCurrency: "CAD", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "CAD", description: input.priceRange } } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
}

export function howToSchema(input: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

export function articleSchema(post: { title: string; description: string; image: string; date: string; url: string; type?: "BlogPosting" | "Article" }) {
  return {
    "@context": "https://schema.org",
    "@type": post.type ?? "Article",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http") ? post.image : `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    url: post.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": post.url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` } },
  };
}

export function reviewsSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: OG_IMAGE,
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: t.author },
      reviewBody: t.quote,
      ...(t.location && { locationCreated: t.location }),
    })),
  };
}

export function imageGallerySchema(images: { url: string; caption: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Permanent lighting installations",
    url: `${site.url}/gallery`,
    image: images.map((i) => ({ "@type": "ImageObject", contentUrl: i.url, caption: i.caption })),
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: { "@id": `${site.url}/#business` },
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
