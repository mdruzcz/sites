"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";

/**
 * Sticky mobile call button. Hidden inside the admin, where the phone number
 * is noise and the button would cover the photo grid.
 */
export function CallNowFab() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={site.phoneHref}
      className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-[var(--r-pill)] px-5 font-semibold no-tap-highlight"
      style={{
        minHeight: 52,
        background: "var(--accent)",
        color: "var(--on-accent)",
        boxShadow: "var(--shadow-xl)"
      }}
      aria-label={`Call ${site.name} at ${site.phone}`}
      data-gtm="call-fab"
    >
      <Icon name="phone" size={18} strokeWidth={2.2} />
      Call now
    </a>
  );
}
