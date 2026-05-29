import Link from "next/link";

export const metadata = {
  title: "How they work",
  description: "How Illumi Track Lights' DIY permanent LED soffit kits go from delivery to first scene. Step-by-step install for Canadian DIYers."
};

const STEPS = [
  { n: "01", title: "Pick your kit", body: "Measure your home's perimeter (rooflines + soffits you want to light). Kits cover 50 to 200 linear feet. Pick the aluminum track color that blends with your soffit — beige, brown, black, or white." },
  { n: "02", title: "Receive everything in one box", body: "We ship 24V RGBW LED pucks, the aluminum tracks, the WiFi controller, every cable + connector (1ft/5ft/10ft/20ft extensions, T-connectors, power-injection cables), color-matched soffit screws, a Robertson drill bit, and spare fuses." },
  { n: "03", title: "Mount the track", body: "Pre-drilled aluminum tracks tuck under your soffit. Score-and-snap to length where needed. The track hides the wire so the install disappears during the day." },
  { n: "04", title: "Snap in the lights", body: "Pre-wired 24V RGBW pucks press into the channel. No soldering. Use the extension cables to bridge sections (over windows, around dormers)." },
  { n: "05", title: "Wire the controller", body: "Plug the WiFi controller into a GFCI receptacle (no permit required for plug-in 24V systems). Included fuses protect each output channel." },
  { n: "06", title: "Pair with the WLED app", body: "Free Android & iOS app. Connect to your home WiFi. Pick a holiday scene, dial in a custom color, set sunset triggers. 16M colors. Control from anywhere." }
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow text-[var(--color-brand)]">How they work</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
        From box to <span className="gradient-text">roofline</span> in a weekend.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
        Illumi Track Lights kits are designed so a comfortable DIYer can install a pro-grade permanent
        lighting system without hiring an electrician. Here&rsquo;s the full process from order to first
        scene.
      </p>

      <ol className="mt-12 space-y-4">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <div className="flex items-start gap-5">
              <span className="font-display grid size-12 shrink-0 place-items-center rounded-full gradient-cyan-green text-lg font-bold text-white">
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
        <h2 className="font-display mt-2 text-2xl">Pick the right kit for your home.</h2>
        <p className="mt-2 text-slate-700">Or talk to us — we&rsquo;ll size it for you in under five minutes.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">Pick a kit →</Link>
          <Link href="/contact-us" className="btn-secondary">Talk to us</Link>
        </div>
      </div>
    </div>
  );
}
