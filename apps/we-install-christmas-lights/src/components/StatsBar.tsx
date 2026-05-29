import { site } from "@/lib/site";

export function StatsBar() {
  return (
    <section className="bg-[color:var(--bg-soft)] border-y border-[color:var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {site.stats.map((s) => (
            <div key={s.label}>
              <div className="heading-display text-4xl sm:text-5xl text-[color:var(--brand-green)]">
                {s.number}
              </div>
              <p className="mt-2 text-sm sm:text-base font-semibold uppercase tracking-wide text-[color:var(--ink-soft)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
