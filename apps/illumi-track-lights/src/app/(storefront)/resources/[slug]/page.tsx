import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ARTICLES, getArticle, getRelated, heroPhotoFor, type ArticleBlock } from "@/lib/resources";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

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

const INTERNAL = /(\/(?:diy-kits|shop|brands|how-it-works|warranty|shipping-returns|resources|contact-us|installers|installation|professional-installer|faq|gallery|compare|about|product-category\/[a-z0-9-]+|product\/[a-z0-9-]+|resources\/[a-z0-9-]+|installation\/[a-z0-9-]+)\b)/g;
function linkify(text: string) {
  return text.split(INTERNAL).map((part, i) =>
    /^\/[a-z]/.test(part) ? <Link key={i} href={part} className="text-link">{part}</Link> : <span key={i}>{part}</span>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="font-display mt-11 mb-3 scroll-mt-28 text-[1.55rem] md:text-[1.85rem]">{block.text}</h2>;
    case "h3":
      return <h3 className="font-display mt-7 mb-2 text-[1.2rem]">{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{linkify(block.text)}</p>;
    case "ul":
      return (
        <ul className="mb-6 ml-5 list-disc space-y-2 marker:text-[var(--color-gold)]">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1 leading-relaxed text-[var(--color-text-soft)]">{linkify(item)}</li>
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
                <span className="font-display grid size-9 shrink-0 place-items-center border border-[var(--color-ink)] text-sm font-bold text-[var(--color-ink)]">{i + 1}</span>
                <div className="pt-1">
                  {title && <p className="font-semibold text-[var(--color-text)]">{title}</p>}
                  <p className="leading-relaxed text-[var(--color-text-soft)]">{linkify(body)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "callout":
      return (
        <aside className="note note-amber my-7 text-[1rem]">
          <p className="text-[var(--color-text)]">{linkify(block.text)}</p>
        </aside>
      );
    case "table":
      return (
        <figure className="my-8">
          <div className="overflow-x-auto border border-[var(--color-border)]">
            <table className="table-clean min-w-[36rem]">
              <thead>
                <tr>{block.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (c === 0 ? <th key={c} scope="row" className="font-semibold text-[var(--color-text)]">{cell}</th> : <td key={c} className="text-[var(--color-text-soft)]">{cell}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-2 text-sm text-[var(--color-muted)]">{block.caption}</figcaption>}
        </figure>
      );
    case "sources":
      return (
        <aside className="mt-12 border-t border-[var(--color-border-strong)] pt-5">
          <h2 className="eyebrow text-[var(--color-gold-text)]">Where these facts come from</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {block.items.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-link break-words font-normal">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Makers change their products and prices. If something here is out of date, tell us at <a href={`mailto:${BRAND.email}`} className="underline">{BRAND.email}</a> and we will fix it.
          </p>
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
      <PageHero compact photo={heroKey} photoAlt={article.heroAlt} eyebrow={article.category} title={article.title} crumbs={[{ label: "Guides", href: "/resources" }, { label: article.title }]} />
      <article>
        <div className="shell section">
          <div className="mx-auto max-w-[70ch]">
            <p className="text-sm text-[var(--color-muted)]">
              {article.category}
              <span className="mx-1.5">·</span>{article.readMinutes} minute read
              <span className="mx-1.5">·</span>Updated {updated}
            </p>
            <p className="lead mt-5 text-[var(--color-text)]">{article.excerpt}</p>
            {article.keyTakeaways.length > 0 && (
              <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-bg-warm)] p-6">
                <p className="eyebrow text-[var(--color-gold-text)]">The short version</p>
                <ul className="mt-3 ml-5 list-disc space-y-2 marker:text-[var(--color-gold)]">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="pl-1 text-[0.975rem] leading-relaxed text-[var(--color-text-soft)]">{t}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-9">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
            {article.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-[1.55rem] md:text-[1.85rem]">Questions people ask</h2>
                <div className="mt-5 border-t border-[var(--color-border-strong)]">
                  {article.faq.map((f, i) => (
                    <details key={i} className="group border-b border-[var(--color-border-strong)]">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-[var(--color-ink)]">
                        {f.q}
                        <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="pb-5 pr-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <div className="mt-14 border border-[var(--color-border)] p-6 md:p-8">
              <p className="eyebrow text-[var(--color-gold-text)]">On the shelf</p>
              <h2 className="font-display mt-2 text-[1.5rem]">Everything in this guide ships free.</h2>
              <p className="mt-3 text-[var(--color-text-soft)]">Complete 12V track lighting kits for 50 to 250 feet of roofline, and every part sold on its own. Free shipping on every order in Canada, or free pickup at {BRAND.street}, {BRAND.city}.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/diy-kits" className="btn-primary">Shop the kits</Link>
                <Link href="/shop" className="btn-secondary">See every part</Link>
              </div>
            </div>
          </div>
          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-5xl">
              <h2 className="font-display h3-fluid track-title">Keep reading</h2>
              <ul className="mt-7 grid gap-x-8 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="border-t border-[var(--color-border)] py-4">
                    <Link href={`/resources/${r.slug}`} className="group block">
                      <span className="eyebrow text-[var(--color-gold-text)]">{r.category}</span>
                      <span className="font-display mt-1 block text-[1.1rem] leading-snug group-hover:underline">{r.title}</span>
                      <span className="mt-1 line-clamp-3 block text-sm text-[var(--color-text-soft)]">{r.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
