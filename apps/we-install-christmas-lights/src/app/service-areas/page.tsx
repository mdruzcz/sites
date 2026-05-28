import type { Metadata } from "next";
import Link from "next/link";
import { cities, site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Christmas Light Installation Across South-Western Ontario",
  description:
    "We Install Christmas Lights serves London Ontario, the GTA, Waterloo Region, and beyond. Browse our full list of service areas.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Service Areas</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Christmas Light Installation Across South-Western Ontario</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            From our London Ontario base, we travel across the GTA, Waterloo Region, Halton, Hamilton, and Oxford County.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="heading-display text-base text-[color:var(--brand-green)]">
                  Christmas Lights in {c.name}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{c.localFact}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest font-bold text-[color:var(--brand-red)]">
                  See {c.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
