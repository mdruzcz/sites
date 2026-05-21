import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} now`}
      className="lg:hidden fixed bottom-5 right-5 z-40 text-white rounded-full px-5 py-4 flex items-center gap-2 font-semibold shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)",
        boxShadow: "0 8px 32px rgba(0, 229, 255, 0.5)",
      }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>Call Now</span>
    </a>
  );
}
