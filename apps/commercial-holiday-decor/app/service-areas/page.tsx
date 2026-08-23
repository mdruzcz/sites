import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { serviceAreas } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Service Areas — Commercial Holiday Decor in Southwestern Ontario";
const DESCRIPTION =
  "Commercial Christmas decor and installation across Southwestern Ontario: London, Kitchener-Waterloo, Windsor, Sarnia, Chatham, Woodstock, Stratford, St. Thomas, Brantford, Cambridge, Guelph and Tillsonburg.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/service-areas` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/service-areas` }
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        photo="tree-lighting-row"
        photoAlt="Row of large illuminated commercial Christmas trees at night"
        eyebrow="Coverage"
        title="Southwestern Ontario"
        intro="Crews run out of London and cover the region from Windsor to Guelph. If you are just outside the list, ask — we usually can."
        crumbs={[{ name: "Service areas", href: "/service-areas" }]}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {serviceAreas.map((a) => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`} className="reveal-sm card group p-8">
                <h2 className="font-display text-xl">{a.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{a.blurb}</p>
                <p className="mt-5 text-sm font-semibold text-[var(--color-gold-text)] opacity-0 transition group-hover:opacity-100">
                  Commercial decor in {a.name} →
                </p>
              </Link>
            ))}
          </div>

          <div className="reveal mt-16 rounded-3xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-9 text-center md:p-12">
            <h2 className="font-display text-2xl">Not on the list?</h2>
            <p className="lead mx-auto mt-4 max-w-lg text-[var(--color-text-soft)]">
              We regularly travel outside these centres for larger contracts and multi-site programs. Tell us
              where the property is and we will tell you straight away whether we can cover it.
            </p>
            <Link href="/quote" className="btn-ember group mt-8">
              {site.quote.cta}
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
