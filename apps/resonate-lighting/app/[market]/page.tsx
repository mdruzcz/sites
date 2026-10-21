import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getKits, getMarketBySlug, getMarkets } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, marketServiceSchema } from "@/lib/jsonld";

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
  };
}

const RECOMMENDED: Record<string, string> = { commercial: "starter", bia: "municipal", municipal: "municipal" };

export default async function MarketPage({ params }: Params) {
  const { market } = await params;
  const m = getMarketBySlug(market);
  if (!m) notFound();
  const kits = getKits();
  const recommended = kits.find((k) => k.slug === RECOMMENDED[m.slug]) ?? kits[1];
  const others = getMarkets().filter((x) => x.slug !== m.slug);

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
          <p className="eyebrow">{m.name} · Ontario</p>
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
              Every Resonate installation is built around a Raspberry Pi 5 controller running LedFx with our simplified Light Show app, a USB microphone, and a pixel controller — a SanDevices E682 for live-reactive displays or a Kulp K-series running FPP for sequenced holiday shows — driving 12 V WS2811 props: mega trees, singing trees, strips and rooflines. Buyers get lifetime access to the control software; updates are included. See <Link href="/kits">what&apos;s in each package</Link>.
            </p>
          </div>
          <aside className="space-y-6">
            <div className="card card-glow is-active p-7">
              <p className="eyebrow">Usually a fit</p>
              <h3 className="text-xl font-bold text-white mb-2">{recommended.name}</h3>
              <p className="text-muted-strong text-sm leading-relaxed mb-4">{recommended.summary}</p>
              <Link href={`/contact?kit=${recommended.slug}`} className="btn btn-primary w-full">Request a quote</Link>
              <Link href={`/kits#${recommended.slug}`} className="block text-center text-cool text-sm mt-3 underline underline-offset-2">What&apos;s included</Link>
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
