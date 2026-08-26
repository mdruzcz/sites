import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteFormCompact } from "@/components/QuoteFormCompact";
import { site } from "@/lib/site";
import { type ServiceLine, type City } from "@/lib/content";

/**
 * Per-line, per-city landing page: /permanent-lighting/[city] and
 * /seasonal-lighting/[city].
 *
 * These exist to catch the searches the generic city pages can't — someone
 * typing "Christmas light installation London" and someone typing "permanent
 * lighting London" want visibly different pages. The `localContext` prose
 * already written per city in service-areas.json does the heavy lifting on
 * uniqueness, so these aren't thin duplicates of one another.
 *
 * Every page cross-links to the same city on the other line, so a visitor who
 * landed on the wrong product is one click from the right one.
 */
export function LineCityPage({
  line,
  city,
  otherLine,
  nearbyCities,
  heroImage,
  heroImageAlt,
  heroBackdrop,
  accent,
  extra,
}: {
  line: ServiceLine;
  city: City;
  otherLine: ServiceLine;
  nearbyCities: City[];
  heroImage?: string;
  heroImageAlt?: string;
  heroBackdrop?: ReactNode;
  accent: string;
  extra?: ReactNode;
}) {
  const isSeasonal = line.slug === "seasonal-lighting";
  const offer = isSeasonal ? site.seasonal : site.demo;

  const formProps = {
    serviceValue: isSeasonal ? "Seasonal C9 Lighting" : "Free On-Site Demo",
    submitLabel: offer.cta,
    ...(isSeasonal
      ? {
          successTitle: "Quote request received",
          successBody: (
            <>
              We&apos;ll call within <strong>24 hours</strong> to book a time to measure your {city.name} home
              and give you a firm per-season price.
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
              <Image src={heroImage} alt={heroImageAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 night-veil" />
            </>
          ) : (
            <>
              {heroBackdrop}
              <div className="absolute inset-0 night-veil" />
            </>
          )}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10 items-start">
            <div className="lg:col-span-7">
              <nav className="text-sm text-[#93a1b8] mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/${line.slug}`} className="hover:text-[var(--accent)]">{line.name}</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{city.name}</span>
              </nav>

              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-4" style={{ color: accent }}>
                {city.name}, Ontario
              </p>

              <h1 className="font-display text-[2.2rem] leading-[1.07] sm:text-[2.75rem] lg:text-[3.25rem] font-extrabold text-white mb-5 text-balance">
                {isSeasonal
                  ? `Christmas Light Installation in ${city.name}`
                  : `Permanent LED Lighting in ${city.name}`}
              </h1>

              <p className="text-lg text-[#c7d2e1] leading-relaxed mb-8 max-w-xl">
                {isSeasonal
                  ? `Classic C9 Christmas lights, custom-cut to your ${city.name} rooflines. We install in the fall, service them all season, then take everything down and store it in January.`
                  : `Colour-matched LED track fitted into your soffit, controlled from your phone. Installed once on your ${city.name} home, then lit every night of the year.`}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/contact" className="btn text-base px-8" style={{ background: accent, color: "#04121a" }}>
                  {offer.ctaLong}
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8">
                  {site.phone}
                </a>
              </div>

              <p className="text-sm text-[#93a1b8]">{offer.promise}</p>
            </div>

            <div className="order-2 lg:order-none lg:col-span-5">
              <div className="card-light p-6 sm:p-7">
                <h2 className="font-display text-lg font-bold text-slate-900 leading-snug">
                  {isSeasonal ? `Seasonal quote in ${city.name}` : `Free demo in ${city.name}`}
                </h2>
                <p className="text-sm text-slate-600 mt-1.5 mb-5">
                  {isSeasonal
                    ? `We'll measure your rooflines and give you a firm per-season price.`
                    : `We'll come out and light up a live sample on your house first.`}
                </p>
                <QuoteFormCompact formId={`${line.slug}-${city.slug}`} {...formProps} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LOCAL CONTEXT ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>
                {line.shortName} lighting in {city.name}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                We know {city.name} homes.
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>{city.localContext}</p>
                <p>
                  {isSeasonal
                    ? `For seasonal work in ${city.name}, the thing that matters most is booking position. Our install crews work through October and November across the whole service area, and the calendar fills first-come. Reserve early and you get the season's best rate plus first pick of dates; leave it until late November and you take what's left. Every ${city.name} booking includes in-season service — if a run goes dark in December, you call and we come out.`
                    : `Every ${city.name} installation starts with a free on-site demo. We come to the house, measure the rooflines, take a physical colour sample of your soffit and fascia so the track can be matched to it, then mount a live sample section and turn it on. You see your own home lit up, at night, before you've committed to anything.`}
                </p>
                <p>
                  {isSeasonal
                    ? `We handle rooflines, columns, porch garland, wreaths, tree wrapping and walkway stakes, and we'll plan them together so the whole property reads as one display rather than a collection of parts. Lights can be rented — we own, store and reinstall them each year — or bought outright so you pay only for labour after the first season.`
                    : `Because the system is permanent, ${city.name} homeowners tend to use it far beyond December: warm white as the everyday setting, orange for Halloween, red and white on Canada Day, team colours on game day. It's all controlled from an app, and changing the whole house takes a few seconds.`}
                </p>
              </div>

              {extra}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4">{city.name} at a glance</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--muted)]">Population</dt>
                    <dd className="font-semibold text-[var(--foreground)]">{city.population}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--muted)]">Service</dt>
                    <dd className="font-semibold text-[var(--foreground)] text-right">{line.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--muted)]">
                      {isSeasonal ? "Install window" : "Typical install"}
                    </dt>
                    <dd className="font-semibold text-[var(--foreground)] text-right">
                      {isSeasonal ? site.seasonal.installWindow : "1–2 days"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--muted)]">Response</dt>
                    <dd className="font-semibold text-[var(--foreground)]">{site.responseTime}</dd>
                  </div>
                </dl>
              </div>

              {/* Cross-link to the same city on the other line */}
              <div className="card p-6" style={{ borderColor: isSeasonal ? "var(--accent)" : "var(--gold)" }}>
                <p
                  className="text-xs font-bold uppercase tracking-[0.16em] mb-2.5"
                  style={{ color: isSeasonal ? "var(--accent)" : "var(--gold)" }}
                >
                  Looking for the other one?
                </p>
                <h3 className="font-bold text-[var(--foreground)] mb-2.5">
                  {isSeasonal
                    ? `Permanent lighting in ${city.name}`
                    : `Christmas lights in ${city.name}`}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                  {isSeasonal
                    ? "Prefer something that stays up all year and changes colour from your phone? That's our permanent track system."
                    : "Only want lights up for the holidays, with takedown and storage handled? That's our seasonal C9 service."}
                </p>
                <Link
                  href={`/${otherLine.slug}/${city.slug}`}
                  className="btn w-full justify-center"
                  style={{
                    background: isSeasonal ? "var(--accent)" : "var(--gold)",
                    color: "#04121a",
                  }}
                >
                  {otherLine.shortName} in {city.name} →
                </Link>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4">Nearby</h3>
                <ul className="space-y-1">
                  {nearbyCities.map((n) => (
                    <li key={n.slug}>
                      <Link
                        href={`/${line.slug}/${n.slug}`}
                        className="flex items-center gap-2 min-h-[44px] text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {line.shortName} in {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS (condensed) ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-10 text-center text-balance">
            What {city.name} homeowners get
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {line.benefits.slice(0, 6).map((b) => (
              <div key={b.title} className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-2 text-[0.9375rem]">{b.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STEPS (condensed) ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-10 text-center text-balance">
            How it works in {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {line.steps.map((s) => (
              <div key={s.step} className="card p-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 font-display font-extrabold text-sm"
                  style={{ background: "var(--accent-light)", color: accent }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2 text-[0.9375rem]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-10 text-center text-balance">
            {line.shortName} lighting questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {line.faqs.slice(0, 5).map((faq, i) => (
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
          <div className="text-center mt-8">
            <Link href={`/${line.slug}`} className="btn btn-outline">
              Everything about {line.name.toLowerCase()} →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--deep)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5 text-balance">
            {isSeasonal
              ? `Book your ${city.name} install before the calendar fills.`
              : `See it lit up on your ${city.name} home first.`}
          </h2>
          <p className="text-[#c7d2e1] leading-relaxed mb-8">{offer.detail}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn px-8" style={{ background: accent, color: "#04121a" }}>
              {offer.ctaLong}
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-white px-8">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
