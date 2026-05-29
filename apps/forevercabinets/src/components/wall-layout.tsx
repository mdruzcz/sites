"use client";

import { useState } from "react";
import Link from "next/link";
import { DimensionDiagram } from "./dimension-diagram";
import type { WallPlan, WallPiece } from "@/lib/visualizer";
import { formatCad, formatDim } from "@/lib/utils";

type Props = {
  plan: WallPlan;
  wallLength: number;
  onReorderBase?: (from: number, to: number) => void;
  onReorderWall?: (from: number, to: number) => void;
};

type View = "front" | "top" | "side";

export function WallLayout({ plan, wallLength, onReorderBase, onReorderWall }: Props) {
  const [view, setView] = useState<View>("front");
  const hasWallRow = !!plan.wallPieces && plan.wallPieces.length > 0;

  return (
    <div className="border border-[var(--color-line)] bg-white">
      {/* View toggle */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] px-4 py-2">
        <p className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">
          {view === "front" ? "Front elevation" : view === "top" ? "Top-down plan" : "Side section"}
        </p>
        <div className="inline-flex border border-[var(--color-line)]" role="tablist">
          {(["front", "top", "side"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest ${
                view === v
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-white text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]"
              }`}
            >
              {v === "front" ? "Front" : v === "top" ? "Top" : "Side"}
            </button>
          ))}
        </div>
      </div>

      {view === "front" ? (
        <FrontView
          plan={plan}
          wallLength={wallLength}
          hasWallRow={hasWallRow}
          onReorderBase={onReorderBase}
          onReorderWall={onReorderWall}
        />
      ) : view === "top" ? (
        <TopView
          plan={plan}
          wallLength={wallLength}
          hasWallRow={hasWallRow}
          onReorderBase={onReorderBase}
          onReorderWall={onReorderWall}
        />
      ) : (
        <SideView hasWallRow={hasWallRow} hasTallPantry={plan.pieces.some(p => p.cabinet.features.includes("tall"))} />
      )}
      {(onReorderBase || onReorderWall) && view !== "side" && (
        <p className="border-t border-dashed border-[var(--color-line)] bg-[var(--color-cream-warm)] px-4 py-2 text-center text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)] no-print">
          ↔ drag cabinets to rearrange
        </p>
      )}

      {/* Summary footer */}
      <div className="border-t border-[var(--color-line)] bg-[var(--color-sandstone-soft)] px-4 py-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
              Wall total
            </p>
            <p className="font-display text-2xl text-[var(--color-navy)]">
              {formatDim(plan.totalWidth)}{" "}
              {plan.exactMatch ? (
                <span className="text-sm text-green-700">✓ exact fit</span>
              ) : (
                <span className="text-sm text-[var(--color-ink-soft)]">
                  ({plan.totalWidth - wallLength > 0 ? "+" : ""}
                  {formatDim(plan.totalWidth - wallLength)} vs goal)
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
              Subtotal {hasWallRow && "(base + wall)"}
            </p>
            <p className="font-display text-2xl text-[var(--color-navy)]">
              {formatCad(plan.totalPrice + (plan.wallTotalPrice ?? 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FRONT VIEW — cabinets shown as elevation panels left-to-right
// ============================================================
function FrontView({
  plan,
  wallLength,
  hasWallRow,
  onReorderBase,
  onReorderWall,
}: {
  plan: WallPlan;
  wallLength: number;
  hasWallRow: boolean;
  onReorderBase?: (from: number, to: number) => void;
  onReorderWall?: (from: number, to: number) => void;
}) {
  const total = plan.totalWidth;
  return (
    <div className="overflow-x-auto p-4">
      <div className="mx-auto w-full min-w-[640px] max-w-4xl">
        {/* Ruler */}
        <Ruler totalIn={total} wallLength={wallLength} />

        {/* Wall row (above) */}
        {hasWallRow && (
          <>
            <DragRow
              pieces={plan.wallPieces!}
              total={total}
              minHeight={140}
              topLabel="WALL"
              rowKey="wall"
              onReorder={onReorderWall}
            />
            {/* Counter gap */}
            <div className="my-2 h-6 border-l-2 border-r-2 border-dashed border-[var(--color-sandstone-deep)] bg-[var(--color-cream-warm)] px-2 text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)] flex items-center justify-center">
              Counter — 18″ backsplash
            </div>
          </>
        )}

        {/* Base row */}
        <DragRow
          pieces={plan.pieces}
          total={total}
          minHeight={hasWallRow ? 200 : 240}
          topLabel="BASE"
          rowKey="base"
          onReorder={onReorderBase}
        />

        {/* Floor line */}
        <div className="mt-1 h-1 bg-[var(--color-navy)]" />
        <p className="mt-1 text-center text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">
          Floor
        </p>
      </div>
    </div>
  );
}

function DragRow({
  pieces,
  total,
  minHeight,
  topLabel,
  rowKey,
  onReorder,
}: {
  pieces: WallPiece[];
  total: number;
  minHeight: number;
  topLabel: string;
  rowKey: string;
  onReorder?: (from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  return (
    <div className="flex items-stretch gap-0.5">
      {pieces.map((p, i) => (
        <DraggablePanel
          key={`${rowKey}-${p.cabinet.sku}-${i}`}
          piece={p}
          widthPct={(p.width_in / total) * 100}
          minHeight={minHeight}
          topLabel={topLabel}
          index={i}
          isDragging={dragIndex === i}
          isOver={overIndex === i && dragIndex !== null && dragIndex !== i}
          enabled={!!onReorder}
          onDragStart={() => setDragIndex(i)}
          onDragOver={() => setOverIndex(i)}
          onDragEnd={() => {
            if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex && onReorder) {
              onReorder(dragIndex, overIndex);
            }
            setDragIndex(null);
            setOverIndex(null);
          }}
        />
      ))}
    </div>
  );
}

function DraggablePanel({
  piece,
  widthPct,
  minHeight,
  topLabel,
  index,
  isDragging,
  isOver,
  enabled,
  onDragStart,
  onDragOver,
  onDragEnd,
}: {
  piece: WallPiece;
  widthPct: number;
  minHeight: number;
  topLabel: string;
  index: number;
  isDragging: boolean;
  isOver: boolean;
  enabled: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      draggable={enabled}
      onDragStart={(e) => {
        if (!enabled) return;
        e.dataTransfer.setData("text/plain", String(index));
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragOver={(e) => {
        if (!enabled) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver();
      }}
      onDrop={(e) => {
        if (!enabled) return;
        e.preventDefault();
        onDragEnd();
      }}
      onDragEnd={onDragEnd}
      className={`group relative overflow-hidden border bg-white transition-all ${
        enabled ? "cursor-grab active:cursor-grabbing" : ""
      } ${
        isDragging
          ? "border-[var(--color-brass)] opacity-50 scale-95"
          : isOver
          ? "border-[var(--color-brass)] ring-2 ring-[var(--color-brass)]"
          : "border-[var(--color-line)] hover:border-[var(--color-navy)]"
      }`}
      style={{ width: `${widthPct}%`, minHeight }}
      title={`${piece.cabinet.name} — ${formatCad(piece.cabinet.price_cad)}`}
    >
      <DimensionDiagram
        width={piece.cabinet.width_in}
        height={piece.cabinet.height_in}
        depth={piece.cabinet.depth_in}
        type={piece.cabinet.type}
        className="h-full w-full pointer-events-none"
      />
      <span className="absolute left-1 top-1 rounded-sm bg-[var(--color-brass)] px-1 text-[8px] font-semibold uppercase tracking-widest text-[var(--color-navy)]">
        {topLabel}
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-[var(--color-navy)]/85 px-2 py-1.5 text-[10px] text-white">
        <div className="flex items-center justify-between">
          <span className="font-medium leading-tight">{formatDim(piece.width_in)}</span>
          <Link
            href={`/cabinets/${piece.cabinet.slug}`}
            className="opacity-70 hover:opacity-100 hover:underline leading-tight"
            onClick={(e) => e.stopPropagation()}
          >
            {piece.cabinet.sku}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TOP VIEW — cabinets shown from above with depth callouts
// ============================================================
function TopView({
  plan,
  wallLength,
  hasWallRow,
  onReorderBase,
  onReorderWall,
}: {
  plan: WallPlan;
  wallLength: number;
  hasWallRow: boolean;
  onReorderBase?: (from: number, to: number) => void;
  onReorderWall?: (from: number, to: number) => void;
}) {
  // Scale: 1 inch = 4px (so 120" wall = 480px). Base depth 24", wall depth 12".
  const SCALE = 3.2;
  const baseDepth = 24 * SCALE;
  const wallDepth = 12 * SCALE;
  const totalWidthPx = plan.totalWidth * SCALE;

  return (
    <div className="overflow-x-auto p-4">
      <div className="mx-auto w-full" style={{ maxWidth: Math.max(totalWidthPx + 80, 640) }}>
        <Ruler totalIn={plan.totalWidth} wallLength={wallLength} />

        {/* The wall (top edge) */}
        <div
          className="mx-auto mt-3 flex items-stretch"
          style={{ width: totalWidthPx, maxWidth: "100%" }}
        >
          <div
            aria-label="Back wall"
            className="w-full"
            style={{ height: 6, background: "#0d1b2a" }}
          />
        </div>

        {/* Wall cabinets (against wall, narrow depth) */}
        {hasWallRow && (
          <div
            className="relative mx-auto"
            style={{ width: totalWidthPx, maxWidth: "100%" }}
          >
            <TopDragRow
              pieces={plan.wallPieces!}
              total={plan.totalWidth}
              depthPx={wallDepth}
              kind="wall"
              onReorder={onReorderWall}
            />
            <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">
              12″ deep
            </span>
          </div>
        )}

        {/* Gap between wall and base cabinets — represents counter offset */}
        {hasWallRow && (
          <div
            className="mx-auto"
            style={{ width: totalWidthPx, maxWidth: "100%", height: 16 }}
          />
        )}

        {/* Base cabinets (against wall, deeper) */}
        <div
          className="relative mx-auto"
          style={{ width: totalWidthPx, maxWidth: "100%" }}
        >
          <TopDragRow
            pieces={plan.pieces}
            total={plan.totalWidth}
            depthPx={baseDepth}
            kind="base"
            onReorder={onReorderBase}
          />
          <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">
            24″ deep
          </span>
        </div>

        {/* Floor edge */}
        <div className="mx-auto mt-1 text-center text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">
          ↑ Counter / front edge ↑
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIDE VIEW — cabinets in profile, showing standard heights
// ============================================================
function SideView({ hasWallRow, hasTallPantry }: { hasWallRow: boolean; hasTallPantry: boolean }) {
  // Scale: 1 inch = 3px → 96" ceiling = 288px
  const SCALE = 3;
  const CEILING = 96 * SCALE;
  const FLOOR_Y = CEILING; // y=0 is ceiling, y=CEILING is floor (we invert)
  const BASE_BOX_H = 30.5 * SCALE; // 30.5" cabinet body
  const TOE_KICK_H = 4 * SCALE;
  const COUNTER_H = 1.5 * SCALE;
  const BASE_DEPTH = 24 * SCALE;
  const WALL_DEPTH = 12 * SCALE;
  const WALL_H = 36 * SCALE;
  // Bottom of wall cabinet sits 18" above counter (54" off the floor — light rail height)
  const WALL_BOTTOM_FROM_FLOOR = 54 * SCALE;
  const PANTRY_H = 90 * SCALE;
  const PANTRY_DEPTH = 24 * SCALE;
  const widthPx = 360;

  // y coordinates from top
  const baseTopY = CEILING - (TOE_KICK_H + BASE_BOX_H + COUNTER_H);
  const baseBoxY = baseTopY + COUNTER_H;
  const counterY = baseTopY;
  const toeKickY = CEILING - TOE_KICK_H;
  const wallBoxY = CEILING - WALL_BOTTOM_FROM_FLOOR - WALL_H;
  const wallBoxBottomY = CEILING - WALL_BOTTOM_FROM_FLOOR;
  const pantryY = CEILING - PANTRY_H;

  return (
    <div className="overflow-x-auto p-6">
      <div className="mx-auto" style={{ maxWidth: 600 }}>
        <svg
          viewBox={`0 0 ${widthPx} ${CEILING + 20}`}
          className="h-auto w-full"
          aria-label="Side section of kitchen showing cabinet profile"
        >
          {/* Wall (left edge) */}
          <line x1="40" y1="0" x2="40" y2={FLOOR_Y} stroke="#0d1b2a" strokeWidth="2" />
          {/* Floor */}
          <line x1="0" y1={FLOOR_Y} x2={widthPx} y2={FLOOR_Y} stroke="#0d1b2a" strokeWidth="2" />
          {/* Ceiling (light) */}
          <line x1="0" y1="0" x2={widthPx} y2="0" stroke="#c8b8a6" strokeWidth="1" strokeDasharray="4 4" />

          {/* Base cabinet body */}
          <rect
            x="40"
            y={baseBoxY}
            width={BASE_DEPTH}
            height={BASE_BOX_H}
            fill="#ffffff"
            stroke="#0d1b2a"
            strokeWidth="1.5"
          />
          {/* Door panel inset */}
          <rect
            x="44"
            y={baseBoxY + 4}
            width={BASE_DEPTH - 8}
            height={BASE_BOX_H - 8}
            fill="none"
            stroke="#c8b8a6"
            strokeWidth="1"
          />
          {/* Toe kick (recessed 3") */}
          <rect
            x="40"
            y={toeKickY}
            width={BASE_DEPTH - 9}
            height={TOE_KICK_H}
            fill="#1a2a3d"
            stroke="#0d1b2a"
          />
          {/* Counter overhang (1.5" past front edge) */}
          <rect
            x="40"
            y={counterY}
            width={BASE_DEPTH + 1.5 * SCALE}
            height={COUNTER_H}
            fill="#0d1b2a"
            stroke="#0d1b2a"
          />

          {/* Wall cabinet */}
          {hasWallRow && (
            <>
              <rect
                x="40"
                y={wallBoxY}
                width={WALL_DEPTH}
                height={WALL_H}
                fill="#ffffff"
                stroke="#0d1b2a"
                strokeWidth="1.5"
              />
              <rect
                x="44"
                y={wallBoxY + 4}
                width={WALL_DEPTH - 8}
                height={WALL_H - 8}
                fill="none"
                stroke="#c8b8a6"
                strokeWidth="1"
              />
              {/* Light rail moulding under wall cabinet */}
              <rect
                x="40"
                y={wallBoxBottomY}
                width={WALL_DEPTH}
                height={4}
                fill="#c5a059"
                opacity="0.85"
              />
            </>
          )}

          {/* Tall pantry — drawn to the right of the base */}
          {hasTallPantry && (
            <>
              <rect
                x={40 + BASE_DEPTH + 20}
                y={pantryY}
                width={PANTRY_DEPTH}
                height={PANTRY_H}
                fill="#ffffff"
                stroke="#0d1b2a"
                strokeWidth="1.5"
              />
              <rect
                x={40 + BASE_DEPTH + 24}
                y={pantryY + 4}
                width={PANTRY_DEPTH - 8}
                height={PANTRY_H - 8}
                fill="none"
                stroke="#c8b8a6"
                strokeWidth="1"
              />
              <text
                x={40 + BASE_DEPTH + 20 + PANTRY_DEPTH / 2}
                y={pantryY + PANTRY_H / 2}
                fontSize="9"
                textAnchor="middle"
                fill="#3a4a5c"
                fontFamily="Inter, sans-serif"
              >
                90″ Tall Pantry
              </text>
            </>
          )}

          {/* Dimension annotations */}
          <DimText x={40 + BASE_DEPTH / 2} y={baseBoxY + BASE_BOX_H / 2} text="34½″" />
          <DimText x={40 + BASE_DEPTH / 2} y={toeKickY + TOE_KICK_H / 2} text="4″ toe" small />
          <DimText x={40 + BASE_DEPTH / 2 + 2} y={counterY - 4} text="counter" small />
          {hasWallRow && (
            <>
              <DimText x={40 + WALL_DEPTH / 2} y={wallBoxY + WALL_H / 2} text="36″" />
              <DimText
                x={40 + WALL_DEPTH + 28}
                y={(wallBoxBottomY + counterY) / 2}
                text="18″ rail"
                small
              />
            </>
          )}

          {/* Right-side overall height annotation */}
          <line x1={widthPx - 12} y1="0" x2={widthPx - 12} y2={FLOOR_Y} stroke="#3a4a5c" strokeWidth="0.5" />
          <line x1={widthPx - 16} y1="0" x2={widthPx - 8} y2="0" stroke="#3a4a5c" strokeWidth="0.5" />
          <line x1={widthPx - 16} y1={FLOOR_Y} x2={widthPx - 8} y2={FLOOR_Y} stroke="#3a4a5c" strokeWidth="0.5" />
          <text
            x={widthPx - 18}
            y={FLOOR_Y / 2}
            fontSize="9"
            textAnchor="middle"
            fill="#3a4a5c"
            fontFamily="Inter, sans-serif"
            transform={`rotate(90 ${widthPx - 18} ${FLOOR_Y / 2})`}
          >
            8 ft ceiling
          </text>

          {/* Labels */}
          <text x={20} y={FLOOR_Y - 6} fontSize="9" fill="#3a4a5c" fontFamily="Inter, sans-serif">
            wall
          </text>
          <text x={widthPx / 2} y={FLOOR_Y + 14} fontSize="10" textAnchor="middle" fill="#3a4a5c" fontFamily="Inter, sans-serif">
            ← back wall · room side →
          </text>
        </svg>
        <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
          Standard heights: 4″ toe kick · 30½″ base box · 1½″ counter (36″ counter height) · 18″ light-rail · 36″ wall cabinet.
        </p>
      </div>
    </div>
  );
}

function DimText({ x, y, text, small }: { x: number; y: number; text: string; small?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={small ? 8 : 10}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={small ? "#3a4a5c" : "#0d1b2a"}
      fontFamily="Inter, sans-serif"
      fontWeight={small ? 400 : 600}
    >
      {text}
    </text>
  );
}

// ============================================================
// Helpers
// ============================================================

function Ruler({ totalIn, wallLength }: { totalIn: number; wallLength: number }) {
  // Show inch ticks every 6" up to total
  const ticks: number[] = [];
  for (let i = 0; i <= totalIn; i += 6) ticks.push(i);
  if (ticks[ticks.length - 1] !== totalIn) ticks.push(totalIn);
  return (
    <div className="relative h-7 text-[10px] text-[var(--color-ink-soft)]">
      <div className="absolute inset-x-0 top-3 h-px bg-[var(--color-line)]" />
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute -translate-x-1/2 text-center"
          style={{ left: `${(t / totalIn) * 100}%` }}
        >
          <span className="block h-2 w-px bg-[var(--color-ink-soft)] mx-auto" />
          {t === 0 || t === totalIn || t % 12 === 0 ? (
            <span className="mt-0.5 block whitespace-nowrap">
              {t === 0 ? "0″" : `${t}″`}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TopDragRow({
  pieces,
  total,
  depthPx,
  kind,
  onReorder,
}: {
  pieces: WallPiece[];
  total: number;
  depthPx: number;
  kind: "base" | "wall";
  onReorder?: (from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  return (
    <div className="flex items-stretch gap-0.5">
      {pieces.map((p, i) => (
        <TopPanel
          key={`${kind}-${p.cabinet.sku}-${i}`}
          piece={p}
          widthIn={p.width_in}
          totalIn={total}
          depthPx={depthPx}
          kind={kind}
          index={i}
          isDragging={dragIndex === i}
          isOver={overIndex === i && dragIndex !== null && dragIndex !== i}
          enabled={!!onReorder}
          onDragStart={() => setDragIndex(i)}
          onDragOver={() => setOverIndex(i)}
          onDragEnd={() => {
            if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex && onReorder) {
              onReorder(dragIndex, overIndex);
            }
            setDragIndex(null);
            setOverIndex(null);
          }}
        />
      ))}
    </div>
  );
}

function TopPanel({
  piece,
  widthIn,
  totalIn,
  depthPx,
  kind,
  index,
  isDragging,
  isOver,
  enabled,
  onDragStart,
  onDragOver,
  onDragEnd,
}: {
  piece: WallPiece;
  widthIn: number;
  totalIn: number;
  depthPx: number;
  kind: "base" | "wall";
  index: number;
  isDragging: boolean;
  isOver: boolean;
  enabled: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDragEnd: () => void;
}) {
  const widthPct = (widthIn / totalIn) * 100;
  const bg = kind === "base" ? "#f5f0e6" : "#fff8eb";
  return (
    <div
      draggable={enabled}
      onDragStart={(e) => {
        if (!enabled) return;
        e.dataTransfer.setData("text/plain", String(index));
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragOver={(e) => {
        if (!enabled) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver();
      }}
      onDrop={(e) => {
        if (!enabled) return;
        e.preventDefault();
        onDragEnd();
      }}
      onDragEnd={onDragEnd}
      className={`relative flex items-center justify-center border transition-all ${
        enabled ? "cursor-grab active:cursor-grabbing" : ""
      } ${
        isDragging
          ? "border-[var(--color-brass)] opacity-50 scale-95"
          : isOver
          ? "border-[var(--color-brass)] ring-2 ring-[var(--color-brass)]"
          : "border-[var(--color-navy)] hover:bg-[var(--color-sandstone)]"
      }`}
      style={{ width: `${widthPct}%`, height: depthPx, background: bg }}
      title={`${piece.cabinet.name} — ${formatCad(piece.cabinet.price_cad)}`}
    >
      <div className="text-center pointer-events-none">
        <p className="font-display text-[12px] leading-none text-[var(--color-navy)]">
          {formatDim(widthIn)}
        </p>
        <Link
          href={`/cabinets/${piece.cabinet.slug}`}
          className="mt-0.5 text-[9px] uppercase tracking-widest text-[var(--color-ink-soft)] hover:underline pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {piece.cabinet.sku}
        </Link>
      </div>
    </div>
  );
}
