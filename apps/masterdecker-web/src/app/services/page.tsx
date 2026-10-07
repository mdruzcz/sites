import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import services from "@/content/services.json";
import { imageFor } from "@/lib/service-images";
import main from "@/content/main-content.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/services` },
  title: "Our Services | Decks, Fences, Concrete | Master Decker",
  description:
    "Full list of Master Decker outdoor services — deck staining, deck building, fence installation, concrete driveways, retaining walls, pergolas, gazebos, and more across Southwestern Ontario.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="What We Do"
          title="Premium Outdoor Services"
          subtitle="We are dedicated to providing exceptional service to our clients, offering a wide range of outdoor services to enhance the beauty and functionality of your outdoor spaces."
          background="/images/wp-deck-building.jpg"
          primaryCta={{ label: "Request Quote", href: "/contact" }}
        />

        {/* INTRO */}
        <section className="section bg-white">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow mb-3">One Contractor, Every Trade</p>
              <h2 className="h-display text-3xl md:text-4xl">{main.servicesIntro.heading}</h2>
            </div>
            <div className="prose-md text-center sm:text-left">
              {main.servicesIntro.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {services.categories.map((cat, idx) => (
          <section key={cat.id} className={`section ${idx % 2 === 0 ? "bg-white" : "bg-[var(--surface)] border-y border-[var(--border)]"}`}>
            <div className="container">
              <div className="mb-12 max-w-3xl">
                <p className="eyebrow mb-2">Category</p>
                <h2 className="h-display text-3xl md:text-4xl mb-3">{cat.name}</h2>
                <p className="text-[var(--ink-soft)]">{cat.blurb}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="svc-card" aria-label={s.title}>
                    <div className="svc-card-bg" style={{ backgroundImage: `url(${imageFor(s.slug, cat.id)})` }} role="img" aria-label={s.title} />
                    <div className="svc-card-overlay" />
                    <div className="svc-card-content">
                      <div className="svc-card-title">{s.title}</div>
                      <p className="svc-card-desc">{s.blurb}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* SPECIALIST NETWORK */}
        <section className="section bg-white">
          <div className="container max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="eyebrow mb-3">Our Specialist Network</p>
              <h2 className="h-display text-3xl md:text-4xl mb-4">Dedicated experts across Southwestern Ontario</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">Master Decker is part of a family of specialist sites. For focused, single-trade projects, these dedicated teams may be the perfect fit — and they share our standards for honest pricing and quality work.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Deck Medic", href: "https://deckmedic.ca", note: "Deck restoration & staining" },
                { label: "DeckStain.ca", href: "https://deckstain.ca", note: "Deck & fence staining" },
                { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", note: "Concrete driveways & flatwork" },
                { label: "London Retaining Walls", href: "https://londonretainingwalls.ca", note: "Retaining wall specialists" },
                { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", note: "Fence installation" },
                { label: "HotTubPads.ca", href: "https://hottubpads.ca", note: "Hot tub & spa pads" },
                { label: "TriCity Concrete Sealing", href: "https://tricityconcretesealing.ca", note: "Concrete sealing (KW region)" },
                { label: "Woodstock Deck & Fence", href: "https://woodstockdeckandfence.ca", note: "Decks & fences in Oxford County" },
                { label: "Christmas Lights London", href: "https://christmaslightslondon.ca", note: "Holiday light installation" },
              ].map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-[var(--surface)] border border-[var(--border)] px-5 py-4 hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <span>
                    <span className="block font-bold text-[var(--ink)] text-sm">{s.label}</span>
                    <span className="block text-xs text-[var(--ink-soft)]">{s.note}</span>
                  </span>
                  <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/wp-cedar-deck.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get a FREE Quote</h2>
            <p className="text-white/85 mb-8 text-lg">
              Don&apos;t see your service listed? Get in touch — we tackle a wide range of outdoor projects.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
