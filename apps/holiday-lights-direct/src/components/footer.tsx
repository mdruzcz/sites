import Link from "next/link";

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
      { label: "Permanent Lights", href: "/permanent-lights" },
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
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact-us" },
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Privacy", href: "/privacy" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-ink-deep)] text-white/70">
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent" />
      <div className="border-b border-white/10">
        <ul className="shell grid grid-cols-2 gap-4 py-5 text-center text-xs md:grid-cols-4">
          {POLICIES.map((p) => (
            <li key={p} className="text-white/60">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-xl text-white">
            Holiday Lights <span className="text-[var(--color-gold-bright)]">Direct</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Aluminum-tracked permanent LED systems and professional Christmas lighting gear, shipped direct
            from London, Ontario.
          </p>
          <p className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-[var(--color-gold-bright)]">
            Proudly Canadian
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h2 className="eyebrow text-white/45">{col.heading}</h2>
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
