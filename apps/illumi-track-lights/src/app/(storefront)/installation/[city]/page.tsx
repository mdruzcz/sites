import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import {
  INSTALL_CITIES,
  getCity,
  siblingCities,
  cityPhotoFor
} from "@/lib/installation";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return INSTALL_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCity(city);
  if (!data) return {};
  const url = `${SITE_URL}/installation/${data.slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: data.metaTitle,
      description: data.metaDescription,
      url
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription
    }
  };
}

export default async function InstallationCityPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCity(city);
  if (!data) notFound();

  const url = `${SITE_URL}/installation/${data.slug}`;
  const siblings = siblingCities(data.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Installation", item: `${SITE_URL}/installation` },
      { "@type": "ListItem", position: 3, name: data.city, item: url }
    ]
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Permanent LED soffit lighting installation",
    description: data.metaDescription,
    areaServed: { "@type": "City", name: `${data.city}, Ontario` },
    provider: {
      "@type": "LocalBusiness",
      name: "Illumi Track Lights",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressRegion: "ON",
        addressCountry: "CA"
      }
    }
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Illumi Track Lights",
    url,
    description: `Permanent LED soffit lighting installation serving ${data.city}, Ontario.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA"
    },
    areaServed: { "@type": "City", name: `${data.city}, Ontario` }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />

      <PageHero
        photo={cityPhotoFor(data.slug)}
        photoAlt={`Permanent LED soffit track lighting installed on a home in ${data.city}, Ontario`}
        eyebrow="Professional installation"
        title={`Permanent Lighting Installation in ${data.city}`}
        crumb={data.city}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{data.intro}</p>

            <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-amber-soft)] p-6 md:p-7">
              <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text)]">{data.localAngle}</p>
            </div>

            <h2 className="font-display mt-14 text-2xl md:text-3xl">
              What our {data.city} installs include
            </h2>
            <ul className="mt-6 space-y-3">
              {data.serviceBullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                  <span aria-hidden className="mt-1 text-[var(--color-amber)]">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center md:p-10">
              <h2 className="font-display text-2xl">Get a free {data.city} measurement</h2>
              <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Tell us how much roofline you want lit and we will book an on-site measurement in {data.city}
                and send an honest, itemized quote.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact-us" className="btn-amber">Request a quote</Link>
                <Link href="/diy-kits" className="btn-secondary">Rather DIY? Shop kits</Link>
              </div>
            </div>

            {/* Nearby areas */}
            <div className="mt-14">
              <h2 className="font-display text-xl md:text-2xl">Nearby areas we serve</h2>
              {data.nearbyAreas.length > 0 && (
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                  We also install around {data.city} in{" "}
                  {data.nearbyAreas.map((n, i) => (
                    <span key={n}>
                      {i > 0 && (i === data.nearbyAreas.length - 1 ? " and " : ", ")}
                      {n}
                    </span>
                  ))}
                  .
                </p>
              )}

              <p className="mt-6 text-sm font-semibold text-[var(--color-muted)]">Other installation cities</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/installation/${s.slug}`}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber-text)]"
                  >
                    {s.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
