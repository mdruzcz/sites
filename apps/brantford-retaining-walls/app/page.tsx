import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getFeaturedTestimonials, getFaqs } from "@/lib/content";
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
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 5))) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--charcoal)] min-h-[540px] sm:min-h-[620px] flex items-center">
        <div className="hero-overlay absolute inset-0" />
        <Image
          src="/images/Brantford-Retaining-Walls.png"
          alt="Professional retaining wall installation in Brantford, Ontario"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <span className="eyebrow !text-[var(--accent)] !mb-3">
                Brantford · Paris · Cambridge · Brant County
              </span>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                Professional{" "}
                <span className="text-[var(--accent)]">Retaining Wall</span>{" "}
                Contractors.
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl normal-case font-normal">
                {site.tagline} We design and build high-quality retaining walls that protect your property, prevent soil erosion, and enhance curb appeal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#quote" className="btn btn-primary text-sm px-7 py-4">
                  Get a Free Estimate
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link href="/gallery" className="btn btn-outline-white text-sm px-7 py-4">
                  View Our Work
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--concrete-200)]">
                {["Proper Drainage Included", "50+ Year Lifespan", "Free On-Site Quote"].map((f) => (
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

      <TrustBar />

      {/* Problems & Solutions */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Is Your Wall Failing?"
            title="Retaining Wall Problems & Solutions"
            subtitle="From leaning walls to poor drainage, we diagnose and solve every retaining wall problem with the right engineered solution."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="card p-6 sm:p-8">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent)] mb-4">Common Problems</h3>
              <ul className="space-y-3">
                {["Leaning or Tilting Wall", "Poor Drainage Behind Wall", "Cracks & Block Separation", "Soil Erosion & Washout", "Bulging or Bowing", "Complete Wall Collapse"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent)] mb-4">Our Proven Solutions</h3>
              <ul className="space-y-3">
                {["Reinforced Foundation & Compacted Base", "Drainage Installation (Weep Holes + Pipes)", "Crack Repair & Block Replacement", "Proper Grading & Water Redirection", "Structural Rebuild with Geogrid", "Preventative Maintenance Plans"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <CheckIcon className="text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our 4-Step Process"
            subtitle="Every project follows a proven workflow to ensure structural integrity and a beautiful finish."
            light
          />
          <StepProcess />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Why Homeowners in Brantford Trust Us"
            subtitle="We don't just stack stones — we engineer long-term solutions designed for Ontario's climate."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Local Expertise",
                desc: "We know Brantford's clay-heavy soil and freeze-thaw cycles. Every wall is engineered specifically for local conditions.",
              },
              {
                title: "Engineered for Durability",
                desc: "Proper drainage, Geogrid reinforcement, and solid base compaction prevent shifting and leaning for 50+ years.",
              },
              {
                title: "Custom Aesthetics",
                desc: "From natural armour stone to modern interlocking blocks, we match your home's style and your vision.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 sm:p-8">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Professional Retaining Wall Services"
            subtitle="We offer a variety of materials and styles to suit your budget and your property's needs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What They Say" title="Testimonials" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--concrete)] leading-relaxed mb-4 italic normal-case">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-[var(--charcoal)]">{t.name}</p>
                  <p className="text-xs text-[var(--concrete)]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Got Questions?" title="Frequently Asked Questions" center />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function CheckIcon({ className = "text-[var(--concrete-200)]" }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
