import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";
import { Check, BLUR } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About DeckStain.ca",
  description: "Meet DeckStain.ca — Southwestern Ontario's deck & fence staining specialists. 8+ years, 500+ projects, READY Seal® oil-based stains and an honest, photo-based quote process.",
};

const values = [
  { t: "Premium materials only", d: "We use READY Seal® oil-based stains exclusively — they outlast and outperform the water-based products most companies default to." },
  { t: "Photo-based quotes", d: "No waiting around for a salesperson. Send photos, get an accurate, itemized quote in 2 business days." },
  { t: "Transparent pricing", d: "The price we quote is the price you pay. No hidden fees, no surprise charges on invoice day." },
  { t: "100% satisfaction", d: "If you're not happy with the finished result, we come back and make it right. No questions asked." },
];

export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="About us" title="Built on quality work and honest pricing."
        intro={`What started as a small ${SITE.baseCity}-area operation now serves ${SITE.stats.cities} cities across ${SITE.region}.`}
        image="/images/hero-about.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <section className="sec bg-white">
        <div className="wrap grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="h text-[1.8rem] text-[var(--ink)] mb-4">Our story</h2>
            <p className="muted leading-relaxed text-[1.05rem] mb-3.5">DeckStain.ca began with a simple idea: give Ontario homeowners a better option for deck care — quality materials, honest pricing, and a process that respects your time.</p>
            <p className="muted leading-relaxed text-[1.05rem] mb-3.5">Over {SITE.stats.years}+ years we&apos;ve completed {SITE.stats.decks} projects, from quick refreshes to full structural restorations. We chose {SITE.stainBrand} oil-based stains because they genuinely last longer and look better than the water-based alternatives most companies use.</p>
            <p className="muted leading-relaxed text-[1.05rem]">Today, our photo-quote process means you never have to schedule an in-person estimate. Send a few photos, get a detailed quote in {SITE.responseTime}, and book when you&apos;re ready. Simple and no-pressure.</p>
          </div>
          <div className="relative aspect-[4/5] rounded-[var(--r-lg)] overflow-hidden shadow-[var(--shadow-lg)]">
            <Image src="/images/cedar-staining.jpg" alt="DeckStain.ca crew applying READY Seal stain to a cedar deck in Ontario" fill className="object-cover" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {[{ v: SITE.stats.decks, l: "Projects completed" }, { v: SITE.stats.years + "+", l: "Years of experience" }, { v: SITE.stats.cities, l: "Cities served" }, { v: "100%", l: "Satisfaction rate" }].map((s) => (
              <div key={s.l} className="card p-5 text-center"><p className="h-xl text-[1.9rem] text-[var(--green)]">{s.v}</p><p className="text-sm muted mt-0.5">{s.l}</p></div>
            ))}
          </div>
          <h2 className="h text-2xl text-[var(--ink)] text-center mb-8">What makes us different</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.t} className="card p-6 flex gap-3.5"><Check className="mt-0.5" /><div><h3 className="font-bold text-[var(--ink)] mb-1" style={{ fontFamily: "var(--font-head)" }}>{v.t}</h3><p className="muted text-sm leading-relaxed">{v.d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
