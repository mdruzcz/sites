import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";
import { HeaderSearch } from "@/components/header-search";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "@/components/logo";
import { getStore } from "@/lib/catalog";
import { PRIMARY_LINKS, SHELF_LINKS, UTILITY_LINKS } from "@/lib/nav";

/**
 * Four rows on desktop, the way a parts catalogue is laid out: a utility strip
 * (help links left, the shipping promise right), the brand row (search, centred
 * wordmark, order tracking and cart), a small-caps row for where to start, and
 * a grey shelf strip that jumps straight to a product. On phones it folds to
 * one sticky bar under the shipping line.
 */
export async function Header() {
  const store = await getStore();
  const storeId = store?.id ?? "";
  return (
    <header className="sticky top-0 z-30 bg-white lg:static">
      {/* Utility strip */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="shell flex h-7 items-center justify-center gap-6 text-[0.72rem] lg:h-9 lg:justify-between lg:text-[0.8rem]">
          <nav aria-label="Help" className="hidden lg:block">
            <ul className="flex items-center">
              {UTILITY_LINKS.map((l, i) => (
                <li key={l.href} className={i > 0 ? "ml-3 border-l border-white/30 pl-3" : ""}>
                  <Link href={l.href} className="text-white/90 transition hover:text-white hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="truncate">
            <Link href="/shipping-returns" className="hover:underline">
              <span className="font-semibold text-[var(--color-accent-bright)]">Every order ships free</span>
              <span className="text-white/90"> in Canada · Free pickup in Woodstock, ON</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Brand row */}
      <div className="border-b border-[var(--color-border)] lg:border-0">
        <div className="shell grid h-[4.25rem] grid-cols-[auto_1fr_auto] items-center gap-3 lg:h-[7.25rem] lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center lg:hidden">
            <MobileNav storeId={storeId} />
          </div>
          <div className="hidden lg:block lg:max-w-[17.5rem]">
            <HeaderSearch variant="bar" storeId={storeId} />
          </div>

          <Link href="/" aria-label="Illumi Track Lights home" className="justify-self-center">
            <span className="hidden lg:block"><Logo stacked /></span>
            <span className="block lg:hidden"><Logo /></span>
          </Link>

          <div className="flex items-center justify-end gap-1 lg:gap-5">
            <Link href="/track-order" className="hidden flex-col items-center gap-1 text-[0.72rem] text-[var(--color-text-soft)] transition hover:text-[var(--color-accent)] lg:flex">
              <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h11v9H2z" /><path d="M13 10h4l3 3v3h-7z" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="16.5" cy="17.5" r="1.7" /></svg>
              Track Order
            </Link>
            <CartBadge />
          </div>
        </div>
      </div>

      {/* Where to start */}
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="shell flex flex-wrap items-center justify-center gap-x-7 border-t border-[var(--color-border)] pt-1">
          {PRIMARY_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="nav-caps inline-block">{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Shelves */}
      <nav aria-label="Shop by part" className="hidden border-y border-[var(--color-border)] bg-[var(--color-bg-warm)] lg:block">
        <ul className="shell flex flex-wrap items-center justify-center py-2.5">
          {SHELF_LINKS.map((l, i) => (
            <li key={l.href} className={i > 0 ? "ml-3 border-l border-[var(--color-border-strong)] pl-3" : ""}>
              <Link href={l.href} className="nav-link">{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
