import Link from "next/link";
import Image from "next/image";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderFrame } from "@/components/header-frame";

/**
 * Three stacked rows: a one-line announcement, the centred wordmark with menu
 * and cart either side, then a centred pill of primary links. On the homepage
 * the whole thing floats over the hero photo (see HeaderFrame).
 */
export function Header() {
  return (
    <HeaderFrame>
      <div className="hdr-topbar flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-4">
        <span className="font-semibold text-[var(--color-gold-bright)]">FIRST10</span>
        <span aria-hidden className="text-white/40">·</span>
        <span>10% off your first order</span>
        <span aria-hidden className="hidden text-white/40 sm:inline">·</span>
        <span className="hidden sm:inline">Free shipping over $500 across Canada</span>
      </div>

      <div className="shell grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
        <div className="flex items-center gap-3">
          <MobileNav />
          <span className="hdr-meta hidden lg:inline">Proudly Canadian · Installer-grade, sold direct</span>
        </div>

        <Link href="/" aria-label="Holiday Lights Direct home" className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Holiday Lights Direct"
            width={1361}
            height={239}
            priority
            sizes="(max-width: 768px) 200px, 280px"
            className="logo-dark h-9 w-auto md:h-11"
          />
          <Image
            src="/images/logo-white.png"
            alt=""
            aria-hidden
            width={1361}
            height={239}
            priority
            sizes="(max-width: 768px) 200px, 280px"
            className="logo-light h-9 w-auto md:h-11"
          />
        </Link>

        <div className="flex items-center justify-end gap-2">
          <Link href="/account" className="hdr-chip hidden md:inline-flex">
            Account
          </Link>
          <CartBadge />
        </div>
      </div>

      <div className="hidden justify-center pb-3 md:flex">
        <nav className="hdr-nav flex" aria-label="Primary">
          <Link href="/permanent-lights" className="hdr-link hdr-link-accent">
            Permanent Lights
          </Link>
          <MegaMenu />
          <Link href="/product-category/christmas-light-bulbs" className="hdr-link">
            C9 Bulbs
          </Link>
          <Link href="/professional-installer" className="hdr-link">
            Pro Installers
          </Link>
          <Link href="/municipalities" className="hdr-link">
            Municipalities
          </Link>
          <Link href="/resources" className="hdr-link">
            Guides
          </Link>
          <Link href="/faq" className="hdr-link">
            FAQ
          </Link>
        </nav>
      </div>
    </HeaderFrame>
  );
}
