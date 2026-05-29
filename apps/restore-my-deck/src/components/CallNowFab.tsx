import { site } from "@/lib/site";

export default function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--accent)] text-white font-bold px-4 py-3 rounded-full shadow-xl hover:bg-[var(--accent-hover)] transition-colors md:hidden min-h-[44px]"
      aria-label="Call Restore My Deck"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z"/>
      </svg>
      Call Now
    </a>
  );
}
