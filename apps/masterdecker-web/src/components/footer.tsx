import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects Example", href: "/project-examples" },
  { label: "Contact Us", href: "/contact" },
];

const additionalLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Locations", href: "/service-locations" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--shell)] text-white">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="Master Decker home" className="inline-block mb-5">
            <Image src="/images/logo-white.png" alt="Master Decker Inc. logo" width={180} height={55} className="h-14 w-auto" />
          </Link>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={site.phoneHref} className="hover:text-[var(--accent)] transition-colors">Phone: {site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--accent)] transition-colors">Email: {site.email}</a>
            </li>
            <li>Hours: {site.hours.weekday}</li>
            <li>Hours: {site.hours.saturday}</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-widest mb-5 text-[var(--accent)]">Quick Links</div>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/80 hover:text-[var(--accent)] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-widest mb-5 text-[var(--accent)]">Additional Resources</div>
          <ul className="space-y-2.5">
            {additionalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/80 hover:text-[var(--accent)] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-widest mb-5 text-[var(--accent)]">Follow Us</div>
          <div className="flex gap-3 mb-6">
            <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7c4.7-.8 8.4-4.9 8.4-9.9z" /></svg>
            </a>
            <a href={site.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18v-8.45H5.67V18h2.67zM7 8.3a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11 9.7v-4.9c0-2.4-1.3-3.5-3.04-3.5-1.4 0-2.04.77-2.4 1.32V9.55H9.9c.04.74 0 8.45 0 8.45h2.66v-4.72c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.96 0 1.34.73 1.34 1.8V18H18z" /></svg>
            </a>
          </div>
          <div className="text-sm font-bold uppercase tracking-widest mb-3 text-[var(--accent)]">Join Our Newsletter</div>
          <form className="flex gap-2">
            <input type="email" placeholder="Email" aria-label="Email address" className="flex-1 px-3 py-2 rounded text-[var(--ink)] text-sm bg-white" />
            <button type="submit" className="bg-[var(--accent)] hover:bg-[#d56814] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors">Send</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-white/60 text-center">
          Copyright <Link href="/" className="hover:text-white">{site.legalName}</Link> – All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
