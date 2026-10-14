import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { AUDIENCES, audienceHref, FOREVER_LIGHTS_URL, FREE_SHIPPING_OVER, SHIP_FROM, SITE_EMAIL } from "@/lib/site";

const SHOP = [
  { label: "All products", href: "/shop" },
  { label: "C9 LED bulbs", href: "/product-category/large-strawberry-lights-c9" },
  { label: "Mini lights", href: "/product-category/mini-lights" },
  { label: "3D light displays", href: "/product-category/3d" },
  { label: "Photo-op displays", href: "/product-category/photo-op-displays" },
  { label: "Pole-mount décor", href: "/product-category/pole-mount-decor" },
  { label: "Wreaths & garland", href: "/product-category/garlands-and-wreathes" },
  { label: "Commercial bows", href: "/product-category/commercial-bows" },
  { label: "Commercial trees", href: "/product-category/trees" },
  { label: "Wire, spools & plugs", href: "/product-category/extension-cords-and-wire" },
  { label: "Permanent lighting kits", href: "/product-category/permanent-lighting-kits" }
];

const SUPPORT = [
  { label: "Request a quote", href: "/request-a-quote" },
  { label: "Guides & how-tos", href: "/resources" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & returns", href: "/shipping-returns" },
  { label: "5-year warranty", href: "/warranty" },
  { label: "Track your order", href: "/track-order" },
  { label: "Contact", href: "/contact-us" }
];

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--color-brand-deep)] text-white/80">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="shell grid gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="eyebrow text-[var(--color-gold-bright)]">Trade newsletter</p>
            <h2 className="font-display mt-3 text-3xl text-white md:text-4xl">Early-season pricing, new displays and stock alerts.</h2>
            <p className="mt-3 max-w-lg text-white/70">
              A few emails a season for buyers at malls, BIAs, municipalities and installation crews. Subscribe and we&rsquo;ll send a 10% code for your first order.
            </p>
          </div>
          <NewsletterForm variant="dark" source="footer" />
        </div>
      </div>

      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/logo.png" alt="Holiday Light Supplies" width={320} height={130} className="h-12 w-auto rounded bg-white/95 p-1.5" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Commercial-grade Christmas lighting and décor for malls, BIAs, municipalities, property managers and professional installers. Shipped from {SHIP_FROM} to every province.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Icon.mail size={16} className="text-[var(--color-gold-bright)]" /><a href={`mailto:${SITE_EMAIL}`} className="hover:text-white">{SITE_EMAIL}</a></li>
            <li className="flex items-center gap-2"><Icon.truck size={16} className="text-[var(--color-gold-bright)]" />Free shipping over ${FREE_SHIPPING_OVER} · Canada-wide</li>
            <li className="flex items-center gap-2"><Icon.invoice size={16} className="text-[var(--color-gold-bright)]" />Net-30 & tax-exempt for public sector</li>
          </ul>
          <p className="mt-5 text-xs text-white/50">
            Permanent lighting kits supplied by our sister brand{" "}
            <a href={FOREVER_LIGHTS_URL} target="_blank" rel="noopener" className="font-semibold text-white/80 underline-offset-2 hover:underline">Forever Lights</a>.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-gold-bright)]">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SHOP.map((l) => (
              <li key={l.href}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-gold-bright)]">Commercial & wholesale</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/commercial" className="transition hover:text-white">Commercial overview</Link></li>
            {AUDIENCES.map((a) => (
              <li key={a.slug}><Link href={audienceHref(a)} className="transition hover:text-white">{a.name}</Link></li>
            ))}
            <li><Link href="/municipalities" className="transition hover:text-white">Municipal & BIA accounts</Link></li>
            <li><Link href="/professional-installer" className="transition hover:text-white">Installer program</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-gold-bright)]">Help</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SUPPORT.map((l) => (
              <li key={l.href}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Holiday Light Supplies · {SHIP_FROM}, Canada</p>
          <p className="flex gap-4">
            <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/warranty" className="hover:text-white">Warranty</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
