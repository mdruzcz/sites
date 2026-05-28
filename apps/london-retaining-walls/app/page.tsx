import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "London Retaining Walls | Professional Installation & Repair in London, ON",
  description: "Professional retaining wall installation and repair in London, Ontario. Concrete, block and wood retaining walls. 8+ years experience. Ontario Building Code compliant. Free quotes.",
  openGraph: {
    title: "London Retaining Walls | Professional Installation & Repair",
    description: "Expert retaining wall installation in London, Ontario. Concrete, block, and wood walls. Free quotes. Ontario Building Code compliant.",
    url: site.url,
    images: [{ url: "/images/hero-retaining-wall.jpg", width: 1200, height: 630, alt: "Professional retaining wall installation in London, Ontario" }],
  },
};

const faqs = [
  { q: "What types of retaining walls do you build?", a: "We build poured concrete and precast panel walls, interlocking block walls (Permacon, Allan Block), and pressure-treated lumber and hardwood timber walls. We'll recommend the best material for your site, soil conditions, and budget." },
  { q: "Do I need a permit for a retaining wall in Ontario?", a: "In most Ontario municipalities, retaining walls over 1 metre (approximately 3 feet) in height require a building permit. We handle the compliance process and ensure all work meets Ontario Building Code requirements." },
  { q: "How long do retaining walls last?", a: "Concrete retaining walls can last 50–100 years with minimal maintenance. Quality interlocking block walls typically last 40–50 years. Pressure-treated wood walls typically last 20–40 years depending on drainage and maintenance." },
  { q: "What causes retaining walls to fail?", a: "The most common causes of retaining wall failure are poor drainage (water pressure behind the wall), improper base compaction, inadequate wall height for the load, and choosing the wrong material for the soil conditions. We address all of these during installation." },
  { q: "Do you offer free quotes?", a: "Yes — all quotes are completely free and come with no obligation. We assess your property and provide a detailed written estimate before any work begins." },
];

const services = [
  { name: "Retaining Wall Installation", href: "/retaining-wall-installation", icon: "🏗️", desc: "Full installation service for all wall types. Site assessment, proper drainage, quality materials, and code-compliant construction." },
  { name: "Concrete Retaining Walls", href: "/concrete-retaining-walls", icon: "🧱", desc: "Poured concrete and precast concrete panels. The most durable option — ideal for taller walls and commercial applications." },
  { name: "Block Retaining Walls", href: "/block-retaining-walls", icon: "⬛", desc: "Permacon, Allan Block and similar interlocking systems. Versatile, attractive and Ontario Building Code compliant." },
  { name: "Wood & Timber Retaining Walls", href: "/wood-and-timber-retaining-walls", icon: "🪵", desc: "Pressure-treated lumber and hardwoods. Natural look that blends beautifully with landscaping." },
  { name: "Retaining Wall Repair", href: "/retaining-wall-repair", icon: "🔧", desc: "Bowing walls, drainage issues, cracking, settlement. We assess the problem and fix it right — no band-aid solutions." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-[var(--dark)]">
        <div className="absolute inset-0">
          <Image src="/images/hero-retaining-wall.jpg" alt="Professional retaining wall installation in London, Ontario" fill className="object-cover opacity-40" priority sizes="100vw" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: headline */}
          <div>
            <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              London, Ontario &amp; Southwestern Ontario
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight font-[var(--font-montserrat)]">
              PROFESSIONAL<br />RETAINING WALL<br />
              <span className="text-[var(--accent)]">INSTALLATION</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 font-medium">Professional Retaining Wall Installation &amp; Repair in London, Ontario</p>
            <p className="mt-3 text-gray-400 leading-relaxed max-w-lg">Kyle and his team have 8+ years installing concrete, block, and wood retaining walls across Southwestern Ontario. Residential and commercial. Ontario Building Code compliant.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact-us" className="btn btn-accent text-base px-8 py-4">Get a Free Quote</Link>
              <a href={site.phoneHref} className="btn btn-white text-base px-8 py-4 text-[var(--dark)]">Call {site.phone}</a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> 8+ Years Experience</span>
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Code Compliant</span>
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Free Quotes</span>
            </div>
          </div>

          {/* Right: quote form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:max-w-md w-full">
            <div className="bg-[var(--accent)] -mx-6 -mt-6 md:-mx-8 md:-mt-8 px-6 py-4 md:px-8 rounded-t-2xl mb-6">
              <h2 className="text-xl font-bold text-white text-center">Get Your FREE Quote Today!</h2>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services Overview */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Our Retaining Wall Services</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">From a simple garden wall to a full commercial retaining system — we handle every project with expert technique, quality materials and Ontario Building Code compliance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="card p-6 group hover:border-[var(--accent)] border-2 border-transparent transition-colors">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{s.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-flex items-center text-[var(--accent)] text-sm font-semibold gap-1">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Choose Us */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <Image src="/images/retaining-wall-team.jpg" alt="Kyle and team installing retaining wall in London, Ontario" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div>
            <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest">About London Retaining Walls</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] mt-2 font-[var(--font-montserrat)]">8+ Years of Retaining Wall Expertise in Southwestern Ontario</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Kyle founded London Retaining Walls after spending years in the landscaping and construction industry. He saw too many walls fail because of poor drainage, under-engineered footings and the wrong materials for the soil conditions. His focus from day one has been doing it right the first time.</p>
            <p className="mt-4 text-gray-600 leading-relaxed">We work on residential and commercial projects of all sizes — from small garden terrace walls to large-scale commercial retaining systems. Every wall we build is designed to last and to comply with Ontario Building Code.</p>
            <ul className="mt-6 space-y-3">
              {[
                "All wall types: concrete, interlocking block, wood/timber",
                "Proper drainage engineering on every installation",
                "Ontario Building Code compliant — permit-ready",
                "Residential and commercial projects",
                "Transparent written quotes — no hidden costs",
                "Free, no-obligation site assessments",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about-us" className="btn btn-accent mt-8">Learn About Us</Link>
          </div>
        </div>
      </section>

      {/* Why Us — 4 differentiators */}
      <section className="section bg-[var(--dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[var(--font-montserrat)]">Why Choose London Retaining Walls?</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">Four reasons why homeowners and contractors across Southwestern Ontario trust us with their retaining wall projects.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏗️", title: "8+ Years Experience", desc: "Kyle and his crew have built hundreds of retaining walls across London, Woodstock, Brantford and surrounding communities." },
              { icon: "✅", title: "Code Compliance", desc: "We know Ontario Building Code inside and out. Walls over 1 metre are permitted and built to spec — every time." },
              { icon: "🧱", title: "All Wall Types", desc: "Concrete, Permacon block, Allan Block, pressure-treated lumber, hardwood timber — we build whatever fits your site and budget." },
              { icon: "📋", title: "Free Quotes", desc: "No obligation. We assess your site, review your goals and provide a detailed written estimate before any work begins." },
            ].map((s) => (
              <div key={s.title} className="relative p-6 rounded-2xl border border-white/10 hover:border-[var(--accent)] transition-colors">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Serving Southwestern Ontario</h2>
            <p className="mt-3 text-gray-600">We build and repair retaining walls in London and every surrounding community.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {site.serviceAreas.map((area) => (
              <Link key={area.name} href={area.href} className="px-4 py-2 rounded-full border-2 border-gray-200 text-gray-700 hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium text-sm transition-colors">
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[var(--dark)] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
