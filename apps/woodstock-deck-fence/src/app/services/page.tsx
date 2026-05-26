import type { Metadata } from "next";
import { NavBar, Services, Materials, Testimonials, ServiceAreas, Contact, Footer } from "../_components/sections";

export const metadata: Metadata = {
  title: "Deck & Fence Services Woodstock Ontario | Woodstock Deck & Fence",
  description: "Full deck and fence services in Woodstock, ON. Deck building, fence installation, deck restoration, pergolas and outdoor structures. PT, cedar, composite, vinyl, wood and steel.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Deck & Fence Services | Woodstock Deck & Fence", description: "Custom decks and fences in Woodstock and Oxford County." },
};

export const revalidate = 3600;

export default function ServicesPage() {
  return (
    <main>
      <NavBar homeHref="/" />
      <section className="pt-32 pb-12 lg:pt-40" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>What We Do</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">Deck &amp; Fence Services in Woodstock</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Premium outdoor structures built for the Ontario climate — with a 5-year workmanship warranty and permits handled from start to finish.</p>
        </div>
      </section>
      <Services />
      <Materials />
      <Testimonials />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}
