import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { ProductsMenu } from "@/components/ProductsMenu";
import { site } from "@/lib/site";

const NAV = [
  { label: "Installation", href: "/installation" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="bg-[var(--color-ink-deep)] px-4 py-2 text-center text-[11px] tracking-wide text-white/80">
        <span className="font-semibold text-[var(--color-gold-bright)]">Booking {site.season.bookingOpens}</span>
        <span className="mx-2 text-white/25">·</span>
        <span>Installs {site.season.installWindow}</span>
        <span className="mx-2 hidden text-white/25 sm:inline">·</span>
        <span className="hidden sm:inline">Serving Southwestern Ontario</span>
      </div>

      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" aria-label={`${site.name} home`} className="mr-auto flex shrink-0 flex-col leading-none">
          <span className="font-display text-[1.15rem] tracking-tight md:text-[1.35rem]">
            Commercial <span className="text-[var(--color-green-text)]">Holiday Decor</span>
          </span>
          <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Southwestern Ontario
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex xl:gap-8" aria-label="Primary">
          <ProductsMenu />
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap font-medium transition hover:text-[var(--color-green-text)]">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)] xl:inline-flex"
          >
            {site.phone}
          </a>
          <Link href="/quote" className="btn-primary hidden whitespace-nowrap md:inline-flex">
            {site.quote.cta}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
