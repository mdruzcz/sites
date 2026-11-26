import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { KitCard } from "@/components/kit-card";
import { PageHero } from "@/components/page-hero";
import { GuideCards, QuoteBand, SectionHead } from "@/components/sections";
import { getGuide, getKit, getSport, guides, type Kit } from "@/lib/content";
import { JsonLd, articleLd, faqLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

/** Date the guides were last reviewed. Update when the content or prices change. */
const REVIEWED = "2026-11-26";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.metaDescription, path: `/guides/${g.slug}`, type: "article" });
}

const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const sport = getSport(g.relatedSport);
  const relatedKits = g.relatedKits.map(getKit).filter((k): k is Kit => Boolean(k));
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <PageHero photo={g.photo} photoAlt={`${g.h1}, a planning guide from ${site.name}`} eyebrow="Guide" title={g.h1} intro={g.intro} crumb={g.title} trail={[{ label: "Guides", href: "/guides" }]} path={`/guides/${g.slug}`} />

      <article className="shell section grid gap-10 lg:grid-cols-[1fr_17rem]">
        <div className="min-w-0">
          <div className="card border-l-4 border-[var(--accent)] p-5 md:p-6">
            <p className="eyebrow">The short answer</p>
            <p className="mt-2 text-[1.0625rem] font-bold leading-relaxed">{g.answer}</p>
          </div>

          <div className="prose-block mt-8">
            {g.sections.map((s) => (
              <section key={s.h2} id={anchor(s.h2)} className="scroll-mt-32">
                <h2>{s.h2}</h2>
                {s.paragraphs.map((t) => (
                  <p key={t.slice(0, 28)} className="text-[1.0625rem] text-[var(--ink)]/85">
                    {t}
                  </p>
                ))}
                {s.list && (
                  <ul className="text-[1.0625rem] text-[var(--ink)]/85">
                    {s.list.map((li) => (
                      <li key={li.slice(0, 28)}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="card mt-4 overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {s.table.head.map((h) => (
                            <th key={h} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r.join("|")}>
                            {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--muted)]">Reviewed November 2026. Kit prices are in Canadian dollars before freight and tax and are confirmed on your quote.</p>
        </div>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="card sticky top-32 p-5">
            <p className="eyebrow">On this page</p>
            <ul className="mt-2">
              {g.sections.map((s) => (
                <li key={s.h2}>
                  <a href={`#${anchor(s.h2)}`} className="flex min-h-[36px] items-center text-sm font-bold text-[var(--muted)] hover:text-[var(--accent-ink)]">
                    {s.h2}
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/contact#quote" className="btn btn-accent mt-4 w-full">
              Get a quote
            </Link>
          </nav>
        </aside>
      </article>

      {relatedKits.length > 0 && (
        <section className="shell pb-16 md:pb-24">
          <SectionHead eyebrow="Court kits" title="Kits mentioned in this guide" action={sport ? { label: `All ${sport.name.toLowerCase()} kits`, href: `/sports/${sport.slug}` } : undefined} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedKits.map((k) => (
              <KitCard key={k.slug} kit={k} />
            ))}
          </div>
        </section>
      )}

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Questions" title="Quick answers" />
        <FaqList items={g.faqs} />
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Guides" title="Keep reading" action={{ label: "All guides", href: "/guides" }} />
        <GuideCards list={more} />
      </section>

      <QuoteBand />
      <JsonLd data={articleLd(g, REVIEWED)} />
      <JsonLd data={faqLd(g.faqs)} />
    </>
  );
}
