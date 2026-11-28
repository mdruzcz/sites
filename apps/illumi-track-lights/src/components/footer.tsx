import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_COLUMNS } from "@/lib/nav";
import { BRAND } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="on-dark mt-20 bg-[var(--color-ink)] text-white/85">
      <div className="shell grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
        <div>
          <Logo onDark />
          <address className="mt-5 text-sm not-italic leading-relaxed text-white/85">
            {BRAND.street}
            <br />
            {BRAND.city}, {BRAND.regionCode} {BRAND.postal}
          </address>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Order pickups by appointment, once we email that yours is ready.{" "}
            <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">Map</a>
          </p>
          <p className="mt-3 text-sm">
            <a href={`mailto:${BRAND.email}`} className="underline underline-offset-2 hover:text-white">{BRAND.email}</a>
          </p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow text-[var(--color-accent-bright)]">{col.title}</h2>
            <ul className="mt-4 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="inline-flex min-h-[34px] items-center transition hover:text-white hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-xs text-white/65">
          <p>© {new Date().getFullYear()} Illumi Track Lights · {BRAND.city}, {BRAND.region}, Canada</p>
          <p>Every order ships free in Canada. Prices in Canadian dollars. Orders are invoiced by Master Decker Inc.</p>
        </div>
      </div>
    </footer>
  );
}
