import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { articles, getArticlesByCategory } from '@/lib/resources';
import { Icon } from '@/components/icons';
import { PageHeader, CtaBand } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/resources`;

export const metadata: Metadata = {
  title: 'Permanent Lighting Resources & Guides',
  description:
    'Honest guides to permanent LED lighting for London & Southwestern Ontario homes — costs, how it works, brand comparisons, and year-round uses. No hype.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Permanent Lighting Resources & Guides | Forever Lights',
    description:
      'Straight-talking guides on permanent LED lighting costs, how it works, brand comparisons, and year-round uses for Southwestern Ontario homes.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Permanent Lighting Resources & Guides | Forever Lights',
    description: 'Honest guides on permanent LED lighting costs, how it works, and year-round uses.',
  },
};

export default function ResourcesPage() {
  const groups = getArticlesByCategory();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Forever Lights Resources',
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.title,
        url: `https://${site.domain}/resources/${a.slug}`,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Resources & guides"
        title="Permanent lighting, explained honestly."
        sub={`Plain-language guides to permanent LED lighting for homes across ${site.region}: what it costs, how it works, how the brands compare, and how homeowners actually use it all year. No hype, no pressure.`}
        crumbs={[{ label: 'Resources' }]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/cost-estimator" className="btn btn-primary">
            Try the cost estimator <Icon.arrow size={18} />
          </Link>
          <Link href="/contact" className="btn btn-outline">Get a free quote</Link>
        </div>
      </PageHeader>

      {/* ─── Article groups ─── */}
      <section className="section bg-white">
        <div className="wrap space-y-14 md:space-y-20">
          {groups.map(group => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-ink">{group.category}</h2>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <span className="text-sm text-muted whitespace-nowrap">
                  {group.items.length} {group.items.length === 1 ? 'guide' : 'guides'}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map(a => (
                  <Link
                    key={a.slug}
                    href={`/resources/${a.slug}`}
                    className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col"
                  >
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="chip">{a.category}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Icon.clock size={14} /> {a.readMinutes} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-ink leading-snug">{a.title}</h3>
                    <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{a.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      Read guide <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Ready for a real number ─── */}
      <section className="section-tight bg-soft border-t border-line">
        <div className="wrap">
          <div className="card p-8 md:p-12 max-w-4xl mx-auto text-center">
            <span className="eyebrow">Next step</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-ink">Ready for a real number?</h2>
            <p className="mt-4 text-muted leading-relaxed max-w-lg mx-auto">
              Get a fast ballpark with our cost estimator, or book a free, no-pressure site visit and we&apos;ll measure
              your roofline exactly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/cost-estimator" className="btn btn-primary btn-lg">Estimate my cost</Link>
              <Link href="/contact" className="btn btn-outline btn-lg">Get a free quote</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
