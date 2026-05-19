const steps = [
  {
    number: "01",
    title: "Site Visit & Measurements",
    desc: "We come to your home, confirm every measurement, and design a layout that frames your home's best features.",
  },
  {
    number: "02",
    title: "Color Match",
    desc: "During the visit we color-match the track to your soffit and fascia so the system disappears by daylight.",
  },
  {
    number: "03",
    title: "Professional Installation",
    desc: "Our certified team installs the tracks, lights, Wi-Fi controller and power supplies — then pairs everything with your phone.",
  },
];

export function Process() {
  return (
    <section
      id="how"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--night)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            How It Works
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Simple. Stress-Free.{" "}
            <span className="text-gradient-gold">Done in a Day.</span>
          </h2>
          <p className="text-lg text-white/65">
            From the first consultation to the final smart-app pairing, we make
            the whole experience effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          <div
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,194,107,0.4), transparent)",
            }}
            aria-hidden
          />

          {steps.map((s) => (
            <div
              key={s.number}
              className="relative p-7 rounded-2xl border text-center md:text-left"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto md:mx-0 mb-5 flex items-center justify-center font-display text-xl font-extrabold relative"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-bright), var(--amber))",
                  color: "var(--night-deep)",
                }}
              >
                {s.number}
                <span
                  className="absolute inset-0 rounded-full animate-pulse-glow"
                  style={{
                    boxShadow: "0 0 20px rgba(245,194,107,0.4)",
                  }}
                />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
