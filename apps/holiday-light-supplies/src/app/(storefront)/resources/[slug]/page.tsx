import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ArticleBody, articleToc } from "@/components/article-body";
import { FaqList, faqLd, breadcrumbLd } from "@/components/ui";
import { Icon } from "@/components/icons";
import { articles, articlePhoto, getArticle, getRelatedArticles } from "@/lib/resources";
import { photo } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Guide not found" };
  const url = `${SITE_URL}/resources/${article.slug}`;
  const img = photo(articlePhoto(article));
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: `${article.metaTitle} | Holiday Light Supplies`, description: article.metaDescription, url, images: [{ url: img.src, alt: article.heroAlt }] },
    twitter: { card: "summary_large_image", title: `${article.metaTitle} | Holiday Light Supplies`, description: article.metaDescription }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/resources/${article.slug}`;
  const related = getRelatedArticles(article.slug, 3);
  const toc = articleToc(article.body);
  const updated = new Date(article.updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const heroKey = articlePhoto(article);
  const img = photo(heroKey);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      articleSection: article.category,
      url,
      mainEntityOfPage: url,
      image: `${SITE_URL}${img.src}`,
      datePublished: article.updated,
      dateModified: article.updated,
      author: { "@type": "Organization", name: "Holiday Light Supplies", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Holiday Light Supplies", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } }
    },
    breadcrumbLd([{ href: "/resources", label: "Guides" }, { label: article.title }]),
    faqLd(article.faq)
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo={heroKey} photoAlt={article.heroAlt} eyebrow={article.category} title={article.title} crumbs={[{ href: "/resources", label: "Guides" }, { label: article.category }]} compact />

      <article className="bg-white">
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="mx-auto w-full max-w-[72ch]">
              <p className="text-sm text-[var(--color-muted)]">
                {article.readMinutes} min read · Updated {updated}
              </p>
              <p className="lead mt-5 text-[var(--color-text-soft)]">{article.excerpt}</p>

              <div className="card mt-10 p-7">
                <p className="eyebrow text-[var(--color-accent)]">Key takeaways</p>
                <ol className="mt-4 space-y-3">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-white">{i + 1}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10">
                <ArticleBody blocks={article.body} />
              </div>

              {article.faq.length > 0 && (
                <section className="mt-16">
                  <h2 className="font-display text-[1.75rem] md:text-[2.1rem]">Frequently asked questions</h2>
                  <div className="mt-6">
                    <FaqList items={article.faq} />
                  </div>
                </section>
              )}

              <div className="mt-16 rounded-3xl bg-[var(--color-night)] p-8 text-white md:p-10">
                <p className="eyebrow text-[var(--color-gold-bright)]">Put it into an order</p>
                <h2 className="font-display mt-4 text-2xl md:text-3xl">Everything in this guide ships from London, Ontario.</h2>
                <p className="mt-4 text-white/75">Commercial-grade C9, displays, pole décor, wreaths and garland, quoted line by line with freight within one business day.</p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/request-a-quote" className="btn-gold">Request a quote</Link>
                  <Link href="/shop" className="btn-ghost-light">Shop the catalog</Link>
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {toc.length > 2 && (
                  <nav aria-label="In this guide" className="card p-5">
                    <p className="eyebrow text-[var(--color-muted)]">In this guide</p>
                    <ol className="mt-3 space-y-2 text-sm">
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} className="text-[var(--color-text-soft)] transition hover:text-[var(--color-brand)]">{t.text}</a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="rounded-2xl bg-[var(--color-brand-soft)] p-5">
                  <p className="font-display text-lg leading-snug text-[var(--color-brand-dark)]">Buying for a BIA, mall or municipality?</p>
                  <Link href="/commercial" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline">
                    See the commercial overview <Icon.arrow size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Keep reading</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                    <p className="text-xs text-[var(--color-muted)]">{r.category} · {r.readMinutes} min</p>
                    <h3 className="font-display mt-2 text-lg leading-snug transition group-hover:text-[var(--color-brand)]">{r.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
