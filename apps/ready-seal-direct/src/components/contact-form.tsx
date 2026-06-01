"use client";

import { useState, useTransition } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact } from "@/lib/actions/contact";

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";
  const isQuote = (defaultSubject ?? "").toLowerCase().includes("shipping");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("idle");
    startTransition(async () => {
      try {
        await submitContact({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? "") || null,
          province: String(form.get("province") ?? "") || null,
          subject: String(form.get("subject") ?? "") || null,
          message: String(form.get("message") ?? ""),
          source: isQuote ? "shipping_quote" : "contact",
          turnstile_token: token
        });
        setState("ok");
        (e.target as HTMLFormElement).reset();
      } catch (err) {
        setState("err");
        setMessage((err as Error).message);
      }
    });
  }

  if (state === "ok") {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6" id="contact-success">
        <h3 className="text-lg font-semibold text-emerald-800">Message sent ✓</h3>
        <p className="mt-1 text-sm text-emerald-900">
          Thanks! We&rsquo;ll get back to you within one business day{isQuote ? " with your shipping quote" : ""}.
        </p>
      </div>
    );
  }

  const PROVINCES = ["", "AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"];

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-lg border border-[var(--color-border)] bg-white p-5">
      <Field label="Name" name="name" required autoComplete="name" />
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" autoComplete="tel" inputMode="tel" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Province</span>
          <select name="province" defaultValue={isQuote ? "" : "ON"} className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm">
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p || "Select…"}</option>
            ))}
          </select>
        </label>
        <Field label="Subject" name="subject" defaultValue={defaultSubject} />
      </div>
      <label className="block">
        <span className="text-xs font-medium text-slate-600">
          {isQuote ? "What would you like to order? (colors, sizes, quantities, delivery address)" : "Message"} *
        </span>
        <textarea name="message" rows={5} required className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm" />
      </label>
      <Turnstile siteKey={siteKey} onSuccess={setToken} />
      <button type="submit" disabled={pending} className="btn-primary mt-2 justify-center disabled:opacity-50">
        {pending ? "Sending…" : isQuote ? "Request shipping quote" : "Send message"}
      </button>
      {state === "err" && <p className="text-sm text-rose-700">{message}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  autoComplete,
  inputMode,
  defaultValue
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}{required && " *"}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm"
      />
    </label>
  );
}
