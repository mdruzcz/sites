"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";

export const EVENT_OPTIONS = [
  "Wedding",
  "Corporate event or gala",
  "Christmas or holiday party",
  "Backyard or private party",
  "Holiday decor: garlands, wreaths, trees",
  "Commercial or mall holiday display",
  "Not sure yet",
];

interface QuoteFormProps {
  heading?: string;
  showPromise?: boolean;
  /** Pre-select an event/service option, e.g. from a service page. */
  defaultService?: string;
  compact?: boolean;
}

export function QuoteForm({ heading = "Check Your Date", showPromise = false, defaultService = "", compact = false }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [stalled, setStalled] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000") && !siteKey.startsWith("placeholder");

  // Mount the captcha once the form scrolls into view (or the user touches it),
  // and flag it as stalled if no token arrives in a reasonable time.
  useEffect(() => {
    const el = formRef.current;
    if (!el || !captcha) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setEngaged(true);
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [captcha]);

  useEffect(() => {
    if (!engaged || token) return;
    const t = setTimeout(() => setStalled(true), 15000);
    return () => clearTimeout(t);
  }, [engaged, token]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") ?? "").trim()) {
      setStatus("success");
      return;
    }
    if (captcha && !token) {
      setError(stalled ? `The security check didn't load. Please call ${site.phone} and we'll take your details by phone.` : "Please wait a moment for the security check to finish.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          eventDate: data.get("eventDate"),
          venue: data.get("venue"),
          service: data.get("service"),
          message: data.get("message"),
          website: data.get("website"),
          token: token ?? "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Something went wrong. Please call us.");
        setStatus("error");
        return;
      }
      setStatus("success");
      trackFormSubmission("quote_form");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setError(`Network error. Please call ${site.phone}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Request Received</h3>
        <p className="text-[var(--muted)]">
          We&apos;ll check availability and get back to you within{" "}
          <strong className="text-[var(--foreground)]">{site.responseTime}</strong>. Keep an eye on your inbox, or call{" "}
          <a href={site.phoneHref} className="text-[var(--accent)] underline">{site.phone}</a> if it&apos;s urgent.
        </p>
      </div>
    );
  }

  return (
    <div>
      {heading && <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">{heading}</h3>}
      <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={() => setEngaged(true)} className="space-y-4">
        <input type="text" name="website" autoComplete="off" className="absolute opacity-0 pointer-events-none h-0 w-0" tabIndex={-1} aria-hidden="true" />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="qf-name" className="sr-only">Your name</label>
            <input id="qf-name" type="text" name="name" placeholder="Your Name" required autoComplete="name" className="form-input min-h-[44px] w-full" />
          </div>
          <div>
            <label htmlFor="qf-email" className="sr-only">Email address</label>
            <input id="qf-email" type="email" name="email" placeholder="Email" required autoComplete="email" inputMode="email" className="form-input min-h-[44px] w-full" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="qf-phone" className="sr-only">Phone number</label>
            <input id="qf-phone" type="tel" name="phone" placeholder="Phone" required autoComplete="tel" inputMode="tel" className="form-input min-h-[44px] w-full" />
          </div>
          <div>
            <label htmlFor="qf-eventDate" className="sr-only">Event date</label>
            <input id="qf-eventDate" type="date" name="eventDate" aria-label="Event date" className="form-input min-h-[44px] w-full" />
          </div>
        </div>

        <div>
          <label htmlFor="qf-service" className="sr-only">What are we lighting?</label>
          <select id="qf-service" name="service" required defaultValue={defaultService} aria-label="What are we lighting?" className="form-input min-h-[44px] w-full">
            <option value="" disabled>What are we lighting?</option>
            {EVENT_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            {defaultService && !EVENT_OPTIONS.includes(defaultService) && <option value={defaultService}>{defaultService}</option>}
          </select>
        </div>

        {!compact && (
          <div>
            <label htmlFor="qf-venue" className="sr-only">Venue or address (if known)</label>
            <input id="qf-venue" type="text" name="venue" placeholder="Venue or address (if known)" autoComplete="off" className="form-input min-h-[44px] w-full" />
          </div>
        )}

        <div>
          <label htmlFor="qf-message" className="sr-only">Tell us about your event</label>
          <textarea id="qf-message" name="message" placeholder="Guest count, indoor or outdoor, colours, the moments you want lit..." rows={compact ? 3 : 4} className="form-input min-h-[88px] w-full" />
        </div>

        {captcha && engaged && (
          <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} onError={() => setStalled(true)} options={{ theme: "dark", size: "flexible" }} />
        )}

        {status === "error" && <p className="rounded-md border border-red-500/30 bg-red-950/40 px-4 py-2.5 text-sm text-red-300">{error}</p>}

        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full justify-center min-h-[48px] text-base">
          {status === "sending" ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            "Get My Quote"
          )}
        </button>

        {showPromise && (
          <p className="text-xs text-[var(--muted)]/60 text-center">
            No spam, ever. We respond within {site.responseTime}. Prefer to talk? Call{" "}
            <a href={site.phoneHref} className="text-[var(--accent)]">{site.phone}</a>.
          </p>
        )}
      </form>
    </div>
  );
}
