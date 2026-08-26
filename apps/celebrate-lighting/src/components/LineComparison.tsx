import Link from "next/link";

/**
 * Permanent vs seasonal, side by side. Rendered on both pillar pages at
 * #compare (the fork links straight to it) so whichever page someone lands
 * on, they can sanity-check they're on the right one.
 *
 * `highlight` dims the column for the page you're already on and keeps the
 * emphasis on the alternative — the point of the table is to catch people
 * on the wrong page, not to re-sell the one they're reading.
 */
const ROWS = [
  {
    label: "How long it's up",
    permanent: "Year-round, permanently installed",
    seasonal: "Installed in the fall, removed in January",
  },
  {
    label: "The look",
    permanent: "Small colour-matched LEDs in the soffit line",
    seasonal: "Classic large C9 bulbs along the roof edge",
  },
  {
    label: "What you pay",
    permanent: "One-time install cost, no annual bill",
    seasonal: "Per-season price, every season",
  },
  {
    label: "Colours",
    permanent: "16 million+, changed from an app in seconds",
    seasonal: "Chosen once at install — warm white or classic multicolour",
  },
  {
    label: "Beyond Christmas",
    permanent: "Halloween, Canada Day, game day, everyday warm white",
    seasonal: "Holiday season only",
  },
  {
    label: "Takedown & storage",
    permanent: "Nothing to take down, ever",
    seasonal: "We remove it — and store it on the rental plan",
  },
  {
    label: "Warranty / service",
    permanent: "Lifetime warranty on parts and workmanship",
    seasonal: "In-season service calls included",
  },
  {
    label: "Best if you're…",
    permanent: "Staying put and want it lit all year",
    seasonal: "Renting, moving soon, or only want December",
  },
];

export function LineComparison({ highlight }: { highlight?: "permanent-lighting" | "seasonal-lighting" }) {
  const cols = [
    {
      slug: "permanent-lighting" as const,
      name: "Permanent",
      sub: "Tracked LED, app-controlled",
      accent: "var(--accent)",
      key: "permanent" as const,
    },
    {
      slug: "seasonal-lighting" as const,
      name: "Seasonal C9",
      sub: "Installed & removed each year",
      accent: "var(--gold)",
      key: "seasonal" as const,
    },
  ];

  return (
    <section id="compare" className="py-20 md:py-24 scroll-mt-24" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Side by side</p>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
            Permanent vs seasonal C9
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
            Both are good options — they just answer different questions. Here&apos;s the honest difference.
          </p>
        </div>

        {/* Desktop: table. Wide content scrolls inside its own container. */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">
              Comparison of permanent LED track lighting and seasonal C9 Christmas lighting
            </caption>
            <thead>
              <tr>
                <th scope="col" className="text-left p-4 w-[22%]" />
                {cols.map((c) => (
                  <th
                    key={c.slug}
                    scope="col"
                    className="text-left p-4 align-bottom"
                    style={{
                      background: highlight === c.slug ? "var(--panel-2)" : "var(--panel)",
                      borderTop: `3px solid ${c.accent}`,
                    }}
                  >
                    <div className="font-display text-lg font-bold text-[var(--foreground)]">{c.name}</div>
                    <div className="text-xs font-normal text-[var(--muted)] mt-0.5">{c.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 ? "var(--surface-2)" : "transparent" }}>
                  <th scope="row" className="text-left p-4 font-semibold text-[var(--foreground)] align-top">
                    {row.label}
                  </th>
                  {cols.map((c) => (
                    <td
                      key={c.slug}
                      className="p-4 align-top text-[var(--muted)]"
                      style={highlight === c.slug ? { color: "var(--foreground)" } : undefined}
                    >
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards — a 3-column table is unreadable at 375px. */}
        <div className="md:hidden space-y-5">
          {cols.map((c) => (
            <div key={c.slug} className="card p-6" style={{ borderTop: `3px solid ${c.accent}` }}>
              <div className="font-display text-lg font-bold text-[var(--foreground)]">{c.name}</div>
              <div className="text-xs text-[var(--muted)] mb-4">{c.sub}</div>
              <dl className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {row.label}
                    </dt>
                    <dd className="text-sm text-[var(--foreground)] mt-0.5">{row[c.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          {cols
            .filter((c) => c.slug !== highlight)
            .map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="btn btn-outline px-8">
                Read about {c.name} lighting →
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
