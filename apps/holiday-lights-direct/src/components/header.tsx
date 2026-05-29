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
        <span className="font-semibold text-[var(--color-gold)]">🎁 FIRST10</span>
        <span className="mx-2 text-white/40">·</span>
        <span>10% off your first order</span>
        <span className="mx-2 text-white/40">·</span>
        <span className="font-semibold text-[var(--color-gold)]">🍁 Free shipping over $500</span>
        <span className="mx-2 hidden text-white/40 sm:inline">·</span>
        <span className="hidden sm:inline">Shipping from London, Ontario</span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Holiday Lights Direct home" className="flex items-center gap-2">
          {hasLogo ? (
            <Image
              src="/images/logo.png"
              alt="Holiday Lights Direct"
              width={320}
              height={130}
              priority
              className="h-14 w-auto md:h-16"
            />
          ) : (
            <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-brand)]">
              Holiday Lights <span className="text-[var(--color-green)]">Direct</span>
            </span>
          )}
        </Link>

        <nav className="hidden gap-7 text-sm font-medium md:flex" aria-label="Primary">
          <Link href="/permanent-lights" className="font-semibold text-[var(--color-brand)] hover:opacity-80">
            Permanent Lights
          </Link>
          <MegaMenu />
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
