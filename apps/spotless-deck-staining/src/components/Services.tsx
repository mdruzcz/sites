import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";
import { CheckIcon } from "./icons";

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[var(--greige-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Our Services
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Complete deck &amp; fence care
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            From a fresh restain to a full deck restoration — built to impress
            and protect.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-10">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center bg-[var(--cream)] rounded-2xl overflow-hidden border border-[var(--line)] shadow-warm ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px]">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-10">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--terracotta)] mb-3">
                  0{i + 1} · {s.shortName}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold mb-4 leading-tight">
                  {s.name}
                </h3>
                <p className="text-[var(--driftwood)]/80 leading-relaxed mb-5">
                  {s.blurb}
                </p>
                <ul className="space-y-2.5 mb-7">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--driftwood)]/85">
                      <CheckIcon className="w-4 h-4 text-[var(--terracotta)] mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--terracotta-deep)] hover:text-[var(--driftwood-dark)] transition-colors"
                  >
                    Learn more about {s.shortName}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--driftwood)]/70 hover:text-[var(--terracotta-deep)] transition-colors"
                  >
                    Get a free quote
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
