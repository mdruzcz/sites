import Link from "next/link";
import type { City } from "@/lib/site";
import { cities } from "@/lib/site";

export function OtherCitiesNav({ currentSlug }: { currentSlug: string }) {
  const others = cities.filter((c) => c.slug !== currentSlug);

  return (
    <section
      className="relative py-16 lg:py-20"
      style={{ backgroundColor: "var(--night)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "var(--gold-bright)" }}
          >
            Also serving
          </p>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-white">
            Permanent LED Lights Across Halton
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((c: City) => (
            <Link
              key={c.slug}
              href={`/permanent-lights/${c.slug}`}
              className="group p-5 rounded-xl border transition-all hover:translate-y-[-2px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-[var(--gold-bright)] transition">
                {c.name}
              </h3>
              <p className="text-xs text-white/50">
                Permanent LED lighting in {c.name}, {c.region}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
