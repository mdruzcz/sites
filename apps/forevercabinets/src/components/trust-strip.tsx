import { SITE, formatCad } from "@/lib/utils";

export function TrustStrip() {
  const items = [
    { icon: "🚚", text: `Free local shipping over ${formatCad(SITE.freeLocalShippingThreshold)} in SW Ontario` },
    { icon: "📦", text: `${SITE.leadTime} lead time` },
    { icon: "✓", text: SITE.returnsWindow },
    { icon: "💬", text: "Talk to a human" },
  ];
  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
      <div className="mx-auto max-w-6xl px-4 py-2.5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[13px] text-[var(--color-ink-soft)]">
          {items.map((i) => (
            <li key={i.text} className="flex items-center gap-1.5">
              <span aria-hidden="true">{i.icon}</span>
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
