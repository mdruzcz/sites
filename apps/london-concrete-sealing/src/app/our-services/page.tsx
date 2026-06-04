import type { Metadata } from 'next';
import Link from 'next/link';
import { services, serviceAreas } from '@/lib/content';
import { Eyebrow, ServiceCard, CtaBand } from '@/components/ui';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Complete concrete sealing & restoration services in London, Ontario — driveway sealing, concrete sealing, driveway installation, stamped concrete sealing & decorative finishes. Free quote.',
  alternates: { canonical: '/our-services' },
};

export default function ServicesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep dot-grid text-white">
        <div className="container-x py-20 sm:py-24">
          <nav className="text-sm text-slate-300 mb-5 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <span className="text-white">Our Services</span>
          </nav>
          <span className="inline-flex items-center gap-2 text-accent-light font-semibold text-sm uppercase tracking-wider">
            <span className="h-px w-6 bg-accent-light" /> Our Services
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold max-w-3xl leading-[1.08]">
            Complete Concrete Sealing & Restoration
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl">
            From driveway sealing to decorative finishes, we protect and beautify every concrete
            surface around your home or business.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Service areas */}
      <section className="py-20 bg-slate-50">
        <div className="container-x text-center">
          <Eyebrow>Where We Work</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">Available Across Southwestern Ontario</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {serviceAreas.filter((a) => a.slug !== 'london-surrounding-areas').map((a) => (
              <Link
                key={a.slug}
                href={a.urlPath}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
