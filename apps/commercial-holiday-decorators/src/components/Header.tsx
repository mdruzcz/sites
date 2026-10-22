"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

const SERVICES = [
  { label: "Interior Holiday Decor", href: "/services/interior-holiday-decor", desc: "Lobbies, atriums, receptions, staircases" },
  { label: "Commercial Christmas Lights", href: "/services/commercial-christmas-light-installation", desc: "Rooflines, canopies, trees, courtyards" },
  { label: "Lobby Tree Rental & Setup", href: "/services/lobby-christmas-tree-rental", desc: "Pre-lit 7 to 20+ ft, decorated and removed" },
  { label: "Wreaths, Garland & Planters", href: "/services/wreaths-garland-planters", desc: "Entrances, railings, columns, urns" },
  { label: "Turnkey Decor Leasing", href: "/services/turnkey-holiday-decor-leasing", desc: "One seasonal price, multi-year options" },
  { label: "Takedown & Storage", href: "/services/takedown-and-storage", desc: "January removal, labelled storage" },
  { label: "Seasonal Maintenance", href: "/services/seasonal-maintenance", desc: "Included on every program" },
  { label: "Custom Displays & Light Shows", href: "/services/custom-displays-and-light-shows", desc: "Santa sets, villages, giant trees" },
];

type MenuId = "services" | "sectors";
type Item = { label: string; href: string; desc: string };

function Dropdown({ id, label, items, active, wide, menu, setMenu }: { id: MenuId; label: string; items: readonly Item[]; active: boolean; wide?: boolean; menu: MenuId | null; setMenu: (m: MenuId | null | ((m: MenuId | null) => MenuId | null)) => void }) {
  return (
    <div className="relative" onMouseEnter={() => setMenu(id)} onMouseLeave={() => setMenu(null)}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-2.5 h-12 text-[0.875rem] font-semibold whitespace-nowrap transition-colors ${active ? "text-[var(--accent-ink)]" : "text-body hover:text-ink"}`}
        aria-expanded={menu === id}
        onClick={() => setMenu((m) => (m === id ? null : id))}
      >
        {label} <Icon.Chevron width={14} height={14} />
      </button>
      {menu === id && (
        <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-1 ${wide ? "w-[40rem]" : "w-[23rem]"} pop-in z-50`}>
          <div className={`card card-static p-2 shadow-2xl ${wide ? "grid grid-cols-2 gap-1" : ""}`}>
            {items.map((s) => (
              <Link key={s.href} href={s.href} className="flex flex-col gap-0.5 rounded-xl px-4 py-3 hover:bg-[var(--surface)]">
                <span className="font-semibold text-ink">{s.label}</span>
                <span className="text-xs text-[var(--muted)]">{s.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Single-row header: logo left, nav with two dropdowns (Services, Who we serve),
 * phone + quote CTA right. Mobile: hamburger left, logo centre, call icon right.
 * The mobile drawer is a sibling of the blurred bar so backdrop-filter never clips it.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const pathname = usePathname();

  const [openedOn, setOpenedOn] = useState(pathname);
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
    setMenu(null);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const sectorActive = site.nav.sectors.some((s) => isActive(s.href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(255, 255, 255, 0.94)", backdropFilter: "blur(14px)", borderColor: "var(--border)" }}>
        <div className="wrap">
          <div className="flex items-center justify-between h-[64px] lg:h-[84px] gap-4">
            <button type="button" onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 rounded-xl text-ink hover:bg-[var(--surface-2)]" aria-label="Open menu" aria-expanded={open}>
              <Icon.Menu />
            </button>

            <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
              <Image src="/images/logo.png" alt={`${site.name} logo`} width={3015} height={522} className="h-9 lg:h-14 w-auto object-contain" priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              <Dropdown id="services" label="Services" items={SERVICES} active={isActive("/services")} wide menu={menu} setMenu={setMenu} />
              <Dropdown id="sectors" label="Who we serve" items={site.nav.sectors} active={sectorActive} wide menu={menu} setMenu={setMenu} />
              {site.nav.main.map((item) => (
                <Link key={item.href} href={item.href} className={`inline-flex items-center px-2.5 h-12 text-[0.875rem] font-semibold whitespace-nowrap transition-colors ${isActive(item.href) ? "text-[var(--accent-ink)]" : "text-body hover:text-ink"}`}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-2">
              <a href={site.phoneHref} className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-[var(--accent-ink)] hover:bg-[var(--surface-2)]" aria-label={`Call ${site.phone}`}>
                <Icon.Phone />
              </a>
              <a href={site.phoneHref} className="hidden 2xl:inline-flex items-center gap-2 min-h-[44px] px-2 font-semibold text-ink hover:text-[var(--accent-ink)] whitespace-nowrap">
                <Icon.Phone width={16} height={16} /> {site.phone}
              </a>
              <Link href="/contact" className="hidden lg:inline-flex btn btn-primary btn-sm whitespace-nowrap">{site.quote.cta}</Link>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto pop-in" style={{ background: "var(--bg)" }}>
            <div className="flex items-center justify-between px-4 h-[64px] border-b" style={{ borderColor: "var(--border)" }}>
              <Image src="/images/logo.png" alt={site.name} width={3015} height={522} className="h-8 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-ink hover:bg-[var(--surface-2)]" aria-label="Close menu">
                <Icon.X />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <p className="pill mb-2">Services</p>
                <ul className="space-y-0.5">
                  {SERVICES.map((s) => (
                    <li key={s.href}><Link href={s.href} className="flex items-center rounded-xl px-3 min-h-[44px] font-semibold text-ink hover:bg-[var(--surface)]">{s.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="pill mb-2">Who we serve</p>
                <ul className="space-y-0.5">
                  {site.nav.sectors.map((s) => (
                    <li key={s.href}><Link href={s.href} className="flex items-center rounded-xl px-3 min-h-[44px] font-semibold text-ink hover:bg-[var(--surface)]">{s.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="pill mb-2">Explore</p>
                <ul className="space-y-0.5">
                  {[...site.nav.main, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }].map((item) => (
                    <li key={item.href}><Link href={item.href} className="flex items-center rounded-xl px-3 min-h-[44px] font-semibold text-body hover:text-ink hover:bg-[var(--surface)]">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 pt-2">
                <Link href="/contact" className="btn btn-primary w-full">{site.quote.ctaLong}</Link>
                <a href={site.phoneHref} className="btn btn-outline w-full"><Icon.Phone width={16} height={16} /> {site.phone}</a>
              </div>
              <p className="text-xs text-[var(--muted)] text-center">{site.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
