import { site } from "@/lib/site";

/** Sticky mobile call button — required on every site in the fleet. */
export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} at ${site.phone}`}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[var(--color-green)] px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(22,32,26,0.32)] transition hover:bg-[var(--color-green-dark)] md:hidden"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Call now
    </a>
  );
}
