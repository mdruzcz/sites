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
  title: "Tree Lighting Services Southern Ontario | Christmas Tree Wrapping & Display",
  description:
    "Award-winning tree lighting and Christmas tree wrapping for homes and businesses. Indoor and outdoor. Southern Ontario. Free quote from Festive Holiday Lighting.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/tree-lighting" },
};

export default function TreeLightingPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-white/60">Services</Link><span>/</span>
            <span className="text-white/60">Tree Lighting</span>
          </nav>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Award-Winning Tree Lighting{" "}
            <span className="text-gradient-gold">for Indoor & Outdoor Trees</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Tree lighting is Cameron Blancher's speciality — his clients have won awards for their Christmas tree wraps. From majestic outdoor oaks to lobby Christmas trees, we transform ordinary trees into breathtaking focal points.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
            Book Tree Lighting <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌳", title: "Outdoor Tree Wrapping", body: "Majestic outdoor trees wrapped with LED strings that bring magical dimension and warmth to your yard, driveway, or streetscape. Any size, any species." },
              { icon: "🌲", title: "Christmas Tree Installation", body: "Real and artificial Christmas tree setup, lighting, and decoration for homes and businesses. We handle setup and takedown." },
              { icon: "🌿", title: "Hedge & Shrub Lighting", body: "Transform your hedges, topiaries, and shrubs into glowing focal points. Perfect for driveways and garden beds." },
              { icon: "🏢", title: "Commercial Lobby Trees", body: "Grand lobby Christmas trees for hotels, offices, and retail spaces. We source, deliver, light, and decorate — turnkey." },
              { icon: "🏡", title: "Residential Feature Trees", body: "Your yard's focal tree, wrapped to perfection. We've won awards for single-tree residential displays." },
              { icon: "🎪", title: "Event & Venue Trees", body: "Spectacular tree displays for holiday events, corporate parties, and special occasions. Any size, any location." },
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

      <CtaBand heading="Transform Your Trees Into Magic This Holiday Season" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
