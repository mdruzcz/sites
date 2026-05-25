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
                Woodstock · Ingersoll · Tillsonburg
              </p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                Expert Deck & Fence Construction in{" "}
                <span className="text-[var(--accent)]">Woodstock</span>
                {" "}& Oxford County.
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl normal-case font-normal">
                Building durable, beautiful outdoor spaces designed for Ontario weather.
                From custom cedar decks to high-security vinyl fencing — built to last and backed by a 5-year workmanship warranty.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#quote" className="btn btn-primary text-sm px-7 py-4">
                  Get a Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link href="/services" className="btn btn-outline-white text-sm px-7 py-4">
                  View Our Services
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--concrete-200)]">
                {["5-Year Workmanship Warranty", "Fully Insured", "Free On-Site Quote"].map((f) => (
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
            title="Decks & Fences, Done Right"
            description="Custom-built decks in cedar, composite, or pressure-treated. Privacy fences in vinyl, wood, decorative steel, or chain-link. Every build sits on 4-ft frost-line footings."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="eyebrow">Why It Lasts</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Most Decks & Fences Fail at the Footing.
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed normal-case font-normal">
                <p>
                  Ontario&apos;s freeze-thaw cycle is unforgiving. Shallow post holes, undersized fasteners, untreated ground contact — and by the third winter, the deck is sagging and the fence is leaning.
                </p>
                <p>
                  We do it right. Every post hole dug to a 4-foot minimum, set in concrete and braced plumb. Premium-grade lumber, galvanized fasteners, and structural fastening done by code. That&apos;s the difference between 8 years and 25.
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
                { label: "Decks Built", value: `${site.stats.decks}+` },
                { label: "Fences Installed", value: `${site.stats.fences}+` },
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

      {/* 5. Material Options */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Material Options"
            title="Choose What Fits Your Home"
            description="Same engineered footings on every project. The difference is the material — pick what matches your budget, look, and maintenance comfort."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8">
              <div className="w-12 h-12 rounded bg-[var(--charcoal)] flex items-center justify-center mb-5">
                <CedarIcon />
              </div>
              <h3 className="h-display text-xl mb-3">Cedar & Pressure-Treated Wood</h3>
              <p className="text-[var(--concrete)] text-sm leading-relaxed normal-case font-normal mb-4">
                The classic warm look of real wood. Western Red Cedar is naturally rot-resistant and ages to a beautiful silver patina. Pressure-treated pine is the most affordable option — both stain or paint to any colour you want.
              </p>
              <ul className="space-y-2">
                {["Natural wood grain + warmth", "Stainable in any colour", "PT: most affordable option", "Cedar: 20-25 year lifespan"].map((f) => (
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
                <CompositeIcon />
              </div>
              <h3 className="h-display text-xl mb-3">Composite Decks & Vinyl Fences</h3>
              <p className="text-[var(--concrete-200)] text-sm leading-relaxed normal-case font-normal mb-4">
                Zero maintenance, never rots, never needs paint or stain. Capped composite decking (Trex/TimberTech) and tongue-and-groove vinyl fencing carry 25+ year manufacturer warranties — pour your weekends into anything but staining.
              </p>
              <ul className="space-y-2">
                {["Never stain, never paint", "25-30 year manufacturer warranty", "Won't warp, rot, or peel", "Dozens of colour + style options"].map((f) => (
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
            description="Decks and fences built across Woodstock, Ingersoll, Tillsonburg, and Oxford County. Real project photos coming as builds wrap up this season."
          />
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
            title="Our 4-Step Build Process"
            description="No pressure. No surprises. Just a quote, a plan, and a build done right the first time."
          />
          <StepProcess />
        </div>
      </section>

      {/* 8. Service Areas */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Work"
            title="Serving Woodstock & Oxford County"
            description="Local crews, local knowledge. Serving Woodstock, Ingersoll, Tillsonburg, Norwich, Embro, and all of Oxford County."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] group-hover:text-[var(--accent)]">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1 normal-case">Decks + Fences →</p>
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
              {testimonials.slice(0, 3).map((t, i) => (
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
            description="The most common questions about decks and fences in Ontario."
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

function CedarIcon() {
  return (
    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 7l8 5 8-5-8-5zM4 17l8 5 8-5M4 12l8 5 8-5" />
    </svg>
  );
}

function CompositeIcon() {
  return (
    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}
