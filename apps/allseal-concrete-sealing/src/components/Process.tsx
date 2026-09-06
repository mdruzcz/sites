import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const steps = [
  { n: "01", title: "Inspect", body: "Free on-site look at the surface, any old sealer, cracks and drainage. You get a written quote and a sheen recommendation.", photo: PICKS.areas },
  { n: "02", title: "Clean and repair", body: "Pressure washing lifts dirt, salt film and failed coating. Cracks and joints are repaired, then the slab dries fully.", photo: PICKS.process1 },
  { n: "03", title: "Seal", body: "Premium acrylic or polyurethane sealer applied for even coverage into every joint and texture, anti-slip additive where it matters.", photo: PICKS.process3 },
  { n: "04", title: "Cure", body: "Foot traffic the next day, vehicles after 48 to 72 hours. Then two to five years of protection before a light recoat.", photo: PICKS.gloss },
];

export function Process() {
  return (
    <section className="bg-[var(--fog)]">
      <div className="shell section">
        <div className="max-w-2xl"><p className="kicker">How it works</p><h2 className="font-display h2-fluid mt-4">Four steps, one visit.</h2></div>
        <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 bg-[var(--orange)] md:block" />
          {steps.map((s) => (
            <li key={s.n} className="relative">
              <span className="font-display relative z-10 grid size-[6.5rem] place-items-center rounded-full border-4 border-[var(--fog)] bg-[var(--graphite)] text-4xl font-extrabold text-[var(--orange)] md:mx-0">{s.n}</span>
              <Photo name={s.photo} ratio="aspect-[4/3]" rounded="rounded-lg" className="mt-4" sizes="(max-width: 768px) 100vw, 280px" />
              <h3 className="font-display mt-4 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
