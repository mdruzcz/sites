import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { AwardBadge } from "@/components/award-badge";
import { PhoneIcon, MailIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--cream)]">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/images/logo.png" alt="Restore My Deck" width={522} height={223} className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">Deck and fence restoration, cleaning, staining and repair across Kitchener-Waterloo, Cambridge, Guelph, Hamilton and Southwestern Ontario. Eco-friendly products, brush-applied oil-based stain, most projects done in two days.</p>
          <a href={site.phoneHref} className="btn-accent btn-sm mt-5"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          <a href={site.emailHref} className="mt-3 flex items-center gap-2 text-sm text-[var(--ink-soft)] hover:text-[var(--accent-deep)]"><MailIcon className="w-4 h-4" />{site.email}</a>
          <p className="mt-2 text-xs text-[var(--muted)]">{site.hours}</p>
          <div className="mt-5"><AwardBadge /></div>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.services.map((s) => (
              <li key={s.href}><Link href={s.href} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.serviceAreas.map((c) => (
              <li key={c.href}><Link href={c.href} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{c.name}</Link></li>
            ))}
            <li className="text-xs text-[var(--muted)]">{site.extraAreas.join(" · ")}</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["Helpful tips", "/blog"], ["Projects", "/projects"], ["About us", "/about-us"], ["Free quote", "/contact-us"], ["Privacy policy", "/privacy-policy"], ["Terms of service", "/terms-of-service"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Restore My Deck · Kitchener, Ontario</p>
          <p>Eco-friendly products · Brush-applied stain · Free quotes</p>
        </div>
      </div>
    </footer>
  );
}
