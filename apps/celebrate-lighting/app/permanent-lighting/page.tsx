import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLinePage } from "@/components/ServiceLinePage";
import { site } from "@/lib/site";
import { getServiceLine, getTestimonials } from "@/lib/content";
import { localBusinessSchema, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "permanent-lighting";

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
          url: "/images/project-brantford.jpg",
          alt: "Home with permanent LED roofline lighting installed by Celebrate Lighting in Southwestern Ontario",
        },
      ],
    },
  };
}

export default function PermanentLightingPage() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();

  const accent = "var(--accent)";

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
                title: line.name,
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
        offer={site.demo}
        heroImage="/images/project-brantford.jpg"
        heroImageAlt="Bungalow in Brantford, Ontario with every roofline and gable peak traced in cool blue permanent LED lighting"
        ctaImage="/images/project-london.jpg"
        ctaImageAlt="London, Ontario home with warm white permanent LED roofline lighting on at night"
        galleryCategory="residential"
        proofPoints={[
          { stat: "Lifetime", label: "Warranty on parts, hardware & workmanship" },
          { stat: "−40°C", label: "Cold-rated, IP67 sealed for Ontario winters" },
          { stat: "16M+", label: "Colours, changed from your phone" },
          { stat: "1–2 days", label: "Typical install, start to lights-on" },
        ]}
        extraSections={
          <>
            {/* ---------- HARDWARE SPECS ---------- */}
            <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  <div>
                    <p className="section-eyebrow mb-3">The hardware</p>
                    <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                      Built to stay up, not to be replaced.
                    </h2>
                    <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                      <p>
                        The difference between permanent lighting that still looks good in year eight and a
                        system you regret is entirely in the components. Ours are commercial-grade: IP67-sealed
                        fixtures so water can&apos;t work its way into a socket, UV-rated cable so the jacket
                        doesn&apos;t chalk and crack in the sun, and electronics cold-rated to −40&deg;C so
                        nothing goes brittle in a February cold snap.
                      </p>
                      <p>
                        The track itself is fastened into the soffit or fascia channel with purpose-made clips.
                        Nothing is screwed through your shingles, nothing hangs off the gutter face, and the
                        housing is colour-matched to your trim from a physical sample taken at your demo — which
                        is why it reads as part of the house rather than something added to it.
                      </p>
                      <p>
                        Because every fixture is individually addressable, you get true per-bulb control: chase
                        patterns, alternating colours, gradients across a roofline, or a single warm-white wash
                        at 40% brightness on a timer. That&apos;s the setting most owners actually live with day
                        to day.
                      </p>
                    </div>
                  </div>
                  <div className="card p-7">
                    <h3 className="font-bold text-[var(--foreground)] mb-5">Specifications</h3>
                    <dl className="divide-y" style={{ borderColor: "var(--border)" }}>
                      {line.specs?.map((s) => (
                        <div key={s.label} className="flex justify-between gap-4 py-3">
                          <dt className="text-sm text-[var(--muted)]">{s.label}</dt>
                          <dd className="text-sm font-semibold text-[var(--foreground)] text-right">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </section>

            {/* ---------- WHAT YOU'LL ACTUALLY USE IT FOR ---------- */}
            <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="section-eyebrow mb-3">All year, not just December</p>
                  <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
                    Twelve months of reasons to switch it on
                  </h2>
                  <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
                    Most people buy it for Christmas and end up using it far more than that.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { when: "Every night", what: "Warm white", note: "Architectural wash on the roofline — the everyday default." },
                    { when: "December", what: "Red & green", note: "Full Christmas scenes, plus chase and twinkle patterns." },
                    { when: "October", what: "Orange & purple", note: "Halloween, with flicker patterns if you want them." },
                    { when: "July 1", what: "Red & white", note: "Canada Day, and the only house on the street already set up." },
                    { when: "Game day", what: "Team colours", note: "Blue and white, or whatever your team runs in." },
                    { when: "February", what: "Pink & red", note: "Valentine's, and it takes five seconds to set." },
                    { when: "March", what: "Green", note: "St. Patrick's Day." },
                    { when: "Birthdays", what: "Anything", note: "Their favourite colour, on the whole house." },
                  ].map((item) => (
                    <div key={item.when} className="card p-5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
                        {item.when}
                      </div>
                      <div className="font-bold text-[var(--foreground)] text-sm mb-1.5">{item.what}</div>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        }
      />
    </>
  );
}
