import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { getServices } from "@/lib/content";
import { AwardBadge } from "@/components/award-badge";
import { PhoneIcon, MailIcon } from "./icons";

export function Footer() {
  const services = getServices();
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/images/logo.png" alt="TriCity Concrete Sealing" width={365} height={101} className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">Professional concrete sealing across London, Woodstock, Brantford and Southwestern Ontario. High-quality solvent-based sealers in matte, semi-gloss or gloss, backed by a {site.warrantyYears}-year workmanship warranty.</p>
          <a href={site.phoneHref} className="btn-accent btn-sm mt-5"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          <a href={site.emailHref} className="mt-3 flex items-center gap-2 text-sm text-[var(--ink-soft)] hover:text-[var(--accent-deep)]"><MailIcon className="w-4 h-4" />{site.email}</a>
          <p className="mt-2 text-xs text-[var(--muted)]">{site.hours}</p>
          <div className="mt-5"><AwardBadge /></div>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{s.title}</Link></li>
            ))}
            <li><Link href="/finishes" className="font-semibold text-[var(--ink)] hover:text-[var(--accent-deep)]">Matte · Semi-Gloss · Gloss</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((c) => (
              <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["Guides & tips", "/resources"], ["Before & after", "/gallery"], ["Warranty", "/warranty"], ["About us", "/about"], ["FAQ", "/faq"], ["Free quote", "/contact"], ["Privacy policy", "/privacy-policy"], ["Terms of service", "/terms-of-service"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-[var(--ink-soft)] hover:text-[var(--accent-deep)]">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} TriCity Concrete Sealing · London, Ontario</p>
          <p>Fully insured · {site.warrantyYears}-year workmanship warranty · {site.yearsExperience}+ years</p>
        </div>
      </div>
    </footer>
  );
}
