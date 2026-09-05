import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { ARTICLES, getArticle, getRelated, articlePhoto } from "@/lib/resources";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Guide not found" };
  const url = `${site.url}/resources/${a.slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: a.metaTitle, description: a.metaDescription, url, images: [photo(articlePhoto(a.slug)).image], publishedTime: a.updated, modifiedTime: a.updated },
    twitter: { card: "summary_large_image", title: a.metaTitle, description: a.metaDescription },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const url = `${site.url}/resources/${a.slug}`;
  const related = getRelated(a.slug);
  const updated = new Date(a.updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.metaDescription, articleSection: a.category, image: `${site.url}${photo(articlePhoto(a.slug)).image}`, url, mainEntityOfPage: url, datePublished: a.updated, dateModified: a.updated, author: { "@type": "Organization", name: site.name, url: site.url }, publisher: { "@id": `${site.url}/#organization` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`article-${a.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={articlePhoto(a.slug)} photoAlt={a.heroAlt} eyebrow={a.category} title={a.title} crumbs={[{ label: "Guides", href: "/resources" }, { label: a.title }]} form={false} compact />
      <article className="bg-[var(--snow)]">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]">
            <p className="text-sm text-[var(--muted)]"><Link href="/resources" className="hover:underline">Guides</Link><span className="mx-1.5">/</span>{a.category}<span className="mx-1.5">·</span>{a.readMinutes} min read<span className="mx-1.5">·</span>Updated {updated}</p>
            <p className="lead mt-6 text-[var(--ink-soft)]">{a.excerpt}</p>
            <div className="card mt-8 p-6">
              <p className="eyebrow-pill">Key takeaways</p>
              <ol className="mt-4 space-y-3">
                {a.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--candy)] text-xs font-bold text-white">{i + 1}</span><span>{t}</span></li>
                ))}
              </ol>
            </div>
            <div className="mt-10"><ArticleBody blocks={a.body} /></div>
            {a.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-[1.7rem] md:text-[2.05rem]">Frequently asked questions</h2>
                <div className="mt-6 space-y-3">
                  {a.faq.map((f, i) => (
                    <details key={i} className="group card">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold">{f.q}<span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--paper)] text-[var(--candy)] transition group-open:rotate-45">+</span></summary>
                      <p className="px-5 pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <div className="card mt-14 border-[var(--candy-soft)] bg-[var(--candy-soft)] p-8 text-center">
              <p className="eyebrow-pill candy">Free quote</p>
              <h2 className="font-display mt-4 text-2xl md:text-3xl">Want us to just handle it?</h2>
              <p className="mt-3 text-[var(--ink-soft)]">Send a photo of the house and we will come back with a price within a business day.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3"><a href="#contact" className="btn-candy">Request a quote</a><a href={site.phoneHref} className="btn-outline">{site.phone}</a></div>
            </div>
          </div>
          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-6xl">
              <p className="eyebrow-pill">Keep reading</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="card card-lift group p-6">
                    <p className="text-xs text-[var(--muted)]">{r.category} · {r.readMinutes} min</p>
                    <h3 className="font-display mt-2 text-lg leading-snug group-hover:text-[var(--candy)]">{r.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm text-[var(--ink-soft)]">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Contact />
    </>
  );
}
