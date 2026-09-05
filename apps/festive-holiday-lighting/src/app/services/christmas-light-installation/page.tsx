import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { site, cities } from "@/lib/site";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Classic Christmas Light Installation, Southern Ontario",
  description:
    "Classic Christmas lights installed, maintained, taken down and stored by Festive: C9 rooflines, tree wraps, garland and wreaths for homes and businesses in Hamilton, Burlington, Oakville and across Southern Ontario.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/christmas-light-installation" },
};

const faqs = [
  { q: "What does your Christmas light installation include?", a: "Everything — design consultation, all lights and materials, professional installation, mid-season maintenance check, post-holiday takedown, and organized storage for next year. You don't buy or store a thing." },
  { q: "When should I book my Christmas light installation?", a: "We recommend booking by late September or early October. Our schedule fills fast in October and November. That said, call us even if it's November — we'll do our best to fit you in." },
  { q: "Do I need to supply any lights or materials?", a: "No. We supply all lights, clips, extension cords, timers, and accessories. We use commercial-grade LED products that are far superior to anything at a hardware store." },
  { q: "How long does a Christmas light installation take?", a: "Most residential installations are completed in a single day. Larger homes or commercial projects may take 2 days. We give you a specific timeline in your quote." },
  { q: "What if some lights go out during the season?", a: "We include a mid-season maintenance visit on all installations. If something goes dark, call us and we'll return to fix it within 1-2 business days." },
  { q: "When do you take the lights down?", a: "We schedule takedown after January 6th (Epiphany) or by the date you prefer. Everything is carefully removed, labeled, and stored until next season." },
];

export default function ChristmasLightInstallationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Classic Christmas Light Installation",
    serviceType: "Seasonal Christmas light installation",
    url: "https://festiveholidaylighting.ca/services/christmas-light-installation",
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    areaServed: cities.map(c => ({ "@type": "City", name: c.name })),
    description: "Full-service seasonal Christmas light installation including design, installation, maintenance, takedown, and storage for homes and businesses across Southern Ontario.",
  };

  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` }, { "@type": "ListItem", position: 3, name: "Classic Christmas Lights", item: `${site.url}/services/christmas-light-installation` }] }) }} />
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/60 transition">Services</Link>
            <span>/</span>
            <span className="text-white/60">Classic Christmas Lights</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold-bright)", border: "1px solid rgba(201,168,76,0.3)" }}>
            🎄 Classic Lights · Seasonal Service
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Classic Christmas Light Installation in{" "}
            <span className="text-gradient-gold">Southern Ontario</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
            The traditional look: warm white or multicolour C9 bulbs along the roofline, wrapped trees, garland and wreaths. We design, install, maintain, take down and store it all. Want lights that stay up all year? See our permanent LED systems, or do both.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white min-h-11 hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
              Get a Free Quote <ArrowRightIcon className="w-4 h-4" />
            </a>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/25 hover:bg-white/10 transition min-h-11">
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-5">Everything Included — Nothing For You to Do</h2>
              <p className="text-lg text-white/65 mb-8 leading-relaxed">
                Our complete Christmas light installation service covers every step of the process. From the first design conversation to final takedown, we handle it all.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Custom Design Consultation", body: "We visit your property, assess the architecture, and create a lighting design tailored to your home and budget." },
                  { title: "All Materials Supplied", body: "Commercial-grade LED lights, clips, cords, timers — we bring everything. Nothing for you to buy or store." },
                  { title: "Professional Installation", body: "Insured, WSIB-compliant crew installs safely and efficiently. Most homes done in a single day." },
                  { title: "Mid-Season Maintenance", body: "We check your display mid-season and fix any outages. Your lights stay bright all season long." },
                  { title: "Post-Holiday Takedown", body: "After the holidays, we carefully remove everything and pack it properly for storage." },
                  { title: "Organized Storage", body: "Your lights are stored labeled and organized — ready and waiting for next year." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-sm text-white/55 mt-0.5">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(201,168,76,0.2)" }}>
              <h3 className="font-display text-xl font-bold text-white mb-6">Why Professional Beats DIY</h3>
              <div className="space-y-4">
                {[
                  { pro: "Safe professional installation", diy: "Risky ladder climbs on ice" },
                  { pro: "Commercial-grade LED lights", diy: "Hardware-store lights that die" },
                  { pro: "Custom design for your home", diy: "Same box from last year" },
                  { pro: "Mid-season maintenance included", diy: "Half the display goes dark" },
                  { pro: "Takedown & storage included", diy: "Tangled mess in the garage" },
                  { pro: "Fully insured crew", diy: "Your liability if something goes wrong" },
                ].map((r) => (
                  <div key={r.pro} className="grid grid-cols-2 gap-3 items-start text-sm">
                    <div className="flex items-start gap-2">
                      <span style={{ color: "var(--crimson-bright)" }}>✓</span>
                      <span className="text-white/80">{r.pro}</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/40">
                      <span>✗</span>
                      <span>{r.diy}</span>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-[var(--crimson-bright)] uppercase tracking-wider text-center">Festive</span>
                  <span className="text-xs font-bold text-white/30 uppercase tracking-wider text-center">DIY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <section className="py-14" style={{ backgroundColor: "var(--night)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl border" style={{ backgroundColor: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.25)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--gold-bright)" }}>Classic lights</p>
            <h3 className="font-display text-xl font-bold text-white mb-2">Up in November, down in January</h3>
            <p className="text-sm text-white/60">Traditional C9 bulbs, tree wraps and garland. Fully managed each season, nothing to store.</p>
          </div>
          <Link href="/services/permanent-lighting" className="p-7 rounded-2xl border block hover:bg-white/[0.04] transition" style={{ backgroundColor: "rgba(178,34,34,0.08)", borderColor: "rgba(178,34,34,0.3)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--crimson-bright)" }}>Permanent lights</p>
            <h3 className="font-display text-xl font-bold text-white mb-2">Installed once, any colour all year</h3>
            <p className="text-sm text-white/60">App-controlled RGBW LEDs hidden in the roofline. Christmas, Halloween, Canada Day, game day. See permanent lighting →</p>
          </Link>
        </div>
      </section>

      <CtaBand heading="Ready to Have the Best-Looking Street on the Block?" sub="Book your free quote today — crews are limited and we book up fast every October." />
      <FAQ faqs={faqs} title="Christmas Light Installation FAQ" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
