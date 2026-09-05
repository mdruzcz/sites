import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const reasons = [
  { icon: "🧪", title: "Solvent-based, not water-based", body: "Our sealers penetrate deeper, enhance colour more and re-emulsify the previous coat at reseal time, so there is never a peeling layer between coats." },
  { icon: "🎚️", title: "Three finishes", body: "Matte, semi-gloss or gloss, chosen on site with samples in hand. Same protection in every case." },
  { icon: "🧽", title: "Prep is the job", body: "Pressure washing, stain treatment and a dry, inspected slab before a drop of sealer goes down." },
  { icon: "🎯", title: "Sprayed and back-rolled", body: "Even coverage into every stamped joint and around every stone, with no lap marks or streaks." },
  { icon: "🛡️", title: "5-year workmanship warranty", body: "Peeling, flaking or uneven coverage caused by our application is fixed at no charge. In writing." },
  { icon: "📍", title: "Local and insured", body: "Based in London, fully insured, serving 20+ communities across Southwestern Ontario with free site assessments." },
];

export function WhyChoose() {
  return (
    <section className="bg-[var(--stone)]">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow-pill navy">Why TriCity</p>
            <h2 className="font-display h2-fluid mt-4">The concrete sealing specialists of Southwestern Ontario.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">Unsealed concrete is porous. It drinks road salt, oil, water and UV, and gives it all back as scaling, staining and faded colour. Sealing stops that cycle. Doing it with the right product and the right prep is what we do all day.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Photo name={PICKS.process1} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={PICKS.process3} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-6" sizes="260px" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-[var(--stone)] text-xl">{r.icon}</span>
                <h3 className="font-display mt-4 text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
