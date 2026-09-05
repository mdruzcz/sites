import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ARTICLES, getArticle, getRelated, heroPhotoFor, type ArticleBlock } from "@/lib/resources";
import { photo } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${SITE_URL}/resources/${article.slug}`;
  const img = photo(heroPhotoFor(article.slug)).src;
  return {
    title: article.metaTitle.replace(/\s*\|\s*Illumi Track Lights\s*$/i, ""),
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: article.metaTitle, description: article.metaDescription, url, images: [img], publishedTime: article.updated, modifiedTime: article.updated },
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription }
  };
}

const INTERNAL = /(\/(?:diy-kits|shop|how-it-works|warranty|resources|contact-us|installers|installation|professional-installer|faq|gallery|compare|about|product-category\/[a-z0-9-]+|product\/[a-z0-9-]+|resources\/[a-z0-9-]+|installation\/[a-z0-9-]+)\b)/g;
function linkify(text: string) {
  return text.split(INTERNAL).map((part, i) =>
    /^\/[a-z]/.test(part) ? <Link key={i} href={part} className="link-underline font-medium text-[var(--color-gold-text)]">{part}</Link> : <span key={i}>{part}</span>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="font-display mt-12 mb-4 scroll-mt-28 text-[1.7rem] md:text-[2.05rem]">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 text-xl font-semibold">{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-[1.05rem] leading-relaxed text-[var(--color-text-soft)]">{linkify(block.text)}</p>;
    case "ul":
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed text-[var(--color-text-soft)]">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>{linkify(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="my-8 space-y-5">
          {block.items.map((item, i) => {
            const [head, ...rest] = item.split(". ");
            const title = rest.length ? head : null;
            const body = rest.length ? rest.join(". ") : item;
            return (
              <li key={i} className="flex gap-4">
                <span className="font-display grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-sm font-bold text-white">{i + 1}</span>
                <div className="pt-1">
                  {title && <p className="font-semibold">{title}</p>}
                  <p className="leading-relaxed text-[var(--color-text-soft)]">{linkify(body)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-gold-soft)] px-6 py-5">
          <p className="leading-relaxed text-[var(--color-text)]">{linkify(block.text)}</p>
        </aside>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/resources/${article.slug}`;
  const related = getRelated(article.slug);
  const heroKey = heroPhotoFor(article.slug);
  const updated = new Date(article.updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const stepsBlock = article.body.find((b) => b.type === "steps");

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      articleSection: article.category,
      image: `${SITE_URL}${photo(heroKey).src}`,
      datePublished: article.updated,
      dateModified: article.updated,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: "Illumi Track Lights", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Illumi Track Lights", url: SITE_URL }
    }
  ];
  if (article.faq.length) jsonLd.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: article.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  if (article.isHowTo && stepsBlock && stepsBlock.type === "steps") {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: article.title,
      description: article.metaDescription,
      step: stepsBlock.items.map((item, i) => {
        const [head, ...rest] = item.split(". ");
        return { "@type": "HowToStep", position: i + 1, name: rest.length ? head : `Step ${i + 1}`, text: rest.length ? rest.join(". ") : item };
      })
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo={heroKey} photoAlt={article.heroAlt} eyebrow={article.category} title={article.title} crumbs={[{ label: "Guides", href: "/resources" }, { label: article.title }]} />
      <article className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]">
            <p className="text-sm text-[var(--color-muted)]">
              <Link href="/resources" className="hover:underline">Guides</Link>
              <span className="mx-1.5">/</span>{article.category}
              <span className="mx-1.5">·</span>{article.readMinutes} min read
              <span className="mx-1.5">·</span>Updated {updated}
            </p>
            <p className="lead mt-6 text-[var(--color-text-soft)]">{article.excerpt}</p>
            {article.keyTakeaways.length > 0 && (
              <div className="card mt-10 p-7">
                <p className="eyebrow text-[var(--color-gold-text)]">Key takeaways</p>
                <ol className="mt-4 space-y-3">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-xs font-bold text-white">{i + 1}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="mt-10">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
            {article.faq.length > 0 && (
              <section className="mt-16">
                <h2 className="font-display text-[1.7rem] md:text-[2.05rem]">Frequently asked questions</h2>
                <div className="mt-6 space-y-3">
                  {article.faq.map((f, i) => (
                    <details key={i} className="group card">
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
            <div className="panel-dark mt-16 p-8 md:p-10">
              <p className="eyebrow text-[var(--color-gold)]">Kit or installed</p>
              <h2 className="font-display mt-4 text-2xl md:text-3xl">Everything in this guide ships from London, Ontario.</h2>
              <p className="mt-4 text-white/75">Complete 12V soffit track kits from $1,265, every part sold separately, and professional installation across Southwestern Ontario.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
                <Link href="/installation" className="btn-ghost-light">Book an install</Link>
              </div>
            </div>
          </div>
          {related.length > 0 && (
            <section className="mx-auto mt-20 max-w-6xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Keep reading</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="card card-lift group flex flex-col p-6">
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
