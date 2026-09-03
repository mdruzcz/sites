import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceAreas, site, getPhoto, phoneHref } from '@/lib/site';
import { PageHeader, PhotoImg, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Service Areas — Southwestern Ontario | Forever Lights',
  description: 'Forever Lights serves London, St. Thomas, Woodstock, Brantford, Stratford, Strathroy, Ingersoll, Tillsonburg and 12 more Southwestern Ontario communities.',
  alternates: { canonical: `https://${site.domain}/locations` },
};

export default function LocationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `https://${site.domain}/locations` },
    ],
  };

  const london = serviceAreas.find(a => a.slug === 'london-ontario') ?? serviceAreas[0];
  const others = serviceAreas.filter(a => a.slug !== london.slug);
  const londonPhoto = getPhoto('blue-bungalow');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Coverage"
        title="Where we install"
        sub={`${site.name} installs permanent LED lighting across ${site.region}: London and ${others.length} surrounding communities in Middlesex, Elgin, Oxford, Perth, Huron and Brant counties. Free site visits everywhere we serve.`}
        crumbs={[{ label: 'Service Areas' }]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
          <a href={phoneHref} className="btn btn-outline"><Icon.phone size={18} /> {site.phone}</a>
        </div>
      </PageHeader>

      {/* ─── CITY GRID ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* London — featured, spans 2 columns on md+ */}
            <Link
              href={`/locations/${london.slug}`}
              className="card overflow-hidden group hover:border-ink transition-colors flex flex-col sm:col-span-2"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <PhotoImg photo={londonPhoto} sizes="(max-width: 640px) 100vw, 66vw" className="group-hover:scale-[1.03] transition-transform duration-700" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent text-ink text-xs font-semibold px-3 py-1.5">
                  <Icon.pin size={14} /> Home base
                </span>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-ink">{london.label}</h2>
                  <span className="text-xs text-muted whitespace-nowrap">Pop. {london.population}</span>
                </div>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{london.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${london.city} neighbourhoods`}>
                  {london.neighbourhoods.map(n => <li key={n} className="chip">{n}</li>)}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
                  Permanent lighting in {london.city} <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {others.map(a => (
              <Link
                key={a.slug}
                href={`/locations/${a.slug}`}
                className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0"><Icon.pin size={22} /></span>
                  <span className="text-xs text-muted whitespace-nowrap mt-1">Pop. {a.population}</span>
                </div>
                <h2 className="mt-5 text-lg font-bold text-ink">{a.label}</h2>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{a.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 flex-1 content-start" aria-label={`${a.city} neighbourhoods`}>
                  {a.neighbourhoods.map(n => <li key={n} className="chip">{n}</li>)}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
                  Permanent lighting in {a.city} <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Don&apos;t see your town? We regularly travel beyond this list.{' '}
            <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 inline-flex min-h-[44px] items-center">Ask us about your address</Link>.
          </p>
        </div>
      </section>

      <CtaBand photoKey="hero-winter" title={<>Ready to light up your home?</>} />
    </>
  );
}
