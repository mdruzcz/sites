import { StarIcon } from "./icons";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Burlington, ON",
    text: "The installation was flawless and the lights look absolutely stunning. We can now enjoy beautiful lighting for every holiday without the hassle of putting up and taking down decorations.",
  },
  {
    name: "Michael R.",
    location: "Oakville, ON",
    text: "Professional service from start to finish. The team was punctual, respectful, and the quality of work exceeded our expectations. Highly recommend!",
  },
  {
    name: "Jennifer L.",
    location: "Burlington, ON",
    text: "Best investment we've made for our home! The app control is so convenient and the lights have held up perfectly through two Canadian winters.",
  },
];

export function Testimonials() {
  return (
    <section
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--midnight)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            What Our Customers Say
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Real Stories,{" "}
            <span className="text-gradient-gold">Real Glow.</span>
          </h2>
          <p className="text-lg text-white/65">
            Hear from happy Halton homeowners enjoying their permanent lights
            year-round.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative p-7 rounded-2xl border"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="absolute -top-4 left-6 font-display text-6xl leading-none select-none"
                style={{ color: "var(--gold)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <div
                className="flex gap-0.5 mb-4 mt-2"
                style={{ color: "var(--gold-bright)" }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <blockquote className="text-sm text-white/75 leading-relaxed mb-5">
                {t.text}
              </blockquote>
              <figcaption>
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-white/45">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
