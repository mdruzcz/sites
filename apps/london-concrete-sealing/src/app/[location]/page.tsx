import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { serviceAreas, services, site, testimonials } from '@/lib/content';
import { Eyebrow, ServiceCard, TestimonialCard, CheckItem, CtaBand } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const revalidate = 3600;
export const dynamicParams = false;

// Map URL slug (without leading slash) -> area
function getAreaByLocation(location: string) {
  return serviceAreas.find((a) => a.urlPath === `/${location}`);
}

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ location: a.urlPath.replace(/^\//, '') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const area = getAreaByLocation(location);
  if (!area) return {};
  return {
    title: `Concrete Sealing ${area.name} | Driveway & Patio Sealing`,
    description: `Professional concrete sealing in ${area.name}, ${area.province}. Driveway, patio & stamped concrete sealing. ${area.description.slice(0, 80)} Free quote: ${site.phoneDisplay}.`,
    alternates: { canonical: area.urlPath },
    openGraph: {
      title: `Concrete Sealing ${area.name} | London Concrete Sealing`,
      description: area.description,
      images: [area.image],
      url: area.urlPath,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const area = getAreaByLocation(location);
  if (!area) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Concrete Sealing',
    name: `Concrete Sealing in ${area.name}`,
    description: area.description,
    provider: { '@type': 'LocalBusiness', name: site.name, telephone: site.phone },
    areaServed: { '@type': 'City', name: area.name, containedInPlace: { '@type': 'AdministrativeArea', name: `${area.region}, Ontario` } },
    url: `${site.url}${area.urlPath}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image src={area.image} alt={`Concrete sealing in ${area.name}, Ontario`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-deep/55" />
        </div>
        <div className="container-x relative py-20 sm:py-28">
          <nav className="text-sm text-slate-300 mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <span className="text-white">Concrete Sealing {area.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl leading-[1.08]">
            Concrete Sealing in {area.name}, Ontario
          </h1>
          <p className="mt-5 text-lg text-slate-200 max-w-2xl">{area.description}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact-us" className="accent-btn px-7 py-3.5 rounded-xl font-semibold text-center">Get A Free Quote</Link>
            <a href={`tel:${site.phone}`} className="px-7 py-3.5 rounded-xl font-semibold text-center bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-colors">Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
          <div>
            <Eyebrow>{area.region}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-ink">Your Local Concrete Sealing Experts in {area.name}</h2>
            <p className="mt-5 text-slate-muted leading-relaxed text-lg">
              London Concrete Sealing proudly serves homeowners and businesses in {area.name} and across
              {' '}{area.region}. From freshly poured driveways to weathered patios and decorative stamped
              concrete, our team protects every surface against {area.province === 'ON' ? "Ontario's" : 'local'} harsh
              freeze-thaw cycles, UV exposure, and everyday wear.
            </p>
            <p className="mt-4 text-slate-muted leading-relaxed">
              With over a decade of experience and eco-friendly, pet-safe sealants, we deliver durable,
              great-looking results with a hassle-free process — and a free, no-obligation quote.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3.5">
              <CheckItem>Driveway & patio sealing</CheckItem>
              <CheckItem>Stamped concrete sealing</CheckItem>
              <CheckItem>Crack repair before sealing</CheckItem>
              <CheckItem>Eco-friendly, pet-safe products</CheckItem>
            </ul>
          </div>
          <aside className="lg:sticky lg:top-28 rounded-3xl border border-slate-200 shadow-sm bg-white p-6">
            <h3 className="text-lg font-bold text-ink">Free Quote in {area.name}</h3>
            <p className="mt-1.5 text-sm text-slate-muted">We reply within 24 hours.</p>
            <div className="mt-5"><ContactForm /></div>
          </aside>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">Our Services in {area.name}</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">Trusted by Homeowners Like You</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading={`Protect Your Concrete in ${area.name}`} />
    </>
  );
}
