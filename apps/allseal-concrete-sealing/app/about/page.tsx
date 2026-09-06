import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { WhyAllSeal } from "@/components/WhyAllSeal";
import { QuoteDock } from "@/components/QuoteDock";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About All-Seal Concrete Sealing, Woodstock, Ontario",
  description: "All-Seal is a Woodstock, Ontario concrete sealing company with 10+ years, 37 driveways, 56 patios and 96 happy customers across Southwestern Ontario. Premium sealers, free inspections.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero photo={PICKS.about} photoAlt="All-Seal technician back-rolling sealer onto stamped concrete" kicker="About" title={<>Protect. Preserve. <span className="text-[var(--orange)]">Seal.</span></>} intro="A Woodstock crew that does one thing: keeps concrete looking new and standing up to Ontario winters." crumbs={[{ label: "About" }]} />
      <section className="bg-white">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[66ch]">
            <h2>Why sealing only</h2>
            <p>Most contractors seal concrete as an add-on. All-Seal was built the other way around. Ten-plus years in, sealing is still the entire business, which is why prep gets the time it needs, why we carry premium acrylic, polyurethane and penetrating products rather than one bargain sealer for everything, and why we bring sheen samples to every inspection.</p>
            <h2>How a job runs</h2>
            <p>A free on-site inspection first: surface type, old coatings, cracks, drainage. Then a written quote and a finish recommendation. On the day, pressure washing and repairs, a full dry, then sealer applied evenly with anti-slip additive wherever grip matters. Foot traffic the next day, vehicles after 48 to 72 hours, and two to five years before a light recoat.</p>
            <h2>Where we work</h2>
            <p>Woodstock is home. From there the crew covers St. Thomas, Brantford, Hamilton, Kitchener-Waterloo and Cambridge, and further for larger jobs. {site.stats.driveways} driveways, {site.stats.patios} patios and {site.stats.happyCustomers} happy customers so far.</p>
          </article>
          <div className="grid grid-cols-2 gap-3">
            <Photo name={PICKS.process1} ratio="aspect-[4/5]" rounded="rounded-lg" sizes="300px" />
            <Photo name={PICKS.gloss} ratio="aspect-[4/5]" rounded="rounded-lg" className="mt-8" sizes="300px" />
            <Photo name={PICKS.stamped} ratio="aspect-[4/5]" rounded="rounded-lg" className="-mt-8" sizes="300px" />
            <Photo name={PICKS.process3} ratio="aspect-[4/5]" rounded="rounded-lg" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-[var(--graphite)] text-white">
        <div className="shell grid gap-8 py-16 sm:grid-cols-3">
          {[[site.stats.driveways, "driveways sealed"], [site.stats.patios, "patios sealed"], [site.stats.happyCustomers, "happy customers"]].map(([n, l]) => <div key={String(l)}><p className="stat">{n}+</p><p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/60">{l}</p></div>)}
        </div>
      </section>
      <WhyAllSeal />
      <div className="shell pb-16"><div className="flex flex-wrap gap-3"><Link href="/services" className="btn-orange">See our services</Link><Link href="/gallery" className="btn-outline">Before &amp; after</Link></div></div>
      <QuoteDock />
      <CtaBand />
    </>
  );
}
