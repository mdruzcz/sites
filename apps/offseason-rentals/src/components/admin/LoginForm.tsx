"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in.");
        setBusy(false);
        return;
      }
      // replace(), not push() — the login page should not sit in history.
      router.replace(next.startsWith("/") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card card-pad" style={{ boxShadow: "var(--shadow-lg)" }}>
      <h1 className="text-[22px] font-bold">Listing manager</h1>
      <p className="mt-1.5 mb-6 text-[14px] text-[var(--muted)]">
        Sign in to add properties, upload photographs and import listings.
      </p>

      <label className="field-label" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        className={`field ${error ? "field-error" : ""}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
        required
      />

      {error ? (
        <p
          className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[14px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-dark w-full mt-5" disabled={busy} aria-busy={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
