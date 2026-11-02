"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { CheckIcon } from "./icons";

const input = "mt-1 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3.5 py-2.5 text-[15px] text-[color:var(--ink-strong)] focus:border-[color:var(--brand-green)] focus:outline-none min-h-[44px]";
const label = "block text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]";

/** Signs up the referrer and hands back a personal link to share. The link carries a code, never their name. */
export function ReferForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [stalled, setStalled] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const ref = useRef<TurnstileInstance | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (token) return;
    const t = setTimeout(() => setStalled(true), 15000);
    return () => clearTimeout(t);
  }, [token]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    if (form.get("website")) return;
    if (!token) { setErrorMsg("Please wait a moment for the security check to finish, or call us."); setStatus("error"); return; }
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          phone: String(form.get("phone") || ""),
          email: String(form.get("email") || ""),
          message: String(form.get("message") || ""),
          propertyType: "Residential",
          service: "Refer a neighbour",
          tag: "REFER-SIGNUP",
          source: "/refer",
          turnstileToken: token,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.code) throw new Error(data.error || "Something went wrong. Please try again or call us.");
      setCode(data.code);
      (window as unknown as { umami?: { track: (n: string) => void } }).umami?.track("referral-signup");
      setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      ref.current?.reset();
      setToken(null);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  }

  if (code) {
    const link = `${site.url}/refer/${code}`;
    const text = `We use ${site.name} for our lights and they do a great job. Use this link and you get ${site.referral.amount} off your install: ${link}`;
    return (
      <div ref={rootRef} className="surface-light card p-6 sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white"><CheckIcon className="h-6 w-6" /></div>
        <h2 className="heading-display mt-4 text-center text-2xl text-[color:var(--ink-strong)]">Your link is ready</h2>
        <p className="mt-2 text-center text-[15px] text-[color:var(--ink-soft)]">Send it to your neighbours. When one of them has us install, you each get {site.referral.amount} off. We have your details on file, and we will text you when it counts.</p>
        <p className="mt-5 break-all rounded-lg bg-[color:var(--bg-cream)] p-3 text-center text-sm font-semibold text-[color:var(--ink-strong)]" data-referral-link>{link}</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <button type="button" className="btn btn-red" onClick={async () => {
            try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
          }}>{copied ? "Copied" : "Copy link"}</button>
          {canShare ? (
            <button type="button" className="btn btn-outline-green" onClick={() => navigator.share({ title: site.name, text }).catch(() => {})}>Share</button>
          ) : (
            <a className="btn btn-outline-green" href={`sms:?&body=${encodeURIComponent(text)}`}>Text it</a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="surface-light card p-6 sm:p-8">
      <h2 className="heading-display text-xl text-[color:var(--ink-strong)]">Get my referral link</h2>
      <p className="mt-1 text-sm text-[color:var(--ink-soft)]">So we know who to credit. We never share your details with your neighbour.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3.5" noValidate>
        <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />
        <div>
          <label htmlFor="refer-name" className={label}>Your name *</label>
          <input id="refer-name" name="name" required autoComplete="name" className={input} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="refer-phone" className={label}>Your phone *</label>
          <input id="refer-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={input} placeholder="(519) 555-0100" />
        </div>
        <div>
          <label htmlFor="refer-email" className={label}>Your email (optional)</label>
          <input id="refer-email" name="email" type="email" autoComplete="email" className={input} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="refer-message" className={label}>Your address, if we lit your home</label>
          <input id="refer-message" name="message" autoComplete="street-address" className={input} />
        </div>
        {siteKey && (
          <div className="min-h-[65px]">
            <Turnstile ref={ref} siteKey={siteKey} options={{ theme: "light", size: "flexible" }} onSuccess={(t) => { setToken(t); setStalled(false); }} onExpire={() => setToken(null)} onError={() => setToken(null)} />
          </div>
        )}
        {stalled && !token && (
          <p className="text-xs text-[color:var(--ink-soft)]">Security check is taking a while. You can also call <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a> and we will set you up.</p>
        )}
        {errorMsg && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>}
        <button type="submit" disabled={status === "submitting"} className="btn btn-red w-full min-h-[48px] disabled:opacity-60">
          {status === "submitting" ? "Processing..." : "Get my link"}
        </button>
        <p className="text-center text-xs text-[color:var(--ink-soft)]">By sending this, you agree we can text you your link and about your referrals. Reply STOP anytime.</p>
      </form>
    </div>
  );
}
