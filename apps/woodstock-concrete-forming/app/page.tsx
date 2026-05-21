import Link from "next/link";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
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
  const areas = getServiceAreas();
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 5))) }}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[var(--charcoal)] min-h-[520px] sm:min-h-[600px] flex items-center">
        {/* Background: grey concrete texture via CSS pattern until real photo is added */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <p className="eyebrow !text-[var(--accent)] !mb-3">
                Woodstock · Brantford · Cambridge
              </p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                Expert Concrete Forming in{" "}
                <span className="text-[var(--accent)]">Woodstock</span>{" "}
                & Oxford County.
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl normal-case font-normal">
                Specializing in durable driveways and patios that enhance your home&apos;s value.
                Natural broom finish or coloured stamped concrete — built to outlast Ontario winters.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#quote" className="btn btn-primary text-sm px-7 py-4">
                  Get a Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link href="/gallery" className="btn btn-outline-white text-sm px-7 py-4">
                  View Our Work
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--concrete-200)]">
                {["Written Warranty", "Fully Insured", "Free On-Site Quote"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckIcon /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2" id="quote">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Services */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Built for Every Outdoor Surface"
            description="Two specialties, done right. Natural broom finish for clean durability, or coloured stamped concrete for high-end curb appeal."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Us / About */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Why It Cracks</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Most Concrete Fails Before the First Winter.
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed normal-case font-normal">
                <p>
                  Ontario&apos;s freeze-thaw cycle will find every weakness in a concrete pour. Thin slabs, skipped rebar, wrong base depth, no control joints — by the third spring, the cracks show.
                </p>
                <p>
                  We do it properly. Every driveway and patio gets a compacted granular base, air-entrained concrete, reinforced steel, and joints placed in the right spots. That&apos;s the difference between 8 years and 30.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {site.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </span>
                    <span className="text-[var(--charcoal)] font-medium text-sm normal-case">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Driveways Poured", value: `${site.stats.driveways}+` },
                { label: "Patios Built", value: `${site.stats.patios}+` },
                { label: "Happy Homeowners", value: `${site.stats.happyHomes}+` },
                { label: "Year Lifespan", value: `${site.stats.yearsLifespan}` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-[var(--border)] p-6 text-center flex flex-col items-center justify-center"
                >
                  <p className="text-4xl font-extrabold text-[var(--accent)]">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Finish Options */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Finish Options"
            title="Choose Your Look"
            description="Both finishes are poured on the same engineered reinforced base. The difference is surface style and cost."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8">
              <div className="w-12 h-12 rounded bg-[var(--charcoal)] flex items-center justify-center mb-5">
                <BroomIcon />
              </div>
              <h3 className="h-display text-xl mb-3">Natural Broom Finish</h3>
              <p className="text-[var(--concrete)] text-sm leading-relaxed normal-case font-normal mb-4">
                The classic Ontario driveway. Textured for grip, clean lines, easy to maintain.
                The most popular choice for its timeless look and lower cost — the same engineered base as stamped, just a different surface.
              </p>
              <ul className="space-y-2">
                {["Most popular finish", "Slip-resistant texture", "Clean modern look", "Lowest maintenance"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--charcoal)]">
                    <CheckIcon className="w-4 h-4 text-[var(--accent)]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--charcoal)] rounded-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                Premium
              </div>
              <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-5">
                <StampIcon />
              </div>
              <h3 className="h-display text-xl mb-3">Coloured Stamped Concrete</h3>
              <p className="text-[var(--concrete-200)] text-sm leading-relaxed normal-case font-normal mb-4">
                Integrally coloured mix stamped with stone, slate, or brick patterns and sealed with UV-stable acrylic.
                High-end decorative look at a fraction of natural stone cost — with no weed-filled joints.
              </p>
              <ul className="space-y-2">
                {["Dozens of pattern + colour combos", "Colour throughout (won't fade)", "UV-stable sealer included", "Custom borders available"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckIcon className="w-4 h-4 text-[var(--accent)]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery preview */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recent Projects"
            title="See the Work"
            description="Driveways and patios across Woodstock, Brantford, and Cambridge. Drop your own photos in the uploads/ folder to populate this gallery."
          />
          {/* Placeholder grid until images are added */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[var(--border)] rounded-xl flex items-center justify-center shimmer">
                <span className="sr-only">Project photo placeholder</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="3 Steps to Perfect Concrete"
            description="No pressure. No surprises. Just a quote, a plan, and a pour done right."
          />
          <StepProcess />
        </div>
      </section>

      {/* 8. Service Areas */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Work"
            title="Serving Woodstock, Brantford & Cambridge"
            description="Local crews, local knowledge. Serving Oxford County, Brant County, and Waterloo Region."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] group-hover:text-[var(--accent)]">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1 normal-case">Driveways + Patios →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Reviews"
              title="What Homeowners Say"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={`${t.author}-${i}`} className="card p-6 flex flex-col corner-accent">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[var(--charcoal)] leading-relaxed mb-4 flex-1 text-sm normal-case font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-bold text-xs uppercase tracking-wider text-[var(--charcoal)]">
                    {t.author} <span className="font-normal normal-case text-[var(--concrete)]">— {t.city}, ON</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Honest Answers"
            description="The most common questions about concrete driveways and patios in Ontario."
          />
          <FaqAccordion faqs={faqs.slice(0, 6)} />
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
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BroomIcon() {
  return (
    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M12 3v18M5 8l7-5 7 5" />
    </svg>
  );
}

function StampIcon() {
  return (
    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M6 16h12l-1-7H7l-1 7zM9 9V6a3 3 0 016 0v3" />
    </svg>
  );
}
