import Link from "next/link";
import { site } from "@/lib/site";

function LcfLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="42" height="42" rx="8" fill="#F7931E" />
      <rect x="9" y="11" width="24" height="5" rx="1.5" fill="white" />
      <rect x="9" y="18.5" width="24" height="5" rx="1.5" fill="white" />
      <rect x="9" y="26" width="24" height="5" rx="1.5" fill="white" />
    </svg>
  );
}

const serviceLinks = [
  { href: "/concrete-driveways", label: "Concrete Driveway Installation" },
  { href: "/concrete-patios", label: "Concrete Patios" },
  { href: "/concrete-retaining-walls", label: "Concrete Retaining Walls" },
  { href: "/stamped-concrete-driveway", label: "Stamped Concrete Driveway" },
  { href: "/concrete-removal-services", label: "Concrete Removal" },
  { href: "/concrete-shed-pad-installer", label: "Concrete Shed Pads" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/concrete-finishes", label: "Concrete Finishes" },
  { href: "/concrete-stamps", label: "Concrete Stamps" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/blog", label: "Blog" },
];

const areaLinks = [
  { href: "/woodstock-concrete-contractor", label: "Woodstock" },
  { href: "/st-thomas-concrete-contractor", label: "St. Thomas" },
  { href: "/stratford-concrete-contractor", label: "Stratford" },
  { href: "/chatham-concrete-contractor", label: "Chatham" },
  { href: "/sarnia-concrete-contractor", label: "Sarnia" },
  { href: "/port-stanley-concrete-contractor", label: "Port Stanley" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#333333] text-slate-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <LcfLogo />
              <span className="text-white font-bold text-sm leading-tight">
                London<br />
                <span className="text-[#F7931E]">Concrete Forming</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Over 20 years of experience delivering quality concrete driveways, patios, and more across Southwestern Ontario.
            </p>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 text-[#F7931E] font-semibold text-sm hover:text-orange-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
              {site.phone}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#F7931E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#F7931E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas + Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Service Areas</h3>
            <ul className="space-y-2 mb-6">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#F7931E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Hours</h3>
            <p className="text-slate-400 text-sm">Mon–Sun 8:00am–6:00pm</p>
            <p className="text-slate-400 text-sm mt-1">{site.addressLine}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-600">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
