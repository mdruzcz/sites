// 3D pixel props built in code: mega tree, house roofline, wrapped deciduous tree,
// evergreen spiral and walk-through arch. World units are metres, y is up and +z
// points at the viewer. Every prop carries a Geom (strand, angle, height per pixel)
// so all of the app's patterns and music looks run on it unchanged.

import { customGeom, geom, mulberry32, TAU, type Geom } from "./core";

export type Vec3 = [number, number, number];
export type PropKind = "mega" | "roof" | "deciduous" | "evergreen" | "arch";

export type Prim =
  | { t: "poly"; pts: number[]; fill: string; stroke?: string; layer?: number }
  | { t: "line"; pts: number[]; w: number; c: string; layer?: number }
  | { t: "cone"; x: number; z: number; y0: number; hgt: number; r: number; fill: string; layer?: number }
  /** Audience silhouettes: x, z, height, width, seed per person. Drawn in front of the lights. */
  | { t: "crowd"; people: number[] }
  /** Searchlight beam from a point, coloured by one of the prop's pixels. */
  | { t: "beam"; x: number; y: number; z: number; idx: number; phase: number; len: number; spread: number };

export interface Prop {
  key: string;
  kind: PropKind;
  g: Geom;
  /** xyz per pixel. */
  pos: Float32Array;
  /** Outward normal per pixel, for wraps whose back side is hidden by the branch or foliage. */
  nrm?: Float32Array;
  backDim: number;
  cx: number;
  cz: number;
  radius: number;
  top: number;
  prims: Prim[];
  star?: Vec3;
  /** Controller box on the ground; it does not spin with the prop. */
  box?: Vec3;
  /** Mega tree wiring: controller box → bottom of each strand → top of the pole. */
  wires?: { base: Int32Array; apex: Vec3 };
  spin: boolean;
  phase: number;
  /** World size of a lit pixel's core, metres. */
  pixelSize: number;
  /** Singing face: pixel indices for the eyes and the mouth, with mouth coordinates (-1..1). */
  face?: { eyes: Int32Array; mouth: Int32Array; mouthXY: Float32Array };
}

type Placement = { x?: number; z?: number; orient?: number };

/** Rotate local (lx, lz) about the placement point. orient = +π/2 turns a front-facing prop to face +x. */
function placer({ x = 0, z = 0, orient = 0 }: Placement) {
  const c = Math.cos(orient);
  const s = Math.sin(orient);
  return {
    p: (lx: number, ly: number, lz: number): Vec3 => [x + lx * c + lz * s, ly, z - lx * s + lz * c],
    v: (lx: number, ly: number, lz: number): Vec3 => [lx * c + lz * s, ly, -lx * s + lz * c],
  };
}

/** Sample points every `spacing` metres along a 3D polyline. Returns positions and the distance of each. */
function samplePolyline(pts: Vec3[], spacing: number) {
  const segLen: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay, az] = pts[i];
    const [bx, by, bz] = pts[i + 1];
    const l = Math.hypot(bx - ax, by - ay, bz - az);
    segLen.push(l);
    total += l;
  }
  const n = Math.max(2, Math.round(total / spacing));
  const out: { p: Vec3; d: number; seg: number }[] = [];
  let seg = 0;
  let segStart = 0;
  for (let j = 0; j < n; j++) {
    const d = ((j + 0.5) / n) * total;
    while (seg < segLen.length - 1 && d > segStart + segLen[seg]) {
      segStart += segLen[seg];
      seg++;
    }
    const f = segLen[seg] > 0 ? (d - segStart) / segLen[seg] : 0;
    const [ax, ay, az] = pts[seg];
    const [bx, by, bz] = pts[seg + 1];
    out.push({ p: [ax + (bx - ax) * f, ay + (by - ay) * f, az + (bz - az) * f], d, seg });
  }
  return { out, total };
}

// ---------------------------------------------------------------------------
export function megaTree(o: Placement & { height?: number; strands?: number; perStrand?: number; seed?: number; spin?: boolean; box?: boolean; key?: string }): Prop {
  const x = o.x ?? 0;
  const z = o.z ?? 0;
  const H = o.height ?? 6;
  const R = H * 0.4;
  const S = Math.max(6, o.strands ?? 16);
  const L = Math.max(10, o.perStrand ?? 44);
  const g = geom(S * L, S, false, o.seed ?? 7);
  const pos = new Float32Array(g.n * 3);
  for (let i = 0; i < g.n; i++) {
    const th = (TAU * g.si[i]) / S;
    const rr = R * (1 - g.h[i]);
    pos[i * 3] = x + rr * Math.sin(th);
    pos[i * 3 + 1] = 0.12 + g.h[i] * (H - 0.12);
    pos[i * 3 + 2] = z + rr * Math.cos(th);
  }
  const base = new Int32Array(S);
  for (let s = 0; s < S; s++) base[s] = s * L;
  return {
    key: o.key ?? `mega-${x}-${z}`,
    kind: "mega",
    g,
    pos,
    backDim: 1,
    cx: x,
    cz: z,
    radius: R,
    top: H + 0.45,
    prims: [{ t: "line", pts: [x, 0, z, x, H, z], w: 0.07, c: "rgba(90,102,138,0.55)" }],
    star: [x, H + 0.22, z],
    box: o.box === false ? undefined : [x, 0.16, z + R * 0.55],
    wires: { base, apex: [x, H, z] },
    spin: o.spin ?? true,
    phase: 0.4,
    pixelSize: 0.05,
  };
}

// ---------------------------------------------------------------------------
export function houseRoofline(
  o: Placement & { width?: number; depth?: number; wall?: number; rise?: number; gableW?: number; gableX?: number; gableRise?: number; proj?: number; spacing?: number; seed?: number; key?: string; windows?: boolean },
): Prop {
  const W2 = (o.width ?? 12) / 2;
  const D2 = (o.depth ?? 8) / 2;
  const wall = o.wall ?? 4.6;
  const ridge = wall + (o.rise ?? 2.6);
  const gW = o.gableW ?? Math.min(5, W2 * 0.85);
  const gm = o.gableX ?? W2 * 0.12;
  const gx0 = gm - gW / 2;
  const gx1 = gm + gW / 2;
  const gpeak = wall + (o.gableRise ?? 2.3);
  const P = D2 + (o.proj ?? 1.2);
  const ov = 0.35;
  const pl = placer(o);

  // The light run, one continuous chain: left gable (back→front), left eave, front gable, right eave, right gable.
  const runs: Vec3[][] = [
    [[-W2, wall, -D2], [-W2, ridge, 0], [-W2, wall, D2]],
    [[-W2, wall, D2], [gx0, wall, D2], [gx0, wall, P]],
    [[gx0, wall, P], [gm, gpeak, P], [gx1, wall, P]],
    [[gx1, wall, P], [gx1, wall, D2], [W2, wall, D2]],
    [[W2, wall, D2], [W2, ridge, 0], [W2, wall, -D2]],
  ];
  const spacing = o.spacing ?? 0.14;
  const top = Math.max(ridge, gpeak);
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  const posL: number[] = [];
  const nrmL: number[] = [];
  let runStart = 0;
  const lens = runs.map((r) => samplePolyline(r, spacing).total);
  const totalLen = lens.reduce((s, l) => s + l, 0);
  runs.forEach((run, ri) => {
    const { out } = samplePolyline(run, spacing);
    for (const s of out) {
      const [lx, ly, lz] = s.p;
      // Outward from the house: side gables face ±x, eaves and the front gable face +z.
      let nx = 0;
      let nz = 1;
      if (ri === 0 || (ri === 1 && s.seg === 1)) {
        nx = -1;
        nz = 0;
      }
      if (ri === 4 || (ri === 3 && s.seg === 0)) {
        nx = 1;
        nz = 0;
      }
      const off = 0.07;
      const p = pl.p(lx + nx * off, ly + 0.05, lz + nz * off);
      const n = pl.v(nx, 0.15, nz);
      posL.push(...p);
      nrmL.push(...n);
      si.push(ri);
      aa.push((runStart + s.d) / totalLen);
      hh.push((ly - wall) / (top - wall));
    }
    runStart += lens[ri];
  });

  const flat = (pts: Vec3[]) => pts.flatMap(([a, b, c]) => pl.p(a, b, c));
  const wallC = "#18213b";
  const sideC = "#131b31";
  const roofC = "#232d4d";
  const edge = "rgba(160,180,235,0.16)";
  const prims: Prim[] = [
    // main block
    { t: "poly", pts: flat([[-W2, 0, D2], [W2, 0, D2], [W2, wall, D2], [-W2, wall, D2]]), fill: wallC, stroke: edge },
    { t: "poly", pts: flat([[-W2, 0, -D2], [-W2, 0, D2], [-W2, wall, D2], [-W2, ridge, 0], [-W2, wall, -D2]]), fill: sideC, stroke: edge },
    { t: "poly", pts: flat([[W2, 0, D2], [W2, 0, -D2], [W2, wall, -D2], [W2, ridge, 0], [W2, wall, D2]]), fill: sideC, stroke: edge },
    { t: "poly", pts: flat([[-W2 - ov, wall - 0.2, D2 + ov], [W2 + ov, wall - 0.2, D2 + ov], [W2 + ov, ridge, 0], [-W2 - ov, ridge, 0]]), fill: roofC, stroke: edge },
    { t: "poly", pts: flat([[-W2 - ov, wall - 0.2, -D2 - ov], [W2 + ov, wall - 0.2, -D2 - ov], [W2 + ov, ridge, 0], [-W2 - ov, ridge, 0]]), fill: roofC, stroke: edge },
    // front gable bump
    { t: "poly", pts: flat([[gx0, 0, D2], [gx0, 0, P], [gx0, wall, P], [gx0, wall, D2]]), fill: sideC, stroke: edge },
    { t: "poly", pts: flat([[gx1, 0, P], [gx1, 0, D2], [gx1, wall, D2], [gx1, wall, P]]), fill: sideC, stroke: edge },
    { t: "poly", pts: flat([[gx0, 0, P], [gx1, 0, P], [gx1, wall, P], [gm, gpeak, P], [gx0, wall, P]]), fill: wallC, stroke: edge },
    { t: "poly", pts: flat([[gx0 - ov * 0.6, wall - 0.15, P + ov * 0.6], [gm, gpeak + 0.05, P + ov * 0.6], [gm, gpeak + 0.05, D2 - 0.6], [gx0 - ov * 0.6, wall - 0.15, D2 - 0.6]]), fill: roofC, stroke: edge },
    { t: "poly", pts: flat([[gx1 + ov * 0.6, wall - 0.15, P + ov * 0.6], [gm, gpeak + 0.05, P + ov * 0.6], [gm, gpeak + 0.05, D2 - 0.6], [gx1 + ov * 0.6, wall - 0.15, D2 - 0.6]]), fill: roofC, stroke: edge },
  ];

  if (o.windows !== false) {
    const warm = "rgba(255,170,88,0.34)";
    const frame = "rgba(255,206,150,0.3)";
    const win = (cx: number, y0: number, w: number, hgt: number, zf: number) =>
      prims.push({ t: "poly", pts: flat([[cx - w / 2, y0, zf], [cx + w / 2, y0, zf], [cx + w / 2, y0 + hgt, zf], [cx - w / 2, y0 + hgt, zf]]), fill: warm, stroke: frame });
    const leftSpan = gx0 - -W2;
    const rightSpan = W2 - gx1;
    const lower = wall > 3.8;
    for (const f of [0.3, 0.72]) {
      if (leftSpan > 2) {
        win(-W2 + leftSpan * f, lower ? 0.9 : 0.8, 1.1, 1.3, D2 + 0.03);
        if (lower) win(-W2 + leftSpan * f, 2.9, 1.1, 1.1, D2 + 0.03);
      }
      if (rightSpan > 2) {
        win(gx1 + rightSpan * f, lower ? 0.9 : 0.8, 1.1, 1.3, D2 + 0.03);
        if (lower) win(gx1 + rightSpan * f, 2.9, 1.1, 1.1, D2 + 0.03);
      }
    }
    // door and the window above it
    prims.push({ t: "poly", pts: flat([[gm - 0.55, 0, P + 0.03], [gm + 0.55, 0, P + 0.03], [gm + 0.55, 2.2, P + 0.03], [gm - 0.55, 2.2, P + 0.03]]), fill: "rgba(70,48,36,0.9)", stroke: frame });
    if (lower) win(gm, 2.9, 1.3, 1.1, P + 0.03);
  }

  const c = pl.p(0, 0, 0);
  const g = customGeom(si, aa, hh, runs.length, o.seed ?? 11);
  return {
    key: o.key ?? `roof-${c[0]}-${c[2]}`,
    kind: "roof",
    g,
    pos: Float32Array.from(posL),
    nrm: Float32Array.from(nrmL),
    backDim: 0.12,
    cx: c[0],
    cz: c[2],
    radius: Math.hypot(W2, P),
    top: top + 0.3,
    prims,
    spin: false,
    phase: 0,
    pixelSize: 0.055,
  };
}

// ---------------------------------------------------------------------------
type Branch = { p: Vec3; d: Vec3; len: number; r: number; depth: number };

const norm = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function basis(d: Vec3): [Vec3, Vec3] {
  const ref: Vec3 = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = norm(cross(d, ref));
  const v = norm(cross(d, u));
  return [u, v];
}

export function deciduousTree(o: Placement & { height?: number; seed?: number; spacing?: number; pitch?: number; spin?: boolean; key?: string }): Prop {
  const x = o.x ?? 0;
  const z = o.z ?? 0;
  const H = o.height ?? 7;
  const rnd = mulberry32(o.seed ?? 5);
  const branches: Branch[] = [];
  const grow = (b: Branch) => {
    branches.push(b);
    if (b.depth >= 3) return;
    const kids = b.depth === 0 ? 4 : b.depth === 1 ? 3 : 2;
    const [u, v] = basis(b.d);
    const az0 = rnd() * TAU;
    for (let k = 0; k < kids; k++) {
      const az = az0 + (k / kids) * TAU + (rnd() - 0.5) * 0.6;
      const el = b.depth === 0 ? 0.78 + rnd() * 0.22 : 0.5 + rnd() * 0.3;
      const side: Vec3 = [u[0] * Math.cos(az) + v[0] * Math.sin(az), u[1] * Math.cos(az) + v[1] * Math.sin(az), u[2] * Math.cos(az) + v[2] * Math.sin(az)];
      // bias every branch gently upward so the crown reads as a tree
      const d = norm([
        b.d[0] * Math.cos(el) + side[0] * Math.sin(el),
        b.d[1] * Math.cos(el) + side[1] * Math.sin(el) + 0.1,
        b.d[2] * Math.cos(el) + side[2] * Math.sin(el),
      ]);
      const at = b.depth === 0 ? 0.82 + rnd() * 0.18 : 0.65 + rnd() * 0.35;
      const p: Vec3 = [b.p[0] + b.d[0] * b.len * at, b.p[1] + b.d[1] * b.len * at, b.p[2] + b.d[2] * b.len * at];
      grow({ p, d, len: b.len * (b.depth === 0 ? 1.05 : 0.68 + rnd() * 0.12), r: b.r * 0.58, depth: b.depth + 1 });
    }
  };
  grow({ p: [x, 0, z], d: [0, 1, 0], len: H * 0.34, r: 0.17, depth: 0 });

  const spacing = o.spacing ?? 0.11;
  const pitch = o.pitch ?? 0.32;
  const posL: number[] = [];
  const nrmL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hy: number[] = [];
  const prims: Prim[] = [];
  let maxY = 0;
  let maxR = 0.5;
  branches.forEach((b, bi) => {
    const end: Vec3 = [b.p[0] + b.d[0] * b.len, b.p[1] + b.d[1] * b.len, b.p[2] + b.d[2] * b.len];
    prims.push({ t: "line", pts: [...b.p, ...end], w: Math.max(0.03, b.r * 2), c: b.depth >= 3 ? "rgba(70,62,58,0.45)" : "rgba(72,62,56,0.95)" });
    maxY = Math.max(maxY, end[1]);
    maxR = Math.max(maxR, Math.hypot(end[0] - x, end[2] - z));
    if (b.depth >= 3) return; // twigs are drawn, not wrapped
    const rw = b.r + 0.035;
    const k = Math.sqrt(1 + Math.pow((TAU * rw) / pitch, 2));
    const count = Math.max(4, Math.floor((b.len * k) / spacing));
    const [u, v] = basis(b.d);
    const ph = rnd() * TAU;
    for (let j = 0; j < count; j++) {
      const s = ((j + 0.5) / count) * b.len;
      const phi = (TAU * s) / pitch + ph;
      const cn = Math.cos(phi);
      const sn = Math.sin(phi);
      const nx = u[0] * cn + v[0] * sn;
      const ny = u[1] * cn + v[1] * sn;
      const nz = u[2] * cn + v[2] * sn;
      const px = b.p[0] + b.d[0] * s + rw * nx;
      const py = b.p[1] + b.d[1] * s + rw * ny;
      const pz = b.p[2] + b.d[2] * s + rw * nz;
      posL.push(px, py, pz);
      nrmL.push(nx, ny, nz);
      si.push(bi);
      aa.push((Math.atan2(px - x, pz - z) / TAU + 1) % 1);
      hy.push(py);
    }
  });
  const S = Math.min(24, branches.filter((b) => b.depth < 3).length);
  const g = customGeom(
    si.map((s) => s % S),
    aa,
    hy.map((y) => y / maxY),
    S,
    o.seed ?? 5,
  );
  return {
    key: o.key ?? `decid-${x}-${z}`,
    kind: "deciduous",
    g,
    pos: Float32Array.from(posL),
    nrm: Float32Array.from(nrmL),
    backDim: 0.4,
    cx: x,
    cz: z,
    radius: maxR,
    top: maxY + 0.2,
    prims,
    spin: o.spin ?? false,
    phase: 0,
    pixelSize: 0.045,
  };
}

// ---------------------------------------------------------------------------
export function evergreen(o: Placement & { height?: number; radius?: number; turns?: number; spacing?: number; seed?: number; spin?: boolean; star?: boolean; key?: string }): Prop {
  const x = o.x ?? 0;
  const z = o.z ?? 0;
  const H = o.height ?? 4.2;
  const R = o.radius ?? H * 0.36;
  const T = o.turns ?? 7;
  const y0 = 0.3;
  const ph0 = (o.seed ?? 3) * 1.7;
  const at = (f: number): Vec3 => {
    const phi = T * TAU * f + ph0;
    const rr = R * (1 - f) * 0.98 + 0.07;
    return [x + rr * Math.sin(phi), y0 + f * (H - y0 - 0.1), z + rr * Math.cos(phi)];
  };
  // even spacing by arc length
  const STEPS = 600;
  const cum = [0];
  let prev = at(0);
  for (let i = 1; i <= STEPS; i++) {
    const p = at(i / STEPS);
    cum.push(cum[i - 1] + Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]));
    prev = p;
  }
  const total = cum[STEPS];
  const n = Math.max(20, Math.floor(total / (o.spacing ?? 0.12)));
  const posL: number[] = [];
  const nrmL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  let k = 0;
  for (let j = 0; j < n; j++) {
    const d = ((j + 0.5) / n) * total;
    while (k < STEPS - 1 && cum[k + 1] < d) k++;
    const f = (k + (d - cum[k]) / Math.max(1e-6, cum[k + 1] - cum[k])) / STEPS;
    const p = at(f);
    const phi = T * TAU * f + ph0;
    posL.push(...p);
    const nn = norm([Math.sin(phi), 0.35, Math.cos(phi)]);
    nrmL.push(...nn);
    si.push(Math.min(T - 1, Math.floor(f * T)));
    aa.push(((phi / TAU) % 1 + 1) % 1);
    hh.push(f);
  }
  return {
    key: o.key ?? `ever-${x}-${z}`,
    kind: "evergreen",
    g: customGeom(si, aa, hh, T, o.seed ?? 3),
    pos: Float32Array.from(posL),
    nrm: Float32Array.from(nrmL),
    backDim: 0.16,
    cx: x,
    cz: z,
    radius: R + 0.1,
    top: H + (o.star ? 0.4 : 0.1),
    prims: [
      { t: "line", pts: [x, 0, z, x, y0 + 0.1, z], w: 0.2, c: "rgba(52,40,32,0.95)" },
      { t: "cone", x, z, y0, hgt: H - y0, r: R, fill: "rgba(12,32,25,0.94)" },
    ],
    star: o.star ? [x, H + 0.12, z] : undefined,
    spin: o.spin ?? false,
    phase: 0,
    pixelSize: 0.045,
  };
}

// ---------------------------------------------------------------------------
export function pixelArch(o: Placement & { span?: number; height?: number; spacing?: number; seed?: number; key?: string }): Prop {
  const span = o.span ?? 4;
  const H = o.height ?? 2.7;
  const pl = placer(o);
  const curve: Vec3[] = [];
  for (let i = 0; i <= 48; i++) {
    const th = Math.PI - (i / 48) * Math.PI;
    curve.push([(span / 2) * Math.cos(th), H * Math.sin(th), 0]);
  }
  const { out } = samplePolyline(curve, o.spacing ?? 0.1);
  const posL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  out.forEach((s, j) => {
    posL.push(...pl.p(s.p[0], s.p[1] + 0.04, s.p[2]));
    si.push(s.p[0] < 0 ? 0 : 1);
    aa.push(j / out.length);
    hh.push(s.p[1] / H);
  });
  const frame = curve.flatMap(([a, b, c]) => pl.p(a, b, c));
  const c = pl.p(0, 0, 0);
  return {
    key: o.key ?? `arch-${c[0]}-${c[2]}`,
    kind: "arch",
    g: customGeom(si, aa, hh, 2, o.seed ?? 9),
    pos: Float32Array.from(posL),
    backDim: 1,
    cx: c[0],
    cz: c[2],
    radius: span / 2,
    top: H + 0.2,
    prims: [{ t: "line", pts: frame, w: 0.05, c: "rgba(110,122,160,0.4)" }],
    spin: false,
    phase: 0,
    pixelSize: 0.045,
  };
}

// ---------------------------------------------------------------------------
/**
 * The control system on its own (the Starter Kit): a weatherproof enclosure on a
 * post with the USB microphone on top, and a pre-wired pigtail on every output
 * fanning out across the ground, each ending in a short lit test string.
 */
export function controllerKit(o: Placement & { outputs?: number; key?: string; seed?: number }): Prop {
  const N = Math.max(4, o.outputs ?? 16);
  const pl = placer(o);
  const W = 0.62;
  const Hh = 0.44;
  const D = 0.24;
  const y0 = 0.75;
  const x0 = -W / 2;
  const x1 = W / 2;
  const z0 = -D / 2;
  const z1 = D / 2;
  const y1 = y0 + Hh;
  const flat = (pts: Vec3[]) => pts.flatMap(([a, b, c]) => pl.p(a, b, c));
  const edge = "rgba(170,190,240,0.22)";
  const prims: Prim[] = [
    { t: "line", pts: flat([[0, 0, -0.06], [0, y0, -0.06]]), w: 0.08, c: "rgba(78,88,112,0.9)" },
    { t: "line", pts: flat([[-0.24, y0, -0.06], [-0.42, 0.02, -0.35], [-1.3, 0.02, -0.7]]), w: 0.016, c: "rgba(46,48,58,0.95)" },
    { t: "poly", pts: flat([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]]), fill: "#1b233c", stroke: edge },
    { t: "poly", pts: flat([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]]), fill: "#1b233c", stroke: edge },
    { t: "poly", pts: flat([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]), fill: "#2c385a", stroke: edge },
    { t: "poly", pts: flat([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]), fill: "#232c49", stroke: edge },
    // status display and LED on the door
    { t: "poly", pts: flat([[-0.21, y0 + 0.25, z1 + 0.006], [-0.05, y0 + 0.25, z1 + 0.006], [-0.05, y0 + 0.33, z1 + 0.006], [-0.21, y0 + 0.33, z1 + 0.006]]), fill: "rgba(76,201,240,0.6)" },
    { t: "poly", pts: flat([[0.02, y0 + 0.3, z1 + 0.006], [0.04, y0 + 0.3, z1 + 0.006], [0.04, y0 + 0.32, z1 + 0.006], [0.02, y0 + 0.32, z1 + 0.006]]), fill: "#3ddc84" },
    // USB microphone on a short gooseneck
    { t: "line", pts: flat([[0.2, y1, 0], [0.21, y1 + 0.1, 0.02], [0.24, y1 + 0.17, 0.05]]), w: 0.012, c: "rgba(150,160,190,0.95)" },
    { t: "line", pts: flat([[0.24, y1 + 0.17, 0.05], [0.255, y1 + 0.24, 0.06]]), w: 0.045, c: "rgba(28,30,40,1)" },
  ];

  const posL: number[] = [];
  const si: number[] = [];
  const aa: number[] = [];
  const hh: number[] = [];
  const PER = 8;
  for (let k = 0; k < N; k++) {
    const f = k / (N - 1);
    const th = -1.3 + 2.6 * f;
    const reach = 1.55 + (k % 2) * 0.2;
    const p0: Vec3 = [x0 + 0.06 + (W - 0.12) * f, y0, 0.02];
    const p1: Vec3 = [p0[0] * 1.15, 0.28, 0.2];
    const g0: Vec3 = [Math.sin(th) * 0.5, 0.03, 0.18 + Math.cos(th) * 0.45];
    const e: Vec3 = [Math.sin(th) * reach, 0.03, 0.18 + Math.cos(th) * reach * 0.85];
    prims.push({ t: "line", pts: flat([p0, p1, g0, e]), w: 0.014, c: "rgba(62,68,88,0.95)" });
    for (let j = 0; j < PER; j++) {
      const t = 0.3 + (0.7 * j) / (PER - 1);
      const p = pl.p(g0[0] + (e[0] - g0[0]) * t, 0.06, g0[2] + (e[2] - g0[2]) * t);
      posL.push(...p);
      si.push(k);
      aa.push(f);
      hh.push(j / (PER - 1));
    }
  }
  const c = pl.p(0, 0, 0);
  return {
    key: o.key ?? `ctrl-${c[0]}-${c[2]}`,
    kind: "mega",
    g: customGeom(si, aa, hh, N, o.seed ?? 13),
    pos: Float32Array.from(posL),
    backDim: 1,
    cx: c[0],
    cz: c[2],
    radius: 1.8,
    top: y1 + 0.3,
    prims,
    spin: false,
    phase: 0,
    pixelSize: 0.028,
  };
}
