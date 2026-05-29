import type { Metadata } from "next";
import Script from "next/script";
import {
  NavBar, Hero, StatsStrip, WhyUs, Services, Materials,
  Process, GalleryPreview, Testimonials, FAQ, ServiceAreas, Contact, Footer,
} from "./_components/sections";

export const metadata: Metadata = {
  title: "Woodstock Deck & Fence | Custom Deck & Fence Builders in Woodstock, ON",
  description:
    "Woodstock's trusted deck and fence contractors. Custom PT, cedar & composite decks plus vinyl, wood & steel fencing. 5-year workmanship warranty. Free quotes in Oxford County.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Woodstock Deck & Fence | Expert Deck & Fence Builders", description: "Custom decks & fences built for Ontario weather. 5-year warranty. Serving Woodstock, Brantford, Cambridge & Oxford County." },
};

export const revalidate = 3600;

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
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
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do I need a permit for a deck or fence in Woodstock?", acceptedAnswer: { "@type": "Answer", text: "Fences generally don't require a permit in Woodstock unless they enclose a pool. Decks over 24 inches high or attached to the house do require a permit. We handle the entire permit application process." } },
    { "@type": "Question", name: "How deep do you dig post holes?", acceptedAnswer: { "@type": "Answer", text: "Every post hole goes a minimum of 4 feet deep — below Ontario's frost line — to prevent leaning and shifting during freeze-thaw cycles." } },
    { "@type": "Question", name: "Do you offer a warranty?", acceptedAnswer: { "@type": "Answer", text: "Yes. We provide a 5-year workmanship warranty on all installations, plus manufacturer warranties on composite and vinyl materials." } },
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
      <Services />
      <WhyUs />
      <Materials />
      <Process />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}
