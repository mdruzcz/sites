"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";

export function ReviewActions({
  propertyId,
  packageStatus
}: {
  propertyId: string;
  packageStatus: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function act(action: string, payload: Record<string, unknown> = {}) {
    setBusy(action);
    setError(null);
    try {
      const res = await fetch(`/api/admin/review/${propertyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload })
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setError(d.error ?? "That did not work.");
      } else {
        setRejecting(false);
        router.refresh();
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {packageStatus !== "active" ? (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => act("approve")}
            disabled={busy !== null}
          >
            <Icon name="check" size={15} strokeWidth={2.4} />
            {busy === "approve" ? "Publishing…" : "Approve and publish for 12 months"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => act("unpublish")}
            disabled={busy !== null}
          >
            {busy === "unpublish" ? "Working…" : "Unpublish"}
          </button>
        )}

        {packageStatus === "submitted" ? (
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => act("mark_paid")}
            disabled={busy !== null}
          >
            {busy === "mark_paid" ? "Working…" : "Mark invoice paid"}
          </button>
        ) : null}

        <button
          type="button"
          className="btn btn-quiet btn-sm"
          onClick={() => setRejecting((v) => !v)}
          disabled={busy !== null}
          style={{ color: "var(--danger)" }}
        >
          Send back for changes
        </button>
      </div>

      {rejecting ? (
        <div className="mt-3">
          <label className="field-label" htmlFor={`note-${propertyId}`}>
            What does the owner need to change? They see this verbatim.
          </label>
          <textarea
            id={`note-${propertyId}`}
            className="field"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="The photographs are too dark to make out the rooms — could you reshoot in daylight?"
          />
          <button
            type="button"
            className="btn btn-outline btn-sm mt-2"
            onClick={() => act("reject", { note })}
            disabled={busy !== null || !note.trim()}
          >
            {busy === "reject" ? "Sending…" : "Send back"}
          </button>
        </div>
      ) : null}

      {error ? (
        <p
          className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[13px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
