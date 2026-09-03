import type { Metadata } from 'next';
import Link from 'next/link';
import { services, site, phoneHref, getPhoto } from '@/lib/site';
import { PageHeader, CheckList, CtaBand, PhotoImg } from '@/components/ui';
import { ServiceIcon } from '@/components/ServiceIcon';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/services`;

export const metadata: Metadata = {
  title: 'Our Services — Permanent LED Lighting Installation',
  description: 'Permanent Christmas lighting, year-round accent lighting, commercial installs, soffit track lighting and repairs across London, Ontario and Southwestern Ontario.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Our Services — Permanent LED Lighting | Forever Lights',
    description: 'Explore Forever Lights’ permanent LED lighting services for homes and businesses across Southwestern Ontario.',
    url,
    images: [{ url: '/images/photos/permanent-led-roofline-lights-warm-white-night.webp', width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: `https://${site.domain}/services/${s.slug}`,
      })),
    },
  ];

  const sitePhoto = getPhoto('daytime-brown');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="What we do"
        title="Permanent LED lighting services"
        sub={`One professionally installed track, endless possibilities. Here is how ${site.name} keeps homes and businesses across ${site.region} looking their best every season.`}
        crumbs={[{ label: 'Services' }]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
          <a href={phoneHref} className="btn btn-outline"><Icon.phone size={18} /> {site.phone}</a>
        </div>
      </PageHeader>

      {/* ─── SERVICE GRID ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col"
              >
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center mb-5">
                  <ServiceIcon slug={s.slug} size={22} />
                </span>
                <h2 className="text-xl font-bold text-ink">{s.title}</h2>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.description}</p>
                <CheckList items={s.features} className="mt-5 text-sm flex-1" />
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
                  Learn more <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOT SURE WHICH ─── */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap">
          <div className="card overflow-hidden grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
              <PhotoImg photo={sitePhoto} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <span className="eyebrow">Free site visit</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-ink">Not sure which service you need?</h2>
              <p className="mt-3 text-muted leading-relaxed">
                Book a free site visit and we&apos;ll recommend the right permanent lighting setup for your home or business,
                then hand you a written, no-obligation quote. Most quotes arrive within 24 hours.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                <li className="inline-flex items-center gap-2"><Icon.ruler size={16} className="text-accent" /> Measured on site</li>
                <li className="inline-flex items-center gap-2"><Icon.palette size={16} className="text-accent" /> Colour-matched track</li>
                <li className="inline-flex items-center gap-2"><Icon.file size={16} className="text-accent" /> Written quote</li>
              </ul>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-dark">Book My Free Site Visit</Link>
                <Link href="/cost-estimator" className="btn btn-outline">Try the cost estimator <Icon.arrow size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand photoKey="red-white-night" />
    </>
  );
}
