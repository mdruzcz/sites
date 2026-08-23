import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { ProductsMenu } from "@/components/ProductsMenu";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";

const NAV = [
  { label: "Installation", href: "/installation" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 shadow-[0_1px_0_rgba(255,255,255,0.6),0_6px_24px_-18px_rgba(22,32,26,0.4)] backdrop-blur-md">
      {/* Announcement bar */}
      <div className="bg-[var(--color-ink-deep)] px-4 py-2 text-center text-[11px] tracking-wide text-white/80">
        <span className="eyebrow-star inline-flex font-semibold text-[var(--color-gold-bright)]">
          Booking {site.season.bookingOpens}
        </span>
        <span className="mx-2 text-white/25">·</span>
        <span>Installs {site.season.installWindow}</span>
        <span className="mx-2 hidden text-white/25 sm:inline">·</span>
        <span className="hidden sm:inline">Serving Southwestern Ontario</span>
      </div>

      <div className="shell flex items-center justify-between gap-4 py-3.5">
        <Link href="/" aria-label={`${site.name} home`} className="mr-auto flex shrink-0 items-center gap-2.5">
          <BrandMark className="size-9 shrink-0 md:size-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.1rem] tracking-tight md:text-[1.3rem]">
              Commercial <span className="text-[var(--color-green-text)]">Holiday Decor</span>
            </span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Southwestern Ontario
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex xl:gap-8" aria-label="Primary">
          <ProductsMenu />
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="link-underline whitespace-nowrap font-medium transition hover:text-[var(--color-green-text)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-text)] shadow-[var(--shadow-xs)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)] xl:inline-flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--color-green-text)]">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {site.phone}
          </a>
          <Link href="/quote" className="btn-ember hidden whitespace-nowrap md:inline-flex">
            {site.quote.cta}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
