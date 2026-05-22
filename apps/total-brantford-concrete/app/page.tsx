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
        <Image
          src="/images/Concrete-Driveways-scaled.png"
          alt="Premium stamped concrete driveway installation by Total Brantford Concrete in Brantford, Ontario"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,17,21,0.85) 0%, rgba(15,17,21,0.65) 50%, rgba(15,17,21,0.45) 100%)",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <span className="eyebrow !text-[var(--accent)] !mb-3">
                Brantford · Brant County · Cambridge
              </span>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                Brantford&apos;s Premium{" "}
                <span className="text-[var(--accent)]">Concrete</span>{" "}
                Specialists.
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl normal-case font-normal">
                {site.tagline} Expert concrete driveways, stamped patios, walkways, and repairs across Brantford and Brant County.
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
                {["Written Warranty", "Permit Handling", "Free On-Site Quote"].map((f) => (
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

      {/* Trust bar */}
      <TrustBar />

      {/* Concrete Problems We Solve */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Is Your Concrete Failing?"
            title="We Fix It."
            subtitle="From cracked driveways to sunken slabs, we diagnose and solve every concrete problem with the right solution — not just a patch."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="card p-6 sm:p-8">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent)] mb-4">Is Your Concrete at Risk?</h3>
              <ul className="space-y-3">
                {["Cracks & Surface Damage", "Uneven or Sunken Slabs", "Staining & Discoloration", "Flaking or Spalling", "Poor Drainage Issues"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent)] mb-4">How We Restore Your Concrete</h3>
              <ul className="space-y-3">
                {["Full Concrete Replacement", "Crack Filling & Sealing", "Stamped & Decorative Resurfacing", "Leveling & Re-grading", "Professional Sealing & Coating"].map((item) => (
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

      {/* Before/After Gallery */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Work"
            title="The Difference We Make"
            subtitle="Real projects. Real results. See the transformation yourself."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/Before-1-1-scaled.png" alt="Concrete driveway before restoration in Brantford ON" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Before</div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/After-1-1-scaled.png" alt="Concrete driveway after restoration by Total Brantford Concrete" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-2 left-2 bg-[var(--accent)]/90 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">After</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/Before-2-1.jpeg" alt="Concrete surface before repair and resurfacing in Brantford ON" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Before</div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/after-2-1.png" alt="Concrete surface after professional repair by Total Brantford Concrete" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-2 left-2 bg-[var(--accent)]/90 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">After</div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our Proven Concrete Process"
            subtitle="We follow a strict workflow to ensure every project meets our high standards for durability and finish."
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
            title="Why Choose Total Brantford Concrete?"
            subtitle="At Total Brantford Concrete, we take pride in delivering premium concrete solutions to Brantford homeowners."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Brantford Expertise",
                desc: "We understand local soil conditions and weather patterns, ensuring concrete is mixed and poured to survive Ontario seasons.",
              },
              {
                title: "High-Quality Materials",
                desc: "We never cut corners on the mix. We use high-strength concrete blends and premium sealers to guarantee longevity.",
              },
              {
                title: "Customized Solutions",
                desc: "Every property is unique. We tailor designs, colors, and textures to match your home's architecture and your personal style.",
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
            title="Expert Concrete Services"
            subtitle="Whether you need a simple walkway or a decorative patio, we handle residential and commercial projects with precision."
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
