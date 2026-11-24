import Link from "next/link";

export interface ChipLink {
  label: string;
  href: string;
  active?: boolean;
}

/**
 * Horizontal, swipeable row of category chips. On a phone this is the fastest
 * way around the catalogue, so it sits directly under the page hero.
 */
export function CategoryChips({ label, items }: { label: string; items: ChipLink[] }) {
  return (
    <nav aria-label={label} className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="shell">
        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          {items.map((i) => (
            <li key={i.href} className="flex-none">
              <Link href={i.href} className="chip" aria-current={i.active ? "page" : undefined}>
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
