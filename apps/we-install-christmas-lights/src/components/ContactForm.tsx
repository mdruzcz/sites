"use client";

import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { CheckIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const ref = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    if (form.get("website")) {
      // honeypot
      setStatus("success");
      return;
    }

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      city: String(form.get("city") || ""),
      service: String(form.get("service") || ""),
      message: String(form.get("message") || ""),
      turnstileToken: token,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Submission failed.");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      ref.current?.reset();
      setToken(null);
      // scroll to top of form so success message is visible
      setTimeout(() => {
        document.getElementById("contact-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  }

  if (status === "success") {
    return (
      <div id="contact-form-anchor" className="card p-8 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-[color:var(--brand-green)] text-white flex items-center justify-center">
          <CheckIcon className="w-6 h-6" />
        </div>
        <h3 className="heading-display text-xl mt-4 text-[color:var(--brand-green)]">Thanks! Your request is in.</h3>
        <p className="mt-2 text-[color:var(--ink-soft)]">
          We'll reply with a free quote within 24 hours. For urgent requests call <a className="font-semibold underline" href="tel:+15192666796">(519) 266-6796</a>.
        </p>
      </div>
    );
  }

  return (
    <form id="contact-form-anchor" onSubmit={onSubmit} className="card p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* honeypot */}
      <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

      <div className="sm:col-span-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)]" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)]" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)]" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="city">City</label>
        <input id="city" name="city" autoComplete="address-level2" className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)]" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="service">Service</label>
        <select id="service" name="service" className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)] bg-white">
          <option value="">Choose a service…</option>
          <option>Residential Christmas Light Installation</option>
          <option>Residential Christmas Decorators</option>
          <option>Full Season Holiday Service</option>
          <option>Christmas Light Takedown</option>
          <option>Year-Long Storage</option>
          <option>Govee Permanent Lighting Installation</option>
          <option>Eufy Permanent Lighting Installation</option>
          <option>Commercial Christmas Light Installation</option>
          <option>Commercial Christmas Decorators</option>
          <option>Commercial Christmas Trees & Decorations</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[color:var(--brand-green)]" htmlFor="message">Tell us about your project</label>
        <textarea id="message" name="message" rows={5} className="mt-1 w-full px-4 py-2.5 border border-[color:var(--border)] rounded-lg focus:outline-none focus:border-[color:var(--brand-green)]" placeholder="What kind of display are you imagining? Roof lines, trees, hedges, ground stakes? Estimated budget?" />
      </div>

      {siteKey && (
        <div className="sm:col-span-2">
          <Turnstile
            ref={ref}
            siteKey={siteKey}
            options={{ theme: "light", size: "normal" }}
            onSuccess={(t) => setToken(t)}
            onError={() => setToken(null)}
            onExpire={() => setToken(null)}
          />
        </div>
      )}

      {errorMsg && (
        <p className="sm:col-span-2 text-sm text-[color:var(--brand-red)] font-semibold">{errorMsg}</p>
      )}

      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-red w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send My Free Quote"}
        </button>
        <p className="text-xs text-[color:var(--ink-soft)]">
          We respond within 24 hours. No spam — your details stay with us.
        </p>
      </div>
    </form>
  );
}
