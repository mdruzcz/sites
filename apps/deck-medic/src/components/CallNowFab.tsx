import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call Deck Medic now: ${site.phone}`}
      className="fixed bottom-6 right-6 z-50 flex lg:hidden items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-white text-sm shadow-2xl min-h-11 transition-transform hover:scale-105"
      style={{ background: "var(--blue)" }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01L6.62 10.79z" />
      </svg>
      Call Now
    </a>
  );
}
