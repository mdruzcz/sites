import Link from "next/link";

export function SmartControl() {
  const features = [
    { icon: "📱", title: "Phone app", body: "Pre-configured WLED on every controller. Pair to your home WiFi, control from anywhere." },
    { icon: "🎨", title: "16M colors", body: "Every RGBW combination. 2850K warm white to 6500K daylight. 200+ pre-built scenes." },
    { icon: "⏰", title: "Schedules", body: "Auto-on at sunset, off at midnight. Holiday scenes for Halloween, Christmas, July 1." },
    { icon: "🌐", title: "Voice control", body: "Alexa + Google Assistant ready. \"Turn on the porch lights\" — done." }
  ];
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand)]">
      <div className="pointer-events-none absolute -right-32 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-white">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-peach)]">Smart control</p>
          <h2 className="font-display mt-2 text-3xl md:text-5xl">
            Every holiday. Every color.<br />From your phone.
          </h2>
          <p className="mt-4 text-lg text-cyan-50">
            Every Illumi kit ships with a WiFi controller pre-flashed with the latest WLED firmware. Pair
            in under five minutes — no electrician, no subscription, just the app.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-2xl" aria-hidden>{f.icon}</p>
              <h3 className="font-display mt-3 text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cyan-100">{f.body}</p>
            </div>
          ))}
        </div>
        <Link href="/how-it-works" className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-peach)] hover:underline">
          See the full feature list →
        </Link>
      </div>
    </section>
  );
}
