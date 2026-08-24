import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

export function SectionHeading({
  title,
  sub,
  href,
  hrefLabel,
  as: Tag = "h2"
}: {
  title: string;
  sub?: string;
  href?: string;
  hrefLabel?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-6">
      <div className="min-w-0">
        <Tag className="text-[22px] sm:text-[26px] font-bold">{title}</Tag>
        {sub ? <p className="mt-1.5 text-[15px] text-[var(--muted)] max-w-2xl">{sub}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold underline decoration-1 underline-offset-4 hover:text-[var(--accent)]"
        >
          {hrefLabel ?? "See all"}
          <Icon name="arrowRight" size={15} strokeWidth={2} />
        </Link>
      ) : null}
    </div>
  );
}

/** The responsive card grid used on every listing surface. */
export function PropertyGrid({
  properties,
  emptyNote = "No homes are listed for this yet."
}: {
  properties: Property[];
  emptyNote?: string;
}) {
  if (!properties.length) {
    return (
      <div className="card card-pad text-center">
        <span className="mx-auto grid place-items-center rounded-full bg-[var(--surface-2)] text-[var(--muted)]" style={{ width: 48, height: 48 }}>
          <Icon name="home" size={22} />
        </span>
        <p className="mt-3 text-[15px] font-semibold">{emptyNote}</p>
        <p className="mt-1 text-[14px] text-[var(--muted)]">
          Tell us what you need and we will check what is opening up.
        </p>
        <Link href="/contact" className="btn btn-outline btn-sm mt-4">
          Tell us what you need
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((p, i) => (
        <PropertyCard key={p.id} property={p} priority={i < 4} />
      ))}
    </div>
  );
}

/** A three-across explanatory row — used by "how it works" style sections. */
export function StepGrid({
  steps
}: {
  steps: { icon: string; title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-8 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span
            className="grid place-items-center rounded-full mb-4"
            style={{ width: 48, height: 48, background: "var(--accent-soft)", color: "var(--accent-dark)" }}
            aria-hidden="true"
          >
            <Icon name={s.icon} size={22} strokeWidth={1.8} />
          </span>
          <h3 className="text-[17px] font-bold">
            <span className="text-[var(--muted)] tabular-nums mr-2">{i + 1}.</span>
            {s.title}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
