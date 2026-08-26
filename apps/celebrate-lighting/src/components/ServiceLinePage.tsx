import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteFormCompact } from "@/components/QuoteFormCompact";
import { GalleryTabs } from "@/components/GalleryTabs";
import { LineComparison } from "@/components/LineComparison";
import { site } from "@/lib/site";
import { getProjects, getFeaturedTestimonials, type ServiceLine } from "@/lib/content";

/**
 * The pillar-page shell shared by /permanent-lighting and /seasonal-lighting.
 *
 * Both lines get the same depth and the same section rhythm — the copy comes
 * entirely from service-lines.json — while `extraSections` lets each line
 * inject what only it needs (permanent: hardware specs; seasonal: the season
 * timeline and the rent-vs-buy plans). Sharing the shell is what guarantees
 * neither line ends up the poor relation.
 */

export type LineOffer = {
  cta: string;
  ctaLong: string;
  promise: string;
  detail: string;
  short: string;
};

function citySlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
}

export function ServiceLinePage({
  line,
  offer,
  heroImage,
  heroImageAlt,
  heroIllustration,
  ctaImage,
  ctaImageAlt,
  proofPoints,
  extraSections,
  afterPricing,
  galleryCategory,
  urgencyNote,
}: {
  line: ServiceLine;
  offer: LineOffer;
  heroImage?: string;
  heroImageAlt?: string;
  /** Used instead of a photo when we have no honest photography for the line. */
  heroIllustration?: ReactNode;
  ctaImage?: string;
  ctaImageAlt?: string;
  proofPoints: { stat: string; label: string }[];
  extraSections?: ReactNode;
  afterPricing?: ReactNode;
  galleryCategory?: "residential" | "commercial";
  urgencyNote?: string;
}) {
  const projects = getProjects().filter((p) =>
    galleryCategory ? p.category === galleryCategory : true
  );
  const testimonials = getFeaturedTestimonials().slice(0, 3);
  const isSeasonal = line.slug === "seasonal-lighting";
  const accent = isSeasonal ? "var(--gold)" : "var(--accent)";

  const formProps = {
    serviceValue: isSeasonal ? "Seasonal C9 Lighting" : "Free On-Site Demo",
    submitLabel: offer.cta,
    ...(isSeasonal
      ? {
          successTitle: "Quote request received",
          successBody: (
            <>
              We&apos;ll call within <strong>24 hours</strong> to walk the property, measure your rooflines
              and give you a firm per-season price — with your early-bird rate locked in.
            </>
          ),
          reassurance: `No obligation. Book by ${site.seasonal.deadline} for the season's best rates.`,
        }
      : {}),
  };

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={heroImageAlt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover hero-drift"
              />
              <div className="absolute inset-0 night-veil" />
            </>
          ) : (
            <>
              {heroIllustration}
              <div className="absolute inset-0 night-veil" />
            </>
          )}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10 items-start">
            <div className="lg:col-span-7 lg:row-start-1">
              <nav className="text-sm text-[#93a1b8] mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{line.name}</span>
              </nav>

              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-5" style={{ color: accent }}>
                {line.eyebrow}
              </p>

              <h1 className="font-display text-[2.4rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem] font-extrabold text-white mb-6 text-balance">
                {line.heroH1}{" "}
                <span style={{ color: accent }}>{line.heroH1Accent}</span>
              </h1>

              <p className="text-lg text-[#c7d2e1] leading-relaxed mb-8 max-w-xl">{line.heroSub}</p>

              {urgencyNote && (
                <div
                  className="inline-flex items-start gap-2.5 rounded-xl px-4 py-3 mb-8 text-sm"
                  style={{ background: "rgba(232,182,0,0.12)", border: "1px solid var(--gold)" }}
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--gold)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">{urgencyNote}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn text-base px-8"
                  style={{ background: accent, color: "#04121a" }}
                >
                  {offer.ctaLong}
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8">
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="order-2 lg:order-none lg:col-span-5 lg:row-start-1 lg:row-span-2">
              <div className="card-light p-6 sm:p-7">
                <h2 className="font-display text-xl font-bold text-slate-900 leading-snug">
                  {isSeasonal ? "Get your seasonal quote" : "Book your free on-site demo"}
                </h2>
                <p className="text-sm text-slate-600 mt-1.5 mb-5">
                  {isSeasonal
                    ? `We'll measure, design and give you a firm per-season price. Book by ${site.seasonal.deadline} for the best rates.`
                    : "We'll call within 24 hours to set a time. No cost, no obligation, no deposit."}
                </p>
                <QuoteFormCompact formId={`${line.slug}-hero`} {...formProps} />
              </div>
            </div>

            <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 max-w-2xl self-start">
              {proofPoints.map((p) => (
                <div key={p.stat}>
                  <div className="stat-num text-2xl sm:text-[1.7rem] mb-1.5" style={{ color: accent }}>
                    {p.stat}
                  </div>
                  <div className="text-[0.7rem] leading-snug text-[#93a1b8]">{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== AUDIENCE FIT ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Is this the right fit?</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              {line.tagline}
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
              We&apos;d rather point you at the other option than sell you the wrong one. Here&apos;s the
              honest test.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-7" style={{ borderColor: accent }}>
              <h3 className="font-bold text-[var(--foreground)] text-lg mb-5">{line.audienceFit.heading}</h3>
              <ul className="space-y-3">
                {line.audienceFit.yes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    <svg className="w-4 h-4 shrink-0 mt-1" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <h3 className="font-bold text-[var(--foreground)] text-lg mb-5">{line.audienceFit.noHeading}</h3>
              <ul className="space-y-3 mb-6">
                {line.audienceFit.no.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                    <svg className="w-4 h-4 shrink-0 mt-1 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={isSeasonal ? "/permanent-lighting" : "/seasonal-lighting"}
                className="btn btn-outline w-full justify-center"
              >
                {isSeasonal ? "See Permanent Lighting" : "See Seasonal C9 Lighting"} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">What you get</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Why homeowners pick {line.shortName.toLowerCase()}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {line.benefits.map((b, i) => (
              <div key={b.title} className="card p-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 font-display font-extrabold text-sm"
                  style={{ background: "var(--accent-light)", color: accent }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2.5">{b.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">How it works</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              {isSeasonal ? "From booking to takedown" : "From first call to lights on"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {line.steps.map((s) => {
              const isKey = "highlight" in s && Boolean(s.highlight);
              return (
                <div key={s.step} className="card p-7" style={isKey ? { borderColor: accent } : undefined}>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold text-sm shrink-0"
                      style={
                        isKey
                          ? { background: accent, color: "#04121a" }
                          : { background: "var(--accent-light)", color: accent }
                      }
                    >
                      {s.step}
                    </div>
                    {isKey && (
                      <span
                        className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: "var(--accent-light)", color: accent }}
                      >
                        {s.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] mb-2.5">{s.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== LINE-SPECIFIC SECTIONS ==================== */}
      {extraSections}

      {/* ==================== PRICING ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="section-eyebrow mb-3">Pricing</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                {line.pricing.heading}
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">{line.pricing.lead}</p>
              <p className="text-sm text-[var(--foreground)] font-medium">{line.pricing.closer}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/contact" className="btn text-base px-8" style={{ background: accent, color: "#04121a" }}>
                  {offer.ctaLong}
                </Link>
                <a href={site.phoneHref} className="btn btn-outline px-8">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="card p-7">
              <h3 className="font-bold text-[var(--foreground)] mb-5">What moves the price</h3>
              <ul className="space-y-4">
                {line.pricing.drivers.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {afterPricing}

      {/* ==================== GALLERY ==================== */}
      {projects.length > 0 && (
        <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-eyebrow mb-3">Our work</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
                Real installs, shown after dark
              </h2>
            </div>
            <GalleryTabs projects={projects} showViewAll />
          </div>
        </section>
      )}

      {/* ==================== COMPARISON ==================== */}
      <LineComparison highlight={line.slug as "permanent-lighting" | "seasonal-lighting"} />

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Customer reviews</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              What Ontario homeowners say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-7 flex flex-col">
                <div className="flex mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4" style={{ color: "var(--gold)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[#c3cddc] leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="font-semibold text-sm text-[var(--foreground)]">{t.author}</div>
                  <div className="text-xs text-[var(--muted)]">{t.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CITIES ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-3">Where we work</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                {line.name} across Southwestern Ontario
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                We&apos;re based in Woodstock and cover Oxford County and the cities around it. Not sure
                whether you&apos;re in our area? Call — chances are we cover it.
              </p>
              <Link href="/commercial" className="btn btn-outline">
                Commercial &amp; municipal work →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {site.serviceAreas.map((city) => (
                <Link
                  key={city}
                  href={`/${line.slug}/${citySlug(city)}`}
                  className="flex items-center gap-2.5 py-2.5 border-b text-[var(--foreground)] hover:text-[var(--accent)] transition-colors text-sm min-h-[44px]"
                  style={{ borderColor: "var(--border)" }}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Common questions</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              {line.name} FAQs
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {line.faqs.map((faq, i) => (
              <details key={faq.question} className="card p-5 group" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 font-semibold text-[var(--foreground)]">
                  {faq.question}
                  <svg className="w-5 h-5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CLOSING CTA ==================== */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--deep)" }}>
        {ctaImage && (
          <div className="absolute inset-0">
            <Image src={ctaImage} alt={ctaImageAlt ?? ""} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 night-veil" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-4" style={{ color: accent }}>
                {offer.short}
              </p>
              <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-white leading-[1.07] mb-6 text-balance">
                {isSeasonal
                  ? "Book before the calendar fills up."
                  : "This is the last year you hang Christmas lights."}
              </h2>
              <p className="text-[#c7d2e1] leading-relaxed mb-8 text-lg">{offer.detail}</p>
              <a href={site.phoneHref} className="btn btn-ghost-white px-8">
                Or call {site.phone}
              </a>
            </div>
            <div className="card-light p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">
                {isSeasonal ? "Get your seasonal quote" : "Book your free on-site demo"}
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                {isSeasonal
                  ? `Firm per-season price after we measure. Book by ${site.seasonal.deadline} for the best rates.`
                  : "No cost, no deposit, no obligation."}
              </p>
              <QuoteFormCompact formId={`${line.slug}-closing`} {...formProps} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
