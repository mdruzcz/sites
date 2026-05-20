import type { Metadata } from "next";
import Script from "next/script";
import {
  NavBar,
  Hero,
  StatsStrip,
  WhyUs,
  Services,
  Materials,
  Benefits,
  Testimonials,
  FAQ,
  ServiceAreas,
  Contact,
  Footer,
  RelatedTrades,
} from "./_components/sections";

export const metadata: Metadata = {
  title: "London Deck Builder | Expert Deck Building Services in London, Ontario",
  description:
    "London's trusted deck builders. PT, Cedar, Composite & PVC decking with a 5-year workmanship warranty. Free quotes. Serving London, St. Thomas, Woodstock & surrounding areas.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "London Deck Builder | Decks Built to Last",
    description:
      "Premium PT, Cedar, Composite & PVC decks across London, St. Thomas & Woodstock. 5-year workmanship warranty.",
  },
};

export const revalidate = 3600;

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://londondeckbuilder.ca/#business",
  name: "London Deck Builder",
  url: "https://londondeckbuilder.ca",
  telephone: "+1-519-914-1663",
  image: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/IMG-9498-scaled-1-1024x768.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "50432 Yorke Line",
    addressLocality: "Belmont",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 42.882, longitude: -81.083 },
  areaServed: [
    "London, ON",
    "St. Thomas, ON",
    "Woodstock, ON",
    "Strathroy, ON",
    "Ingersoll, ON",
    "Dorchester, ON",
    "Tillsonburg, ON",
    "Aylmer, ON",
    "Lambeth, ON",
    "Komoka, ON",
    "Mount Brydges, ON",
    "Belmont, ON",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://masterdecker.com",
    "https://londonconcreteforming.ca",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Deck Building Services",
    itemListElement: [
      "PT Deck Building",
      "Cedar Deck Building",
      "Composite & PVC Decking",
      "Stairs, Railings & Repairs",
      "Deck Cleaning and Sealing",
      "Deck Permit Assistance",
      "Lighting & Features",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a 500 sq ft deck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a project of that size, it typically takes us 4–8 days, depending on weather conditions and the specific requirements of the design.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer warranties on the decks you build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — London Deck Builder offers a 5-year workmanship warranty on all our decks. Materials typically include manufacturer warranties of 10–25 years.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help obtain the necessary permits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we navigate the permit process for our clients and ensure all builds comply with local regulations. This is included in our full-service offering.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <Script id="ld-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar />
      <Hero />
      <StatsStrip />
      <WhyUs />
      <Services />
      <Materials />
      <Benefits />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <RelatedTrades />
      <Contact />
      <Footer />
    </main>
  );
}
