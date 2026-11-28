"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderSearch } from "@/components/header-search";
import { PRIMARY_LINKS, SHELF_LINKS, UTILITY_LINKS } from "@/lib/nav";

/** Menu + search toggles for small screens. Panels are portaled to <body> so the
 *  sticky header can never become their containing block. */
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

  const iconBtn = "grid size-11 place-items-center text-[var(--color-text)] transition hover:text-[var(--color-accent)]";
  const close = () => setMenu(false);

  return (
    <>
      <button type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => { setMenu((m) => !m); setSearch(false); }} className={`${iconBtn} -ml-2.5`}>
        {menu ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        )}
      </button>
      <button type="button" aria-label={search ? "Close search" : "Search"} aria-expanded={search} onClick={() => { setSearch((s) => !s); setMenu(false); }} className={iconBtn}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>

      {mounted && search && createPortal(
        <div className="fixed inset-x-0 top-[var(--header-h)] z-40 border-b border-[var(--color-border)] bg-white px-4 py-3 shadow-[var(--shadow-md)] lg:hidden">
          <HeaderSearch variant="panel" autoFocus storeId={storeId} onNavigate={() => setSearch(false)} />
        </div>,
        document.body
      )}

      {mounted && menu && createPortal(
        <div className="fixed inset-0 top-[var(--header-h)] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="shell pb-16 pt-4">
            <ul className="divide-y divide-[var(--color-border)] border-b border-[var(--color-border)]">
              {PRIMARY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="flex min-h-[52px] items-center text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 text-[var(--color-gold-text)]">Straight to a shelf</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {SHELF_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="flex min-h-[44px] items-center text-[0.95rem] text-[var(--color-text-soft)]">{l.label}</Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 text-[var(--color-gold-text)]">Help</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {[...UTILITY_LINKS, { label: "Track Order", href: "/track-order" }, { label: "Questions & Answers", href: "/faq" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="flex min-h-[44px] items-center text-[0.95rem] text-[var(--color-text-soft)]">{l.label}</Link>
                </li>
              ))}
            </ul>

            <p className="note mt-7">
              <strong>Every order ships free</strong> anywhere in Canada, or pick it up free at 631 Peel Street, Woodstock.
            </p>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
