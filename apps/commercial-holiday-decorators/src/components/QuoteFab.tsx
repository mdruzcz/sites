import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

/** Mobile floating call button. */
export function QuoteFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} at ${site.phone}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[var(--accent)] text-white rounded-full px-5 min-h-[52px] font-bold text-sm transition-transform hover:scale-105 active:scale-100 lg:hidden glow-pulse"
    >
      <Icon.Phone width={18} height={18} strokeWidth={2.4} />
      Call {site.phone}
    </a>
  );
}

export function QuoteLink({ className = "btn btn-primary", label }: { className?: string; label?: string }) {
  return (
    <Link href="/contact" className={className}>
      {label ?? site.quote.cta} <Icon.Arrow width={16} height={16} />
    </Link>
  );
}
