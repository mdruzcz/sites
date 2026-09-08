"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { submitContactMessage } from "@/lib/actions/contact";

const Turnstile = dynamic(() => import("@marsidev/react-turnstile").then((m) => m.Turnstile), { ssr: false });

const TOPICS = [
  "Sizing a permanent lighting kit",
  "Product or stock question",
  "Bulk / installer pricing",
  "Municipality or BIA order",
  "An order I already placed",
  "Something else"
];

export function ContactForm() {
  const [pending, start] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const captchaOn = !!siteKey && !siteKey.startsWith("1x000");

  // Never leave the button disabled forever if the widget stalls or is blocked.
  useEffect(() => {
    if (!captchaOn || token) { setCaptchaFailed(false); return; }
    const id = setTimeout(() => setCaptchaFailed(true), 15000);
    return () => clearTimeout(id);
  }, [captchaOn, token]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      try {
        await submitContactMessage({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          topic: String(fd.get("topic") ?? ""),
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
          turnstile_token: token || null
        });
        setState("ok");
        setTimeout(() => doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      } catch (err) {
        setState("err");
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  }

  const field =
    "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/25";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]";

  if (state === "ok") {
    return (
      <div ref={doneRef} className="rounded-2xl border border-[var(--color-green)]/35 bg-[var(--color-green-soft)] p-8 text-center">
        <div aria-hidden className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-green)] text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 5 5 9-10" /></svg>
        </div>
        <h3 className="font-display mt-4 text-xl text-[var(--color-text)]">Message sent</h3>
        <p className="mt-2 text-sm text-[var(--color-text-soft)]">
          Thanks. We read every message from the London shop and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="hidden" aria-hidden>
        <label htmlFor="hld-website">Website</label>
        <input id="hld-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="hld-name">Name *</label>
          <input id="hld-name" name="name" required autoComplete="name" className={field} placeholder="Jordan Smith" />
        </div>
        <div>
          <label className={label} htmlFor="hld-email">Email *</label>
          <input id="hld-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="hld-phone">Phone</label>
          <input id="hld-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="(519) 555-0100" />
        </div>
        <div>
          <label className={label} htmlFor="hld-topic">What is it about?</label>
          <select id="hld-topic" name="topic" className={field} defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor="hld-message">How can we help? *</label>
        <textarea id="hld-message" name="message" required rows={5} className={`${field} resize-none`} placeholder="Roof perimeter in feet, the product you are after, or your order number." />
      </div>

      {captchaOn && (
        <div className="mt-5">
          <Turnstile
            siteKey={siteKey}
            onSuccess={setToken}
            onError={() => { setToken(""); setCaptchaFailed(true); }}
            onExpire={() => setToken("")}
            options={{ size: "flexible" }}
          />
        </div>
      )}

      {captchaFailed && !token && (
        <p className="mt-4 rounded-xl bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]" role="alert">
          The spam check could not load, usually a browser extension. Reload the page, or email{" "}
          <a className="font-semibold underline" href="mailto:service@masterdecker.com">service@masterdecker.com</a> and we will pick it up.
        </p>
      )}

      {state === "err" && (
        <p className="mt-4 rounded-xl bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={pending || (captchaOn && !token)} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Sending…" : captchaOn && !token ? (captchaFailed ? "Spam check unavailable" : "Checking you are human…") : "Send message"}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
        We reply within one business day, Monday to Friday.
      </p>
    </form>
  );
}
