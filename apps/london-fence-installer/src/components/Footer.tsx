import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="London Fence Installer logo"
                width={100}
                height={100}
                className="h-24 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              London's trusted fence contractor. Quality fencing solutions for residential and commercial properties across Southwestern Ontario.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[var(--accent)] uppercase tracking-wider text-sm mb-4">
              {site.name}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPinIcon />
                <span>{site.addressLine}</span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
                  <PhoneIcon />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
                  <MailIcon />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-[var(--accent)] uppercase tracking-wider text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/about-us">About Us</FooterLink></li>
              <li><FooterLink href="/services">Services</FooterLink></li>
              <li><FooterLink href="/contact-us">Contact Us</FooterLink></li>
              <li><FooterLink href="/privacy-policy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms-of-service">Terms of Service</FooterLink></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-[var(--accent)] uppercase tracking-wider text-sm mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/wood-fencing-contractor">Wood Fence Contractor</FooterLink></li>
              <li><FooterLink href="/chainlink-fencing">Chainlink Fencing</FooterLink></li>
              <li><FooterLink href="/vinyl-fence-installation">Vinyl Fence Installation</FooterLink></li>
              <li><FooterLink href="/metal-fence-installation">Metal Fence Installation</FooterLink></li>
              <li><FooterLink href="/fence-repair">Fence Repair</FooterLink></li>
              <li><FooterLink href="/noise-wall-and-highway-fencing">Noise Wall Fencing</FooterLink></li>
              <li><FooterLink href="/guardrail-installation">Guardrail Installation</FooterLink></li>
              <li><FooterLink href="/fence-staining">Fence Staining</FooterLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="bg-green py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg text-white">Upgrade Your Fence — Get a Quote Today!</p>
            <p className="text-sm text-gray-300">Call us at: <a href={site.phoneHref} className="text-[var(--accent)] font-bold hover:underline">{site.phone}</a></p>
          </div>
          <Link href="/contact-us" className="btn btn-primary flex-shrink-0">
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#111] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>©{new Date().getFullYear()} All rights reserved. <Link href="/" className="hover:text-[var(--accent)]">London Fence Installer</Link></p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[var(--accent)]">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--accent)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-[var(--accent)] transition-colors">
      {children}
    </Link>
  );
}

function PhoneIcon() {
  return <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}
function MailIcon() {
  return <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}
function MapPinIcon() {
  return <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
