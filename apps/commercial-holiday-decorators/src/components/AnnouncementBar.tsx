import Link from "next/link";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="text-xs sm:text-sm text-center px-3 min-h-[40px] flex flex-wrap items-center justify-center gap-x-2" style={{ background: "var(--deep)", color: "#fff" }}>
      <span className="font-semibold">{site.bookingBanner}.</span>
      <span className="hidden sm:inline text-white/80">{site.bannerDetail}</span>
      <Link href="/contact" className="font-bold underline underline-offset-2 inline-flex items-center min-h-[40px] px-1" style={{ color: "#e9c66f" }}>
        {site.quote.cta}
      </Link>
    </div>
  );
}
