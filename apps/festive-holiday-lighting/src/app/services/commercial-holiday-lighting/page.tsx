import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Commercial Holiday Lighting Southern Ontario | Business Christmas Lights",
  description:
    "Commercial holiday lighting for storefronts, offices, plazas, and businesses across Southern Ontario. Attract customers, boost foot traffic, create a festive atmosphere. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/commercial-holiday-lighting" },
};

export default function CommercialLightingPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-white/60">Services</Link><span>/</span>
            <span className="text-white/60">Commercial Holiday Lighting</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold-bright)", border: "1px solid rgba(201,168,76,0.3)" }}>
            🏢 Commercial Service
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Commercial Holiday Lighting That{" "}
            <span className="text-gradient-gold">Drives Foot Traffic</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Make your business impossible to ignore this holiday season. A professionally lit storefront, plaza, or office building creates the festive atmosphere customers are looking for — and keeps them coming back.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
            Get a Commercial Quote <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white mb-5">Who We Serve</h2>
              <div className="space-y-4">
                {[
                  { type: "Retail Storefronts", desc: "Window displays, entrance lighting, and exterior roofline treatments that stop shoppers in their tracks." },
                  { type: "Shopping Plazas & Strip Malls", desc: "Full-plaza lighting programs that create a unified festive look and drive shopping traffic." },
                  { type: "Office Buildings", desc: "Professional exterior lighting that impresses clients and lifts team morale all season." },
                  { type: "Restaurants & Hospitality", desc: "Create the warm, inviting atmosphere that fills tables during the holiday season." },
                  { type: "Hotels & Event Venues", desc: "Grand entrance lighting, courtyard trees, and lobby displays that wow every guest." },
                  { type: "Car Dealerships", desc: "Lot-wide lighting that makes your inventory sparkle and your dealership stand out on the road." },
                ].map(s => (
                  <div key={s.type} className="flex gap-4 p-4 rounded-xl border"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <CheckIcon className="w-5 h-5 text-[var(--crimson-bright)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-sm">{s.type}</p>
                      <p className="text-sm text-white/55 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white mb-5">Commercial Advantages</h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "📈", title: "Proven ROI", body: "Festive businesses attract more foot traffic. A well-lit storefront is a marketing investment that pays back during the highest-spending season of the year." },
                  { icon: "🚛", title: "Commercial Equipment", body: "We use JLG and Genie boom trucks for commercial properties. No roofline is too high, no project too large for our fully equipped crew." },
                  { icon: "🛡️", title: "Liability Protected", body: "Our $5M liability insurance and WSIB-compliant crews mean zero risk to your property or business." },
                  { icon: "📅", title: "Season-Long Management", body: "We check and maintain your display throughout the season so it looks perfect from opening day through New Year's." },
                ].map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{f.title}</p>
                      <p className="text-sm text-white/60">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl border" style={{ borderColor: "rgba(178,34,34,0.25)", backgroundColor: "rgba(178,34,34,0.08)" }}>
                <p className="font-semibold text-white mb-1">Also Available: Permanent Commercial Systems</p>
                <p className="text-sm text-white/60 mb-2">Many commercial clients upgrade to permanent LED systems — installed once, year-round control for every occasion with no seasonal logistics.</p>
                <Link href="/services/permanent-lighting" className="text-xs text-[var(--gold-bright)] hover:underline">
                  Learn about permanent commercial lighting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand heading="Give Your Business the Holiday Edge It Deserves" sub="Commercial spots book out in October. Reserve your installation today." />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
