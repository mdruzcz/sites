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
      {/* ═══ HERO — Split layout: text left, image right ═══ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            {/* Left — Text */}
            <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
              <h1 className="h-display text-5xl sm:text-6xl lg:text-7xl text-[var(--navy)] mb-6">
                REDEFINE{" "}
                <span className="text-cyan">YOUR</span>
                <br />
                BASEMENT
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[var(--navy)] mb-8 leading-snug">
                Transform Your Basement with London&apos;s Trusted Renovation &amp; Legal Apartment Experts
              </p>

              {/* Stat badges — 2×2 grid with icons */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
                <div className="stat-badge">
                  <div className="stat-badge-icon">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--navy)] text-sm">15+ Years</p>
                    <p className="text-[var(--concrete)] text-xs">of helping London homeowners</p>
                  </div>
                </div>
                <div className="stat-badge">
                  <div className="stat-badge-icon">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--navy)] text-sm">Licensed &amp; Insured</p>
                    <p className="text-[var(--concrete)] text-xs">General contractor</p>
                  </div>
                </div>
                <div className="stat-badge">
                  <div className="stat-badge-icon">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--navy)] text-sm">Full Permit Handling</p>
                    <p className="text-[var(--concrete)] text-xs">We deal with City Hall</p>
                  </div>
                </div>
                <div className="stat-badge">
                  <div className="stat-badge-icon">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--navy)] text-sm">2-Year Warranty</p>
                    <p className="text-[var(--concrete)] text-xs">On all workmanship</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                  Free Consultation
                </Link>
                <a href={site.phoneHref} className="btn btn-phone text-base px-4 py-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  {site.phone}
                </a>
              </div>
            </div>

            {/* Right — Image */}
            <div className="relative hidden lg:block">
              <Image
                src="/images/basement-modern.jpg"
                alt="Beautiful finished basement renovation in London, Ontario"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — "You Found London's Basement Experts" ═══ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-cyan font-extrabold italic text-lg sm:text-xl mb-4">
                You Found London&apos;s Basement Experts
              </p>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--navy)] mb-6 leading-tight">
                London&apos;s Premier Authority in Legal Basements, Waterproofing, and Renovation
              </h2>
              <p className="text-[var(--concrete)] text-lg leading-relaxed">
                At Legal Basements London, we don&apos;t just finish basements — we transform them.
                We don&apos;t just handle permits — we make the entire process effortless.
              </p>
            </div>
            <div className="space-y-5 text-[var(--concrete)] text-base leading-relaxed">
              <p>
                As a trusted basement renovation company in London, Ontario, we&apos;ve spent over
                15 years helping homeowners reclaim and protect their lower levels. From foundation
                repair and waterproofing to stunning legal apartment conversions, we deliver expert
                solutions that keep your home dry, safe, and livable.
              </p>
              <p>
                Whether you&apos;re dealing with water intrusions, low ceiling height, or just tired
                of wasting valuable square footage, you&apos;re in the right place. We&apos;re here
                to fix it — once and for all.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="trust-badge">✓ Licensed General Contractor</span>
                <span className="trust-badge">✓ Fully Insured</span>
                <span className="trust-badge">✓ Ontario Building Code Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US — 4 Pillars with large outlined circles ═══ */}
      <section className="py-20 sm:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] text-center mb-16">
            Why Legal Basements London is the Choice for You:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-[var(--navy)]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
                title: "People",
                desc: "The strength of Legal Basements London lies in our remarkable team. From experienced designers to meticulous tradespeople, our professionals are committed to exceeding your expectations.",
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-[var(--navy)]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
                title: "Process",
                desc: "We prioritize clarity and ease throughout the entire project. Our 4-step method ensures a transparent and satisfying journey, leading to a seamless renovation without any stress.",
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-[var(--navy)]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                ),
                title: "Experience",
                desc: "With over 15 years of leadership in basement renovations and legal apartment conversions, we deliver custom solutions that exceed expectations every time.",
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-[var(--navy)]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                ),
                title: "Products",
                desc: "We use only top-grade, moisture-resistant materials and proven waterproofing systems that guarantee lasting performance and beauty for your basement.",
              },
            ].map((pillar) => (
              <div key={pillar.title}>
                <div className="pillar-icon">
                  {pillar.icon}
                </div>
                <h3 className="font-extrabold text-[var(--navy)] text-xl mb-3">{pillar.title}</h3>
                <p className="text-[var(--concrete)] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
              Get A Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
      <section className="py-20 sm:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 4-Step Process"
            description="A proven approach that delivers code-compliant results on time and on budget."
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--cyan)]/30" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Consultation", desc: "Free on-site assessment. We evaluate your basement's potential, discuss your goals, and outline the path forward." },
                { step: "2", title: "Design & Permits", desc: "Architectural drawings, engineering reports, and full permit submission to the City of London." },
                { step: "3", title: "Construction", desc: "Professional, project-managed construction with regular updates, clean jobsite, and adherence to your timeline." },
                { step: "4", title: "Inspection & Handover", desc: "Final municipal inspection, occupancy approval, and complete walkthrough. Your legal basement is ready." },
              ].map((p) => (
                <div key={p.step} className="relative text-center">
                  <div className="step-number mx-auto mb-5 relative z-10">{p.step}</div>
                  <h3 className="font-bold text-lg text-[var(--navy)] mb-2">{p.title}</h3>
                  <p className="text-[var(--concrete)] text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader eyebrow="Reviews" title="What Our Clients Say" />

          <div className="flex items-center justify-center gap-3 mb-12">
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
      <section className="py-20 sm:py-28 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                eyebrow="Contact Us"
                title="Redefine Your Basement"
                description="Schedule your consultation today and see how we can make your basement the space you've always imagined."
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
                    <svg className="w-3.5 h-3.5 text-[var(--cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
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
