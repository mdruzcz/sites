const problems = [
  {
    icon: "☀️",
    title: "UV Damage & Graying Wood",
    problem:
      "Constant exposure to harsh UV rays breaks down wood lignin, causing your deck to turn a dull, weathered grey.",
    solution:
      "We perform deep-fibre sanding to reveal fresh wood and apply UV-shielding stains that act as sunscreen for your deck — restoring its vibrant, natural beauty.",
  },
  {
    icon: "🪣",
    title: "Peeling & Flaking Finishes",
    problem:
      "Previous DIY attempts or low-quality latex stains lead to unsightly peeling and cracking that makes the surface look neglected.",
    solution:
      "We use professional-grade stripping agents and mechanical sanding to completely remove old layers, ensuring the new premium stain penetrates deep for a long-lasting bond.",
  },
  {
    icon: "❄️",
    title: "Splintering & Surface Cracking",
    problem:
      "The freeze-thaw cycle of Canadian winters causes wood to expand and contract, leading to painful splinters and deep cracks that trap moisture.",
    solution:
      "Our multi-stage sanding process smooths every surface, followed by nourishing oil-based sealants that keep wood flexible and resilient through the seasons.",
  },
  {
    icon: "💧",
    title: "Mold, Mildew & Wood Rot",
    problem:
      "Trapped moisture in shaded areas or between boards leads to black mold and structural rot that can eventually make your deck unsafe.",
    solution:
      "We use eco-friendly oxygen cleaners to kill mold spores at the root and apply hydrophobic finishes that prevent water from soaking into the timber.",
  },
];

export function Problems() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            Common Deck Problems
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "var(--slate)" }}
          >
            Protecting Your Investment from the{" "}
            <span className="text-gradient-blue">Harsh Canadian Climate</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--slate-muted)" }}>
            We diagnose and fix the root cause — not just the surface. Here's what we see every day and how we fix it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-8 border transition-shadow hover:shadow-lg"
              style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-display text-xl font-bold mb-4" style={{ color: "var(--slate)" }}>
                {p.title}
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg p-4" style={{ background: "var(--off-white)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--slate-muted)" }}>
                    The Problem
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--slate-light)" }}>
                    {p.problem}
                  </p>
                </div>
                <div className="rounded-lg p-4" style={{ background: "var(--blue-pale)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--blue)" }}>
                    The Deck Medic Solution
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>
                    {p.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
