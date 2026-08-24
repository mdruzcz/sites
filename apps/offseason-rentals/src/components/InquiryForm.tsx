"use client";

import { useRef, useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { trackConversion, GTM_EVENTS } from "@/lib/gtm";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function InquiryForm({
  propertySlug,
  propertyName,
  compact = false
}: {
  propertySlug?: string;
  propertyName?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setError(null);
    setState("sending");

    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      arrival: String(fd.get("arrival") ?? ""),
      duration: String(fd.get("duration") ?? ""),
      guests: String(fd.get("guests") ?? ""),
      reason: String(fd.get("reason") ?? ""),
      message: String(fd.get("message") ?? ""),
      propertySlug: propertySlug ?? "",
      propertyName: propertyName ?? "",
      website: String(fd.get("website") ?? ""),
      turnstileToken: token
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please call us instead.");
        setState("idle");
        return;
      }
      trackConversion(GTM_EVENTS.inquiry, { property: propertySlug ?? "general" });
      setState("sent");
      // Give React a frame to paint the success panel before scrolling to it.
      requestAnimationFrame(() =>
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    } catch {
      setError("We could not reach the server. Please call us instead.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={successRef}
        className="card card-pad text-center"
        style={{ borderColor: "var(--ok)", background: "var(--ok-soft)" }}
        role="status"
        aria-live="polite"
      >
        <span
          className="mx-auto grid place-items-center rounded-full"
          style={{ width: 48, height: 48, background: "var(--ok)", color: "#fff" }}
        >
          <Icon name="check" size={24} strokeWidth={2.4} />
        </span>
        <h3 className="mt-4 text-[18px] font-bold">Enquiry sent</h3>
        <p className="mt-2 text-[15px] text-[var(--ink-soft)]">
          We will come back to you within {site.responseTime} with availability
          {propertyName ? ` for ${propertyName}` : ""}, the total for your dates, and what the owner
          needs to hold it.
        </p>
        <p className="mt-4 text-[14px] text-[var(--muted)]">
          In a hurry?{" "}
          <a href={site.phoneHref} className="font-semibold text-[var(--ink)] underline">
            Call {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const busy = state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="field-label" htmlFor="name">
            Your name <span className="text-[var(--accent)]">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className="field" placeholder="Jordan Fraser" />
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            className="field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="phone">
            Phone <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className="field"
            placeholder="519-555-0134"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="arrival">
            Ideal arrival
          </label>
          <input id="arrival" name="arrival" type="month" className="field" />
        </div>

        <div>
          <label className="field-label" htmlFor="duration">
            How long
          </label>
          <select id="duration" name="duration" className="field" defaultValue="">
            <option value="">Select…</option>
            <option>1 month</option>
            <option>2 months</option>
            <option>3 months</option>
            <option>4–6 months</option>
            <option>The full off season</option>
            <option>Not sure yet</option>
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="guests">
            Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            className="field"
            placeholder="2"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="reason">
            What brings you here
          </label>
          <select id="reason" name="reason" className="field" defaultValue="">
            <option value="">Select…</option>
            <option>Work contract or placement</option>
            <option>Healthcare or travel nursing</option>
            <option>Trades or project crew</option>
            <option>Renovation or insurance stay</option>
            <option>Between homes</option>
            <option>Remote work</option>
            <option>Trying the area before buying</option>
            <option>Quiet off-season getaway</option>
            <option>Something else</option>
          </select>
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="field-label" htmlFor="message">
            Anything we should know
          </label>
          <textarea
            id="message"
            name="message"
            className="field"
            rows={4}
            placeholder="Dates, pets, parking for a work truck — whatever matters."
          />
        </div>
      </div>

      {SITE_KEY ? (
        <div className="mt-4">
          <Turnstile siteKey={SITE_KEY} onSuccess={setToken} options={{ theme: "light", size: "flexible" }} />
        </div>
      ) : null}

      {error ? (
        <p
          className="mt-4 rounded-[var(--r-sm)] px-3 py-2 text-[14px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full mt-5" disabled={busy} aria-busy={busy}>
        {busy ? (
          <>
            <span
              className="inline-block rounded-full border-2 border-white/40 border-t-white animate-spin"
              style={{ width: 16, height: 16 }}
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          site.cta.renterLong
        )}
      </button>

      <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
        No payment now. We reply within {site.responseTime}.
      </p>
    </form>
  );
}
