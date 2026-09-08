import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { AwardBadge } from "@/components/award-badge";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="courses-dark h-3 w-full bg-ink-2" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/logo-transparent.png" alt="London Retaining Walls" width={170} height={68} className="h-12 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-stone-2">
            Owner-led retaining wall contractor. Interlocking block, poured concrete, timber and natural stone walls built with real drainage for Ontario clay and frost. Serving London and Southwestern Ontario since 2018.
          </p>
          <div className="mt-6 space-y-1 text-[15px]">
            <p><a href={site.phoneHref} className="font-display text-lg font-extrabold tracking-wide hover:text-accent">{site.phone}</a></p>
            <p><a href={`mailto:${site.email}`} className="text-stone-2 hover:text-accent">{site.email}</a></p>
            <p className="text-stone-2">{site.hours}</p>
          </div>
          <div className="mt-6"><AwardBadge /></div>
        </div>
        <div>
          <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-accent">Services</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {site.services.map((s) => (
              <li key={s.slug}><Link href={`/${s.slug}`} className="text-stone-2 hover:text-paper">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-accent">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {site.cities.map((c) => (
              <li key={c.slug}><Link href={`/${c.route}`} className="text-stone-2 hover:text-paper">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-accent">Company</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {[["About us", "/about-us"], ["Project gallery", "/gallery"], ["Guides & resources", "/resources"], ["All services", "/services"], ["Contact", "/contact-us"], ["Privacy policy", "/privacy-policy"], ["Terms of service", "/terms-of-service"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-stone-2 hover:text-paper">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-stone-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. London, Ontario.</p>
          <p>Retaining wall installation and repair across Middlesex, Elgin, Oxford and Brant counties.</p>
        </div>
      </div>
    </footer>
  );
}
