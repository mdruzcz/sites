"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { submitContactMessage } from "@/lib/actions/quote";
import { Icon } from "@/components/icons";
import { SITE_EMAIL } from "@/lib/site";

const Turnstile = dynamic(() => import("@marsidev/react-turnstile").then((m) => m.Turnstile), { ssr: false });

const TOPICS = ["Product or stock question", "Pricing for a commercial order", "Municipality, BIA or tender", "An order or quote I already have", "Warranty or replacement parts", "Something else"];

export function ContactForm() {
  const [pending, start] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const captchaOn = !!siteKey && !siteKey.startsWith("1x000");

  useEffect(() => {
    if (!captchaOn || !showCaptcha || token) {
      setCaptchaFailed(false);
      return;
    }
    const id = setTimeout(() => setCaptchaFailed(true), 15000);
    return () => clearTimeout(id);
  }, [captchaOn, showCaptcha, token]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      try {
        const res = await submitContactMessage({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          topic: String(fd.get("topic") ?? ""),
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
          turnstile_token: token || null
        });
        if (!res.ok) {
          setState("err");
          setError(res.error);
          return;
        }
        setState("ok");
        setTimeout(() => doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      } catch {
        setState("err");
        setError(`We couldn't reach the server. Please try again, or email ${SITE_EMAIL}.`);
      }
    });
  }

  if (state === "ok") {
    return (
      <div ref={doneRef} className="rounded-3xl border border-[var(--color-brand)]/20 bg-[var(--color-brand-soft)] p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-white">
          <Icon.check size={22} />
        </span>
        <h3 className="font-display mt-4 text-2xl text-[var(--color-brand-dark)]">Message sent</h3>
        <p className="mt-2 text-[var(--color-text-soft)]">We reply by email <strong>within one business day</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setShowCaptcha(true)} className="card space-y-4 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="label">Name *</span>
          <input name="name" required autoComplete="name" className="input" />
        </label>
        <label className="block">
          <span className="label">Email *</span>
          <input name="email" type="email" required autoComplete="email" inputMode="email" className="input" />
        </label>
        <label className="block">
          <span className="label">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className="input" />
        </label>
        <label className="block">
          <span className="label">Topic</span>
          <select name="topic" defaultValue="" className="input">
            <option value="" disabled>Select…</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="label">Message *</span>
        <textarea name="message" rows={5} required className="input" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {captchaOn && showCaptcha && (
        <div>
          <Turnstile siteKey={siteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ appearance: "interaction-only" }} />
          {captchaFailed && !token && <p className="mt-2 text-xs text-[var(--color-muted)]">Spam check is slow to load. You can still submit — if it fails, email {SITE_EMAIL}.</p>}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={pending} className="btn-accent min-w-[180px] disabled:opacity-60">
          {pending ? "Sending…" : "Send message"} {!pending && <Icon.arrow size={16} />}
        </button>
        <p className="text-xs text-[var(--color-muted)]">Reply within one business day.</p>
      </div>
      {state === "err" && <p className="rounded-xl bg-[var(--color-berry-soft)] px-4 py-3 text-sm text-[var(--color-berry-dark)]">{error}</p>}
    </form>
  );
}
