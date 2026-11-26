import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { KitCard } from "@/components/kit-card";
import { PageHero } from "@/components/page-hero";
import { GuideCards, PriceTable, QuoteBand, SectionHead } from "@/components/sections";
import { getSport, guidesFor, kitsFor, lowestPrice, money, sports } from "@/lib/content";
import { JsonLd, aggregateOfferLd, faqLd, itemListLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { fill, site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return sports.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const s = getSport((await params).sport);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/sports/${s.slug}` });
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const s = getSport((await params).sport);
  if (!s) notFound();
  const list = kitsFor(s.slug);
  const related = guidesFor(s.slug);
  const from = money(lowestPrice(list));
  const faqs = [
    { q: `How much does a ${s.name.toLowerCase()} court kit cost?`, a: `${s.kitLabel} start at ${from} CAD and run to ${money(Math.max(...list.map((k) => k.price)))} for the largest size. Prices are for the tile kit with game lines and edging. Freight and sales tax are added on your quote.` },
    ...s.faqs,
  ];

  return (
    <>
      <PageHero
        photo={s.photo}
        position={s.photoPosition}
        photoAlt={`${s.name} court surface and lines, ${s.kitLabel.toLowerCase()} shipped across Canada by ${site.name}`}
        eyebrow={`${list.length} kits from ${from}`}
        title={s.h1}
        intro={s.intro}
        crumb={s.name}
        trail={[{ label: "Court kits", href: "/court-kits" }]}
        path={`/sports/${s.slug}`}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#kits" className="btn btn-cta">
            See the kits <span aria-hidden>↓</span>
          </a>
          <Link href={`/contact?sport=${encodeURIComponent(s.name)}#quote`} className="btn btn-ghost">
            Get a delivered price
          </Link>
        </div>
      </PageHero>

      <section id="kits" className="shell section scroll-mt-28">
        <SectionHead eyebrow={s.name} title={s.kitLabel} intro="Every size can be adjusted to fit your pad. Prices are for the kit, before freight and tax." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((k) => (
            <KitCard key={k.slug} kit={k} />
          ))}
        </div>
      </section>

      <section className="shell grid gap-10 pb-16 md:pb-24 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-block reveal">
          <h2 className="h2 !mt-0">{fill(site.pages.sport.bodyHeading, { sport: s.name.toLowerCase() })}</h2>
          {s.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-[1.0625rem] text-[var(--ink)]/85">
              {p}
            </p>
          ))}
        </div>
        <aside className="card reveal h-fit p-6">
          <h2 className="h3">{s.name} court dimensions</h2>
          <dl className="mt-3 divide-y divide-[var(--line)]">
            {s.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="font-bold">{f.label}</dt>
                <dd className="text-right text-[var(--muted)]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Prices" title={`${s.name} kit prices`} />
        <PriceTable list={list} />
      </section>

      {related.length > 0 && (
        <section className="shell pb-16 md:pb-24">
          <SectionHead eyebrow="Guides" title={`${s.name} court guides`} action={{ label: "All guides", href: "/guides" }} />
          <GuideCards list={related} />
        </section>
      )}

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Questions" title={`${s.name} court questions`} action={{ label: "All questions", href: "/faq" }} />
        <FaqList items={faqs} />
      </section>

      <QuoteBand />
      <JsonLd data={faqLd(faqs)} />
      <JsonLd data={itemListLd(list)} />
      <JsonLd data={aggregateOfferLd(s.kitLabel, `/sports/${s.slug}`, list)} />
    </>
  );
}
