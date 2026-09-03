import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site, phoneHref } from '@/lib/site';
import { supportGuides, getSupportGuide } from '@/lib/support';
import { ArticleBody } from '@/components/ArticleBody';
import { Breadcrumbs, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { PrintButton } from '@/components/PrintButton';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return supportGuides.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSupportGuide(slug);
  if (!guide) return {};
  const url = `https://${site.domain}/support/${guide.slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: guide.metaTitle, description: guide.metaDescription, url, images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: guide.metaTitle, description: guide.metaDescription },
  };
}

export default async function SupportGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSupportGuide(slug);
  if (!guide) notFound();

  const url = `https://${site.domain}/support/${guide.slug}`;
  const others = supportGuides.filter(g => g.slug !== guide.slug);
  const updatedLabel = new Date(guide.updated + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  const GuideIcon = Icon[guide.icon];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: guide.title,
      description: guide.metaDescription,
      url,
      mainEntityOfPage: url,
      datePublished: guide.updated,
      dateModified: guide.updated,
      author: { '@type': 'Organization', name: site.name, url: `https://${site.domain}` },
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `https://${site.domain}/images/brand/logo-stacked.png` } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Owner Support', item: `https://${site.domain}/support` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-soft border-b border-line">
        <div className="wrap pt-8 pb-10 md:pt-10 md:pb-14">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ href: '/support', label: 'Owner Support' }, { label: guide.category }]} />
            <div className="mt-6 flex items-center gap-3 text-xs text-muted">
              <span className="chip"><GuideIcon size={14} /> {guide.category}</span>
              <span>{guide.readMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>Updated {updatedLabel}</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.05]">{guide.title}</h1>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">{guide.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3 no-print">
              {guide.download && (
                <a href={guide.download.href} download className="btn btn-dark btn-sm"><Icon.download size={16} /> {guide.download.label}</a>
              )}
              <PrintButton />
            </div>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 max-w-[70ch]">
            <div className="card-soft p-6 md:p-7 mb-10">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-4">Key takeaways</h2>
              <ol className="space-y-3">
                {guide.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-accent text-ink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <ArticleBody blocks={guide.body} />

            {guide.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="text-2xl font-bold text-ink mb-6">Frequently asked</h2>
                <div className="space-y-3">
                  {guide.faq.map((f, i) => (
                    <details key={i} className="group card overflow-hidden open:border-ink transition-colors">
                      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-ink min-h-[56px]">
                        {f.q}
                        <Icon.chevron size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-6 pb-6 text-ink-soft leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 no-print">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="card-dark p-6">
                <h2 className="text-lg font-bold">Need a hand?</h2>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">Phone and remote app support is free for life on systems we installed.</p>
                <div className="mt-4 grid gap-2">
                  <a href={phoneHref} className="btn btn-primary btn-sm w-full"><Icon.phone size={16} /> {site.phone}</a>
                  <Link href="/contact" className="btn btn-outline-light btn-sm w-full">Request service</Link>
                </div>
                <p className="mt-3 text-xs text-white/50">{site.hours}</p>
              </div>
              <div className="card p-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">More guides</h2>
                <ul className="space-y-1">
                  {others.map(g => {
                    const I = Icon[g.icon];
                    return (
                      <li key={g.slug}>
                        <Link href={`/support/${g.slug}`} className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink hover:text-ink-soft min-h-[44px]">
                          <I size={18} className="text-muted" /> {g.title.split(':')[0]}
                        </Link>
                      </li>
                    );
                  })}
                  <li><Link href="/support/installation-videos" className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink min-h-[44px]"><Icon.video size={18} className="text-muted" /> Installation videos</Link></li>
                  <li><Link href="/support/manuals" className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink min-h-[44px]"><Icon.file size={18} className="text-muted" /> Manuals & downloads</Link></li>
                  <li><Link href="/warranty" className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink min-h-[44px]"><Icon.shield size={18} className="text-muted" /> Warranty</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <CtaBand title="Not an owner yet?" text="Book a free site visit. We measure, colour-match and hand you a written price, usually within 24 hours." primaryLabel="Get a Free Quote" />
    </>
  );
}
