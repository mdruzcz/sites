import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { getFeaturedProjects, getFeaturedTestimonials, getServices, getTestimonials } from "@/lib/content";
import { localBusinessSchema, faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Permanent LED Lighting in Ontario | Celebrate Lighting" },
  description:
    "Stop climbing ladders every holiday season. Permanent outdoor LED lighting across Southwestern Ontario — app-controlled, lifetime warranty, built for winters.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Celebrate Lighting | Permanent Outdoor LED Lighting in Ontario",
    description: "Stop climbing ladders every holiday season. Professional permanent LED lighting, app-controlled, lifetime warranty.",
    url: "https://celebratelighting.ca",
    images: [{ url: "/images/hero-main.jpg", alt: "Permanent outdoor LED lighting installed by Celebrate Lighting in Ontario" }],
  },
};

const homeFaqs = [
  { question: "How long does installation take?", answer: "Most residential installations are completed in 1–2 days, depending on the size of your home. We provide a detailed timeline during your free consultation." },
  { question: "Will it damage my roof or gutters?", answer: "No. We use specialized clips and mounting systems that don't penetrate your roof or damage gutters. Our methods are designed to protect your property." },
  { question: "How much does a system cost?", answer: "Most residential installations range from $2,500 to $8,000 depending on your home's size and complexity. We provide a transparent, itemized quote with no hidden fees." },
  { question: "How do I control the lights?", answer: "Your system comes with a user-friendly mobile app connected via WiFi. Control colours, brightness, patterns, and schedules from anywhere. Pre-programmed holiday themes are included." },
  { question: "What warranty do you offer?", answer: "We provide a comprehensive lifetime warranty covering LED lights, mounting hardware, and installation workmanship — including free repairs and replacements." },
];

export default function HomePage() {
  const projects = getFeaturedProjects();
  const testimonials = getFeaturedTestimonials();
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(getTestimonials())) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      {/* HERO */}
      <section className="relative text-white overflow-hidden min-h-[600px] flex items-center" style={{ background: "var(--foreground)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="Beautiful permanent outdoor LED lighting installation on an Ontario home by Celebrate Lighting"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,46,0.85) 50%, rgba(26,26,46,0.4) 100%)" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-5 text-base tracking-widest">Permanent Outdoor LED Lighting — Ontario</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Make Your Home<br className="hidden md:block" /> Stand Out.<br />
              <span style={{ color: "var(--accent)" }}>Every Night</span>{" "}
              of the Year.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Professional permanent LED lighting, track-mounted and colour-matched to your home. App-controlled, weatherproof, and backed by a lifetime warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4" style={{ fontSize: "1rem" }}>
                Get Your Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8 py-4" style={{ fontSize: "1rem" }}>
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section style={{ background: "var(--accent)" }} className="py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/20">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "No More Hassle",
                sub: "One install, forever",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                label: "Fully Customizable",
                sub: "16 million+ colours",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                label: "Sleek Hidden Design",
                sub: "Colour-matched tracks",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                label: "Built for All Seasons",
                sub: "Rated to −40°C",
              },
            ].map((feat) => (
              <div key={feat.label} className="flex flex-col items-center text-center gap-2 md:px-8 py-2">
                <div className="text-white/90">{feat.icon}</div>
                <div>
                  <div className="font-bold text-white text-sm">{feat.label}</div>
                  <div className="text-white/75 text-xs">{feat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "var(--surface-2)" }} className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {site.trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-[var(--foreground)]">{badge.label}:</span>
                <span className="text-[var(--muted)]">{badge.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: "var(--surface)" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-3">Why Celebrate Lighting</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">
              The Smart Way to Light Your Home
            </h2>
            <p className="mt-5 text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Premium permanent lighting with unmatched quality and a warranty that actually means something.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Convenience & Safety",
                body: "Never waste time or risk your safety climbing ladders to hang lights again. Your permanent system is always ready, year-round.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Seamless Integration",
                body: "Lights are installed in tracks that colour-match your soffit, creating a sleek, professional appearance that enhances curb appeal.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: "Durable & Weatherproof",
                body: "Waterproof, UV-rated cables and IP67-rated lights built to withstand Canadian winters — including temperatures as low as −40°C.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
              {
                title: "Smart App Control",
                body: "Control colours, brightness, and schedules from anywhere with an intuitive mobile app connected via WiFi.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Endless Customisation",
                body: "16 million+ colours. Match any holiday, sports team, or occasion — pink for Valentine's, green for St. Patrick's, orange for Halloween.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
              {
                title: "Lifetime Warranty",
                body: "A comprehensive lifetime warranty on LED lights, mounting hardware, and workmanship — free repairs and replacements included.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.title} className="card p-7 flex gap-4">
                <div
                  className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINT */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-eyebrow mb-4">Sound Familiar?</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">
                Tired of the Annual<br className="hidden md:block" /> Light Ladder Ritual?
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>Every year, it&apos;s the same story: hours spent untangling lights, climbing ladders in the cold, only to take everything down a few weeks later. Temporary lights damage gutters, blow fuses, and leave your home looking amateurish.</p>
                <p>The cheap strings from the hardware store rarely survive two seasons. You end up buying new ones every year — spending more money for the same hassle.</p>
              </div>
              <div
                className="mt-8 p-5 rounded-2xl border-l-4"
                style={{ background: "var(--accent-light)", borderColor: "var(--accent)" }}
              >
                <p className="font-semibold text-[var(--foreground)] text-lg leading-snug">
                  Celebrate Lighting ends that cycle for good. One professional installation. Permanent results. Control it all from your phone.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/project-tillsonburg.jpg"
                alt="Professionally installed permanent LED lighting on a home in Tillsonburg, Ontario by Celebrate Lighting"
                width={600}
                height={450}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "var(--foreground)" }} className="py-20 md:py-28 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Simple 3-Step Process</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Lights On in As Little as One Day
            </h2>
            <p className="mt-4 text-gray-300 max-w-xl mx-auto">From your first call to a lit-up home — most installations are done the same week.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {[
              { step: "01", title: "Free Consultation", desc: "We visit your property, take measurements, and colour-match your soffit. You get a transparent, itemized quote with no obligation." },
              { step: "02", title: "Custom Installation", desc: "Our certified technicians install your track-mounted LED system with clean wiring and secure mounting — usually in one day." },
              { step: "03", title: "App Setup & Enjoy", desc: "We configure your mobile app, walk you through all the controls, and you're live. Change any colour, any pattern, any time." },
            ].map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center px-6">
                {i < 2 && (
                  <div className="hidden md:block absolute right-0 top-7 w-1/2 h-px" style={{ background: "var(--accent)", opacity: 0.3 }} />
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white font-extrabold text-xl border-2"
                  style={{ background: "var(--accent)", borderColor: "var(--accent)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary text-base px-10 py-4">
              Start My Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Our Work</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">Real Homes, Real Results</h2>
            <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">Every installation is tailored to the home&apos;s architecture and the homeowner&apos;s vision.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.slug} className="relative rounded-xl overflow-hidden aspect-video group">
                <Image
                  src={project.image}
                  alt={`${project.title} by Celebrate Lighting in ${project.city}, Ontario`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-semibold">{project.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "var(--surface)" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="card p-7 hover:shadow-lg transition-shadow group">
                <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors text-lg">{service.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{service.shortDescription}</p>
                <span className="text-sm font-semibold text-[var(--accent)] flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Customer Reviews</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-7">
                <div className="flex mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5" style={{ color: "var(--gold)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--muted)] italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="font-semibold text-sm text-[var(--foreground)]">{t.author}</div>
                <div className="text-xs text-[var(--muted)]">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--surface)" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Common Questions</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="card p-5 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--foreground)] list-none">
                  {faq.question}
                  <svg className="w-5 h-5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: "var(--foreground)" }} className="py-20 md:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, var(--accent) 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Ready to Transform Your Home?</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                This is the last year you hang Christmas lights.
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Book a no-obligation consultation with our lighting specialists. We&apos;ll visit your property, colour-match your soffit, and provide a transparent, itemized quote.
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                {["Free on-site consultation — no obligation", "Fast response within 24 hours", "Transparent pricing, no hidden fees", "Serving all of Southwestern Ontario"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-[var(--foreground)] font-bold text-xl mb-6">Request Your Free Quote</h3>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
