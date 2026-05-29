import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold text-white text-sm shadow-2xl lg:hidden min-h-11"
      style={{
        background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
        boxShadow: "0 8px 32px rgba(178,34,34,0.6)",
      }}
      aria-label={`Call Festive Holiday Lighting at ${site.phone}`}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      Call Now
    </a>
  );
}
