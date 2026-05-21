"use client";

import { useState, useRef } from "react";
import { site } from "@/lib/site";

const serviceOptions = [
  "Deck Staining & Sealing",
  "Full-Service Deck Restoration",
  "Power Washing & Deep Cleaning",
  "Fence Staining & Restoration",
  "Multiple Services",
  "Not Sure — Need Assessment",
];

const heardOptions = [
  "Google Search",
  "Facebook / Instagram",
  "Saw a Deck Medic project on a home",
  "Word of mouth / Referral",
  "Other",
];

export function Contact() {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    address: "", city: "", service: "", heard_about: "",
    message: "", website: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const valid: File[] = [];
    for (const f of selected) {
      if (f.size > 10 * 1024 * 1024) { setErrorMsg(`"${f.name}" is larger than 10 MB.`); continue; }
      if (!f.type.startsWith("image/")) { setErrorMsg(`"${f.name}" is not an image.`); continue; }
      valid.push(f);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
    if (valid.length) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("_loaded", String(loadedAt.current));
      files.forEach((f) => fd.append("photos", f));
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setStatus("error"); return; }
      setStatus("success");
      setForm({ first_name: "", last_name: "", email: "", phone: "", address: "", city: "", service: "", heard_about: "", message: "", website: "" });
      setFiles([]);
      loadedAt.current = Date.now();
    } catch {
      setErrorMsg("Network error. Please call us directly.");
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition bg-white border-[var(--light-grey)] text-[var(--slate)] placeholder-[var(--slate-muted)]";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--slate-light)]";

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>
              Get In Touch
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-5 leading-tight" style={{ color: "var(--slate)" }}>
              Request Your{" "}
              <span className="text-gradient-blue">Free Estimate</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--slate-muted)" }}>
              Ready to restore your deck? Fill out the form and we'll respond within {site.responseTime}
              with a no-obligation quote. Attach a photo of your deck and we can often rough in a quote before our visit.
            </p>

            <div className="space-y-5 mb-8">
              <a href={site.phoneHref} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--blue)", color: "white" }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01L6.62 10.79z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--slate-muted)" }}>Phone</p>
                  <p className="font-semibold group-hover:text-[var(--blue-dark)] transition" style={{ color: "var(--blue)" }}>{site.phone}</p>
                </div>
              </a>

              <a href={`mailto:${site.email}`} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--blue)", color: "white" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--slate-muted)" }}>Email</p>
                  <p className="font-semibold group-hover:text-[var(--blue-dark)] transition" style={{ color: "var(--blue)" }}>{site.email}</p>
                </div>
              </a>
            </div>

            <div className="p-5 rounded-xl border" style={{ borderColor: "var(--light-grey)", background: "var(--white)" }}>
              <p className="font-semibold mb-1" style={{ color: "var(--slate)" }}>Hours of Operation</p>
              <p className="text-sm" style={{ color: "var(--slate-muted)" }}>Monday to Friday: 8:00 AM – 5:00 PM</p>
              <p className="text-sm" style={{ color: "var(--slate-muted)" }}>Weekends: Closed</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl p-8 shadow-xl border" style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--blue)", color: "white" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-extrabold mb-2" style={{ color: "var(--slate)" }}>Estimate Request Sent!</h3>
                <p className="text-sm mb-6 max-w-sm" style={{ color: "var(--slate-muted)" }}>
                  Thanks — we'll get back to you within {site.responseTime} with your free, no-obligation estimate.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white min-h-11"
                  style={{ background: "var(--blue)" }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold mb-1" style={{ color: "var(--slate)" }}>Tell us about your project</h3>
                <p className="text-sm mb-4" style={{ color: "var(--slate-muted)" }}>We respond within {site.responseTime}.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input type="text" name="first_name" required autoComplete="given-name" value={form.first_name} onChange={handleChange} className={inputClass} placeholder="Jane" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input type="text" name="last_name" required autoComplete="family-name" value={form.last_name} onChange={handleChange} className={inputClass} placeholder="Smith" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="jane@email.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input type="tel" name="phone" required inputMode="tel" autoComplete="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="(416) 000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Home Address</label>
                    <input type="text" name="address" autoComplete="street-address" value={form.address} onChange={handleChange} className={inputClass} placeholder="123 Main St" />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} className={inputClass} placeholder="Toronto" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Service Type *</label>
                  <select name="service" required value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service…</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>How did you hear about us? <span className="opacity-50 normal-case font-normal">(optional)</span></label>
                  <select name="heard_about" value={form.heard_about} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    {heardOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Photos of your deck <span className="opacity-50 normal-case font-normal">(optional · up to 5)</span></label>
                  <div
                    className="rounded-lg border border-dashed p-4 cursor-pointer hover:border-[var(--blue)] hover:bg-[var(--blue-pale)] transition"
                    style={{ borderColor: "var(--slate-muted)" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" name="photos" accept="image/jpeg,image/png,image/webp,image/heic" multiple onChange={handleFileChange} className="hidden" />
                    {files.length === 0 ? (
                      <div className="text-center py-3">
                        <svg className="w-7 h-7 mx-auto mb-2" style={{ color: "var(--slate-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm" style={{ color: "var(--slate-muted)" }}>
                          <span className="font-semibold" style={{ color: "var(--blue)" }}>Click to attach photos</span> or drop them here
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--slate-muted)" }}>JPG, PNG, WebP — max 10 MB each</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {files.map((f, i) => (
                          <div key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md bg-[var(--blue-pale)] px-3 py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                            <span className="truncate" style={{ color: "var(--slate)" }}>{f.name}</span>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setFiles((p) => p.filter((_, idx) => idx !== i)); }} className="flex-shrink-0 hover:text-red-500 transition" style={{ color: "var(--slate-muted)" }} aria-label={`Remove ${f.name}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Project Details</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Describe your deck, its condition, what you're hoping to achieve…" />
                </div>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                  <input type="text" name="website" autoComplete="off" tabIndex={-1} value={form.website} onChange={handleChange} />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2"
                  style={{ background: "var(--blue)" }}
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : "Send My Free Estimate Request"}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--slate-muted)" }}>
                  No obligation. We'll get back to you within {site.responseTime}.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
