import { getTestimonials } from "@/lib/content";
import { StarIcon } from "./icons";

export function Testimonials() {
  const items = getTestimonials().slice(0, 3);
  return (
    <section className="bg-[var(--fog)]">
      <div className="shell section">
        <div className="max-w-2xl"><p className="kicker">Clients</p><h2 className="font-display h2-fluid mt-4">What owners say after the first rain.</h2></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.author} className="card flex flex-col p-6">
              <span className="flex text-[var(--orange)]">{Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
              <blockquote className="mt-3 flex-1 leading-relaxed text-[var(--ink-soft)]">“{t.quote}”</blockquote>
              <figcaption className="font-display mt-4 text-sm font-bold uppercase tracking-wider">{t.author} <span className="text-[var(--muted)]">· {t.city}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
