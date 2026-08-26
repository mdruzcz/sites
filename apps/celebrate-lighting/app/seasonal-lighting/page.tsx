import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceLinePage } from "@/components/ServiceLinePage";
import { SeasonalBackdrop } from "@/components/SeasonalBackdrop";
import { site } from "@/lib/site";
import { getServiceLine, getTestimonials } from "@/lib/content";
import { localBusinessSchema, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "seasonal-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const line = getServiceLine(LINE_SLUG);
  if (!line) return {};
  return {
    title: { absolute: `${line.metaTitle} | ${site.name}` },
    description: line.metaDescription,
    alternates: { canonical: `/${LINE_SLUG}` },
    openGraph: {
      title: `${line.metaTitle} | ${site.name}`,
      description: line.metaDescription,
      url: `${site.url}/${LINE_SLUG}`,
      images: [
        {
          url: "/images/gallery-1.jpg",
          alt: "Seasonal warm-white light installation on mature trees in Southwestern Ontario",
        },
      ],
    },
  };
}

export default function SeasonalLightingPage() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();

  const gold = "var(--gold)";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(getTestimonials())) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              {
                slug: line.slug,
                title: "Christmas Light Installation",
                shortDescription: line.metaDescription,
              } as never,
            ),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(line.faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: line.name, url: `${site.url}/${LINE_SLUG}` },
            ]),
          ),
        }}
      />

      <ServiceLinePage
        line={line}
        offer={site.seasonal}
        heroIllustration={<SeasonalBackdrop />}
        galleryCategory="commercial"
        urgencyNote={`Install dates for ${site.seasonal.installWindow} are booked first-come — reserve by ${site.seasonal.deadline} for the season's best rates.`}
        proofPoints={[
          { stat: "Oct–Nov", label: "Installation window, booked first-come" },
          { stat: "Included", label: "Takedown in January, every plan" },
          { stat: "In-season", label: "Service calls if a run goes dark" },
          { stat: "Rent or buy", label: "Two ways to pay for the lights" },
        ]}
        extraSections={
          <>
            {/* ---------- SEASON TIMELINE ---------- */}
            <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="eyebrow-gold mb-3">The season</p>
                  <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
                    How a season actually runs
                  </h2>
                  <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
                    Seasonal lighting is a calendar business. Knowing when things happen is most of knowing
                    when to call.
                  </p>
                </div>

                <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {line.seasonTimeline?.map((t, i) => (
                    <li key={t.period} className="card p-6 relative">
                      <div
                        className="text-xs font-bold uppercase tracking-widest mb-3 inline-block px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(232,182,0,0.14)", color: gold }}
                      >
                        {t.period}
                      </div>
                      <h3 className="font-bold text-[var(--foreground)] mb-2">{t.title}</h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{t.desc}</p>
                      {i === 0 && (
                        <span className="absolute top-6 right-6 text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: gold }}>
                          You are here
                        </span>
                      )}
                    </li>
                  ))}
                </ol>

                <p className="text-center text-sm text-[var(--muted)] mt-8 max-w-2xl mx-auto">
                  The install calendar fills from the outside in. Booking in summer or early fall gets you the
                  best rate and first pick of dates; leaving it to late November usually means whatever&apos;s
                  left.
                </p>
              </div>
            </section>

            {/* ---------- RENT VS BUY ---------- */}
            <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="eyebrow-gold mb-3">Two ways to pay</p>
                  <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
                    Rent the lights, or own them
                  </h2>
                  <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
                    Same lights, same crews, same service — the only difference is who owns the material and
                    how the cost is spread. We&apos;ll show you both numbers at the quote.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {line.plans?.map((plan, i) => (
                    <div
                      key={plan.name}
                      className="card p-7 flex flex-col"
                      style={i === 0 ? { borderColor: gold } : undefined}
                    >
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="font-display text-2xl font-bold text-[var(--foreground)]">{plan.name}</h3>
                        {i === 0 && (
                          <span
                            className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: gold, color: "#1a1300" }}
                          >
                            Most popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-4" style={{ color: gold }}>
                        {plan.tagline}
                      </p>
                      <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{plan.body}</p>

                      <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
                          What&apos;s included
                        </p>
                        <ul className="space-y-2">
                          {plan.includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                              <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: gold }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="mt-auto pt-5 border-t text-sm text-[var(--muted)]"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <span className="font-semibold text-[var(--foreground)]">Best for:</span> {plan.bestFor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        }
        afterPricing={
          /* ---------- COMMERCIAL CROSS-LINK ---------- */
          <section className="py-16" style={{ background: "var(--surface-2)" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="card p-7 sm:p-9" style={{ borderColor: gold }}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
                  <div className="max-w-2xl">
                    <p className="eyebrow-gold mb-2.5">Commercial, municipal &amp; events</p>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--foreground)] mb-3 text-balance">
                      Lighting a park, a main street, or a fundraiser?
                    </h2>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      Tree wrapping, downtown streetscapes, drive-through light shows, charity displays and
                      community events are a different job from a house — budgets, approvals, public safety and
                      a hard opening night. We scope them properly.
                    </p>
                  </div>
                  <Link
                    href="/seasonal-lighting/commercial"
                    className="btn shrink-0 px-8"
                    style={{ background: gold, color: "#1a1300" }}
                  >
                    Commercial seasonal lighting →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        }
      />
    </>
  );
}
