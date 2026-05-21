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

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-charcoal">
        <Image
          src="/images/banner-1.png"
          alt="High-strength concrete driveway installation in Tillsonburg, Ontario by Concrete Tilsonburg"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <p className="eyebrow !text-[var(--accent)] !mb-3">
                {site.yearsExperience}+ Years · Tillsonburg, ON
              </p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                High-Strength Concrete Built for{" "}
                <span className="text-[var(--accent)]">Oxford County Winters.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl">
                Driveways, stamped patios, and structural repairs engineered to survive Tillsonburg&apos;s freeze-thaw cycles. Get your firm estimate in {site.responseTime}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#contact" className="btn btn-primary text-base px-7 py-4">
                  Get a Free Estimate
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link href="/gallery" className="btn btn-ghost text-base px-7 py-4">
                  View Our Work
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--concrete-200)]">
                <div className="flex items-center gap-2">
                  <CheckIcon /> Written Warranty
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Fully Insured
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Free On-Site Estimate
                </div>
              </div>
            </div>
            <div className="lg:col-span-2" id="contact">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Pain Point */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Why Concrete Fails Here</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Is Your Concrete Cracking After Every Winter?
              </h2>
              <p className="text-lg text-[var(--concrete)] mb-6 leading-relaxed">
                Oxford County&apos;s freeze-thaw cycle is brutal — temperatures swing above and below zero repeatedly every winter, forcing water in and out of every tiny crack and pore. Most concrete fails because it was never engineered to handle this.
              </p>
              <div className="mb-6">
                <h3 className="font-bold text-[var(--charcoal)] mb-3">Common problems we see:</h3>
                <ul className="space-y-2">
                  {[
                    "Spalling and pitting from road salt and freeze-thaw",
                    "Deep surface cracks expanding every spring",
                    "Sunken or heaving slabs creating trip hazards",
                    "Faded or worn stamped concrete losing its finish",
                    "Garage floor dusting and crumbling at the surface",
                  ].map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-[var(--concrete)]">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[var(--charcoal)] mb-3">Our proven solutions:</h3>
                <ul className="space-y-2">
                  {site.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--accent)]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3 text-[var(--accent)]" />
                      </span>
                      <span className="text-[var(--charcoal)] font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/banner-2.png"
                alt="Freshly poured and finished concrete driveway in Tillsonburg, ON — engineered for freeze-thaw durability"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">Engineered for Ontario</p>
                <p className="text-[var(--charcoal)] font-semibold">Air-entrained mix. 25–30 year lifespan with sealing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4-Step Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our 4-Step Concrete Process"
            description="Every project follows the same four-step process — no shortcuts, no skipped steps, every time."
          />
          <StepProcess />
        </div>
      </section>

      {/* 5. Services Grid */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Concrete Built for Every Surface"
            description="From broom-finish driveways to stamped patios and structural garage floors — every job uses the same reinforced base and engineered pour."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Project Gallery */}
      <section className="py-16 sm:py-20 bg-white">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/85 via-[var(--charcoal)]/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Tillsonburg Homeowners Say"
            description="Real reviews from real customers across Oxford County and Southwestern Ontario."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6 flex flex-col">
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--charcoal)] leading-relaxed mb-4 flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-[var(--charcoal)]">
                  {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}, ON</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Service Areas */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Pour"
            title="Serving Tillsonburg & Oxford County"
            description="Local crews, local knowledge, local pricing. We pour concrete throughout Oxford County and surrounding Southwestern Ontario communities."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-4 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)]">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1">View services →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas" className="btn btn-outline">
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            description="Straight answers to what Tillsonburg homeowners ask most."
          />
          <FaqAccordion faqs={faqs.slice(0, 4)} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
