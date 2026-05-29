"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const PhoneIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

type FormData = {
  first_name: string; last_name: string; email: string; phone: string;
  intent: string; city: string; message: string; website: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    first_name: "", last_name: "", email: "", phone: "",
    intent: "", city: "", message: "", website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const loadedAt = useRef<number>(Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  const set = useCallback((k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v })), []);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      let recaptchaToken = "";
      if (typeof window !== "undefined" && (window as any).grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) recaptchaToken = await (window as any).grecaptcha.execute(siteKey, { action: "contact" });
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
        (window as any).umami?.track("form-submission", { type: "contact", page: "contact-page" });
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1";
  const inputStyle = { background: "var(--navy)", border: "1px solid var(--navy-border)", color: "var(--cream)" };

  return (
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
      {/* Left */}
      <div>
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Get in Touch</p>
        <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
          Let&apos;s Talk About Your{" "}
          <span style={{ color: "var(--gold)" }}>Next Move</span>
        </h1>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--cream-muted)" }}>
          Whether you&apos;re ready to list, just starting to explore, curious what your home is worth, or looking
          at your first investment property — reach out. The first conversation is always free, always honest,
          and always directly with Matt.
        </p>

        <div className="space-y-5 mb-10">
          {[
            { icon: <PhoneIcon />, label: "Phone", value: "(519) 878-6735", href: "tel:+15198786735" },
            { icon: <MailIcon />, label: "Email", value: "matt.druzcz@gmail.com", href: "mailto:matt.druzcz@gmail.com" },
            { icon: <MapPinIcon />, label: "Serving", value: "London · Aylmer · St. Thomas · Woodstock, ON", href: undefined },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(201,168,76,0.10)", color: "var(--gold)" }}>
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "var(--cream-muted)" }}>{item.label}</div>
                {item.href ? (
                  <a href={item.href} className="text-sm font-semibold hover:underline" style={{ color: "var(--cream)" }}>{item.value}</a>
                ) : (
                  <span className="text-sm font-semibold" style={{ color: "var(--cream)" }}>{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
          <h2 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--cream)" }}>Response Time</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>
            Matt responds to all inquiries within 24 hours — usually same day. For urgent matters, call directly.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="rounded-2xl p-8" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
        {status === "success" ? (
          <div ref={successRef} className="text-center py-12">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)" }}>
              <CheckIcon />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--cream)" }}>Message Received!</h3>
            <p className="text-sm" style={{ color: "var(--cream-muted)" }}>
              Thanks for reaching out. I&apos;ll be in touch within 24 hours. You can also reach me directly at{" "}
              <a href="tel:+15198786735" className="hover:underline" style={{ color: "var(--gold)" }}>(519) 878-6735</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-serif text-xl font-bold mb-6" style={{ color: "var(--cream)" }}>Send Me a Message</h2>

            <div className="absolute left-[-9999px] top-0" aria-hidden="true">
              <input type="text" name="website" tabIndex={-1} autoComplete="off"
                value={form.website} onChange={e => set("website", e.target.value)} />
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
                placeholder="Tell me about what you're looking for…" />
            </div>

            {errorMsg && (
              <p className="text-sm rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.1)", color: "#F87171" }}>{errorMsg}</p>
            )}

            <button type="submit" disabled={status === "sending"}
              className="w-full py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              {status === "sending" ? "Sending…" : "Send My Message →"}
            </button>

            <p className="text-xs text-center" style={{ color: "var(--cream-muted)" }}>
              Protected by reCAPTCHA. Your info is kept private and never shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
