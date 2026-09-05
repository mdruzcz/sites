import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { HeaderSearch } from "@/components/header-search";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "@/components/logo";
import { getStore } from "@/lib/catalog";

const NAV = [
  { label: "Kits", href: "/diy-kits" },
  { label: "Installation", href: "/installation" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guides", href: "/resources" }
];

export async function Header() {
  const store = await getStore();
  const storeId = store?.id ?? "";
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-ink)] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="hidden border-b border-white/10 bg-[var(--color-ink-deep)] text-[11px] tracking-wide text-white/75 md:block">
        <div className="shell flex h-8 items-center justify-between">
          <p>
            <span className="font-semibold text-[var(--color-accent-bright)]">Free shipping</span> across Canada over $500 · Ships from London, Ontario
          </p>
          <p className="flex gap-5">
            <Link href="/installers" className="hover:text-white">Find an installer</Link>
            <Link href="/warranty" className="hover:text-white">5-year warranty</Link>
            <Link href="/track-order" className="hover:text-white">Track order</Link>
            <Link href="/contact-us" className="hover:text-white">Contact</Link>
          </p>
        </div>
      </div>

      <div className="shell relative flex h-[var(--header-h)] items-center gap-4 lg:gap-6">
        <Link href="/" aria-label="Illumi Track Lights home" className="flex shrink-0 items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <Link href="/diy-kits" className="nav-link">Kits</Link>
          <MegaMenu />
          {NAV.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </nav>

        <div className="hidden min-w-0 flex-1 lg:block lg:max-w-sm xl:max-w-md">
          <HeaderSearch variant="bar" storeId={storeId} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/account"
            className="hidden h-11 items-center rounded-full border border-white/15 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/20 lg:inline-flex"
          >
            Account
          </Link>
          <CartBadge />
          <MobileNav storeId={storeId} />
        </div>
      </div>
    </header>
  );
}
