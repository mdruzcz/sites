"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[#0F0F10] shadow-lg shadow-[var(--accent)]/25 hover:bg-[var(--accent-600)] transition-colors md:hidden"
      aria-label={`Call ${site.name}`}
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
