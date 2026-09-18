import Link from "next/link";
import type { WinnerIndex } from "@/lib/search-match";
import { WinnerSearch } from "@/components/winner-search";

const links = [
  { href: "/winners", label: "Winners" },
  { href: "/resources", label: "Homeowner Guides" },
  { href: "/about", label: "About" },
  { href: "/why-awards-matter", label: "Why It Matters" },
];

export function SiteHeader({ index }: { index: WinnerIndex | null }) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-[var(--gold-soft)] font-serif text-base text-[var(--gold)]">
            S
          </span>
          <div className="leading-tight">
            <div className="font-serif text-base font-medium tracking-tight">Service Excellence Awards</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-stone-500">Canada · 2026</div>
          </div>
        </Link>

        {index && (
          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <WinnerSearch index={index} variant="compact" placeholder="Look up a trade, town or business…" className="w-full max-w-xs" />
          </div>
        )}

        <nav className="ml-auto hidden shrink-0 items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap text-sm text-stone-700 transition-colors hover:text-stone-900">
              {l.label}
            </Link>
          ))}
          <Link
            href="/nominate"
            className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-stone-900 px-4 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-stone-700"
          >
            Submit a Business
          </Link>
        </nav>

        <details className="group relative ml-auto md:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-md text-stone-700 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-open:hidden">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hidden group-open:block">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="fixed inset-x-0 top-16 border-b border-stone-200 bg-white px-6 py-5 shadow-lg">
            {index && <WinnerSearch index={index} variant="compact" placeholder="Look up a trade, town or business…" className="mb-4" />}
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block border-b border-stone-100 py-3 text-base text-stone-800">{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/nominate" className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white">
                  Submit a Business
                </Link>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}
