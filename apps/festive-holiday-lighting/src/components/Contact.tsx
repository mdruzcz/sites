"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { PhoneIcon, MapPinIcon, CheckIcon } from "./icons";

const serviceTypes = [
  "Classic Christmas Lights (Seasonal)",
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
  const [token, setToken] = useState<string | null>(null);
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
    if (!token) { setErrorMsg("Please complete the captcha."); setStatus("error"); return; }
    setStatus("sending");
    setErrorMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("_loaded", String(loadedAt.current));
      fd.append("token", token);
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

  const inputClass = "input";
  const labelClass = "label";

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-[var(--paper)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div>
            <p className="eyebrow-pill candy">Get in touch</p>
            <h2 className="font-display h2-fluid mt-4 mb-5">Request your <span className="text-candy">free quote</span></h2>
            <p className="lead text-[var(--ink-soft)] mb-10">
              Ready to light up your home or business? Fill out the form and we'll be back in touch within 24 hours with your free, no-obligation quote. Attach a photo of your home or business and we can often rough in a quote before we even visit.
            </p>

            <div className="space-y-5 mb-8">
              <a href={site.phoneHref} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--candy)]">
                  <PhoneIcon className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-[var(--muted)]">Phone</p>
                  <p className="font-bold text-[var(--ink)] group-hover:text-[var(--candy)] transition">{site.phone}</p>
                </div>
              </a>


              <div className="flex items-center gap-4 min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--pine)]">
                  <MapPinIcon className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-[var(--muted)]">Service area</p>
                  <p className="font-bold text-[var(--ink)]">Hamilton · Burlington · Oakville · Niagara · and more</p>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <p className="font-bold mb-1">Hours of operation</p>
              <p className="text-sm text-[var(--ink-soft)]">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <p className="text-sm text-[var(--ink-soft)]">Extended hours during the holiday season</p>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[var(--pine)]">
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl mb-2">Quote request sent</h3>
                <p className="text-sm text-[var(--ink-soft)] mb-6 max-w-sm">
                  Thanks! Cameron and the team will be in touch within 24 hours with your free, no-obligation quote.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-candy btn-sm"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl mb-1">Tell us about your project</h3>
                <p className="text-sm text-[var(--muted)] mb-4">We respond within 24 hours, usually the same day.</p>

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
                      <option value="">Select…</option>
                      {propertyTypes.map(p => <option key={p} value={p}>{p}</option>)}
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
                    <option value="">Select a service…</option>
                    {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Photos of your home/business <span className="opacity-50 normal-case font-normal">(optional · up to 5)</span>
                  </label>
                  <div
                    className="rounded-xl border-2 border-dashed border-[var(--line-strong)] bg-[var(--snow)] p-4 cursor-pointer hover:border-[var(--candy)] transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" name="photos"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      multiple onChange={handleFileChange} className="hidden" />
                    {files.length === 0 ? (
                      <div className="text-center py-3">
                        <svg className="w-7 h-7 mx-auto mb-2 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-[var(--ink-soft)]"><span className="font-bold text-[var(--candy)]">Attach photos</span> so we can quote faster</p>
                        <p className="text-xs text-[var(--muted)] mt-1">JPG, PNG, WebP — max {MAX_FILE_SIZE_MB} MB each</p>
                      </div>
                    ) : (
                      <div className="space-y-2" onClick={e => e.stopPropagation()}>
                        {files.map((f, i) => (
                          <div key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md bg-[var(--paper)] px-3 py-2 text-sm">
                            <span className="truncate text-[var(--ink-soft)]">{f.name}</span>
                            <button type="button" onClick={() => removeFile(i)}
                              className="text-[var(--muted)] hover:text-[var(--candy)] transition flex-shrink-0" aria-label={`Remove ${f.name}`}>
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
                  <p className="text-sm text-[var(--candy-deep)] bg-[var(--candy-soft)] rounded-lg p-3">
                    {errorMsg || "Something went wrong. Please call us directly."}
                  </p>
                )}

                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
                  options={{ theme: "light", size: "flexible" }}
                  onSuccess={setToken}
                />

                <button
                  type="submit"
                  disabled={status === "sending" || !token}
                  className="btn-candy w-full disabled:opacity-60 disabled:cursor-not-allowed"
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
                <p className="text-xs text-center text-[var(--muted)]">No obligation. We respond within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
