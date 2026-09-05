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
import { CheckIcon, ArrowRightIcon, SmartphoneIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Permanent Outdoor LED Lighting Southern Ontario | App-Controlled Year-Round Lights",
  description:
    "Permanent RGBW LED roofline lighting for homes and businesses. Install once, celebrate every occasion forever — Christmas, Halloween, birthdays, any holiday. Southern Ontario. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/permanent-lighting" },
};

const faqs = [
  { q: "What is permanent holiday lighting?", a: "Permanent lighting is a system of RGBW (red, green, blue, white) LED lights installed permanently into your roofline, soffits, or fascia. Unlike seasonal lights that go up and come down each year, permanent lights stay in place and are controlled by a phone app. You can change colours, patterns, and schedules for any occasion — Christmas, Halloween, birthdays, playoffs, or any event." },
  { q: "How much does permanent LED lighting cost?", a: "Pricing depends on your home's size, roofline complexity, and the product line you choose. Most residential installations range from $2,500 to $8,000. We provide a detailed, transparent quote with no hidden fees during your free consultation. The system pays for itself after 2-3 seasons compared to annual seasonal install fees." },
  { q: "Can you see the lights during the day?", a: "No. The LED nodes are installed in discreet channels or clips along your roofline that are designed to be invisible in daylight. Only at night, when illuminated, do they become visible. Most homeowners say guests can't tell the lights are there during the day." },
  { q: "What's the warranty on permanent lighting?", a: "We provide a lifetime warranty on all installed hardware. If any component fails due to installation or manufacturing defect, we'll replace it at no charge. The LED nodes themselves are rated for 50,000+ hours of use." },
  { q: "How do I control the lights?", a: "Your permanent lighting system comes with a user-friendly mobile app that lets you control colours, brightness, patterns, and schedules from anywhere. You can set up automated schedules for holidays so your lights switch automatically — Christmas colours starting December 1st, Halloween orange on October 1st, and so on." },
  { q: "Can permanent lights handle Canadian winters?", a: "Absolutely. Our permanent lighting products are specifically rated for Canadian climate — rated for temperatures from -40°C to +60°C, weatherproof, and UV-resistant. They're designed to outlast regular seasonal lights by decades." },
  { q: "Do you install permanent lighting on commercial properties?", a: "Yes — we install permanent LED systems on commercial buildings, plazas, storefronts, and office buildings. Commercial permanent lighting is especially valuable for businesses that want to stay festive year-round without the logistics of seasonal installs." },
];

const occasions = [
  { icon: "🎄", name: "Christmas", colour: "Red + Green" },
  { icon: "🎃", name: "Halloween", colour: "Orange + Purple" },
  { icon: "🇨🇦", name: "Canada Day", colour: "Red + White" },
  { icon: "🏒", name: "Playoffs", colour: "Your team's colours" },
  { icon: "🎂", name: "Birthdays", colour: "Any colour" },
  { icon: "🌸", name: "Spring", colour: "Pink + White" },
  { icon: "💙", name: "Valentine's", colour: "Red + Pink" },
  { icon: "🎊", name: "New Year's", colour: "Gold + White" },
];

export default function PermanentLightingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Permanent Outdoor LED Lighting",
    serviceType: "Permanent RGBW LED roofline lighting installation",
    url: "https://festiveholidaylighting.ca/services/permanent-lighting",
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    areaServed: cities.map(c => ({ "@type": "City", name: c.name })),
    description: "Permanent RGBW LED lighting systems installed in home and business rooflines. App-controlled, weatherproof, lifetime warranty. Southern Ontario.",
  };

  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` }, { "@type": "ListItem", position: 3, name: "Permanent Lighting", item: `${site.url}/services/permanent-lighting` }] }) }} />
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #040408 0%, #1A0505 50%, #0F0A14 100%)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(178,34,34,0.5) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/60 transition">Services</Link>
            <span>/</span>
            <span className="text-white/60">Permanent Lighting</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(178,34,34,0.15)", color: "var(--crimson-bright)", border: "1px solid rgba(178,34,34,0.3)" }}>
            ✨ Year-Round Service
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Permanent LED Lighting —{" "}
            <span className="text-gradient-festive">Install Once,</span>
            <br />
            Celebrate Forever
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
            Smart RGBW LED lights permanently installed in your roofline. Control every colour, pattern, and schedule from your phone — for Christmas, Halloween, birthdays, playoffs, or any occasion. One install. Lifetime of celebrations. Prefer the traditional look each December? We do classic Christmas lights too.
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

      {/* Occasions */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
              One System. <span className="text-gradient-gold">Every Occasion.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Stop thinking of it as "Christmas lights." Think of it as your home's year-round lighting system — that you control from your phone.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {occasions.map((o) => (
              <div key={o.name} className="p-5 rounded-2xl border text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-3">{o.icon}</div>
                <p className="font-semibold text-white text-sm mb-1">{o.name}</p>
                <p className="text-xs text-white/45">{o.colour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-5">
                What You Get with Permanent Lighting
              </h2>
              <ul className="space-y-4">
                {[
                  { title: "50,000+ Hour LED Lifespan", body: "That's over 17 years of nightly use. Our LEDs outlast incandescent seasonal lights by decades." },
                  { title: "16 Million+ Colour Options", body: "Full RGBW spectrum. Any colour, any shade, any combination. If you can imagine it, your lights can show it." },
                  { title: "Phone App Control", body: "Change colours, brightness, and patterns from anywhere. Set automated schedules so your lights switch for holidays automatically." },
                  { title: "Weatherproof Hardware", body: "Rated for Canadian winters — from -40°C to +60°C. Wind, snow, ice, UV — our hardware handles it all." },
                  { title: "Discreet Daytime Profile", body: "The LED nodes install in channels or clips that blend with your roofline. Invisible during the day, stunning at night." },
                  { title: "Lifetime Warranty", body: "All installed hardware is covered for life. If anything fails due to defect, we replace it at no cost." },
                ].map((f) => (
                  <li key={f.title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{f.title}</p>
                      <p className="text-sm text-white/55 mt-0.5">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {/* App control mockup */}
              <div className="p-8 rounded-2xl border mb-6"
                style={{ background: "linear-gradient(135deg, rgba(31,10,10,0.9), rgba(20,10,30,0.9))", borderColor: "rgba(178,34,34,0.25)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                    <SmartphoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Smart App Control</p>
                    <p className="text-xs text-white/50">iOS & Android</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "🎄 Christmas Mode", active: true },
                    { label: "🎃 Halloween Orange", active: false },
                    { label: "🇨🇦 Canada Day Red & White", active: false },
                    { label: "🏒 Go Leafs Go Blue", active: false },
                    { label: "✨ Custom — 16M colours", active: false },
                  ].map((m) => (
                    <div key={m.label}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        backgroundColor: m.active ? "rgba(178,34,34,0.2)" : "rgba(255,255,255,0.05)",
                        border: m.active ? "1px solid rgba(178,34,34,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      }}>
                      <span className="text-sm text-white/80">{m.label}</span>
                      {m.active && <span className="text-[10px] font-bold text-[var(--crimson-bright)] uppercase">Active</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost comparison */}
              <div className="p-6 rounded-2xl border"
                style={{ backgroundColor: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.2)" }}>
                <h3 className="font-display font-bold text-white mb-4">5-Year Cost Comparison</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/65">Seasonal install × 5 years</span>
                    <span className="text-white/65">~$3,000–$5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Permanent system (one-time)</span>
                    <span className="font-semibold" style={{ color: "var(--gold-bright)" }}>~$2,500–$8,000</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-white/50">After year 2–3, permanent lighting pays for itself — plus you get year-round control for every occasion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading="Ready to Never Hang Seasonal Lights Again?" sub="Install once. Control forever. Free quote for your home or business." />
      <FAQ faqs={faqs} title="Permanent Lighting FAQ" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
