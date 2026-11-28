"use client";

import { useRef, useState, useTransition } from "react";
import { TrackColourConfirm, needsTrackColourCheck } from "@/components/track-colour-confirm";
import type { ColourSourceLine } from "@/lib/orders/track-colour";
import { formatCad } from "@/lib/utils";

/** Pay button (and the "stop reminders" button) on the saved-order page. */
export function ResumeCheckout({
  orderId,
  token,
  total,
  lines,
  stopMode,
  phone
}: {
  orderId: string;
  token: string;
  total: number;
  lines: ColourSourceLine[];
  stopMode: boolean;
  phone: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [stopped, setStopped] = useState(false);
  const [colourOk, setColourOk] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const needsColour = needsTrackColourCheck(lines);

  function post(action: "pay" | "stop") {
    setError(null);
    if (action === "pay" && needsColour && !colourOk) {
      setError("Please confirm your track colour before paying.");
      document.getElementById("track-colour")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ o: orderId, k: token, action, trackColourConfirmed: colourOk })
        });
        const json = (await res.json().catch(() => ({}))) as { url?: string; stopped?: boolean; error?: string };
        if (json.url) {
          window.location.href = json.url;
          return;
        }
        if (json.stopped) {
          setStopped(true);
          return;
        }
        setError(json.error ?? "Something went wrong. Please try again or call us.");
      } catch {
        setError("Network problem. Please check your connection and try again.");
      }
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    });
  }

  return (
    <div className="mt-4 space-y-4">
      {stopMode && (
        <div className="surface p-5 text-sm" aria-live="polite">
          {stopped ? (
            <p className="font-medium text-[var(--color-text)]">Done. We won&rsquo;t email you checkout reminders again.</p>
          ) : (
            <>
              <p className="text-[var(--color-text-soft)]">We only send one reminder per order. To make sure you never get another:</p>
              <button type="button" onClick={() => post("stop")} disabled={pending} className="btn-secondary mt-3 disabled:opacity-50">
                {pending ? "Processing…" : "Don't send me checkout reminders"}
              </button>
            </>
          )}
        </div>
      )}

      <TrackColourConfirm lines={lines} checked={colourOk} onChange={setColourOk} changeHref={null} phone={phone} />

      <button
        type="button"
        onClick={() => post("pay")}
        disabled={pending}
        className="btn-primary min-h-[48px] w-full text-base disabled:opacity-50"
      >
        {pending ? "Processing…" : `Continue to secure payment · ${formatCad(total)}`}
      </button>

      {error && (
        <p ref={errorRef} role="alert" className="rounded-[10px] bg-[var(--color-red-soft)] px-3 py-2 text-sm text-[var(--color-red)]">
          {error}
        </p>
      )}
    </div>
  );
}
