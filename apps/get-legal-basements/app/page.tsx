import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

const serviceImages: Record<string, string> = {
  "legal-basement-apartments": "/images/basement-modern.jpg",
  "basement-underpinning": "/images/foundation-work.jpg",
  "basement-waterproofing": "/images/waterproofing.jpg",
  "basement-finishing": "/images/basement-renovation.jpg",
  "egress-windows": "/images/egress-window.jpg",
  "basement-bathrooms": "/images/basement-bathroom.jpg",
  "foundation-repair": "/images/construction-worker.jpg",
};

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center bg-[var(--navy)]">
        <Image
          src="/images/hero-basement-living.jpg"
          alt="Modern finished basement living room — Legal Basements London"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/80 via-[var(--navy)]/60 to-[var(--navy)]/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-6">
            London Ontario&apos;s Trusted Basement Experts
          </p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 max-w-4xl mx-auto">
            Legal Basement Apartments &amp; Renovations
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            We handle permits, design, and construction for legal second suites,
            underpinning, waterproofing, and complete basement renovations.
          </p>

          {/* Stat Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {[
              { num: "15+", label: "Years Experience" },
              { num: "✓", label: "Licensed & Insured" },
              { num: "100%", label: "Permit Handling" },
              { num: "2yr", label: "Warranty" },
            ].map((s) => (
              <div key={s.label} className="stat-badge">
                <span className="text-xl sm:text-2xl font-bold text-white">{s.num}</span>
                <span className="text-xs text-white/70 font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
              Get a Free Consultation
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base px-8 py-4">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FLOATING SERVICE ICONS ═══ */}
      <section className="relative z-10 -mt-12 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-[var(--border)] p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏠", title: "Legal Apartments", desc: "Code-compliant second suites" },
              { icon: "📐", title: "Underpinning", desc: "Increase your ceiling height" },
              { icon: "🛡️", title: "Waterproofing", desc: "Permanent dry basement solutions" },
              { icon: "🔨", title: "Full Renovations", desc: "Design, build, and finish" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div className="service-icon-circle text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--navy)]">{item.title}</h3>
                  <p className="text-xs text-[var(--concrete)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / MAIN CONTENT ═══ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-wider mb-3">
                London&apos;s Basement Experts
              </p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-8">
                Turn Your Basement Into a Legal, Income-Generating Apartment
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--navy)] mb-1">Smart Investment</h3>
                    <p className="text-[var(--concrete)] leading-relaxed">
                      A properly permitted second suite can generate $1,200 to $2,000+ per month
                      in rental income while significantly increasing your property value. Rental
                      demand in London is driven by Western University, Fanshawe College, and a
                      growing population.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--navy)] mb-1">Full-Service Experts</h3>
                    <p className="text-[var(--concrete)] leading-relaxed">
                      We handle every aspect — from initial feasibility assessment and architectural
                      drawings to permit applications, construction, and final inspection. Whether
                      you need underpinning, waterproofing, or a complete suite build, we deliver
                      turnkey results with fixed pricing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <span className="trust-badge">✓ Licensed General Contractor</span>
                <span className="trust-badge">✓ Fully Insured &amp; Bonded</span>
                <span className="trust-badge">✓ Ontario Building Code Experts</span>
              </div>

              <div className="mt-8">
                <Link href="/services/legal-basement-apartments" className="btn btn-primary">
                  Learn About Legal Basement Apartments →
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--accent)]/10 rounded-2xl -z-10 hidden lg:block" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/basement-modern.jpg"
                  alt="Modern finished basement apartment in London, Ontario"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US — 4 PILLARS ═══ */}
      <section className="py-20 sm:py-24 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="The Legal Basements London Advantage"
            description="We combine deep expertise in Ontario Building Code with hands-on construction experience to deliver basements that pass inspection the first time."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                ),
                title: "Expert Team",
                desc: "Skilled designers, project managers, and tradespeople committed to delivering exceptional results on every project.",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                ),
                title: "Proven Process",
                desc: "Our 4-step method ensures clarity and ease from consultation through final inspection — no surprises, no stress.",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                ),
                title: "15+ Years Experience",
                desc: "Over a decade and a half of basement renovations across Southwestern Ontario — we've seen and solved it all.",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                ),
                title: "Premium Materials",
                desc: "We use only top-grade, moisture-resistant products designed to ensure your basement stands the test of time.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{pillar.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="py-20 sm:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Comprehensive Basement Solutions"
            description="From legal second suites to foundation repair, we provide full-service basement renovations across London and Southwestern Ontario."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={serviceImages[service.slug] || "/images/basement-renovation.jpg"}
                  alt={`${service.title} service in London, Ontario`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold text-white text-lg mb-1">{service.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{service.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS STEPS ═══ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 4-Step Process"
            description="A proven approach that delivers code-compliant results on time and on budget."
          />
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)] to-[var(--accent)]/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Consultation", desc: "Free on-site assessment. We evaluate your basement's potential, discuss your goals, and outline the path forward." },
                { step: "2", title: "Design & Permits", desc: "3D design renderings, architectural drawings, engineering reports, and full permit submission to the City of London." },
                { step: "3", title: "Construction", desc: "Professional, project-managed construction with regular updates, clean jobsite, and adherence to timeline and budget." },
                { step: "4", title: "Inspection & Handover", desc: "Final municipal inspection, occupancy approval, and complete walkthrough. Your legal basement is ready." },
              ].map((p) => (
                <div key={p.step} className="relative text-center">
                  <div className="step-number mx-auto mb-5 relative z-10">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-lg text-[var(--navy)] mb-2">{p.title}</h3>
                  <p className="text-[var(--concrete)] text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 sm:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Our Clients Say"
          />

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-4xl font-bold text-[var(--navy)]">5.0</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--gold)] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-[var(--concrete)] mt-0.5">Based on Google Reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[var(--gold)] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-[var(--navy)]">
                  {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE FORM ═══ */}
      <section className="py-20 sm:py-24 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                eyebrow="Contact Us"
                title="Get Your Free Consultation"
                description="Tell us about your basement project and we'll provide a detailed, no-obligation quote. Most consultations booked within 48 hours."
                center={false}
                dark
              />
              <div className="space-y-4 mt-6">
                <p className="text-white/70">
                  <strong className="text-white">Services:</strong> Legal Apartments · Underpinning ·
                  Waterproofing · Finishing · Egress Windows · Bathrooms · Foundation Repair
                </p>
                <p className="text-white/70">
                  <strong className="text-white">Service Areas:</strong> {site.serviceAreas.join(", ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {["Full Permit Handling", "Fixed Pricing", "2-Year Warranty", "Free Consultations"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
