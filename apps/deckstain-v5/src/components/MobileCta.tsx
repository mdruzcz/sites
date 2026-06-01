import Link from "next/link";
import { SITE } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-2 bg-white border-t border-[var(--hair)] shadow-[0_-8px_24px_rgba(20,36,26,.1)]">
        <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 py-3 font-semibold text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>
          <svg className="w-5 h-5 text-[var(--green)]" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
          Call Now
        </a>
        <Link href="/contact" className="flex items-center justify-center gap-2 py-3 font-semibold text-sm text-white bg-[var(--green)]" style={{ fontFamily: "var(--font-head)" }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Free Quote
        </Link>
      </div>
    </div>
  );
}
