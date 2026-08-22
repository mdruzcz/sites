import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  // Show the supplied PNG logo if one was dropped at public/images/logo.png,
  // otherwise fall back to the styled wordmark.
  const hasLogo = existsSync(join(process.cwd(), "public", "images", "logo.png"));

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="bg-[var(--color-ink-deep)] px-4 py-2 text-center text-[11px] tracking-wide text-white/80">
        <span className="font-semibold text-[var(--color-gold-bright)]">FIRST10</span>
        <span className="mx-2 text-white/25">·</span>
        <span>10% off your first order</span>
        <span className="mx-2 text-white/25">·</span>
        <span className="font-semibold text-[var(--color-gold-bright)]">Free shipping over $500</span>
        <span className="mx-2 hidden text-white/25 sm:inline">·</span>
        <span className="hidden sm:inline">Ships from London, Ontario</span>
      </div>

      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" aria-label="Holiday Lights Direct home" className="flex shrink-0 items-center gap-2">
          {hasLogo ? (
            <Image
              src="/images/logo.png"
              alt="Holiday Lights Direct"
              width={320}
              height={130}
              priority
              className="h-12 w-auto md:h-14"
            />
          ) : (
            <span className="font-display text-[1.4rem] leading-none tracking-tight text-[var(--color-text)] md:text-2xl">
              Holiday Lights <span className="text-[var(--color-gold-text)]">Direct</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          <Link
            href="/permanent-lights"
            className="font-semibold text-[var(--color-gold-text)] transition hover:text-[var(--color-gold-dark)]"
          >
            Permanent Lights
          </Link>
          <MegaMenu />
          <Link href="/professional-installer" className="font-medium transition hover:text-[var(--color-gold-text)]">
            Pro Installers
          </Link>
          <Link href="/municipalities" className="font-medium transition hover:text-[var(--color-gold-text)]">
            Municipalities
          </Link>
          <Link href="/faq" className="font-medium transition hover:text-[var(--color-gold-text)]">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/account"
            className="hidden items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-soft)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold-text)] md:inline-flex"
          >
            Account
          </Link>
          <CartBadge />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
