"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="pill-nav" aria-label="Main">
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
