import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getCities } from "@/lib/content";
import { PhoneIcon } from "./icons";

export function Footer() {
  const services = getServices();
  const cities = getCities();
  return (
    <footer className="bg-[var(--graphite)] text-white">
      <div className="h-1.5 bg-[var(--orange)]" />
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-block rounded bg-white px-3 py-2"><Image src="/images/logo.svg" alt="All-Seal Concrete Sealing" width={280} height={60} className="h-10 w-auto" /></div>
          <p className="font-display mt-5 text-2xl font-bold uppercase tracking-wide text-[var(--orange)]">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">Premium acrylic and polyurethane sealers for driveways, patios, garage floors, pool decks, walkways and stamped concrete across Woodstock and Southwestern Ontario. Free inspections and quotes.</p>
          <a href={site.phoneHref} className="btn-orange btn-sm mt-5"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          <p className="mt-3 text-xs text-white/50">{site.hours}</p>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[var(--orange)]">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-white/75 hover:text-white">{s.title}</Link></li>)}
            <li><Link href="/finishes" className="font-semibold text-white hover:text-[var(--orange)]">High Gloss · Semi-Gloss · Matte</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[var(--orange)]">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((c) => <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-white/75 hover:text-white">{c.city}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[var(--orange)]">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["Before & after", "/gallery"], ["Guides", "/resources"], ["About", "/about"], ["Free quote", "/contact"]].map(([l, h]) => <li key={h}><Link href={h} className="text-white/75 hover:text-white">{l}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line-dark)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} All-Seal Concrete Sealing · Woodstock, Ontario</p>
          <p>{site.stats.driveways} driveways · {site.stats.patios} patios · {site.stats.happyCustomers} happy customers and counting</p>
        </div>
      </div>
    </footer>
  );
}
