import { site } from "@/lib/site";

export default function TrustBar() {
  return (
    <section className="bg-[var(--charcoal)] py-6">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {site.trustBadges.map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="text-[var(--accent)] font-bold text-xl md:text-2xl font-[var(--font-montserrat)] mb-1">
                {badge.value}
              </p>
              <p className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wide">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
