import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { cities, getCityBySlug, site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { CheckIcon } from "@/components/icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `${site.url}/cities/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${site.url}/cities/${city.slug}`,
      images: [{ url: "/images/og-default.jpg" }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Christmas Light Installation",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ${city.region}`,
    },
    description: city.heroIntro,
  };

  return (
    <>
      <Script
        id={`service-schema-${city.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="bg-[color:var(--brand-red)] text-white px-6 sm:px-10 lg:px-16 py-14 lg:py-24 flex items-center">
            <div className="max-w-xl">
              <p className="text-white/85 text-xs font-bold uppercase tracking-[0.18em]">Service Area</p>
              <h1 className="heading-display text-4xl sm:text-5xl mt-3">
                Christmas Light<br />Installation in<br />{city.name}
              </h1>
              <p className="mt-5 text-lg text-white/95">{city.heroIntro}</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/contact-us" className="btn btn-outline-white">Get a Free {city.name} Quote</Link>
                <Link href={site.phoneHref} className="btn btn-green">Call {site.phone}</Link>
              </div>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 lg:min-h-[480px]">
            <Image
              src="/images/hero-house.jpg"
              alt={`Christmas light installation in ${city.name}, Ontario — professional roofline and tree lighting by We Install Christmas Lights`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* About city */}
      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">{city.name}, {city.region}</p>
          <h2 className="heading-display text-3xl mt-3">Local team. Local trust.</h2>
          <p className="mt-4 text-lg text-[color:var(--ink-soft)] leading-relaxed">{city.description}</p>
          <p className="mt-3 text-[color:var(--ink-soft)]">{city.localFact}</p>

          <h3 className="heading-display text-xl mt-10 text-[color:var(--brand-green)]">Neighbourhoods we serve in {city.name}</h3>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-[color:var(--ink-strong)]">
            {city.neighbourhoods.map((n) => (
              <li key={n} className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-[color:var(--brand-red)]" /> {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service highlights */}
      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Our {city.name} Service</p>
            <h2 className="heading-display text-3xl sm:text-4xl mt-3">Everything you need for a magical season</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Free design and quote",
              "Custom-cut roofline lighting",
              "Tree, hedge, and yard décor",
              "Professional-grade LED bulbs",
              "Mid-season maintenance included",
              "Takedown and secure storage",
            ].map((f) => (
              <div key={f} className="card p-5 flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-[color:var(--brand-red)] text-white flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                <span className="font-semibold text-[color:var(--ink-strong)]">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="eyebrow">Free Quote — 24-Hour Response</p>
            <h2 className="heading-display text-3xl mt-3">Tell us about your {city.name} home</h2>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Other service areas */}
      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-2xl text-center">More service areas</h2>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {cities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="px-4 py-1.5 rounded-full bg-white border border-[color:var(--border)] text-sm text-[color:var(--brand-green)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
