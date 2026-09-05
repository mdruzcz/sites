import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { CheckIcon } from "@/components/icons";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${site.warrantyYears}-Year Concrete Sealing Warranty | TriCity`,
  description: `TriCity Concrete Sealing backs every project with a written ${site.warrantyYears}-year workmanship warranty. What's covered, what isn't, and how to make a claim across London and SW Ontario.`,
  alternates: { canonical: `${site.url}/warranty` },
};

export default function WarrantyPage() {
  return (
    <>
      <PageHero photo={PICKS.heroWarranty} eyebrow="Our promise" title={<>{site.warrantyYears}-year workmanship warranty, <span className="text-gradient-accent">in writing.</span></>} intro="Every sealing project we complete is covered for five years against defects in our application. Here is exactly what that means." crumbs={[{ label: "Warranty" }]} compact />
      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-6 lg:grid-cols-3">
          <div className="card p-7">
            <p className="eyebrow-pill moss">What&apos;s covered</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              {["Peeling, flaking or delamination of the sealer we applied", "Uneven coverage or visible lap marks caused by our application", "Premature loss of sheen or finish under normal use", "Defects in the sealer materials supplied and applied by TriCity"].map((x) => (
                <li key={x} className="flex items-start gap-3"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--moss)]" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <p className="eyebrow-pill">Not covered</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              {["Damage from heavy equipment, sharp objects or chemical spills outside our maintenance guidance", "Wear from traffic well beyond what was disclosed at the time of quote", "Structural concrete issues such as heaving or cracking unrelated to the sealer", "Surfaces resealed or treated by another party after our application"].map((x) => (
                <li key={x} className="flex items-start gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <p className="eyebrow-pill navy">How to make a claim</p>
            <ol className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              {[`Email ${site.email} with photos and your project date.`, "We respond within 2 business days to schedule an inspection.", "If the issue is within the warranty terms, we re-apply the affected area at no cost.", "Warranty work is completed within 14 days of a confirmed claim."].map((x, i) => (
                <li key={x} className="flex items-start gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--navy)] text-xs font-bold text-white">{i + 1}</span>{x}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="shell pb-16">
          <div className="card grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl">Why we can offer five years</h2>
              <p className="mt-2 text-[var(--ink-soft)]">Because the failure points in sealing are prep and product, and we control both. A fully dry, properly cleaned slab and a high-quality solvent-based sealer that bonds into the previous coat is a combination that does not peel. Read more in <Link href="/resources/solvent-based-vs-water-based-concrete-sealers" className="font-semibold text-[var(--accent-deep)] underline">solvent vs water-based sealers</Link>.</p>
            </div>
            <Link href="/contact" className="btn-accent">Get a free quote</Link>
          </div>
        </div>
      </section>
      <CtaBand />
      <Contact />
    </>
  );
}
