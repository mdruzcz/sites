import Link from "next/link";
import Image from "next/image";
import { cities, sports } from "@/lib/content";
import { photos } from "@/lib/photos";
import { phoneHref, site } from "@/lib/site";
import { Wordmark } from "./header";

export function Footer() {
  const bg = photos[site.photos.footer];
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--ink-deep)] text-white">
      <Image src={bg.src} alt="" aria-hidden fill sizes="100vw" placeholder="blur" blurDataURL={bg.blurDataURL} className="-z-[2] object-cover opacity-35" />
      <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-b from-[rgba(10,13,18,0.55)] via-[rgba(10,13,18,0.88)] to-[var(--ink-deep)]" />

      <div className="shell grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{site.footerBlurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/contact#quote" className="btn btn-cta">
              Get a quote <span aria-hidden>→</span>
            </Link>
            {site.phone && phoneHref && (
              <a href={phoneHref} className="btn btn-ghost">
                Call {site.phone}
              </a>
            )}
          </div>
        </div>
        <FooterCol title="Court kits" links={[{ label: "All court kits", href: "/court-kits" }, ...sports.map((s) => ({ label: s.kitLabel, href: `/sports/${s.slug}` }))]} />
        <FooterCol
          title="Help"
          links={[
            { label: "How it works", href: "/how-it-works" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ]}
        />
        <FooterCol title="Shipping to" links={cities.map((c) => ({ label: `${c.name}, ${c.provinceCode}`, href: `/locations/${c.slug}` }))} />
      </div>
      <div className="border-t border-white/10">
        <p className="shell py-5 text-xs text-white/55">
          © {new Date().getFullYear()} {site.name}. Court kits shipped across Canada.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-white/55">{title}</h2>
      <ul className="mt-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex min-h-[40px] items-center text-sm font-bold text-white/85 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
