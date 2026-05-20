import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhyChoose } from "@/components/WhyChoose";
import { SmartControl } from "@/components/SmartControl";
import { ColorShowcase } from "@/components/ColorShowcase";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { UseCases } from "@/components/UseCases";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Halton Glow Lighting | Permanent Outdoor LED Lighting in Burlington & Oakville",
  description:
    "Burlington & Oakville's permanent outdoor LED lighting experts. App-controlled, weatherproof, 50,000-hour LEDs. Lifetime warranty. Free consultation today.",
  alternates: { canonical: "https://haltonglowlighting.ca" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://haltonglowlighting.ca/#business",
  name: site.name,
  description:
    "Permanent outdoor LED lighting installation for homes and businesses in Burlington and Oakville, Ontario.",
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/images/uploads/blue-led-house-app.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "12",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a permanent outdoor lighting system cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing varies based on your home's size, complexity, and specific requirements. Most residential installations range from $2,500 to $8,000. We provide detailed, transparent quotes with no hidden fees during your free consultation.",
      },
    },
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We proudly serve Burlington and Oakville, Ontario, along with surrounding Halton Region communities including Milton, Hamilton and Mississauga.",
      },
    },
    {
      "@type": "Question",
      name: "How do I control the lights?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your permanent lighting system comes with a user-friendly mobile app that allows you to control colors, brightness, patterns, and schedules from anywhere. You can also set up automated schedules for holidays and special occasions.",
      },
    },
    {
      "@type": "Question",
      name: "How long do the LED lights last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our commercial-grade LED lights are rated for 50,000+ hours of use, which translates to decades of normal residential use. They're designed to withstand Canadian weather conditions including extreme cold, heat, and UV exposure.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <NavBar />
        <Hero />
        <TrustBar />
        <WhyChoose />
        <SmartControl />
        <ColorShowcase />
        <Process />
        <Gallery />
        <UseCases />
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
