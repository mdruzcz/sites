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
import { VideoLoop } from "@/components/VideoLoop";
import videos from "@/content/xmas-videos.json";

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

const reel = videos.reel;

const videoObjectSchema = reel && {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Festive Holiday Lighting — Christmas Light Show Highlight Reel",
  description:
    "A highlight reel of Festive Holiday Lighting's Christmas light shows and permanent LED installations across Southern Ontario.",
  thumbnailUrl: `${site.url}${reel.poster}`,
  contentUrl: `${site.url}${reel.src}`,
  uploadDate: "2026-08-25",
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
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
      {videoObjectSchema && (
        <Script
          id="video-object-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
        />
      )}
      <NavBar />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <PermanentLightsSection />
      <WhyChoose />
      <Process />
      <Testimonials />

      {reel && (
        <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
                See Our Work
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Watch the <span className="text-gradient-festive">Light Show</span> in Motion
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Music-synced pixel displays, glowing rooflines, and mega trees lit up across Southern Ontario. Press play and picture it on your home or business.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border gold-glow" style={{ borderColor: "rgba(201,168,76,0.25)" }}>
              <VideoLoop
                src={reel.src}
                poster={reel.poster}
                className="aspect-video w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center mt-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
                style={{
                  background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                  boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
                }}
              >
                Get a Free Quote for Your Display
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      <ServiceAreas />
      <CtaBand />
      <FAQ />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
