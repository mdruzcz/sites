import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { type ServiceLine } from "@/lib/content";

/**
 * Commercial / municipal page shell, shared by both lines.
 *
 * These pages carry the B2B and public-sector keyword set — parks,
 * municipalities, BIAs, light shows, charity events, fundraisers, retail
 * frontages — and speak to a buyer with a budget, an approvals process and a
 * fixed opening date. That's a different reader from a homeowner, so the
 * proof points are insurance, WSIB, tender documents and hitting the date,
 * not warranties and app colours.
 *
 * Uses the full <QuoteForm /> rather than the short one: commercial enquiries
 * need the message field to describe scope.
 */
export function CommercialLinePage({
  line,
  heroImage,
  heroImageAlt,
  heroBackdrop,
  accent,
  intro,
}: {
  line: ServiceLine;
  heroImage?: string;
  heroImageAlt?: string;
  heroBackdrop?: ReactNode;
  accent: string;
  /** Extra keyword-bearing prose rendered under the lead paragraph. */
  intro?: ReactNode;
}) {
  const c = line.commercial;

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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <nav className="text-sm text-[#93a1b8] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/${line.slug}`} className="hover:text-[var(--accent)]">{line.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Commercial</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-[0.16em] mb-5" style={{ color: accent }}>
              {c.eyebrow}
            </p>

            <h1 className="font-display text-[2.3rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 text-balance">
              {c.h1}
            </h1>

            <p className="text-lg text-[#c7d2e1] leading-relaxed mb-9 max-w-2xl">{c.sub}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#commercial-quote" className="btn text-base px-8" style={{ background: accent, color: "#04121a" }}>
                Request a Commercial Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LEAD ==================== */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">{c.lead}</p>
          {intro}
        </div>
      </section>

      {/* ==================== SEGMENTS ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>
              What we light
            </p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Properties and projects we take on
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.segments.map((s) => (
              <div key={s.title} className="card p-7">
                <h3 className="font-bold text-[var(--foreground)] mb-2.5">{s.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY US (B2B PROOF) ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>
              Working with us
            </p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              What your procurement file needs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.reasons.map((r, i) => (
              <div key={r.title} className="card p-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 font-display font-extrabold text-sm"
                  style={{ background: "var(--accent-light)", color: accent }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2.5">{r.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>
              Commercial questions
            </p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Budgets, tenders and timelines
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {c.faqs.map((faq, i) => (
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

      {/* ==================== QUOTE ==================== */}
      <section id="commercial-quote" className="py-20 md:py-24 scroll-mt-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>
                Get a commercial quote
              </p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                Tell us the site and the date.
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                Give us the property, roughly what you want lit, and the date it needs to be live. If
                you&apos;re working to a fixed budget, say the number — we&apos;ll design to it and show you
                what each additional zone would add.
              </p>
              <ul className="space-y-3 text-sm text-[var(--muted)] mb-8">
                {[
                  "Insurance certificates and WSIB clearance on request",
                  "Itemized scope and specs suitable for tender or council",
                  "Installation scheduled outside your trading hours",
                  "One contact for service across every site",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="hairline mb-6" />
              <p className="text-sm text-[var(--muted)]">
                Prefer to talk it through?{" "}
                <a href={site.phoneHref} className="font-semibold text-[var(--accent)] hover:underline">
                  Call {site.phone}
                </a>{" "}
                or email{" "}
                <a href={site.emailHref} className="font-semibold text-[var(--accent)] hover:underline break-all">
                  {site.email}
                </a>
              </p>
            </div>

            <div className="card-light p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">Commercial enquiry</h3>
              <p className="text-sm text-slate-600 mb-6">
                Include the site address, scope and your target date in the details field.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
