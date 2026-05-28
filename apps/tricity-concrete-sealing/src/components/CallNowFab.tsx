import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.emailHref}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--accent)] text-white font-bold text-sm px-4 py-3 rounded-full shadow-lg hover:bg-[var(--accent-600)] transition-all hover:-translate-y-0.5 sm:hidden"
      aria-label="Email TriCity Concrete Sealing"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Get a Free Quote
    </a>
  );
}
