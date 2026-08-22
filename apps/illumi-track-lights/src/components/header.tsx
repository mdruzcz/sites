import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  const hasLogo = existsSync(join(process.cwd(), "public", "images", "logo.jpg"));

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="bg-[var(--color-ink-deep)] px-4 py-2 text-center text-[11px] tracking-wide text-white/80">
        <span className="font-semibold text-[var(--color-amber-bright)]">ILLUMI10</span>
        <span className="mx-2 text-white/25">·</span>
        <span>10% off your first order</span>
        <span className="mx-2 text-white/25">·</span>
        <span className="font-semibold text-[var(--color-amber-bright)]">Free shipping over $500</span>
        <span className="mx-2 hidden text-white/25 sm:inline">·</span>
        <span className="hidden sm:inline">Ships from London, Ontario</span>
      </div>

      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" aria-label="Illumi Track Lights home" className="flex shrink-0 items-center gap-3">
          {hasLogo ? (
            <Image
              src="/images/logo.jpg"
              alt="Illumi Track Lights"
              width={220}
              height={150}
              priority
              className="h-11 w-auto md:h-12"
            />
          ) : (
            <span className="font-display text-xl tracking-tight text-[var(--color-text)] md:text-2xl">
              Illumi <span className="text-[var(--color-amber-text)]">Track Lights</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          <Link
            href="/diy-kits"
            className="font-semibold text-[var(--color-amber-text)] transition hover:text-[var(--color-amber-dark)]"
          >
            Soffit Track Kits
          </Link>
          <MegaMenu />
          <Link href="/how-it-works" className="font-medium transition hover:text-[var(--color-amber-text)]">
            How They Work
          </Link>
          <Link href="/installers" className="font-medium transition hover:text-[var(--color-amber-text)]">
            Installers
          </Link>
          <Link href="/faq" className="font-medium transition hover:text-[var(--color-amber-text)]">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/account"
            className="hidden items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-soft)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber-text)] md:inline-flex"
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
