import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";

const POLICIES = [
  "Free shipping over $500",
  "30-day returns",
  "5-year LED warranty",
  "Ships from London, ON"
];

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Permanent lighting kits", href: "/permanent-lights" },
      { label: "Tracks, pucks & connectors", href: "/product-category/permanent-lights" },
      { label: "All products", href: "/shop" },
      { label: "C9 LED bulbs", href: "/product-category/christmas-light-bulbs" },
      { label: "Wires & plugs", href: "/product-category/wires-plugs" },
      { label: "Clips & stakes", href: "/product-category/light-attachment-clips" }
    ]
  },
  {
    heading: "Programs",
    links: [
      { label: "Pro Installer Program", href: "/professional-installer" },
      { label: "Municipalities & BIAs", href: "/municipalities" },
      { label: "Track your order", href: "/track-order" },
      { label: "Your account", href: "/account" }
    ]
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "5-year warranty", href: "/warranty" },
      { label: "Guides & how-tos", href: "/resources" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact-us" },
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Privacy", href: "/privacy" }
    ]
  }
];

export function Footer() {
  const bg = photo("home-green-roofline");

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-ink-deep)] text-white/75">
      {/* Dusk photo behind the footer, fading down into ink. */}
      <Image
        src={bg.src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={bg.blurDataURL}
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,22,30,0.28) 0%, rgba(20,22,30,0.74) 42%, rgba(16,18,24,0.96) 78%, #101218 100%)"
        }}
      />
      <div className="border-b border-white/10">
        <ul className="shell grid grid-cols-2 gap-4 py-5 text-center text-xs md:grid-cols-4">
          {POLICIES.map((p) => (
            <li key={p} className="font-medium text-white/80">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/images/logo-white.png" alt="Holiday Lights Direct" width={1361} height={239} sizes="240px" className="h-11 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Aluminum-tracked permanent LED systems and professional Christmas lighting gear, shipped direct
            from London, Ontario.
          </p>
          <p className="mt-7 text-sm font-semibold text-white">Contact our team</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="mailto:service@masterdecker.com" className="scene-pill px-4">
              Email us
            </a>
            <Link href="/contact-us" className="scene-pill px-4">
              Contact form
            </Link>
            <Link href="/track-order" className="scene-pill px-4">
              Track an order
            </Link>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-bright)]">
            Proudly Canadian
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h2 className="text-sm font-bold text-white">{col.heading}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="transition hover:text-[var(--color-gold-bright)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Holiday Lights Direct · Proudly Canadian · Shipping out of London,
        Ontario
      </div>
    </footer>
  );
}
