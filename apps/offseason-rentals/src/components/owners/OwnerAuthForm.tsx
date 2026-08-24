"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";

export function OwnerAuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  // A tier chosen on the pricing page rides through signup so the dashboard
  // can pre-select it rather than asking twice.
  const tier = params.get("tier");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch(`/api/owners/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        needsConfirmation?: boolean;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }

      // Some Supabase projects require the email to be confirmed before a
      // session exists. Say so plainly rather than bouncing to a dashboard
      // that would immediately redirect back here.
      if (data.needsConfirmation) {
        setConfirmSent(true);
        setBusy(false);
        return;
      }

      router.replace(tier ? `/owners/dashboard?tier=${tier}` : "/owners/dashboard");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setBusy(false);
    }
  }

  if (confirmSent) {
    return (
      <div
        className="card card-pad text-center"
        style={{ borderColor: "var(--ok)", background: "var(--ok-soft)" }}
        role="status"
      >
        <span
          className="mx-auto grid place-items-center rounded-full"
          style={{ width: 48, height: 48, background: "var(--ok)", color: "#fff" }}
        >
          <Icon name="mail" size={24} strokeWidth={2.2} />
        </span>
        <h2 className="mt-4 text-[18px] font-bold">Check your email</h2>
        <p className="mt-2 text-[15px] text-[var(--ink-soft)]">
          We have sent a confirmation link. Click it and you will be able to sign in and start
          building your listing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card card-pad" style={{ boxShadow: "var(--shadow-lg)" }} noValidate>
      <h2 className="text-[20px] font-bold">
        {mode === "login" ? "Sign in" : "Create your account"}
      </h2>
      <p className="mt-1 mb-5 text-[14px] text-[var(--muted)]">
        {mode === "login"
          ? "Welcome back."
          : "Free. Nothing is charged until you submit a listing."}
      </p>

      {mode === "register" ? (
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="oa-name">
              Your name <span className="text-[var(--accent)]">*</span>
            </label>
            <input id="oa-name" name="name" className="field" autoComplete="name" required placeholder="Dana Whitfield" />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="oa-phone">
              Phone
            </label>
            <input
              id="oa-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field"
              placeholder="519-555-0134"
            />
          </div>
        </div>
      ) : null}

      <div className="mb-4">
        <label className="field-label" htmlFor="oa-email">
          Email <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="oa-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="field"
          required
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="oa-password">
          Password <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="oa-password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="field"
          required
          minLength={mode === "register" ? 8 : undefined}
          placeholder={mode === "register" ? "At least 8 characters" : ""}
        />
      </div>

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
        {busy ? "Just a moment…" : mode === "login" ? "Sign in" : "Create account"}
      </button>

      {mode === "register" ? (
        <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
          By creating an account you agree to our{" "}
          <a href="/terms-of-service" className="underline">
            terms
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline">
            privacy policy
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
