import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E24] border-t border-[#1E1E42] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo className="h-10 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
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
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>London, Ontario<br />Serving all of Southwestern Ontario</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Fri, 8:00 AM – 5:00 PM</span>
              </li>
              <li className="mt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] hover:bg-[#8B5CF6]/30 hover:text-white transition-all text-xs font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Us a Message →
                </Link>
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
