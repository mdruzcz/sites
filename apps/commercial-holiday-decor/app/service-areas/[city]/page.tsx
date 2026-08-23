import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { serviceAreas, getArea, products, services } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const a = getArea(city);
  if (!a) return { title: "Not found" };
  const title = `Commercial Christmas Decor in ${a.name}, Ontario`;
  const description = `Commercial wreaths, mega trees and LED displays for ${a.name} businesses — designed, installed, serviced and taken down by one insured contractor. Book by ${site.season.bookingOpens}.`;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/service-areas/${a.slug}` },
    openGraph: { title, description, url: `${site.url}/service-areas/${a.slug}` }
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  const nearby = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Commercial Christmas decor and installation",
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    areaServed: { "@type": "City", name: area.name, address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" } },
    description: `Commercial Christmas decor, installation, maintenance and takedown for businesses in ${area.name}, Ontario.`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="scene-santa-group"
        photoAlt={`Commercial holiday lighting display on a property at night in ${area.name}, Ontario`}
        eyebrow="Service area"
        title={`Commercial holiday decor in ${area.name}`}
        intro={area.blurb}
        crumb={area.name}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h2 className="font-display text-[1.9rem] md:text-[2.4rem]">
                What we do for {area.name} properties
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                We handle the whole season for commercial and municipal clients in {area.name}: the site
                walk, the drawn plan, the decor itself, the install, the in-season call-outs and the January
                takedown. Everything is stored labelled by property, so the second season costs less and goes
                up faster than the first.
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Scale is what usually separates a commercial install from a residential one. On a {area.name}{" "}
                building front, a 4-foot wreath is the smallest size that still reads from the parking lot,
                and a 14-foot mega tree is the usual starting point for a courtyard or entrance.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {products.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="card p-6">
                    <h3 className="font-display text-lg">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-soft)]">
                      {p.summary}
                    </p>
                  </Link>
                ))}
              </div>

              <h2 className="font-display mt-14 text-[1.6rem] md:text-2xl">Included on every contract</h2>
              <ul className="mt-6 space-y-3">
                {services.map((s) => (
                  <li key={s.slug} className="flex items-start gap-2.5 text-sm text-[var(--color-text-soft)]">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                    <span>
                      <span className="font-semibold text-[var(--color-text)]">{s.name}</span> — {s.summary}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/quote" className="btn-primary">{site.quote.cta}</Link>
                <a href={site.phoneHref} className="btn-secondary">Call {site.phone}</a>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <Photo name="tree-lighting-row" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 460px" rounded="rounded-3xl" />
              <Photo name="wreath-building-front" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 460px" rounded="rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="font-display text-[1.9rem] md:text-[2.4rem]">We also cover</h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {nearby.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-text-soft)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
                >
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/service-areas"
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-green)] bg-[var(--color-green-soft)] px-4 text-sm font-semibold text-[var(--color-green-dark)]"
              >
                All service areas →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-[var(--color-gold-bright)]">{site.quote.promise}</p>
              <h2 className="font-display mt-5 text-[2rem] text-white md:text-[2.75rem]">
                Get a quote for your {area.name} property.
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">{site.quote.detail}</p>
            </div>
            <div className="rounded-3xl bg-white p-7 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
