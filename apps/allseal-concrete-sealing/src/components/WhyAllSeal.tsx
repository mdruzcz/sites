import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const reasons = [
  { title: "Premium products only", body: "Acrylic, polyurethane or penetrating sealer matched to the surface. No bargain-bin product, no watered-down coats." },
  { title: "Works on previously sealed concrete", body: "We assess the old coating first. Sound coats get bonded to; failing ones get stripped so nothing peels later." },
  { title: "Anti-slip on request", body: "A fine grit mixed into any sheen for pools, steps and sloped walkways. Same look, more grip." },
  { title: "Two to five years of protection", body: "Salt, oil, water and UV stay out. A light recoat later keeps it going without starting over." },
  { title: "Free inspection, written quote", body: "No guessing from the street. We measure, check drainage and cracks, and price it properly." },
  { title: "Ten-plus years, local", body: "Based in Woodstock, working across Oxford, Elgin, Brant, Hamilton and Waterloo Region." },
];

export function WhyAllSeal() {
  return (
    <section className="bg-white">
      <div className="shell section grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="kicker">Why All-Seal</p>
          <h2 className="font-display h2-fluid mt-4">Concrete sealing is the whole job, not a side service.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">{site.stats.driveways} driveways, {site.stats.patios} patios and {site.stats.happyCustomers} happy customers so far. Every one started with a free inspection and finished with a sheen the owner chose on their own concrete.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Photo name={PICKS.process3} ratio="aspect-[4/5]" rounded="rounded-lg" sizes="260px" />
            <Photo name={PICKS.estate} ratio="aspect-[4/5]" rounded="rounded-lg" className="mt-6" sizes="260px" />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={r.title} className="bg-white p-6">
              <span className="font-display text-sm font-bold text-[var(--orange)]">0{i + 1}</span>
              <h3 className="font-display mt-2 text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
