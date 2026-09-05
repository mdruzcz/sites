import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const steps = [
  { n: "1", title: "Clean", body: "Eco-friendly detergent and the right pressure for the wood lift grey fibres, mildew and old failed finish.", photo: PICKS.heroPowerWashing },
  { n: "2", title: "Repair", body: "Loose boards, popped nails, soft spots and wobbly railings fixed before anything gets stained.", photo: PICKS.heroRepair },
  { n: "3", title: "Sand and stain", body: "80-grit buff sand, then Ready Seal or Penofin Verde brushed into every board and baluster.", photo: PICKS.heroSanding },
  { n: "4", title: "Inspect", body: "A final walkthrough with you, care notes for the first weeks, and a reminder for the next maintenance coat.", photo: PICKS.heroRestoration },
];

export function Process() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill cedar">How it works</p>
          <h2 className="font-display h2-fluid mt-4">Four steps. About two days.</h2>
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
