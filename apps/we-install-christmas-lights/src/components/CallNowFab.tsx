"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PhoneIcon } from "./icons";
import { site } from "@/lib/site";

export function CallNowFab() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Link
      href={site.phoneHref}
      aria-label={`Call ${site.phone}`}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--brand-red)] text-white shadow-2xl font-bold uppercase text-xs tracking-wider lg:hidden transition-all ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      <PhoneIcon className="w-4 h-4" />
      Call Now
    </Link>
  );
}
