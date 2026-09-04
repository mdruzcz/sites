import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ArticleBody } from "@/components/article-body";
import type { PhotoKey } from "@/lib/photos";
import { articles, getArticle, getRelatedArticles, CATEGORY_PHOTO } from "@/lib/resources";
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
  return {
    title: article.metaTitle.replace(/\s*\|\s*Holiday Lights Direct\s*$/i, ""),
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: article.metaTitle, description: article.metaDescription, url },
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/resources/${article.slug}`;
  const related = getRelatedArticles(article.slug, 3);
  const updated = new Date(article.updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const photo = (CATEGORY_PHOTO[article.category] ?? "home-nighttime-lit") as PhotoKey;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      articleSection: article.category,
      url,
      mainEntityOfPage: url,
      datePublished: article.updated,
      dateModified: article.updated,
      author: { "@type": "Organization", name: "Holiday Lights Direct", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Holiday Lights Direct", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/resources` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo={photo} photoAlt={article.heroAlt} eyebrow={article.category} title={article.title} crumb="Guides" />

      <article className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]">
            <p className="text-sm text-[var(--color-muted)]">
              <Link href="/resources" className="hover:underline">Guides</Link>
              <span className="mx-1.5">/</span>
              {article.category}
              <span className="mx-1.5">·</span>
              {article.readMinutes} min read
              <span className="mx-1.5">·</span>
              Updated {updated}
            </p>
            <p className="lead mt-6 text-[var(--color-text-soft)]">{article.excerpt}</p>

            <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)]">
              <p className="eyebrow text-[var(--color-gold-text)]">Key takeaways</p>
              <ol className="mt-4 space-y-3">
                {article.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-gold)] text-xs font-bold text-[#17130a]">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12">
              <ArticleBody blocks={article.body} />
            </div>

            {article.faq.length > 0 && (
              <section className="mt-16">
                <h2 className="font-display text-[1.75rem] md:text-[2.1rem]">Frequently asked questions</h2>
                <div className="mt-6 space-y-3">
                  {article.faq.map((f, i) => (
                    <details key={i} className="group rounded-2xl border border-[var(--color-border)] bg-white">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold">
                        {f.q}
                        <span aria-hidden className="text-[var(--color-muted)] transition group-open:rotate-180">▾</span>
                      </summary>
                      <p className="px-6 pb-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16 rounded-2xl bg-[var(--color-ink)] p-8 text-white md:p-10">
              <p className="eyebrow text-[var(--color-gold-bright)]">Stock up</p>
              <h2 className="font-display mt-4 text-2xl md:text-3xl">Everything in this guide ships from London, Ontario.</h2>
              <p className="mt-4 text-white/75">Installer-grade C9 bulbs, socket wire, SPT-2 spools, plugs, clips and 12V permanent lighting kits. Free Canadian shipping over $500.</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/shop" className="btn-gold">Shop the catalog</Link>
                <Link href="/permanent-lights" className="btn-ghost-light">Permanent lighting kits</Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mx-auto mt-20 max-w-6xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Keep reading</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="card group flex flex-col p-6">
                    <p className="text-xs text-[var(--color-muted)]">{r.category} · {r.readMinutes} min</p>
                    <h3 className="font-display mt-2 text-lg leading-snug transition group-hover:text-[var(--color-gold-text)]">{r.title}</h3>
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
