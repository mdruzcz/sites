import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { industries, getIndustryBySlug, site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} | Commercial Holiday Decorating`,
    description: industry.description,
    alternates: { canonical: `${site.url}/industries/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: industry.name,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    description: industry.description,
  };

  return (
    <>
      <Script id={`industry-schema-${industry.slug}`} type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="eyebrow">Commercial Holiday Décor</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3 max-w-3xl">{industry.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--ink-soft)]">{industry.tagline}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
            <Link href={site.phoneHref} className="btn btn-outline-green">Call {site.phone}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 prose text-[color:var(--ink-soft)] leading-relaxed">
            <p className="text-lg">{industry.description}</p>
            <h3 className="heading-display text-xl mt-8 text-[color:var(--brand-green)]">Why choose us</h3>
            <ul>
              <li>Hundreds of completed commercial holiday projects</li>
              <li>Insured, WSIB-compliant crews</li>
              <li>Custom designed to your space and brand</li>
              <li>After-hours installs available</li>
              <li>Multi-year and multi-location programs</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden">
              <Image
                src={industry.image ?? "/images/industry-default.jpg"}
                alt={`${industry.name} — commercial holiday decorating example by We Install Christmas Lights`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="eyebrow">Get a Quote</p>
            <h2 className="heading-display text-3xl mt-3">{industry.name} — Get Started</h2>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-2xl text-center">Other industries we serve</h2>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {industries.filter((i) => i.slug !== industry.slug).map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="px-4 py-1.5 rounded-full bg-white border border-[color:var(--border)] text-sm text-[color:var(--brand-green)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]"
              >
                {i.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
