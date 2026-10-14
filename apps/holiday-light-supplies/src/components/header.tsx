import Link from "next/link";
import Image from "next/image";
import { CartBadge } from "@/components/cart-badge";
import { MegaMenu } from "@/components/mega-menu";
import { MobileNav } from "@/components/mobile-nav";
import { SearchTrigger } from "@/components/search-trigger";
import { Icon } from "@/components/icons";
import { FREE_SHIPPING_OVER, SHIP_FROM, WELCOME_CODE } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      {/* Utility bar */}
      <div className="bg-[var(--color-brand-deep)] text-[12px] text-white/85">
        <div className="shell flex min-h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 truncate">
            <Icon.truck size={15} className="shrink-0 text-[var(--color-gold-bright)]" />
            <span className="truncate">
              Free shipping over ${FREE_SHIPPING_OVER} · Ships from {SHIP_FROM} · Volume pricing on case orders
            </span>
          </p>
          <div className="hidden items-center gap-5 md:flex">
            <span className="text-white/70">
              First order? <span className="font-semibold text-[var(--color-gold-bright)]">{WELCOME_CODE}</span> saves 10%
            </span>
            <Link href="/municipalities" className="transition hover:text-white">Municipal & BIA accounts</Link>
            <Link href="/track-order" className="transition hover:text-white">Track order</Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="shell relative flex items-center justify-between gap-3 py-3 md:gap-6">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" aria-label="Holiday Light Supplies home" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Holiday Light Supplies"
              width={320}
              height={130}
              priority
              sizes="(max-width: 768px) 150px, 200px"
              className="h-11 w-auto md:h-14"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <MegaMenu label="Shop" />
          <MegaMenu label="Commercial & wholesale" variant="commercial" />
          <Link href="/product-category/permanent-lighting-kits" className="link-underline min-h-[44px] inline-flex items-center text-[15px] font-medium transition hover:text-[var(--color-accent)]">
            Permanent lighting
          </Link>
          <Link href="/professional-installer" className="link-underline min-h-[44px] inline-flex items-center text-[15px] font-medium transition hover:text-[var(--color-accent)]">
            Installers
          </Link>
          <Link href="/resources" className="link-underline min-h-[44px] inline-flex items-center text-[15px] font-medium transition hover:text-[var(--color-accent)]">
            Guides
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchTrigger />
          <Link href="/request-a-quote" className="btn-accent hidden !min-h-[42px] !px-4 !py-2 text-sm md:inline-flex">
            Get a quote
          </Link>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
