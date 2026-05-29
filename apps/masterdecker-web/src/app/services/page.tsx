import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import services from "@/content/services.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/services` },
  title: "Our Services | Decks, Fences, Concrete | Master Decker",
  description:
    "Full list of Master Decker outdoor services — deck staining, deck building, fence installation, concrete driveways, retaining walls, pergolas, gazebos, and more across Southwestern Ontario.",
};

const categoryBg: Record<string, string> = {
  "staining-sealing": "/images/wp-deck-stained-cedar.jpg",
  "woodwork": "/images/wp-deck-building.jpg",
  "concrete": "/images/wp-stamped-concrete.jpg",
  "landscaping": "/images/wp-backyard-deck.jpg",
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
                    <div className="svc-card-bg" style={{ backgroundImage: `url(${categoryBg[cat.id]})` }} role="img" aria-label={s.title} />
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
