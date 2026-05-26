import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { PermanentLightsSection } from "@/components/PermanentLightsSection";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Festive Holiday Lighting | Professional Christmas & Permanent Lighting Southern Ontario",
  description:
    "Southern Ontario's professional holiday lighting company. Seasonal Christmas light installation + permanent LED systems for homes and businesses. Hamilton, Burlington, Oakville & beyond. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://festiveholidaylighting.ca/#business",
  name: site.name,
  description:
    "Professional holiday lighting installation for homes and businesses in Southern Ontario. Seasonal Christmas lighting and permanent LED systems.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamilton",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    "Hamilton", "Burlington", "Oakville", "Mississauga", "Brampton",
    "Milton", "Ancaster", "Grimsby", "St. Catharines", "Niagara Falls",
  ].map((n) => ({ "@type": "City", name: n })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.googleRating,
    reviewCount: site.reviewCount,
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <PermanentLightsSection />
      <WhyChoose />
      <Process />
      <Testimonials />
      <ServiceAreas />
      <CtaBand />
      <FAQ />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
