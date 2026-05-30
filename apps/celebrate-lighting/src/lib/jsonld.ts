import { site } from "./site";
import type { Service, Testimonial } from "./content";

export function localBusinessSchema(testimonials?: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/hero-main.jpg`,
    logo: `${site.url}/images/logo.png`,
    priceRange: "$$$",
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "5" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    url: site.url,
    sameAs: [site.instagram],
    areaServed: site.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "27",
      bestRating: "5",
      worstRating: "1",
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
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "20:00" },
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
    areaServed: city
      ? { "@type": "City", name: city }
      : site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
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

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` },
    },
  };
}

export function reviewsSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/images/hero-main.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "27",
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: t.author },
      reviewBody: t.quote,
      ...(t.location && { locationCreated: t.location }),
    })),
  };
}
