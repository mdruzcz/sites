import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const steps = [
  { n: "1", title: "Free site assessment", body: "We measure, check the surface and any old sealer, and bring finish samples so you can see matte, semi-gloss and gloss on your own concrete.", photo: PICKS.heroAreas },
  { n: "2", title: "Clean and prep", body: "Pressure washing, stain treatment and minor repairs. Then the slab dries fully before anything else happens.", photo: PICKS.process1 },
  { n: "3", title: "Spray and back-roll", body: "High-quality solvent-based sealer applied by sprayer, then rolled for even coverage into every joint and around every stone.", photo: PICKS.process3 },
  { n: "4", title: "Cure and enjoy", body: "Dry to the touch in one to two hours, foot traffic next day, vehicles after 48 to 72 hours. Warranty certificate in your inbox.", photo: PICKS.gloss },
];

export function Process() {
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill">How it works</p>
          <h2 className="font-display h2-fluid mt-4">Four steps from faded to finished.</h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card relative overflow-hidden">
              <Photo name={s.photo} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 280px" />
              <span className="font-display absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-[var(--accent)] text-lg text-white shadow-[var(--shadow-accent)]">{s.n}</span>
              <div className="p-5">
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
