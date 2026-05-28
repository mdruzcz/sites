"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/concrete-driveways", label: "Concrete Driveway Installation" },
  { href: "/concrete-patios", label: "Concrete Patios" },
  { href: "/concrete-retaining-walls", label: "Concrete Retaining Walls" },
  { href: "/stamped-concrete-driveway", label: "Stamped Concrete Driveway" },
  { href: "/concrete-removal-services", label: "Concrete Removal" },
  { href: "/concrete-shed-pad-installer", label: "Concrete Shed Pads" },
];

const areaLinks = [
  { href: "/woodstock-concrete-contractor", label: "Concrete Contractor in Woodstock" },
  { href: "/stratford-concrete-contractor", label: "Concrete Contractor in Stratford" },
  { href: "/chatham-concrete-contractor", label: "Concrete Contractor in Chatham" },
  { href: "/port-stanley-concrete-contractor", label: "Concrete Contractor in Port Stanley" },
  { href: "/sarnia-concrete-contractor", label: "Concrete Contractor in Sarnia" },
  { href: "/st-thomas-concrete-contractor", label: "Concrete Contractor in St. Thomas" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <header className="bg-[#1a2332] sticky top-0 z-40 shadow-lg">
      <div className="bg-[#F7931E] text-white text-xs text-center py-2 px-4">
        Over 20 years of experience across the team helping homeowners and their families.{" "}
        <a href={site.phoneHref} className="font-bold underline ml-1">{site.phone}</a>
      </div>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="https://londonconcreteforming.ca/wp-content/uploads/2023/12/LondonConcreteFormingLogo-1.png"
              alt="London Concrete Forming logo"
              width={44}
              height={44}
              className="rounded-md object-contain"
              unoptimized
            />
            <span className="text-white font-bold text-base leading-tight hidden sm:block">
              London<br />
              <span className="text-[#F7931E]">Concrete Forming</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors">Home</Link>
            <div className="relative group">
              <Link href="/about-us" className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1" style={{ minHeight: 44 }}>
                About Us
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              </Link>
              <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <Link href="/about-us" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F7931E]">About Us</Link>
                <Link href="/blog" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F7931E]">Blog</Link>
              </div>
            </div>
            <Link href="/concrete-finishes" className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors">Concrete Finishes</Link>
            <Link href="/concrete-stamps" className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors">Concrete Stamps</Link>
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1" style={{ minHeight: 44 }}>
                Services
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  {serviceLinks.map((s) => (
                    <Link key={s.href} href={s.href} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F7931E] transition-colors">{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setAreasOpen(true)} onMouseLeave={() => setAreasOpen(false)}>
              <button className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1" style={{ minHeight: 44 }}>
                Service Areas
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              </button>
              {areasOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  {areaLinks.map((a) => (
                    <Link key={a.href} href={a.href} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F7931E] transition-colors">{a.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact-us" className="text-slate-300 hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors">Contact Us</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={site.phoneHref} className="btn btn-primary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
              {site.phone}
            </a>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} style={{ minHeight: 44, minWidth: 44 }}>
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
            )}
          </button>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-700 pb-4">
            <div className="flex flex-col gap-1 pt-3">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white px-3 py-3 text-sm font-medium">Home</Link>
              <Link href="/about-us" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white px-3 py-3 text-sm font-medium">About Us</Link>
              <Link href="/concrete-finishes" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white px-3 py-3 text-sm font-medium">Concrete Finishes</Link>
              <Link href="/concrete-stamps" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white px-3 py-3 text-sm font-medium">Concrete Stamps</Link>
              <div className="px-3 py-2">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Services</p>
                {serviceLinks.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-slate-300 hover:text-[#F7931E]">{s.label}</Link>
                ))}
              </div>
              <div className="px-3 py-2">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Service Areas</p>
                {areaLinks.map((a) => (
                  <Link key={a.href} href={a.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-slate-300 hover:text-[#F7931E]">{a.label}</Link>
                ))}
              </div>
              <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white px-3 py-3 text-sm font-medium">Contact Us</Link>
              <div className="px-3 pt-3">
                <a href={site.phoneHref} className="btn btn-primary w-full justify-center">Call {site.phone}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}