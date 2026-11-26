import Link from "next/link";
import { nav, phoneHref, site } from "@/lib/site";
import { HeaderFrame } from "./header-frame";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function Header() {
  return (
    <HeaderFrame>
      <div className="announce">
        <p className="shell py-2 text-center text-[0.8125rem] font-bold">{site.announcement}</p>
      </div>
      <div className="shell grid grid-cols-[auto_1fr_auto] items-center gap-1 py-2.5 lg:grid-cols-[1fr_auto_1fr] lg:gap-3">
        <div className="flex items-center">
          <MobileMenu links={[...nav, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }]} phone={site.phone} phoneHref={phoneHref} />
          {site.phone && phoneHref && (
            <a href={phoneHref} className="hidden min-h-[44px] items-center text-sm font-bold lg:inline-flex">
              {site.phone}
            </a>
          )}
        </div>
        <Link href="/" className="flex min-h-[44px] items-center justify-start lg:justify-center">
          <Logo />
        </Link>
        <div className="flex items-center justify-end">
          <Link href="/contact#quote" className="btn btn-cta !min-h-[44px] !px-3.5 !py-2 text-sm sm:!px-4">
            <span className="hidden sm:inline">Get a quote</span>
            <span className="sm:hidden">Quote</span>
          </Link>
        </div>
      </div>
      <div className="hidden justify-center pb-3 lg:flex">
        <NavLinks links={nav} />
      </div>
    </HeaderFrame>
  );
}
