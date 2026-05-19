const cases = [
  {
    title: "Roofline Lighting",
    desc: "Elegant accent lighting that follows your home's architecture — the foundation of every Halton Glow install.",
  },
  {
    title: "Landscape Features",
    desc: "Highlight trees, gardens, and architectural details with subtle, programmable accent lighting.",
  },
  {
    title: "Pathway Safety",
    desc: "Illuminate walkways and driveways for nightly security and curb appeal that lasts year-round.",
  },
  {
    title: "Holiday Displays",
    desc: "Christmas, Halloween, Diwali, Canada Day — stunning seasonal colors with zero ladder time.",
  },
];

export function UseCases() {
  return (
    <section
      className="relative py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--night-deep) 0%, var(--midnight) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Built For Modern Homes
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            One System.{" "}
            <span className="text-gradient-gold">Every Occasion.</span>
          </h2>
          <p className="text-lg text-white/65">
            Permanent outdoor lighting that adapts to every season, holiday and
            mood with a tap.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="p-7 rounded-2xl border relative overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="absolute -top-3 -right-3 font-display text-7xl font-extrabold opacity-10"
                style={{ color: "var(--gold-bright)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-display text-lg font-bold text-white mb-3">
                {c.title}
              </h3>
              <p className="relative text-sm text-white/60 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
