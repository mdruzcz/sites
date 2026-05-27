import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Network", href: "/our-network" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--accent-dark)] text-white">
      <div className="container py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-bold text-lg mb-2">Master Decker Inc.</div>
          <p className="text-sm text-white/70 max-w-xs">London&apos;s outdoor living experts since 2014. Decks, fences, concrete, and more.</p>
          <div className="mt-4 space-y-1 text-sm text-white/80">
            <div><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></div>
            <div><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></div>
            <div>{site.hours}</div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">Quick Links</div>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/80 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">Service Areas</div>
          <ul className="space-y-1.5">
            {site.serviceAreas.map((a) => (
              <li key={a} className="text-sm text-white/80">{a}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Master Decker Inc. All rights reserved.</span>
          <span>London, Ontario</span>
        </div>
      </div>
    </footer>
  );
}
