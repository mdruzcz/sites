"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { pricing } from "@/lib/pricing";

const PACKAGES = [...pricing.packages.map((p) => p.fullName), "Care / seasonal service", "Installation only", "Not sure yet"];
const VENUES = [
  "Commercial space",
  "Retail plaza",
  "Restaurant / patio",
  "Hotel",
  "Business Improvement Area (BIA / BID / BIZ / SDC)",
  "Municipality",
  "Event venue",
  "Property management",
  "Other",
];

export type QuotePrefill = {
  budget?: number;
  layout?: string;
  layoutText?: string;
  province?: string;
  city?: string;
  estimate?: number;
  message?: string;
};

type Props = {
  defaultPackage?: string;
  prefill?: QuotePrefill;
  variant?: "card" | "inline";
};

export function QuoteForm({ defaultPackage, prefill, variant = "card" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setErrorMsg("Please wait for the spam check to finish.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.token = token;

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        if (typeof window !== "undefined") {
          const w = window as unknown as { dataLayer?: unknown[] };
          w.dataLayer?.push({ event: "quote_submitted", package: data.package, budget: data.budget || undefined });
        }
        requestAnimationFrame(() => document.getElementById("quote-success")?.scrollIntoView({ behavior: "smooth", block: "center" }));
      } else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(body.error || "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id="quote-success" className={`${variant === "card" ? "card" : ""} p-8 text-center`}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, rgba(255, 154, 60, 0.2), rgba(76, 201, 240, 0.2))",
            border: "1px solid rgba(255, 154, 60, 0.4)",
          }}
        >
          <svg className="w-8 h-8 text-resonant" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quote request sent</h3>
        <p className="text-muted-strong mb-1">We reply within {site.responseTime} with a recommendation and an itemised quote in CAD.</p>
        <p className="text-muted text-sm">
          Need it sooner? Call{" "}
          <a href={site.phoneHref} className="text-resonant font-semibold hover:underline">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface px-3 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-resonant focus:border-resonant transition-colors min-h-[44px]";
  const labelClass = "block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider";
  const hasPlan = !!(prefill?.budget || prefill?.layoutText);

  return (
    <form onSubmit={handleSubmit} className={`${variant === "card" ? "card card-glow" : ""} p-6 sm:p-7 space-y-4`}>
      <div>
        <h2 className="text-xl font-bold mb-1 text-white">Request a quote</h2>
        <p className="text-sm text-muted">No obligation. We reply within {site.responseTime}. Prices in CAD.</p>
      </div>

      {hasPlan && (
        <div className="rounded-xl border border-resonant/40 bg-resonant/10 p-4 text-sm">
          <p className="text-[11px] uppercase tracking-widest text-resonant font-bold mb-1">From the budget planner</p>
          {prefill?.budget ? <p className="text-white">Budget: ${prefill.budget.toLocaleString("en-CA")} (installed, before tax)</p> : null}
          {prefill?.layoutText ? <p className="text-muted-strong">Props: {prefill.layoutText}</p> : null}
          {prefill?.estimate ? <p className="text-muted-strong">Planner estimate: ${prefill.estimate.toLocaleString("en-CA")}</p> : null}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="budget" value={prefill?.budget ? String(prefill.budget) : ""} />
      <input type="hidden" name="layout" value={prefill?.layoutText ?? ""} />
      <input type="hidden" name="estimate" value={prefill?.estimate ? String(prefill.estimate) : ""} />
      <input type="hidden" name="province" value={prefill?.province ?? ""} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="organization" className={labelClass}>Business / organization</label>
          <input id="organization" name="organization" type="text" autoComplete="organization" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className={labelClass}>Project city</label>
          <input id="city" name="city" type="text" defaultValue={prefill?.city ?? ""} placeholder="e.g. Saskatoon, SK" autoComplete="address-level2" className={inputClass} />
        </div>
        <div>
          <label htmlFor="venue" className={labelClass}>Type of space *</label>
          <select id="venue" name="venue" required defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {VENUES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="package" className={labelClass}>Package of interest *</label>
        <select id="package" name="package" required defaultValue={defaultPackage || ""} className={inputClass}>
          <option value="">Select a package…</option>
          {PACKAGES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Project details</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={prefill?.message ?? ""}
          placeholder="Frontage length, tree heights, number of buildings, target dates, music source, anything helpful."
          className={`${inputClass} resize-y`}
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
        onExpire={() => setToken(null)}
        options={{ theme: "dark" }}
      />

      <button type="submit" disabled={status === "sending" || !token} className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "sending" ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
            Processing…
          </>
        ) : (
          <>
            Request a Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-center text-muted">No spam. We only contact you about your quote.</p>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {errorMsg || `Something went wrong. Please try again or call ${site.phone}.`}
        </p>
      )}
    </form>
  );
}
