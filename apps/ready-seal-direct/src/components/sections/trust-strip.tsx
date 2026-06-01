export function TrustStrip() {
  const badges = [
    { icon: "🪵", label: "Stain + sealer in one coat" },
    { icon: "✅", label: "Goof-proof — no laps or streaks" },
    { icon: "☀️", label: "Trans-oxide UV protection" },
    { icon: "🚚", label: "Free shipping over $750" }
  ];
  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[var(--color-border)] md:grid-cols-4">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-2 bg-white px-4 py-5 text-sm">
            <span aria-hidden className="text-lg">{b.icon}</span>
            <span className="font-medium text-slate-700">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
