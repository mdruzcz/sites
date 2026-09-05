import { StarIcon } from "./icons";

const testimonials = [
  { name: "Sarah M.", location: "Ancaster, ON", service: "Classic lights", quote: "Cameron and his team transformed our home. Neighbours knocked on the door asking for their number. They showed up, did everything, and we just enjoyed it." },
  { name: "David K.", location: "Burlington, ON", service: "Permanent lights", quote: "Christmas, Halloween, our daughter's birthday. We open the app and change the colours. Best home upgrade we've done in years." },
  { name: "The Rossi Family", location: "Hamilton, ON", service: "Classic lights", quote: "Third year with Festive. They remember our preferences, arrive on time, and the mid-season check means we've never had a single light out." },
  { name: "Mike T.", location: "Oakville, ON", service: "Commercial", quote: "Foot traffic was noticeably up and tenants kept complimenting the plaza. Professional, fast, exactly what we envisioned." },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--snow)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-pill">What clients say</p>
            <h2 className="font-display h2-fluid mt-4">Real homes. Real happy clients.</h2>
          </div>
          <div className="card flex items-center gap-3 px-5 py-3">
            <span className="flex text-[var(--gold)]">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
            <span className="text-sm"><span className="font-bold">5.0</span> · 47+ reviews</span>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col p-6">
              <span className="flex text-[var(--gold)]">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center justify-between text-xs">
                <span><span className="block font-bold text-[var(--ink)]">{t.name}</span><span className="text-[var(--muted)]">{t.location}</span></span>
                <span className="rounded-full bg-[var(--pine-soft)] px-2.5 py-1 font-bold uppercase tracking-wider text-[var(--pine-deep)]">{t.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
