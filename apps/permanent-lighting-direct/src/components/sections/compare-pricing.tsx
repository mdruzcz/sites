import Link from "next/link";

export function ComparePricing() {
  const rows = [
    {
      tier: "Pro install (Trimlight, Jellyfish)",
      price: "$25–40 / ft",
      install: "Contractor crew",
      hardware: "Pro-grade",
      support: "Service contract",
      tone: "neutral"
    },
    {
      tier: "Permanent Lighting Direct (DIY)",
      price: "$9–12 / ft",
      install: "You — in a weekend",
      hardware: "Pro-grade, same components",
      support: "Real human, fast email",
      tone: "highlight"
    },
    {
      tier: "Basic Amazon kits (Govee, Eufy)",
      price: "$2–4 / ft",
      install: "Adhesive sticks visible wires",
      hardware: "Consumer-grade",
      support: "Boilerplate / none",
      tone: "neutral"
    }
  ];

  return (
    <section className="bg-[var(--color-night)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow text-[var(--color-accent)]">Honest comparison</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">
          You don&rsquo;t need to pay a contractor.<br />
          <span className="text-[var(--color-accent)]">You don&rsquo;t want the cheap stuff either.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Permanent Lighting Direct sits between the two &mdash; same gear pros install, but you DIY it.
          Aluminum track hides the wire. Real support. Pro-grade LEDs that last 50,000 hours.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Option</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3 hidden md:table-cell">Installation</th>
                <th className="px-5 py-3 hidden md:table-cell">Hardware</th>
                <th className="px-5 py-3 hidden lg:table-cell">Support</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const highlight = r.tone === "highlight";
                return (
                  <tr
                    key={r.tier}
                    className={`border-t border-white/10 ${
                      highlight ? "bg-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]" : ""
                    }`}
                  >
                    <td className={`px-5 py-4 ${highlight ? "font-semibold text-white" : "text-slate-200"}`}>
                      {r.tier}
                    </td>
                    <td className={`px-5 py-4 font-semibold ${highlight ? "text-[var(--color-accent)]" : "text-slate-300"}`}>
                      {r.price}
                    </td>
                    <td className="px-5 py-4 hidden text-slate-400 md:table-cell">{r.install}</td>
                    <td className="px-5 py-4 hidden text-slate-400 md:table-cell">{r.hardware}</td>
                    <td className="px-5 py-4 hidden text-slate-400 lg:table-cell">{r.support}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/diy-kits" className="btn-accent">
            See the DIY kits →
          </Link>
          <Link href="/installers" className="btn-ghost-light">
            Rather hire someone? Find an installer
          </Link>
        </div>
      </div>
    </section>
  );
}
