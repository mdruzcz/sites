import Link from "next/link";
import { nav, phoneHref, site } from "@/lib/site";
import { HeaderFrame } from "./header-frame";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 whitespace-nowrap text-[1.02rem] font-black leading-none tracking-[-0.03em] sm:text-[1.2rem] md:text-[1.45rem] ${className}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="hidden translate-y-[3px] min-[400px]:block">
        <rect x="1.5" y="3.5" width="21" height="17" rx="2.5" fill="none" stroke="var(--accent)" strokeWidth="2.4" />
        <path d="M12 3.5v17M1.5 12h4.2a6.3 6.3 0 0 0 12.6 0h4.2" fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
      <span>{site.wordmark[0]}</span>
      <span className="wm-accent text-[var(--accent)]">{site.wordmark[1]}</span>
    </span>
  );
}

export function Header() {
  return (
    <HeaderFrame>
      <div className="announce">
        <p className="shell py-2 text-center text-[0.8125rem] font-bold">{site.announcement}</p>
      </div>
      <div className="shell grid grid-cols-[auto_1fr_auto] items-center gap-1 py-2.5 lg:grid-cols-[1fr_auto_1fr] lg:gap-3">
        <div className="flex items-center">
          <MobileMenu links={[...nav, { label: "Contact", href: "/contact" }]} phone={site.phone} phoneHref={phoneHref} />
          {site.phone && phoneHref && (
            <a href={phoneHref} className="hidden min-h-[44px] items-center text-sm font-bold lg:inline-flex">
              {site.phone}
            </a>
          )}
        </div>
        <Link href="/" aria-label={`${site.name} home`} className="flex min-h-[44px] items-center justify-start lg:justify-center">
          <Wordmark />
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
