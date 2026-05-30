"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold px-5 py-3.5 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 md:hidden min-h-[52px] min-w-[52px]"
      aria-label={`Call Classic Christmas Lighting at ${site.phone}`}
    >
      <Phone className="h-5 w-5 shrink-0" />
      <span className="text-sm">Call Now</span>
    </a>
  );
}
