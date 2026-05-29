"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { ServiceCity } from "../../content/cities";

<<<<<<< HEAD
/* ─── ICONS ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
=======
/* ─── ICONS (inline SVG helpers) ────────────────────────────────────── */
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
>>>>>>> origin/main
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ChevronDownIcon = () => (
<<<<<<< HEAD
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
=======
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
>>>>>>> origin/main
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

<<<<<<< HEAD
const PHONE = "519-914-5697";
const PHONE_HREF = "tel:5199145697";
const EMAIL = "service@woodstockdeckandfence.ca";

/* ─── NAV ─────────────────────────────────────────────────── */
=======
/* ─── NAV ────────────────────────────────────────────────────────────── */
>>>>>>> origin/main
export function NavBar({ homeHref = "" }: { homeHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

<<<<<<< HEAD
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ backgroundColor: scrolled ? "rgba(26,53,40,0.97)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href={homeHref || "/"} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--cedar)" }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-bold text-base text-white">Woodstock</div>
              <div className="text-xs font-medium" style={{ color: "var(--cedar-light)" }}>Deck &amp; Fence</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Services <ChevronDownIcon />
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50"
                style={{ backgroundColor: "var(--forest)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="p-2">
                  <a href="/services/deck-building" className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Deck Building</a>
                  <a href="/services/fence-building" className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Fence Building</a>
                  <a href="/services/deck-restoration" className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Deck Restoration</a>
                  <a href="/services" className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">All Services &rarr;</a>
                </div>
              </div>
            </div>
            <a href={`${homeHref}#service-areas`} className="text-sm font-medium text-white/80 hover:text-white transition-colors">Service Areas</a>
            <a href="/gallery" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Gallery</a>
            <a href={`${homeHref}#faq`} className="text-sm font-medium text-white/80 hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href={PHONE_HREF} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors">
              <PhoneIcon />{PHONE}
            </a>
            <a href={`${homeHref}#contact`}
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--cedar)" }}>
              Free Quote
            </a>
            <button className="lg:hidden text-white p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ backgroundColor: "var(--forest)", borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="px-4 py-4 space-y-1">
            <a href="/services/deck-building" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>Deck Building</a>
            <a href="/services/fence-building" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>Fence Building</a>
            <a href="/services/deck-restoration" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>Deck Restoration</a>
            <a href="/services" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>All Services</a>
            <a href="#service-areas" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>Service Areas</a>
            <a href="/gallery" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>Gallery</a>
            <a href="#faq" className="block py-2 text-white/80 hover:text-white" onClick={() => setOpen(false)}>FAQ</a>
            <a href={PHONE_HREF} className="block py-2 font-semibold" style={{ color: "var(--cedar-light)" }}>{PHONE}</a>
            <a href="#contact" className="block mt-2 py-3 text-center text-white font-semibold rounded-lg" style={{ backgroundColor: "var(--cedar)" }} onClick={() => setOpen(false)}>
              Get a Free Quote
=======
  const links = [
    { href: `${homeHref}#services`, label: "Services" },
    { href: `${homeHref}#materials`, label: "Materials" },
    { href: `${homeHref}#service-areas`, label: "Service Areas" },
    { href: "/blog", label: "Blog" },
    { href: `${homeHref}#faq`, label: "FAQ" },
    { href: `${homeHref}#contact`, label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#2C1810]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href={homeHref || "/"} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--cedar)" }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </div>
            <span className="font-serif font-bold text-lg text-white leading-tight">
              London<br />
              <span style={{ color: "var(--cedar-light)" }}>Deck Builder</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:5199141663"
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <PhoneIcon />
              (519) 914-1663
            </a>
            <a
              href={`${homeHref}#contact`}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--cedar)" }}
            >
              Free Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: "#2C1810" }}>
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-white py-1 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`${homeHref}#contact`}
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-full text-sm font-semibold text-white mt-2"
              style={{ backgroundColor: "var(--cedar)" }}
            >
              Get Free Quote
>>>>>>> origin/main
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

<<<<<<< HEAD
/* ─── HERO ─────────────────────────────────────────────────── */
export function Hero({ city }: { city?: string }) {
  const headline = city
    ? `Deck & Fence Builders in ${city}, ON`
    : "Expert Deck & Fence Construction in Woodstock, ON";
  const sub = city
    ? `Professional deck building and fence installation in ${city}. Custom PT, cedar & composite decks — vinyl, wood & steel fencing. 5-year workmanship warranty.`
    : "From custom cedar decks to high-security vinyl fencing. Built deep, built right, built for Ontario winters.";

  return (
    <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "var(--forest)" }}>
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/images/legacy/Custom-Deck-Design-Installation.png"
          alt={city ? `Deck and fence contractor in ${city}, Ontario` : "Custom deck and fence construction in Woodstock, Ontario"}
          fill className="object-cover" priority
        />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,53,40,0.95) 0%, rgba(26,53,40,0.70) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(196,118,42,0.15)", color: "var(--cedar-light)", border: "1px solid rgba(196,118,42,0.3)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Locally Owned &middot; Woodstock, Ontario
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{headline}</h1>
          <p className="text-lg lg:text-xl text-white/75 mb-8 max-w-2xl leading-relaxed">{sub}</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["5-Year Workmanship Warranty", "Fully Insured", "Permits Handled", "4-Ft Deep Posts"].map((chip) => (
              <span key={chip} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white/90"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <CheckIcon />{chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "var(--cedar)" }}>
              Get Your Free Estimate
            </a>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:bg-white/20"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <PhoneIcon />{PHONE}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <a href={PHONE_HREF}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold shadow-2xl"
        style={{ backgroundColor: "var(--cedar)" }} aria-label="Call Woodstock Deck and Fence">
        <PhoneIcon />Call Now
      </a>
    </section>
  );
}

/* ─── STATS STRIP ──────────────────────────────────────────── */
export function StatsStrip() {
  return (
    <section style={{ backgroundColor: "var(--cedar)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x divide-white/30">
          {[["500+", "Projects Completed"], ["5-Year", "Workmanship Warranty"], ["4 Ft", "Minimum Post Depth"], ["100%", "Permit-Ready Builds"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-serif text-3xl font-bold text-white">{v}</div>
              <div className="text-sm text-white/80 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─────────────────────────────────────────────── */
export function Services() {
  const services = [
    { icon: "🏗️", title: "Deck Building", slug: "deck-building", description: "Custom decks designed for your home and lifestyle. PT, cedar and composite options with proper footings for Ontario frost cycles.", features: ["Pressure-Treated (PT) Decks", "Natural Cedar Decks", "Composite / Trex / TimberTech", "Multi-Level & Pool Decks"] },
    { icon: "🛡️", title: "Fence Building", slug: "fence-building", description: "Privacy, security and curb appeal. Vinyl, wood, ornamental steel and chain-link fences with 4-foot posts set below the frost line.", features: ["Vinyl / PVC Privacy Fences", "Wood & PT Board Fences", "Ornamental Steel Fencing", "Chain-Link Fencing"] },
    { icon: "🔨", title: "Deck Restoration", slug: "deck-restoration", description: "Professional pressure washing, sanding, structural repairs and premium staining — new life for a weathered deck without a full rebuild.", features: ["Pressure Washing & Cleaning", "Sanding & Board Repairs", "Premium Wood Staining", "Railing & Gate Repairs"] },
    { icon: "🏡", title: "Pergolas & Structures", slug: "outdoor-structures", description: "Extend your outdoor living with a custom pergola, gazebo or privacy screen designed to complement your deck or fence.", features: ["Custom Pergolas", "Privacy Screens", "Gazebos", "Post Hole Digging & Setting"] },
  ];

  return (
    <section id="services" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>What We Build</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--forest)" }}>Decks &amp; Fences Built to Last</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every project follows our Woodstock Standard — deep-set posts, galvanized hardware, and materials rated for Canadian winters.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`}
              className="group block rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-300"
              style={{ border: "1px solid var(--cream-dark)" }}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-[var(--cedar)] transition-colors" style={{ color: "var(--forest)" }}>{s.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.description}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span style={{ color: "var(--cedar)" }}><CheckIcon /></span>{f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-sm font-semibold" style={{ color: "var(--cedar)" }}>Learn more &rarr;</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MATERIALS ────────────────────────────────────────────── */
export function Materials() {
  const deckMats = [
    { name: "Pressure-Treated (PT)", desc: "Most popular choice. Durable, cost-effective and beautiful when stained. Ideal for Ontario wet seasons.", badge: "Best Value" },
    { name: "Natural Cedar", desc: "Naturally rot and insect resistant. Stunning natural grain. Premium look that ages beautifully.", badge: "Premium Look" },
    { name: "Composite / Trex", desc: "Zero maintenance. 25-year warranty against fading and rot. Perfect for busy families.", badge: "Zero Maintenance" },
  ];
  const fenceMats = [
    { name: "Vinyl / PVC", desc: "Never paint, never stain, never rot. White, tan and grey. The ultimate low-maintenance fence.", badge: "Most Popular" },
    { name: "Wood / PT", desc: "Classic look, natural character. Board-on-board, shadowbox and picket styles. Stainable to any preference.", badge: "Classic Style" },
    { name: "Ornamental Steel", desc: "Elegant spear-top designs. Powder-coated rust resistance. Maximum curb appeal and security.", badge: "Premium Curb Appeal" },
    { name: "Chain-Link", desc: "Cost-effective, high-visibility security. Galvanized or vinyl-coated. Great for pets and commercial use.", badge: "Budget Friendly" },
  ];

  return (
    <section id="materials" className="py-20 lg:py-28" style={{ backgroundColor: "var(--forest)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Materials We Use</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">The Right Material for Every Project</h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">We stock and install only materials proven to handle Southwestern Ontario&apos;s humid summers and harsh winters.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-5">🏗️ Deck Materials</h3>
            <div className="space-y-4">
              {deckMats.map((m) => (
                <div key={m.name} className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-white">{m.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--cedar)", color: "white" }}>{m.badge}</span>
                  </div>
                  <p className="text-sm text-white/65">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-5">🛡️ Fence Materials</h3>
            <div className="space-y-4">
              {fenceMats.map((m) => (
                <div key={m.name} className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-white">{m.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--cedar)", color: "white" }}>{m.badge}</span>
                  </div>
                  <p className="text-sm text-white/65">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ───────────────────────────────────────────────── */
export function WhyUs() {
  const reasons = [
    { icon: "📍", title: "Locally Owned & Operated", desc: "We live where we work. Our reputation in Woodstock and Oxford County is our most valuable asset." },
    { icon: "📋", title: "Stress-Free Permit Management", desc: "City of Woodstock building permits, Ontario One Call locates — we handle all the red tape so you don't have to." },
    { icon: "🏗️", title: "The 4-Foot Post Standard", desc: "Every post goes 4 feet minimum — below Ontario's frost line — preventing the leaning and shifting that plagues cheaper builds." },
    { icon: "🛡️", title: "5-Year Workmanship Warranty", desc: "We stand behind every build with a full 5-year workmanship warranty plus manufacturer warranties on composite and vinyl." },
    { icon: "⚡", title: "Galvanized Hardware Throughout", desc: "Hot-dipped galvanized or stainless fasteners only — no rusting screws that streak your wood or weaken the structure." },
    { icon: "✅", title: "Craftsmanship Over Speed", desc: "We take the time to ensure every board is level, every cut is precise, and every gate swings perfectly." },
  ];
  return (
    <section id="why-us" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>The Woodstock Standard</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>Why Homeowners Trust Us</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">Oxford County&apos;s heavy clay soil and deep winter freezes destroy poorly installed structures within a few seasons. We do things differently.</p>
            <a href="#contact" className="inline-flex items-center px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: "var(--cedar)" }}>
              Get a Free Estimate
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-xl p-5 bg-white" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--forest)" }}>{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
=======
/* ─── HERO ───────────────────────────────────────────────────────────── */
export function Hero({ city }: { city?: string }) {
  const isCity = !!city && city !== "London";
  const badge = isCity
    ? `Serving ${city}, Ontario`
    : "Woodstock, Ontario's Trusted Deck and Fence Builders";
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://londondeckbuilder.ca/wp-content/uploads/2025/05/IMG-9498-scaled-1-1024x768.jpg"
          alt={`Beautiful deck built by Woodstock Deck and Fence in ${city || "London"}, Ontario`}
          fill
          className="object-cover"
          priority
        />
        {/* Warm dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(44,24,16,0.82) 0%, rgba(92,61,46,0.55) 60%, rgba(44,24,16,0.4) 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6" style={{ backgroundColor: "rgba(196,118,42,0.25)", color: "var(--cedar-light)", border: "1px solid rgba(212,165,116,0.4)" }}>
            {badge}
          </div>

          {isCity ? (
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Deck Builder in<br />
              <span style={{ color: "var(--cedar-light)" }}>{city}</span><br />
              Ontario
            </h1>
          ) : (
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Expand Your<br />
              <span style={{ color: "var(--cedar-light)" }}>Outdoor Living</span><br />
              Space
            </h1>
          )}

          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
            {isCity
              ? `Premium PT, cedar, composite and PVC decks built for ${city} homes. Free quotes, transparent pricing, 5-year workmanship warranty.`
              : "From BBQs to family gatherings, we build premium decks that transform your backyard into a place you'll love spending time in. Free quotes, transparent pricing, 5-year warranty."}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "var(--cedar)" }}
            >
              Request Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="tel:5199141663"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-all"
            >
              <PhoneIcon />
              (519) 914-1663
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "5-Year Warranty", sub: "Workmanship guaranteed" },
              { label: "Free Quotes", sub: "No obligation" },
              { label: "Transparent Pricing", sub: "No hidden fees" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(196,98,58,0.3)" }}>
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.label}</p>
                  <p className="text-xs text-white/60">{b.sub}</p>
                </div>
>>>>>>> origin/main
              </div>
            ))}
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
>>>>>>> origin/main
    </section>
  );
}

<<<<<<< HEAD
/* ─── PROCESS ──────────────────────────────────────────────── */
export function Process() {
  const steps = [
    { n: "01", title: "Free On-Site Quote", desc: "We visit your property to measure, discuss materials and provide a transparent digital estimate — no pressure, no obligation." },
    { n: "02", title: "Permits & Locates", desc: "We handle City of Woodstock building permit applications and coordinate Ontario One Call to mark all underground utilities before we dig." },
    { n: "03", title: "The Deep-Set Build", desc: "Every post goes 4 feet minimum. Premium-grade lumber and galvanized fasteners throughout for a structure built to last decades." },
    { n: "04", title: "Final Walk-Through", desc: "We don't leave until the site is spotless and you're 100% satisfied. Safety check on all railings and gates — ready for immediate use." },
  ];
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>How It Works</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--forest)" }}>Our 4-Step Build Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A clear, stress-free process from first call to final walk-through.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-serif text-xl font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>{s.n}</div>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--forest)" }}>{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
=======
/* ─── STATS STRIP ────────────────────────────────────────────────────── */
export function StatsStrip() {
  const stats = [
    { number: "500+", label: "Decks Built" },
    { number: "5-Year", label: "Workmanship Warranty" },
    { number: "4–8", label: "Days to Complete" },
    { number: "10–25yr", label: "Material Warranties" },
  ];
  return (
    <section className="py-10 border-y" style={{ backgroundColor: "var(--forest)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold mb-1" style={{ color: "var(--cedar-light)" }}>{s.number}</p>
              <p className="text-sm text-white/60">{s.label}</p>
>>>>>>> origin/main
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── GALLERY PREVIEW ──────────────────────────────────────── */
export function GalleryPreview() {
  const photos = [
    { src: "/images/legacy/Custom-Deck-Design-Installation.png", alt: "Custom composite deck installation in Woodstock, Ontario" },
    { src: "/images/legacy/Professional-Fencing-Solutions.png", alt: "Professional vinyl privacy fence installed in Oxford County" },
    { src: "/images/legacy/Deck-Restoration-Refinishing-2.png", alt: "Deck restoration and refinishing in Woodstock, ON" },
    { src: "/images/legacy/Fence-Staining-Restoration-2.png", alt: "Wood fence staining and restoration by Woodstock Deck and Fence" },
    { src: "/images/legacy/Deck-Staining-Sealing-2-1.png", alt: "Deck staining and sealing in Oxford County" },
    { src: "/images/legacy/Specialized-Outdoor-Structures.png", alt: "Custom pergola built in Woodstock, Ontario" },
  ];
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>Our Work</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--forest)" }}>Recent Projects</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">Decks and fences built across Woodstock and Oxford County.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 mb-10">
          {photos.map((p, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={p.src} alt={p.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="/gallery" className="inline-flex items-center px-8 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:text-white hover:bg-[var(--cedar)]"
            style={{ borderColor: "var(--cedar)", color: "var(--cedar)" }}>
            View Full Gallery &rarr;
          </a>
=======
/* ─── INTRO / WHY LONDON DECK BUILDERS ──────────────────────────────── */
export function WhyUs() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>
              Building Decks<br />Londoners Love
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--wood)" }}>
              Founded by Kyle, Woodstock Deck and Fence was built on a simple belief: every homeowner deserves a backyard they're excited to spend time in. Armed with hands-on expertise and a passion for craftsmanship, we deliver decks that look stunning and last for decades.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Free Quotes",
                  desc: "Get your free quote today — expert deck services at affordable, transparent prices.",
                },
                {
                  title: "Expert Planning",
                  desc: "We handle every detail of the planning stages to ensure your vision becomes reality.",
                },
                {
                  title: "Permit Assistance",
                  desc: "We navigate the permit process for you, ensuring full compliance with local regulations.",
                },
                {
                  title: "Timely Completion",
                  desc: "We pride ourselves on meeting deadlines so you can enjoy your new deck sooner.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: "var(--cedar)", color: "white" }}>
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5" style={{ color: "var(--forest)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--wood)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://londondeckbuilder.ca/wp-content/uploads/2025/05/Wilmot-Deck-and-Concrete-rotated-2-768x1024.jpg"
                alt="Woodstock Deck and Fence project"
                width={768}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl p-5 shadow-xl" style={{ backgroundColor: "var(--forest)" }}>
              <p className="font-serif text-2xl font-bold mb-0.5" style={{ color: "var(--cedar-light)" }}>Kyle</p>
              <p className="text-xs text-white/60">Founder & Lead Builder</p>
              <div className="flex gap-0.5 mt-2">
                {[0,1,2,3,4].map(i => (
                  <span key={i} style={{ color: "var(--cedar-light)" }}><StarIcon /></span>
                ))}
              </div>
            </div>
          </div>
>>>>>>> origin/main
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── TESTIMONIALS ─────────────────────────────────────────── */
export function Testimonials() {
  const reviews = [
    { quote: "Woodstock Deck & Fence did an amazing job building our new backyard deck. The craftsmanship is excellent, and the team was professional from start to finish. Highly recommend.", name: "Mark T.", location: "Woodstock, ON" },
    { quote: "Our composite deck looks incredible. The quality of materials and attention to detail really show. If you're looking for reliable deck builders in Woodstock, these are the guys to call.", name: "Ryan P.", location: "Woodstock, ON" },
    { quote: "We had our old fence replaced, and the results exceeded our expectations. The crew worked efficiently, kept the site clean, and delivered exactly what they promised.", name: "Jennifer L.", location: "Ingersoll, ON" },
    { quote: "Very professional and easy to work with. They repaired our damaged fence posts and stained the deck, and everything looks brand new again.", name: "Ashley M.", location: "Tillsonburg, ON" },
    { quote: "Fair pricing, clear communication, and high-quality workmanship. They completed our project on time and within budget. Couldn't be happier.", name: "David K.", location: "Norwich, ON" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--forest)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex justify-center gap-0.5 mb-4" style={{ color: "var(--cedar-light)" }}>
            {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Real Customer Reviews</p>
          <h2 className="font-serif text-4xl font-bold text-white">What Our Clients Say</h2>
        </div>
        <div className="relative min-h-[200px]">
          {reviews.map((r, i) => (
            <div key={i} className={`absolute inset-0 transition-all duration-700 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <blockquote className="text-center">
                <p className="text-xl lg:text-2xl text-white/90 italic leading-relaxed mb-8">&ldquo;{r.quote}&rdquo;</p>
                <footer className="text-white/60">
                  <span className="font-semibold text-white">{r.name}</span> &middot; {r.location}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === active ? "var(--cedar)" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
=======
/* ─── SERVICES ───────────────────────────────────────────────────────── */
export function Services() {
  const services = [
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/IMG_0370.jpg",
      title: "Pressure Treated Decks",
      desc: "Durable, affordable PT lumber decks built to withstand Ontario's harsh climate. Resistant to decay and pests.",
    },
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/Gails-Cedar-Deck.jpg",
      title: "Cedar Deck Building",
      desc: "Premium natural cedar decks with beautiful aesthetics. Cedar is naturally rot-resistant and stands the test of time.",
    },
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/IMG-9498-scaled-2-768x576.jpg",
      title: "Composite & PVC Decking",
      desc: "Low-maintenance composite and PVC decking from top brands. Beautiful, durable, and virtually maintenance-free.",
    },
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/Permit.jpg",
      title: "Deck Permit Assistance",
      desc: "Navigating permits can be a hurdle. We handle the entire permit process and ensure full local compliance.",
    },
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/Gazebo-and-Deck-2-1.jpg",
      title: "Lighting & Features",
      desc: "Enhance your deck with custom lighting, built-in benches, planters, pergolas, and more. We make it functional and stunning.",
    },
    {
      img: "https://londondeckbuilder.ca/wp-content/uploads/2025/05/Deck-Before-Heavy-Sanding.jpg",
      title: "Deck Repair & Maintenance",
      desc: "Annual maintenance packages, deck cleaning, sealing, and repairs. Protect your investment for years to come.",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            What We Offer
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--forest)" }}>
            Our Expert Services
          </h2>
          <p className="text-lg" style={{ color: "var(--wood)" }}>
            As your trusted deck contractor, we handle everything — from planning and permits to the finishing touches.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--forest)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--wood)" }}>{s.desc}</p>
                <a href="#contact" className="text-sm font-semibold transition-colors hover:underline" style={{ color: "var(--cedar)" }}>
                  Get a quote →
                </a>
              </div>
            </div>
          ))}
        </div>
>>>>>>> origin/main
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── FAQ ──────────────────────────────────────────────────── */
export function FAQ() {
  const faqs = [
    { q: "Do I need a building permit for my deck or fence?", a: "In Woodstock, fences generally do not require a permit unless they enclose a swimming pool. Decks typically require a permit if higher than 24 inches off the ground or attached to the house. We handle the entire permit application process for you as part of the project." },
    { q: "How deep do you dig your post holes?", a: "Every post hole goes a minimum of 4 feet deep — guaranteed. This ensures your foundation is below Ontario's frost line, preventing leaning and shifting during the freeze-thaw cycles that cause problems with shallower installations." },
    { q: "How long does a typical project take?", a: "Most residential fence projects are completed in 2–3 days. Decks typically take 1–2 weeks depending on size and materials. Composite and cedar decks may take slightly longer than PT builds due to additional detailing." },
    { q: "Do you call before you dig?", a: "Yes — always. By law, underground utility lines must be marked before digging. We coordinate with Ontario One Call to ensure all gas, water and hydro lines are clearly marked before any equipment touches your property." },
    { q: "What material is best for Woodstock weather?", a: "While cedar is beautiful, Composite (Trex/TimberTech) and Vinyl are the most popular choices for Woodstock homeowners — they never rot, warp or require staining, making them perfect for our humid summers and snowy winters. PT wood remains the best-value option if you're willing to stain every 2–3 years." },
    { q: "Do you offer a warranty on your work?", a: "Absolutely. We provide a 5-year workmanship warranty on all installations, in addition to manufacturer warranties on composite and vinyl materials, which often cover 25+ years against fading and structural defects." },
    { q: "Can you build on a slope or around a pool?", a: "Yes. We specialize in multi-level decks, sloped yard builds and pool deck structures. We engineer each build for your specific lot and ensure all pool fencing meets City of Woodstock safety by-laws." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>Common Questions</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--forest)" }}>Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything Woodstock homeowners ask before hiring us.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl bg-white overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-semibold" style={{ color: "var(--forest)" }}>{f.q}</span>
                <span className={`flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} style={{ color: "var(--cedar)" }}>
=======
/* ─── MATERIALS ──────────────────────────────────────────────────────── */
export function Materials() {
  const materials = [
    {
      icon: "🪵",
      title: "Pressure Treated",
      subtitle: "Most affordable",
      features: ["Rot & pest resistant", "Long-lasting", "Classic look", "Budget-friendly"],
    },
    {
      icon: "🌲",
      title: "Cedar",
      subtitle: "Natural beauty",
      features: ["Natural aesthetics", "Naturally rot-resistant", "Lightweight", "Premium finish"],
    },
    {
      icon: "⚙️",
      title: "Composite",
      subtitle: "Low maintenance",
      features: ["10–25yr warranty", "No staining needed", "Eco-friendly", "Colour-fast"],
    },
    {
      icon: "🔩",
      title: "PVC Decking",
      subtitle: "Maximum durability",
      features: ["100% waterproof", "Scratch resistant", "Fade resistant", "Easy cleaning"],
    },
  ];

  return (
    <section id="materials" className="py-20 lg:py-28" style={{ backgroundColor: "var(--forest)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            Premium Materials
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-white">
            Decking for Every Style & Budget
          </h2>
          <p className="text-lg text-white/60">
            We work with the finest materials so your deck looks great and performs for decades.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl p-6 border hover:border-[#C4623A] transition-all duration-300 group"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="text-3xl mb-4">{m.icon}</div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">{m.title}</h3>
              <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--cedar)" }}>{m.subtitle}</p>
              <ul className="space-y-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <span style={{ color: "var(--cedar-light)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BENEFITS ───────────────────────────────────────────────────────── */
export function Benefits() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://londondeckbuilder.ca/wp-content/uploads/2025/05/IMG-9498-scaled-1-1024x768.jpg"
                alt="Backyard deck lifestyle"
                width={1024}
                height={768}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
              The Benefits
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>
              Get More From<br />Your Backyard
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--wood)" }}>
              Dreaming of summer barbecues, alfresco dinners, or a cozy spot to unwind? A deck transforms your unused outdoor space into an extension of your home.
            </p>

            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Extended Living Space",
                  desc: "A deck offers an additional area for relaxation, dining, or entertaining — effectively expanding your home's usable space into the outdoors.",
                },
                {
                  num: "02",
                  title: "More Gatherings & Events",
                  desc: "A deck becomes the ideal spot for hosting events, from casual family get-togethers to larger gatherings or parties.",
                },
                {
                  num: "03",
                  title: "Improved Curb Appeal & Value",
                  desc: "A deck can complement your home's architecture, elevate its aesthetic appeal, and boost its market value when you sell.",
                },
              ].map((b) => (
                <div key={b.num} className="flex gap-5">
                  <span className="font-serif text-4xl font-bold flex-shrink-0 leading-none" style={{ color: "var(--cedar-light)" }}>{b.num}</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: "var(--forest)" }}>{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--wood)" }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--cedar)" }}
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────── */
export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmad",
      location: "Belmont, Ontario",
      text: "Kyle transformed our deck beyond our expectations. He skillfully doubled its size, blending the new seamlessly with the old. Thanks to him, our gatherings are bigger and better than ever!",
      img: "https://londondeckbuilder.ca/wp-content/uploads/2024/03/testimonial-1.jpg",
    },
    {
      name: "John",
      location: "Woodstock, Ontario",
      text: "Working with Woodstock Deck and Fence was a game-changer for us. Their expertise during the planning stages was invaluable, ensuring our vision was both practical and beautiful. It's rare to find a contractor so committed to a project from start to finish.",
      img: "https://londondeckbuilder.ca/wp-content/uploads/2024/03/testimonial-3.jpg",
    },
    {
      name: "Joshua",
      location: "Dorchester, Ontario",
      text: "Cameron was the supervisor on our project. His attention to detail was truly remarkable. He ensured every aspect of our deck was executed to perfection. With Cameron at the helm, we felt confident and thrilled with the results.",
      img: "https://londondeckbuilder.ca/wp-content/uploads/2024/03/testimonial-2.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            Happy Customers
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ color: "var(--forest)" }}>
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative">
              {/* Big quote mark */}
              <div className="absolute top-6 right-6 text-6xl font-serif leading-none" style={{ color: "var(--cedar-light)" }}>"</div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" style={{ color: "var(--cedar)" }}>
                {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--wood)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.img} alt={t.name} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--forest)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--wood-light)" }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does it take to build a 500 sq ft deck?",
      a: "For a project of that size, it typically takes us 4–8 days, depending on weather conditions and the specific requirements of the design. We always strive to complete projects efficiently without compromising on quality.",
    },
    {
      q: "Do you offer warranties on the decks you build?",
      a: "Absolutely! Woodstock Deck and Fence offers a 5-year workmanship warranty on all our decks. The materials often come with their manufacturer warranties, which can range from 10 to 25 years depending on what you choose.",
    },
    {
      q: "Are there hidden fees in your quotes?",
      a: "Our quotes are fully transparent, detailing all the costs involved. We prioritize open communication — you'll never be hit with unexpected fees. Any potential additional costs are discussed and approved by you before work commences.",
    },
    {
      q: "What kind of maintenance will my deck require?",
      a: "Maintenance depends on the material you choose. Composite decking requires minimal upkeep — just occasional cleaning. Wood decks (PT or cedar) may need periodic sealing or staining. We provide detailed maintenance guidelines tailored to your specific deck.",
    },
    {
      q: "Can you help obtain the necessary permits?",
      a: "Definitely! We assist our clients in navigating the permit process and ensure all builds are compliant with local regulations. This is included in our full-service offering.",
    },
    {
      q: "How soon can construction start after finalizing the design?",
      a: "Once the design is finalized and any necessary permits are secured, we can typically start construction within 2–4 weeks, depending on our current project schedule.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            Got Questions?
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ color: "var(--forest)" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--cream-dark)" }}>
              <button
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#FAF5EE] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold pr-4" style={{ color: "var(--forest)" }}>{faq.q}</span>
                <span className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} style={{ color: "var(--cedar)" }}>
>>>>>>> origin/main
                  <ChevronDownIcon />
                </span>
              </button>
              {open === i && (
<<<<<<< HEAD
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{f.a}</p>
=======
                <div className="px-5 pb-5 pt-1 bg-white">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--wood)" }}>{faq.a}</p>
>>>>>>> origin/main
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── SERVICE AREAS ────────────────────────────────────────── */
export function ServiceAreas({ activeCity }: { activeCity?: string } = {}) {
  const areas = [
    { name: "Woodstock", slug: "woodstock", note: "Home Base" },
    { name: "Brantford", slug: "brantford", note: "45 min" },
    { name: "Cambridge", slug: "cambridge", note: "55 min" },
    { name: "Ingersoll", slug: "ingersoll", note: "15 min" },
    { name: "Tillsonburg", slug: "tillsonburg", note: "40 min" },
    { name: "Norwich", slug: "norwich", note: "25 min" },
    { name: "Paris, ON", slug: "paris", note: "35 min" },
    { name: "Innerkip", slug: "woodstock", note: "Near Woodstock" },
    { name: "Sweaburg", slug: "woodstock", note: "Near Woodstock" },
    { name: "Oxford County", slug: "woodstock", note: "Full coverage" },
  ];
  return (
    <section id="service-areas" className="py-20 lg:py-28" style={{ backgroundColor: "var(--forest-mid)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Where We Build</p>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Our Service Area</h2>
          <p className="text-white/65 max-w-xl mx-auto">Based in Woodstock, we serve all of Oxford County plus Brantford, Cambridge and surrounding communities.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((a) => {
            const isActive = a.slug === activeCity;
            return (
              <a key={a.name} href={`/services/deck-building/${a.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: isActive ? "var(--cedar)" : "rgba(255,255,255,0.1)", color: isActive ? "white" : "rgba(255,255,255,0.8)", border: isActive ? "2px solid var(--cedar)" : "1px solid rgba(255,255,255,0.2)" }}>
                <MapPinIcon />{a.name} <span className="text-xs opacity-70">&middot; {a.note}</span>
              </a>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <p className="text-white/60 text-sm mb-4">Not sure if we serve your area? Call us — we likely do.</p>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-white font-semibold hover:underline">
            <PhoneIcon />{PHONE}
          </a>
        </div>
=======
/* ─── SERVICE AREAS ──────────────────────────────────────────────────── */
export function ServiceAreas({ activeCity }: { activeCity?: string } = {}) {
  const areas: Array<{ city: string; slug: string | null; desc: string; highlights: string[] }> = [
    {
      city: "London",
      slug: null,
      desc: "Our home base — Byron, Old North, Westmount, Masonville and every neighbourhood in between.",
      highlights: ["Byron", "Old North", "Westmount", "Masonville"],
    },
    { city: "St. Thomas", slug: "st-thomas", desc: "Lake Margaret to Pinafore Park — composite, cedar, PT and PVC builds.", highlights: ["Lake Margaret", "Courtright", "Mitchell Hepburn"] },
    { city: "Woodstock", slug: "woodstock", desc: "Pittock Lake to Vansittart Avenue — full Oxford County coverage.", highlights: ["Fairview", "Vansittart", "Beachville"] },
    { city: "Strathroy", slug: "strathroy", desc: "Strathroy-Caradoc decks built to handle wide-open wind exposure.", highlights: ["Mount Brydges", "Melbourne", "Caradoc"] },
    { city: "Ingersoll", slug: "ingersoll", desc: "Heritage homes & new builds across Oxford County.", highlights: ["Centreville", "Carnegie", "Thames Street"] },
    { city: "Dorchester", slug: "dorchester", desc: "Thames Centre — wraparound and multi-level decks our specialty.", highlights: ["Hamilton Rd", "Crampton", "Mossley"] },
    { city: "Tillsonburg", slug: "tillsonburg", desc: "From Hickory Hills to family homes near Annandale.", highlights: ["North Broadway", "Hickory Hills", "Annandale"] },
    { city: "Aylmer", slug: "aylmer", desc: "Aylmer & Elgin County — cottage decks near Port Bruce too.", highlights: ["Springfield", "Port Bruce", "Hacienda"] },
    { city: "Lambeth", slug: "lambeth", desc: "Talbot Village and Bostwick new builds — pergolas & lighting.", highlights: ["Talbot Village", "Bostwick", "Westdel"] },
    { city: "Komoka & Kilworth", slug: "komoka", desc: "Middlesex Centre — hot-tub-ready and entertaining decks.", highlights: ["Kilworth", "Coldstream", "Delaware"] },
    { city: "Mount Brydges", slug: "mt-brydges", desc: "Big yards, multi-level decks, privacy screens.", highlights: ["Caradoc", "Glencoe", "Wardsville"] },
    { city: "Belmont", slug: "belmont", desc: "Our hometown — fastest response times in Central Elgin.", highlights: ["Yorke Line", "Belmont Village", "Avon"] },
  ];

  const isActive = (a: typeof areas[number]) =>
    !!activeCity && (a.city.toLowerCase() === activeCity.toLowerCase() || a.slug === activeCity.toLowerCase());

  return (
    <section id="service-areas" className="py-20 lg:py-28 scroll-mt-20" style={{ backgroundColor: "var(--forest)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            Service Areas
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-white">
            Serving London &amp; Surrounding Areas
          </h2>
          <p className="text-lg text-white/60">
            From London out to Woodstock, Strathroy, Tillsonburg and everywhere in between — we build decks across Southwestern Ontario.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a) => {
            const active = isActive(a);
            const Card = (
              <div
                className={`rounded-2xl p-7 border h-full transition-all ${active ? "" : "hover:bg-white/[0.08]"}`}
                style={{
                  backgroundColor: active ? "rgba(196,118,42,0.25)" : "rgba(255,255,255,0.05)",
                  borderColor: active ? "var(--cedar)" : "rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2 mb-3" style={{ color: "var(--cedar-light)" }}>
                  <MapPinIcon />
                  <h3 className="font-serif text-xl font-bold">{a.city}</h3>
                  {active && (
                    <span className="ml-auto text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--cedar)", color: "white" }}>
                      You are here
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-4 text-white/60">{a.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(196,98,58,0.2)", color: "var(--cedar-light)" }}>
                      {h}
                    </span>
                  ))}
                </div>
                {a.slug && !active && (
                  <p className="mt-4 text-xs font-semibold" style={{ color: "var(--cedar-light)" }}>
                    See {a.city} deck builder →
                  </p>
                )}
              </div>
            );
            return a.slug && !active ? (
              <a key={a.city} href={`/services/${a.slug}`} className="block">{Card}</a>
            ) : (
              <div key={a.city}>{Card}</div>
            );
          })}
        </div>

        <p className="text-center text-white/40 text-sm mt-10">
          Not sure if we serve your area? Give us a call at <a href="tel:5199141663" className="underline hover:text-white/60">(519) 914-1663</a>
        </p>
>>>>>>> origin/main
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── CONTACT ──────────────────────────────────────────────── */
export function Contact({ presetCity }: { presetCity?: string } = {}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: presetCity ?? "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const iClass = "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all";
  const iStyle = { borderColor: "var(--cream-dark)" };
=======
/* ─── CONTACT FORM ───────────────────────────────────────────────────── */
export function Contact({ presetCity }: { presetCity?: string } = {}) {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    address: "", city: presetCity ?? "", service: "", message: "",
    heard_about: "", // referral source
    website: "", // honeypot — hidden from real users
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const loadedAt = useRef(Date.now());

  const services = [
    "PT Deck Building",
    "Cedar Deck Building",
    "Composite/PVC Deck Building",
    "Stairs, Railings & Repairs",
    "Deck Cleaning and Sealing",
    "Deck Permit Assistance",
    "Lighting & Features",
    "Other",
  ];

  const heardAboutOptions = [
    "Google search",
    "Facebook / Instagram",
    "Friend or family",
    "Drove past a job site",
    "Repeat customer",
    "Home show / event",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) {
      setPhoto(null);
      return;
    }
    const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image file (JPG, PNG, HEIC, etc.).");
      setPhoto(null);
      return;
    }
    if (file.size > MAX_BYTES) {
      setPhotoError("Photo is too large. Please keep it under 8 MB.");
      setPhoto(null);
      return;
    }
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      // Get reCAPTCHA v3 token if available
      let recaptchaToken: string | undefined;
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey && typeof window !== "undefined" && (window as any).grecaptcha) {
        try {
          recaptchaToken = await (window as any).grecaptcha.execute(siteKey, { action: "contact" });
        } catch (err) {
          console.warn("reCAPTCHA token error:", err);
        }
      }

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("_loaded", String(loadedAt.current));
      if (recaptchaToken) fd.append("recaptchaToken", recaptchaToken);
      if (photo) fd.append("photo", photo);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        let msg = "Server error";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }
      setStatus("success");
      setForm({
        first_name: "", last_name: "", email: "", phone: "",
        address: "", city: presetCity ?? "", service: "", message: "",
        heard_about: "", website: "",
      });
      setPhoto(null);
      (window as any).umami?.track("form-submission", { type: "contact" });
      loadedAt.current = Date.now();
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong. Please try again or call us directly.");
      setStatus("error");
    }
  };
>>>>>>> origin/main

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>Get In Touch</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>Get Your Free Estimate</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">We visit your property, take measurements, discuss your options, and provide a transparent digital quote — at no charge. Most quotes delivered within 48 hours.</p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "var(--cedar)" }}><PhoneIcon /></div>
                <div><div className="text-xs text-gray-500 uppercase tracking-wide">Phone</div><a href={PHONE_HREF} className="font-semibold hover:underline" style={{ color: "var(--forest)" }}>{PHONE}</a></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "var(--cedar)" }}><MapPinIcon /></div>
                <div><div className="text-xs text-gray-500 uppercase tracking-wide">Email</div><a href={`mailto:${EMAIL}`} className="font-semibold hover:underline" style={{ color: "var(--forest)" }}>{EMAIL}</a></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "var(--cedar)" }}><CheckIcon /></div>
                <div><div className="text-xs text-gray-500 uppercase tracking-wide">Hours</div><span className="font-semibold" style={{ color: "var(--forest)" }}>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</span></div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-white" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--forest)" }}>Service Area</h3>
              <p className="text-sm text-gray-600">Woodstock &middot; Ingersoll &middot; Tillsonburg &middot; Norwich &middot; Paris &middot; Brantford &middot; Cambridge &middot; Oxford County</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            {status === "success" ? (
              <div ref={successRef} className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--forest)" }}>Request Received!</h3>
                <p className="text-gray-600">We&apos;ll get back to you within 24 hours to schedule your free on-site estimate.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Jane Smith" className={iClass} style={iStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required inputMode="tel" autoComplete="tel" placeholder="519-XXX-XXXX" className={iClass} style={iStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="jane@example.com" className={iClass} style={iStyle} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Service Needed</label>
                    <select name="service" value={form.service} onChange={handleChange} className={iClass} style={iStyle}>
                      <option value="">Select a service...</option>
                      <option>Deck Building</option>
                      <option>Fence Building</option>
                      <option>Deck Restoration / Staining</option>
                      <option>Pergola / Structure</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Your City</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Woodstock, Ingersoll..." className={iClass} style={iStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--forest)" }}>Project Details</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Tell us about your project — size, material preference, timeline..." className={iClass} style={{ ...iStyle, resize: "none" }} />
                </div>
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                <button type="submit" disabled={status === "sending"} className="w-full py-4 rounded-xl font-bold text-white transition-all disabled:opacity-60 min-h-[48px]" style={{ backgroundColor: "var(--cedar)" }}>
                  {status === "sending" ? "Sending..." : "Request My Free Estimate"}
                </button>
                {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please call us at {PHONE}.</p>}
                <p className="text-xs text-center text-gray-400">We respond within 24 hours. No spam, no pressure.</p>
=======
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
              Get In Touch
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>
              Request Your<br />Free Quote
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--wood)" }}>
              Ready to transform your backyard? Fill out the form and we'll be in touch within 24 hours with a free, no-obligation quote.
            </p>

            <div className="space-y-5">
              <a href="tel:5199141663" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--cedar)", color: "white" }}>
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--wood-light)" }}>Phone</p>
                  <p className="font-semibold group-hover:underline" style={{ color: "var(--forest)" }}>(519) 914-1663</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--cedar)", color: "white" }}>
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--wood-light)" }}>Office</p>
                  <p className="font-semibold" style={{ color: "var(--forest)" }}>50432 Yorke Line, Belmont Ontario</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-xl border" style={{ borderColor: "var(--cream)", backgroundColor: "white" }}>
              <p className="font-semibold mb-1" style={{ color: "var(--forest)" }}>Hours of Operation</p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>Weekdays: 8:00 AM – 5:00 PM</p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>Saturday & Sunday: Closed</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(196,98,58,0.1)" }}>
                  <svg className="w-8 h-8" style={{ color: "var(--cedar)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--forest)" }}>Quote Request Sent!</h3>
                <p className="text-sm mb-6" style={{ color: "var(--wood)" }}>We'll be in touch within 24 hours with your free quote.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--cedar)" }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold mb-5" style={{ color: "var(--forest)" }}>Tell Us About Your Project</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>First Name *</label>
                    <input
                      type="text" name="first_name" required
                      value={form.first_name} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Last Name *</label>
                    <input
                      type="text" name="last_name" required
                      value={form.last_name} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Email *</label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="jane@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Phone *</label>
                    <input
                      type="tel" name="phone" required
                      value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="(519) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Street Address</label>
                    <input
                      type="text" name="address"
                      value={form.address} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>City</label>
                    <input
                      type="text" name="city"
                      value={form.city} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                      placeholder="London"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Service Needed *</label>
                  <select
                    name="service" required
                    value={form.service} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                    style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>How Did You Hear About Us?</label>
                  <select
                    name="heard_about"
                    value={form.heard_about} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                    style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                  >
                    <option value="">Choose one (optional)…</option>
                    {heardAboutOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>Tell Us About Your Project</label>
                  <textarea
                    name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition resize-none"
                    style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}
                    placeholder="Describe the size, style, or any ideas you have…"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--wood)" }}>
                    Attach a Photo <span className="font-normal normal-case opacity-70">(optional — your existing deck, yard, or inspiration)</span>
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:text-white file:cursor-pointer cursor-pointer"
                    style={{ color: "var(--wood)" }}
                  />
                  {photo && !photoError && (
                    <p className="text-xs mt-1.5" style={{ color: "var(--wood-light)" }}>
                      {photo.name} ({(photo.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                  {photoError && (
                    <p className="text-xs mt-1.5 text-red-600">{photoError}</p>
                  )}
                </div>

                {/* Honeypot — invisible to humans, irresistible to bots */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, overflow: "hidden", tabIndex: -1 } as React.CSSProperties}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMsg || "Something went wrong. Please try again or call us directly."}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-full font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
                  style={{ backgroundColor: "var(--cedar)" }}
                >
                  {status === "sending" ? "Sending…" : "Send My Free Quote Request"}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--wood-light)" }}>
                  No obligation. We respond within 24 hours.
                </p>
                <p className="text-xs text-center mt-1" style={{ color: "var(--wood-light)", opacity: 0.6 }}>
                  Protected by reCAPTCHA.{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy</a>{" · "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>
                </p>
>>>>>>> origin/main
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
/* ─── FOOTER ───────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--forest)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--cedar)" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="font-serif font-bold text-white">Woodstock Deck &amp; Fence</div>
                <div className="text-xs text-white/50">Oxford County, Ontario</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">Expert deck construction, fence installation, repairs and outdoor enhancements in Woodstock, Ontario. Quality craftsmanship built for the Ontario climate.</p>
            <div className="space-y-2">
              <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"><PhoneIcon />{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"><MapPinIcon />{EMAIL}</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {["Deck Building", "Fence Building", "Deck Restoration", "Pergolas & Structures"].map((s) => (
                <li key={s}><a href="/services" className="text-sm text-white/60 hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[["About Us", "/about"], ["Gallery", "/gallery"], ["Service Areas", "#service-areas"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([l, h]) => (
                <li key={l}><a href={h} className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-sm text-white/40">&copy; 2026 Woodstock Deck &amp; Fence. All rights reserved.</p>
          <p className="text-sm text-white/40">Serving Woodstock, Oxford County &amp; Southwestern Ontario</p>
=======
/* ─── FOOTER ─────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C0E08", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--cedar)" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>
              <span className="font-serif font-bold text-lg text-white">Woodstock Deck and Fence</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Woodstock, Ontario's trusted deck and fence builders since day one. We build beautiful, durable outdoor spaces that families love for decades.
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "Twitter", "LinkedIn"].map((social) => (
                <a key={social} href="#" aria-label={social} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition">
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--cedar-light)" }}>Services</h4>
            <ul className="space-y-2">
              {["PT Deck Building", "Cedar Decks", "Composite/PVC", "Deck Repair", "Permit Assistance", "Lighting & Features"].map((s) => (
                <li key={s}><a href="#services" className="text-sm text-white/50 hover:text-white/80 transition">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--cedar-light)" }}>Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <PhoneIcon />
                <a href="tel:5199141663" className="hover:text-white/80 transition">(519) 914-1663</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPinIcon />
                <span>50432 Yorke Line, Belmont, Ontario</span>
              </li>
            </ul>
            <div className="mt-4 text-xs text-white/30">
              <p>Mon–Fri: 8:00 AM – 5:00 PM</p>
              <p>Sat & Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Woodstock Deck and Fence. All rights reserved.
          </p>
          <p className="text-xs text-white/20">Serving London, St. Thomas, Woodstock &amp; surrounding areas</p>
>>>>>>> origin/main
        </div>
      </div>
    </footer>
  );
}

<<<<<<< HEAD
/* ─── CITY INTRO ───────────────────────────────────────────── */
export function CityIntro({ city, service }: { city: ServiceCity; service: string }) {
  const serviceSlug = service === "Deck Building" ? "deck-building" : "fence-building";
  const img = service === "Deck Building" ? "/images/legacy/Custom-Deck-Design-Installation.png" : "/images/legacy/Professional-Fencing-Solutions.png";
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:underline">Home</a><span>/</span>
          <a href="/services" className="hover:underline">Services</a><span>/</span>
          <a href={`/services/${serviceSlug}`} className="hover:underline">{service}</a><span>/</span>
          <span style={{ color: "var(--cedar)" }}>{city.name}</span>
        </nav>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>{service} &middot; {city.name}, ON</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--forest)" }}>{service} in {city.name}, Ontario</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">{city.intro}</p>
            <p className="text-gray-600 leading-relaxed">{city.why_local}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: "var(--cedar)" }}>
                Free Quote in {city.name}
              </a>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: "var(--cedar)", color: "var(--cedar)" }}>
                <PhoneIcon />{PHONE}
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video relative">
            <Image src={img} alt={`${service} in ${city.name}, Ontario by Woodstock Deck and Fence`} fill className="object-cover" />
          </div>
        </div>
        <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: "var(--cream-dark)" }}>
          <h2 className="font-semibold mb-3" style={{ color: "var(--forest)" }}>Neighbourhoods We Serve in {city.name}</h2>
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <span key={n} className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: "var(--forest-mid)" }}>{n}</span>
            ))}
=======
/* ─── CITY INTRO (used by /services/[city]) ──────────────────────────── */
export function CityIntro({ city }: { city: ServiceCity }) {
  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: "var(--cedar)" }}>
          Deck Builder in {city.name}, {city.region}
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6 text-center" style={{ color: "var(--forest)" }}>
          Outdoor Living, Built for {city.name}
        </h2>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--wood)" }}>
          {city.intro}
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--wood)" }}>
          {city.why_local}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          <div className="rounded-xl p-5 bg-white border" style={{ borderColor: "var(--cream-dark)" }}>
            <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--forest)" }}>
              Neighbourhoods we serve in {city.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {city.neighborhoods.map((n) => (
                <span key={n} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "var(--cream)", color: "var(--wood)" }}>
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-5 bg-white border" style={{ borderColor: "var(--cream-dark)" }}>
            <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--forest)" }}>
              Free quotes in {city.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--wood)" }}>
              Tell us about your project — we&rsquo;ll come measure, talk through options, and send a detailed written quote within 48 hours.
            </p>
            <a href="#contact" className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "var(--cedar)" }}>
              Request a {city.name} quote
            </a>
>>>>>>> origin/main
          </div>
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======

/* ─── RELATED TRADES (cross-links to sister sites) ───────────────────── */
export function RelatedTrades() {
  const trades = [
    {
      title: "Deck Staining &amp; Refinishing",
      desc: "Already have a wood deck? Master Decker — our sister company — does professional deck staining, sealing and refinishing across Southwestern Ontario.",
      href: "https://masterdecker.com",
      cta: "Visit Master Decker",
    },
    {
      title: "Concrete Work, Footings &amp; Pads",
      desc: "Need a concrete pad under your deck, a poured walkway, or footings for a heavy build? London Concrete Forming handles the concrete side.",
      href: "https://londonconcreteforming.ca",
      cta: "Visit London Concrete Forming",
    },
    {
      title: "Retaining Walls &amp; Hardscaping",
      desc: "Building a deck on a sloped lot? You may need a retaining wall. London Retaining Walls designs and installs hardscaping that pairs perfectly with our decks.",
      href: "https://londonretainingwalls.ca",
      cta: "Visit London Retaining Walls",
    },
  ];
  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>
            Sister Companies
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ color: "var(--forest)" }}>
            Need more than a deck?
          </h2>
          <p className="mt-3" style={{ color: "var(--wood)" }}>
            We partner with trusted Southwestern Ontario trades for the work outside our wheelhouse.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trades.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noopener"
              className="block rounded-2xl p-7 bg-white border hover:shadow-md transition-all"
              style={{ borderColor: "var(--cream)" }}
            >
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--forest)" }} dangerouslySetInnerHTML={{ __html: t.title }} />
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--wood)" }} dangerouslySetInnerHTML={{ __html: t.desc }} />
              <span className="text-sm font-semibold" style={{ color: "var(--cedar)" }}>
                {t.cta} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

>>>>>>> origin/main
