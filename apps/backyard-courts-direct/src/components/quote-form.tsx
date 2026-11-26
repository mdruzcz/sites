"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";

interface Props {
  kitOptions: string[];
  sportOptions: string[];
  responseTime: string;
  phone: string | null;
  phoneHref: string | null;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const BASES = ["Existing concrete pad", "Existing asphalt", "Old tennis or sport court", "Nothing yet, planning a new pad", "Not sure"];

export function QuoteForm({ kitOptions, sportOptions, responseTime, phone, phoneHref }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [prefill, setPrefill] = useState({ kit: "", colours: "", sport: "", space: "" });
  const successRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);

  // Kit and colours arrive in the URL from a kit page. Read them on the client
  // so the contact page itself can stay static.
  useEffect(() => {
    openedAt.current = Date.now();
    const q = new URLSearchParams(window.location.search);
    setPrefill({ kit: q.get("kit") ?? "", colours: q.get("colours") ?? "", sport: q.get("sport") ?? "", space: q.get("space") ?? "" });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token, formId: "quote", elapsedMs: Date.now() - openedAt.current }),
      });
      if (!res.ok) {
        const out = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(out.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      trackFormSubmission("quote_form", { kit: data.kit });
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="card border-2 border-[var(--accent)] p-8 text-center" role="status">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-2xl font-black text-white" aria-hidden>
          ✓
        </div>
        <h3 className="h2 !text-2xl">Thanks, we have your request.</h3>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
          We will reply within <strong className="text-[var(--ink)]">{responseTime}</strong> with a delivered price and a layout drawing for your court.
          {phone && phoneHref && (
            <>
              {" "}
              Need it sooner? Call{" "}
              <a href={phoneHref} className="font-bold text-[var(--accent-ink)]">
                {phone}
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }

  // A kit page sends "Name (CODE)"; the options also carry the price, so match on the code.
  const code = prefill.kit.match(/\(([A-Z]+-\d+)\)/)?.[1];
  const kitMatch = code ? kitOptions.find((k) => k.includes(`(${code})`)) : undefined;
  const kitValue = kitMatch ?? prefill.kit;
  const kitKnown = prefill.kit && !kitMatch;

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-5 md:p-8" key={`${prefill.kit}|${prefill.sport}|${prefill.space}`}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="label">Your name *</label>
          <input id="q-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="q-email" className="label">Email *</label>
          <input id="q-email" name="email" type="email" required autoComplete="email" inputMode="email" className="field" />
        </div>
        <div>
          <label htmlFor="q-phone" className="label">Phone *</label>
          <input id="q-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
        </div>
        <div>
          <label htmlFor="q-postal" className="label">Postal code (for shipping) *</label>
          <input id="q-postal" name="postalCode" required autoComplete="postal-code" className="field uppercase" placeholder="N6A 1A1" />
        </div>
        <div>
          <label htmlFor="q-sport" className="label">Sport</label>
          <select id="q-sport" name="sport" className="field" defaultValue={prefill.sport}>
            <option value="">Choose one</option>
            {sportOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-kit" className="label">Kit</label>
          <select id="q-kit" name="kit" className="field" defaultValue={kitValue}>
            <option value="">Not sure yet, help me choose</option>
            {kitKnown && <option>{prefill.kit}</option>}
            {kitOptions.map((k) => (
              <option key={k}>{k}</option>
            ))}
            <option>Custom size</option>
          </select>
        </div>
        <div>
          <label htmlFor="q-space" className="label">Space you have (ft)</label>
          <input id="q-space" name="space" className="field" defaultValue={prefill.space} placeholder="e.g. 32 x 55" />
        </div>
        <div>
          <label htmlFor="q-base" className="label">What will it sit on?</label>
          <select id="q-base" name="base" className="field" defaultValue="">
            <option value="">Choose one</option>
            {BASES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="q-colours" className="label">Colours</label>
        <input id="q-colours" name="colours" className="field" defaultValue={prefill.colours} placeholder="e.g. blue court, grey border" />
      </div>
      <div>
        <label htmlFor="q-message" className="label">Anything else we should know?</label>
        <textarea id="q-message" name="message" rows={4} className="field" placeholder="Extra game lines, a hoop you already own, delivery access, timing" />
      </div>

      {SITE_KEY && (
        <Turnstile siteKey={SITE_KEY} options={{ theme: "light", size: "flexible" }} onSuccess={setToken} onExpire={() => setToken("")} onError={() => setToken("")} />
      )}

      {status === "error" && (
        <p role="alert" className="rounded-[12px] bg-red-50 p-3 text-sm font-bold text-red-800">
          {error}
        </p>
      )}

      {/* Never disabled while waiting on the captcha: a stalled widget must not trap the visitor. */}
      <button type="submit" disabled={status === "loading"} className="btn btn-cta w-full">
        {status === "loading" ? "Processing..." : "Request my delivered price"} {status !== "loading" && <span aria-hidden>→</span>}
      </button>
      <p className="text-center text-xs text-[var(--muted)]">No payment and no obligation. We reply within {responseTime}.</p>
    </form>
  );
}
