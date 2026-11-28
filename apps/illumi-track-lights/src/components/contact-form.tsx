"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact } from "@/lib/actions/contact";
import { BRAND } from "@/lib/utils";

const PROVINCES = ["ON", "QC", "BC", "AB", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "YT", "NU"];
const TOPICS = ["Help me size a kit", "Question before ordering", "Order or shipping question", "Warranty claim", "Installer program", "Something else"];

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [captchaSlow, setCaptchaSlow] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");

  // The widget mounts with the form so the token is ready before anyone can
  // submit. If it stalls, say so and offer email rather than silently failing.
  useEffect(() => {
    if (!captcha || token) return;
    const t = setTimeout(() => setCaptchaSlow(true), 12000);
    return () => clearTimeout(t);
  }, [captcha, token]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    setState("idle");
    startTransition(async () => {
      try {
        const res = await submitContact({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          province: String(form.get("province") ?? ""),
          topic: String(form.get("topic") ?? ""),
          message: String(form.get("message") ?? ""),
          website: String(form.get("website") ?? ""),
          turnstile_token: token
        });
        if (!res.ok) {
          setState("err");
          setMessage(res.error);
          return;
        }
        setState("ok");
        el.reset();
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      } catch {
        setState("err");
        setMessage(`We could not reach the server. Check your connection and try again, or email ${BRAND.email}.`);
      }
    });
  }

  if (state === "ok") {
    return (
      <div ref={successRef} role="status" className="scroll-mt-28 border border-[var(--color-green)] border-l-[3px] bg-[var(--color-green-soft)] p-5 md:p-6">
        <h3 className="font-display text-[1.3rem] !text-[var(--color-green)]">Message received. We reply within one business day.</h3>
        <p className="mt-2 text-[0.95rem] text-[var(--color-text-soft)]">
          If you sent measurements or a photo, the reply will say which kit fits. Check your junk folder if nothing has arrived by then.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-[var(--color-border)] p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">Name</label>
          <input id="c-name" name="name" required autoComplete="name" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">Phone (optional)</label>
          <input id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="c-province">Province</label>
          <select id="c-province" name="province" autoComplete="address-level1" className="input" defaultValue="ON">
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="c-topic">What is this about?</label>
        <select id="c-topic" name="topic" className="input" defaultValue={defaultTopic ?? TOPICS[0]}>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" required rows={6} minLength={10} className="input" placeholder="The lengths you want lit, your soffit colour, a link to a photo, or your question." />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {captcha && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} onError={() => setCaptchaSlow(true)} options={{ theme: "light" }} />}
      {captcha && captchaSlow && !token && (
        <p className="text-sm text-[var(--color-text-soft)]">The spam check is taking a while. You can also email <a className="text-link" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>
      )}
      {state === "err" && <p role="alert" className="border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">{message}</p>}
      <button type="submit" disabled={pending} aria-busy={pending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Processing…" : "Send message"}</button>
      <p className="text-sm text-[var(--color-muted)]">We reply within one business day, Monday to Friday, from {BRAND.city}, {BRAND.region}.</p>
    </form>
  );
}
