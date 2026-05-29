"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ─── ICON HELPERS ─────────────────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const TrendingUpIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const HandshakeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const WrenchIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─── GOLD DIVIDER ──────────────────────────────────────────────────────── */
const GoldDivider = () => (
  <div className="flex items-center gap-3 my-4">
    <div className="h-px flex-1 max-w-12" style={{ background: "var(--gold)" }} />
    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
    <div className="h-px flex-1 max-w-12" style={{ background: "var(--gold)" }} />
  </div>
);

/* ─── HERO ──────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(10,15,30,0.75) 0%, rgba(10,15,30,0.65) 40%, rgba(10,15,30,0.85) 100%),
          url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&auto=format&fit=crop&q=80') center/cover no-repeat`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            borderColor: "rgba(201,168,76,0.4)",
            background: "rgba(201,168,76,0.08)",
            color: "var(--gold-light)",
          }}
        >
          <MapPinIcon />
          Serving London · Aylmer · St. Thomas · Woodstock
        </div>

        <h1
          className={`font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ color: "var(--cream)" }}
        >
          Your Home.{" "}
          <span style={{ color: "var(--gold)" }}>Your Move.</span>
          <br />
          Done Right.
        </h1>

        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ color: "var(--cream-muted)" }}
        >
          Licensed realtor, experienced investor, and former contractor — Matt brings a rare combination of market
          knowledge, renovation insight, and financial expertise to every deal.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Get a Free Home Valuation
          </a>
          <a
            href="tel:+15198786735"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold border transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: "rgba(240,236,227,0.35)", color: "var(--cream)" }}
          >
            <PhoneIcon />
            (519) 878-6735
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "var(--gold)" }}>
          <ChevronDownIcon />
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ─────────────────────────────────────────────────────────── */
function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: "200+", label: "Homes Sold" },
    { value: "10+", label: "Years Experience" },
    { value: "4", label: "Communities Served" },
    { value: "5★", label: "Client Satisfaction" },
  ];

  return (
    <div
      ref={ref}
      className="py-12"
      style={{ background: "var(--navy-card)", borderTop: "1px solid var(--navy-border)", borderBottom: "1px solid var(--navy-border)" }}
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="font-serif text-4xl font-bold mb-1" style={{ color: "var(--gold)" }}>{s.value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--cream-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24"
      style={{ background: "var(--navy)" }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <div
            className="aspect-[3/4] rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--navy-card) 0%, var(--navy-mid) 100%)",
              border: "1px solid var(--navy-border)",
            }}
          >
            <div className="text-center px-8">
              <div
                className="w-24 h-24 rounded-full border-2 flex items-center justify-center font-serif text-3xl font-bold mx-auto mb-4"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                MD
              </div>
              <p className="text-sm" style={{ color: "var(--cream-muted)" }}>
                Drop your headshot at <code className="text-xs">/public/headshot.jpg</code>
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "var(--gold)" }} />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "var(--gold)" }} />
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            About Matt
          </p>
          <h2 className="font-serif text-4xl font-bold mb-2" style={{ color: "var(--cream)" }}>
            Straightforward.
          </h2>
          <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--gold)" }}>
            Honest. Local.
          </h2>
          <GoldDivider />

          <div className="space-y-4 text-base leading-relaxed mt-6" style={{ color: "var(--cream-muted)" }}>
            <p>
              My path into real estate came through years of doing it myself. As a contractor, I spent over a decade
              working on homes — learning what makes them tick and what makes them sell. I bought and managed my own
              investment properties before becoming a licensed realtor, and that hands-on experience shapes every
              client conversation I have.
            </p>
            <p>
              Today, I specialise in single-family and multi-family homes across{" "}
              <strong style={{ color: "var(--cream)" }}>London, Aylmer, St. Thomas, and Woodstock</strong>.
              Whether you&apos;re buying your first home, selling a property, or building a portfolio through flips
              and rentals — I bring the same commitment: honesty, strategy, and results.
            </p>
            <p>
              I live just outside Belmont with my wife and two kids. I chose this area for the same reasons many of
              my clients do — a slower pace, more space, and a strong sense of community.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}
            >
              More About Matt
            </Link>
            <a
              href="tel:+15198786735"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}
            >
              <PhoneIcon /> (519) 878-6735
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ──────────────────────────────────────────────────────────── */
function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const services = [
    {
      icon: <HomeIcon />,
      title: "Sell Your Home",
      subtitle: "Maximum Value. Minimum Stress.",
      points: [
        "Professional staging & photography",
        "Targeted MLS & digital marketing",
        "Expert pricing strategy",
        "Skilled negotiation to maximise your sale price",
        "Transparent process from listing to close",
      ],
      cta: "List My Home",
      href: "/services/selling",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Buy a Home",
      subtitle: "Find the Right Home at the Right Price.",
      points: [
        "Deep local market knowledge",
        "Access to off-market opportunities",
        "Guided neighbourhood comparisons",
        "Strong negotiation — you keep more money",
        "Support from offer to keys",
      ],
      cta: "Start My Search",
      href: "/services/buying",
    },
    {
      icon: <BuildingIcon />,
      title: "Investment Properties",
      subtitle: "Build Wealth Through Real Estate.",
      points: [
        "Property flipping analysis & ARV assessment",
        "Long-term rental cash-flow guidance",
        "Contractor insight on renovation costs",
        "Single-family & multi-family strategies",
        "Personal experience as an investor",
      ],
      cta: "Grow My Portfolio",
      href: "/services/investment-properties",
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="py-24"
      style={{ background: "var(--navy-mid)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            What I Do
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Full-Service Real Estate
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--cream-muted)" }}>
            From your first showing to closing day — and every step in between — I handle it all so you don&apos;t have to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 120}ms`,
                background: "var(--navy-card)",
                border: "1px solid var(--navy-border)",
              }}
            >
              <div className="mb-5" style={{ color: "var(--gold)" }}>{s.icon}</div>
              <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: "var(--cream)" }}>{s.title}</h3>
              <p className="text-sm mb-5" style={{ color: "var(--gold-light)" }}>{s.subtitle}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.points.map(p => (
                  <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "var(--cream-muted)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }}><CheckIcon /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={s.href}
                className="text-center py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AREAS ─────────────────────────────────────────────────────────────── */
function AreasSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const areas = [
    {
      city: "London, ON",
      nickname: "The Forest City",
      description:
        "Ontario's seventh-largest city — diverse neighbourhoods, strong rental demand, and a market Matt knows block by block.",
      highlights: ["Strong resale values", "Top-rated schools", "Growing tech sector", "University & hospital workers"],
      href: "/areas/london-ontario",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=70",
    },
    {
      city: "Aylmer, ON",
      nickname: "Elgin County's Gem",
      description:
        "A charming small town with deep roots and an increasingly strong market — attracting buyers priced out of larger cities.",
      highlights: ["Affordable entry points", "Strong community ties", "Growing demand", "Family-friendly streets"],
      href: "/areas/aylmer-ontario",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=70",
    },
    {
      city: "St. Thomas, ON",
      nickname: "The Railway City",
      description:
        "With the Volkswagen EV plant incoming and home prices still accessible, St. Thomas is one of SW Ontario's most exciting markets.",
      highlights: ["Volkswagen EV plant incoming", "Rapid appreciation", "401 access", "Affordable vs. London"],
      href: "/areas/st-thomas-ontario",
      img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=70",
    },
    {
      city: "Woodstock, ON",
      nickname: "The Friendly City",
      description:
        "Oxford County's commercial hub offers solid value and strong rental demand — a smart addition to any real estate portfolio.",
      highlights: ["Strong rental demand", "Highway 401 access", "Growing population", "Good cap rates"],
      href: "/areas/woodstock-ontario",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section
      id="areas"
      ref={ref}
      className="py-24"
      style={{ background: "var(--navy)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            Where I Work
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Local Knowledge,{" "}
            <span style={{ color: "var(--gold)" }}>Real Results</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--cream-muted)" }}>
            I don&apos;t just sell homes here — I live here. That local intelligence is your competitive edge.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map((a, i) => (
            <Link
              key={a.city}
              href={a.href}
              className={`rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms`, border: "1px solid var(--navy-border)" }}
            >
              <div
                className="h-40 relative"
                style={{
                  background: `linear-gradient(to bottom, rgba(10,15,30,0.3) 0%, rgba(10,15,30,0.7) 100%), url('${a.img}') center/cover`,
                }}
              >
                <div className="absolute bottom-4 left-4">
                  <div className="font-serif text-lg font-bold" style={{ color: "var(--cream)" }}>{a.city}</div>
                  <div className="text-xs" style={{ color: "var(--gold-light)" }}>{a.nickname}</div>
                </div>
              </div>
              <div className="p-5" style={{ background: "var(--navy-card)" }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--cream-muted)" }}>{a.description}</p>
                <ul className="space-y-1.5">
                  {a.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-xs" style={{ color: "var(--cream-muted)" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/areas"
            className="inline-block px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            View All Service Areas →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY MATT ──────────────────────────────────────────────────────────── */
function WhyMattSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const pillars = [
    {
      icon: <ShieldIcon />,
      title: "No Middlemen",
      body: "You deal with me directly from the first call to the final signature. No assistants fielding your questions — you get Matt.",
    },
    {
      icon: <HandshakeIcon />,
      title: "Straightforward Advice",
      body: "No fluff, no upsells. I'll tell you what your home is actually worth, what needs fixing, and how to get results.",
    },
    {
      icon: <WrenchIcon />,
      title: "Contractor Insight",
      body: "10+ years in home improvement means I can spot what needs fixing and accurately estimate costs — before they become surprises.",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Investor Mindset",
      body: "I've bought, renovated, rented, and flipped properties myself. I know what the numbers need to look like for a deal to make sense.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: "var(--navy-mid)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            Why Choose Matt
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            The Difference Is in{" "}
            <span style={{ color: "var(--gold)" }}>How I Work</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-2xl p-7 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                background: "var(--navy-card)",
                border: "1px solid var(--navy-border)",
              }}
            >
              <div className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.10)", color: "var(--gold)" }}>
                {p.icon}
              </div>
              <h3 className="font-serif text-lg font-bold mb-3" style={{ color: "var(--cream)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-16 rounded-2xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--cream)" }}>
            Looking for a realtor who treats your goals like his own?
          </h3>
          <p className="mb-8 text-base" style={{ color: "var(--cream-muted)" }}>
            Let&apos;s make your next move a smart one.
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Get in Touch with Matt →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const testimonials = [
    {
      quote: "Matt sold our home in 11 days — $35,000 over asking. His staging advice and pricing strategy were spot on. We were blown away.",
      name: "Sarah & Tom K.",
      location: "St. Thomas, ON",
    },
    {
      quote: "As first-time buyers, we were nervous about the whole process. Matt walked us through everything patiently and fought hard to get us the home we wanted within budget.",
      name: "James & Lisa M.",
      location: "London, ON",
    },
    {
      quote: "I've bought three investment properties with Matt. His market knowledge and no-nonsense negotiation have made every deal a win. I won't use anyone else.",
      name: "David R.",
      location: "Aylmer, ON",
    },
    {
      quote: "Matt was upfront with us from day one — told us exactly what our home needed and what it would sell for. No games. Sold in a week.",
      name: "Mark & Carol B.",
      location: "St. Thomas, ON",
    },
    {
      quote: "Moving from Toronto, we didn't know the London market at all. Matt gave us a masterclass on the neighbourhoods and helped us land a place we absolutely love.",
      name: "Priya & Anand S.",
      location: "London, ON",
    },
    {
      quote: "His contractor background was a huge bonus. He spotted issues other agents would have missed and helped us negotiate a better price because of it.",
      name: "Jennifer L.",
      location: "Woodstock, ON",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24"
      style={{ background: "var(--navy)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            Client Stories
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            What My Clients Say
          </h2>
          <div className="flex justify-center gap-1 mb-4" style={{ color: "var(--gold)" }}>
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>
          <p className="text-sm" style={{ color: "var(--cream-muted)" }}>5.0 average rating · 200+ happy clients</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 flex flex-col transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                background: "var(--navy-card)",
                border: "1px solid var(--navy-border)",
              }}
            >
              <div className="flex gap-0.5 mb-5" style={{ color: "var(--gold)" }}>
                {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed italic mb-6" style={{ color: "var(--cream-muted)" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--cream)" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "var(--gold-light)" }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ──────────────────────────────────────────────────────── */
type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  intent: string;
  city: string;
  message: string;
  website: string;
};

function ContactSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState<FormData>({
    first_name: "", last_name: "", email: "", phone: "",
    intent: "", city: "", message: "", website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const loadedAt = useRef<number>(Date.now());

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const set = useCallback((k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v })), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      let recaptchaToken = "";
      if (typeof window !== "undefined" && (window as any).grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
          recaptchaToken = await (window as any).grecaptcha.execute(siteKey, { action: "contact" });
        }
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _loaded: loadedAt.current, recaptchaToken }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ first_name: "", last_name: "", email: "", phone: "", intent: "", city: "", message: "", website: "" });
        (window as any).umami?.track("form-submission", { type: "contact" });
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1";
  const inputStyle = {
    background: "var(--navy)",
    border: "1px solid var(--navy-border)",
    color: "var(--cream)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24"
      style={{ background: "var(--navy-mid)" }}
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Let&apos;s Talk About{" "}
            <span style={{ color: "var(--gold)" }}>Your Next Move</span>
          </h2>
          <GoldDivider />
          <p className="mt-6 text-base leading-relaxed mb-10" style={{ color: "var(--cream-muted)" }}>
            Whether you&apos;re ready to list, just starting to look, or curious what your home is worth —
            reach out. The first conversation is always free, always honest, and always with Matt directly.
          </p>

          <div className="space-y-5">
            {[
              { icon: <PhoneIcon />, label: "Phone", value: "(519) 878-6735", href: "tel:+15198786735" },
              { icon: <MailIcon />, label: "Email", value: "matt.druzcz@gmail.com", href: "mailto:matt.druzcz@gmail.com" },
              { icon: <MapPinIcon />, label: "Serving", value: "London · Aylmer · St. Thomas · Woodstock, ON", href: undefined },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.10)", color: "var(--gold)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: "var(--cream-muted)" }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold hover:underline" style={{ color: "var(--cream)" }}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold" style={{ color: "var(--cream)" }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-3">
            {[
              { href: "https://www.facebook.com/mattdruzcz", icon: <FacebookIcon />, label: "Facebook" },
              { href: "https://www.linkedin.com/in/mattdruzcz", icon: <LinkedInIcon />, label: "LinkedIn" },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: "var(--navy-border)", color: "var(--cream-muted)" }}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`rounded-2xl p-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
        >
          {status === "success" ? (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)" }}
              >
                <CheckIcon />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--cream)" }}>Message Received!</h3>
              <p className="text-sm" style={{ color: "var(--cream-muted)" }}>
                Thanks! I&apos;ll be in touch within 24 hours. You can also reach me directly at (519) 878-6735.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-serif text-xl font-bold mb-6" style={{ color: "var(--cream)" }}>
                Send Me a Message
              </h3>

              <div className="absolute left-[-9999px] top-0" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={e => set("website", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>First Name *</label>
                  <input type="text" required autoComplete="given-name" value={form.first_name}
                    onChange={e => set("first_name", e.target.value)} className={inputClass} style={inputStyle} placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>Last Name *</label>
                  <input type="text" required autoComplete="family-name" value={form.last_name}
                    onChange={e => set("last_name", e.target.value)} className={inputClass} style={inputStyle} placeholder="Smith" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>Email Address *</label>
                <input type="email" required autoComplete="email" value={form.email}
                  onChange={e => set("email", e.target.value)} className={inputClass} style={inputStyle} placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>Phone Number *</label>
                <input type="tel" required autoComplete="tel" inputMode="tel" value={form.phone}
                  onChange={e => set("phone", e.target.value)} className={inputClass} style={inputStyle} placeholder="(519) 555-0100" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>I&apos;m Looking To… *</label>
                <select required value={form.intent} onChange={e => set("intent", e.target.value)} className={inputClass} style={inputStyle}>
                  <option value="" disabled>Select an option</option>
                  <option value="Sell My Home">Sell My Home</option>
                  <option value="Buy a Home">Buy a Home</option>
                  <option value="Buy & Sell">Buy &amp; Sell</option>
                  <option value="Investment / Flip">Investment / Flip Property</option>
                  <option value="Long-Term Rental">Long-Term Rental</option>
                  <option value="Just Exploring">Just Exploring / Get a Valuation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>City / Area</label>
                <select value={form.city} onChange={e => set("city", e.target.value)} className={inputClass} style={inputStyle}>
                  <option value="">Select your area (optional)</option>
                  <option value="London, ON">London, ON</option>
                  <option value="Aylmer, ON">Aylmer, ON</option>
                  <option value="St. Thomas, ON">St. Thomas, ON</option>
                  <option value="Woodstock, ON">Woodstock, ON</option>
                  <option value="Belmont, ON">Belmont, ON</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--cream-muted)" }}>Message (optional)</label>
                <textarea rows={4} value={form.message} onChange={e => set("message", e.target.value)}
                  className={inputClass} style={{ ...inputStyle, resize: "none" }}
                  placeholder="Tell me a bit about what you're looking for…" />
              </div>

              {errorMsg && (
                <p className="text-sm rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.1)", color: "#F87171" }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--gold)", color: "#0A0F1E" }}
              >
                {status === "sending" ? "Sending…" : "Send My Message →"}
              </button>

              <p className="text-xs text-center" style={{ color: "var(--cream-muted)" }}>
                Protected by reCAPTCHA. Your info is kept private and never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <AreasSection />
      <WhyMattSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
