import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E24] border-t border-[#1E1E42] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/we-install-govee-new-logo-2-300x200.jpeg"
              alt="We Install Govee Lights logo"
              width={150}
              height={100}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Southwestern Ontario's trusted Govee permanent outdoor lighting
              specialists. Professional installs. Vibrant results. 5-year warranty.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/service-areas", label: "Service Areas" },
                { href: "/faq", label: "FAQ" },
                { href: "/warranty", label: "Warranty" },
                { href: "/contact", label: "Contact & Free Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-[#A78BFA] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>London, Ontario<br />Serving all of Southwestern Ontario</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@weinstallgoveelights.ca" className="hover:text-[#A78BFA] transition-colors">
                  info@weinstallgoveelights.ca
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Fri, 8:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1E1E42] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} We Install Govee Lights. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/warranty" className="hover:text-gray-300 transition-colors">Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
