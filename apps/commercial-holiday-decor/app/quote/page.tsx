import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

const TITLE = "Request a Commercial Quote";
const DESCRIPTION =
  "Tell us about the property and we come back with a line-item quote covering decor, installation, in-season service and January takedown. Serving Southwestern Ontario.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/quote` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/quote` }
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        photo="hero-commercial-wreath"
        photoAlt="Large lit commercial Christmas wreath with a red bow"
        eyebrow="Get started"
        title="Request a quote"
        intro={site.quote.detail}
        crumbs={[{ name: "Quote", href: "/quote" }]}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">What happens next</p>
              <h2 className="font-display h2-fluid mt-6">Three steps, no obligation.</h2>
              <ol className="mt-10 space-y-8">
                {[
                  ["We call you back", `Within ${site.responseTime}, to understand the property and what you are trying to achieve.`],
                  ["We walk the site", "Sightlines, power, anchor points and measurements — done in person, not from a photo."],
                  ["You get a line-item quote", "Decor, install, in-season service and January takedown, priced separately so you can see what you are paying for."]
                ].map(([t, d], i) => (
                  <li key={t} className="reveal-sm flex gap-5">
                    <span className="font-display grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-green)] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg">{t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="reveal-sm mt-12 rounded-2xl border border-[var(--color-border)] bg-white p-7">
                <p className="text-sm font-semibold">Every contract includes</p>
                <ul className="mt-4 space-y-2.5">
                  {services.map((s) => (
                    <li key={s.slug} className="flex items-start gap-2.5 text-sm text-[var(--color-text-soft)]">
                      <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>

              <Photo
                name="tree-lighting-row"
                ratio="aspect-[3/2]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-3xl"
                className="mt-10 hidden lg:block shadow-[var(--shadow-lg)]"
              />
            </div>

            <div className="reveal rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
