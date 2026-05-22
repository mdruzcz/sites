import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {site.trustBadges.map((badge) => (
            <div key={badge.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] tracking-tight">
                {badge.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mt-1">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
