import type { Metadata } from "next";
import { site, faqs } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhyChoose } from "@/components/WhyChoose";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Spotless Deck Staining | Premium Deck & Fence Staining in Kitchener-Waterloo",
  description:
    "Premium deck and fence staining in Kitchener, Waterloo, Cambridge and Guelph. Two-coat penetrating stains, written 2-year warranty, free 24-hour quote.",
  alternates: { canonical: "https://spotlessdeckstaining.ca" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://spotlessdeckstaining.ca/#business",
  name: site.name,
  description:
    "Deck and fence staining, sealing, power washing and restoration for homes across Kitchener, Waterloo, Cambridge and Guelph, Ontario.",
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/images/hero-deck.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kitchener",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "23",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <NavBar />
        <Hero />
        <TrustBar />
        <WhyChoose />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
