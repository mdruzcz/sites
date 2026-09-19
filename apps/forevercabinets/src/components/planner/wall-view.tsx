"use client";

// 2D elevation ("wall view") of one surface, looking at it from inside the room.

import { useCallback, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Design, SurfaceId, WallId } from "@/lib/planner/types";
import { WALL_NAMES, formatInches } from "@/lib/planner/types";
import { counterPieces, nextWall, prevWall, resolveAll, surfaceFrame, type Placed } from "@/lib/planner/geometry";
import { frontLayout, getPlannerItem, BASE_H, COUNTER_H, TOE_KICK_H, type FrontPart, type PlannerItem } from "@/lib/planner/catalog";
import { DRAG_MIME } from "./floor-view";

export type WallViewProps = {
  design: Design;
  surface: SurfaceId;
  selectedId?: string | null;
  hoverId?: string | null;
  readonly?: boolean;
  showDims?: boolean;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
  onDragStart?: () => void;
  onMove?: (id: string, t: number, transient: boolean) => void;
  onDropSku?: (sku: string, t: number) => void;
  className?: string;
};

const NAVY = "#0d1b2a";
const INK_SOFT = "#3a4a5c";
const BRASS = "#c5a059";

type ElevUnit = { p: Placed; x: number; w: number; parts: FrontPart[]; cornerEdge?: "start" | "end" };

export function WallView({ design, surface, selectedId, hoverId, readonly, showDims = true, onSelect, onHover, onDragStart, onMove, onDropSku, className }: WallViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const frame = surfaceFrame(design, surface);
  const L = frame.length;
  const H = surface === "island" ? 60 : design.room.ceiling;
  const M = 22;
  const [drag, setDrag] = useState<null | { id: string; offset: number; moved: boolean }>(null);

  const units = useMemo<ElevUnit[]>(() => {
    const placed = resolveAll(design);
    const out: ElevUnit[] = [];
    for (const p of placed) {
      if (p.corner === null) {
        if (p.item.surface !== surface) continue;
        out.push({ p, x: p.t, w: p.def.width, parts: frontLayout(p.def) });
      } else if (surface !== "island") {
        const s = p.def.cornerSize ?? p.def.width;
        if (p.corner === surface) out.push({ p, x: L - s, w: s, parts: cornerElevation(p.def, "end"), cornerEdge: "end" });
        else if (nextWall(p.corner) === surface) out.push({ p, x: 0, w: s, parts: cornerElevation(p.def, "start"), cornerEdge: "start" });
      }
    }
    return out;
  }, [design, surface, L]);

  const counters = useMemo(() => counterPieces(design).filter((c) => (c.corner !== undefined ? c.corner === surface || (surface !== "island" && nextWall(c.corner) === surface) : c.surface === surface)), [design, surface]);

  const toLocal = useCallback((e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const startDrag = (e: ReactPointerEvent, u: ElevUnit) => {
    if (readonly) return;
    e.stopPropagation();
    onSelect?.(u.p.item.id);
    if (u.cornerEdge) return; // corner units are moved from the floor plan
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const pt = toLocal(e);
    setDrag({ id: u.p.item.id, offset: pt.x - u.x, moved: false });
  };
  const handleMove = (e: ReactPointerEvent) => {
    if (!drag || readonly) return;
    const pt = toLocal(e);
    if (!drag.moved) {
      onDragStart?.();
      setDrag({ ...drag, moved: true });
    }
    onMove?.(drag.id, pt.x - drag.offset, true);
  };
  const endDrag = (e: ReactPointerEvent) => {
    if (!drag) return;
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (drag.moved) {
      const item = design.items.find((i) => i.id === drag.id);
      if (item) onMove?.(item.id, item.t, false);
    }
    setDrag(null);
  };

  const openings = surface === "island" ? [] : design.room.openings.filter((o) => o.wall === surface);
  const wallBg = surface === "island" ? "#fbf8f2" : "#f5f1ea";
  const title = surface === "island" ? "Island — front" : WALL_NAMES[surface as WallId];
  const openLeft = surface !== "island" && design.room.openWalls.includes(prevWall(surface as WallId));
  const openRight = surface !== "island" && design.room.openWalls.includes(nextWall(surface as WallId));

  return (
    <svg
      ref={svgRef}
      viewBox={`${-M} ${-M} ${L + 2 * M} ${H + 2 * M + 4}`}
      className={className}
      role="img"
      aria-label={`Elevation of the ${title}`}
      onPointerMove={handleMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerDown={() => !readonly && onSelect?.(null)}
      onDragOver={(e) => {
        if (!readonly && onDropSku) e.preventDefault();
      }}
      onDrop={(e) => {
        if (readonly || !onDropSku) return;
        const sku = e.dataTransfer.getData(DRAG_MIME);
        if (!sku) return;
        e.preventDefault();
        const def = getPlannerItem(sku);
        const pt = toLocal(e);
        onDropSku(sku, pt.x - (def?.width ?? 0) / 2);
      }}
      style={{ touchAction: "none", userSelect: "none" }}
    >
      {/* Wall + floor */}
      <rect x={0} y={0} width={L} height={H} fill={wallBg} stroke={surface === "island" ? "none" : NAVY} strokeWidth={surface === "island" ? 0 : 1} />
      {surface !== "island" && (
        <>
          <line x1={0} y1={0} x2={0} y2={H} stroke={openLeft ? "#c8b8a6" : NAVY} strokeWidth={openLeft ? 0.6 : 2} strokeDasharray={openLeft ? "3 2" : undefined} />
          <line x1={L} y1={0} x2={L} y2={H} stroke={openRight ? "#c8b8a6" : NAVY} strokeWidth={openRight ? 0.6 : 2} strokeDasharray={openRight ? "3 2" : undefined} />
        </>
      )}
      <line x1={-M / 2} y1={H} x2={L + M / 2} y2={H} stroke={NAVY} strokeWidth={1.5} />

      {/* Openings */}
      {openings.map((o) => {
        const y = H - o.sill - o.height;
        return o.kind === "window" ? (
          <g key={o.id}>
            <rect x={o.t} y={y} width={o.width} height={o.height} fill="#dbe9f4" stroke="#6b95b8" strokeWidth={0.8} />
            <line x1={o.t + o.width / 2} y1={y} x2={o.t + o.width / 2} y2={y + o.height} stroke="#ffffff" strokeWidth={1.2} />
            <line x1={o.t} y1={y + o.height / 2} x2={o.t + o.width} y2={y + o.height / 2} stroke="#ffffff" strokeWidth={1.2} />
            <text x={o.t + o.width / 2} y={y - 2} fontSize={3.4} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
              window {formatInches(o.width)} × {formatInches(o.height)}
            </text>
          </g>
        ) : (
          <g key={o.id}>
            <rect x={o.t} y={y} width={o.width} height={o.height} fill="#fbf8f2" stroke={NAVY} strokeWidth={0.8} />
            <rect x={o.t + 3} y={y + 3} width={o.width - 6} height={o.height - 3} fill="none" stroke="#c8b8a6" strokeWidth={0.5} />
            <circle cx={o.t + o.width - 4} cy={y + o.height / 2} r={0.9} fill={NAVY} />
            <text x={o.t + o.width / 2} y={y - 2} fontSize={3.4} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
              door {formatInches(o.width)}
            </text>
          </g>
        );
      })}

      {/* Counters */}
      {counters.map((c, i) => {
        const x0 = c.corner !== undefined ? (c.corner === surface ? L - (c.n1 - 1.5) - 1.5 : 0) : c.t0;
        const w = c.corner !== undefined ? c.n1 : c.t1 - c.t0;
        return <rect key={`ct${i}`} x={Math.max(x0, -1.5)} y={H - COUNTER_H} width={Math.min(w, L + 3)} height={COUNTER_H - BASE_H} fill="#dcdad3" stroke="#b9b6ad" strokeWidth={0.4} />;
      })}

      {/* Units */}
      {units.map((u) => (
        <ElevationUnit key={u.p.item.id} u={u} H={H} selected={u.p.item.id === selectedId} hovered={u.p.item.id === hoverId} readonly={!!readonly} onPointerDown={(e) => startDrag(e, u)} onHover={onHover} />
      ))}

      {/* Dimensions */}
      {showDims && (
        <g style={{ pointerEvents: "none" }}>
          <line x1={0} y1={H + 9} x2={L} y2={H + 9} stroke={INK_SOFT} strokeWidth={0.4} />
          <line x1={0} y1={H + 7} x2={0} y2={H + 11} stroke={INK_SOFT} strokeWidth={0.4} />
          <line x1={L} y1={H + 7} x2={L} y2={H + 11} stroke={INK_SOFT} strokeWidth={0.4} />
          <text x={L / 2} y={H + 15.5} fontSize={4} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
            {formatInches(L)}
          </text>
          {units
            .filter((u) => u.p.def.level !== "wall")
            .map((u) => (
              <g key={`d${u.p.item.id}`}>
                <line x1={u.x} y1={H + 3} x2={u.x} y2={H + 6} stroke={INK_SOFT} strokeWidth={0.3} />
                <line x1={u.x + u.w} y1={H + 3} x2={u.x + u.w} y2={H + 6} stroke={INK_SOFT} strokeWidth={0.3} />
                {u.w >= 8 && (
                  <text x={u.x + u.w / 2} y={H + 5.6} fontSize={Math.min(3.2, u.w / 3)} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
                    {formatInches(u.w)}
                  </text>
                )}
              </g>
            ))}
          {surface !== "island" && (
            <>
              {[
                [COUNTER_H, "36″ counter"],
                [54, "54″"],
                [90, "90″"],
              ].map(([h, label]) => (
                <g key={String(h)}>
                  <line x1={L} y1={H - (h as number)} x2={L + 4} y2={H - (h as number)} stroke={INK_SOFT} strokeWidth={0.3} />
                  <text x={L + 5} y={H - (h as number) + 1.2} fontSize={3.2} fill={INK_SOFT} fontFamily="Inter, sans-serif">
                    {label}
                  </text>
                </g>
              ))}
            </>
          )}
          <text x={-M + 2} y={-M + 6} fontSize={4.4} fill={NAVY} fontFamily="Inter, sans-serif" fontWeight={600}>
            {title}
          </text>
        </g>
      )}
    </svg>
  );
}

function cornerElevation(def: PlannerItem, edge: "start" | "end"): FrontPart[] {
  const s = def.cornerSize ?? def.width;
  const legDepth = def.level === "wall" ? 12 : 24;
  const y = def.level === "base" ? TOE_KICK_H : 0;
  const h = def.level === "base" ? BASE_H - TOE_KICK_H : def.height;
  const doorW = s - legDepth;
  const isGlass = def.front === "diag-glass";
  const door: FrontPart = { kind: isGlass ? "glass" : "door", x: edge === "end" ? 0 : legDepth, y, w: doorW, h, hinge: edge === "end" ? "left" : "right" };
  const side: FrontPart = { kind: "panel", x: edge === "end" ? doorW : 0, y, w: legDepth, h, label: "side" };
  return [door, side];
}

function ElevationUnit({ u, H, selected, hovered, readonly, onPointerDown, onHover }: { u: ElevUnit; H: number; selected: boolean; hovered: boolean; readonly: boolean; onPointerDown: (e: ReactPointerEvent) => void; onHover?: (id: string | null) => void }) {
  const { p, x, w, parts } = u;
  const def = p.def;
  const bottom = def.zBottom;
  const top = def.zTop;
  const y0 = H - top; // svg y of the unit's top
  const h = top - bottom;
  const stroke = selected ? BRASS : hovered ? "#4b6a8a" : NAVY;
  const isAppliance = def.group === "appliance";
  return (
    <g
      transform={`translate(${x} ${y0})`}
      onPointerDown={onPointerDown}
      onPointerEnter={() => onHover?.(p.item.id)}
      onPointerLeave={() => onHover?.(null)}
      style={{ cursor: readonly || u.cornerEdge ? "default" : "ew-resize" }}
      role={readonly ? undefined : "button"}
      aria-label={def.name}
    >
      <rect x={0} y={0} width={w} height={h} fill={isAppliance ? "#d9dbdd" : "#ffffff"} stroke={stroke} strokeWidth={selected ? 1.1 : 0.6} />
      {def.level === "base" && def.group !== "appliance" && (
        <rect x={0.4} y={h - TOE_KICK_H} width={w - 0.8} height={TOE_KICK_H} fill="#2b2b2b" />
      )}
      {def.front === "lazy" || def.front === "diag" || def.front === "diag-glass"
        ? parts.map((part, i) => <Part key={i} part={part} unitH={h} />)
        : parts.map((part, i) => <Part key={i} part={part} unitH={h} />)}
      {w >= 8 && (
        <text x={w / 2} y={def.level === "wall" ? -2.2 : def.group === "appliance" ? h / 2 : h - TOE_KICK_H - 3.5} fontSize={Math.min(3.6, w / 3)} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }} dominantBaseline="middle" opacity={0.9}>
          {def.short}
        </text>
      )}
    </g>
  );
}

function Part({ part, unitH }: { part: FrontPart; unitH: number }) {
  // FrontPart.y is measured up from the unit's floor line; svg y grows downward from the unit top.
  const y = unitH - part.y - part.h;
  const inset = Math.min(2.5, part.w / 5, part.h / 5);
  switch (part.kind) {
    case "door":
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#ffffff" stroke="#9aa3ad" strokeWidth={0.35} />
          <rect x={part.x + inset} y={y + inset} width={Math.max(0, part.w - inset * 2)} height={Math.max(0, part.h - inset * 2)} fill="#f4f4f1" stroke="#c9ced3" strokeWidth={0.3} />
          <rect x={part.hinge === "right" ? part.x + 1.6 : part.x + part.w - 2.2} y={y + part.h / 2 - 3} width={0.6} height={6} rx={0.3} fill="#8a9098" />
        </g>
      );
    case "drawer":
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#ffffff" stroke="#9aa3ad" strokeWidth={0.35} />
          <rect x={part.x + inset} y={y + Math.min(inset, part.h / 4)} width={Math.max(0, part.w - inset * 2)} height={Math.max(0, part.h - Math.min(inset, part.h / 4) * 2)} fill="#f4f4f1" stroke="#c9ced3" strokeWidth={0.3} />
          <rect x={part.x + part.w / 2 - 3} y={y + part.h / 2 - 0.3} width={6} height={0.6} rx={0.3} fill="#8a9098" />
        </g>
      );
    case "glass":
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#ffffff" stroke="#9aa3ad" strokeWidth={0.35} />
          <rect x={part.x + inset} y={y + inset} width={Math.max(0, part.w - inset * 2)} height={Math.max(0, part.h - inset * 2)} fill="#dbe9f4" stroke="#c9ced3" strokeWidth={0.3} />
          <rect x={part.hinge === "right" ? part.x + 1.6 : part.x + part.w - 2.2} y={y + part.h / 2 - 3} width={0.6} height={6} rx={0.3} fill="#8a9098" />
        </g>
      );
    case "panel":
      return <rect x={part.x} y={y} width={part.w} height={part.h} fill="#f7f7f5" stroke="#b6bcc3" strokeWidth={0.3} style={{ pointerEvents: "none" }} />;
    case "open": {
      const shelves = Math.max(1, Math.round(part.h / 12));
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#f0efeb" stroke="#9aa3ad" strokeWidth={0.35} />
          {Array.from({ length: shelves - 1 }, (_, i) => (
            <line key={i} x1={part.x + 0.5} y1={y + ((i + 1) * part.h) / shelves} x2={part.x + part.w - 0.5} y2={y + ((i + 1) * part.h) / shelves} stroke="#b6bcc3" strokeWidth={0.5} />
          ))}
          {part.label && (
            <text x={part.x + part.w / 2} y={y + part.h / 2 + 1} fontSize={2.6} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
              {part.label}
            </text>
          )}
        </g>
      );
    }
    case "wine": {
      const cols = Math.max(2, Math.floor(part.w / 4.5));
      const rows = Math.max(2, Math.floor(part.h / 4.5));
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#f0efeb" stroke="#9aa3ad" strokeWidth={0.35} />
          {Array.from({ length: cols }, (_, i) => (
            <line key={`c${i}`} x1={part.x + (i * part.w) / cols} y1={y} x2={part.x + ((i + 1) * part.w) / cols} y2={y + part.h} stroke="#b6bcc3" strokeWidth={0.4} />
          ))}
          {Array.from({ length: rows }, (_, i) => (
            <line key={`r${i}`} x1={part.x} y1={y + ((i + 1) * part.h) / rows} x2={part.x + part.w} y2={y + (i * part.h) / rows} stroke="#b6bcc3" strokeWidth={0.4} />
          ))}
        </g>
      );
    }
    case "appliance":
      return (
        <g style={{ pointerEvents: "none" }}>
          <rect x={part.x} y={y} width={part.w} height={part.h} fill="#d9dbdd" stroke="#7d848b" strokeWidth={0.4} />
          {part.label === "Range" && <rect x={part.x + 1.5} y={y + 1} width={part.w - 3} height={4} fill="#3a3f44" />}
          {part.label === "Fridge" && <line x1={part.x} y1={y + part.h * 0.32} x2={part.x + part.w} y2={y + part.h * 0.32} stroke="#7d848b" strokeWidth={0.5} />}
          {part.label === "Dishwasher" && <rect x={part.x + 2} y={y + 2} width={part.w - 4} height={3} fill="#a4aab0" />}
        </g>
      );
  }
}
