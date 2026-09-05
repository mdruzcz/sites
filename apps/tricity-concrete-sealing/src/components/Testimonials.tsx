import { getTestimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { StarIcon } from "./icons";

export function Testimonials() {
  const testimonials = getTestimonials().slice(0, 4);
  return (
    <section className="bg-[var(--stone)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-pill">What clients say</p>
            <h2 className="font-display h2-fluid mt-4">Real driveways and patios across SW Ontario.</h2>
          </div>
          <div className="card flex items-center gap-3 px-5 py-3">
            <span className="flex text-[var(--gold)]">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
            <span className="text-sm"><span className="font-bold">{site.googleRating}</span> · Google rating</span>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.author} className="card flex flex-col p-6">
              <span className="flex text-[var(--gold)]">{Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-xs">
                <span className="block font-bold text-[var(--ink)]">{t.author}</span>
                <span className="text-[var(--muted)]">{t.city}, ON</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
