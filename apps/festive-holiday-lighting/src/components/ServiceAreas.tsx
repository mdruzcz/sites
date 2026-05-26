import Link from "next/link";
import { cities } from "@/lib/site";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>
            Service Areas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Serving Southern Ontario{" "}
            <span className="text-gradient-gold">Home & Business</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From Hamilton to Niagara Falls, we're your local holiday lighting experts. Serving homes and businesses across the region.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="group flex items-center gap-2.5 p-4 rounded-xl border transition-all hover:border-[var(--crimson)]/40 hover:bg-white/[0.04]"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <MapPinIcon className="w-4 h-4 text-[var(--crimson-bright)] flex-shrink-0" />
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition">{city.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-white/50 mb-4">Not sure if we serve your area? Just call us.</p>
          <a
            href="tel:+12894265764"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition min-h-11 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (289) 426-5764
          </a>
        </div>
      </div>
    </section>
  );
}
