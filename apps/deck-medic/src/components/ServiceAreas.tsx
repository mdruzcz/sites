import Link from "next/link";
import { cities } from "@/lib/site";

export function ServiceAreas() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--blue-pale)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            Where We Work
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
            style={{ color: "var(--slate)" }}
          >
            Serving Southern Ontario
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--slate-muted)" }}>
            From Toronto's urban backyards to Burlington's lakeshore homes — same team, same high standards.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="group rounded-2xl p-7 border bg-white transition-all hover:shadow-xl hover:-translate-y-1 hover:border-[var(--blue)]"
              style={{ borderColor: "var(--light-grey)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--blue-pale)" }}
              >
                <svg className="w-6 h-6" style={{ color: "var(--blue)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3
                className="font-display text-xl font-bold mb-1"
                style={{ color: "var(--slate)" }}
              >
                {city.name}, {city.region}
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--slate-muted)" }}>
                {city.description.slice(0, 90)}…
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                style={{ color: "var(--blue)" }}
              >
                Learn More
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
