import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import locations from "@/content/locations.json";
import main from "@/content/main-content.json";

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
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="h-display text-3xl md:text-4xl mb-5">We Don&apos;t Charge You For Travel. We Drive To Your Location.</h2>
              </div>
              <div className="prose-md text-center sm:text-left">
                {main.locations.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
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

        {/* REGIONAL DETAIL */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Areas We Serve</p>
              <h2 className="h-display text-3xl md:text-4xl">Decks, fences &amp; concrete across the region</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {([
                ["London & Area", main.locations.regions.London, "/images/city-london.jpg"],
                ["Kitchener-Waterloo & Guelph", main.locations.regions.Kitchener, "/images/city-kitchener.jpg"],
                ["Hamilton & Brantford", main.locations.regions.Hamilton, "/images/city-hamilton.jpg"],
                ["Greater Toronto Area", main.locations.regions.Toronto, "/images/city-toronto.jpg"],
              ] as const).map(([name, copy, img]) => (
                <div key={name} className="bg-white border border-[var(--border)] overflow-hidden">
                  <div className="relative h-40">
                    <Image src={img} alt={`${name} — Master Decker service area`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-xl">{name}</h3>
                  </div>
                  <p className="p-6 text-sm text-[var(--ink-soft)] leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="h-display text-3xl md:text-4xl mb-3">Our services are also available in the following surrounding areas:</h2>
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
