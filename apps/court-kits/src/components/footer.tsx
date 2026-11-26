import Link from "next/link";
import Image from "next/image";
import { cities, guides, sports } from "@/lib/content";
import { photos } from "@/lib/photos";
import { phoneHref, site } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  const bg = photos[site.photos.footer];
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--ink-deep)] text-white">
      <Image src={bg.src} alt="" aria-hidden fill sizes="100vw" quality={50} loading="lazy" className="-z-[2] object-cover opacity-30" />
      <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-b from-[rgba(10,13,18,0.55)] via-[rgba(10,13,18,0.9)] to-[var(--ink-deep)]" />

      <div className="shell grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
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
        <FooterCol
          title="Court kits"
          links={[{ label: "All kits and prices", href: "/court-kits" }, ...sports.map((s) => ({ label: s.kitLabel, href: `/sports/${s.slug}` })), { label: "Custom sizes", href: "/custom-court" }]}
        />
        <FooterCol
          title="Guides"
          links={[
            ...guides.map((g) => ({ label: g.title, href: `/guides/${g.slug}` })),
            { label: "How it works", href: "/how-it-works" },
            { label: "FAQ", href: "/faq" },
          ]}
        />
        <div>
          <FooterCol title="Shipping to" columns links={cities.map((c) => ({ label: c.name, href: `/locations/${c.slug}` }))} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} {site.name}. Prices in Canadian dollars, before freight and tax.
          </p>
          <p className="flex gap-4">
            <Link href="/contact" className="hover:text-white hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, columns = false }: { title: string; links: { label: string; href: string }[]; columns?: boolean }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-white/55">{title}</h2>
      <ul className={`mt-3 ${columns ? "grid grid-cols-2 gap-x-4" : ""}`}>
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
