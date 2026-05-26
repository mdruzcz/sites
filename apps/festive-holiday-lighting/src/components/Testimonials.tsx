import { StarIcon } from "./icons";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Ancaster, ON",
    service: "Christmas Lighting",
    quote: "Absolutely stunning! Cameron and his team transformed our home. We had neighbours knocking on our door asking for their number. The whole process was so easy — they showed up, did everything, and we just enjoyed the most beautiful Christmas lights we've ever had.",
    stars: 5,
  },
  {
    name: "David K.",
    location: "Burlington, ON",
    service: "Permanent Lighting",
    quote: "We went with the permanent system and couldn't be happier. Christmas, Halloween, our daughter's birthday — we just open the app and change the colours. Best home upgrade we've done in years. The install team was incredibly professional and cleaned up perfectly.",
    stars: 5,
  },
  {
    name: "The Rossi Family",
    location: "Hamilton, ON",
    service: "Christmas Lighting",
    quote: "This is our third year with Festive Holiday Lighting and we keep coming back. They always remember our preferences, arrive on time, and the display gets better every year. The mid-season check they do is such a nice touch — never had a single light go out.",
    stars: 5,
  },
  {
    name: "Mike T.",
    location: "Oakville, ON",
    service: "Commercial Lighting",
    quote: "We hired Festive to light up our plaza for the holiday season. Foot traffic was noticeably up and we got so many compliments from tenants. The commercial team was professional, fast, and the lighting was exactly what we envisioned. Will absolutely book again.",
    stars: 5,
  },
  {
    name: "Jennifer & Paul W.",
    location: "Mississauga, ON",
    service: "Christmas Lighting",
    quote: "I was nervous about hiring someone to put up lights — felt like something we should do ourselves. But wow, was I wrong. The design they came up with was 10x better than anything we'd done. The takedown and storage was the real seller — no more boxes of tangled lights!",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night-deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            What Clients Say
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Real Homes. Real Results.
            <br />
            <span className="text-gradient-gold">Real Happy Clients.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-7 rounded-2xl border flex flex-col"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-[var(--gold-bright)]" filled />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed flex-1 mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.location}</p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold-bright)" }}
                >
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 text-center py-6 px-4 rounded-2xl border"
          style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "rgba(201,168,76,0.05)" }}
        >
          <div className="flex justify-center mb-2">
            {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-5 h-5 text-[var(--gold-bright)]" filled />)}
          </div>
          <p className="text-lg font-bold text-white">5.0 Stars · 47+ Reviews</p>
          <p className="text-sm text-white/55">Southern Ontario's most trusted holiday lighting company</p>
        </div>
      </div>
    </section>
  );
}
