import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getService, services, serviceAreas, site } from '@/lib/content';
import { Eyebrow, CheckItem, CtaBand, ServiceCard } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export function buildServiceMetadata(slug: string): Metadata {
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} London Ontario`,
    description: `${service.shortDescription} Serving London, St. Thomas, Woodstock & surrounding areas. Call ${site.phoneDisplay} for a free quote.`,
    alternates: { canonical: service.urlPath },
    openGraph: {
      title: `${service.name} | London Concrete Sealing`,
      description: service.shortDescription,
      images: [service.image],
      url: service.urlPath,
    },
  };
}

export default function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: { '@type': 'LocalBusiness', name: site.name, telephone: site.phone },
    areaServed: serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
    url: `${site.url}${service.urlPath}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image src={service.image} alt={`${service.name} in London, Ontario`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-deep/60" />
        </div>
        <div className="container-x relative py-20 sm:py-28">
          <nav className="text-sm text-slate-300 mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <Link href="/our-services" className="hover:text-accent-light">Services</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl leading-[1.08]">{service.name}</h1>
          <p className="mt-5 text-lg text-slate-200 max-w-2xl">{service.shortDescription}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact-us" className="accent-btn px-7 py-3.5 rounded-xl font-semibold text-center">Get A Free Quote</Link>
            <a href={`tel:${site.phone}`} className="px-7 py-3.5 rounded-xl font-semibold text-center bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-colors">Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Overview + benefits */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-ink">Professional {service.name} You Can Trust</h2>
            <p className="mt-5 text-slate-muted leading-relaxed text-lg">{service.description}</p>

            {service.finishTypes && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {service.finishTypes.map((f) => (
                  <div key={f.name} className="rounded-xl border border-slate-200 p-5 bg-slate-50">
                    <h3 className="font-bold text-ink">{f.name}</h3>
                    <p className="mt-1.5 text-sm text-slate-muted leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            )}

            <h3 className="mt-10 text-xl font-bold text-ink">Key Benefits</h3>
            <ul className="mt-5 space-y-3.5">
              {service.benefits.map((b) => (
                <CheckItem key={b}>{b}</CheckItem>
              ))}
            </ul>
          </div>

          {/* Sticky quote card */}
          <aside className="lg:sticky lg:top-28 rounded-3xl border border-slate-200 shadow-sm bg-white p-6">
            <h3 className="text-lg font-bold text-ink">Request a Free Quote</h3>
            <p className="mt-1.5 text-sm text-slate-muted">Tell us about your project — we reply within 24 hours.</p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </aside>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Our Process</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">How We Get It Done</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={step.step} className="relative rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent text-white font-bold">{i + 1}</span>
                <h3 className="mt-4 font-bold text-ink">{step.step}</h3>
                <p className="mt-2 text-sm text-slate-muted leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Explore More</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-ink">Our Other Services</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
