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
      <div className="bulb-string pt-6" aria-hidden>{Array.from({ length: 18 }).map((_, i) => <span key={i} />)}</div>
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/images/logo.png" alt="Classic Christmas Lighting" width={2033} height={852} className="h-14 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">Family-owned Christmas light installers based in Kitchener. Rooflines, wrapped trees, wreaths and storefronts across Waterloo Region, Guelph, Hamilton, Woodstock and Stratford. Lights supplied, installed, maintained and taken down.</p>
          <a href={site.phoneHref} className="btn-candy btn-sm mt-5"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          <a href={site.emailHref} className="mt-3 flex items-center gap-2 text-sm text-[var(--ink-soft)] hover:text-[var(--candy)]"><MailIcon className="w-4 h-4" />{site.email}</a>
          <p className="mt-2 text-xs text-[var(--muted)]">{site.hours}</p>
          <div className="mt-5"><AwardBadge /></div>
        </div>
        <div>
          <h3 className="eyebrow text-[var(--muted)]">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-[var(--ink-soft)] hover:text-[var(--candy)]">{s.title}</Link></li>
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
            <li><a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--ink-soft)] hover:text-[var(--candy)]">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Classic Christmas Lighting · Kitchener, Ontario</p>
          <p>Fully insured · Family owned · No travel charges · {site.yearsExperience}+ years</p>
        </div>
      </div>
    </footer>
  );
}
