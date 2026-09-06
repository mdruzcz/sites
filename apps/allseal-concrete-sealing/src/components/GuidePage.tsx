import Link from "next/link";
import Script from "next/script";
import { QuoteDock } from "./QuoteDock";
import { PageHero } from "./PageHero";
import { ArticleBody } from "./ArticleBody";
import { site } from "@/lib/site";
import { getRelatedGuides, guidePhoto, type Guide } from "@/lib/content";
import { photo } from "@/lib/photos";

export function GuidePage({ a }: { a: Guide }) {
  const url = `${site.url}/resources/${a.slug}`;
  const related = getRelatedGuides(a.slug);
  const updated = new Date(a.updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.metaDescription, articleSection: a.category, image: `${site.url}${photo(guidePhoto(a.slug)).image}`, url, mainEntityOfPage: url, datePublished: a.updated, dateModified: a.updated, author: { "@type": "Organization", name: site.name, url: site.url }, publisher: { "@id": `${site.url}/#organization` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`article-${a.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={guidePhoto(a.slug)} photoAlt={a.heroAlt} kicker={a.category} title={a.title} crumbs={[{ label: "Guides", href: "/resources" }, { label: a.title }]} />
      <article className="bg-white">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]"><Link href="/resources" className="hover:underline">Guides</Link><span className="mx-2 text-[var(--orange)]">/</span>{a.category}<span className="mx-2 text-[var(--orange)]">·</span>{a.readMinutes} min read<span className="mx-2 text-[var(--orange)]">·</span>Updated {updated}</p>
            <p className="lead mt-6 text-[var(--ink-soft)]">{a.excerpt}</p>
            <div className="mt-8 border-l-4 border-[var(--orange)] bg-[var(--fog)] p-6">
              <p className="kicker">Key takeaways</p>
              <ol className="mt-4 space-y-3">{a.keyTakeaways.map((t, i) => <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]"><span className="font-display mt-0.5 grid size-6 shrink-0 place-items-center rounded bg-[var(--graphite)] text-xs font-bold text-[var(--orange)]">{i + 1}</span><span>{t}</span></li>)}</ol>
            </div>
            <div className="mt-10"><ArticleBody blocks={a.body} /></div>
            {a.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-3xl md:text-4xl">Frequently asked questions</h2>
                <div className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">{a.faq.map((f, i) => <details key={i} className="group"><summary className="font-display flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold uppercase tracking-wide">{f.q}<span aria-hidden className="grid size-8 shrink-0 place-items-center rounded bg-[var(--graphite)] text-[var(--orange)] transition group-open:rotate-45">+</span></summary><p className="pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p></details>)}</div>
              </section>
            )}
          </div>
          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-6xl">
              <p className="kicker">Keep reading</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map((r) => <Link key={r.slug} href={`/resources/${r.slug}`} className="card card-lift group p-6"><p className="text-xs uppercase tracking-wider text-[var(--muted)]">{r.category} · {r.readMinutes} min</p><h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-[var(--orange-deep)]">{r.title}</h3><p className="mt-3 line-clamp-3 text-sm text-[var(--ink-soft)]">{r.excerpt}</p></Link>)}</div>
            </section>
          )}
        </div>
      </article>
      <QuoteDock heading="Want it sealed properly? Start with a free inspection." />
    </>
  );
}
