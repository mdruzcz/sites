import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Service Areas | Deck Medic GTA" },
  description:
    "Deck Medic serves Toronto, Mississauga, Oakville, and Burlington. Professional deck restoration and staining throughout Southern Ontario. Free estimate.",
  alternates: { canonical: "https://deckmedic.ca/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <main>
      <NavBar />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Where We Work</p>
            <h1 className="font-display text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
              Serving{" "}
              <span className="text-gradient-blue">Southern Ontario</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: "var(--slate-muted)" }}>
              From Toronto&apos;s urban backyards to Burlington&apos;s lakeshore estates — same team, same high standards, same premium results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="group rounded-2xl p-8 border transition-all hover:shadow-xl hover:-translate-y-1 hover:border-[var(--blue)]"
                style={{ borderColor: "var(--light-grey)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--blue-pale)" }}>
                  <svg className="w-6 h-6" style={{ color: "var(--blue)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--slate)" }}>
                  {city.name}
                </h2>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                  {city.description}
                </p>
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--slate-muted)" }}>Neighbourhoods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {city.neighbourhoods.slice(0, 3).map((n) => (
                      <span key={n} className="inline-block px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: "var(--blue)" }}>
                  View {city.name} Details
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <CallNowFab />
    </main>
  );
}
