import Link from "next/link";
import { cities } from "@/lib/site";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--night)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Service Areas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Proudly Serving{" "}
            <span className="text-gradient-gold">Halton Region</span>
          </h2>
          <p className="text-lg text-white/65">
            Local experts who know the architecture, weather and bylaws of every
            community we serve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/permanent-lights/${c.slug}`}
              className="group p-7 rounded-2xl border transition-all hover:translate-y-[-2px] hover:border-[var(--gold)]/40"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-3 group-hover:text-[var(--gold-bright)] transition"
                style={{ color: "var(--gold-bright)" }}
              >
                <MapPinIcon />
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {c.neighbourhoods.slice(0, 4).map((n) => (
                  <span
                    key={n}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(245,194,107,0.08)",
                      color: "var(--gold-bright)",
                      border: "1px solid rgba(245,194,107,0.18)",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p
                className="text-sm font-semibold inline-flex items-center gap-1.5"
                style={{ color: "var(--gold-bright)" }}
              >
                Permanent lights in {c.name}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center text-white/50 text-sm mt-10">
          Don't see your area listed?{" "}
          <a
            href="/#contact"
            className="underline hover:text-white transition"
            style={{ color: "var(--gold-bright)" }}
          >
            Contact us
          </a>{" "}
          — we might still serve your neighbourhood.
        </p>
      </div>
    </section>
  );
}
