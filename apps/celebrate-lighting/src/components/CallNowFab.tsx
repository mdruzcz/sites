import { site } from "@/lib/site";

/**
 * Mobile tap-to-call FAB.
 *
 * Dark ink on teal, not white — teal #24C1B1 is light enough that white
 * text only reaches ~2.25:1, well under WCAG AA. #04121a clears 8:1 and
 * matches .btn-primary.
 */
export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} now at ${site.phone}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--accent)] text-[#04121a] rounded-full px-5 min-h-[52px] font-bold text-sm transition-transform hover:scale-105 active:scale-100 lg:hidden"
      style={{ boxShadow: "0 10px 30px -6px rgba(36,193,177,0.55), 0 0 0 1px rgba(36,193,177,0.9)" }}
    >
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      Call Now
    </a>
  );
}
