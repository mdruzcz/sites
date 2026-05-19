"use client";

import { useState, useRef } from "react";
import { site } from "@/lib/site";
import { PhoneIcon, MailIcon, MapPinIcon, CheckIcon } from "./icons";

const services = [
  "New Installation",
  "Repair Service",
  "Consultation",
  "Maintenance",
  "Replace Existing Lights",
  "Other",
];

export function Contact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    service: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const loadedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _loaded: loadedAt.current }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please call us directly.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        service: "",
        message: "",
        website: "",
      });
      loadedAt.current = Date.now();
      window.location.hash = "contact";
    } catch {
      setErrorMsg("Network error. Please try again or call us directly.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--gold)] transition bg-white/5 border-white/15 text-white placeholder-white/40";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-wider mb-1.5 text-white/65";

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--night-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--gold-bright)" }}
            >
              Get In Touch
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Request Your{" "}
              <span className="text-gradient-gold">Free Estimate</span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed mb-10">
              Ready to light up your home year-round? Fill out the form and
              we'll be in touch within 24 hours with your free, no-obligation
              quote.
            </p>

            <div className="space-y-5">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 group min-h-11"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-bright), var(--amber))",
                    color: "var(--night-deep)",
                  }}
                >
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">
                    Phone
                  </p>
                  <p className="font-semibold text-white group-hover:text-[var(--gold-bright)] transition">
                    {site.phone}
                  </p>
                </div>
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-4 group min-h-11"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-bright), var(--amber))",
                    color: "var(--night-deep)",
                  }}
                >
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">
                    Email
                  </p>
                  <p className="font-semibold text-white group-hover:text-[var(--gold-bright)] transition break-all">
                    {site.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 min-h-11">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-bright), var(--amber))",
                    color: "var(--night-deep)",
                  }}
                >
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">
                    Service Area
                  </p>
                  <p className="font-semibold text-white">
                    Burlington · Oakville · Halton Region
                  </p>
                </div>
              </div>
            </div>

            <div
              className="mt-10 p-5 rounded-xl border"
              style={{
                borderColor: "rgba(245,194,107,0.2)",
                backgroundColor: "rgba(245,194,107,0.05)",
              }}
            >
              <p className="font-semibold mb-1 text-white">Hours of Operation</p>
              <p className="text-sm text-white/65">Mon – Fri: 8:00 AM – 8:00 PM</p>
              <p className="text-sm text-white/65">Saturday: 9:00 AM – 6:00 PM</p>
              <p className="text-sm text-white/65">Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 shadow-2xl border"
            style={{
              backgroundColor: "rgba(31,40,73,0.45)",
              borderColor: "rgba(245,194,107,0.15)",
            }}
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 gold-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-bright), var(--amber))",
                    color: "var(--night-deep)",
                  }}
                >
                  <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white mb-2">
                  Estimate Request Sent!
                </h3>
                <p className="text-sm text-white/65 mb-6 max-w-sm">
                  Thanks — we'll get back to you within 24 hours with your free,
                  no-obligation estimate.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-[var(--night-deep)] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Tell us about your project
                </h3>
                <p className="text-sm text-white/55 mb-5">
                  We respond within 24 hours.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      autoComplete="given-name"
                      value={form.first_name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      autoComplete="family-name"
                      value={form.last_name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="jane@email.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="(289) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Home Address</label>
                    <input
                      type="text"
                      name="address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Burlington"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Service Type *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" className="bg-[var(--midnight)] text-white">
                      Select a service…
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[var(--midnight)] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Project Details</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your home, what areas you want lit, or any questions…"
                  />
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
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
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    {errorMsg || "Something went wrong. Please call us directly."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-full font-semibold text-[var(--night-deep)] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(245,194,107,0.4)] disabled:opacity-60 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          opacity="0.25"
                        />
                        <path
                          d="M12 2a10 10 0 0110 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send My Free Estimate Request"
                  )}
                </button>

                <p className="text-xs text-center text-white/45">
                  No obligation. We'll get back to you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
