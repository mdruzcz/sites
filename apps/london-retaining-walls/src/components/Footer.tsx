import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--dark)] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Image
            src="/images/logo.png"
            alt="London Retaining Walls logo"
            width={180}
            height={55}
            className="h-12 w-auto object-contain brightness-0 invert mb-4"
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Welcome to London Retaining Walls, where we specialize in providing high-quality retaining wall solutions tailored to meet the unique needs of each landscape.
          </p>
          <div className="mt-5 space-y-1 text-sm text-gray-400">
            <p><a href={`mailto:${site.email}`} className="hover:text-[var(--accent)] transition-colors">{site.email}</a></p>
            <p><a href={site.phoneHref} className="hover:text-[var(--accent)] transition-colors">{site.phone}</a></p>
          </div>
          <div className="mt-3 text-sm text-gray-400">
            <p>Monday to Friday: 8:00 AM – 5:00 PM</p>
            <p>Weekends: Closed</p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-5 text-white font-[family-name:var(--font-poppins)]">Services</h3>
          <ul className="space-y-2 text-sm">
            {site.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-5 text-white font-[family-name:var(--font-poppins)]">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Service Areas", href: "/service-areas" },
              { label: "Helpful Tips", href: "/blog" },
              { label: "Contact Us", href: "/contact-us" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-5 text-white font-[family-name:var(--font-poppins)]">Service Areas</h3>
          <ul className="space-y-2 text-sm">
            {site.serviceAreas.slice(0, 8).map((a) => (
              <li key={a.name}>
                <Link href={a.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors">{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4 text-center text-xs text-gray-500">
        <p>
          &copy; {year} All Rights Reserved{" "}
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">{site.name}</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link href="/privacy-policy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link href="/terms-of-service" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
