"use client";

// "Get exclusive deals" popup: shows once per 30 days after a short delay or on exit intent,
// never on the planner or quote pages, and remembers a dismissal/subscription in localStorage.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { KITCHEN_SALE } from "@/lib/sale";

const KEY = "rta-signup-v1";
const SNOOZE_DAYS = 30;
const DELAY_MS = 9000;

function snoozed(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const { until } = JSON.parse(raw) as { until: number };
    return Date.now() < until;
  } catch {
    return false;
  }
}

function snooze(days = SNOOZE_DAYS, extra: Record<string, unknown> = {}) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ until: Date.now() + days * 864e5, ...extra }));
  } catch {
    /* ignore */
  }
}

export default function EmailSignup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const blocked = pathname.startsWith("/planner") || pathname.startsWith("/request");

  useEffect(() => {
    if (blocked || snoozed()) return;
    let shown = false;
    const show = () => {
      if (shown || snoozed()) return;
      shown = true;
      setOpen(true);
    };
    const t = window.setTimeout(show, DELAY_MS);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [blocked]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    snooze();
    setOpen(false);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), company: fd.get("company"), source: pathname }),
      });
      if (!r.ok) throw new Error("bad");
      setState("done");
      snooze(365, { subscribed: true });
      window.setTimeout(() => setOpen(false), 2500);
    } catch {
      setState("error");
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="signup-title" onClick={close}>
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-accent px-6 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Exclusive deals</p>
          <h2 id="signup-title" className="mt-1 text-2xl font-bold">
            Save on your kitchen
          </h2>
        </div>
        <div className="px-6 py-5">
          {state === "done" ? (
            <p className="text-ink-soft">You&rsquo;re on the list. Watch your inbox for cabinet deals and planning tips.</p>
          ) : (
            <>
              <p className="text-sm text-ink-soft">
                Get early access to overstock sales, new lines like our 30&Prime; wall cabinets, and planning tips. Right now: <strong className="text-red-700">{KITCHEN_SALE.pct}% off every complete kitchen</strong>.
              </p>
              <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="signup-email" className="sr-only">
                  Email address
                </label>
                <input id="signup-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="min-h-[44px] flex-1 rounded-md border border-border px-3" />
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <button type="submit" disabled={state === "sending"} className="min-h-[44px] rounded-md bg-accent px-5 font-medium text-white hover:bg-accent-dark disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Get deals"}
                </button>
              </form>
              {state === "error" && <p className="mt-2 text-sm text-red-700">Something went wrong — please try again.</p>}
              <p className="mt-3 text-[11px] text-ink-soft">
                No spam, unsubscribe any time. See our <a href="/privacy-policy" className="underline">privacy policy</a>.
              </p>
            </>
          )}
          <button type="button" onClick={close} className="mt-3 text-sm text-ink-soft underline underline-offset-2">
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
