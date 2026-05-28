import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices, getFaqs, getProjects, getTestimonials, getStainColors } from "@/lib/content";
import { site } from "@/lib/site";
import { faqSchema } from "@/lib/jsonld";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import ProjectGallery from "@/components/ProjectGallery";
import StepProcess from "@/components/StepProcess";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";
import QuoteForm from "@/components/QuoteForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
  description:
    "Ontario's expert deck staining, sealing, and restoration specialists. READY Seal® oil-based stains. Free photo quotes in 2 days. Serving London, Woodstock, Brantford & 40+ cities.",
  openGraph: {
    title: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
    description:
      "Ontario's expert deck staining, sealing, and restoration specialists. READY Seal® oil-based stains. Free photo quotes in 2 days.",
    images: ["/images/after-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
    description: "Ontario's expert deck staining specialists. Free photo quotes in 2 business days.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function HomePage() {
  const services = getServices();
  const faqs = getFaqs().slice(0, 5);
  const projects = getProjects();
  const testimonials = getTestimonials(true);
  const stainColors = getStainColors().slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/deck-01.jpg"
          alt="Professionally stained deck in Ontario - DeckStain.ca"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <p className="eyebrow text-[var(--accent)] mb-4">READY Seal® Certified Applicators</p>
              <h1 className="h-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Professional Deck &amp; Fence Staining Across Ontario
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed normal-case font-normal max-w-lg">
                We use READY Seal® oil-based stains — no peeling, no flaking — and deliver free
                photo quotes in just 2 business days. Serving 40+ cities across Southwestern Ontario.
              </p>

              {/* Trust badges inline */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "📷", label: "Photo Quotes", sub: "No visit needed" },
                  { icon: "⚡", label: "2-Day Response", sub: "Fast turnaround" },
                  { icon: "✅", label: "100% Satisfaction", sub: "Guaranteed" },
                ].map((badge) => (
                  <div key={badge.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                    <span className="text-2xl mb-1 block">{badge.icon}</span>
                    <p className="text-white font-bold text-xs">{badge.label}</p>
                    <p className="text-white/60 text-xs">{badge.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Get Free Photo Quote
                </Link>
                <Link href="/projects" className="btn btn-outline-white">
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Right: Quote form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <h2 className="h-display text-xl text-[var(--charcoal)] mb-1">Get a Free Quote</h2>
              <p className="text-[var(--concrete)] text-sm mb-6 normal-case font-normal">
                Tell us about your project — we&apos;ll respond within 2 business days.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <TrustBar />

      {/* ─── SERVICES ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Services"
            description="From deck staining to full restoration, we handle every aspect of your outdoor wood care using premium READY Seal® products."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS PREVIEW ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="Our Work"
            title="Recent Projects — Real Results"
            description="Every project is completed with READY Seal® premium stains and meticulous prep work for results that last."
          />
          <ProjectGallery projects={projects} limit={6} />
          <div className="text-center mt-10">
            <Link href="/projects" className="btn btn-dark">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Why Choose DeckStain.ca</p>
              <h2 className="h-display text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
                Ontario&apos;s Most Trusted Deck Staining Team
              </h2>
              <p className="text-[var(--concrete)] mb-6 leading-relaxed normal-case font-normal">
                We built our reputation on quality materials, honest pricing, and a no-hassle quote
                process. No pushy sales visits — just send us photos and get a real quote.
              </p>
              <ul className="space-y-3 mb-8">
                {site.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--charcoal)] text-sm normal-case font-normal">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Projects Completed" },
                  { value: "8+", label: "Years Experience" },
                  { value: "40+", label: "Cities Served" },
                  { value: "100%", label: "Satisfaction Rate" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[var(--surface)] rounded-xl p-4 text-center border border-[var(--border)]">
                    <p className="text-[var(--accent)] font-bold text-2xl font-[var(--font-montserrat)]">{stat.value}</p>
                    <p className="text-[var(--concrete)] text-xs mt-1 normal-case font-normal">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/after-staining.jpg"
                alt="Professional deck staining result using READY Seal oil-based stain in Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STAIN CHOICES PREVIEW ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="Color Selection"
            title="8 READY Seal® Color Choices"
            description="Choose from 8 rich, oil-based stain colors to perfectly complement your home's exterior and personal style."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {stainColors.map((color) => (
              <div key={color.slug} className="text-center">
                <div
                  className="w-full aspect-square rounded-xl border-2 border-[var(--border)] mb-3 shadow-inner"
                  style={{ backgroundColor: color.swatchHex }}
                />
                <p className="font-bold text-sm text-[var(--charcoal)]">{color.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/stain-choices" className="btn btn-outline">
              View All 8 Colors
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BEFORE/AFTER ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Transformations"
            title="See the Difference"
            description="Our thorough prep process — cleaning, sanding, and careful application — delivers stunning results that last."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/before-after-cleaning.jpg"
                alt="Before and after deck cleaning by DeckStain.ca - London, Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Before &amp; After Cleaning
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/after-deck-cleaning-staining.jpg"
                alt="After professional deck staining and sealing in Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-[var(--accent)]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Final Stained Result
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 3-Step Process"
            description="Getting a quote is simple. No in-person visit needed — just photos and a few details."
          />
          <StepProcess />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Reviews"
            title="What Our Clients Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[var(--concrete)] text-sm leading-relaxed mb-4 normal-case font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--charcoal)] text-sm">{t.author}</p>
                    <p className="text-[var(--concrete)] text-xs">{t.city}, ON</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="Service Areas"
            title="Serving Southwestern Ontario"
            description="We travel across Ontario to deliver the same quality workmanship to every customer."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {site.serviceAreas.map((area) => (
              <Link
                key={area}
                href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}-on`}
                className="bg-white border border-[var(--border)] rounded-xl px-4 py-3 text-center text-sm font-semibold text-[var(--charcoal)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/service-areas" className="btn btn-ghost">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
          />
          <FaqAccordion faqs={faqs} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <CtaBand />
    </>
  );
}
