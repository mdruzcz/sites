import type { City } from "@/lib/site";
import { site } from "@/lib/site";
import { MapPinIcon } from "./icons";

export function CityOverview({ city }: { city: City }) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--greige-soft)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Local Expertise
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Deck &amp; fence staining <span className="text-[var(--terracotta)]">built for {city.name}</span>
          </h2>
          <p className="text-lg text-[var(--driftwood)]/80 leading-relaxed max-w-3xl mx-auto">
            {city.intro}
          </p>
          {city.localDetail && (
            <p className="text-base text-[var(--driftwood)]/70 leading-relaxed max-w-3xl mx-auto mt-5">
              {city.localDetail}
            </p>
          )}
        </div>

        <div className="p-8 rounded-2xl border border-[var(--line)] bg-[var(--cream)] shadow-warm">
          <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2 text-[var(--driftwood-dark)]">
            <MapPinIcon className="w-5 h-5 text-[var(--terracotta)]" />
            {city.name} neighbourhoods we serve
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {city.neighbourhoods.map((n) => (
              <span
                key={n}
                className="px-3.5 py-1.5 rounded-full text-sm bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/25 text-[var(--driftwood-dark)]"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--driftwood)]/65 mt-5">
            Not seeing your neighbourhood? We serve all of {city.name} and the
            surrounding area &mdash; call{" "}
            <a href={site.phoneHref} className="underline text-[var(--terracotta-deep)] font-semibold">
              {site.phone}
            </a>{" "}
            to confirm.
          </p>
        </div>
      </div>
    </section>
  );
}
