"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { ServiceCity } from "../../content/cities";

/* ─── ICONS ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const PHONE = "519-914-5697";
const PHONE_HREF = "tel:5199145697";
const EMAIL = "service@woodstockdeckandfence.ca";

/* ─── NAV ─────────────────────────────────────────────────── */
export function NavBar({ homeHref = "" }: { homeHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        </div>
      </div>
    </section>
  );
}

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
      </div>
    </section>
  );
}

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
                  <ChevronDownIcon />
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      </div>
    </section>
  );
}

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

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
        </div>
      </div>
    </footer>
  );
}

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
          </div>
        </div>
      </div>
    </section>
  );
}
