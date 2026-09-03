import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { articles, getArticle, getRelatedArticles } from '@/lib/resources';
import { ArticleBody } from '@/components/ArticleBody';
import { Icon } from '@/components/icons';
import { Breadcrumbs, CtaBand } from '@/components/ui';

export const revalidate = 3600;

const OG_IMAGE = '/images/og-default.jpg';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `https://${site.domain}/resources/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `https://${site.domain}/resources/${article.slug}`;
  const related = getRelatedArticles(article.slug, 3);
  const updatedLabel = new Date(article.updated + 'T00:00:00').toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.metaDescription,
      articleSection: article.category,
      url,
      mainEntityOfPage: url,
      datePublished: article.updated,
      dateModified: article.updated,
      author: { '@type': 'Organization', name: site.name, url: `https://${site.domain}` },
      publisher: {
        '@type': 'Organization',
        name: site.name,
        url: `https://${site.domain}`,
        logo: { '@type': 'ImageObject', url: `https://${site.domain}/images/brand/logo-stacked.png` },
      },
      image: `https://${site.domain}${OG_IMAGE}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: `https://${site.domain}/resources` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        {/* ─── Header band ─── */}
        <header className="bg-soft border-b border-line">
          <div className="wrap pt-8 pb-12 md:pt-10 md:pb-16">
            <div className="max-w-[70ch] mx-auto">
              <Breadcrumbs items={[{ href: '/resources', label: 'Resources' }, { label: article.category }]} />
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                <span className="chip">{article.category}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon.clock size={14} /> {article.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon.calendar size={14} /> Updated <time dateTime={article.updated}>{updatedLabel}</time>
                </span>
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] text-ink">{article.title}</h1>
              <p className="mt-5 text-lg text-muted leading-relaxed">{article.excerpt}</p>
            </div>
          </div>
        </header>

        <div className="wrap py-12 md:py-16">
          <div className="max-w-[70ch] mx-auto">
            {/* ─── Key takeaways ─── */}
            <aside className="card-soft p-6 md:p-8" aria-labelledby="key-takeaways">
              <h2 id="key-takeaways" className="text-xl font-bold text-ink">Key takeaways</h2>
              <ol className="mt-5 space-y-3">
                {article.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-accent text-ink text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </aside>

            {/* ─── Body ─── */}
            <div className="mt-10 md:mt-12">
              <ArticleBody blocks={article.body} />
            </div>

            {/* ─── FAQ ─── */}
            {article.faq.length > 0 && (
              <section className="mt-16" aria-labelledby="article-faq">
                <h2 id="article-faq" className="text-2xl md:text-3xl font-bold text-ink mb-6">Frequently asked questions</h2>
                <div className="space-y-3">
                  {article.faq.map((f, i) => (
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

            {/* ─── CTA card ─── */}
            <section className="mt-16">
              <div className="card p-8 md:p-10 text-center">
                <span className="eyebrow">Your home, your number</span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold text-ink">Want a number for your own home?</h2>
                <p className="mt-4 text-muted leading-relaxed max-w-lg mx-auto">
                  Get a fast ballpark with our cost estimator, or book a free, no-pressure site visit and we&apos;ll measure
                  your exact roofline. Financing over 24 months at 10% APR is available on approved credit.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/cost-estimator" className="btn btn-primary btn-lg">Estimate my cost</Link>
                  <Link href="/contact" className="btn btn-outline btn-lg">Get a free quote</Link>
                </div>
              </div>
            </section>
          </div>

          {/* ─── Related guides ─── */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-20 max-w-6xl mx-auto" aria-labelledby="related-guides">
              <div className="flex items-center gap-4 mb-6">
                <h2 id="related-guides" className="text-2xl md:text-3xl font-bold text-ink">Related guides</h2>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/resources/${r.slug}`}
                    className="card p-6 group hover:border-ink transition-colors flex flex-col"
                  >
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="chip">{r.category}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Icon.clock size={14} /> {r.readMinutes} min
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-ink leading-snug">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">{r.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      Read guide <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <CtaBand />
    </>
  );
}
