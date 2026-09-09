import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuide, getGuides } from "@/lib/content";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";
import { Sections, FaqList, FaqJsonLd, slugify, linkify } from "@/components/editorial";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "Guide not found" };
  return {
    title: { absolute: g.metaTitle },
    description: g.metaDescription,
    alternates: { canonical: `/resources/${g.slug}` },
    openGraph: { title: g.metaTitle, description: g.metaDescription, type: "article", url: `/resources/${g.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("sea_categories").select("*").in("slug", g.relatedCategories.length ? g.relatedCategories : ["-"]);
  const related = (data ?? []) as Category[];
  const more = getGuides().filter((x) => x.slug !== g.slug).slice(0, 3);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceexcellenceawards.ca";
  const article = { "@context": "https://schema.org", "@type": "Article", headline: g.h1, description: g.metaDescription, datePublished: g.publishedDate, dateModified: g.publishedDate, url: `${base}/resources/${g.slug}`, author: { "@type": "Organization", name: "Service Excellence Awards Canada" }, publisher: { "@type": "Organization", name: "Service Excellence Awards Canada" }, inLanguage: "en-CA" };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Homeowner guides", item: `${base}/resources` }, { "@type": "ListItem", position: 2, name: g.h1 }] };

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16">
        <nav className="text-xs uppercase tracking-[0.22em] text-stone-500" aria-label="Breadcrumb">
          <Link href="/resources" className="hover:text-[var(--gold)]">Homeowner guides</Link><span className="mx-2">/</span><span>{g.category}</span>
        </nav>
        <header className="mt-6 max-w-3xl border-b border-stone-200 pb-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">{g.category} · {g.readMinutes} min read · Updated {new Date(g.publishedDate + "T12:00:00Z").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight">{g.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">{linkify(g.intro)}</p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-3xl">
            <Sections sections={g.sections} />
            {g.checklist?.length > 0 && (
              <section className="mt-12 rounded-lg border border-stone-900 bg-stone-900 p-7 text-stone-100">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-400">Checklist</h2>
                <ul className="mt-4 space-y-2.5">{g.checklist.map((c, i) => <li key={i} className="flex gap-3"><span aria-hidden className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-[var(--gold)]" /><span className="leading-relaxed">{c}</span></li>)}</ul>
              </section>
            )}
            <FaqList faqs={g.faq} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav className="rounded-lg border border-stone-200 p-5" aria-label="On this page">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">On this page</p>
              <ol className="mt-3 space-y-2 text-sm">{g.sections.map((s) => <li key={s.heading}><a href={`#${slugify(s.heading)}`} className="text-stone-700 hover:text-[var(--gold)]">{s.heading}</a></li>)}</ol>
            </nav>
            {related.length > 0 && (
              <div className="rounded-lg border border-stone-200 bg-stone-50/60 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{CURRENT_YEAR} winners for this trade</p>
                <ul className="mt-3 space-y-2 text-sm">{related.map((c) => <li key={c.id}><Link href={`/winners?category=${c.slug}`} className="font-medium text-stone-900 hover:text-[var(--gold)]">{c.name} →</Link></li>)}</ul>
              </div>
            )}
            <div className="rounded-lg border border-stone-200 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Keep reading</p>
              <ul className="mt-3 space-y-3 text-sm">{more.map((m) => <li key={m.slug}><Link href={`/resources/${m.slug}`} className="font-medium text-stone-900 hover:text-[var(--gold)]">{m.h1}</Link></li>)}</ul>
            </div>
          </aside>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <FaqJsonLd faqs={g.faq} />
    </>
  );
}
