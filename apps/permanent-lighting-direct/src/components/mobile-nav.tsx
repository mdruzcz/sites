"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderSearch } from "@/components/header-search";
import { SHOP_COLUMNS } from "@/components/mega-menu";

const PRIMARY = [
  { label: "Kits", href: "/diy-kits" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guides", href: "/resources" },
  { label: "Compare", href: "/compare" },
  { label: "Installers", href: "/installers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact-us" }
];

/** Menu + search toggles for small screens. Panels are portaled to <body> so the
 *  blurred sticky header cannot become their containing block. */
export function MobileNav({ storeId }: { storeId: string }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const iconBtn = "grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20";

  return (
    <>
      <button type="button" aria-label={search ? "Close search" : "Search"} aria-expanded={search} onClick={() => { setSearch((s) => !s); setMenu(false); }} className={`${iconBtn} lg:hidden`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
      <button type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => { setMenu((m) => !m); setSearch(false); }} className={`${iconBtn} lg:hidden`}>
        {menu ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        )}
      </button>

      {mounted && search && createPortal(
        <div className="fixed inset-x-0 top-[var(--header-h)] z-40 border-b border-white/10 bg-[var(--color-ink)] px-4 py-3 lg:hidden">
          <HeaderSearch variant="panel" autoFocus storeId={storeId} onNavigate={() => setSearch(false)} />
        </div>,
        document.body
      )}

      {mounted && menu && createPortal(
        <div className="fixed inset-0 top-[var(--header-h)] z-40 overflow-y-auto bg-[var(--color-ink)] text-white lg:hidden">
          <nav aria-label="Mobile" className="shell py-6">
            <ul className="divide-y divide-white/10">
              {PRIMARY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="flex min-h-[52px] items-center text-lg font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {SHOP_COLUMNS.map((col) => (
                <div key={col.title}>
                  <Link href={col.href} onClick={() => setMenu(false)} className="eyebrow text-[var(--color-gold)]">{col.title}</Link>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} onClick={() => setMenu(false)} className="block min-h-[40px] py-2 text-sm text-white/80">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/diy-kits" onClick={() => setMenu(false)} className="btn-primary">Pick a kit</Link>
              <Link href="/account" onClick={() => setMenu(false)} className="btn-ghost-light">Account</Link>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
