import Link from "next/link";
import { site } from "@/lib/site";

/** Mobile-only bottom action bar: call + quote. Always visible, 44px+ targets. */
export default function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[var(--line)] bg-paper md:hidden" role="region" aria-label="Quick actions">
      <a href={site.phoneHref} className="flex min-h-[56px] items-center justify-center gap-2 bg-ink font-display text-[13px] font-bold uppercase tracking-[0.12em] text-paper">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
        Call now
      </a>
      <Link href="/contact-us#quote" className="flex min-h-[56px] items-center justify-center bg-accent font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink">Free quote</Link>
    </div>
  );
}
