// Canvas renderer for the 3D pixel props. The drawing follows tree.js's TreeView:
// a night-sky gradient, faint dots for dark pixels, an additive halo plus a solid
// core for lit ones (gamma 0.6, shaded by depth), wires from the controller box
// to every strand, and a warm star on top. It adds solid structure (houses,
// branches, foliage), camera sway and perspective so other props read in 3D.

import { clamp, mulberry32, TAU } from "./core";
import type { Prop, Prim } from "./props";
import type { Camera } from "./scenes";

const POW06 = new Float32Array(256);
for (let i = 0; i < 256; i++) POW06[i] = Math.pow(i / 255, 0.6);
const p06 = (x: number) => POW06[x <= 0 ? 0 : x >= 1 ? 255 : (x * 255) | 0];

type Fit = { scale: number; ox: number; oy: number };

export type Painter = (prop: Prop, out: Float32Array, index: number) => void;

export class SceneRenderer {
  private cv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private W = 0;
  private H = 0;
  private maxDpr: number;
  readonly mini: boolean;
  reduced: boolean;
  camera: Camera;
  props: Prop[] = [];
  private bufs: Float32Array[] = [];
  private disp: Float32Array[] = [];
  private born = new Map<string, number>();
  private known = new Set<string>();
  /** 0 = show patterns as computed; >0 = the engine's anti-flicker smoothing. */
  smoothing = 0;
  private clock = 0;
  private rot = 0;
  private swayT = 0;
  private fit: Fit | null = null;
  private target: Fit | null = null;
  private centre = { x: 0, y: 0, z: 0, D: 0 };
  private fitKey = "";
  private stars: { x: number; y: number; r: number; p: number }[] = [];
  private sky: CanvasGradient | null = null;
  private slow = 0;

  constructor(canvas: HTMLCanvasElement, opts: { camera: Camera; mini?: boolean; reduced?: boolean; maxDpr?: number }) {
    this.cv = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D is not available");
    this.ctx = ctx;
    this.camera = opts.camera;
    this.mini = !!opts.mini;
    this.reduced = !!opts.reduced;
    this.maxDpr = opts.maxDpr ?? 2;
    const rnd = mulberry32(19);
    this.stars = Array.from({ length: this.mini ? 40 : 90 }, () => ({ x: rnd(), y: rnd() * 0.62, r: 0.35 + rnd() * 0.9, p: rnd() * TAU }));
  }

  /** Swap the props. New keys grow in from the bottom when `animate` is set. */
  setProps(props: Prop[], camera?: Camera, animate = false) {
    if (camera) this.camera = camera;
    const prev = new Map(this.props.map((p, i) => [p.key, this.disp[i]]));
    this.props = props;
    this.bufs = props.map((p) => new Float32Array(p.g.n * 3));
    this.disp = props.map((p) => {
      const old = prev.get(p.key);
      return old && old.length === p.g.n * 3 ? old : new Float32Array(p.g.n * 3);
    });
    for (const p of props) {
      if (animate && !this.known.has(p.key)) this.born.set(p.key, this.clock);
      this.known.add(p.key);
    }
    if (!animate) this.born.clear();
    this.fitKey = "";
    if (!animate) this.fit = null;
  }

  private resize(): boolean {
    const w = this.cv.clientWidth;
    const h = this.cv.clientHeight;
    if (!w || !h) return false;
    const dpr = Math.min(this.maxDpr, window.devicePixelRatio || 1);
    const Wp = Math.min(4096, Math.round(w * dpr));
    const Hp = Math.min(4096, Math.round(h * dpr));
    if (this.cv.width !== Wp || this.cv.height !== Hp) {
      this.cv.width = Wp;
      this.cv.height = Hp;
      this.sky = null;
      this.fitKey = "";
    }
    this.dpr = dpr;
    this.W = w;
    this.H = h;
    return true;
  }

  // ---------- camera ----------
  private yaw() {
    const c = this.camera;
    if (!c.sway || this.reduced) return c.yaw;
    return c.yaw + c.sway * Math.sin((TAU * this.swayT) / c.swayPeriod);
  }

  private computeFit() {
    const pts: number[] = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    let maxY = 0;
    const push = (x: number, y: number, z: number) => {
      pts.push(x, y, z);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
      if (y > maxY) maxY = y;
    };
    for (const p of this.props) {
      if (p.spin) {
        for (let k = 0; k < 16; k++) {
          const a = (k / 16) * TAU;
          push(p.cx + p.radius * Math.sin(a), 0, p.cz + p.radius * Math.cos(a));
        }
        push(p.cx, p.top, p.cz);
      } else {
        const step = Math.max(1, Math.floor(p.g.n / 120));
        for (let i = 0; i < p.g.n; i += step) push(p.pos[i * 3], p.pos[i * 3 + 1], p.pos[i * 3 + 2]);
        for (const pr of p.prims) {
          if (pr.t === "cone") {
            push(pr.x, pr.y0 + pr.hgt, pr.z);
            push(pr.x - pr.r, 0, pr.z);
            push(pr.x + pr.r, 0, pr.z);
          } else for (let i = 0; i < pr.pts.length; i += 3) push(pr.pts[i], pr.pts[i + 1], pr.pts[i + 2]);
        }
        if (p.star) push(p.star[0], p.top, p.star[2]);
      }
      if (p.box) push(p.box[0], 0, p.box[2]);
    }
    if (!pts.length) return;
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const cy = maxY / 2;
    const rad = Math.max(maxX - minX, maxZ - minZ, maxY) / 2 || 1;
    const D = this.camera.persp > 0 ? rad / this.camera.persp : 0;
    this.centre = { x: cx, y: cy, z: cz, D };

    const c = this.camera;
    const yaws = c.sway && !this.reduced ? [-1, -0.5, 0, 0.5, 1].map((k) => c.yaw + k * c.sway) : [c.yaw];
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    const cp = Math.cos(c.pitch);
    const sp = Math.sin(c.pitch);
    for (const yw of yaws) {
      const cy_ = Math.cos(yw);
      const sy = Math.sin(yw);
      for (let i = 0; i < pts.length; i += 3) {
        const dx = pts[i] - cx;
        const dy = pts[i + 1] - cy;
        const dz = pts[i + 2] - cz;
        const xr = dx * cy_ - dz * sy;
        const zr = dx * sy + dz * cy_;
        const yc = dy * cp - zr * sp;
        const dc = zr * cp + dy * sp;
        const pf = D > 0 ? D / Math.max(D * 0.25, D - dc) : 1;
        const X = xr * pf;
        const Y = yc * pf;
        if (X < x0) x0 = X;
        if (X > x1) x1 = X;
        if (Y < y0) y0 = Y;
        if (Y > y1) y1 = Y;
      }
    }
    const padX = this.W * (this.mini ? 0.08 : 0.07);
    const padTop = this.H * (this.mini ? 0.1 : 0.09);
    const padBot = this.H * (this.mini ? 0.12 : 0.13);
    const scale = Math.min((this.W - 2 * padX) / Math.max(0.01, x1 - x0), (this.H - padTop - padBot) / Math.max(0.01, y1 - y0));
    const ox = this.W / 2 - ((x0 + x1) / 2) * scale;
    const oy = padTop + y1 * scale + (this.H - padTop - padBot - (y1 - y0) * scale) / 2;
    this.target = { scale, ox, oy };
    if (!this.fit) this.fit = { ...this.target };
  }

  // ---------- frame ----------
  draw(dt: number, paint: Painter) {
    if (!this.resize()) return;
    const t0 = performance.now();
    this.clock += dt;
    if (!this.reduced) {
      this.rot += dt * this.camera.spin;
      this.swayT += dt;
    }
    const key = `${this.W}x${this.H}:${this.props.length}:${this.props.map((p) => p.key).join(",")}`;
    if (key !== this.fitKey) {
      this.fitKey = key;
      this.computeFit();
    }
    if (!this.fit || !this.target) return;
    const k = 1 - Math.exp(-dt * 3.5);
    this.fit.scale += (this.target.scale - this.fit.scale) * k;
    this.fit.ox += (this.target.ox - this.fit.ox) * k;
    this.fit.oy += (this.target.oy - this.fit.oy) * k;

    // patterns → display buffers (with the engine's attack/release smoothing)
    const s = this.smoothing;
    const aa = s > 0 ? 1 - Math.exp(-dt / (0.015 + 0.2 * Math.pow(s, 1.2))) : 1;
    const ar = s > 0 ? 1 - Math.exp(-dt / (0.04 + 0.9 * Math.pow(s, 1.2))) : 1;
    this.props.forEach((p, i) => {
      const out = this.bufs[i];
      paint(p, out, i);
      const d = this.disp[i];
      if (s <= 0) d.set(out);
      else
        for (let j = 0; j < out.length; j++) {
          const tv = out[j];
          d[j] += (tv - d[j]) * (tv > d[j] ? aa : ar);
        }
    });

    this.render();
    // adaptive quality: if frames are slow, drop to 1× pixel ratio
    const ms = performance.now() - t0;
    this.slow = this.slow * 0.95 + (ms > 16 ? 1 : 0) * 0.05;
    if (this.slow > 0.5 && this.maxDpr > 1) {
      this.maxDpr = 1;
      this.slow = 0;
    }
  }

  private render() {
    const c = this.ctx;
    const { W, H } = this;
    const fit = this.fit!;
    const cam = this.camera;
    const { x: scx, y: scy, z: scz, D } = this.centre;
    const yaw = this.yaw();
    const cY = Math.cos(yaw);
    const sY = Math.sin(yaw);
    const cP = Math.cos(cam.pitch);
    const sP = Math.sin(cam.pitch);
    const vx = sY * cP;
    const vy = sP;
    const vz = cY * cP;
    const scale = fit.scale;

    const proj = (x: number, y: number, z: number, o: number[]) => {
      const dx = x - scx;
      const dy = y - scy;
      const dz = z - scz;
      const xr = dx * cY - dz * sY;
      const zr = dx * sY + dz * cY;
      const yc = dy * cP - zr * sP;
      const dc = zr * cP + dy * sP;
      const pf = D > 0 ? D / Math.max(D * 0.25, D - dc) : 1;
      o[0] = fit.ox + xr * pf * scale;
      o[1] = fit.oy - yc * pf * scale;
      o[2] = dc;
      o[3] = pf;
      o[4] = zr;
      return o;
    };

    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.globalCompositeOperation = "source-over";
    c.globalAlpha = 1;
    if (!this.sky) {
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0d1530");
      g.addColorStop(0.7, "#070b17");
      g.addColorStop(1, "#04060b");
      this.sky = g;
    }
    c.fillStyle = this.sky;
    c.fillRect(0, 0, W, H);
    for (const st of this.stars) {
      const tw = this.reduced ? 0.5 : 0.5 + 0.5 * Math.sin(this.clock * 0.7 + st.p);
      c.fillStyle = `rgba(210,220,255,${(0.12 + 0.28 * tw).toFixed(3)})`;
      c.fillRect(st.x * W, st.y * H, st.r, st.r);
    }

    const tmp = [0, 0, 0, 0, 0];
    const tmp2 = [0, 0, 0, 0, 0];

    // ground glow under the whole scene
    {
      proj(scx, 0, scz, tmp);
      const gw = (this.mini ? 0.42 : 0.46) * W;
      const gr = c.createRadialGradient(tmp[0], tmp[1], 2, tmp[0], tmp[1], gw);
      gr.addColorStop(0, "rgba(120,140,200,0.10)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = gr;
      c.beginPath();
      c.ellipse(tmp[0], tmp[1], gw, gw * 0.18, 0, 0, TAU);
      c.fill();
    }

    // per-prop spin transforms
    const spins = this.props.map((p) => {
      const a = p.spin && !this.reduced ? this.rot + p.phase : p.spin ? p.phase : 0;
      return [Math.cos(a), Math.sin(a)];
    });
    const world = (p: Prop, i: number, x: number, y: number, z: number, o: number[]) => {
      const [cs, sn] = spins[i];
      const lx = x - p.cx;
      const lz = z - p.cz;
      return proj(p.cx + lx * cs + lz * sn, y, p.cz - lx * sn + lz * cs, o);
    };

    // light spill pooled under each prop (average lit colour)
    if (!this.mini && this.props.length <= 30) {
      c.globalCompositeOperation = "lighter";
      this.props.forEach((p, i) => {
        const d = this.disp[i];
        let r = 0;
        let g = 0;
        let b = 0;
        const step = Math.max(1, Math.floor(p.g.n / 60));
        let cnt = 0;
        for (let j = 0; j < p.g.n; j += step) {
          r += d[j * 3];
          g += d[j * 3 + 1];
          b += d[j * 3 + 2];
          cnt++;
        }
        const appear = this.appear(p);
        r = (r / cnt) * appear;
        g = (g / cnt) * appear;
        b = (b / cnt) * appear;
        const m = Math.max(r, g, b);
        if (m < 0.03) return;
        proj(p.cx, 0, p.cz, tmp);
        const rad = Math.max(10, p.radius * 1.5 * scale * tmp[3]);
        const sp = c.createRadialGradient(tmp[0], tmp[1], 1, tmp[0], tmp[1], rad);
        sp.addColorStop(0, `rgba(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0},${(0.28 * Math.min(1, m * 1.6)).toFixed(3)})`);
        sp.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = sp;
        c.beginPath();
        c.ellipse(tmp[0], tmp[1], rad, rad * 0.26, 0, 0, TAU);
        c.fill();
      });
      c.globalCompositeOperation = "source-over";
    }

    // solid structure, far to near
    type Item = { depth: number; draw: () => void; alpha: number };
    const items: Item[] = [];
    this.props.forEach((p, i) => {
      const alpha = Math.min(1, this.appear(p) * 1.6);
      for (const pr of p.prims) items.push(this.primItem(pr, p, i, world, tmp, alpha, scale));
    });
    items.sort((a, b) => a.depth - b.depth);
    for (const it of items) {
      c.globalAlpha = it.alpha;
      it.draw();
    }
    c.globalAlpha = 1;

    // mega tree wires: controller box → bottom of each strand → top (behind the pixels)
    c.lineWidth = this.mini ? 0.5 : 0.8;
    this.props.forEach((p, i) => {
      if (!p.wires) return;
      const box = p.box;
      world(p, i, p.wires.apex[0], p.wires.apex[1], p.wires.apex[2], tmp2);
      const ax = tmp2[0];
      const ay = tmp2[1];
      let bx = 0;
      let by = 0;
      if (box) {
        proj(box[0], box[1], box[2], tmp2);
        bx = tmp2[0];
        by = tmp2[1];
      }
      const alpha = Math.min(1, this.appear(p) * 1.6);
      const cd = this.depthOf(p, proj, tmp2);
      for (let s = 0; s < p.wires.base.length; s++) {
        const j = p.wires.base[s];
        world(p, i, p.pos[j * 3], p.pos[j * 3 + 1], p.pos[j * 3 + 2], tmp);
        const front = clamp(((tmp[4] - cd) / p.radius + 1) / 2);
        c.strokeStyle = `rgba(130,145,190,${((0.08 + 0.1 * front) * alpha).toFixed(3)})`;
        c.beginPath();
        if (box) {
          c.moveTo(bx, by);
          c.lineTo(tmp[0], tmp[1]);
        } else c.moveTo(tmp[0], tmp[1]);
        c.lineTo(ax, ay);
        c.stroke();
      }
    });

    // pixels (additive)
    c.globalCompositeOperation = "lighter";
    const mini = this.mini;
    const glowA = mini ? 0.22 : 0.16;
    const glowK = mini ? 3.4 : 2.8;
    const TWO = TAU;
    this.props.forEach((p, i) => {
      const d = this.disp[i];
      const { g, pos, nrm } = p;
      const cd = this.depthOf(p, proj, tmp2);
      const [cs, sn] = spins[i];
      const appear = this.appear(p);
      const born = appear < 1;
      for (let j = 0; j < g.n; j++) {
        world(p, i, pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2], tmp);
        let shade = 0.45 + 0.55 * clamp(((tmp[4] - cd) / Math.max(0.3, p.radius) + 1) / 2);
        if (nrm) {
          const nx = nrm[j * 3] * cs + nrm[j * 3 + 2] * sn;
          const nz = -nrm[j * 3] * sn + nrm[j * 3 + 2] * cs;
          const f = nx * vx + nrm[j * 3 + 1] * vy + nz * vz;
          const w = clamp((f + 0.25) / 0.5);
          shade *= p.backDim + (1 - p.backDim) * w * w * (3 - 2 * w);
        }
        let k = 1;
        if (born) k = clamp((appear * 1.25 - g.h[j]) / 0.18);
        const r = d[j * 3] * k;
        const gg = d[j * 3 + 1] * k;
        const b = d[j * 3 + 2] * k;
        const m = r > gg ? (r > b ? r : b) : gg > b ? gg : b;
        const core = clamp(p.pixelSize * scale * tmp[3], mini ? 0.7 : 1.1, mini ? 2.4 : 4.2);
        if (m < 0.02) {
          c.fillStyle = `rgba(190,200,240,${(0.07 * shade * (born ? appear : 1)).toFixed(3)})`;
          c.beginPath();
          c.arc(tmp[0], tmp[1], core * 0.7, 0, TWO);
          c.fill();
          continue;
        }
        const R8 = Math.round(255 * p06(r) * shade);
        const G8 = Math.round(255 * p06(gg) * shade);
        const B8 = Math.round(255 * p06(b) * shade);
        c.fillStyle = `rgba(${R8},${G8},${B8},${(glowA * p06(m)).toFixed(3)})`;
        c.beginPath();
        c.arc(tmp[0], tmp[1], core * glowK, 0, TWO);
        c.fill();
        c.fillStyle = `rgb(${R8},${G8},${B8})`;
        c.beginPath();
        c.arc(tmp[0], tmp[1], core, 0, TWO);
        c.fill();
      }
    });
    c.globalCompositeOperation = "source-over";

    // star toppers and controller boxes
    this.props.forEach((p, i) => {
      const alpha = Math.min(1, this.appear(p) * 1.6);
      if (p.star) {
        world(p, i, p.star[0], p.star[1], p.star[2], tmp);
        const rad = clamp(0.3 * scale * tmp[3], mini ? 3 : 5, mini ? 6 : 13);
        c.globalCompositeOperation = "lighter";
        const halo = c.createRadialGradient(tmp[0], tmp[1], 0, tmp[0], tmp[1], rad * 3);
        halo.addColorStop(0, `rgba(255,205,120,${(0.28 * alpha).toFixed(3)})`);
        halo.addColorStop(1, "rgba(255,205,120,0)");
        c.fillStyle = halo;
        c.beginPath();
        c.arc(tmp[0], tmp[1], rad * 3, 0, TAU);
        c.fill();
        c.globalCompositeOperation = "source-over";
        c.fillStyle = `rgba(255,214,130,${(0.6 * alpha).toFixed(3)})`;
        c.beginPath();
        for (let q = 0; q < 10; q++) {
          const ang = -Math.PI / 2 + (q * Math.PI) / 5;
          const rr = (q % 2 ? 0.45 : 1) * rad;
          c.lineTo(tmp[0] + rr * Math.cos(ang), tmp[1] + rr * Math.sin(ang));
        }
        c.closePath();
        c.fill();
      }
      if (p.box) {
        proj(p.box[0], p.box[1], p.box[2], tmp);
        const bw = clamp(0.62 * scale * tmp[3], mini ? 10 : 18, mini ? 18 : 34);
        const bh = bw * 0.46;
        c.globalAlpha = alpha;
        c.fillStyle = "#1c2232";
        c.strokeStyle = "#3a4560";
        c.lineWidth = 1;
        c.beginPath();
        if (c.roundRect) c.roundRect(tmp[0] - bw / 2, tmp[1] - bh / 2, bw, bh, 3);
        else c.rect(tmp[0] - bw / 2, tmp[1] - bh / 2, bw, bh);
        c.fill();
        c.stroke();
        c.fillStyle = "#3ddc84";
        c.beginPath();
        c.arc(tmp[0] + bw / 2 - 5, tmp[1], mini ? 1 : 1.6, 0, TAU);
        c.fill();
        c.globalAlpha = 1;
      }
    });
  }

  private appear(p: Prop) {
    const b = this.born.get(p.key);
    if (b === undefined) return 1;
    const a = (this.clock - b) / 1.1;
    if (a >= 1) {
      this.born.delete(p.key);
      return 1;
    }
    return Math.max(0, a);
  }

  /** Horizontal depth of the prop's centre, for tree.js-style front/back shading. */
  private depthOf(p: Prop, proj: (x: number, y: number, z: number, o: number[]) => number[], o: number[]) {
    proj(p.cx, 0, p.cz, o);
    return o[4];
  }

  private primItem(
    pr: Prim,
    p: Prop,
    i: number,
    world: (p: Prop, i: number, x: number, y: number, z: number, o: number[]) => number[],
    tmp: number[],
    alpha: number,
    scale: number,
  ) {
    const c = this.ctx;
    if (pr.t === "cone") {
      // silhouette: hull of the apex and the base circle
      const pts: [number, number][] = [];
      let depth = 0;
      world(p, i, pr.x, pr.y0 + pr.hgt, pr.z, tmp);
      pts.push([tmp[0], tmp[1]]);
      for (let k = 0; k < 20; k++) {
        const a = (k / 20) * TAU;
        world(p, i, pr.x + pr.r * Math.sin(a), pr.y0, pr.z + pr.r * Math.cos(a), tmp);
        pts.push([tmp[0], tmp[1]]);
        depth += tmp[2];
      }
      const hull = convexHull(pts);
      return {
        depth: depth / 20,
        alpha,
        draw: () => {
          c.fillStyle = pr.fill;
          c.beginPath();
          hull.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y)));
          c.closePath();
          c.fill();
        },
      };
    }
    const xy: number[] = [];
    let depth = 0;
    let pfSum = 0;
    const n = pr.pts.length / 3;
    for (let k = 0; k < pr.pts.length; k += 3) {
      world(p, i, pr.pts[k], pr.pts[k + 1], pr.pts[k + 2], tmp);
      xy.push(tmp[0], tmp[1]);
      depth += tmp[2];
      pfSum += tmp[3];
    }
    depth /= n;
    if (pr.t === "line") {
      const w = Math.max(this.mini ? 0.5 : 0.8, pr.w * scale * (pfSum / n));
      return {
        depth,
        alpha,
        draw: () => {
          c.strokeStyle = pr.c;
          c.lineWidth = w;
          c.lineCap = "round";
          c.beginPath();
          for (let k = 0; k < xy.length; k += 2) {
            if (k) c.lineTo(xy[k], xy[k + 1]);
            else c.moveTo(xy[k], xy[k + 1]);
          }
          c.stroke();
        },
      };
    }
    return {
      depth,
      alpha,
      draw: () => {
        c.fillStyle = pr.fill;
        c.beginPath();
        for (let k = 0; k < xy.length; k += 2) {
            if (k) c.lineTo(xy[k], xy[k + 1]);
            else c.moveTo(xy[k], xy[k + 1]);
          }
        c.closePath();
        c.fill();
        if (pr.stroke) {
          c.strokeStyle = pr.stroke;
          c.lineWidth = 1;
          c.stroke();
        }
      },
    };
  }
}

function convexHull(pts: [number, number][]): [number, number][] {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: [number, number][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}
