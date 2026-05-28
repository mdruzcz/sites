import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { site } from "@/lib/site";
import locations from "@/content/locations.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/service-locations` },
  title: "Service Locations | Master Decker | Southwestern Ontario",
  description:
    "Master Decker services London, Kitchener, Hamilton, Toronto, Guelph, Niagara Falls and surrounding Southwestern Ontario cities for decks, fences, and concrete work.",
};

export default function ServiceLocationsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--accent-dark)] text-white">
          <div className="container section text-center">
            <p className="eyebrow text-[var(--accent-light)] mb-3">Coverage</p>
            <h1 className="h-display text-4xl md:text-5xl mb-5">Our Service Areas</h1>
            <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
              Serving Several Areas Across Ontario
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="h-display text-3xl md:text-4xl mb-5">We Don&apos;t Charge You For Travel. We Drive To Your Location</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                Whether you&apos;re in the Toronto, London, Guelph, Kitchener, Niagara Falls, Hamilton or any town in between, we can help with your home projects. See below for some of the areas and cities we service.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locations.regions.map((r) => (
                <div key={r.name} className="bg-[var(--surface)] rounded p-7 border border-[var(--border)] text-center">
                  <h3 className="font-bold text-2xl text-[var(--accent)] mb-3">{r.name}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{r.cities.join(", ")}</p>
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
                <div key={city} className="bg-white rounded border border-[var(--border)] py-3 px-4 text-center text-sm font-semibold text-[var(--ink)]">{city}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--accent-dark)] text-white text-center">
          <div className="container max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Don&apos;t see your city?</h2>
            <p className="text-white/80 mb-8 text-lg">
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
