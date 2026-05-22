import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
  getFeaturedProjects,
  getServiceAreas,
  getFaqs,
} from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCard } from "@/components/ServiceCard";
import { StepProcess } from "@/components/StepProcess";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();
  const projects = getFeaturedProjects();
  const areas = getServiceAreas();
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 4))) }}
      />

      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[82vh] flex items-center bg-[var(--charcoal-900)]">
        <Image
          src="/images/banner-1.png"
          alt="Custom concrete driveway installation in Tillsonburg, Ontario"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow !text-[var(--accent)]">
              {site.yearsExperience}+ Years · Tillsonburg, ON
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              High-Strength Concrete Built for{" "}
              <span className="text-[var(--accent)]">Oxford County Winters.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
              Driveways, stamped patios, and structural repairs engineered to survive Tillsonburg&apos;s
              freeze-thaw cycles. Get your firm estimate in {site.responseTime}.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#get-quote" className="btn btn-primary text-base px-7 py-4">
                Get a Free Estimate
                <ArrowIcon />
              </a>
              <Link href="/gallery" className="btn btn-ghost text-base px-7 py-4">
                View Our Work
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60">
              {[
                "Written Warranty",
                "Fully Insured",
                "Free On-Site Estimate",
                "WSIB Compliant",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs" aria-hidden="true">
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. Stats Strip ──────────────────────────────────────────── */}
      <TrustBar />

      {/* ── 3. Services ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Concrete Built for Every Surface"
            description="From broom-finish driveways to stamped patios and structural garage floors — every job uses the same reinforced base and engineered pour."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-outline px-7 py-3">
              View All Services
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. About / Pain Point ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Images — stacked/overlapping */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/banner-2.png"
                  alt="Freshly poured concrete driveway in Tillsonburg, ON — engineered for freeze-thaw durability"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Floating secondary image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-44 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/banner-3.jpg"
                  alt="Stamped concrete patio work in Oxford County, ON"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-[var(--border)]">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">Engineered for Ontario</p>
                <p className="text-[var(--charcoal)] font-semibold text-sm mt-0.5">25–30 yr lifespan with sealing</p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pb-8">
              <p className="eyebrow">Why Concrete Fails Here</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Is Your Concrete Cracking After Every Winter?
              </h2>
              <p className="text-lg text-[var(--concrete)] mb-6 leading-relaxed">
                Oxford County&apos;s freeze-thaw cycle is brutal — temperatures swing above and below zero
                repeatedly, forcing water in and out of every crack and pore. Most concrete fails
                because it was never engineered for this.
              </p>

              <div className="mb-6 space-y-2">
                <h3 className="font-bold text-[var(--charcoal)] mb-3 text-sm uppercase tracking-wide">
                  Common problems we fix:
                </h3>
                {[
                  "Spalling and pitting from road salt and freeze-thaw",
                  "Deep surface cracks expanding every spring",
                  "Sunken or heaving slabs creating trip hazards",
                  "Faded or worn stamped concrete losing its finish",
                ].map((problem) => (
                  <div key={problem} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-[var(--concrete)] text-sm">{problem}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-[var(--charcoal)] mb-3 text-sm uppercase tracking-wide">
                  Our proven solutions:
                </h3>
                {site.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--charcoal)] font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about" className="btn btn-primary px-7 py-3">
                  About Our Process
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Process Steps ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our 4-Step Concrete Process"
            description="Every project follows the same four-step process — no shortcuts, no skipped steps, every time."
          />
          <StepProcess />
        </div>
      </section>

      {/* ── 6. Project Gallery ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recent Projects"
            title="See the Work"
            description="Real concrete projects completed across Tillsonburg, Woodstock, Delhi, and Oxford County."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-900)]/90 via-[var(--charcoal-900)]/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline px-7 py-3">
              View Full Gallery
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Tillsonburg Homeowners Say"
            description="Real reviews from real customers across Oxford County and Southwestern Ontario."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.author} className="flex flex-col p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/75 leading-relaxed mb-4 flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-white">
                  {t.author}{" "}
                  <span className="font-normal text-white/50">— {t.city}, ON</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Why Choose Us ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-6">
                Oxford County&apos;s Trusted Concrete Contractor
              </h2>
              <p className="text-lg text-[var(--concrete)] leading-relaxed mb-8">
                We&apos;ve spent {site.yearsExperience}+ years learning exactly how concrete behaves in
                Southwestern Ontario&apos;s climate — and we build accordingly.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Local Expertise & Proven Experience",
                    text: `${site.yearsExperience}+ years pouring in Oxford County means we understand local soil conditions, drainage patterns, and the freeze-thaw behaviour unique to this region.`,
                  },
                  {
                    title: "Written Warranty on Every Project",
                    text: "Every pour comes with a written warranty — not a verbal promise. We stand behind our work because we engineer it to last.",
                  },
                  {
                    title: "Fair, Transparent Pricing",
                    text: "You get a detailed written estimate before any work begins. No surprise charges, no add-ons. Just honest pricing for honest work.",
                  },
                ].map((item) => (
                  <div key={item.title} className="feature-item pl-5">
                    <h3 className="font-bold text-[var(--charcoal)] mb-1">{item.title}</h3>
                    <p className="text-[var(--concrete)] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image with overlay badge */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/banner-2.png"
                alt="Concrete Tilsonburg crew finishing a stamped concrete patio in Tillsonburg, ON"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--charcoal-900)]/30" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-[var(--accent)]">{site.stats.projectsCompleted}+</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Projects</p>
                  </div>
                  <div className="border-x border-[var(--border)]">
                    <p className="text-2xl font-black text-[var(--accent)]">{site.yearsExperience}+</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[var(--accent)]">4.9★</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Service Areas ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Pour"
            title="Serving Tillsonburg & Oxford County"
            description="Local crews, local knowledge, local pricing across Oxford County and Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-4 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)] text-sm transition-colors">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1">View services →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas" className="btn btn-outline px-7 py-3">
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ + Quote ─────────────────────────────────────────── */}
      <section id="get-quote" className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* FAQ column */}
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-2">
                Common Questions
              </h2>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed">
                Straight answers to what Tillsonburg homeowners ask most.
              </p>
              <FaqAccordion faqs={faqs.slice(0, 4)} />
              <div className="mt-6">
                <Link href="/faq" className="btn btn-outline px-6 py-3">
                  View All FAQs
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            {/* Quote form column */}
            <div>
              <p className="eyebrow">Get Started</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-2">
                Free On-Site Estimate
              </h2>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed">
                We reply within {site.responseTime}. No obligation, no high-pressure sales.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function CheckCircle() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
