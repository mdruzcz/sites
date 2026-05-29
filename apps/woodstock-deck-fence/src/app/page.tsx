import type { Metadata } from "next";
import Script from "next/script";
import {
<<<<<<< HEAD
  NavBar, Hero, StatsStrip, WhyUs, Services, Materials,
  Process, GalleryPreview, Testimonials, FAQ, ServiceAreas, Contact, Footer,
} from "./_components/sections";

export const metadata: Metadata = {
  title: "Woodstock Deck & Fence | Custom Deck & Fence Builders in Woodstock, ON",
  description:
    "Woodstock's trusted deck and fence contractors. Custom PT, cedar & composite decks plus vinyl, wood & steel fencing. 5-year workmanship warranty. Free quotes in Oxford County.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Woodstock Deck & Fence | Expert Deck & Fence Builders", description: "Custom decks & fences built for Ontario weather. 5-year warranty. Serving Woodstock, Brantford, Cambridge & Oxford County." },
=======
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
  title: "Woodstock Deck & Fence | Custom Deck & Fence Building in Woodstock, Ontario",
  description:
    "London's trusted deck builders. PT, Cedar, Composite & PVC decking with a 5-year workmanship warranty. Free quotes. Serving London, St. Thomas, Woodstock & surrounding areas.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Woodstock Deck & Fence | Decks and Fences Built to Last",
    description:
      "Premium PT, Cedar, Composite & PVC decks across London, St. Thomas & Woodstock. 5-year workmanship warranty.",
  },
>>>>>>> origin/main
};

export const revalidate = 3600;

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
<<<<<<< HEAD
  "@id": "https://woodstockdeckandfence.ca/#business",
  name: "Woodstock Deck & Fence",
  url: "https://woodstockdeckandfence.ca",
  telephone: "+1-519-914-5697",
  email: "service@woodstockdeckandfence.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Woodstock",
    addressRegion: "ON",
    addressCountry: "CA",
    postalCode: "N4S",
  },
  geo: { "@type": "GeoCoordinates", latitude: 43.1308, longitude: -80.7468 },
  areaServed: ["Woodstock, ON", "Ingersoll, ON", "Tillsonburg, ON", "Norwich, ON", "Brantford, ON", "Cambridge, ON", "Paris, ON", "Oxford County, ON"],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00", closes: "17:00",
  }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Deck & Fence Services",
    itemListElement: [
      "Custom Deck Building", "Pressure-Treated Deck Construction", "Cedar Deck Building",
      "Composite Deck Installation", "Vinyl Fence Installation", "Wood Fence Building",
      "Ornamental Steel Fencing", "Chain-Link Fencing", "Deck Restoration & Staining",
      "Pergola & Gazebo Construction",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
=======
  "@id": "https://londondeckbuilder.ca/#business",
  name: "Woodstock Deck and Fence",
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
>>>>>>> origin/main
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
<<<<<<< HEAD
    { "@type": "Question", name: "Do I need a permit for a deck or fence in Woodstock?", acceptedAnswer: { "@type": "Answer", text: "Fences generally don't require a permit in Woodstock unless they enclose a pool. Decks over 24 inches high or attached to the house do require a permit. We handle the entire permit application process." } },
    { "@type": "Question", name: "How deep do you dig post holes?", acceptedAnswer: { "@type": "Answer", text: "Every post hole goes a minimum of 4 feet deep — below Ontario's frost line — to prevent leaning and shifting during freeze-thaw cycles." } },
    { "@type": "Question", name: "Do you offer a warranty?", acceptedAnswer: { "@type": "Answer", text: "Yes. We provide a 5-year workmanship warranty on all installations, plus manufacturer warranties on composite and vinyl materials." } },
=======
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
        text: "Yes — Woodstock Deck and Fence offers a 5-year workmanship warranty on all our decks. Materials typically include manufacturer warranties of 10–25 years.",
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
>>>>>>> origin/main
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
<<<<<<< HEAD
      <Services />
      <WhyUs />
      <Materials />
      <Process />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
=======
      <WhyUs />
      <Services />
      <Materials />
      <Benefits />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <RelatedTrades />
>>>>>>> origin/main
      <Contact />
      <Footer />
    </main>
  );
}
