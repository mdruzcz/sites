import Image from "next/image";
import Link from "next/link";
import { site, cities, services } from "@/lib/site";
import { AwardBadge } from "@/components/award-badge";
import { PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="bulb-string pt-6" aria-hidden>{Array.from({ length: 20 }).map((_, i) => <span key={i} />)}</div>
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/images/logo.png" alt="Festive Holiday Lighting" width={409} height={230} className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">Classic Christmas light installation and permanent LED roofline systems for homes and businesses across Southern Ontario. Insured, family owned, based in Hamilton.</p>
          <a href={site.phoneHref} className="btn-candy btn-sm mt-5"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          <p className="mt-3 text-xs text-[var(--muted)]">{site.hoursShort} · Extended hours Nov–Jan</p>
          <div className="mt-5"><AwardBadge /></div>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-[var(--ink-soft)] hover:text-[var(--candy)]">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((c) => (
              <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-[var(--ink-soft)] hover:text-[var(--candy)]">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["Guides & tips", "/resources"], ["Gallery", "/gallery"], ["About us", "/about"], ["FAQ", "/faq"], ["Free quote", "/contact"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-[var(--ink-soft)] hover:text-[var(--candy)]">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Festive Holiday Lighting · Hamilton, Ontario</p>
          <p>$5M Liability · WSIB Compliant · Family Owned</p>
        </div>
      </div>
    </footer>
  );
}
