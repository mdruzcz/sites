import type { Metadata } from "next";
import { FINISHES } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";
import { Check } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Stain Finishes — 8 READY Seal® Colors",
  description: "Choose from 8 READY Seal® oil-based stain colors — Natural Cedar, Pecan, Dark Walnut, Mahogany and more. Find the perfect finish for your deck or fence.",
};

export default function FinishesPage() {
  return (
    <>
      <PageHead eyebrow="Stain finishes" title="Find the perfect color for your deck."
        intro={`We finish every project with ${SITE.stainBrand} premium oil-based stain. Eight rich colors, each penetrating and self-leveling for a streak-free result.`}
        image="/images/hero-finishes.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Finishes", href: "/finishes" }]} />

      <section className="sec bg-white">
        <div className="wrap">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {FINISHES.map((f) => (
              <div key={f.name} className="card card-hover overflow-hidden">
                <div className="aspect-square" style={{ background: f.hex }} />
                <div className="p-4"><p className="font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{f.name}</p><p className="text-sm text-[var(--ink-3)] mt-0.5">{f.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow eyebrow-wood mb-2">Why READY Seal®</p>
            <h2 className="h text-[1.8rem] text-[var(--ink)] mb-3">The pro-grade stain that just works.</h2>
            <p className="muted text-[1.05rem] mb-5 leading-relaxed">READY Seal® is a combined stain and sealer that penetrates deep into the wood instead of coating the surface — so it never peels, flakes, or leaves lap marks.</p>
            <ul className="space-y-2.5">
              {["No peeling — bonds at the cellular level", "No lap marks — self-leveling formula", "No primer or back-brushing needed", "Lasts 2–3× longer than water-based stains"].map((t) => (
                <li key={t} className="flex items-start gap-2.5 muted"><Check /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="h text-xl text-[var(--ink)] mb-3">Not sure which color?</h3>
            <p className="muted leading-relaxed mb-3">Tell us about your home and what you&apos;re going for when you request a quote. We&apos;ll recommend the best match from our eight colors — and bring sample boards so you can see them in your own light before we commit.</p>
            <p className="muted leading-relaxed">Lighter homes tend to suit Natural Cedar or Light Oak; modern or darker exteriors look striking in Dark Walnut or Mission Brown.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
