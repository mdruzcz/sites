"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { PhoneIcon, MapPinIcon, CheckIcon } from "./icons";

const services = [
  "Deck Staining",
  "Fence Staining",
  "Sealing & Protection",
  "Power Washing & Prep",
  "Deck Restoration",
  "Not sure yet — need advice",
];

const heardOptions = [
  "Google",
  "Facebook",
  "Instagram",
  "Word of Mouth",
  "Other",
];

const MAX_FILE_SIZE_MB = 10;

export function Contact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    service: "",
    heard_about: "",
    message: "",
    website: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const valid: File[] = [];
    for (const f of selected) {
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`"${f.name}" is larger than ${MAX_FILE_SIZE_MB} MB. Please upload smaller photos.`);
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

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

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
        address: "", city: "", service: "", heard_about: "",
        message: "", website: "",
      });
      setFiles([]);
      loadedAt.current = Date.now();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: document.getElementById("contact")?.offsetTop ?? 0, behavior: "smooth" });
      }
    } catch {
      setErrorMsg("Network error. Please try again or call us directly.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)] transition bg-white border-[var(--line)] text-[var(--driftwood-dark)] placeholder-[var(--driftwood)]/40";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--driftwood)]/80";

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[var(--greige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
              Get a Free Quote
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
              Request your <span className="text-[var(--terracotta)]">free written quote</span>
            </h2>
            <p className="text-lg text-[var(--driftwood)]/80 leading-relaxed mb-10">
              Fill out the form and we&apos;ll be in touch within 24 hours with
              your free, itemized quote. Attach a photo or two of your deck or
              fence and we can rough in a quote before we visit.
            </p>

            <div className="space-y-5">
              <a href={site.phoneHref} className="flex items-center gap-4 group min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--terracotta)] text-white">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-[var(--driftwood)]/55">Phone</p>
                  <p className="font-semibold text-[var(--driftwood-dark)] group-hover:text-[var(--terracotta-deep)] transition">
                    {site.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 min-h-11">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--terracotta)] text-white">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5 text-[var(--driftwood)]/55">Service Area</p>
                  <p className="font-semibold text-[var(--driftwood-dark)]">
                    Kitchener · Waterloo · Cambridge · Guelph
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-xl border border-[var(--line)] bg-[var(--cream)] shadow-warm">
              <p className="font-semibold mb-2 text-[var(--driftwood-dark)]">Hours of Operation</p>
              {site.hoursList.map((h) => (
                <p key={h.days} className="text-sm text-[var(--driftwood)]/75">
                  <span className="font-medium">{h.days}:</span> {h.time}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 shadow-warm-lg border border-[var(--line)] bg-[var(--cream)]">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[var(--terracotta)] text-white shadow-warm">
                  <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-extrabold mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-sm text-[var(--driftwood)]/75 mb-6 max-w-sm">
                  Thanks &mdash; we&apos;ll get back to you within 24 hours with
                  your free, no-obligation written quote.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold mb-1">
                  Tell us about your project
                </h3>
                <p className="text-sm text-[var(--driftwood)]/65 mb-5">
                  We respond within 24 hours.
                </p>

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
                    <input type="tel" name="phone" required inputMode="tel" autoComplete="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="(519) 000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Home Address</label>
                    <input type="text" name="address" autoComplete="street-address" value={form.address} onChange={handleChange} className={inputClass} placeholder="123 Main St" />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <select name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} className={inputClass}>
                      <option value="">Select…</option>
                      <option value="Kitchener">Kitchener</option>
                      <option value="Waterloo">Waterloo</option>
                      <option value="Cambridge">Cambridge</option>
                      <option value="Guelph">Guelph</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Service Type *</label>
                  <select name="service" required value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    How did you hear about us? <span className="opacity-50 normal-case font-normal">(optional)</span>
                  </label>
                  <select name="heard_about" value={form.heard_about} onChange={handleChange} className={inputClass}>
                    <option value="">Select an option…</option>
                    {heardOptions.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Upload Photos of Your Deck or Fence <span className="opacity-50 normal-case font-normal">(optional · up to 5)</span>
                  </label>
                  <div
                    className="rounded-lg border-2 border-dashed border-[var(--line)] p-4 transition cursor-pointer hover:border-[var(--terracotta)]/60 hover:bg-[var(--terracotta)]/[0.04] bg-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="photos"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {files.length === 0 ? (
                      <div className="text-center py-3">
                        <svg className="w-7 h-7 mx-auto mb-2 text-[var(--terracotta)]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-[var(--driftwood)]/75">
                          <span className="font-semibold text-[var(--terracotta-deep)]">Click to upload photos</span>{" "}or drop them here
                        </p>
                        <p className="text-xs text-[var(--driftwood)]/55 mt-1">
                          JPG, PNG, WebP &mdash; max {MAX_FILE_SIZE_MB} MB each
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {files.map((f, i) => (
                          <div
                            key={`${f.name}-${i}`}
                            className="flex items-center justify-between gap-3 rounded-md bg-[var(--greige-soft)] px-3 py-2 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="truncate text-[var(--driftwood-dark)]">{f.name}</span>
                            <span className="text-xs text-[var(--driftwood)]/55 flex-shrink-0">
                              {(f.size / 1024 / 1024).toFixed(1)} MB
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                              className="text-[var(--driftwood)]/60 hover:text-red-600 transition flex-shrink-0"
                              aria-label={`Remove ${f.name}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {files.length < 5 && (
                          <p className="text-xs text-[var(--driftwood)]/55 text-center pt-1">
                            Click to add more
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Project Details</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your deck or fence — size, current condition, colour preferences, or any questions…"
                  />
                </div>

                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, overflow: "hidden" }}
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
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {errorMsg || "Something went wrong. Please call us directly."}
                  </p>
                )}

                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
                  onSuccess={setToken}
                />

                <button
                  type="submit"
                  disabled={status === "sending" || !token}
                  className="w-full py-4 rounded-full font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition-all hover:scale-[1.01] hover:shadow-warm-lg disabled:opacity-60 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send My Free Quote Request"
                  )}
                </button>

                <p className="text-xs text-center text-[var(--driftwood)]/55">
                  No obligation. We&apos;ll get back to you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
