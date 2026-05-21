import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            Professional Wood Care
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "var(--slate)" }}
          >
            Our Deck Services
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--slate-muted)" }}>
            From a single power wash to a complete multi-day restoration — every service uses
            premium products rated for Canadian weather extremes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "var(--light-grey)" }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-display text-lg font-bold mb-1 leading-snug"
                  style={{ color: "var(--slate)" }}
                >
                  {s.name}
                </h3>
                <p className="text-sm mb-3" style={{ color: "var(--slate-muted)" }}>
                  {s.shortDesc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-gap group-hover:gap-2"
                  style={{ color: "var(--blue)" }}
                >
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
