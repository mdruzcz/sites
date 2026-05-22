import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";
import { getFeaturedServices, getFeaturedTestimonials, getServiceAreas } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: `${site.name} | Furnace, AC & Heat Pump Services in Oxford County ON`,
  description: `Oxford County's TSSA-certified HVAC specialists. Expert furnace repair, AC installation, and heat pump conversions in Woodstock, Ingersoll, Tillsonburg, and beyond. 24/7 emergency service.`,
};

export const revalidate = 3600;

export default function HomePage() {
  const services = getFeaturedServices();
  const testimonials = getFeaturedTestimonials();
  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy)] to-[#1a4a6e] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {site.certifications.map((cert) => (
                  <span key={cert} className="trust-pill">{cert}</span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Oxford County&apos;s
                <span className="block text-[var(--heat)]">TSSA-Certified</span>
                HVAC Specialists
              </h1>
              <p className="text-lg sm:text-xl text-white/75 mb-8 leading-relaxed max-w-lg">
                Expert furnace repair, AC installation, heat pump conversions, and indoor air quality solutions. Based in Burgessville — serving all of Oxford County and southwestern Ontario.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/contact" className="btn btn-primary">
                  Get a Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/heat-pump-rebates" className="btn btn-outline-white">
                  Up to $40K in Rebates ★
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--cool)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Same-day service available
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--cool)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 emergency response
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--cool)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free quotes, no obligation
                </span>
              </div>
            </div>
            <div className="lg:justify-self-end w-full max-w-md">
              <QuoteForm variant="card" formType="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow">Our Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
              Complete Heating & Cooling Solutions
            </h2>
            <p className="mt-3 text-[var(--slate)] max-w-2xl mx-auto">
              From emergency furnace repair to full heat pump system installations with rebate applications — we handle it all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-md hover:border-[var(--cool)] transition-all group"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-[var(--navy)] text-base mb-2 group-hover:text-[var(--heat)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--slate)] leading-relaxed">
                  {service.shortDescription}
                </p>
                {"rebateHighlight" in service && service.rebateHighlight && (
                  <span className="mt-3 inline-block text-xs font-bold text-[var(--cool)] bg-[var(--cool)]/10 px-2 py-1 rounded">
                    {service.rebateHighlight}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn btn-outline">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Rebate Banner */}
      <section className="rebate-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="eyebrow-cool">Heat Pump Rebates</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Up to $40,000 in Government Rebates Available
              </h2>
              <p className="text-white/70 mt-2">
                Canada Greener Homes Loan + Enbridge HER+ + Save on Energy. We handle all paperwork.
              </p>
            </div>
            <Link href="/heat-pump-rebates" className="btn btn-primary flex-shrink-0 whitespace-nowrap">
              See What You Qualify For →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Why Optimum HVAC</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] tracking-tight mb-6">
                Oxford County&apos;s HVAC Team You Can Trust
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "TSSA G2 Certified",
                    desc: "Every gas appliance installation is performed by a licensed, TSSA G2-certified technician. Required by Ontario law — and your peace of mind.",
                    icon: "🏅",
                  },
                  {
                    title: "Same-Day Emergency Service",
                    desc: "No heat in January? We respond fast. Same-day service is available across Oxford County for emergency furnace and HVAC repairs.",
                    icon: "⚡",
                  },
                  {
                    title: "Rebate Experts",
                    desc: "We're well-versed in the Canada Greener Homes Loan, Enbridge HER+, and Save on Energy programs. We submit applications on your behalf.",
                    icon: "💰",
                  },
                  {
                    title: "Local, Technician-Owned",
                    desc: "Optimum HVAC is based right here in Burgessville. We're your neighbours — not a franchise, not a call centre.",
                    icon: "📍",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-[var(--navy)] mb-1">{item.title}</h3>
                      <p className="text-[var(--slate)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--navy)] mb-6">Brands We Service & Install</h3>
              <div className="grid grid-cols-2 gap-3">
                {site.brands.map((brand) => (
                  <div key={brand} className="bg-white rounded-lg px-4 py-3 text-center font-bold text-[var(--slate)] text-sm border border-[var(--border)]">
                    {brand}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[var(--heat)]/5 rounded-xl border border-[var(--heat)]/20 text-center">
                <p className="text-xs text-[var(--slate)] uppercase font-bold tracking-wider mb-1">24/7 Emergency Line</p>
                <a href={site.phoneHref} className="text-xl font-extrabold text-[var(--navy)] hover:text-[var(--heat)] transition-colors">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dino */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] col-span-2 sm:col-span-1">
                  <Image
                    src="/images/dino-brazing-close.jpg"
                    alt="Dino, founder of Optimum HVAC, performing brazing work on an HVAC system in Oxford County"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="hidden sm:flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden flex-1">
                    <Image
                      src="/images/dino-brazing-hvac.jpg"
                      alt="Dino from Optimum HVAC soldering refrigerant lines on an AC evaporator coil"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden flex-1">
                    <Image
                      src="/images/furnace-installation-basement.jpg"
                      alt="Optimum HVAC furnace installation in a Woodstock Ontario home"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--heat)] text-white rounded-xl px-4 py-3 text-center shadow-lg">
                <p className="font-extrabold text-2xl">2019</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Est.</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">The Tech Behind the Name</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] tracking-tight mb-5">
                Meet Dino
              </h2>
              <div className="space-y-4 text-[var(--slate)] leading-relaxed">
                <p>
                  I came to Canada from Greece with a straightforward approach to life and work:
                  be honest, work hard, and genuinely help people. That&apos;s what Optimum HVAC is built on.
                </p>
                <p>
                  Since founding the company in 2019, I&apos;ve served Oxford County homeowners as a
                  TSSA G2 certified gas technician — the licence Ontario requires for gas appliance work.
                  When I show up at your door, you deal with me directly. No subcontractors, no runarounds,
                  no upsells you don&apos;t need.
                </p>
                <p>
                  I&apos;ll tell you exactly what&apos;s wrong, what it costs to fix it, and what I&apos;d
                  do if it were my own house. That&apos;s the standard I hold myself to on every job.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="text-sm font-semibold px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--slate)]">🇬🇷 Originally from Greece</span>
                <span className="text-sm font-semibold px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--slate)]">🏅 TSSA G2 Certified</span>
                <span className="text-sm font-semibold px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--slate)]">📍 Based in Burgessville</span>
              </div>
              <div className="mt-6">
                <Link href="/about" className="btn btn-outline">
                  More About Dino →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="eyebrow">Customer Reviews</p>
              <h2 className="text-3xl font-extrabold text-[var(--navy)] tracking-tight">
                What Our Customers Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="card p-6 corner-accent">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[var(--slate)] text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-bold text-[var(--navy)] text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--slate)]">{t.location} · {t.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Areas */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Service Areas</p>
            <h2 className="text-3xl font-extrabold text-[var(--navy)] tracking-tight">
              Serving Oxford County & Southwestern Ontario
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="card px-4 py-3 text-center hover:border-[var(--cool)] hover:shadow-sm transition-all group"
              >
                <p className="font-bold text-sm text-[var(--navy)] group-hover:text-[var(--heat)] transition-colors">
                  {area.city}
                </p>
                <p className="text-xs text-[var(--slate)] mt-0.5">{area.county}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/service-areas" className="btn btn-outline">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready for a Free HVAC Quote?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            No-obligation estimates. Same-day service available. TSSA-certified technicians across Oxford County.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Request a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-outline-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
