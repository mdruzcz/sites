import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { AwardBadge } from "@/components/award-badge";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About TriCity Concrete Sealing, London, Ontario",
  description: "TriCity Concrete Sealing is a London, Ontario company with 8+ years and 500+ projects sealing driveways, patios and stamped concrete across SW Ontario with solvent-based sealers and a 5-year warranty.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero photo={PICKS.heroAbout} photoAlt="TriCity technician back-rolling solvent-based sealer onto stamped concrete" eyebrow="About us" title="Concrete sealing is all we do, and we do it properly." intro="A London, Ontario crew with eight-plus years, five hundred-plus projects and a written five-year warranty on every one of them." crumbs={[{ label: "About" }]} compact />
      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[66ch]">
            <h2>Why we only seal</h2>
            <p>Plenty of contractors will seal your driveway as an add-on. We do the opposite: sealing is the whole business. That focus is why we spray and back-roll instead of rolling alone, why we insist on a fully dry slab, and why we only carry high-quality solvent-based sealers rather than whatever is cheapest that week.</p>
            <h2>Solvent-based, three finishes</h2>
            <p>Every job gets a solvent-based acrylic sealer. It penetrates deeper, enhances colour more, and re-emulsifies the previous coat at reseal time so there is never a peeling layer between coats. You choose the sheen: matte for a natural look, semi-gloss for a satin finish that shows off stamped and coloured concrete, or gloss for the full wet look.</p>
            <h2>How we work</h2>
            <p>Free site assessment with finish samples in hand. A written quote by the square foot with prep and any non-slip additive itemized. Fully insured crew. Clear cure windows so you know when to walk and when to park. And a {site.warrantyYears}-year workmanship warranty that we actually honour: if our application peels, flakes or looks uneven, we fix it at no charge.</p>
            <div className="not-prose mt-6"><AwardBadge /></div>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.process1} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.gloss} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name={PICKS.heroStamped} ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name={PICKS.process3} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="shell section grid gap-5 md:grid-cols-4">
          {[[`${site.stats.projectsCompleted}+`, "projects sealed across SW Ontario"], [`${site.yearsExperience}+`, "years sealing concrete"], [`${site.warrantyYears}-year`, "written workmanship warranty"], [site.googleRating, "Google rating"]].map(([n, l]) => (
            <div key={l} className="card p-6 text-center"><p className="font-display text-4xl text-[var(--accent)]">{n}</p><p className="mt-2 text-sm text-[var(--ink-soft)]">{l}</p></div>
          ))}
        </div>
        <div className="shell pb-16"><div className="flex flex-wrap gap-3"><Link href="/services" className="btn-accent">See our services</Link><Link href="/finishes" className="btn-outline">Compare finishes</Link><Link href="/gallery" className="btn-outline">Before &amp; after</Link></div></div>
      </section>
      <CtaBand />
      <Contact />
    </>
  );
}
