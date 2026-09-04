import type { Metadata } from 'next';
import Link from 'next/link';
import { site, phoneHref } from '@/lib/site';
import { supportDownloads, supportGuides } from '@/lib/support';
import { PageHeader, ComingSoon, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/support/manuals`;

export const metadata: Metadata = {
  title: 'Manuals & Downloads',
  description:
    "Download the Forever Lights owner's quick start guide, warranty terms and care checklist as PDFs. Controller manual, technical spec sheet and commercial guide coming soon.",
  alternates: { canonical: url },
  openGraph: {
    title: 'Manuals & Downloads | Forever Lights',
    description: "Owner's quick start guide, warranty terms and care checklist. Controller manual and spec sheet coming soon.",
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const kindLabel: Record<string, string> = { guide: 'Guide', manual: 'Manual', spec: 'Spec sheet', warranty: 'Warranty' };

export default function ManualsPage() {
  const ready = supportDownloads.filter(d => d.href);
  const soon = supportDownloads.filter(d => !d.href);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Owner Support', item: `https://${site.domain}/support` },
      { '@type': 'ListItem', position: 3, name: 'Manuals & Downloads', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Manuals & downloads"
        title="Print it, save it, hand it to the next owner."
        sub="The documents that come with every Forever Lights system, plus the product manuals as we publish them."
        crumbs={[{ href: '/support', label: 'Owner Support' }, { label: 'Manuals & Downloads' }]}
      />

      <section className="section">
        <div className="wrap max-w-5xl">
          <h2 className="text-2xl font-bold text-ink mb-6">Available now</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {ready.map(d => (
              <a key={d.title} href={d.href!} download className="card p-6 flex flex-col hover:border-ink transition-colors group">
                <div className="flex items-start justify-between mb-5">
                  <span className="w-12 h-12 rounded-xl bg-soft text-ink flex items-center justify-center"><Icon.file size={24} /></span>
                  <span className="chip">{kindLabel[d.kind]} · {d.size ?? 'PDF'}</span>
                </div>
                <h3 className="text-lg font-bold text-ink">{d.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{d.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"><Icon.download size={16} /> Download PDF</span>
              </a>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-ink mt-14 mb-2">Coming soon</h2>
          <p className="text-muted mb-6 max-w-2xl">
            These are being prepared with our suppliers. If you need one of them today, call the office and we will send you the current version.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {soon.map(d => (
              <div key={d.title} className="card-soft p-6 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <span className="w-12 h-12 rounded-xl bg-white text-muted flex items-center justify-center"><Icon.file size={24} /></span>
                  <ComingSoon />
                </div>
                <h3 className="text-lg font-bold text-ink">{d.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{d.description}</p>
                <span className="mt-5 chip">{kindLabel[d.kind]}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            <div className="card p-7">
              <h2 className="text-lg font-bold text-ink mb-3">Read the guides online</h2>
              <ul className="space-y-1">
                {supportGuides.map(g => {
                  const I = Icon[g.icon];
                  return (
                    <li key={g.slug}>
                      <Link href={`/support/${g.slug}`} className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink hover:text-ink-soft min-h-[44px]">
                        <I size={18} className="text-muted" /> {g.title.split(':')[0]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card-dark p-7">
              <h2 className="text-lg font-bold mb-2">Need a document we have not published?</h2>
              <p className="text-sm text-white/70 leading-relaxed">Controller model manuals, spec sheets for insurers or condo boards, or a copy of your invoice. Call us and we will send it the same business day.</p>
              <div className="mt-5 grid gap-2">
                <a href={phoneHref} className="btn btn-primary btn-sm w-full"><Icon.phone size={16} /> {site.phone}</a>
                <Link href="/contact" className="btn btn-outline-light btn-sm w-full"><Icon.mail size={16} /> Send a message</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Considering permanent lighting?" text="Every install includes these documents, our warranty and free phone support for life. Book a free site visit for an exact price." primaryLabel="Get a Free Quote" />
    </>
  );
}
