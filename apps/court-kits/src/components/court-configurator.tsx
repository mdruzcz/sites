"use client";

import Link from "next/link";
import { useState } from "react";
import type { Layout } from "@/lib/content";
import { colourName, defaultColours, tileColours, zoneLabel } from "@/lib/colours";
import { CourtDiagram, type CourtColours } from "./court-diagram";

interface Props {
  layout: Layout;
  w: number;
  d: number;
  kitName: string;
  kitCode: string;
}

/** Kit drawing with live colour swatches. The chosen colours ride along to the quote form. */
export function CourtConfigurator({ layout, w, d, kitName, kitCode }: Props) {
  const [colours, setColours] = useState<CourtColours>(() => defaultColours(layout));
  const parts: { key: keyof CourtColours; label: string }[] = [
    { key: "court", label: "Court" },
    { key: "zone", label: zoneLabel(layout) },
    { key: "border", label: "Border" },
  ];
  const summary = parts.map((p) => `${p.label}: ${colourName(colours[p.key])}`).join(", ");
  const href = `/contact?kit=${encodeURIComponent(`${kitName} (${kitCode})`)}&colours=${encodeURIComponent(summary)}#quote`;

  return (
    <div>
      <div className="card flex items-center justify-center p-4 md:p-8">
        <CourtDiagram
          layout={layout}
          w={w}
          d={d}
          colours={colours}
          title={`Plan view of the ${kitName} in ${summary}`}
          className="h-auto max-h-[26rem] w-full"
        />
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Drawn to scale as an example layout. Each grid square is one foot. Your approved layout plan is the final word on lines and colours.
      </p>

      <div className="mt-6 space-y-5">
        {parts.map((p) => (
          <fieldset key={p.key}>
            <legend className="text-sm font-bold">
              {p.label}: <span className="font-normal text-[var(--muted)]">{colourName(colours[p.key])}</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-1">
              {tileColours.map((c) => {
                const active = colours[p.key] === c.hex;
                return (
                  <button
                    key={c.hex}
                    type="button"
                    aria-label={`${p.label} colour ${c.name}`}
                    aria-pressed={active}
                    title={c.name}
                    onClick={() => setColours((prev) => ({ ...prev, [p.key]: c.hex }))}
                    className="swatch"
                    data-active={active}
                  >
                    <span style={{ background: c.hex }} />
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <Link href={href} className="btn btn-cta mt-7 w-full sm:w-auto">
        Get a delivered price in these colours <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
