import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { SERVICES, AREAS } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--bg-deep)] text-white/75">
      <div className="wrap py-12 grid gap-9 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="text-sm leading-relaxed mt-3 max-w-xs text-white/65">
            Professional deck &amp; fence staining across {SITE.region}. {SITE.stainBrand} oil-based stains that never peel. {SITE.promise}
          </p>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 mt-4 font-bold text-white hover:text-[var(--gold)] transition-colors" style={{ fontFamily: "var(--font-head)" }}>
            <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            {SITE.phone}
          </a>
          <p className="text-xs text-white/45 mt-1.5">{SITE.hours}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-3.5" style={{ fontFamily: "var(--font-head)" }}>Services</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-sm hover:text-white transition-colors">{s.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-3.5" style={{ fontFamily: "var(--font-head)" }}>Company</p>
          <ul className="space-y-2">
            {[{ href: "/work", label: "Our Work" }, { href: "/finishes", label: "Stain Finishes" }, { href: "/areas", label: "Service Areas" }, { href: "/about", label: "About" }, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Get a Quote" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-3.5" style={{ fontFamily: "var(--font-head)" }}>Areas</p>
          <ul className="space-y-2">
            {AREAS.slice(0, 7).map((a) => <li key={a.slug}><Link href={`/areas/${a.slug}`} className="text-sm hover:text-white transition-colors">{a.name}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/45">
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span>{SITE.region}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
