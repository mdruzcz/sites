import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { services, getServiceBySlug, site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { CheckIcon } from "@/components/icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | We Install Christmas Lights`,
    description: service.description,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    description: service.description,
  };

  return (
    <>
      <Script id={`service-schema-${service.slug}`} type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="bg-[color:var(--brand-red)] text-white px-6 sm:px-10 lg:px-16 py-14 lg:py-24 flex items-center">
            <div className="max-w-xl">
              <p className="text-white/85 text-xs font-bold uppercase tracking-[0.18em]">
                {service.category === "commercial" ? "Commercial Service" : service.category === "residential" ? "Residential Service" : "Add-on Service"}
              </p>
              <h1 className="heading-display text-4xl sm:text-5xl mt-3">{service.name}</h1>
              <p className="mt-5 text-lg text-white/95">{service.tagline}</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/contact-us" className="btn btn-outline-white">Online Quote</Link>
                <Link href={site.phoneHref} className="btn btn-green">Call {site.phone}</Link>
              </div>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 lg:min-h-[480px]">
            <Image
              src={service.image ?? "/images/hero-house.jpg"}
              alt={`${service.name} by We Install Christmas Lights, London Ontario`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">About this service</p>
          <h2 className="heading-display text-3xl mt-3">{service.tagline}</h2>
          <p className="mt-5 text-lg text-[color:var(--ink-soft)] leading-relaxed">{service.description}</p>

          {service.features && service.features.length > 0 && (
            <>
              <h3 className="heading-display text-xl mt-10 text-[color:var(--brand-green)]">What&rsquo;s included</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[color:var(--brand-red)] text-white flex items-center justify-center shrink-0">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-semibold text-[color:var(--ink-strong)]">{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="eyebrow">Get a Quote</p>
            <h2 className="heading-display text-3xl mt-3">Book {service.name} today</h2>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-2xl text-center">More services</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter((s) => s.slug !== service.slug).slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card p-5 hover:shadow-md">
                <h3 className="heading-display text-base text-[color:var(--brand-green)]">{s.name}</h3>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
