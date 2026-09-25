// Light Visualizer — canvas overlay renderer.
// Identical copy lives in permanent-lighting-direct/src/lib/visualizer/draw.ts. Keep them in sync.
//
// One renderer serves both the live editor (opts.scale = display px per image px,
// opts.k = 1) and the exported annotated JPEG (opts.scale = 1, opts.k scaled to
// the image size), so what the customer sees is exactly what we receive.

import type { Design, Estimate, Pt } from './engine';

export interface DrawOpts {
  scale: number;
  k: number;
  showGrid: boolean;
  showLengths: boolean;
  mode: 'scale' | 'draw' | 'view';
  activeRunId?: string | null;
  selectedRunId?: string | null;
  scaleDraft?: Pt | null;
  cursor?: Pt | null;
  summary: boolean;
  legend: boolean;
  watermark?: string;
  kitLabel?: string | null;
}

export const COLORS = {
  lit: '#22c55e',
  litDark: '#15803d',
  jump: '#facc15',
  jumpDark: '#a16207',
  ref: '#22d3ee',
  halo: 'rgba(255,255,255,0.9)',
  ink: 'rgba(16,21,31,0.88)',
  grid: 'rgba(255,255,255,0.38)',
  gridMajor: 'rgba(255,255,255,0.7)',
};

const FONT = '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

interface ChipOpts { bg?: string; fg?: string; size?: number; bold?: boolean; align?: 'center' | 'left' | 'right'; pad?: number; border?: string }

function chip(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, k: number, o: ChipOpts = {}) {
  const size = (o.size ?? 12) * k;
  const pad = (o.pad ?? 6) * k;
  ctx.font = `${o.bold === false ? 500 : 700} ${size}px ${FONT}`;
  const w = ctx.measureText(text).width + pad * 2;
  const h = size + pad * 1.4;
  let left = x - w / 2;
  if (o.align === 'left') left = x;
  if (o.align === 'right') left = x - w;
  roundRect(ctx, left, y - h / 2, w, h, 4 * k);
  ctx.fillStyle = o.bg ?? COLORS.ink;
  ctx.fill();
  if (o.border) { ctx.lineWidth = 1.5 * k; ctx.strokeStyle = o.border; ctx.stroke(); }
  ctx.fillStyle = o.fg ?? '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, left + w / 2, y + 0.5 * k);
  return { w, h, left, top: y - h / 2 };
}

function arrowhead(ctx: CanvasRenderingContext2D, from: Pt, to: Pt, at: number, size: number, color: string) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  if (len < size * 2.5) return;
  const ux = dx / len, uy = dy / len;
  const px = from.x + dx * at, py = from.y + dy * at;
  ctx.beginPath();
  ctx.moveTo(px + ux * size, py + uy * size);
  ctx.lineTo(px - ux * size * 0.9 - uy * size * 0.7, py - uy * size * 0.9 + ux * size * 0.7);
  ctx.lineTo(px - ux * size * 0.9 + uy * size * 0.7, py - uy * size * 0.9 - ux * size * 0.7);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function strokePath(ctx: CanvasRenderingContext2D, pts: Pt[], width: number, color: string, dash: number[] = []) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.setLineDash(dash);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawOverlay(ctx: CanvasRenderingContext2D, design: Design, est: Estimate, opts: DrawOpts) {
  const { scale: s, k } = opts;
  const W = design.image.w * s, H = design.image.h * s;
  const P = (p: Pt): Pt => ({ x: p.x * s, y: p.y * s });

  /* ── grid (2 ft) ── */
  if (opts.showGrid && est.pxPerFt) {
    const step = 2 * est.pxPerFt * s;
    if (step >= 6 * k) {
      ctx.save();
      ctx.lineWidth = 1 * k;
      let i = 0;
      for (let x = 0; x <= W + 0.5; x += step, i++) {
        ctx.strokeStyle = i % 5 === 0 ? COLORS.gridMajor : COLORS.grid;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      i = 0;
      for (let y = H; y >= -0.5; y -= step, i++) {
        ctx.strokeStyle = i % 5 === 0 ? COLORS.gridMajor : COLORS.grid;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // labels every 10 ft
      const major = step * 5;
      if (major >= 40 * k) {
        for (let x = 0, ft = 0; x <= W - 20 * k; x += major, ft += 10) chip(ctx, `${ft} ft`, x + 4 * k, H - 12 * k, k, { size: 10, align: 'left', pad: 4 });
        for (let y = H, ft = 0; y >= 20 * k; y -= major, ft += 10) if (ft > 0) chip(ctx, `${ft} ft`, 4 * k, y, k, { size: 10, align: 'left', pad: 4 });
      }
      ctx.restore();
    }
  }

  /* ── scale reference ── */
  const drawRef = (a: Pt, b: Pt, label: string | null) => {
    const A = P(a), B = P(b);
    strokePath(ctx, [A, B], 6 * k, COLORS.halo);
    strokePath(ctx, [A, B], 3 * k, COLORS.ref);
    for (const p of [A, B]) {
      ctx.beginPath(); ctx.arc(p.x, p.y, 5 * k, 0, Math.PI * 2); ctx.fillStyle = COLORS.ref; ctx.fill();
      ctx.lineWidth = 2 * k; ctx.strokeStyle = '#fff'; ctx.stroke();
    }
    if (label) {
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      chip(ctx, label, mx, my - 16 * k, k, { bg: COLORS.ref, fg: '#083344', size: 12 });
    }
  };
  if (design.scale) drawRef(design.scale.a, design.scale.b, `${design.scale.label}: ${design.scale.feet} ft`);
  if (opts.mode === 'scale' && opts.scaleDraft) {
    if (opts.cursor) drawRef(opts.scaleDraft, opts.cursor, null);
    else { const A = P(opts.scaleDraft); ctx.beginPath(); ctx.arc(A.x, A.y, 6 * k, 0, Math.PI * 2); ctx.fillStyle = COLORS.ref; ctx.fill(); ctx.lineWidth = 2 * k; ctx.strokeStyle = '#fff'; ctx.stroke(); }
  }

  /* ── runs ── */
  let litIndex = 0;
  for (const run of design.runs) {
    const pts = run.points.map(P);
    const isLit = run.kind === 'lit';
    const color = isLit ? COLORS.lit : COLORS.jump;
    const dark = isLit ? COLORS.litDark : COLORS.jumpDark;
    const active = run.id === opts.activeRunId;
    const selected = run.id === opts.selectedRunId;
    // rubber band from the last point to the cursor while drawing
    const drawPts = active && opts.mode === 'draw' && opts.cursor && pts.length ? [...pts, P(opts.cursor)] : pts;

    if (drawPts.length >= 2) {
      strokePath(ctx, drawPts, (selected ? 9 : 7) * k, selected ? 'rgba(255,255,255,1)' : COLORS.halo);
      strokePath(ctx, drawPts, 3.5 * k, color, isLit ? [] : [9 * k, 7 * k]);
      if (isLit) {
        for (let i = 1; i < drawPts.length; i++) arrowhead(ctx, drawPts[i - 1], drawPts[i], 0.55, 6 * k, dark);
      }
    }
    // vertices
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const r = (i === 0 ? 5.5 : 4) * k;
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? color : '#fff'; ctx.fill();
      ctx.lineWidth = 2 * k; ctx.strokeStyle = i === 0 ? '#fff' : dark; ctx.stroke();
    }
    // run number at the first point
    if (isLit && pts.length) {
      litIndex++;
      const p = pts[0];
      const r = 9 * k;
      ctx.beginPath(); ctx.arc(p.x, p.y - 16 * k, r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.lit; ctx.fill(); ctx.lineWidth = 2 * k; ctx.strokeStyle = '#fff'; ctx.stroke();
      ctx.fillStyle = '#052e16'; ctx.font = `700 ${11 * k}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(litIndex), p.x, p.y - 16 * k + 0.5 * k);
      if (run.separate) chip(ctx, 'SEPARATE BUILDING', p.x + 14 * k, p.y - 16 * k, k, { size: 9, align: 'left', pad: 4, bg: COLORS.ink });
    }
    // per-segment lengths
    if (opts.showLengths && est.hasScale && pts.length >= 2) {
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const lenPx = Math.hypot(b.x - a.x, b.y - a.y);
        if (lenPx < 44 * k) continue;
        const seg = est.segments.find((sg) => sg.runId === run.id && sg.index === i - 1);
        if (!seg || seg.feet < 1) continue;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const nx = -(b.y - a.y) / lenPx, ny = (b.x - a.x) / lenPx;
        const off = 14 * k * (ny < 0 ? -1 : 1) * -1; // push labels upward-ish
        chip(ctx, `${Math.round(seg.feet)} ft`, mx + nx * off, my + ny * off, k, { bg: isLit ? 'rgba(20,83,45,0.92)' : 'rgba(113,63,18,0.92)', size: 11, pad: 4 });
      }
    }
    // active run: highlight the last vertex
    if (active && pts.length && opts.mode === 'draw') {
      const p = pts[pts.length - 1];
      ctx.beginPath(); ctx.arc(p.x, p.y, 9 * k, 0, Math.PI * 2);
      ctx.lineWidth = 2 * k; ctx.strokeStyle = color; ctx.setLineDash([3 * k, 3 * k]); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  /* ── legend ── */
  if (opts.legend) {
    const x = 10 * k, y = 10 * k;
    const lh = 18 * k;
    const w = 150 * k, h = lh * 2 + 14 * k;
    roundRect(ctx, x, y, w, h, 6 * k); ctx.fillStyle = COLORS.ink; ctx.fill();
    ctx.font = `700 ${11 * k}px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
    const row = (i: number, label: string, color: string, dash: number[]) => {
      const cy = y + 7 * k + lh * i + lh / 2;
      strokePath(ctx, [{ x: x + 10 * k, y: cy }, { x: x + 44 * k, y: cy }], 3 * k, color, dash);
      ctx.fillStyle = '#fff'; ctx.fillText(label, x + 52 * k, cy);
    };
    row(0, 'Lights', COLORS.lit, []);
    row(1, 'Unlit jump', COLORS.jump, [6 * k, 5 * k]);
  }

  /* ── summary box ── */
  if (opts.summary && (est.litFeet > 0 || est.jumpFeet > 0)) {
    const lines: { t: string; c?: string; b?: boolean }[] = [
      { t: 'YOUR LIGHT PLAN', c: '#fff', b: true },
      { t: `Lights ≈ ${est.litFeet} ft`, c: '#86efac' },
    ];
    if (est.jumpFeet) lines.push({ t: `Unlit jumps ≈ ${est.jumpFeet} ft`, c: '#fde68a' });
    lines.push({ t: `+${est.allowanceFeet} ft fitting allowance`, c: 'rgba(255,255,255,0.8)' });
    lines.push({ t: `Plan for ≈ ${est.requiredFeet} ft`, c: '#fff', b: true });
    if (opts.kitLabel) lines.push({ t: opts.kitLabel, c: '#fff', b: true });
    if (!est.hasScale) lines.push({ t: 'No scale set — lengths are unmeasured', c: '#fde68a' });
    const size = 12 * k, lh = 17 * k, pad = 10 * k;
    ctx.font = `700 ${size}px ${FONT}`;
    const w = Math.max(...lines.map((l) => ctx.measureText(l.t).width)) + pad * 2;
    const h = lines.length * lh + pad * 2 - 4 * k;
    const x = W - w - 10 * k, y = 10 * k;
    roundRect(ctx, x, y, w, h, 6 * k); ctx.fillStyle = COLORS.ink; ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    lines.forEach((l, i) => {
      ctx.font = `${l.b ? 700 : 600} ${size}px ${FONT}`;
      ctx.fillStyle = l.c ?? '#fff';
      ctx.fillText(l.t, x + pad, y + pad + lh * i + lh / 2 - 2 * k);
    });
  }

  /* ── watermark ── */
  if (opts.watermark) chip(ctx, opts.watermark, W - 8 * k, H - 12 * k, k, { size: 10, align: 'right', pad: 5, bg: 'rgba(16,21,31,0.7)' });
}

/** Renders photo + overlay at full image resolution and returns a JPEG data URL. */
export function renderAnnotated(photo: CanvasImageSource, design: Design, est: Estimate, watermark: string, kitLabel: string | null, maxEdge = 1600): string {
  const { w, h } = design.image;
  const s = Math.min(1, maxEdge / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * s);
  canvas.height = Math.round(h * s);
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
  const k = Math.max(0.9, canvas.width / 900);
  drawOverlay(ctx, design, est, { scale: s, k, showGrid: true, showLengths: true, mode: 'view', summary: true, legend: true, watermark, kitLabel });
  return canvas.toDataURL('image/jpeg', 0.86);
}
