import Link from "next/link";

const links = [
  { href: "/winners", label: "Search Winners" },
  { href: "/about", label: "About" },
  { href: "/why-awards-matter", label: "Why Awards Matter" },
  { href: "/nominate", label: "Request Consideration" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-[var(--gold-soft)] text-[var(--gold)] font-serif text-base">
            S
          </span>
          <div className="leading-tight">
            <div className="font-serif text-base font-medium tracking-tight">Service Excellence Awards</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-stone-500">Canada · 2026</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-stone-700 transition-colors hover:text-stone-900"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/nominate"
            className="inline-flex h-9 items-center rounded-full bg-stone-900 px-4 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-stone-700"
          >
            Submit a Business
          </Link>
        </nav>
        <details className="md:hidden">
          <summary className="list-none cursor-pointer rounded-md p-2 text-stone-700">
            <span className="sr-only">Open menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute left-0 right-0 top-16 border-b border-stone-200 bg-white px-6 py-4">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block text-sm text-stone-800">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}
