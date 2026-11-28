import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { INSTALL_CITIES, getCity, siblingCities, cityPhotoFor } from "@/lib/installation";
import { kits } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, POSTAL_ADDRESS, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return INSTALL_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const data = getCity(city);
  if (!data) return {};
  const url = `${SITE_URL}/installation/${data.slug}`;
  const social = `Permanent Lighting Installation in ${data.city}, Ontario`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${social} | ${BRAND.name}`,
      description: data.metaDescription,
      url,
      images: [photo(cityPhotoFor(data.slug)).src]
    },
    twitter: { card: "summary_large_image", title: social, description: data.metaDescription }
  };
}

export default async function InstallationCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = getCity(city);
  if (!data) notFound();

  const url = `${SITE_URL}/installation/${data.slug}`;
  const siblings = siblingCities(data.slug);
  const installedLow = Math.min(...kits.map((k) => k.installedLow));
  const installedHigh = Math.max(...kits.map((k) => k.installedHigh));
  const smallest = Math.min(...kits.map((k) => k.feet));
  const largest = Math.max(...kits.map((k) => k.feet));

  const faq: { q: string; a: string }[] = [
    {
      q: `What does permanent lighting installation cost in ${data.city}?`,
      a: `As a guide, our crew installs ${smallest} feet from about ${formatCad(installedLow, 0)} and ${largest} feet for up to about ${formatCad(installedHigh, 0)}, with the kit included. Ladders, corners and second storeys move the number. The quote after a free measurement at your house is the real one.`
    },
    {
      q: `Is the measurement in ${data.city} free?`,
      a: "Yes. We come to the house, measure each side you want lit and send a quote. There is no charge for the visit."
    },
    {
      q: "What warranty comes with an install?",
      a: "The parts carry the same 5-year warranty as the kits we ship, and our own installs are covered for workmanship."
    },
    {
      q: `Can I buy the kit and install it myself in ${data.city}?`,
      a: `Yes. It is the same hardware. Kits ship free to ${data.city}, or you can choose free pickup at ${BRAND.address} and wait for the "ready for pickup" email.`
    }
  ];

  const provider = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#installer`,
    name: BRAND.name,
    url: SITE_URL,
    email: BRAND.email,
    address: POSTAL_ADDRESS
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Permanent LED track lighting installation",
      name: `Permanent lighting installation in ${data.city}, Ontario`,
      description: data.metaDescription,
      url,
      areaServed: { "@type": "City", name: `${data.city}, Ontario` },
      provider
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        compact
        photo={cityPhotoFor(data.slug)}
        photoAlt={`Home with permanent LED track lighting along the roofline, the system our crew installs in ${data.city}, Ontario`}
        eyebrow="Installation by our crew"
        title={`Permanent lighting installation in ${data.city}`}
        intro={`A free measurement at your house in ${data.city}, track matched to your soffit and a 5-year warranty on the parts.`}
        crumbs={[{ label: "Installation", href: "/installation" }, { label: data.city }]}
      />

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{data.intro}</p>
            <p className="note mt-6 text-[1rem]">{data.localAngle}</p>

            <h2 className="font-display h2-fluid mt-12">What a {data.city} install includes</h2>
            <ul className="mt-5 border-t border-[var(--color-border)]">
              {data.serviceBullets.map((b) => (
                <li key={b} className="flex gap-3 border-b border-[var(--color-border)] py-3 text-[var(--color-text-soft)]">
                  <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display h2-fluid mt-12">What it costs installed in {data.city}</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">
              A guide for our own crew, with the kit included. The quote after the site visit is the real number.
            </p>
            <div className="mt-5 overflow-x-auto border border-[var(--color-border)]">
              <table className="table-clean min-w-[20rem]">
                <caption className="sr-only">Typical installed price range in {data.city} by length of roofline</caption>
                <thead>
                  <tr>
                    <th scope="col">Roofline lit</th>
                    <th scope="col">Installed, kit included</th>
                  </tr>
                </thead>
                <tbody>
                  {kits.map((k) => (
                    <tr key={k.slug}>
                      <th scope="row" className="font-semibold">{k.feet} ft</th>
                      <td>{formatCad(k.installedLow, 0)} to {formatCad(k.installedHigh, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display h2-fluid">Book a free measurement in {data.city}</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">
              Tell us roughly how much roofline you want lit. We reply within one business day to set up the visit, and the itemized quote follows it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact-us" className="btn-primary">Request a quote</Link>
              <Link href="/diy-kits" className="btn-secondary">Or shop the kits</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display h2-fluid">Questions from {data.city}</h2>
            <div className="mt-5 border-t border-[var(--color-border-strong)]">
              {faq.map((f) => (
                <details key={f.q} className="group border-b border-[var(--color-border-strong)]">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-[var(--color-ink)]">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
              <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[44px] items-center">How pickup works</Link>
              <Link href="/warranty" className="text-link inline-flex min-h-[44px] items-center">Read the warranty</Link>
              <Link href="/brands" className="text-link inline-flex min-h-[44px] items-center">Brands compared</Link>
            </p>

            <h2 className="font-display h2-fluid mt-12">Near {data.city}</h2>
            {data.nearbyAreas.length > 0 && (
              <p className="mt-3 text-[var(--color-text-soft)]">
                Around {data.city} we also install in{" "}
                {data.nearbyAreas.map((n, i) => (
                  <span key={n}>
                    {i > 0 && (i === data.nearbyAreas.length - 1 ? " and " : ", ")}
                    {n}
                  </span>
                ))}
                .
              </p>
            )}
            <h3 className="eyebrow mt-6 text-[var(--color-gold-text)]">Other installation towns</h3>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/installation/${s.slug}`}
                    className="inline-flex min-h-[44px] items-center border border-[var(--color-border-strong)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                  >
                    {s.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
