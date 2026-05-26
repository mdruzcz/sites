import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Interior Holiday Decorating Services Southern Ontario | Office & Lobby Decor",
  description:
    "Professional interior holiday decorating for offices, lobbies, retail spaces, and event venues. Southern Ontario. Transform your indoor spaces for the holiday season. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/interior-holiday-decorating" },
};

export default function InteriorDecoratingPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-white/60">Services</Link><span>/</span>
            <span className="text-white/60">Interior Holiday Decorating</span>
          </nav>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Interior Holiday Decorating —{" "}
            <span className="text-gradient-gold">Transform Your Indoor Spaces</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Holiday magic isn't just for the outside. We transform lobbies, offices, retail floors, event venues, and reception areas with stunning interior holiday décor that impresses clients and creates a warm, festive atmosphere your team will love.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
            Book Interior Decorating <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏢", title: "Corporate Lobbies", body: "Grand lobby Christmas trees, garland installations, and ambient LED lighting that makes a powerful first impression on every client who walks in." },
              { icon: "🛍️", title: "Retail Spaces", body: "Window displays, interior décor, and ambient lighting that creates the festive shopping atmosphere customers love." },
              { icon: "🍽️", title: "Restaurants & Bars", body: "Warm, intimate holiday décor that fills seats and creates memorable dining experiences." },
              { icon: "🏨", title: "Hotels & Conference Centres", body: "Lobby trees, corridor décor, and event space transformations for the full holiday experience." },
              { icon: "🏠", title: "Residential Interiors", body: "Let us decorate your home's interior for the holidays — living room, staircase, fireplace mantel, and dining room." },
              { icon: "🎊", title: "Event Venues", body: "Complete holiday transformation for holiday parties, corporate events, and seasonal celebrations." },
            ].map(s => (
              <div key={s.title} className="p-7 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Bring the Holiday Spirit Inside This Season" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
