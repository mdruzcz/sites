"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  links: { label: string; href: string }[];
  phone: string | null;
  phoneHref: string | null;
}

export function MobileMenu({ links, phone, phoneHref }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className="icon-btn lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--ink-deep)] text-white lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-black uppercase tracking-[0.16em] text-white/60">Menu</span>
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-[56px] items-center border-b border-white/10 text-2xl font-black tracking-tight">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 p-5">
            <Link href="/contact#quote" className="btn btn-cta w-full">
              Get a quote <span aria-hidden>→</span>
            </Link>
            {phone && phoneHref && (
              <a href={phoneHref} className="btn btn-ghost w-full">
                Call {phone}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
