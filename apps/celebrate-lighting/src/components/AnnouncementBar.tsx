"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { useAiPreview } from "./AiPreviewProvider";

export function AnnouncementBar() {
  const { open } = useAiPreview();
  return (
    <div className="text-xs sm:text-sm text-center px-3 py-0.5 min-h-[44px] flex flex-wrap items-center justify-center gap-x-1" style={{ background: "linear-gradient(90deg, #0e7c70, #22c1b0 50%, #0e7c70)", color: "#04121a" }}>
      <span className="font-semibold">{site.bookingBanner}.</span>{" "}
      <span className="hidden sm:inline">{site.demo.promise}</span>{" "}
      <button type="button" onClick={open} className="font-bold underline underline-offset-2 inline-flex items-center gap-1 min-h-[44px] px-1">
        <Icon.Sparkle width={14} height={14} /> Free AI preview of your home
      </button>
      <span className="hidden md:inline"> · </span>
      <Link href="/contact" className="hidden md:inline-flex items-center min-h-[44px] px-1 font-bold underline underline-offset-2">Book a demo</Link>
    </div>
  );
}
