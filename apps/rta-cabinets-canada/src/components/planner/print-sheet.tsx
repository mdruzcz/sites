"use client";

// Printable design sheet (only visible when printing — see .print-show in globals.css).

import { useMemo } from "react";
import { usePlanner } from "./planner-context";
import { FloorView } from "./floor-view";
import { WallView } from "./wall-view";
import { reviewDesign } from "@/lib/planner/review";
import { surfacesWithUnits } from "@/lib/planner/attach";
import { WALL_NAMES, formatFeet, formatInches, type WallId } from "@/lib/planner/types";
import { formatCad } from "@/lib/planner-utils";

export function PrintSheet() {
  const { design, ui } = usePlanner();
  const review = useMemo(() => reviewDesign(design), [design]);
  const surfaces = useMemo(() => surfacesWithUnits(design), [design]);
  const addonOn = (sku: string, def: boolean) => ui.addons[sku] ?? def;
  const addons = review.addons.filter((a) => addonOn(a.sku, a.defaultOn));
  const addonsTotal = addons.reduce((s, a) => s + a.total, 0);

  return (
    <div className="print-show print-sheet">
      <div className="print-area">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid #1c1917", paddingBottom: 8 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a3412", margin: 0 }}>RTA Cabinets Canada · Kitchen design sheet</p>
            <h1 style={{ fontSize: 24, margin: "4px 0 0 0" }}>{design.name}</h1>
          </div>
          <p style={{ fontSize: 11, color: "#57534e", margin: 0 }}>
            rtacabinetscanada.ca · {new Date(design.updatedAt).toLocaleDateString("en-CA")}
          </p>
        </div>
        <p style={{ fontSize: 12, marginTop: 8 }}>
          Room {formatFeet(design.room.width)} × {formatFeet(design.room.depth)} ({formatInches(design.room.width)} × {formatInches(design.room.depth)}), ceiling {formatInches(design.room.ceiling)}
          {design.room.openWalls.length ? ` · open on: ${design.room.openWalls.map((w) => WALL_NAMES[w as WallId].toLowerCase()).join(", ")}` : ""}
          {design.island.enabled ? " · island" : ""} · {review.stats.units} cabinets · estimated {formatCad(review.subtotal)}
        </p>
      </div>

      <div className="print-area" style={{ display: "grid", gridTemplateColumns: ui.snapshot ? "1fr 1fr" : "1fr", gap: 12, marginTop: 12 }}>
        <figure style={{ margin: 0, border: "1px solid #e7e2da" }}>
          <figcaption style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", padding: "4px 8px", borderBottom: "1px solid #e7e2da" }}>Floor plan</figcaption>
          <FloorView design={design} readonly className="w-full" ariaLabel="Floor plan" />
        </figure>
        {ui.snapshot && (
          <figure style={{ margin: 0, border: "1px solid #e7e2da" }}>
            <figcaption style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", padding: "4px 8px", borderBottom: "1px solid #e7e2da" }}>3D view</figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ui.snapshot} alt="3D view of the kitchen design" style={{ width: "100%", display: "block" }} />
          </figure>
        )}
      </div>

      {surfaces.map((s) => (
        <figure key={String(s)} className="print-area" style={{ margin: "12px 0 0 0", border: "1px solid #e7e2da" }}>
          <WallView design={design} surface={s} readonly className="w-full" />
        </figure>
      ))}

      <section className="print-area" style={{ marginTop: 14 }}>
        <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Parts list</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ background: "#f5efe6", textAlign: "left" }}>
              <th style={{ padding: "4px 6px" }}>SKU</th>
              <th style={{ padding: "4px 6px" }}>Item</th>
              <th style={{ padding: "4px 6px", textAlign: "center" }}>Qty</th>
              <th style={{ padding: "4px 6px", textAlign: "right" }}>Unit</th>
              <th style={{ padding: "4px 6px", textAlign: "right" }}>Line</th>
            </tr>
          </thead>
          <tbody>
            {review.parts.map((p) => (
              <tr key={p.sku} style={{ borderBottom: "1px solid #e7e2da" }}>
                <td style={{ padding: "4px 6px", fontFamily: "monospace", color: "#9a3412" }}>{p.sku}</td>
                <td style={{ padding: "4px 6px" }}>{p.name}</td>
                <td style={{ padding: "4px 6px", textAlign: "center" }}>{p.qty}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{formatCad(p.unit)}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{formatCad(p.total)}</td>
              </tr>
            ))}
            {addons.map((a) => (
              <tr key={`a-${a.sku}`} style={{ borderBottom: "1px solid #e7e2da", color: "#57534e" }}>
                <td style={{ padding: "4px 6px", fontFamily: "monospace", color: "#9a3412" }}>{a.sku}</td>
                <td style={{ padding: "4px 6px" }}>{a.name} (add-on)</td>
                <td style={{ padding: "4px 6px", textAlign: "center" }}>{a.qty}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{formatCad(a.unit)}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{formatCad(a.total)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} style={{ padding: "6px", textAlign: "right", fontWeight: 600 }}>
                Estimated total{addons.length ? " (incl. add-ons)" : ""}
              </td>
              <td style={{ padding: "6px", textAlign: "right", fontWeight: 600, fontSize: 14 }}>{formatCad(review.subtotal + addonsTotal)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {review.appliances.length > 0 && (
        <section className="print-area" style={{ marginTop: 10, fontSize: 11 }}>
          <strong>Your appliances (not supplied):</strong> {review.appliances.map((a) => `${a.qty} × ${a.name}`).join(", ")}
        </section>
      )}

      {(review.warnings.length > 0 || review.recommendations.length > 0) && (
        <section className="print-area" style={{ marginTop: 14, fontSize: 11 }}>
          <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Design check</h2>
          {review.warnings.map((w) => (
            <p key={w.id} style={{ margin: "2px 0" }}>
              <strong style={{ color: "#b91c1c" }}>Warning:</strong> {w.title} — {w.detail}
            </p>
          ))}
          {review.recommendations.map((r) => (
            <p key={r.id} style={{ margin: "2px 0" }}>
              <strong style={{ color: "#1f5aa6" }}>Tip:</strong> {r.title} — {r.detail}
            </p>
          ))}
        </section>
      )}

      {design.notes.length > 0 && (
        <section className="print-area" style={{ marginTop: 14, fontSize: 11 }}>
          <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Design notes</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {design.notes.map((n) => (
              <li key={n.id}>{n.text}</li>
            ))}
          </ul>
        </section>
      )}

      <p style={{ marginTop: 16, fontSize: 10, color: "#57534e" }}>
        Prices are catalog estimates in CAD before delivery and tax. Quote subject to in-stock confirmation; freight quoted by postal code; lead time 2–3 weeks. Appliances are drawn to standard sizes for layout only — they are not supplied.
      </p>
    </div>
  );
}
