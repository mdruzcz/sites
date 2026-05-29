import Link from "next/link";

export const metadata = {
  title: "How DIY Permanent Lighting Works",
  description:
    "How Permanent Lighting Direct's DIY LED kits go from box to roofline. Mount the track, snap in the lights, wire the controller, control from your phone."
};

const STEPS = [
  {
    n: "01",
    title: "Pick your DIY kit",
    body: "Measure the perimeter of your home (roofline + soffits). Kits come in 50, 75, 100, 125, 150, 175 and 200 linear feet. Pick the track color that matches your soffit — beige, brown, black, or white."
  },
  {
    n: "02",
    title: "Receive everything in one box",
    body: "We ship 24V RGBW LED pucks, aluminum tracks, the WiFi controller, the right power supply, every cable and connector (1ft / 5ft / 10ft / 20ft extensions, T-connectors, power-injection cables), color-matched soffit screws, a Robertson drill bit, and spare fuses. Step-by-step install guide included."
  },
  {
    n: "03",
    title: "Mount the track",
    body: "Use the included soffit screws to attach the aluminum track to your soffit. Score-and-snap to length where needed. The track tucks neatly under your roofline so it disappears during the day."
  },
  {
    n: "04",
    title: "Snap in the lights",
    body: "Press the 24V RGBW LED pucks into the channel. Pre-wired between pucks &mdash; no soldering. Use the extension cables to bridge sections (over windows, around dormers)."
  },
  {
    n: "05",
    title: "Wire to the controller",
    body: "Connect the power-injection cable to the WiFi controller, plug the controller into a GFCI receptacle (no permit required for plug-in). The included fuses protect each channel."
  },
  {
    n: "06",
    title: "Pair with the WLED app",
    body: "Free Android & iOS app. Connect to your home WiFi. Pick a holiday scene, dial in a custom color, set a sunset schedule. 16M colors. Control from anywhere."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow text-[var(--color-brand)]">How it works</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
        From box to <span className="rainbow-text">roofline</span> in a weekend.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Permanent Lighting Direct kits are designed so a comfortable DIYer can install a pro-grade
        permanent lighting system without hiring an electrician. Here&rsquo;s the full process from order
        to first scene.
      </p>

      <ol className="mt-12 space-y-4">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <div className="flex items-start gap-5">
              <span className="font-display grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white shrink-0">
                {s.n}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-700">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl bg-[var(--color-brand-soft)] p-6 text-center">
        <p className="eyebrow text-[var(--color-brand)]">Ready?</p>
        <h2 className="font-display mt-2 text-2xl">Pick your DIY kit</h2>
        <p className="mt-2 text-slate-700">
          Or contact us — we&rsquo;ll help you size the right kit for your home.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">Pick a kit →</Link>
          <Link href="/contact-us" className="btn-secondary">Talk to us</Link>
        </div>
      </div>
    </div>
  );
}
