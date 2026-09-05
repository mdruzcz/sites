import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const reasons = [
  { icon: "🖌️", title: "Brush-applied, never sprayed", body: "Brushing forces stain into the grain instead of leaving it on the surface. It takes longer and it lasts longer." },
  { icon: "🪵", title: "80-grit buff sand every time", body: "Cleaning raises the grain. Sanding knocks it back down so the stain absorbs evenly and the boards feel smooth underfoot." },
  { icon: "🌿", title: "Eco-friendly, plant-safe cleaners", body: "VOC-compliant detergents that are safe around gardens, pets and kids. No bleach burns on the lawn." },
  { icon: "🛢️", title: "Penetrating oil-based stains", body: "Ready Seal and Penofin Verde soak in and fade gracefully. They never crack or peel the way film-forming products do." },
  { icon: "⏱️", title: "Done in about two days", body: "Clean and repair on day one, sand and stain on day two, including drying time. Bigger decks take three." },
  { icon: "🔍", title: "Tailored to the wood", body: "Pressure-treated pine and cedar behave differently. We adjust pressure, detergent and stain for each." },
];

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow-pill">Why Restore My Deck</p>
            <h2 className="font-display h2-fluid mt-4">A decade of wood restoration, done the slow way on purpose.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">Cameron started in pressure washing, learned staining with another restoration crew, and built Restore My Deck around better detergents, better stain and a brush in every hand. That is still how every job runs.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Photo name={PICKS.heroSanding} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={PICKS.closeupWash} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-6" sizes="260px" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-[var(--cream)] text-xl">{r.icon}</span>
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
