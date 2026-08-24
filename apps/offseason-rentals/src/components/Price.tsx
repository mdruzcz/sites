import type { Rate } from "@/lib/format";

/**
 * The price, with the list figure struck through whenever an owner is running
 * an offer.
 *
 * One component for the card, the rate panel and the mobile bar so a discount
 * can never render three different ways. The discounted number carries the
 * accent colour — it is the only place on a listing that colour is used for
 * information rather than for a control, which is what makes it read as a
 * saving rather than as decoration.
 */
export function Price({
  rate,
  note,
  size = "md",
  align = "left"
}: {
  rate: Rate | null;
  note?: string | null;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
}) {
  const scale = {
    sm: { amount: 16, unit: 13, was: 13, note: 11 },
    md: { amount: 22, unit: 16, was: 15, note: 12 },
    lg: { amount: 30, unit: 17, was: 18, note: 13 }
  }[size];

  if (!rate) {
    return <p className="font-bold" style={{ fontSize: scale.amount }}>Rate on request</p>;
  }

  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p className="flex flex-wrap items-baseline gap-x-2" style={{ justifyContent: align === "right" ? "flex-end" : undefined }}>
        {rate.originalDisplay ? (
          <span
            className="line-through"
            style={{ fontSize: scale.was, color: "var(--muted)", textDecorationThickness: "1.5px" }}
          >
            {rate.originalDisplay}
          </span>
        ) : null}

        <span
          className="font-bold"
          style={{
            fontSize: scale.amount,
            // Only colour the number when it is a genuine reduction.
            color: rate.originalDisplay ? "var(--accent)" : "var(--ink)"
          }}
        >
          {rate.display}
        </span>

        <span style={{ fontSize: scale.unit, color: "var(--muted)" }}>/ {rate.unit}</span>
      </p>

      {rate.originalDisplay ? (
        <p className="mt-1 flex flex-wrap items-center gap-x-2" style={{ justifyContent: align === "right" ? "flex-end" : undefined }}>
          <span
            className="pill"
            style={{ background: "var(--accent-soft)", color: "var(--accent-dark)", fontSize: scale.note, padding: "3px 8px" }}
          >
            Save {formatSaving(rate)}
          </span>
          {note ? <span style={{ fontSize: scale.note, color: "var(--muted)" }}>{note}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

function formatSaving(rate: Rate): string {
  if (!rate.original) return "";
  const off = rate.original - rate.amount;
  const pct = Math.round((off / rate.original) * 100);
  const money = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(off);
  return `${money} (${pct}%)`;
}
