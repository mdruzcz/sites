import { cities } from "@/lib/site";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section id="service-areas" className="py-20 lg:py-28 bg-[var(--greige-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Service Areas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Proudly serving Kitchener, Waterloo,
            <br className="hidden sm:block" />
            Cambridge &amp; Guelph
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            Click your city for local details, neighbourhoods we cover, and
            recent work in your area.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.map((c) => (
            <a
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="group bg-[var(--cream)] rounded-2xl p-7 border border-[var(--line)] shadow-warm hover:shadow-warm-lg hover:border-[var(--terracotta)]/40 transition-all"
            >
              <div className="flex items-center gap-2 text-[var(--terracotta)] mb-3">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  {c.region}
                </span>
              </div>
              <h3 className="font-display text-2xl font-extrabold mb-1.5">{c.name}</h3>
              <p className="text-xs text-[var(--driftwood)]/60 mb-4">
                Pop. {c.population}
              </p>
              <p className="text-sm text-[var(--driftwood)]/75 leading-relaxed mb-5">
                {c.localProof}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--terracotta-deep)] group-hover:gap-2.5 transition-all">
                Deck staining in {c.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
