"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { SERVICES } from "@/lib/data";

type State = "idle" | "sending" | "done" | "error";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const honey = useRef<HTMLInputElement>(null);
  const done = useRef<HTMLDivElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honey.current?.value) return;
    if (!token) { setErr("Please complete the quick security check."); return; }
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending"); setErr("");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, token }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState("done"); form.reset();
      setTimeout(() => done.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } catch (e: unknown) {
      setState("error"); setErr(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div ref={done} className="rounded-xl border border-[var(--green)]/30 bg-[var(--green-tint)] p-7 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--green)] mx-auto flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="h text-xl text-[var(--ink)] mb-1.5">Request received!</h3>
        <p className="text-sm muted">Reply to your confirmation email with <strong>a few photos of your deck</strong> and we&apos;ll send a real, detailed quote within <strong>2 business days</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <input ref={honey} type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label htmlFor="name" className="flabel">Name</label><input id="name" name="name" required autoComplete="name" placeholder="Jane Smith" className="field" /></div>
        <div><label htmlFor="phone" className="flabel">Phone</label><input id="phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="519-555-0123" className="field" /></div>
      </div>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label htmlFor="email" className="flabel">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@email.com" className="field" /></div>
        <div><label htmlFor="city" className="flabel">City</label><input id="city" name="city" required autoComplete="address-level2" placeholder="London, Woodstock…" className="field" /></div>
      </div>
      <div>
        <label htmlFor="service" className="flabel">What do you need?</label>
        <select id="service" name="service" required defaultValue="" className="field">
          <option value="" disabled>Choose a service…</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          <option value="Not sure — need advice">Not sure — need advice</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="flabel">Tell us about your deck <span className="text-[var(--ink-3)] font-normal">(optional)</span></label>
        <textarea id="message" name="message" rows={3} placeholder="Approx. size, wood type, condition, timeline…" className="field resize-none" />
      </div>
      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onSuccess={setToken} options={{ theme: "light" }} />
      {err && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">{err}</p>}
      <button type="submit" disabled={state === "sending"} className="btn btn-green w-full btn-lg">
        {state === "sending" ? (
          <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending…</>
        ) : (
          <>Get My Free Photo Quote <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>
        )}
      </button>
      <p className="text-xs text-center text-[var(--ink-3)]">No obligation · We reply within 2 business days · No spam, ever.</p>
    </form>
  );
}
