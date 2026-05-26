export function Benefits() {
  const benefits = [
    { icon: "🪜", title: "No more hassle", body: "Ditch the ladders, tangled wires, and burnt-out bulbs. One install. Every holiday." },
    { icon: "🎨", title: "Fully customizable", body: "16M colors. 200+ pre-built scenes. Perfect lighting for every holiday, event, or mood." },
    { icon: "🏠", title: "Sleek hidden design", body: "Aluminum tracks tuck under your soffit. Invisible during the day, stunning at night." },
    { icon: "❄️", title: "Built for all seasons", body: "IP68 weatherproof. Tested to −40°C. 50,000-hour LED life. Built for Canadian winters." },
    { icon: "✨", title: "Boost curb appeal", body: "Elevate the look and value of your home. Year-round accent lighting at the tap of a button." },
    { icon: "🔒", title: "Added security", body: "Keep your home well-lit and protected year-round. Schedule sunset triggers from the app." }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">Permanent lighting</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            Make your home stand out.<br />
            <span className="gradient-text">Every night of the year.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From holidays to everyday elegance, permanent lighting gives you total control with zero
            fuss.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-md"
            >
              <p className="text-3xl" aria-hidden>{b.icon}</p>
              <h3 className="font-display mt-3 text-lg">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
