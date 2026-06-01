import type { Metadata } from "next";
import Link from "next/link";
import { AREAS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas Across Southwestern Ontario",
  description: "DeckStain.ca serves 40+ cities across Southwestern Ontario — London, Woodstock, St. Thomas, Stratford, Brantford, Kitchener, Cambridge, Guelph and more.",
};

export default function AreasPage() {
  return (
    <>
      <PageHead eyebrow="Service areas" title={`Proudly serving ${SITE.region}.`}
        intro={`Based in ${SITE.baseCity}, we travel across ${SITE.stats.cities} cities. Our photo-quote system means you get an accurate estimate no matter where you are.`}
        image="/images/hero-areas.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }]} />
      <section className="sec bg-white">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AREAS.map((a) => (
              <Link key={a.slug} href={`/areas/${a.slug}`} className="card card-hover p-6 group">
                <div className="flex items-center justify-between mb-1.5">
                  <h2 className="h text-xl text-[var(--ink)] group-hover:text-[var(--green)] transition-colors">{a.name}</h2>
                  <svg className="w-5 h-5 text-[var(--green)] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-2.5" style={{ fontFamily: "var(--font-head)" }}>{a.county}</p>
                <p className="muted text-sm leading-relaxed">{a.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
