import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <div className="bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {site.trustBadges.map((b) => (
            <div key={b.label}>
              <p className="text-xl font-extrabold text-[var(--green)]">{b.value}</p>
              <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mt-0.5">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
