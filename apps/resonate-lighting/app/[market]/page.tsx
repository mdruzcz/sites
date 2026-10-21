import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getKits, getMarketBySlug, getMarkets } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, marketServiceSchema } from "@/lib/jsonld";
import { getCities } from "@/lib/content";
import { formatCad, pricing } from "@/lib/pricing";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { MediaSlot } from "@/components/MediaSlot";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getMarkets().map((m) => ({ market: m.slug }));
}

type Params = { params: Promise<{ market: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { market } = await params;
  const m = getMarketBySlug(market);
  if (!m) return { title: "Not found" };
  return {
    title: m.title,
    description: m.metaDescription,
    alternates: { canonical: `${site.url}/${m.slug}` },
    openGraph: { title: `${m.title} | ${site.name}`, description: m.metaDescription, url: `${site.url}/${m.slug}` },
    twitter: { title: `${m.title} | ${site.name}`, description: m.metaDescription },
  };
}

export default async function MarketPage({ params }: Params) {
  const { market } = await params;
  const m = getMarketBySlug(market);
  if (!m) notFound();
  const kits = getKits();
  const recommended = kits.find((k) => k.slug === m.recommend) ?? kits[1];
  const others = getMarkets().filter((x) => x.slug !== m.slug);
  const cities = getCities();

  return (
    <>
      <JsonLd data={marketServiceSchema(m.name, m.metaDescription, m.slug)} />
      <JsonLd data={faqSchema(m.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: m.name, url: `${site.url}/${m.slug}` },
        ])}
      />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">{m.name} · Canada</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">{m.h1}</h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed mb-6">{m.intro}</p>
          <div className="flex flex-wrap gap-2">
            {m.audiences.map((a) => (
              <span key={a} className="spec-chip spec-chip-cool normal-case tracking-normal">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-rl">
            {m.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
            <h2>What the kit is</h2>
            <p>
              Every Resonate installation is built around the same control system: a Raspberry Pi 5 Light Show engine running LedFx and our Light Show app, a USB microphone and a pixel controller, driving 12 V WS2811 props such as mega trees, rooflines, wrapped trees, evergreen spirals and arches. Buyers get lifetime access to the software that powers it, with updates included. See <Link href="/kits">what&apos;s in each kit</Link> and <Link href="/how-it-works">how it works</Link>.
            </p>
            <h2>Installation anywhere in Canada</h2>
            <p>
              Our crews install in any city with applicable travel charges, billed at {formatCad(pricing.installation.crewDayRate)} per crew-day plus travel by zone from {pricing.travel.homeRegion}. Local notes for {cities.slice(0, 6).map((c) => c.name).join(", ")} and more are on our <Link href="/locations">locations page</Link>.
            </p>
          </div>
          <aside className="space-y-6">
            <div className="card card-glow is-active p-7">
              <p className="eyebrow">Usually a fit</p>
              <h3 className="text-xl font-bold text-white mb-1">{recommended.name}</h3>
              <p className="text-sm text-muted mb-3">
                {recommended.pkg.priceLabel} <span className="text-white font-semibold">{formatCad(recommended.pkg.price)}</span> CAD, {pricing.taxNote}
              </p>
              <p className="text-muted-strong text-sm leading-relaxed mb-4">{recommended.summary}</p>
              <Link href={`/contact?kit=${recommended.slug}#quote`} className="btn btn-primary w-full">Request a quote</Link>
              <Link href={`/kits#${recommended.slug}`} className="block text-center text-cool text-sm mt-3 underline underline-offset-2">What&apos;s included</Link>
            </div>
            <div className="card overflow-hidden">
              <MediaSlot id={`kit-${recommended.slug}`} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
            <div className="card p-7">
              <h3 className="font-bold text-white mb-3">Also serving</h3>
              <ul className="space-y-2 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/${o.slug}`} className="text-muted-strong hover:text-resonant transition-colors">{o.name} →</Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="text-muted-strong hover:text-resonant transition-colors">Installation &amp; services →</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center block">Budget planner</p>
          <h2 className="h-display text-3xl sm:text-4xl text-white text-center mb-10">Plan a display and see it built</h2>
          <BudgetPlanner />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center block">FAQ</p>
          <h2 className="h-display text-3xl sm:text-4xl text-white text-center mb-10">{m.name}: common questions</h2>
          <FaqAccordion faqs={m.faqs} />
        </div>
      </section>

      <CtaBand kit={recommended.slug} />
    </>
  );
}
