import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <div className="bg-[var(--charcoal)] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {site.trustBadges.map((badge) => (
            <div key={badge.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] leading-none">{badge.value}</p>
              <p className="text-xs uppercase tracking-widest text-[var(--concrete-200)] mt-1">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
