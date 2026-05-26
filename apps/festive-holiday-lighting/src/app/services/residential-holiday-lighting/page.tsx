import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/lib/site";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Residential Holiday Lighting Southern Ontario | Custom Home Christmas Lights",
  description:
    "Custom residential Christmas light installation for homes across Southern Ontario. We design, install, maintain, and store your seasonal display. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/residential-holiday-lighting" },
};

export default function ResidentialPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/60 transition">Services</Link>
            <span>/</span>
            <span className="text-white/60">Residential Holiday Lighting</span>
          </nav>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Residential Holiday Lighting for{" "}
            <span className="text-gradient-gold">Southern Ontario Homes</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Custom-designed Christmas and holiday lighting for homes of every size. Whether you have a cozy bungalow, a century home, or a sprawling new build, we create a display that makes your neighbours stop and stare.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
            Get a Free Residential Quote <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white mb-5">Custom Design for Your Specific Home</h2>
              <p className="text-lg text-white/65 mb-8">
                Every home is different. A Victorian home in Hamilton calls for something very different than a new build in Milton. We design each display to complement your home's specific architecture, colour palette, and your personal taste.
              </p>
              <ul className="space-y-3">
                {[
                  "Free on-site design consultation",
                  "Roofline, eave, and gutter lighting",
                  "Shrub and garden bed wrapping",
                  "Driveway and pathway accent lighting",
                  "Window and door frame lighting",
                  "Colour temperature matched to your home",
                  "White, multicolour, or custom colour schemes",
                  "Commercial-grade LEDs included",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckIcon className="w-4 h-4 text-[var(--crimson-bright)] flex-shrink-0" />
                    <span className="text-sm text-white/75">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold text-white mb-2">🏠 Bungalows & Ranch Homes</h3>
                <p className="text-sm text-white/60">Clean roofline runs with warm or coloured LED strings. Optional bush wrapping and lit pathway accents.</p>
              </div>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold text-white mb-2">🏘️ Two-Storey Family Homes</h3>
                <p className="text-sm text-white/60">Multi-level roofline coverage using our JLG boom trucks for safe installation on upper levels. Dramatic results.</p>
              </div>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold text-white mb-2">🏰 Large Estates & Custom Homes</h3>
                <p className="text-sm text-white/60">Full-property displays including roofline, all trees, pathway lighting, and architectural accents. Award-winning results.</p>
              </div>
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(178,34,34,0.08)", borderColor: "rgba(178,34,34,0.2)" }}>
                <p className="text-sm font-semibold text-[var(--crimson-bright)] mb-1">Also Available: Permanent LED Upgrade</p>
                <p className="text-sm text-white/60">Many residential clients start with seasonal lighting and then upgrade to permanent LED systems. Ask us about both options during your quote.</p>
                <Link href="/services/permanent-lighting" className="text-xs text-[var(--gold-bright)] hover:underline mt-2 inline-block">
                  Learn about permanent lighting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading="Your Home Deserves to Shine This Christmas" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
