import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/concrete-driveways", label: "Concrete Driveway Installation" },
  { href: "/concrete-patios", label: "Concrete Patios" },
  { href: "/concrete-retaining-walls", label: "Concrete Retaining Walls" },
  { href: "/stamped-concrete-driveway", label: "Stamped Concrete Driveway" },
  { href: "/concrete-removal-services", label: "Concrete Removal" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a2332] text-slate-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="https://londonconcreteforming.ca/wp-content/uploads/2023/12/LondonConcreteFormingLogo-1.png"
                alt="London Concrete Forming logo"
                width={44}
                height={44}
                className="rounded-md object-contain"
                unoptimized
              />
              <span className="text-white font-bold text-sm leading-tight">
                London<br />
                <span className="text-[#F7931E]">Concrete Forming</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Service Areas: London, St Thomas, and Woodstock
            </p>
            <a href={site.emailHref} className="text-slate-400 hover:text-[#F7931E] text-sm transition-colors break-all">
              {site.email}
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

          {/* Services + Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 mb-6">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#F7931E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={site.emailHref} className="text-slate-400 hover:text-[#F7931E] transition-colors break-all">{site.email}</a>
              </li>
              <li className="text-slate-400">{site.hoursDetailed}</li>
              <li className="text-slate-400">{site.addressLine}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700">
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
