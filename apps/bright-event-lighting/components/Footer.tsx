import Link from "next/link";
import { site } from "@/lib/site";

const eventLinks = [
  { href: "/events/weddings", label: "Wedding Lighting" },
  { href: "/events/corporate-events", label: "Corporate Event Lighting" },
  { href: "/events/holiday-parties", label: "Christmas Party Lighting & Decor" },
  { href: "/events/private-parties", label: "Backyard & Private Parties" },
  { href: "/packages", label: "Packages & Pricing" },
];

const serviceLinks = [
  { href: "/services/uplighting", label: "Uplighting" },
  { href: "/services/edison-string-lighting", label: "Edison String Lighting" },
  { href: "/services/tent-lighting", label: "Tent & Outdoor Lighting" },
  { href: "/services/cold-sparks-dance-floor", label: "Cold Sparks & Dance Floor" },
  { href: "/services/pinspot-wash-lighting", label: "Pinspot & Wash Lighting" },
  { href: "/services/tree-and-landscape-lighting", label: "Tree & Landscape Lighting" },
  { href: "/services/indoor-garlands-wreaths", label: "Garlands, Wreaths & Trees" },
  { href: "/services/mall-holiday-decor", label: "Mall & Commercial Holiday Decor" },
  { href: "/services/commercial-holiday-lighting", label: "Commercial Holiday Lighting" },
];

const areaLinks = [
  { href: "/service-areas/london", label: "London" },
  { href: "/service-areas/kitchener-waterloo", label: "Kitchener-Waterloo" },
  { href: "/service-areas/guelph", label: "Guelph" },
  { href: "/service-areas/stratford", label: "Stratford" },
  { href: "/service-areas/st-thomas", label: "St. Thomas" },
  { href: "/service-areas/woodstock", label: "Woodstock" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/our-process", label: "Our Process" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const linkClass = "block py-1.5 text-sm hover:text-[var(--accent)] transition-colors";

export function Footer() {
  return (
    <footer className="bg-[#0F0F10] text-[var(--muted)] border-t border-[var(--border)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
              Bright<span className="text-[var(--accent)]">Event</span> Lighting
            </h3>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
              Outdoor lighting and holiday decor for weddings, corporate events and Christmas parties across London, Ontario and Southwestern Ontario. Uplighting, Edison string lights, tent lighting, cold sparks, garlands and wreaths, and commercial and mall holiday displays.
            </p>
            <a href={site.phoneHref} className="text-sm text-[var(--foreground)] hover:text-[var(--accent)]">{site.phone}</a>
            <p className="text-sm mt-1">{site.addressLine}</p>
            <p className="text-sm mt-1">{site.hours}</p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Events</h4>
            {eventLinks.map((l) => <Link key={l.href} href={l.href} className={linkClass}>{l.label}</Link>)}
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3 mt-6">Company</h4>
            {companyLinks.map((l) => <Link key={l.href} href={l.href} className={linkClass}>{l.label}</Link>)}
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Services</h4>
            {serviceLinks.map((l) => <Link key={l.href} href={l.href} className={linkClass}>{l.label}</Link>)}
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Service Areas</h4>
            {areaLinks.map((l) => <Link key={l.href} href={l.href} className={linkClass}>{l.label}</Link>)}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row gap-3 justify-between text-xs text-[var(--muted)]/60">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[var(--accent)]">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--accent)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
