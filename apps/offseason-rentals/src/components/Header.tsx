import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { MobileNav } from "@/components/MobileNav";

export const NAV_LINKS = [
  { href: "/rentals", label: "Browse rentals" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/perfect-for/travel-nurses", label: "Who it suits" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" }
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={`${site.name} — home`}>
      <span
        className="grid place-items-center rounded-full text-[var(--on-accent)]"
        style={{ width: 32, height: 32, background: "var(--accent)" }}
        aria-hidden="true"
      >
        <Icon name="waves" size={18} strokeWidth={2} />
      </span>
      <span className="text-[17px] font-bold tracking-tight leading-none">
        <span className="text-[var(--accent)]">Off Season</span>{" "}
        <span className="text-[var(--ink)]">Rentals</span>
      </span>
    </Link>
  );
}

/**
 * The collapsed search pill. Airbnb shows a summary of the current search and
 * expands it on click; here the search space is small enough that the pill
 * simply hands you to the filter panel on /rentals.
 */
function SearchPill() {
  return (
    <Link
      href="/rentals"
      className="hidden lg:flex items-center rounded-[var(--r-pill)] border bg-[var(--surface)] transition-shadow hover:shadow-[var(--shadow-md)]"
      style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-sm)", height: 48 }}
    >
      <span className="px-5 text-[14px] font-semibold text-[var(--ink)]">Port Stanley</span>
      <span className="h-6 w-px" style={{ background: "var(--line)" }} aria-hidden="true" />
      <span className="px-5 text-[14px] font-semibold text-[var(--ink)]">{site.season.label}</span>
      <span className="h-6 w-px" style={{ background: "var(--line)" }} aria-hidden="true" />
      <span className="pl-5 pr-2 text-[14px] text-[var(--muted)]">Any size</span>
      <span
        className="mr-2 grid place-items-center rounded-full text-[var(--on-accent)]"
        style={{ width: 32, height: 32, background: "var(--accent)" }}
        aria-hidden="true"
      >
        <Icon name="search" size={16} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 bg-[var(--surface)] border-b"
      style={{ borderColor: "var(--line-soft)" }}
    >
      <div className="container-page">
        <div className="flex items-center justify-between gap-4" style={{ minHeight: 80 }}>
          <Wordmark />

          <SearchPill />

          <div className="flex items-center gap-1">
            <Link
              href="/list-your-property"
              className="hidden md:inline-flex items-center rounded-[var(--r-pill)] px-4 py-3 text-[14px] font-semibold transition-colors hover:bg-[var(--surface-2)]"
            >
              {site.cta.ownerLong}
            </Link>

            <a
              href={site.phoneHref}
              className="hidden sm:inline-flex items-center gap-2 rounded-[var(--r-pill)] px-4 py-3 text-[14px] font-semibold transition-colors hover:bg-[var(--surface-2)]"
            >
              <Icon name="phone" size={16} strokeWidth={2} />
              <span className="hidden xl:inline">{site.phone}</span>
            </a>

            <MobileNav />
          </div>
        </div>

        {/* Compact search entry for narrow screens, mirroring the desktop pill. */}
        <div className="lg:hidden pb-3">
          <Link
            href="/rentals"
            className="flex items-center gap-3 rounded-[var(--r-pill)] border bg-[var(--surface)] px-4"
            style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-sm)", minHeight: 48 }}
          >
            <Icon name="search" size={18} strokeWidth={2.2} className="text-[var(--ink)]" />
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold leading-tight truncate">
                Port Stanley cottages
              </span>
              <span className="block text-[12px] leading-tight text-[var(--muted)] truncate">
                {site.season.label} · By the month
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
