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
      <section className="relative overflow-hidden min-h-[88vh] flex items-center bg-[var(--navy-900)]">
        <Image
          src="/images/1-1-e1718343897660.png"
          alt="Professional concrete sealing in progress on a residential driveway in London, Ontario"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow !text-[var(--accent)]">
              {site.yearsExperience}+ Years · London &amp; SW Ontario
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Concrete That Looks{" "}
              <span className="text-[var(--accent)]">New — And Stays That Way.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/75 mb-8 leading-relaxed max-w-2xl">
              Professional concrete sealing for driveways, patios, stamped concrete, and walkways
              across Southwestern Ontario. Backed by our industry-leading{" "}
              <strong className="text-white">{site.warrantyYears}-year written warranty.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/contact" className="btn btn-primary text-base px-7 py-4">
                Get a Free Quote
                <ArrowIcon />
              </Link>
              <Link href="/services" className="btn btn-ghost text-base px-7 py-4">
                View Our Services
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/65">
              {[
                `${site.warrantyYears}-Year Written Warranty`,
                "Fully Insured",
                "Free Site Assessment",
                `${site.stats.projectsCompleted}+ Projects Completed`,
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs" aria-hidden="true">
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. Trust Bar ────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── 3. Services Grid ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Concrete Sealing for Every Surface"
            description="From residential driveways to commercial parking areas — we seal it all with premium, long-lasting products."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter((s) => s.featured).map((service) => (
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

      {/* ── 4. Why Choose Us ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Image stack */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/result_Restore-Your-Concretes-Beauty-with-TriCity-TriCity-Concrete-Sealing.jpg"
                  alt="Concrete restored to like-new condition after professional sealing by TriCity in London, Ontario"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-44 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/result_Stamped-Concrete-Sealing-TriCity-Concrete-Sealing.jpg"
                  alt="Vibrant stamped concrete patio sealed by TriCity Concrete Sealing"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-[var(--border)]">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">Industry Leading</p>
                <p className="text-[var(--navy)] font-semibold text-sm mt-0.5">{site.warrantyYears}-Year Written Warranty</p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pb-8">
              <p className="eyebrow">Why TriCity?</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-5">
                The Concrete Sealing Specialists of SW Ontario
              </h2>
              <p className="text-lg text-[var(--concrete)] mb-6 leading-relaxed">
                Unsealed concrete is porous. It absorbs road salt, oil, water, and UV rays — all of which
                cause staining, cracking, spalling, and fading. Proper sealing stops that cycle and extends
                your concrete&apos;s life by years.
              </p>

              <div className="space-y-4 mb-8">
                {site.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--navy)] font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn btn-primary px-7 py-3">
                About TriCity
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Gallery Strip ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Work"
            title="Recent Projects Across SW Ontario"
            description="Real results from real driveways, patios, and walkways we&apos;ve sealed across the region."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/90 via-[var(--navy-900)]/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Process ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 4-Step Sealing Process"
            description="Every project follows the same proven process — no shortcuts, no skipped steps, no surprises."
          />
          <StepProcess />
        </div>
      </section>

      {/* ── 7. Feature Image Section ────────────────────────────────── */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[420px] sm:h-[520px]">
          <Image
            src="/images/result_Patio-Sealing-TriCity-Concrete-Sealing-1.jpg"
            alt="Beautifully sealed concrete patio in Southwestern Ontario — protected and ready for entertaining"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/90 via-[var(--navy-900)]/60 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg">
                <p className="eyebrow">Industry-Leading Protection</p>
                <h2 className="h-display text-3xl sm:text-4xl text-white mb-4">
                  Backed by a {site.warrantyYears}-Year Written Warranty
                </h2>
                <p className="text-white/75 text-lg mb-6 leading-relaxed">
                  We don&apos;t just seal your concrete — we stand behind it. If there&apos;s an issue
                  with our workmanship or materials within {site.warrantyYears} years, we&apos;ll fix it. No questions.
                </p>
                <Link href="/warranty" className="btn btn-primary px-7 py-3">
                  View Warranty Details
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Customer Reviews"
            title="What Homeowners Are Saying"
            description="Real reviews from customers across London, Woodstock, Brantford, and beyond."
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

      {/* ── 9. Service Areas ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Service Area"
            title="Serving All of Southwestern Ontario"
            description="Local crews, expert knowledge, and the same premium results — wherever you are."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-4 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-semibold text-[var(--navy)] group-hover:text-[var(--accent)] text-sm transition-colors">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1">{city.region}</p>
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

      {/* ── 10. Driveway Full-Width Image ───────────────────────────── */}
      <section className="relative overflow-hidden h-64 sm:h-80">
        <Image
          src="/images/result_Walkway-Sealing-TriCity-Concrete-Sealing.jpg"
          alt="Sealed concrete walkway and steps — professional sealing service in Southwestern Ontario"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy-900)]/60" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="h-display text-3xl sm:text-4xl text-white mb-4">
              Protect What You&apos;ve Built
            </h2>
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
              Get Your Free Quote Today
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ + Quote Form ─────────────────────────────────────── */}
      <section id="get-quote" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-2">
                Common Questions
              </h2>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed">
                Straight answers about concrete sealing — from process and timing to cost and warranty.
              </p>
              <FaqAccordion faqs={faqs.slice(0, 5)} />
              <div className="mt-6">
                <Link href="/faq" className="btn btn-outline px-6 py-3">
                  View All FAQs
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div>
              <p className="eyebrow">Free Quote</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-2">
                Get Your Free Estimate
              </h2>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed">
                We reply within {site.responseTime}. No obligation, no sales pressure — just honest pricing.
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
