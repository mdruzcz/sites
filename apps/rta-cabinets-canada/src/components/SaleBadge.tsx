import { formatMoney, type Pricing } from "@/lib/sale";

/** Red "sticker" used on cards, product pages, the planner and the cart. */
export function SaleBadge({ text, className = "", size = "md" }: { text: string; className?: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "px-3 py-1.5 text-sm" : size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-red-600 font-bold uppercase tracking-wider text-white shadow-sm ring-2 ring-white ${sz} ${className}`}
      aria-label={`Sale: ${text}`}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.4 11.6 12.4 2.6A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8ZM7 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
      </svg>
      {text}
    </span>
  );
}

/** List price struck through + sale price, or the plain price when not on sale. */
export function PriceTag({ pricing, fallback, suffix = "", size = "md", className = "" }: { pricing: Pricing | null; fallback: string; suffix?: string; size?: "md" | "lg"; className?: string }) {
  const big = size === "lg" ? "text-3xl font-bold" : "font-semibold";
  if (!pricing) return <p className={`${big} ${className}`}>{fallback}</p>;
  if (!pricing.onSale)
    return (
      <p className={`${big} ${className}`}>
        {formatMoney(pricing.price)}
        {suffix}
      </p>
    );
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className={`${big} text-red-700`}>
        {formatMoney(pricing.price)}
        {suffix}
      </span>
      <s className={`${size === "lg" ? "text-lg" : "text-sm"} text-ink-soft`} aria-label={`Regular price ${formatMoney(pricing.list)}`}>
        {formatMoney(pricing.list)}
      </s>
      <span className="text-xs font-semibold text-red-700">Save {pricing.pct}%</span>
    </p>
  );
}
