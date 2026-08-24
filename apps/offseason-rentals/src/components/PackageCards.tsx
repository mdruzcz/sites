import Link from "next/link";
import { packages, type Package } from "@/lib/content";
import { Icon } from "@/components/Icon";

/**
 * The three tiers. Silver carries the "most popular" treatment because it is
 * the one being steered toward — a plain three-across grid with no anchor
 * tends to sell the cheapest option by default.
 */
function Card({ pkg, href }: { pkg: Package; href: string }) {
  const featured = pkg.popular;

  return (
    <div
      className="relative flex flex-col rounded-[var(--r-lg)] p-6 sm:p-7"
      style={{
        background: "var(--surface)",
        border: `${featured ? 2 : 1}px solid ${featured ? "var(--accent)" : "var(--line)"}`,
        boxShadow: featured ? "var(--shadow-lg)" : "none"
      }}
    >
      {featured ? (
        <span
          className="absolute -top-3 left-6 pill"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          Most popular
        </span>
      ) : null}

      <h3 className="text-[20px] font-extrabold tracking-tight">{pkg.name}</h3>
      <p className="mt-1 text-[14px] text-[var(--muted)]">{pkg.tagline}</p>

      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-[38px] font-extrabold tracking-tight leading-none">{pkg.priceLabel}</span>
        <span className="text-[15px] text-[var(--muted)]">/ {pkg.term}</span>
      </p>
      <p className="mt-1 text-[13px] text-[var(--muted)]">
        One payment. No commission on what you rent.
      </p>

      <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-soft)]">{pkg.summary}</p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[15px]">
            <Icon
              name="check"
              size={18}
              strokeWidth={2.4}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--ok)" }}
            />
            {f}
          </li>
        ))}
        {pkg.notIncluded.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[15px] text-[var(--muted)]">
            <Icon name="close" size={18} strokeWidth={2} className="mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={`${href}?tier=${pkg.slug}`}
        className={`btn ${featured ? "btn-primary" : "btn-outline"} w-full mt-6`}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}

export function PackageCards({ href = "/owners/register" }: { href?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((p) => (
        <Card key={p.slug} pkg={p} href={href} />
      ))}
    </div>
  );
}

/** Compact tier comparison for the owner dashboard's submit step. */
export function TierChooser({
  value,
  onSelect
}: {
  value: string | null;
  onSelect: (tier: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {packages.map((p) => {
        const active = value === p.slug;
        return (
          <button
            key={p.slug}
            type="button"
            onClick={() => onSelect(p.slug)}
            aria-pressed={active}
            className="rounded-[var(--r-md)] p-4 text-left transition-colors"
            style={{
              border: `${active ? 2 : 1}px solid ${active ? "var(--accent)" : "var(--line)"}`,
              background: active ? "var(--accent-soft)" : "var(--surface)"
            }}
          >
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[16px] font-bold">{p.name}</span>
              <span className="text-[18px] font-extrabold">{p.priceLabel}</span>
            </span>
            <span className="mt-1 block text-[13px] text-[var(--muted)]">
              {p.photoLimit} photos · {p.term}
            </span>
          </button>
        );
      })}
    </div>
  );
}
