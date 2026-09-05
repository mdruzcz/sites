import Link from "next/link";
import { Logo } from "@/components/logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Permanent lighting kits", href: "/diy-kits" },
      { label: "Lights", href: "/product-category/lights" },
      { label: "Controllers", href: "/product-category/controllers" },
      { label: "Power supplies", href: "/product-category/power-supplies" },
      { label: "Connectors & cables", href: "/product-category/connectors" },
      { label: "Track & hardware", href: "/product-category/hardware" },
      { label: "All products", href: "/shop" }
    ]
  },
  {
    title: "Learn",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Guides & how-tos", href: "/resources" },
      { label: "DIY vs professional", href: "/compare" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact-us" },
      { label: "Track your order", href: "/track-order" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "5-year warranty", href: "/warranty" },
      { label: "Your account", href: "/account" }
    ]
  },
  {
    title: "Pros",
    links: [
      { label: "Find an installer", href: "/installers" },
      { label: "Installer program", href: "/professional-installer" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--color-ink)] text-white/80">
      <div className="border-b border-white/10 bg-[var(--color-ink-deep)]">
        <div className="shell grid grid-cols-2 gap-3 py-4 text-center text-xs text-white/80 md:grid-cols-4">
          <span>12V RGBW, 16M colours</span>
          <span>Free shipping over $500</span>
          <span>5-year parts warranty</span>
          <span>Ships from London, Ontario</span>
        </div>
      </div>

      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Professional-grade permanent LED roofline lighting, sold as complete DIY kits and parts. Same
            track-and-puck hardware installers use, shipped direct from London, Ontario.
          </p>
          <p className="mt-4 text-xs text-white/50">Canadian owned · CSA Class 2 low voltage · WLED app control</p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow text-[var(--color-gold)]">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="inline-block min-h-[28px] transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Permanent Lighting Direct · London, Ontario, Canada</p>
          <p className="flex gap-4">
            <Link href="/shipping-returns" className="hover:text-white">Shipping & returns</Link>
            <Link href="/warranty" className="hover:text-white">Warranty</Link>
            <Link href="/contact-us" className="hover:text-white">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
