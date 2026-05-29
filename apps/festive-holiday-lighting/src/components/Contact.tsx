"use client";

import { useState, useRef } from "react";
<<<<<<< HEAD
=======
import { Turnstile } from "@marsidev/react-turnstile";
>>>>>>> origin/main
import { site } from "@/lib/site";
import { PhoneIcon, MapPinIcon, CheckIcon } from "./icons";

const serviceTypes = [
  "Christmas Light Installation (Seasonal)",
  "Permanent Holiday Lighting",
  "Residential Lighting",
  "Commercial Lighting",
  "Municipal / BIA Lighting",
  "Tree Lighting",
  "Interior Holiday Decorating",
  "Other / Not Sure Yet",
];

const propertyTypes = ["Residential Home", "Commercial Property", "Municipal / BIA", "Other"];

const heardOptions = [
  "Google Search",
  "Facebook / Instagram",
  "Saw a Festive install on a home",
  "Word of mouth / Referral",
  "Drove past our truck or yard sign",
  "Other",
];

const MAX_FILE_SIZE_MB = 10;

export function Contact({ cityName }: { cityName?: string }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: cityName ?? "",
    service: "",
    property_type: "",
    heard_about: "",
    message: "",
    website: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
<<<<<<< HEAD
=======
  const [token, setToken] = useState<string | null>(null);
>>>>>>> origin/main
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const valid: File[] = [];
    for (const f of selected) {
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`"${f.name}" is larger than ${MAX_FILE_SIZE_MB} MB.`);
        continue;
      }
      if (!f.type.startsWith("image/")) {
        setErrorMsg(`"${f.name}" isn't an image file.`);
        continue;
      }
      valid.push(f);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
    if (valid.length) setErrorMsg("");
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    if (!token) { setErrorMsg("Please complete the captcha."); setStatus("error"); return; }
>>>>>>> origin/main
    setStatus("sending");
    setErrorMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("_loaded", String(loadedAt.current));
<<<<<<< HEAD
=======
      fd.append("token", token);
>>>>>>> origin/main
      files.forEach((f) => fd.append("photos", f));
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please call us directly.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({
        first_name: "", last_name: "", email: "", phone: "",
        address: "", city: cityName ?? "", service: "", property_type: "",
        heard_about: "", message: "", website: "",
      });
      setFiles([]);
      loadedAt.current = Date.now();
    } catch {
      setErrorMsg("Network error. Please call us directly.");
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--crimson)] transition bg-white/5 border-white/15 text-white placeholder-white/40";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-1.5 text-white/65";

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--night-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>
              Get In Touch
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Request Your{" "}
              <span className="text-gradient-gold">Free Quote</span>
            </h2>
            <p className="text-lg text-white/65 mb-10 leading-relaxed">
              Ready to light up your home or business? Fill out the form and we'll be back in touch within 24 hours with your free, no-obligation quote. Attach a photo of your home or business and we can often rough in a quote before we even visit.
            </p>

            <div className="space-y-5 mb-8">
              <a href={site.phoneHref} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                  <PhoneIcon className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">Phone</p>
                  <p className="font-semibold text-white group-hover:text-[var(--gold-bright)] transition">{site.phone}</p>
                </div>
              </a>

              <a href={`mailto:${site.email}`} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--gold-bright), var(--gold))" }}>
                  <svg className="w-5 h-5 text-[#0A0A14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">Email</p>
                  <p className="font-semibold text-white group-hover:text-[var(--gold-bright)] transition">{site.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                  <MapPinIcon className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-white/45">Service Area</p>
                  <p className="font-semibold text-white">Hamilton · Burlington · Oakville · and more</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border" style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "rgba(201,168,76,0.05)" }}>
              <p className="font-semibold text-white mb-1">Hours of Operation</p>
              <p className="text-sm text-white/65">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <p className="text-sm text-white/65">Extended hours during holiday season</p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-8 shadow-2xl border"
            style={{ backgroundColor: "rgba(20,10,10,0.7)", borderColor: "rgba(178,34,34,0.15)" }}>
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 crimson-glow"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white mb-2">Quote Request Sent!</h3>
                <p className="text-sm text-white/65 mb-6 max-w-sm">
                  Thanks! Cameron and the team will be in touch within 24 hours with your free, no-obligation quote.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-white mb-1">Tell us about your project</h3>
                <p className="text-sm text-white/55 mb-4">We respond within 24 hours — usually same day.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input type="text" name="first_name" required autoComplete="given-name"
                      value={form.first_name} onChange={handleChange}
                      className={inputClass} placeholder="Jane" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input type="text" name="last_name" required autoComplete="family-name"
                      value={form.last_name} onChange={handleChange}
                      className={inputClass} placeholder="Smith" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" name="email" required autoComplete="email"
                      value={form.email} onChange={handleChange}
                      className={inputClass} placeholder="jane@email.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input type="tel" name="phone" required inputMode="tel" autoComplete="tel"
                      value={form.phone} onChange={handleChange}
                      className={inputClass} placeholder="(289) 000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Property Type *</label>
                    <select name="property_type" required value={form.property_type} onChange={handleChange} className={inputClass}>
                      <option value="" className="bg-[#1A0A0A] text-white">Select…</option>
                      {propertyTypes.map(p => <option key={p} value={p} className="bg-[#1A0A0A] text-white">{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="city" autoComplete="address-level2"
                      value={form.city} onChange={handleChange}
                      className={inputClass} placeholder="Hamilton" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Service Interested In *</label>
                  <select name="service" required value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="" className="bg-[#1A0A0A] text-white">Select a service…</option>
                    {serviceTypes.map(s => <option key={s} value={s} className="bg-[#1A0A0A] text-white">{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Photos of your home/business <span className="opacity-50 normal-case font-normal">(optional · up to 5)</span>
                  </label>
                  <div
                    className="rounded-lg border border-dashed p-4 cursor-pointer hover:border-[var(--crimson)]/60 transition"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" name="photos"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      multiple onChange={handleFileChange} className="hidden" />
                    {files.length === 0 ? (
                      <div className="text-center py-3">
                        <svg className="w-7 h-7 mx-auto mb-2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-white/70"><span className="font-semibold text-[var(--crimson-bright)]">Attach photos</span> — helps us quote faster</p>
                        <p className="text-xs text-white/40 mt-1">JPG, PNG, WebP — max {MAX_FILE_SIZE_MB} MB each</p>
                      </div>
                    ) : (
                      <div className="space-y-2" onClick={e => e.stopPropagation()}>
                        {files.map((f, i) => (
                          <div key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md bg-white/5 px-3 py-2 text-sm">
                            <span className="truncate text-white/80">{f.name}</span>
                            <button type="button" onClick={() => removeFile(i)}
                              className="text-white/50 hover:text-red-400 transition flex-shrink-0" aria-label={`Remove ${f.name}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Project Details</label>
                  <textarea name="message" rows={3}
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your home or business, what you'd like lit, any special requests…" />
                </div>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" autoComplete="off" tabIndex={-1}
                    value={form.website} onChange={handleChange} />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    {errorMsg || "Something went wrong. Please call us directly."}
                  </p>
                )}

<<<<<<< HEAD
                <button
                  type="submit"
                  disabled={status === "sending"}
=======
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
                  onSuccess={setToken}
                />

                <button
                  type="submit"
                  disabled={status === "sending" || !token}
>>>>>>> origin/main
                  className="w-full py-4 rounded-full font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                    boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : "Send My Free Quote Request"}
                </button>
                <p className="text-xs text-center text-white/45">No obligation. We respond within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
