import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRightIcon, ShieldIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Municipal & BIA Holiday Lighting Southern Ontario | Streetscape & Public Space Lighting",
  description:
    "Turnkey holiday lighting for municipalities, BIAs, town centres, and public spaces. $5M liability, WSIB compliant, commercial-grade LED. Southern Ontario. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/municipal-bia-lighting" },
};

export default function MunicipalBIAPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-white/60">Services</Link><span>/</span>
            <span className="text-white/60">Municipal & BIA Lighting</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold-bright)", border: "1px solid rgba(201,168,76,0.3)" }}>
            🏙️ Municipal & BIA Service
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Municipal & BIA Holiday Lighting —{" "}
            <span className="text-gradient-gold">Create an Unforgettable Holiday Destination</span>
          </h1>
          <p className="text-xl text-white/70 mb-5">
            Turnkey festive lighting solutions for municipalities, BIAs, commercial properties, and public spaces across Southern Ontario. Fully insured, WSIB-compliant crews with commercial-grade LED products.
          </p>
          <div className="flex items-center gap-6 flex-wrap mb-8 text-sm text-white/60">
            <span>⭐ $5M Liability Insured</span>
            <span>⭐ WSIB Compliant Crews</span>
            <span>⭐ Commercial-Grade LED</span>
            <span>⭐ Boom Trucks Available</span>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
            Request a Municipal Quote <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🏛️", title: "Municipalities", body: "Streetscape lighting, park displays, town hall illumination, and holiday market installations. We coordinate with municipal requirements and timelines." },
              { icon: "🛍️", title: "Business Improvement Areas (BIAs)", body: "District-wide lighting programs that transform entire shopping streets into festive destinations that draw shoppers." },
              { icon: "🌳", title: "Public Spaces & Parks", body: "Tree wrapping, pathway lighting, and landmark illumination that creates community gathering spaces during the holiday season." },
              { icon: "🏢", title: "Commercial Campuses", body: "Multi-building commercial campuses with consistent branding across all properties — managed by one reliable crew." },
              { icon: "🎪", title: "Holiday Markets & Events", body: "Temporary installation for holiday markets, skating rinks, and seasonal events. Full setup, maintenance, and teardown." },
              { icon: "🏨", title: "Hotels & Resorts", body: "Grand entrance displays, courtyard features, and pool/common area lighting that creates the luxury holiday experience." },
            ].map(s => (
              <div key={s.title} className="p-7 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl border flex flex-col sm:flex-row items-center gap-6"
            style={{ background: "linear-gradient(135deg, rgba(178,34,34,0.1), rgba(201,168,76,0.08))", borderColor: "rgba(201,168,76,0.2)" }}>
            <ShieldIcon className="w-12 h-12 text-[var(--gold-bright)] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-display font-bold text-white text-lg mb-1">Fully Compliant for Municipal Work</p>
              <p className="text-white/65">$5M liability insurance, WSIB compliance certificates on request, proof of insurance available for any RFP or tender process. We meet every municipal requirement.</p>
            </div>
            <a href="#contact" className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-white text-sm min-h-11 flex items-center hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
              Request Quote
            </a>
          </div>
        </div>
      </section>

      <CtaBand heading="Make Your Community the Holiday Destination" sub="Municipal and BIA projects require early planning. Contact us now to secure your installation." />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
