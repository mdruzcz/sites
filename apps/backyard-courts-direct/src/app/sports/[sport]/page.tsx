import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { KitCard } from "@/components/kit-card";
import { PageHero } from "@/components/page-hero";
import { QuoteBand, SectionHead } from "@/components/sections";
import { getSport, kitsFor, sports } from "@/lib/content";
import { JsonLd, faqLd, itemListLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return sports.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const s = getSport((await params).sport);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/sports/${s.slug}` },
    openGraph: { ...ogBase, title: `${s.metaTitle} | ${site.name}`, description: s.metaDescription, url: `/sports/${s.slug}` },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription, images: twitterImages },
  };
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const s = getSport((await params).sport);
  if (!s) notFound();
  const list = kitsFor(s.slug);

  return (
    <>
      <PageHero
        photo={s.photo}
        position={s.photoPosition}
        photoAlt={`${s.name} court surface and lines, ${s.kitLabel.toLowerCase()} shipped across Canada by ${site.name}`}
        eyebrow={`${list.length} kits`}
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
        <SectionHead eyebrow={s.name} title={s.kitLabel} intro="Every size can be adjusted to fit your pad." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((k) => (
            <KitCard key={k.slug} kit={k} />
          ))}
        </div>
      </section>

      <section className="shell grid gap-10 pb-16 md:pb-24 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-block">
          <h2 className="h2 !mt-0">Planning a {s.name.toLowerCase()} court</h2>
          {s.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-[1.0625rem] text-[var(--ink)]/85">
              {p}
            </p>
          ))}
        </div>
        <aside className="card h-fit p-6">
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
        <SectionHead eyebrow="Questions" title={`${s.name} court questions`} action={{ label: "All questions", href: "/faq" }} />
        <FaqList items={s.faqs} />
      </section>

      <QuoteBand />
      <JsonLd data={faqLd(s.faqs)} />
      <JsonLd data={itemListLd(list)} />
    </>
  );
}
