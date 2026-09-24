"use client";

// 2D floor plan (top-down). Also used read-only for the review step and the print sheet.

import { useCallback, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { CornerId, Design, SurfaceId, WallId } from "@/lib/planner/types";
import { WALL_NAMES, WALL_SHORT, formatFeet, formatInches } from "@/lib/planner/types";
import {
  counterPieces,
  islandBox,
  islandFrame,
  localCoords,
  nearestCorner,
  nearestSurface,
  resolveAll,
  wallFrame,
  worldPoint,
  yawFor,
  type Frame,
  type Placed,
  ISLAND_DEPTH,
} from "@/lib/planner/geometry";
import { getPlannerItem } from "@/lib/planner/catalog";

export type FloorMove = { surface?: SurfaceId; t?: number; corner?: CornerId };

export type FloorViewProps = {
  design: Design;
  selectedId?: string | null;
  hoverId?: string | null;
  activeSurface?: SurfaceId | null;
  readonly?: boolean;
  showDims?: boolean;
  compact?: boolean;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
  onSurfaceSelect?: (s: SurfaceId) => void;
  onDragStart?: () => void;
  onMove?: (id: string, move: FloorMove, transient: boolean) => void;
  onIslandMove?: (x: number, y: number, transient: boolean) => void;
  onDropSku?: (sku: string, hit: { surface?: SurfaceId; t?: number; corner?: CornerId }) => void;
  className?: string;
  ariaLabel?: string;
};

const NAVY = "#0d1b2a";
const INK_SOFT = "#3a4a5c";
const BRASS = "#c5a059";
const LINE = "#c8b8a6";
const WALL_THICK = 4.5;

export const DRAG_MIME = "text/fc-sku";

export function FloorView({
  design,
  selectedId,
  hoverId,
  activeSurface,
  readonly,
  showDims = true,
  compact,
  onSelect,
  onHover,
  onSurfaceSelect,
  onDragStart,
  onMove,
  onIslandMove,
  onDropSku,
  className,
  ariaLabel,
}: FloorViewProps) {
  const { room } = design;
  const M = compact ? 14 : 34;
  const W = room.width;
  const D = room.depth;
  const svgRef = useRef<SVGSVGElement>(null);
  const placed = useMemo(() => resolveAll(design), [design]);
  const counters = useMemo(() => counterPieces(design), [design]);
  const [drag, setDrag] = useState<null | { id: string; offset: number; moved: boolean } | { island: true; dx: number; dy: number; moved: boolean }>(null);

  const toRoom = useCallback((e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    try {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const p = pt.matrixTransform(ctm.inverse());
      return { x: p.x, y: p.y };
    } catch {
      return { x: 0, y: 0 };
    }
  }, []);

  const startItemDrag = (e: ReactPointerEvent, p: Placed) => {
    if (readonly) return;
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const pt = toRoom(e);
    const local = localCoords(p.frame, pt);
    setDrag({ id: p.item.id, offset: local.t - p.t, moved: false });
    onSelect?.(p.item.id);
  };

  const startIslandDrag = (e: ReactPointerEvent) => {
    if (readonly) return;
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const pt = toRoom(e);
    setDrag({ island: true, dx: design.island.x - pt.x, dy: design.island.y - pt.y, moved: false });
    onSelect?.(null);
    onSurfaceSelect?.("island");
  };

  const handleMove = (e: ReactPointerEvent) => {
    if (!drag || readonly) return;
    const pt = toRoom(e);
    if (!drag.moved) {
      onDragStart?.();
      setDrag({ ...drag, moved: true });
    }
    if ("island" in drag) {
      onIslandMove?.(Math.round((pt.x + drag.dx) * 2) / 2, Math.round((pt.y + drag.dy) * 2) / 2, true);
      return;
    }
    const item = design.items.find((i) => i.id === drag.id);
    const def = item && getPlannerItem(item.sku);
    if (!item || !def) return;
    if (def.cornerSize) {
      onMove?.(item.id, { corner: nearestCorner(design, pt) }, true);
      return;
    }
    const hit = nearestSurface(design, pt, def);
    if (!hit) return;
    if (hit.surface === item.surface) {
      const fr = hit.surface === "island" ? islandFrame(design) : wallFrame(room, hit.surface);
      const local = localCoords(fr, pt);
      onMove?.(item.id, { surface: hit.surface, t: local.t - drag.offset }, true);
    } else {
      onMove?.(item.id, { surface: hit.surface, t: hit.t }, true);
    }
  };

  const endDrag = (e: ReactPointerEvent) => {
    if (!drag) return;
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if ("island" in drag) {
      if (drag.moved) onIslandMove?.(design.island.x, design.island.y, false);
    } else if (drag.moved) {
      const item = design.items.find((i) => i.id === drag.id);
      if (item) onMove?.(item.id, { surface: item.surface, t: item.t, corner: item.corner }, false);
    }
    setDrag(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (readonly || !onDropSku) return;
    const sku = e.dataTransfer.getData(DRAG_MIME);
    if (!sku) return;
    e.preventDefault();
    const def = getPlannerItem(sku);
    if (!def) return;
    const pt = toRoom(e);
    if (def.cornerSize) {
      onDropSku(sku, { corner: nearestCorner(design, pt) });
      return;
    }
    const hit = nearestSurface(design, pt, def);
    if (hit) onDropSku(sku, { surface: hit.surface, t: hit.t });
    else onDropSku(sku, {});
  };

  const wallSegments = useMemo(() => [0, 1, 2, 3].map((w) => wallFrame(room, w as WallId)), [room]);
  const islandRect = design.island.enabled ? islandBox(design) : null;
  const fontBase = compact ? 5 : 4.2;

  return (
    <svg
      ref={svgRef}
      viewBox={`${-M} ${-M} ${W + 2 * M} ${D + 2 * M}`}
      className={className}
      role="img"
      aria-label={ariaLabel ?? "Floor plan of your kitchen"}
      onPointerMove={handleMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerDown={() => !readonly && onSelect?.(null)}
      onDragOver={(e) => {
        if (!readonly && onDropSku) e.preventDefault();
      }}
      onDrop={handleDrop}
      style={{ touchAction: "none", userSelect: "none" }}
    >
      <defs>
        <pattern id="fc-floor" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#f4ecdd" />
          <path d="M0 6 H12" stroke="#ead9bf" strokeWidth="0.4" />
          <path d="M6 0 V6 M0 6 V12" stroke="#ead9bf" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Floor */}
      <rect x={0} y={0} width={W} height={D} fill="url(#fc-floor)" stroke="none" />

      {/* Counters */}
      {counters.map((c, i) => (
        <rect key={`c${i}`} x={c.box.x0} y={c.box.y0} width={c.box.x1 - c.box.x0} height={c.box.y1 - c.box.y0} fill="#e6e3dc" stroke="#cfcac0" strokeWidth={0.4} />
      ))}

      {/* Island footprint */}
      {islandRect && (
        <g
          onPointerDown={startIslandDrag}
          style={{ cursor: readonly ? "default" : "move" }}
          role={readonly ? undefined : "button"}
          aria-label="Island — drag to move"
        >
          <rect
            x={islandRect.x0}
            y={islandRect.y0}
            width={islandRect.x1 - islandRect.x0}
            height={islandRect.y1 - islandRect.y0}
            fill={activeSurface === "island" ? "rgba(197,160,89,0.18)" : "rgba(13,27,42,0.05)"}
            stroke={activeSurface === "island" ? BRASS : INK_SOFT}
            strokeWidth={0.8}
            strokeDasharray="3 2"
          />
          {placed.filter((p) => p.item.surface === "island").length === 0 && (
            <text x={(islandRect.x0 + islandRect.x1) / 2} y={(islandRect.y0 + islandRect.y1) / 2 + 1.5} fontSize={fontBase} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
              Island — add base cabinets
            </text>
          )}
        </g>
      )}

      {/* Base-level units first, then wall units (dashed) on top */}
      {placed
        .filter((p) => p.def.level !== "wall")
        .map((p) => (
          <UnitShape key={p.item.id} p={p} selected={p.item.id === selectedId} hovered={p.item.id === hoverId} fontBase={fontBase} readonly={!!readonly} onPointerDown={(e) => startItemDrag(e, p)} onHover={onHover} />
        ))}
      {placed
        .filter((p) => p.def.level === "wall")
        .map((p) => (
          <UnitShape key={p.item.id} p={p} selected={p.item.id === selectedId} hovered={p.item.id === hoverId} fontBase={fontBase} readonly={!!readonly} wallLevel onPointerDown={(e) => startItemDrag(e, p)} onHover={onHover} />
        ))}

      {/* Walls */}
      {wallSegments.map((fr) => {
        const open = room.openWalls.includes(fr.id as WallId);
        const a = worldPoint(fr, 0, -WALL_THICK / 2);
        const b = worldPoint(fr, fr.length, -WALL_THICK / 2);
        const active = activeSurface === fr.id;
        return (
          <g key={`w${fr.id}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={open ? LINE : active ? BRASS : NAVY}
              strokeWidth={open ? 1 : WALL_THICK}
              strokeDasharray={open ? "4 3" : undefined}
              strokeLinecap="square"
            />
            {!readonly && !open && (
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="transparent"
                strokeWidth={14}
                style={{ cursor: "pointer" }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onSurfaceSelect?.(fr.id as WallId);
                  onSelect?.(null);
                }}
              >
                <title>{WALL_NAMES[fr.id as WallId]} — click to select</title>
              </line>
            )}
            <WallLabel fr={fr} text={open ? `${WALL_SHORT[fr.id as WallId]} · open` : WALL_SHORT[fr.id as WallId]} M={M} fontBase={fontBase} active={active} />
          </g>
        );
      })}

      {/* Openings */}
      {room.openings.map((o) => {
        const fr = wallFrame(room, o.wall);
        const a = worldPoint(fr, o.t, -WALL_THICK / 2);
        const b = worldPoint(fr, o.t + o.width, -WALL_THICK / 2);
        if (o.kind === "window") {
          const a2 = worldPoint(fr, o.t, -WALL_THICK / 2 - 1);
          const b2 = worldPoint(fr, o.t + o.width, -WALL_THICK / 2 - 1);
          const a3 = worldPoint(fr, o.t, -WALL_THICK / 2 + 1);
          const b3 = worldPoint(fr, o.t + o.width, -WALL_THICK / 2 + 1);
          return (
            <g key={o.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#dbe9f4" strokeWidth={WALL_THICK} />
              <line x1={a2.x} y1={a2.y} x2={b2.x} y2={b2.y} stroke="#6b95b8" strokeWidth={0.6} />
              <line x1={a3.x} y1={a3.y} x2={b3.x} y2={b3.y} stroke="#6b95b8" strokeWidth={0.6} />
            </g>
          );
        }
        // door: gap in the wall + swing arc into the room
        const hinge = worldPoint(fr, o.t, 0);
        const yaw = yawFor(fr.u);
        return (
          <g key={o.id}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fbf8f2" strokeWidth={WALL_THICK + 0.5} />
            <g transform={`translate(${hinge.x} ${hinge.y}) rotate(${(-yaw * 180) / Math.PI})`}>
              <path d={`M ${o.width} 0 A ${o.width} ${o.width} 0 0 1 0 ${o.width}`} fill="none" stroke={INK_SOFT} strokeWidth={0.5} strokeDasharray="2 1.5" />
              <line x1={0} y1={0} x2={0} y2={o.width} stroke={NAVY} strokeWidth={1.2} />
            </g>
          </g>
        );
      })}

      {/* Overall dimensions */}
      {showDims && (
        <>
          <DimLine x1={0} y1={-M + 8} x2={W} y2={-M + 8} label={`${formatFeet(W)} (${formatInches(W)})`} fontBase={fontBase} />
          <DimLine x1={-M + 8} y1={0} x2={-M + 8} y2={D} label={`${formatFeet(D)} (${formatInches(D)})`} fontBase={fontBase} vertical />
        </>
      )}
    </svg>
  );
}

function WallLabel({ fr, text, M, fontBase, active }: { fr: Frame; text: string; M: number; fontBase: number; active: boolean }) {
  const mid = worldPoint(fr, fr.length / 2, -WALL_THICK - 3.5);
  const vertical = fr.u.x === 0;
  return (
    <text
      x={mid.x}
      y={mid.y}
      fontSize={fontBase * 0.9}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={active ? BRASS : INK_SOFT}
      fontFamily="Inter, sans-serif"
      fontWeight={600}
      letterSpacing={0.4}
      transform={vertical ? `rotate(${fr.u.y > 0 ? 90 : -90} ${mid.x} ${mid.y})` : undefined}
      style={{ pointerEvents: "none" }}
    >
      {text}
    </text>
  );
  void M;
}

function DimLine({ x1, y1, x2, y2, label, fontBase, vertical }: { x1: number; y1: number; x2: number; y2: number; label: string; fontBase: number; vertical?: boolean }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g style={{ pointerEvents: "none" }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK_SOFT} strokeWidth={0.4} />
      {vertical ? (
        <>
          <line x1={x1 - 2} y1={y1} x2={x1 + 2} y2={y1} stroke={INK_SOFT} strokeWidth={0.4} />
          <line x1={x2 - 2} y1={y2} x2={x2 + 2} y2={y2} stroke={INK_SOFT} strokeWidth={0.4} />
          <text x={mx - 2.5} y={my} fontSize={fontBase} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif" transform={`rotate(-90 ${mx - 2.5} ${my})`}>
            {label}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 2} x2={x1} y2={y1 + 2} stroke={INK_SOFT} strokeWidth={0.4} />
          <line x1={x2} y1={y2 - 2} x2={x2} y2={y2 + 2} stroke={INK_SOFT} strokeWidth={0.4} />
          <text x={mx} y={my - 1.8} fontSize={fontBase} textAnchor="middle" fill={INK_SOFT} fontFamily="Inter, sans-serif">
            {label}
          </text>
        </>
      )}
    </g>
  );
}

function UnitShape({
  p,
  selected,
  hovered,
  fontBase,
  readonly,
  wallLevel,
  onPointerDown,
  onHover,
}: {
  p: Placed;
  selected: boolean;
  hovered: boolean;
  fontBase: number;
  readonly: boolean;
  wallLevel?: boolean;
  onPointerDown: (e: ReactPointerEvent) => void;
  onHover?: (id: string | null) => void;
}) {
  const { def, frame, t } = p;
  const yaw = yawFor(frame.u);
  const origin = worldPoint(frame, t, 0);
  const rot = (-yaw * 180) / Math.PI;
  const isAppliance = def.group === "appliance";
  const fill = isAppliance ? "#d9dbdd" : wallLevel ? "rgba(255,255,255,0.6)" : "#ffffff";
  const stroke = selected ? BRASS : hovered ? "#4b6a8a" : isAppliance ? "#6f767c" : NAVY;
  const sw = selected ? 1.2 : 0.7;
  const w = def.cornerSize ?? def.width;
  const d = def.cornerSize ?? def.depth;
  const label = def.short;
  const labelRot = -rot; // keep the text horizontal whatever wall the unit sits on
  // local coords: x along the wall (t), y = depth into the room (n)
  let shape: React.ReactNode;
  if (def.front === "lazy") {
    const s = def.cornerSize!;
    shape = <path d={`M0 0 H${s} V${s} H${s - 24} V24 H0 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
  } else if (def.front === "diag" || def.front === "diag-glass") {
    const s = def.cornerSize!;
    shape = <path d={`M0 0 H${s} V${s} H${s - 12} L0 12 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={wallLevel ? "2 1.2" : undefined} strokeLinejoin="round" />;
  } else {
    shape = (
      <>
        <rect x={0} y={0} width={w} height={d} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={wallLevel ? "2 1.2" : undefined} />
        {/* front edge */}
        <line x1={0.3} y1={d} x2={w - 0.3} y2={d} stroke={stroke} strokeWidth={sw * 1.8} />
        {isAppliance && (
          <>
            <line x1={0} y1={0} x2={w} y2={d} stroke="#6f767c" strokeWidth={0.4} />
            <line x1={w} y1={0} x2={0} y2={d} stroke="#6f767c" strokeWidth={0.4} />
          </>
        )}
        {def.front === "sink" && <rect x={w / 2 - 10} y={3} width={20} height={16} rx={2} fill="none" stroke="#8a97a3" strokeWidth={0.5} />}
        {def.front === "range" && [7.5, w - 7.5].flatMap((cx) => [6, 18].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3} fill="none" stroke="#5c6166" strokeWidth={0.5} />))}
      </>
    );
  }
  return (
    <g
      transform={`translate(${origin.x} ${origin.y}) rotate(${rot})`}
      onPointerDown={onPointerDown}
      onPointerEnter={() => onHover?.(p.item.id)}
      onPointerLeave={() => onHover?.(null)}
      style={{ cursor: readonly ? "default" : "grab" }}
      role={readonly ? undefined : "button"}
      aria-label={`${def.name} — ${readonly ? "" : "drag to move"}`}
    >
      {shape}
      {w >= 9 && (
        <text
          x={w / 2}
          y={wallLevel ? 4.5 : Math.min(d, 24) * 0.68}
          fontSize={Math.min(fontBase, w / 3.2)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isAppliance ? "#3f4549" : INK_SOFT}
          fontFamily="Inter, sans-serif"
          fontWeight={500}
          transform={`rotate(${labelRot} ${w / 2} ${wallLevel ? 4.5 : Math.min(d, 24) * 0.68})`}
          style={{ pointerEvents: "none" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export { ISLAND_DEPTH as FLOOR_ISLAND_DEPTH };
