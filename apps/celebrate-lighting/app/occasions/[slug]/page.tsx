import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getOccasions, getOccasionBySlug, getPhoto } from "@/lib/content";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHeading } from "@/components/ui";
import { AiPreviewButton } from "@/components/AiPreviewProvider";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getOccasions().map((o) => ({ slug: o.slug }));
}

const PHOTO_FOR: Record<string, string> = {
  christmas: "red-green-white-permanent-roofline-lights-stone-home-steep-gables",
  halloween: "purple-permanent-roofline-lights-stucco-gable-covered-patio",
  "canada-day": "red-white-green-permanent-christmas-roofline-lights-blue-two-storey",
  "valentines-day": "pink-and-purple-permanent-roofline-lights-stucco-ranch",
  "st-patricks-day": "rainbow-permanent-roofline-lights-commercial-brick-building",
  easter: "rainbow-permanent-roofline-lights-brick-home-garage-gable",
  diwali: "rainbow-gradient-permanent-roofline-lights-dark-siding-bungalow",
  "pride-month": "rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home",
  "remembrance-day": "warm-white-permanent-roofline-lights-dark-siding-bungalow",
  "game-day": "purple-and-blue-permanent-roofline-lights-dark-siding-bungalow",
  "thanksgiving-fall": "warm-white-permanent-roofline-lights-brick-home-garage-gable",
  "new-years-eve": "cool-white-permanent-roofline-lights-stone-home-wraparound-porch",
  "birthdays-and-parties": "multicolour-permanent-roofline-lights-stone-and-timber-porch-close-up",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = getOccasionBySlug(slug);
  if (!o) return {};
  return {
    title: { absolute: o.metaTitle.includes(site.name) ? o.metaTitle : `${o.metaTitle} | ${site.name}` },
    description: o.metaDescription,
    alternates: { canonical: `/occasions/${slug}` },
    openGraph: { title: o.metaTitle, description: o.metaDescription, url: `${site.url}/occasions/${slug}`, images: [{ url: getPhoto(PHOTO_FOR[slug] ?? "rainbow").src, alt: o.heading }] },
    twitter: { card: "summary_large_image", title: o.metaTitle, description: o.metaDescription },
  };
}

export default async function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = getOccasionBySlug(slug);
  if (!o) notFound();
  const photo = getPhoto(PHOTO_FOR[slug] ?? "rainbow");
  const others = getOccasions().filter((x) => x.slug !== slug);
  const url = `${site.url}/occasions/${slug}`;
  return (
    <>
      <JsonLd data={[articleSchema({ title: o.heading, description: o.metaDescription, image: photo.src, date: "2026-10-07", url }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Occasions", url: `${site.url}/occasions` }, { name: o.name, url }]), faqSchema(o.faq)]} />
      <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0"><Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" /><div className="absolute inset-0 night-veil" /></div>
        <div className="wrap relative py-14 md:py-20">
          <Breadcrumbs items={[{ name: "Occasions", href: "/occasions" }, { name: o.name }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">{o.eyebrow} · {o.season}</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.05] text-ink text-balance">{o.heading}</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{o.intro}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3"><Link href="/contact" className="btn btn-primary btn-lg">{site.demo.ctaLong} <Icon.Arrow width={18} height={18} /></Link><AiPreviewButton className="btn btn-ghost-white btn-lg" /></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Colour recipes" title={`${o.name} Colour Recipes`} sub="Copy these into the app, or ask us to pre-load them at install." align="left" />
          <div className="grid md:grid-cols-3 gap-4">
            {o.colourRecipes.map((r) => (
              <div key={r.name} className="card card-static p-6">
                <div className="flex gap-2 mb-4">{r.colours.map((c) => <span key={c} className="w-10 h-10 rounded-full border border-white/20" style={{ background: c, boxShadow: `0 0 18px ${c}66` }} title={c} aria-label={`Colour ${c}`} />)}</div>
                <h3 className="font-bold text-ink">{r.name}</h3>
                <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{r.description}</p>
                <p className="mt-3 text-[11px] font-mono text-body">{r.colours.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="prose-dark">
            <h2 className="!mt-0">Why {o.name.toLowerCase()} is better with permanent lighting</h2>
            {o.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <aside className="space-y-4">
            <div className="card card-static p-6">
              <h3 className="font-bold text-ink mb-3">Scene ideas</h3>
              <ul className="space-y-3">{o.scenes.map((s) => <li key={s.name}><p className="font-semibold text-body text-sm">{s.name}</p><p className="text-sm text-[var(--muted)]">{s.description}</p></li>)}</ul>
            </div>
            <div className="card card-static p-6">
              <h3 className="font-bold text-ink mb-3">Tips</h3>
              <ul className="space-y-2">{o.tips.map((t) => <li key={t} className="flex gap-2 text-sm text-body"><Icon.Check width={16} height={16} className="text-[var(--accent-ink)] shrink-0 mt-0.5" />{t}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10"><div><span className="pill mb-4">FAQ</span><h2 className="font-display text-3xl text-ink leading-tight">{o.name} questions</h2></div><FaqList items={o.faq} name="occ-faq" /></div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap"><SectionHeading eyebrow="More occasions" title="The Same Roofline, All Year" align="left" /><div className="flex flex-wrap gap-2">{others.map((x) => <Link key={x.slug} href={`/occasions/${x.slug}`} className="chip">{x.name}</Link>)}</div></div>
      </section>
      <BookCta />
    </>
  );
}
