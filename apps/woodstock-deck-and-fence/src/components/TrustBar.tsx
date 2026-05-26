import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {site.trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-sans">
                {badge.value}
              </p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--concrete)] mt-1">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
