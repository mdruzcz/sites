import Link from "next/link";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section className="bg-[var(--moss-soft)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow-pill moss">Where we work</p>
          <h2 className="font-display h2-fluid mt-4">Kitchener-Waterloo, Guelph, Cambridge, Hamilton and the towns between.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">Based in Kitchener and on the road across Waterloo Region, Wellington, Brant, Perth and Oxford counties. Every city page has local details and its own quote form.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.serviceAreas.map((c) => (
              <Link key={c.href} href={c.href} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 text-sm font-semibold transition hover:border-[var(--moss)] hover:text-[var(--moss-deep)]">
                <MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{c.name}
              </Link>
            ))}
            {site.extraAreas.map((n) => <span key={n} className="inline-flex min-h-[40px] items-center rounded-full border border-dashed border-[var(--line-strong)] px-4 text-sm text-[var(--muted)]">{n}</span>)}
          </div>
          <Link href="/service-areas" className="btn-cedar mt-7">All service areas</Link>
        </div>
        <Photo name={PICKS.heroAreas} ratio="aspect-[4/3]" rounded="rounded-[var(--radius)]" sizes="(max-width: 1024px) 100vw, 600px" className="shadow-[var(--shadow-lg)]" />
      </div>
    </section>
  );
}
