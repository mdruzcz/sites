"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 hover:bg-[var(--accent-dark)] transition-colors md:hidden"
      aria-label={`Call ${site.name} now`}
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
