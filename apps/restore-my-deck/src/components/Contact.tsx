"use client";

import { useState, useRef, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { SERVICE_OPTIONS } from "./HeroQuoteForm";
import { PhoneIcon, MapPinIcon, CheckIcon, ClockIcon, MailIcon } from "./icons";

export function Contact({ cityName, service }: { cityName?: string; service?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")?.toString().trim()) { setStatus("success"); return; }
    if (captcha && !token) { setError("Please complete the security check."); setStatus("error"); return; }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), phone: data.get("phone"), city: data.get("city"), service: data.get("service"), message: data.get("message"), token: token ?? "" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--cream)]">
      <div className="shell section grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow-pill">Get in touch</p>
          <h2 className="font-display h2-fluid mt-4 mb-5">Request your <span className="text-gradient-accent">free quote</span></h2>
          <p className="lead mb-10 text-[var(--ink-soft)]">
            Tell us about the deck or fence and we will reply within 24 hours. Photos help: a couple of shots of the boards, railings and stairs usually let us quote without a site visit.
          </p>
          <div className="mb-8 space-y-5">
            <a href={site.phoneHref} className="group flex min-h-11 items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--accent)]"><PhoneIcon className="text-white" /></div>
              <div><p className="mb-0.5 text-xs uppercase tracking-wider text-[var(--muted)]">Phone · call or text</p><p className="font-bold text-[var(--ink)] transition group-hover:text-[var(--accent-deep)]">{site.phone}</p></div>
            </a>
            <a href={site.emailHref} className="group flex min-h-11 items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--cedar)]"><MailIcon className="text-white" /></div>
              <div><p className="mb-0.5 text-xs uppercase tracking-wider text-[var(--muted)]">Email · send photos</p><p className="font-bold text-[var(--ink)] transition group-hover:text-[var(--accent-deep)]">{site.email}</p></div>
            </a>
            <div className="flex min-h-11 items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--moss)]"><MapPinIcon className="text-white" /></div>
              <div><p className="mb-0.5 text-xs uppercase tracking-wider text-[var(--muted)]">Service area</p><p className="font-bold text-[var(--ink)]">Kitchener · Waterloo · Cambridge · Guelph · Hamilton · Stratford · Woodstock · Fergus · Paris</p></div>
            </div>
            <div className="flex min-h-11 items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--gold)]"><ClockIcon className="text-[var(--ink)]" /></div>
              <div><p className="mb-0.5 text-xs uppercase tracking-wider text-[var(--muted)]">Hours</p><p className="font-bold text-[var(--ink)]">{site.hours}</p></div>
            </div>
          </div>
          <div className="card p-5">
            <p className="mb-1 font-bold">What happens next</p>
            <p className="text-sm text-[var(--ink-soft)]">We confirm the wood type, size and condition, recommend a stain and colour, and send a written quote. Most projects are booked within two weeks and finished in about two days.</p>
          </div>
        </div>

        <div className="card p-6 md:p-8">
          {status === "success" ? (
            <div ref={successRef} className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-5 grid size-16 place-items-center rounded-full bg-[var(--moss)]"><CheckIcon className="w-8 h-8 text-white" /></div>
              <h3 className="font-display mb-2 text-2xl">Quote request received</h3>
              <p className="mb-6 max-w-sm text-sm text-[var(--ink-soft)]">Thank you. We will get back to you within <strong className="text-[var(--ink)]">24 hours</strong> with your free quote.</p>
              <button onClick={() => setStatus("idle")} className="btn-accent btn-sm">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display mb-1 text-xl">Tell us about your deck or fence</h3>
              <p className="mb-4 text-sm text-[var(--muted)]">We respond within 24 hours.</p>
              <input type="text" name="website" autoComplete="off" className="absolute h-0 w-0 overflow-hidden opacity-0 pointer-events-none" tabIndex={-1} aria-hidden="true" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="c-name">Your name *</label><input id="c-name" type="text" name="name" required autoComplete="name" className="input" placeholder="Jane Smith" /></div>
                <div><label className="label" htmlFor="c-phone">Phone *</label><input id="c-phone" type="tel" name="phone" required autoComplete="tel" inputMode="tel" className="input" placeholder="(226) 000-0000" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="c-email">Email *</label><input id="c-email" type="email" name="email" required autoComplete="email" inputMode="email" className="input" placeholder="jane@email.com" /></div>
                <div><label className="label" htmlFor="c-city">City</label><input id="c-city" type="text" name="city" autoComplete="address-level2" defaultValue={cityName ?? ""} className="input" placeholder="Kitchener" /></div>
              </div>
              <div>
                <label className="label" htmlFor="c-service">Service</label>
                <select id="c-service" name="service" defaultValue={service ?? ""} className="input">
                  <option value="">Select a service…</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="c-message">Details</label>
                <textarea id="c-message" name="message" rows={4} className="input resize-none" placeholder="Deck size, wood type (cedar or pressure-treated), current condition, colour you like, timing…" />
              </div>
              {captcha && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} options={{ theme: "light", size: "flexible" }} />}
              {status === "error" && <p className="rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent-deep)]">{error}</p>}
              <button type="submit" disabled={status === "sending"} className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60">
                {status === "sending" ? "Processing…" : "Get my free quote"}
              </button>
              <p className="text-center text-xs text-[var(--muted)]">No spam. No obligation. We only contact you about your project.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
