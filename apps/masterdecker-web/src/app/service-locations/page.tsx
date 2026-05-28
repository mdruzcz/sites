import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import locations from "@/content/locations.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/service-locations` },
  title: "Service Locations | Master Decker | Southwestern Ontario",
  description:
    "Master Decker services London, Kitchener, Hamilton, Toronto, Guelph, Niagara Falls and surrounding Southwestern Ontario cities for decks, fences, and concrete work.",
};

const regionBg: Record<string, string> = {
  Toronto: "/images/city-toronto.jpg",
  Guelph: "/images/city-guelph.jpg",
  London: "/images/city-london.jpg",
  Hamilton: "/images/city-hamilton.jpg",
  Kitchener: "/images/city-kitchener.jpg",
  "Niagara Falls": "/images/city-niagara.jpg",
};

export default function ServiceLocationsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Coverage"
          title="Our Service Areas"
          subtitle="Serving Several Areas Across Ontario"
          background="/images/city-toronto.jpg"
          primaryCta={{ label: "Request Quote", href: "/contact" }}
        />

        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="h-display text-3xl md:text-4xl mb-5">We Don&apos;t Charge You For Travel. We Drive To Your Location.</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                Whether you&apos;re in the Toronto, London, Guelph, Kitchener, Niagara Falls, Hamilton or any town in between, we can help with your home projects. See below for some of the areas and cities we service.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {locations.regions.map((r) => (
                <div key={r.name} className="city-card">
                  <div className="city-card-bg" style={{ backgroundImage: `url(${regionBg[r.name] || "/images/deck-bg.jpg"})` }} role="img" aria-label={`${r.name} area`} />
                  <div className="city-card-overlay" />
                  <div className="city-card-content">
                    <div className="city-card-title">{r.name}</div>
                    <p className="city-card-cities">{r.cities.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="h-display text-3xl md:text-4xl mb-3">Our Deck Services are also available in the following surrounding areas:</h2>
            </div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {locations.additional.map((city) => (
                <div key={city} className="bg-white border border-[var(--border)] py-3 px-4 text-center text-sm font-semibold text-[var(--ink)]">{city}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/city-london.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Don&apos;t see your city?</h2>
            <p className="text-white/85 mb-8 text-lg">
              We travel across Southwestern Ontario and beyond. Contact us — we&apos;ll be happy to discuss your project no matter where you are.
            </p>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
