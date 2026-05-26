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
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-[var(--charcoal-900)]">
        <Image
          src="/images/banner-1.webp"
          alt="Beautifully stained cedar deck in Toronto, Ontario — professional deck staining by Toronto Deck Stainers"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow !text-[var(--accent)]">
              Since 2008 · Toronto &amp; All GTA
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Deck Staining &amp; Restoration —{" "}
              <span className="text-[var(--accent)]">1,500+ GTA Decks Restored.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
              Premium eco-friendly stains built to withstand Canadian winters. Protecting Toronto decks
              from freeze-thaw damage, UV fading, and spring moisture since 2008.
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

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60">
              {["Licensed & Insured", "Eco-Friendly Products", "Free On-Site Estimates", "15+ Years Experience"].map((t) => (
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

      {/* ── 2. Stats Strip ──────────────────────────────────────────── */}
      <TrustBar />

      {/* ── 3. Services ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Complete Deck Care for Toronto & GTA"
            description="From a simple re-stain to full structural restoration — every job backed by 15+ years of experience and premium eco-friendly products."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* ── 4. Pain Point / Why ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/banner-2.webp"
                  alt="Professional deck staining in progress — Toronto Deck Stainers applying premium stain"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-44 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/after-1.jpg"
                  alt="Deck after professional staining by Toronto Deck Stainers"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-[var(--border)]">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">Engineered for Canada</p>
                <p className="text-[var(--charcoal)] font-semibold text-sm mt-0.5">3–5 yr lifespan with premium stain</p>
              </div>
            </div>

            <div className="lg:pb-8">
              <p className="eyebrow">Why Decks Fail Here</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Is Your Deck Greying and Cracking After Every Winter?
              </h2>
              <p className="text-lg text-[var(--concrete)] mb-6 leading-relaxed">
                Toronto sees 70+ freeze-thaw cycles per year. Water soaks into untreated wood,
                freezes, expands 9%, and splits fibres from within. Combined with UV summers and
                heavy spring rain, most GTA decks degrade far faster than they should.
              </p>

              <div className="mb-6 space-y-2">
                <h3 className="font-bold text-[var(--charcoal)] mb-3 text-sm uppercase tracking-wide">
                  Common deck problems we solve:
                </h3>
                {[
                  "Grey, weathered wood from UV fading and neglect",
                  "Cracking and splitting from freeze-thaw moisture",
                  "Peeling or flaking old stain from poor-prep application",
                  "Mould and mildew growth from spring moisture",
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
                  Our Story &amp; Process
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Before & After Gallery ───────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Before & After"
            title="See the Transformation"
            description="Real decks, real results — before and after professional staining and restoration across Toronto and the GTA."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/before-1.jpg", alt: "Deck before professional power washing and staining — grey weathered wood", label: "Before" },
              { src: "/images/after-1.jpg", alt: "Deck after professional staining by Toronto Deck Stainers — rich warm cedar", label: "After" },
              { src: "/images/before-2.jpg", alt: "Weathered deck boards before cleaning and restoration in Toronto", label: "Before" },
              { src: "/images/after-2.jpg", alt: "Beautiful restored deck after staining and sealing by Toronto Deck Stainers", label: "After" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-900)]/80 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${img.label === "After" ? "bg-[var(--accent)] text-white" : "bg-white/20 text-white"}`}>
                    {img.label}
                  </span>
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

      {/* ── 6. Process Steps ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our 6-Step Deck Restoration Process"
            description="Every project follows the same proven process — proper prep, professional products, and a final walkthrough every time."
          />
          <StepProcess />
        </div>
      </section>

      {/* ── 7. Pricing ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Transparent Pricing"
            title="How Much Does Deck Staining Cost in Toronto?"
            description="Straightforward pricing — no hidden fees, no surprises. Every project gets a written estimate before work begins."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                service: "Deck Staining (1 Coat)",
                rows: [
                  { size: "Small (up to 200 sq ft)", price: "$400 – $700" },
                  { size: "Medium (200–400 sq ft)", price: "$700 – $1,200" },
                  { size: "Large (400+ sq ft)", price: "$1,200 – $2,000+" },
                ],
              },
              {
                service: "Deck Staining (2 Coat)",
                rows: [
                  { size: "Small (up to 200 sq ft)", price: "$600 – $900" },
                  { size: "Medium (200–400 sq ft)", price: "$900 – $1,500" },
                  { size: "Large (400+ sq ft)", price: "$1,500 – $2,500+" },
                ],
              },
              {
                service: "Deck Restoration",
                rows: [
                  { size: "Small (up to 200 sq ft)", price: "$800 – $1,400" },
                  { size: "Medium (200–400 sq ft)", price: "$1,400 – $2,200" },
                  { size: "Large (400+ sq ft)", price: "$2,200 – $3,500+" },
                ],
              },
              {
                service: "Deck Sealing",
                rows: [
                  { size: "Small (up to 200 sq ft)", price: "$300 – $600" },
                  { size: "Medium (200–400 sq ft)", price: "$600 – $1,000" },
                  { size: "Large (400+ sq ft)", price: "$1,000 – $1,800+" },
                ],
              },
              {
                service: "Fence Staining",
                rows: [
                  { size: "Per linear foot", price: "$8 – $14 / ft" },
                  { size: "Both sides included", price: "Always" },
                  { size: "Prep wash included", price: "Always" },
                ],
              },
              {
                service: "Power Washing (Add-On)",
                rows: [
                  { size: "Small (up to 200 sq ft)", price: "$150 – $250" },
                  { size: "Medium (200–400 sq ft)", price: "$200 – $350" },
                  { size: "Large (400+ sq ft)", price: "$300 – $500" },
                ],
              },
            ].map((tier) => (
              <div key={tier.service} className="card p-6">
                <h3 className="font-bold text-[var(--charcoal)] text-base mb-4 pb-3 border-b border-[var(--border)]">
                  {tier.service}
                </h3>
                <div className="space-y-3">
                  {tier.rows.map((row) => (
                    <div key={row.size} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--concrete)]">{row.size}</span>
                      <span className="text-sm font-bold text-[var(--charcoal)]">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[var(--concrete)] text-sm mb-4">
              Every deck is different. Get an accurate, no-obligation written estimate within 24 hours.
            </p>
            <a href="#get-quote" className="btn btn-primary px-7 py-3">
              Get My Free Estimate
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What GTA Homeowners Say"
            description="Real reviews from real customers across Toronto, Richmond Hill, Vaughan, Markham, and the GTA."
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
                <div>
                  <p className="font-semibold text-sm text-white">{t.author}</p>
                  <p className="text-xs text-white/50">{t.city}, ON · {t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Why Choose Us ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-6">
                Toronto&apos;s Most Trusted Deck Staining Team
              </h2>
              <p className="text-lg text-[var(--concrete)] leading-relaxed mb-8">
                Since 2008, we&apos;ve built our reputation one deck at a time — through honest pricing,
                quality prep work, and premium products that actually last.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Local Expertise Since 2008",
                    text: "15+ years restoring GTA decks means we know exactly what products and techniques hold up against Toronto's freeze-thaw cycles, UV summers, and spring moisture.",
                  },
                  {
                    title: "Honest, Transparent Pricing",
                    text: "You get a detailed written estimate before any work begins. No surprise charges, no hidden fees — just fair pricing for quality work.",
                  },
                  {
                    title: "Eco-Friendly Professional Products",
                    text: "We use premium low-VOC, eco-conscious stains and sealers that are safe for your family and pets — without compromising on protection or longevity.",
                  },
                ].map((item) => (
                  <div key={item.title} className="feature-item pl-5">
                    <h3 className="font-bold text-[var(--charcoal)] mb-1">{item.title}</h3>
                    <p className="text-[var(--concrete)] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/deck-restoration.webp"
                alt="Toronto Deck Stainers team completing a professional deck restoration in the GTA"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--charcoal-900)]/30" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-[var(--accent)]">1,500+</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Decks</p>
                  </div>
                  <div className="border-x border-[var(--border)]">
                    <p className="text-2xl font-black text-[var(--accent)]">15+</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[var(--accent)]">5★</p>
                    <p className="text-xs text-[var(--concrete)] font-semibold mt-0.5">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Service Areas ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Serve"
            title="Deck Staining Across the GTA"
            description="Local crews serving Toronto and all surrounding communities — Richmond Hill, Vaughan, Markham, Mississauga, and beyond."
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

      {/* ── 11. FAQ + Quote ─────────────────────────────────────────── */}
      <section id="get-quote" className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-2">
                Common Questions
              </h2>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed">
                Straight answers to what Toronto homeowners ask most about deck staining.
              </p>
              <FaqAccordion faqs={faqs.slice(0, 4)} />
              <div className="mt-6">
                <Link href="/faq" className="btn btn-outline px-6 py-3">
                  View All FAQs
                  <ArrowIcon />
                </Link>
              </div>
            </div>

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
