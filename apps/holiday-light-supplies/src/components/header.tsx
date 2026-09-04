import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { SearchTrigger } from "@/components/search-trigger";
import { TruckIcon } from "@/components/truck-icon";

export function Header() {
  // Optionally show the user-supplied PNG logo if they dropped one at public/images/logo.png.
  // Otherwise we fall back to the styled-text wordmark.
  const logoFsPath = join(process.cwd(), "public", "images", "logo.png");
  const hasLogo = existsSync(logoFsPath);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="flex items-center justify-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 text-center text-[11px] tracking-wide text-[var(--color-brand)] sm:gap-3">
        <span className="font-semibold text-[var(--color-accent)]">🎁 FIRST10</span>
        <span className="text-[var(--color-brand)]/40">·</span>
        <span>10% off your first order</span>
        <span className="text-[var(--color-brand)]/40">·</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-accent)]">
          <TruckIcon className="size-4" /> Free shipping over $150
        </span>
        <span className="hidden text-[var(--color-brand)]/40 sm:inline">·</span>
        <span className="hidden sm:inline">Shipping across Ontario</span>
      </div>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Holiday Light Supplies home" className="flex items-center gap-2">
          {hasLogo ? (
            <Image
              src="/images/logo.png"
              alt="Holiday Light Supplies"
              width={320}
              height={130}
              priority
              className="h-14 w-auto md:h-16"
            />
          ) : (
            <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-brand)]">
              Holiday Light <span className="text-[var(--color-accent)]">Supplies</span>
            </span>
          )}
        </Link>

        <nav className="hidden gap-7 text-sm font-medium md:flex" aria-label="Primary">
          <MegaMenu />
          <Link href="/product-category/permanent-lighting-kits" className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]">Permanent Lights</Link>
          <Link href="/shop" className="hover:text-[var(--color-brand)]">All Products</Link>
          <Link href="/gallery" className="hover:text-[var(--color-brand)]">Gallery</Link>
          <Link href="/professional-installer" className="hover:text-[var(--color-brand)]">Pro Installers</Link>
          <Link href="/municipalities" className="hover:text-[var(--color-brand)]">Municipalities</Link>
          <Link href="/faq" className="hover:text-[var(--color-brand)]">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchTrigger />
          <Link
            href="/account"
            className="hidden rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] md:inline-flex"
          >
            Account
          </Link>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
