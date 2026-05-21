import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="bg-midnight-700 border-y border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {site.trustBadges.map((badge) => (
            <div key={badge.label} className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none mb-1.5">
                {badge.value}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted">
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
