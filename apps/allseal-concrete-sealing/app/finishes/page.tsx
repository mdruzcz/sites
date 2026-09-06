import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PageHero } from "@/components/PageHero";
import { SheenSection } from "@/components/SheenSection";
import { Photo } from "@/components/Photo";
import { QuoteDock } from "@/components/QuoteDock";
import { FAQ, homeFaqs } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/icons";
import { SHEENS, getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "High Gloss, Semi-Gloss or Matte Concrete Sealer Finishes",
  description: "Compare the three concrete sealer finishes All-Seal offers across Woodstock and Southwestern Ontario: high gloss wet look, semi-gloss satin and natural matte. Same protection, your choice of shine.",
  alternates: { canonical: `${site.url}/finishes` },
};

const ROWS: [string, string, string, string][] = [
  ["Sheen", "Wet look, mirror-like", "Satin", "None, natural"],
  ["Colour enhancement", "Deepest", "Strong", "Subtle"],
  ["Hides dust and tire marks", "Fair", "Good", "Best"],
  ["Slip resistance without additive", "Fair", "Good", "Best"],
  ["Stamped and decorative", "Showcase", "Most requested", "Optional"],
  ["Broom finish, garage, aggregate", "Rarely", "Optional", "Recommended"],
  ["Protection against salt, oil, UV", "Same", "Same", "Same"],
  ["Recoat interval", "2 to 5 years", "2 to 5 years", "2 to 5 years"],
];

export default function FinishesPage() {
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: "Concrete sealer finishes", itemListElement: SHEENS.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `${s.key} finish concrete sealing` })) };
  return (
    <>
      <Script id="finishes-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.gloss} kicker="Finishes" title={<>How much shine <span className="text-[var(--orange)]">do you want?</span></>} intro="Same premium sealer under every option. High gloss for the wet look, semi-gloss for satin, matte for natural. We bring samples to the free inspection so you can see all three on your own slab." crumbs={[{ label: "Finishes" }]} />
      <SheenSection />
      <section className="bg-white">
        <div className="shell section">
          <p className="kicker">Side by side</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead><tr className="font-display border-b-2 border-[var(--graphite)] text-left text-base uppercase tracking-wider"><th className="py-3 pr-4"> </th><th className="py-3 pr-4">High Gloss</th><th className="py-3 pr-4 text-[var(--orange-deep)]">Semi-Gloss</th><th className="py-3">Matte</th></tr></thead>
              <tbody>{ROWS.map(([l, a, b, c]) => <tr key={l} className="border-b border-[var(--line)]"><td className="py-3 pr-4 font-semibold">{l}</td><td className="py-3 pr-4 text-[var(--ink-soft)]">{a}</td><td className="py-3 pr-4 text-[var(--ink-soft)]">{b}</td><td className="py-3 text-[var(--ink-soft)]">{c}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {getServices().map((s) => <Link key={s.slug} href={`/services/${s.slug}`} className="card card-lift group p-5"><p className="kicker">{s.recommendedSheen}</p><h3 className="font-display mt-2 text-2xl group-hover:text-[var(--orange-deep)]">{s.title}</h3><p className="mt-2 text-sm text-[var(--ink-soft)]">{s.sheenWhy}</p></Link>)}
          </div>
        </div>
      </section>
      <section className="bg-[var(--fog)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="kicker">Anti-slip additive</p>
            <h2 className="font-display h2-fluid mt-4">Any sheen, more grip.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">A fine, clear grit mixed into the sealer gives wet concrete traction without changing the look. Standard around pools and on steps, optional anywhere else.</p>
            <ul className="mt-6 space-y-2">{["Pool decks and hot tub surrounds", "Front steps and porches", "Sloped walkways and driveways", "Garage aprons that see snowmelt"].map((x) => <li key={x} className="flex items-start gap-2.5 text-[var(--ink-soft)]"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{x}</li>)}</ul>
            <Link href="/resources/anti-slip-additives-for-sealed-concrete-steps-pools-and-walkways" className="btn-outline mt-6">Read the anti-slip guide</Link>
          </div>
          <div className="grid grid-cols-2 gap-3"><Photo name={PICKS.pool} ratio="aspect-[4/5]" rounded="rounded-lg" sizes="300px" /><Photo name={PICKS.steps} ratio="aspect-[4/5]" rounded="rounded-lg" className="mt-8" sizes="300px" /></div>
        </div>
      </section>
      <QuoteDock heading="See all three finishes on your own concrete." />
      <FAQ faqs={homeFaqs.slice(1, 5)} title="Finish questions" />
      <CtaBand />
    </>
  );
}
