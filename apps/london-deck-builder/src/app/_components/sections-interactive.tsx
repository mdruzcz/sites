"use client";

import { useState, useEffect, useRef } from "react";
import { PhoneIcon, MapPinIcon, ChevronDownIcon, MenuIcon, CloseIcon } from "./icons";

/* ─── NAV ────────────────────────────────────────────────────────────── */
export function NavBar({ homeHref = "" }: { homeHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--terracotta)" }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </div>
            <span className="font-serif font-bold text-lg text-white leading-tight">
              London<br />
              <span style={{ color: "var(--sand)" }}>Deck Builder</span>
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
              style={{ backgroundColor: "var(--terracotta)" }}
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
              style={{ backgroundColor: "var(--terracotta)" }}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
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
      a: "Absolutely! London Deck Builders offers a 5-year workmanship warranty on all our decks. The materials often come with their manufacturer warranties, which can range from 10 to 25 years depending on what you choose.",
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
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Got Questions?
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ color: "var(--wood-dark)" }}>
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
                <span className="font-semibold pr-4" style={{ color: "var(--wood-dark)" }}>{faq.q}</span>
                <span className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} style={{ color: "var(--terracotta)" }}>
                  <ChevronDownIcon />
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-1 bg-white">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--wood)" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
              Get In Touch
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--wood-dark)" }}>
              Request Your<br />Free Quote
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--wood)" }}>
              Ready to transform your backyard? Fill out the form and we'll be in touch within 24 hours with a free, no-obligation quote.
            </p>

            <div className="space-y-5">
              <a href="tel:5199141663" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--terracotta)", color: "white" }}>
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--wood-light)" }}>Phone</p>
                  <p className="font-semibold group-hover:underline" style={{ color: "var(--wood-dark)" }}>(519) 914-1663</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--terracotta)", color: "white" }}>
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--wood-light)" }}>Office</p>
                  <p className="font-semibold" style={{ color: "var(--wood-dark)" }}>50432 Yorke Line, Belmont Ontario</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-xl border" style={{ borderColor: "var(--cream)", backgroundColor: "white" }}>
              <p className="font-semibold mb-1" style={{ color: "var(--wood-dark)" }}>Hours of Operation</p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>Weekdays: 8:00 AM – 5:00 PM</p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>Saturday & Sunday: Closed</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(196,98,58,0.1)" }}>
                  <svg className="w-8 h-8" style={{ color: "var(--terracotta)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--wood-dark)" }}>Quote Request Sent!</h3>
                <p className="text-sm mb-6" style={{ color: "var(--wood)" }}>We'll be in touch within 24 hours with your free quote.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--terracotta)" }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold mb-5" style={{ color: "var(--wood-dark)" }}>Tell Us About Your Project</h3>

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
                  style={{ backgroundColor: "var(--terracotta)" }}
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
