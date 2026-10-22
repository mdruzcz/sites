import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getGuides, getGuideBySlug, getPhoto, getPhotos } from "@/lib/content";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList } from "@/components/ui";
import { AiPreviewButton } from "@/components/AiPreviewProvider";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.metaTitle} | ${site.name}` },
    description: g.metaDescription,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { type: "article", title: g.title, description: g.metaDescription, url: `${site.url}/guides/${slug}`, publishedTime: g.publishedAt, images: [{ url: "/images/gallery/daytime-colour-matched-permanent-light-track-in-white-soffit.jpg", alt: g.title }] },
    twitter: { card: "summary_large_image", title: g.metaTitle, description: g.metaDescription },
  };
}

const PHOTO_FOR: Record<string, string> = {
  "are-permanent-lights-visible-during-the-day": "daytime-colour-matched-permanent-light-track-in-white-soffit",
  "soffit-fascia-compatibility-guide": "teal-permanent-soffit-lights-close-up-grey-siding",
  "c9-christmas-light-installation-guide": "red-green-white-permanent-roofline-lights-stone-home-steep-gables",
  "commercial-permanent-lighting-for-business": "purple-and-teal-permanent-roofline-lights-commercial-building",
  "best-colours-and-scenes-for-every-holiday": "rainbow-gradient-permanent-roofline-lights-dark-siding-bungalow",
  "permanent-lighting-home-value-curb-appeal": "cool-white-permanent-roofline-lights-stone-home-wraparound-porch",
  "permanent-lighting-ontario-winters": "warm-white-permanent-roofline-lights-dark-siding-bungalow",
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) notFound();
  const all = getPhotos();
  const photo = PHOTO_FOR[slug] ? getPhoto(PHOTO_FOR[slug]) : all[(slug.length * 7) % all.length];
  const related = g.related.map(getGuideBySlug).filter(Boolean);
  const url = `${site.url}/guides/${slug}`;
  return (
    <>
      <JsonLd data={[articleSchema({ title: g.title, description: g.metaDescription, image: photo.src, date: g.publishedAt, url }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Guides", url: `${site.url}/guides` }, { name: g.title, url }]), faqSchema(g.faqs)]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap max-w-5xl">
          <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: g.title }]} />
          <div className="mt-6">
            <span className="pill mb-4">{g.category} · {g.readingMinutes} min read</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-ink text-balance">{g.title}</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{g.summary}</p>
            <p className="mt-3 text-xs text-[var(--muted)]">Published {new Date(g.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })} · By the Celebrate Lighting team, Woodstock ON</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-5xl grid lg:grid-cols-[1fr_300px] gap-10">
          <article>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[var(--border)] mb-8"><Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 100vw, 800px" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" /></div>
            <div className="card card-static p-6 mb-8">
              <h2 className="font-bold text-ink mb-3">Key takeaways</h2>
              <ul className="space-y-2">{g.keyTakeaways.map((k) => <li key={k} className="flex gap-3 text-sm text-body"><Icon.Check width={16} height={16} className="text-[var(--accent-ink)] shrink-0 mt-0.5" />{k}</li>)}</ul>
            </div>
            <div className="prose-dark">
              {g.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                  {s.table && (
                    <div className="overflow-x-auto"><table><thead><tr>{s.table.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead><tbody>{s.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>
                  )}
                </section>
              ))}
              <h2>Frequently asked questions</h2>
            </div>
            <FaqList items={g.faqs} name="guide-faq" />
            <div className="card card-static p-6 md:p-8 mt-10" style={{ background: "linear-gradient(135deg, var(--panel), var(--surface-2))" }}>
              <h2 className="font-display text-2xl text-ink">{g.cta.heading}</h2>
              <p className="mt-2 text-[var(--muted)]">{g.cta.body}</p>
              <div className="mt-5 flex flex-wrap gap-3"><Link href={g.cta.href} className="btn btn-primary">{g.cta.label} <Icon.Arrow width={16} height={16} /></Link><AiPreviewButton /></div>
            </div>
          </article>
          <aside className="space-y-4 lg:sticky lg:top-40 self-start">
            <div className="card card-static p-5">
              <h3 className="font-bold text-ink mb-2">In this guide</h3>
              <ol className="text-sm space-y-1.5">{g.sections.map((s) => <li key={s.heading} className="text-body">{s.heading}</li>)}</ol>
            </div>
            <div className="card card-static p-5">
              <h3 className="font-bold text-ink mb-2">Related guides</h3>
              <ul className="text-sm space-y-2">{related.map((r) => r && <li key={r.slug}><Link href={`/guides/${r.slug}`} className="text-[var(--accent-ink)] hover:underline">{r.title}</Link></li>)}</ul>
            </div>
            <div className="card card-static p-5 text-sm text-[var(--muted)]">
              <p className="font-bold text-ink mb-1">Talk to a human</p>
              <p>Send the form <Link href="/contact" className="text-[var(--accent-ink)]">book a free demo</Link>.</p>
            </div>
          </aside>
        </div>
      </section>
      <BookCta />
    </>
  );
}
