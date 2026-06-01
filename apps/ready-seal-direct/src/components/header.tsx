import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { SearchTrigger } from "@/components/search-trigger";

export function Header() {
  // Optionally show the user-supplied PNG logo if they dropped one at public/images/logo.png.
  // Otherwise we fall back to the styled-text wordmark.
  const logoFsPath = join(process.cwd(), "public", "images", "logo.png");
  const hasLogo = existsSync(logoFsPath);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="bg-[var(--color-brand-deep)] px-4 py-1.5 text-center text-[11px] tracking-wide text-white">
        <span className="font-semibold text-[var(--color-gold)]">🪵 SAVE15</span>
        <span className="mx-2 text-white/40">·</span>
        <span>$15 off your first order</span>
        <span className="mx-2 text-white/40">·</span>
        <span className="font-semibold text-[var(--color-gold)]">🚚 Free shipping over $750</span>
        <span className="mx-2 hidden text-white/40 sm:inline">·</span>
        <span className="hidden sm:inline">Ships from Belmont, Ontario</span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Ready Seal Direct home" className="flex items-center gap-2">
          {hasLogo ? (
            <Image
              src="/images/logo.png"
              alt="Ready Seal Direct — Ready Seal wood stain & sealer in Canada"
              width={320}
              height={130}
              priority
              className="h-12 w-auto md:h-14"
            />
          ) : (
            <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-brand)]">
              Ready Seal <span className="text-[var(--color-green)]">Direct</span>
            </span>
          )}
        </Link>

        <nav className="hidden gap-7 text-sm font-medium md:flex" aria-label="Primary">
          <MegaMenu />
          <Link href="/contractor-program" className="font-semibold text-[var(--color-brand)] hover:opacity-80">
            Contractor Pricing
          </Link>
          <Link href="/calculator" className="hover:text-[var(--color-brand)]">Stain Calculator</Link>
          <Link href="/faq" className="hover:text-[var(--color-brand)]">FAQ</Link>
          <Link href="/contact-us" className="hover:text-[var(--color-brand)]">Contact</Link>
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
