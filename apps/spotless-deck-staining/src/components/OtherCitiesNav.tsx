import Link from "next/link";
import type { City } from "@/lib/site";
import { cities } from "@/lib/site";

export function OtherCitiesNav({ currentSlug }: { currentSlug: string }) {
  const others = cities.filter((c) => c.slug !== currentSlug);

  return (
    <section className="py-16 lg:py-20 bg-[var(--greige)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2 text-[var(--terracotta)]">
            Also serving
          </p>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold">
            Deck &amp; fence staining across Kitchener-Waterloo
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((c: City) => (
            <Link
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="group p-6 rounded-xl border border-[var(--line)] bg-[var(--cream)] shadow-warm hover:shadow-warm-lg hover:border-[var(--terracotta)]/40 transition-all"
            >
              <h3 className="font-display text-lg font-bold mb-1 group-hover:text-[var(--terracotta-deep)] transition">
                {c.name}, {c.region}
              </h3>
              <p className="text-sm text-[var(--driftwood)]/65">
                Deck &amp; fence staining in {c.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
