import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="Ready Kitchens home">
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-[var(--color-ink)] text-[var(--color-paper)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      </span>
      <span className="font-display text-xl leading-none">
        Ready<span className="text-[var(--color-accent)]">Kitchens</span>
      </span>
    </Link>
  );
}
