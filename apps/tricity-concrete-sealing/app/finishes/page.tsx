import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { FAQ } from "@/components/FAQ";
import { CheckIcon } from "@/components/icons";
import { FINISHES } from "@/lib/finishes";
import { finishFaqs } from "@/lib/faqs";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Matte, Semi-Gloss & Gloss Concrete Sealer Finishes",
  description: "Compare the three concrete sealer finishes TriCity offers across London and SW Ontario: matte, semi-gloss and gloss. All use high-quality solvent-based sealers; only the sheen changes.",
  alternates: { canonical: `${site.url}/finishes` },
};

const ROWS: [string, string, string, string][] = [
  ["Sheen", "None, natural", "Satin", "Wet look, mirror-like"],
  ["Colour enhancement", "Subtle", "Strong", "Deepest"],
  ["Hides dust and footprints", "Best", "Good", "Fair"],
  ["Hides surface imperfections", "Best", "Good", "Fair"],
  ["Slip resistance (no additive)", "Best", "Good", "Fair; additive recommended"],
  ["Broom finish and exposed aggregate", "Recommended", "Optional", "Rarely"],
  ["Stamped and coloured concrete", "Optional", "Most popular", "Showcase"],
  ["Protection against salt, oil and UV", "Same", "Same", "Same"],
  ["Reseal interval", "2 to 4 years", "2 to 4 years", "2 to 4 years"],
];

export default function FinishesPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Concrete sealer finishes",
    itemListElement: FINISHES.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: `${f.name} finish`, url: `${site.url}/finishes/${f.slug}` })),
  };
  return (
    <>
      <Script id="finishes-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.heroFinishes} eyebrow="Finishes" title="Matte, semi-gloss or gloss. Pick your sheen." intro="Every TriCity job uses a high-quality solvent-based sealer. The only choice you make is how much shine you want, and we bring samples to the site assessment so you can see all three on your own concrete." crumbs={[{ label: "Finishes" }]} />

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-6 md:grid-cols-3">
          {FINISHES.map((f) => (
            <Link key={f.slug} href={`/finishes/${f.slug}`} className="card card-lift group overflow-hidden">
              <div className="relative">
                <Photo name={f.photo} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 380px" />
                {f.slug === "gloss" && <div className="sheen" aria-hidden />}
                <span className={`swatch ${f.swatch} absolute bottom-3 left-3 size-14 border-2 border-white shadow-md`} aria-hidden />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{f.sheen}</p>
                <h2 className="font-display mt-1 text-2xl group-hover:text-[var(--accent-deep)]">{f.name}</h2>
                <p className="mt-1 font-semibold">{f.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{f.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bestFor.slice(0, 3).map((b) => <li key={b} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--moss)]" />{b}</li>)}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill navy">Side by side</p><h2 className="font-display h2-fluid mt-4">Same sealer. Three looks.</h2></div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] overflow-hidden rounded-2xl border border-[var(--line)] bg-white text-sm">
              <thead className="bg-[var(--stone)] text-left text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                <tr><th className="px-5 py-3"> </th><th className="px-5 py-3 text-[var(--ink)]">Matte</th><th className="px-5 py-3 text-[var(--accent-deep)]">Semi-Gloss</th><th className="px-5 py-3 text-[var(--ink)]">Gloss</th></tr>
              </thead>
              <tbody>
                {ROWS.map(([label, m, s, g]) => (
                  <tr key={label} className="border-t border-[var(--line)]"><td className="px-5 py-3 font-semibold">{label}</td><td className="px-5 py-3 text-[var(--ink-soft)]">{m}</td><td className="px-5 py-3 text-[var(--ink-soft)]">{s}</td><td className="px-5 py-3 text-[var(--ink-soft)]">{g}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow-pill">Why solvent-based</p>
            <h2 className="font-display h2-fluid mt-4">The sealer underneath every finish.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">We only use high-quality solvent-based acrylic sealers. They cost more than water-based products and they are worth it in Ontario.</p>
            <ul className="mt-6 space-y-3">
              {["Penetrates deeper into the concrete for a stronger bond", "Enhances colour more, especially on stamped and coloured concrete", "Re-emulsifies the previous solvent-based coat so reseals bond seamlessly with no peeling layers", "Better resistance to road salt, UV and hot tires", "Breathable, so moisture in the slab can escape instead of clouding the finish"].map((x) => (
                <li key={x} className="flex items-start gap-3 text-[var(--ink-soft)]"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--navy)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span>{x}</li>
              ))}
            </ul>
            <Link href="/resources/solvent-based-vs-water-based-concrete-sealers" className="btn-outline mt-6">Read: solvent vs water-based</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.process3} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.gloss} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
          </div>
        </div>
      </section>

      <CtaBand heading="See all three on your own concrete." sub="We bring finish samples to every free site assessment." />
      <FAQ faqs={[...finishFaqs, ...FINISHES.flatMap((f) => f.faqs.slice(0, 1))]} title="Finish questions" />
      <Contact />
    </>
  );
}
