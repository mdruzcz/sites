// Props for a stage-facing show, built in code: the pavilion stage (gable
// outline, column verticals, searchlights), pixel snowflakes, candy canes,
// singing trees with faces, and the audience. Everything faces +z, toward the crowd.

import { customGeom, mulberry32, TAU } from "./core";
import type { Prim, Prop, Vec3 } from "./props";

const emptyGeom = () => customGeom([], [], [], 1);

/** Even samples along a 2D path in the x-y plane at depth z. */
function along(path: [number, number][], spacing: number) {
  const seg: number[] = [];
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const l = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
    seg.push(l);
    total += l;
  }
  const n = Math.max(2, Math.round(total / spacing));
  const out: { x: number; y: number; f: number }[] = [];
  let k = 0;
  let start = 0;
  for (let j = 0; j < n; j++) {
    const d = ((j + 0.5) / n) * total;
    while (k < seg.length - 1 && d > start + seg[k]) {
      start += seg[k];
      k++;
    }
    const t = seg[k] ? (d - start) / seg[k] : 0;
    out.push({ x: path[k][0] + (path[k + 1][0] - path[k][0]) * t, y: path[k][1] + (path[k + 1][1] - path[k][1]) * t, f: d / total });
  }
  return out;
}

// ---------------------------------------------------------------------------
/** The pavilion: a hall with a gabled stage porch. `lit` adds the pixel outline, column verticals and searchlights. */
export function stage(o: { x?: number; z?: number; lit?: boolean; spacing?: number; key?: string; ground?: boolean }): Prop {
  const X = o.x ?? 0;
  const Z = o.z ?? 0;
  const P = (x: number, y: number, z: number): Vec3 => [X + x, y, Z + z];
  const flat = (pts: [number, number, number][]) => pts.flatMap(([a, b, c]) => P(a, b, c));
  const W2 = 8;
  const hallFront = 3.5;
  const hallBack = -3.5;
  const wall = 3.8;
  const ridge = 5.5;
  const pw = 4.5; // porch half-width
  const pz = 6; // porch front
  const eave = 3.9;
  const peak = 7.2;
  const floor = 0.6;
  const edge = "rgba(170,190,240,0.16)";
  const prims: Prim[] = [];
  if (o.ground !== false) {
    prims.push({ t: "poly", layer: -1, pts: flat([[-60, 0, -30], [60, 0, -30], [60, 0, 40], [-60, 0, 40]]), fill: "#0b1020" });
  }
  prims.push(
    // hall
    { t: "poly", pts: flat([[-W2, 0, hallFront], [W2, 0, hallFront], [W2, wall, hallFront], [-W2, wall, hallFront]]), fill: "#1a2138", stroke: edge },
    { t: "poly", pts: flat([[-W2 - 0.3, wall - 0.1, hallFront + 0.3], [W2 + 0.3, wall - 0.1, hallFront + 0.3], [W2 + 0.3, ridge, 0], [-W2 - 0.3, ridge, 0]]), fill: "#2a3150", stroke: edge },
    { t: "poly", pts: flat([[-W2, 0, hallBack], [-W2, 0, hallFront], [-W2, wall, hallFront], [-W2, ridge, 0], [-W2, wall, hallBack]]), fill: "#161c30", stroke: edge },
    { t: "poly", pts: flat([[W2, 0, hallFront], [W2, 0, hallBack], [W2, wall, hallBack], [W2, ridge, 0], [W2, wall, hallFront]]), fill: "#161c30", stroke: edge },
    // windows on the hall
    { t: "poly", pts: flat([[-6.9, 1.2, hallFront + 0.02], [-5.9, 1.2, hallFront + 0.02], [-5.9, 2.5, hallFront + 0.02], [-6.9, 2.5, hallFront + 0.02]]), fill: "rgba(255,190,110,0.22)", stroke: "rgba(255,220,170,0.3)" },
    { t: "poly", pts: flat([[5.9, 1.2, hallFront + 0.02], [6.9, 1.2, hallFront + 0.02], [6.9, 2.5, hallFront + 0.02], [5.9, 2.5, hallFront + 0.02]]), fill: "rgba(255,190,110,0.22)", stroke: "rgba(255,220,170,0.3)" },
    // stage platform and steps
    { t: "poly", pts: flat([[-pw, 0, pz + 0.3], [pw, 0, pz + 0.3], [pw, floor, pz + 0.3], [-pw, floor, pz + 0.3]]), fill: "#20283f", stroke: edge },
    { t: "poly", pts: flat([[-pw, floor, hallFront], [pw, floor, hallFront], [pw, floor, pz + 0.3], [-pw, floor, pz + 0.3]]), fill: "#2b3350" },
    { t: "poly", pts: flat([[-1.6, 0, pz + 0.9], [1.6, 0, pz + 0.9], [1.6, floor * 0.5, pz + 0.9], [-1.6, floor * 0.5, pz + 0.9]]), fill: "#252d47", stroke: edge },
    // warm-lit stage backdrop with silhouettes
    { t: "poly", pts: flat([[-pw + 0.2, floor, hallFront + 0.03], [pw - 0.2, floor, hallFront + 0.03], [pw - 0.2, eave - 0.15, hallFront + 0.03], [-pw + 0.2, eave - 0.15, hallFront + 0.03]]), fill: "rgba(255,186,72,0.92)" },
    { t: "poly", pts: flat([[-3.6, floor, hallFront + 0.05], [-2.9, 3.2, hallFront + 0.05], [-2.2, floor, hallFront + 0.05]]), fill: "rgba(120,72,20,0.85)" },
    { t: "poly", pts: flat([[2.2, floor, hallFront + 0.05], [2.9, 3.3, hallFront + 0.05], [3.6, floor, hallFront + 0.05]]), fill: "rgba(120,72,20,0.85)" },
    { t: "poly", pts: flat([[-1.1, floor, hallFront + 0.05], [0, 2.3, hallFront + 0.05], [1.1, floor, hallFront + 0.05], [0.8, floor, hallFront + 0.05], [0, 1.9, hallFront + 0.05], [-0.8, floor, hallFront + 0.05]]), fill: "rgba(120,72,20,0.85)" },
    // porch gable roof and face
    { t: "poly", pts: flat([[-pw - 0.4, eave - 0.1, pz + 0.4], [0, peak + 0.15, pz + 0.4], [0, peak + 0.15, hallFront - 0.5], [-pw - 0.4, eave - 0.1, hallFront - 0.5]]), fill: "#2f3858", stroke: edge },
    { t: "poly", pts: flat([[pw + 0.4, eave - 0.1, pz + 0.4], [0, peak + 0.15, pz + 0.4], [0, peak + 0.15, hallFront - 0.5], [pw + 0.4, eave - 0.1, hallFront - 0.5]]), fill: "#2f3858", stroke: edge },
    { t: "poly", pts: flat([[-pw, eave, pz], [pw, eave, pz], [0, peak, pz]]), fill: "#3a2630", stroke: "rgba(240,240,255,0.35)" },
    { t: "poly", pts: flat([[-pw, eave - 0.45, pz], [pw, eave - 0.45, pz], [pw, eave, pz], [-pw, eave, pz]]), fill: "#d9dbe6", stroke: edge },
  );
  const cols = [-4.25, -1.45, 1.45, 4.25];
  for (const cx of cols) prims.push({ t: "line", pts: flat([[cx, floor, pz - 0.1], [cx, eave - 0.45, pz - 0.1]]), w: 0.22, c: "rgba(225,228,240,0.9)" });

  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  const pos: number[] = [];
  if (o.lit) {
    const sp = o.spacing ?? 0.12;
    const runs: [number, number][][] = [
      [[-pw - 0.15, eave - 0.05], [0, peak + 0.2], [pw + 0.15, eave - 0.05]],
      [[-pw - 0.15, eave - 0.5], [pw + 0.15, eave - 0.5]],
    ];
    runs.forEach((run, ri) => {
      for (const s of along(run, sp)) {
        pos.push(...P(s.x, s.y, pz + 0.12));
        si.push(ri);
        aa.push((s.x + pw) / (2 * pw));
        hh.push((s.y - (eave - 0.6)) / (peak + 0.2 - (eave - 0.6)));
      }
    });
    // pixel verticals on the columns
    cols.forEach((cx, ci) => {
      for (const s of along([[cx, floor + 0.1], [cx, eave - 0.6]], sp * 0.8)) {
        pos.push(...P(cx, s.y, pz + 0.02));
        si.push(2 + ci);
        aa.push((cx + pw) / (2 * pw));
        hh.push((s.y - floor) / (eave - floor));
      }
    });
    const peakIdx = Math.round(runs[0].length ? along(runs[0], sp).length / 2 : 0);
    prims.push(
      { t: "beam", x: X - 6.5, y: wall + 1.6, z: Z, idx: peakIdx, phase: 0.2, len: 26, spread: 0.06 },
      { t: "beam", x: X + 6.5, y: wall + 1.6, z: Z, idx: peakIdx, phase: 2.3, len: 26, spread: 0.06 },
      { t: "beam", x: X - 2.5, y: peak, z: Z + 1, idx: 0, phase: 4.1, len: 24, spread: 0.05 },
      { t: "beam", x: X + 2.5, y: peak, z: Z + 1, idx: 0, phase: 5.6, len: 24, spread: 0.05 },
    );
  }
  return {
    key: o.key ?? "stage",
    kind: "roof",
    g: pos.length ? customGeom(si, aa, hh, 6, 17) : emptyGeom(),
    pos: Float32Array.from(pos),
    backDim: 1,
    cx: X,
    cz: Z + 1,
    radius: W2,
    top: peak + 0.6,
    prims,
    spin: false,
    phase: 0,
    pixelSize: 0.055,
  };
}

// ---------------------------------------------------------------------------
export function snowflake(o: { x: number; y: number; z: number; r: number; key?: string; seed?: number }): Prop {
  const posL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  const sp = Math.max(0.05, o.r / 7);
  const prims: Prim[] = [];
  for (let k = 0; k < 6; k++) {
    const th = (k / 6) * TAU + Math.PI / 2;
    const dx = Math.cos(th);
    const dy = Math.sin(th);
    const arm: [number, number][] = [[0, 0], [dx * o.r, dy * o.r]];
    const pts = along(arm, sp);
    for (const s of pts) {
      posL.push(o.x + s.x, o.y + s.y, o.z);
      si.push(k);
      aa.push(k / 6);
      hh.push(Math.hypot(s.x, s.y) / o.r);
    }
    for (const side of [-1, 1]) {
      const bx = dx * o.r * 0.55;
      const by = dy * o.r * 0.55;
      const a2 = th + side * 0.85;
      const branch: [number, number][] = [[bx, by], [bx + Math.cos(a2) * o.r * 0.32, by + Math.sin(a2) * o.r * 0.32]];
      for (const s of along(branch, sp)) {
        posL.push(o.x + s.x, o.y + s.y, o.z);
        si.push(k);
        aa.push(k / 6);
        hh.push(Math.hypot(s.x, s.y) / o.r);
      }
    }
    prims.push({ t: "line", pts: [o.x, o.y, o.z - 0.01, o.x + dx * o.r, o.y + dy * o.r, o.z - 0.01], w: 0.03, c: "rgba(200,210,235,0.25)" });
  }
  return {
    key: o.key ?? `flake-${o.x}-${o.y}`,
    kind: "arch",
    g: customGeom(si, aa, hh, 6, o.seed ?? 23),
    pos: Float32Array.from(posL),
    backDim: 1,
    cx: o.x,
    cz: o.z,
    radius: o.r,
    top: o.y + o.r,
    prims,
    spin: false,
    phase: 0,
    pixelSize: Math.min(0.05, 0.03 + o.r * 0.025),
  };
}

// ---------------------------------------------------------------------------
export function candyCane(o: { x: number; z: number; height?: number; mirror?: boolean; key?: string; seed?: number }): Prop {
  const H = o.height ?? 1.5;
  const R = H * 0.2;
  const m = o.mirror ? -1 : 1;
  const path: [number, number][] = [[0, 0.05], [0, H - R]];
  for (let i = 1; i <= 16; i++) {
    const a = Math.PI - (i / 16) * Math.PI;
    path.push([m * (R + R * Math.cos(a)), H - R + R * Math.sin(a)]);
  }
  path.push([m * 2 * R, H - R * 1.6]);
  const pts = along(path, 0.07);
  const posL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  for (const s of pts) {
    posL.push(o.x + s.x, s.y, o.z);
    si.push(0);
    aa.push(s.f);
    hh.push(s.f);
  }
  return {
    key: o.key ?? `cane-${o.x}-${o.z}`,
    kind: "arch",
    g: customGeom(si, aa, hh, 1, o.seed ?? 31),
    pos: Float32Array.from(posL),
    backDim: 1,
    cx: o.x,
    cz: o.z,
    radius: 0.6,
    top: H + 0.1,
    prims: [{ t: "line", pts: path.flatMap(([px, py]) => [o.x + px, py, o.z - 0.02]), w: 0.05, c: "rgba(210,215,235,0.28)" }],
    spin: false,
    phase: 0,
    pixelSize: 0.04,
  };
}

// ---------------------------------------------------------------------------
/** A flat pixel tree with a face. Rows of pixels make the body; the eyes and mouth are separate pixels the painter animates. */
export function singingTree(o: { x: number; z: number; height?: number; key?: string; seed?: number }): Prop {
  const H = o.height ?? 2.6;
  const base = H * 0.36;
  const y0 = 0.35;
  const rows = 15;
  const sp = 0.1;
  const eyeY = y0 + (H - y0) * 0.56;
  const eyeX = 0.2;
  const eyeR = 0.1;
  const mouthY = y0 + (H - y0) * 0.33;
  const mRx = 0.32;
  const mRy = 0.17;
  const posL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  const eyes: number[] = [];
  const mouth: number[] = [];
  const mouthXY: number[] = [];
  const inFace = (x: number, y: number) =>
    Math.hypot(x - eyeX, y - eyeY) < eyeR + 0.08 || Math.hypot(x + eyeX, y - eyeY) < eyeR + 0.08 || (x / (mRx + 0.06)) ** 2 + ((y - mouthY) / (mRy + 0.06)) ** 2 < 1;
  const push = (x: number, y: number, s: number) => {
    posL.push(o.x + x, y, o.z);
    si.push(s);
    aa.push((x / base + 1) / 2);
    hh.push((y - y0) / (H - y0));
    return posL.length / 3 - 1;
  };
  for (let r = 0; r < rows; r++) {
    const y = y0 + ((H - y0) * r) / (rows - 1);
    const half = base * (1 - r / (rows - 1)) * 0.98;
    const n = Math.max(1, Math.round((2 * half) / sp));
    for (let k = 0; k <= n; k++) {
      const x = n ? -half + (2 * half * k) / n : 0;
      if (inFace(x, y)) continue;
      push(x, y, r % 6);
    }
  }
  for (const ex of [-eyeX, eyeX]) {
    eyes.push(push(ex, eyeY, 0));
    for (let k = 0; k < 6; k++) eyes.push(push(ex + Math.cos((k / 6) * TAU) * eyeR, eyeY + Math.sin((k / 6) * TAU) * eyeR, 0));
  }
  for (let gx = -mRx; gx <= mRx + 1e-6; gx += 0.08) {
    for (let gy = -mRy; gy <= mRy + 1e-6; gy += 0.07) {
      const nx = gx / mRx;
      const ny = gy / mRy;
      if (nx * nx + ny * ny > 1.05) continue;
      mouth.push(push(gx, mouthY + gy, 0));
      mouthXY.push(nx, ny);
    }
  }
  return {
    key: o.key ?? `sing-${o.x}-${o.z}`,
    kind: "evergreen",
    g: customGeom(si, aa, hh, 6, o.seed ?? 41),
    pos: Float32Array.from(posL),
    backDim: 1,
    cx: o.x,
    cz: o.z,
    radius: base,
    top: H + 0.2,
    prims: [
      { t: "line", pts: [o.x, 0, o.z - 0.05, o.x, y0, o.z - 0.05], w: 0.16, c: "rgba(60,46,38,0.95)" },
      { t: "poly", pts: [o.x - base, y0, o.z - 0.04, o.x + base, y0, o.z - 0.04, o.x, H, o.z - 0.04], fill: "rgba(12,30,24,0.85)" },
    ],
    spin: false,
    phase: 0,
    pixelSize: 0.042,
    face: { eyes: Int32Array.from(eyes), mouth: Int32Array.from(mouth), mouthXY: Float32Array.from(mouthXY) },
  };
}

/** Light the eyes and an open-and-close mouth on top of whatever the body is showing. */
export function singFace(p: Prop, out: Float32Array, level: number, t: number, colour: [number, number, number]) {
  const f = p.face;
  if (!f) return;
  const { n } = p.g;
  for (let i = 0; i < n * 3; i++) out[i] *= 0.55;
  const blink = (t * 0.23 + p.cx * 0.13) % 1 < 0.035;
  for (let k = 0; k < f.eyes.length; k++) {
    const j = f.eyes[k] * 3;
    const v = blink ? 0.05 : 1;
    out[j] = v;
    out[j + 1] = v;
    out[j + 2] = v;
  }
  const open = Math.max(0, Math.min(1, level * 1.5));
  for (let k = 0; k < f.mouth.length; k++) {
    const mx = f.mouthXY[k * 2];
    const my = f.mouthXY[k * 2 + 1];
    const j = f.mouth[k] * 3;
    let on: boolean;
    if (open < 0.12) on = Math.abs(my - (0.15 - 0.55 * mx * mx)) < 0.22 && Math.abs(mx) < 0.95; // closed: a smile
    else on = mx * mx + (my / (0.25 + 0.75 * open)) ** 2 <= 1;
    const v = on ? 1 : 0;
    out[j] = colour[0] * v;
    out[j + 1] = colour[1] * v;
    out[j + 2] = colour[2] * v;
  }
}

// ---------------------------------------------------------------------------
/** The crowd watching, backs to the camera. */
export function audience(o: { z0: number; z1: number; halfWidth: number; count: number; seed?: number; key?: string }): Prop {
  const rnd = mulberry32(o.seed ?? 77);
  const people: number[] = [];
  for (let k = 0; k < o.count; k++) {
    const z = o.z0 + rnd() * (o.z1 - o.z0);
    const spreadAt = o.halfWidth * (0.75 + 0.35 * ((z - o.z0) / Math.max(0.1, o.z1 - o.z0)));
    const x = (rnd() * 2 - 1) * spreadAt;
    const child = rnd() < 0.22;
    const h = child ? 1.0 + rnd() * 0.3 : 1.55 + rnd() * 0.32;
    const w = child ? 0.38 : 0.5 + rnd() * 0.12;
    people.push(x, z, h, w, rnd());
  }
  return {
    key: o.key ?? "audience",
    kind: "arch",
    g: emptyGeom(),
    pos: new Float32Array(0),
    backDim: 1,
    cx: 0,
    cz: (o.z0 + o.z1) / 2,
    radius: o.halfWidth,
    top: 2,
    prims: [{ t: "crowd", people }],
    spin: false,
    phase: 0,
    pixelSize: 0.04,
  };
}

/** Snowy ground for scenes without the stage. */
export function groundPlane(key = "ground"): Prop {
  return {
    key,
    kind: "arch",
    g: emptyGeom(),
    pos: new Float32Array(0),
    backDim: 1,
    cx: 0,
    cz: 0,
    radius: 1,
    top: 0,
    prims: [{ t: "poly", layer: -1, pts: [-60, 0, -30, 60, 0, -30, 60, 0, 40, -60, 0, 40], fill: "#0b1020" }],
    spin: false,
    phase: 0,
    pixelSize: 0.04,
  };
}
