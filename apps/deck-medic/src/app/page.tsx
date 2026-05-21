import type { Metadata } from "next";
import Script from "next/script";
import { site, services, cities } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problems } from "@/components/Problems";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
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
  title: "Deck Medic | Professional Deck Restoration & Staining in Toronto",
  description:
    "Toronto's deck restoration and staining specialists. Expert sanding, wood repairs, and premium weather-shield finishes for cedar and pressure-treated decks. Free estimate.",
  alternates: { canonical: "https://deckmedic.ca" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://deckmedic.ca/#business",
  name: site.name,
  description:
    "Professional deck restoration, staining, and wood preservation services in Toronto, Mississauga, Oakville, and Burlington, Ontario.",
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/images/Deck-Medic-Banner.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should I stain my deck in Ontario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Due to our harsh winters and humid summers, we recommend staining horizontal surfaces every 2–3 years and vertical surfaces every 4–5 years.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the deck restoration process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects are completed in 2–3 visits. We first power wash the deck, let it dry for 48–72 hours, then return for sanding and staining.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Deck Medic serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We proudly serve Toronto, Mississauga, Oakville, and Burlington, Ontario.",
      },
    },
    {
      "@type": "Question",
      name: "Does Deck Medic sand before staining?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — always. Sanding opens the wood grain, allowing the stain to penetrate deeper, which prevents peeling and ensures a smoother, longer-lasting finish.",
      },
    },
  ],
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Deck Medic Services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.shortDesc,
      provider: { "@type": "LocalBusiness", name: site.name },
      url: `${site.url}/services/${s.slug}`,
    },
  })),
};

export default function Home() {
  return (
    <>
      <Script id="ld-local" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-services" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
      <main>
        <NavBar />
        <Hero />
        <TrustBar />
        <Problems />
        <Services />
        <WhyUs />
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
