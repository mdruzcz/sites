import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { cities, site } from "@/lib/site";
import { MapPinIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Holiday Lighting Service Areas | Southern Ontario",
  description:
    "Festive Holiday Lighting serves Hamilton, Burlington, Oakville, Mississauga, Brampton, Milton, Ancaster, Grimsby, St. Catharines, and Niagara Falls. Professional Christmas and permanent lighting.",
  alternates: { canonical: "https://festiveholidaylighting.ca/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20 lg:pt-36 lg:pb-28" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <nav className="flex justify-center items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-white/60">Service Areas</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>
              Where We Work
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5">
              Holiday Lighting{" "}
              <span className="text-gradient-gold">Across Southern Ontario</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From Hamilton's Escarpment to Niagara Falls, we're your local holiday lighting experts. Seasonal Christmas installs and permanent LED systems for homes and businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="group p-6 rounded-2xl border transition-all hover:border-[var(--crimson)]/40 hover:bg-white/[0.04]"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPinIcon className="w-5 h-5 text-[var(--crimson-bright)]" />
                  <h2 className="font-display font-bold text-white group-hover:text-[var(--gold-bright)] transition">
                    {city.name}
                  </h2>
                </div>
                <p className="text-xs text-white/50 leading-relaxed mb-3">
                  {city.description.split(".")[0]}.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {city.neighbourhoods.slice(0, 3).map(n => (
                    <span key={n} className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full">{n}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Serving All of Southern Ontario" sub="One call, one company. We handle seasonal and permanent lighting for any home or business." />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
