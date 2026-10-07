import { site } from "@/lib/site";
import { Icon } from "./Icons";

/** Mobile tap-to-call FAB. Dark ink on teal (white on teal fails AA). */
export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} now at ${site.phone}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[var(--accent)] text-[#04121a] rounded-full px-5 min-h-[52px] font-bold text-sm transition-transform hover:scale-105 active:scale-100 lg:hidden glow-pulse"
    >
      <Icon.Phone width={18} height={18} strokeWidth={2.4} />
      Call Now
    </a>
  );
}
