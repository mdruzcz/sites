"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { NAV_LINKS } from "@/components/Header";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const drawer = (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      />
      <nav
        className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] overflow-y-auto bg-[var(--surface)] p-6"
        style={{ boxShadow: "var(--shadow-xl)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-[15px] font-bold">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid place-items-center rounded-full border"
            style={{ width: 44, height: 44, borderColor: "var(--line)" }}
          >
            <Icon name="close" size={18} strokeWidth={2} />
          </button>
        </div>

        <ul className="space-y-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center rounded-[var(--r-sm)] px-3 text-[16px] font-semibold hover:bg-[var(--surface-2)]"
                style={{ minHeight: 48 }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-5 rule" />

        <Link href="/list-your-property" className="btn btn-primary w-full">
          {site.cta.ownerLong}
        </Link>

        <a href={site.phoneHref} className="btn btn-quiet w-full mt-3">
          <Icon name="phone" size={16} strokeWidth={2} />
          {site.phone}
        </a>

        <a
          href={site.emailHref}
          className="mt-5 flex items-center gap-2 text-[14px] text-[var(--muted)] hover:text-[var(--ink)]"
        >
          <Icon name="mail" size={16} />
          {site.email}
        </a>
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden grid place-items-center rounded-full border no-tap-highlight"
        style={{ width: 44, height: 44, borderColor: "var(--line)" }}
      >
        <Icon name="menu" size={18} strokeWidth={2} />
      </button>

      {/* Portalled to <body>: a fixed drawer nested inside a sticky, filtered
          or transformed ancestor would be positioned against that ancestor
          instead of the viewport. */}
      {mounted && open ? createPortal(drawer, document.body) : null}
    </>
  );
}
