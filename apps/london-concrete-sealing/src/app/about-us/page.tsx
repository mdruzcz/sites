import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/lib/content';
import { Eyebrow, CheckItem, CtaBand, ServiceCard } from '@/components/ui';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about London Concrete Sealing — Ontario's trusted concrete protection experts with over a decade of experience sealing driveways, patios & stamped concrete across London, St. Thomas & Woodstock.",
  alternates: { canonical: '/about-us' },
};

const values = [
  { title: 'Quality First', detail: 'We use only top-of-the-line sealants and proven application methods for durable, beautiful results.', icon: '🏅' },
  { title: 'Customer Satisfaction', detail: 'Our commitment to your satisfaction sets us apart — we treat every property like our own.', icon: '🤝' },
  { title: 'Eco-Conscious', detail: 'Non-toxic, pet- and family-safe sealants that protect your concrete and the environment.', icon: '🌿' },
  { title: 'Local & Reliable', detail: 'A Southwestern Ontario team that shows up on time and gets the job done right.', icon: '📍' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image src="/images/concrete-cleaning-sealing.jpg" alt="London Concrete Sealing team at work" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-deep/60" />
        </div>
        <div className="container-x relative py-20 sm:py-28">
          <nav className="text-sm text-slate-300 mb-5 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl leading-[1.08]">
            Ontario's Trusted Concrete Sealing Experts
          </h1>
          <p className="mt-5 text-lg text-slate-200 max-w-2xl">
            Your premier partner in concrete protection — preserving and beautifying concrete across
            London, St. Thomas, Woodstock, and surrounding areas.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-xl">
              <Image src="/images/sealing-stamped-concrete.jpg" alt="Sealing stamped concrete in London, Ontario" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl px-7 py-5 shadow-lg flex-col">
              <span className="text-3xl font-extrabold">10+</span>
              <span className="text-sm font-medium text-white/90">Years Protecting Concrete</span>
            </div>
          </div>
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">A Decade of Concrete Protection</h2>
            <p className="mt-5 text-slate-muted leading-relaxed">
              London Concrete Sealing offers professional concrete sealing in London, Ontario for
              driveways, patios, and walkways. Serving homeowners across London, St. Thomas, and
              Woodstock, our team provides expert driveway sealing, patio sealing, and stamped
              concrete sealing near you.
            </p>
            <p className="mt-4 text-slate-muted leading-relaxed">
              With over a decade of experience, our team uses the latest techniques and products to
              protect and beautify your concrete driveways, patios, and walkways. Our commitment to
              quality and customer satisfaction sets us apart, ensuring your concrete remains in
              pristine condition for years to come.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3.5">
              <CheckItem>Over a decade of experience</CheckItem>
              <CheckItem>Latest techniques & products</CheckItem>
              <CheckItem>Transparent, competitive pricing</CheckItem>
              <CheckItem>Satisfaction guaranteed</CheckItem>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>What Sets Us Apart</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">The London Concrete Sealing Difference</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-slate-muted leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">How We Can Help</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/our-services" className="accent-btn px-7 py-3.5 rounded-xl font-semibold inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
