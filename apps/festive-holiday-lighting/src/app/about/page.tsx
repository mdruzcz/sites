import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Festive Holiday Lighting | Cameron Blancher, Southern Ontario",
  description:
    "Meet Cameron Blancher — 10+ years of holiday lighting experience, award-winning displays, and Southern Ontario's most trusted holiday lighting company. Family-owned, fully insured.",
  alternates: { canonical: "https://festiveholidaylighting.ca/about" },
};

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <section className="pt-32 pb-20 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 50%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link>
            <span>/</span>
            <span className="text-white/60">About Us</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            Our Story
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Meet{" "}
            <span className="text-gradient-gold">Cameron Blancher</span>
            <br />& Festive Holiday Lighting
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            A family-run business with over a decade of experience, an award-winning portfolio, and a simple promise: your holidays should be magical — and getting there should be completely stress-free.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white mb-5">A Decade of Illuminating Experience</h2>
              <p className="text-lg text-white/65 leading-relaxed mb-5">
                Cameron Blancher founded Festive Holiday Lighting over 10 years ago out of a genuine passion for the craft. What started as a love for transforming homes during the holiday season grew into one of Southern Ontario's most trusted holiday lighting companies.
              </p>
              <p className="text-lg text-white/65 leading-relaxed mb-5">
                With hands-on expertise in high ladders, JLG and Genie boom trucks, and aerial lifts, Cameron has tackled projects of every scale — from charming bungalows to multi-building commercial campuses. His work has been recognized with awards for Christmas tree wrapping and display design.
              </p>
              <p className="text-lg text-white/65 leading-relaxed">
                Today, Cameron leads every crew personally, maintaining the hands-on quality and attention to detail that has earned Festive Holiday Lighting its 5-star reputation across Southern Ontario.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl border"
                style={{ background: "linear-gradient(135deg, rgba(178,34,34,0.1), rgba(201,168,76,0.08))", borderColor: "rgba(201,168,76,0.2)" }}>
                <h3 className="font-display font-bold text-white text-lg mb-4">By the Numbers</h3>
                {[
                  { number: "10+", label: "Years in business" },
                  { number: "500+", label: "Homes & businesses lit" },
                  { number: "5.0★", label: "Average client rating" },
                  { number: "$5M", label: "Liability coverage" },
                  { number: "10", label: "Cities served" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-sm text-white/65">{s.label}</span>
                    <span className="font-display font-bold text-white">{s.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: "🏆",
                title: "Award-Winning Displays",
                body: "Cameron's clients have won awards for their Christmas tree wraps — a testament to the creativity and craftsmanship that goes into every Festive installation.",
              },
              {
                icon: "🔩",
                title: "Expert Equipment Operator",
                body: "Certified to operate JLG and Genie boom trucks and boom lifts. No roofline is too high, no tree too large, no commercial property too complex.",
              },
              {
                icon: "❤️",
                title: "Family-Run Values",
                body: "Every client is treated like a neighbour. Cameron leads every job personally and takes as much pride in your home's display as if it were his own.",
              },
              {
                icon: "🛡️",
                title: "Safety First, Always",
                body: "WSIB compliant, $5M liability insured, and strict safety protocols on every project. Fully protected — for you and for our crew.",
              },
              {
                icon: "💡",
                title: "Passionate About the Craft",
                body: "10+ years of refining technique, staying current with the latest LED technology, and pushing display design further every season.",
              },
              {
                icon: "🌿",
                title: "Energy-Efficient Systems",
                body: "We use only commercial-grade LED products that use 80% less energy than incandescent lights — bright, beautiful, and better for your electricity bill.",
              },
            ].map(v => (
              <div key={v.title} className="p-7 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-white text-base mb-2">{v.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-white mb-4">Ready to Work Together?</h2>
            <p className="text-lg text-white/60 mb-8">Get your free, no-obligation quote today. Cameron personally reviews every request.</p>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.4)" }}>
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
