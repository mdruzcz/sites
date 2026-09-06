import { SHEENS } from "@/lib/content";
import { photo } from "@/lib/photos";
import { SheenTabs } from "./SheenTabs";

export function SheenSection() {
  const tabs = SHEENS.map((s) => ({ key: s.key, short: s.short, blurb: s.blurb, bestFor: s.bestFor, photo: photo(s.photo) }));
  return (
    <section className="slant-top slant-bottom bg-[var(--graphite)] text-white">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="kicker">Pick your finish</p>
          <h2 className="font-display h2-fluid mt-4 text-white">Same protection. Three looks.</h2>
          <p className="lead mt-4 text-white/70">Every sheen uses the same premium sealer underneath. Tap through to see how much shine you want on your concrete.</p>
        </div>
        <div className="mt-10"><SheenTabs tabs={tabs} /></div>
      </div>
    </section>
  );
}
