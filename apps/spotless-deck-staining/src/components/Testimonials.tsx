import { testimonials } from "@/lib/site";
import { StarIcon } from "./icons";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--greige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            What Customers Say
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Rated 5.0 across Kitchener-Waterloo
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            Honest reviews from real homeowners. Every job ends with a smile
            &mdash; or we make it right.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[var(--cream)] rounded-2xl p-6 border border-[var(--line)] shadow-warm flex flex-col"
            >
              <div className="flex gap-1 text-[var(--terracotta)] mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[var(--driftwood)]/85 leading-relaxed mb-5 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--line)]">
                <p className="font-semibold text-[var(--driftwood-dark)] text-sm">{t.name}</p>
                <p className="text-xs text-[var(--driftwood)]/60">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
