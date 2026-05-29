import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { SearchTrigger } from "@/components/search-trigger";

export function Header() {
  // Logo dropped in from the scrape — kept the original Illumi mark.
  const logoFsPath = join(process.cwd(), "public", "images", "logo.jpg");
  const hasLogo = existsSync(logoFsPath);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="bg-gradient-to-r from-[var(--color-brand-deep)] via-[var(--color-brand)] to-[var(--color-brand-deep)] px-4 py-1.5 text-center text-[11px] tracking-wide text-white">
        <span className="font-semibold text-[var(--color-peach)]">⚡ ILLUMI10</span>
        <span className="mx-2 text-white/40">·</span>
        <span>10% off your first order</span>
        <span className="mx-2 text-white/40">·</span>
        <span className="font-semibold text-[var(--color-peach)]">🚚 Free shipping over $500</span>
        <span className="mx-2 hidden text-white/40 sm:inline">·</span>
        <span className="hidden sm:inline">Shipping from London, Ontario</span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Illumi Track Lights home" className="flex items-center gap-3">
          {hasLogo ? (
            <>
              <Image
                src="/images/logo.jpg"
                alt="Illumi Track Lights"
                width={56}
                height={56}
                priority
                className="size-12 rounded-md object-cover md:size-14"
              />
              <span className="font-display hidden text-lg font-bold tracking-tight text-[var(--color-brand-deep)] sm:inline md:text-xl">
                Illumi <span className="gradient-text">Track Lights</span>
              </span>
            </>
          ) : (
            <span className="font-display text-xl font-bold tracking-tight text-[var(--color-brand-deep)] md:text-2xl">
              Illumi <span className="gradient-text">Track Lights</span>
            </span>
          )}
        </Link>

        <nav className="hidden gap-7 text-sm font-medium md:flex" aria-label="Primary">
          <Link href="/diy-kits" className="font-semibold text-[var(--color-brand)] hover:opacity-80">
            Soffit Track Kits
          </Link>
          <MegaMenu />
          <Link href="/how-it-works" className="hover:text-[var(--color-brand)]">How They Work</Link>
          <Link href="/installers" className="hover:text-[var(--color-brand)]">Installers</Link>
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
