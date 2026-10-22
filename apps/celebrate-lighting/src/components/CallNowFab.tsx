"use client";

import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { useAiPreview } from "./AiPreviewProvider";

/** Mobile FAB: opens the Free AI Preview popup. Dark ink on teal (white on teal fails AA). */
export function CallNowFab() {
  const { open } = useAiPreview();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={site.aiPreview.cta}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[var(--accent)] text-[#04121a] rounded-full px-5 min-h-[52px] font-bold text-sm transition-transform hover:scale-105 active:scale-100 lg:hidden glow-pulse"
    >
      <Icon.Sparkle width={18} height={18} strokeWidth={2.4} />
      Free AI Preview
    </button>
  );
}
