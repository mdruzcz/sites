"use client";

import { useRef, useState, useTransition } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact } from "@/lib/actions/contact";

const PROVINCES = ["ON", "QC", "BC", "AB", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "YT", "NU"];
const TOPICS = ["Help me size a kit", "Question before ordering", "Order or shipping question", "Warranty claim", "Installer program", "Something else"];

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    setState("idle");
    startTransition(async () => {
      try {
        await submitContact({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          province: String(form.get("province") ?? ""),
          topic: String(form.get("topic") ?? ""),
          message: String(form.get("message") ?? ""),
          website: String(form.get("website") ?? ""),
          turnstile_token: token
        });
        setState("ok");
        el.reset();
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      } catch (err) {
        setState("err");
        setMessage((err as Error).message);
      }
    });
  }

  if (state === "ok") {
    return (
      <div ref={successRef} className="card border-[var(--color-green)] bg-[var(--color-green-soft)] p-6">
        <h3 className="font-display text-xl text-[var(--color-green)]">Got it. We'll reply within one business day.</h3>
        <p className="mt-2 text-sm text-[var(--color-text-soft)]">If you sent measurements or a photo, we'll come back with a kit recommendation and a shipping estimate.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setEngaged(true)} className="card grid gap-4 p-6">
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
          <select id="c-province" name="province" className="input" defaultValue="ON">
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
        <textarea id="c-message" name="message" required rows={6} className="input" placeholder="Roofline lengths, soffit colour, a link to a photo, or your question." />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {captcha && engaged && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} options={{ theme: "light" }} />}
      {state === "err" && <p className="rounded-xl bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">{message}</p>}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? "Sending…" : "Send message"}</button>
      <p className="text-xs text-[var(--color-muted)]">We reply within one business day, Monday to Friday, from London, Ontario.</p>
    </form>
  );
}
