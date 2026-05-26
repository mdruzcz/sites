export function Occasions() {
  const occasions = [
    { label: "Christmas", colors: ["#ef4444", "#22c55e", "#ffffff"], emoji: "🎄" },
    { label: "Halloween", colors: ["#f97316", "#7c3aed", "#1e293b"], emoji: "🎃" },
    { label: "Canada Day", colors: ["#ef4444", "#ffffff", "#ef4444"], emoji: "🍁" },
    { label: "Valentine's", colors: ["#ec4899", "#ef4444", "#ffffff"], emoji: "💖" },
    { label: "Everyday white", colors: ["#fef3c7", "#fff7ed", "#fde68a"], emoji: "✨" },
    { label: "Custom RGBW", colors: ["#06b6d4", "#a855f7", "#22c55e", "#ef4444", "#fbbf24"], emoji: "🎨" }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">One kit. Every occasion.</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">
            Holiday after holiday &mdash; <span className="gradient-text">all from one install</span>.
          </h2>
          <p className="mt-3 text-slate-600">
            16 million colors. 200+ pre-built scenes. Schedule them by date or trigger from the app.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {occasions.map((o) => (
            <article
              key={o.label}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-deep)] p-6 text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="absolute inset-x-4 top-4 flex h-3 items-center gap-2 rounded-full bg-black/30 px-2">
                {Array.from({ length: 14 }).map((_, i) => {
                  const c = o.colors[i % o.colors.length];
                  return (
                    <span
                      key={i}
                      className={`twinkle twinkle-delay-${(i % 5) as 0 | 1 | 2 | 3 | 4} inline-block size-1.5 rounded-full`}
                      style={{ background: c, boxShadow: `0 0 8px 2px ${c}` }}
                    />
                  );
                })}
              </div>
              <div className="mt-12">
                <p className="text-4xl">{o.emoji}</p>
                <p className="font-display mt-2 text-xl">{o.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
