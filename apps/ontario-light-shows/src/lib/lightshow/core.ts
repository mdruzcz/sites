// TypeScript port of the Light Show app's tree.js (Xlights/showui/tree.js).
// The native patterns are the same maths the Pi's engine runs, so what a visitor
// sees here is what the props do. The music looks are the app's own
// approximations, driven either by its synthetic beat or by live input.

export type RGB = [number, number, number];

export const TAU = Math.PI * 2;
export const clamp = (x: number, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const smooth = (x: number) => {
  x = clamp(x);
  return x * x * (3 - 2 * x);
};
export const frac = (x: number) => x - Math.floor(x);

export function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const hexRgb = (h: string): RGB => {
  const n = parseInt(String(h).replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// ---------- geometry: strand s, height h (0 bottom .. 1 top), same as engine.Prop.set_shape ----------
export interface Geom {
  n: number;
  S: number;
  L: number;
  si: Int16Array;
  a: Float32Array;
  h: Float32Array;
  r: Float32Array;
  rs: Float32Array;
}

function randoms(n: number, S: number, seed: number) {
  const rnd = mulberry32(seed);
  const r = new Float32Array(n * 4);
  const rs = new Float32Array(S * 6);
  for (let i = 0; i < r.length; i++) r[i] = rnd();
  for (let i = 0; i < rs.length; i++) rs[i] = rnd();
  return { r, rs };
}

export function geom(n: number, strands: number, zigzag = false, seed = 7): Geom {
  const S = Math.max(1, Math.min(strands | 0 || 1, n));
  const L = Math.max(1, Math.ceil(n / S));
  const si = new Int16Array(n);
  const a = new Float32Array(n);
  const h = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const s = Math.min(Math.floor(i / L), S - 1);
    let p = i - s * L;
    if (zigzag && s % 2 === 1) p = L - 1 - p;
    si[i] = s;
    a[i] = s / S;
    h[i] = p / Math.max(1, L - 1);
  }
  return { n, S, L, si, a, h, ...randoms(n, S, seed) };
}

/** Geometry for props that are not a cone of equal strands (rooflines, wraps, arches). */
export function customGeom(si: number[], a: number[], h: number[], S: number, seed = 7): Geom {
  const n = si.length;
  return {
    n,
    S: Math.max(1, S),
    L: Math.max(1, Math.ceil(n / Math.max(1, S))),
    si: Int16Array.from(si.map((s) => Math.min(Math.max(0, s), Math.max(1, S) - 1))),
    a: Float32Array.from(a),
    h: Float32Array.from(h),
    ...randoms(n, Math.max(1, S), seed),
  };
}

type Out = Float32Array;
type Vec = number[];

function palCyc(C: RGB[], x: number, o: Vec) {
  const k = C.length;
  if (k === 1) {
    o[0] = C[0][0];
    o[1] = C[0][1];
    o[2] = C[0][2];
    return o;
  }
  const p = frac(x) * k;
  const i0 = Math.floor(p) % k;
  const f = smooth(p - Math.floor(p));
  const A = C[i0];
  const B = C[(i0 + 1) % k];
  o[0] = A[0] + (B[0] - A[0]) * f;
  o[1] = A[1] + (B[1] - A[1]) * f;
  o[2] = A[2] + (B[2] - A[2]) * f;
  return o;
}

export function palLin(C: RGB[], x: number, o: Vec) {
  const k = C.length;
  if (k === 1) {
    o[0] = C[0][0];
    o[1] = C[0][1];
    o[2] = C[0][2];
    return o;
  }
  const p = clamp(x) * (k - 1);
  const i0 = Math.min(Math.floor(p), k - 2);
  const f = p - i0;
  const A = C[i0];
  const B = C[i0 + 1];
  o[0] = A[0] + (B[0] - A[0]) * f;
  o[1] = A[1] + (B[1] - A[1]) * f;
  o[2] = A[2] + (B[2] - A[2]) * f;
  return o;
}

function rainbow(x: number, o: Vec) {
  for (let c = 0; c < 3; c++) o[c] = clamp((0.5 + 0.5 * Math.cos(TAU * (x - c / 3)) - 0.5) * 1.5 + 0.5);
  return o;
}

const set = (out: Out, i: number, c: ArrayLike<number>, m = 1) => {
  out[i * 3] = c[0] * m;
  out[i * 3 + 1] = c[1] * m;
  out[i * 3 + 2] = c[2] * m;
};
const mix = (A: ArrayLike<number>, B: ArrayLike<number>, w: number, o: Vec) => {
  o[0] = A[0] + (B[0] - A[0]) * w;
  o[1] = A[1] + (B[1] - A[1]) * w;
  o[2] = A[2] + (B[2] - A[2]) * w;
  return o;
};

// ---------- native patterns (same maths as engine.py) ----------
export function pattern(name: string, C: RGB[], tt: number, g: Geom, out: Out): Out {
  const { n, a, h, r, rs, si } = g;
  const o: Vec = [0, 0, 0];
  const q: Vec = [0, 0, 0];
  const k = C.length;
  switch (name) {
    case "solid":
      for (let i = 0; i < n; i++) set(out, i, C[0]);
      break;
    case "blend":
      for (let i = 0; i < n; i++) set(out, i, palCyc(C, a[i] + h[i] * 0.25 + tt * 0.03, o));
      break;
    case "fade": {
      palCyc(C, tt * 0.05, o);
      for (let i = 0; i < n; i++) set(out, i, o);
      break;
    }
    case "sparkle":
      for (let i = 0; i < n; i++) {
        palCyc(C, a[i] + h[i] * 0.3, o);
        o[0] *= 0.35;
        o[1] *= 0.35;
        o[2] *= 0.35;
        const v = Math.pow(Math.max(0, Math.sin(TAU * (tt * (0.25 + 0.5 * r[i * 4]) + r[i * 4 + 1]))), 24);
        palCyc(C, r[i * 4 + 2], q);
        q[0] = q[0] * 0.5 + 0.5;
        q[1] = q[1] * 0.5 + 0.5;
        q[2] = q[2] * 0.5 + 0.5;
        set(out, i, mix(o, q, v, o));
      }
      break;
    case "rainbow":
      for (let i = 0; i < n; i++) set(out, i, rainbow(a[i] + h[i] * 0.35 + tt * 0.04, o));
      break;
    case "chase":
      for (let i = 0; i < n; i++) set(out, i, rainbow(a[i] * 3 + h[i] * 1.5 - tt * 0.12, o));
      break;
    case "spiral":
      for (let i = 0; i < n; i++) {
        const x = a[i] * 2 + h[i] * 1.1 - tt * 0.06;
        const v = (((x * k) % k) + k) % k;
        const j = Math.floor(v) % k;
        const w = smooth((v - Math.floor(v) - 0.8) / 0.2);
        set(out, i, mix(C[j], C[(j + 1) % k], w, o));
      }
      break;
    case "strands": {
      const gg = tt * 0.35;
      const j = Math.floor(gg);
      const f = smooth((gg - j - 0.75) / 0.25);
      for (let i = 0; i < n; i++) set(out, i, mix(C[(si[i] + j) % k], C[(si[i] + j + 1) % k], f, o));
      break;
    }
    case "snowfall": {
      const base = k > 1 ? C.slice(0, -1) : C;
      for (let i = 0; i < n; i++) {
        palCyc(base, a[i] * 0.5 + h[i] * 0.2, o);
        o[0] *= 0.28;
        o[1] *= 0.28;
        o[2] *= 0.28;
        let I = 0;
        for (let j = 0; j < 3; j++) {
          const spd = 0.06 + 0.1 * rs[si[i] * 6 + j * 2];
          const pos = 1 - frac(tt * spd + rs[si[i] * 6 + j * 2 + 1]);
          I += Math.exp(-Math.pow((h[i] - pos) / 0.045, 2));
        }
        set(out, i, mix(o, C[k - 1], clamp(I), o));
      }
      break;
    }
    case "icicles":
      for (let i = 0; i < n; i++) {
        const ph = frac(tt * (0.08 + 0.07 * rs[si[i] * 6]) + rs[si[i] * 6 + 1]);
        const head = 1 - ph * 0.55;
        const d = h[i] - head;
        const drip = d >= 0 && d < 0.22 ? Math.pow(1 - d / 0.22, 2) * (1 - ph * 0.6) : 0;
        const top = clamp((h[i] - 0.88) / 0.12) * 0.6;
        o[0] = C[0][0] * 0.12;
        o[1] = C[0][1] * 0.12;
        o[2] = C[0][2] * 0.12;
        set(out, i, mix(o, C[k - 1], Math.max(drip, top), o));
      }
      break;
    case "fire":
      for (let i = 0; i < n; i++) {
        const rsd = rs[si[i] * 6 + 2];
        const fl = 0.5 + 0.25 * Math.sin(TAU * (tt * 1.1 + rsd * 5 + h[i] * 1.5)) + 0.25 * Math.sin(TAU * (tt * 0.7 + rsd * 3 - h[i] * 2.3));
        const heat = clamp(1.1 - h[i] * (1.25 - 0.55 * fl));
        set(out, i, palLin(C, heat, o), 0.15 + 0.85 * heat);
      }
      break;
    case "waves":
      for (let i = 0; i < n; i++) {
        const v = 0.5 + 0.5 * Math.sin(TAU * (h[i] * 1.4 - tt * 0.18 + a[i]));
        set(out, i, palLin(C, v, o), 0.35 + 0.65 * v);
      }
      break;
    case "aurora":
      for (let i = 0; i < n; i++) {
        const v = 0.5 + 0.5 * Math.sin(TAU * (a[i] * 2 + 0.35 * Math.sin(TAU * (h[i] * 0.8 - tt * 0.05)) + tt * 0.02));
        const b = 0.25 + 0.75 * Math.pow(0.5 + 0.5 * Math.sin(TAU * (h[i] * 1.2 + tt * 0.07 + a[i])), 2);
        set(out, i, palCyc(C, v * 0.999, o), b);
      }
      break;
    case "candle": {
      const g0 = 0.72 + 0.08 * Math.sin(TAU * tt * 0.15);
      for (let i = 0; i < n; i++)
        set(out, i, palCyc(C, a[i] * 0.5 + h[i] * 0.2, o), g0 + 0.06 * Math.sin(TAU * (tt * 0.9 * (0.5 + r[i * 4]) + r[i * 4 + 1])));
      break;
    }
    case "heart": {
      const w = 0.06 + 0.06 * (0.5 + 0.5 * Math.sin(TAU * tt * 0.25));
      const red = C[Math.min(1, k - 1)];
      for (let i = 0; i < n; i++) {
        const m = 0.45 + 0.1 * Math.sin(TAU * (tt * 0.3 * (0.5 + r[i * 4]) + r[i * 4 + 1]));
        o[0] = C[0][0] * m;
        o[1] = C[0][1] * m;
        o[2] = C[0][2] * m;
        set(out, i, mix(o, red, Math.exp(-Math.pow((h[i] - 0.5) / w, 2)), o));
      }
      break;
    }
    case "rudolph": {
      const base = k > 1 ? C.slice(0, -1) : C;
      const pulse = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(TAU * tt * 0.5));
      for (let i = 0; i < n; i++) {
        palLin(base, h[i], o);
        o[0] *= 0.55;
        o[1] *= 0.55;
        o[2] *= 0.55;
        set(out, i, mix(o, C[k - 1], clamp((h[i] - 0.9) / 0.1) * pulse, o));
      }
      break;
    }
    default:
      for (let i = 0; i < n; i++) set(out, i, palCyc(C, a[i], o));
  }
  return out;
}

// ---------- audio frames ----------
export type Note = { h: number; age: number; strength: number };

export interface AudioFrame {
  /** Beat phase 0..1 since the last beat. */
  bp: number;
  /** Beat counter. */
  beat: number;
  /** Bass hit envelope 0..1. */
  kick: number;
  mid: number;
  hi: number;
  level: number;
  slow: number;
  /** Live pitched notes (piano keys or mic peaks) for the Piano look. */
  notes?: Note[];
}

export type PastFn = (ago: number) => { kick: number; mid: number; hi: number };

/** Synthetic music for the previews (118 BPM), exactly as the app's cards use. */
export function audio(t: number): AudioFrame {
  const b = (t * 118) / 60;
  const bp = frac(b);
  const beat = Math.floor(b);
  const kick = Math.exp(-bp * 6) * (0.75 + 0.25 * Math.sin(beat * 1.7));
  const mid = 0.5 + 0.5 * Math.sin(t * 2.3) * Math.sin(t * 0.9);
  const hi = clamp(Math.pow(Math.sin(t * 7.1), 8));
  return { bp, beat, kick, mid, hi, level: clamp(0.12 + 0.85 * kick + 0.1 * mid), slow: 0.5 + 0.5 * Math.sin(t * 0.6) };
}

export const syntheticPast = (t: number): PastFn => (ago) => audio(t - ago);

/** Light a band at each note's height (low notes at the bottom), max-blended. */
export function bands(notes: Note[], C: RGB[], g: Geom, out: Out, width = 0.06, base = 0) {
  const { n, h } = g;
  const o: Vec = [0, 0, 0];
  for (let i = 0; i < n * 3; i++) out[i] = base > 0 ? out[i] * base : 0;
  for (const note of notes) {
    const fade = Math.exp(-note.age * 2.2) * note.strength;
    if (fade < 0.01) continue;
    palLin(C, note.h, o);
    for (let i = 0; i < n; i++) {
      const d = Math.abs(h[i] - note.h);
      if (d >= width) continue;
      const m = (1 - d / width) * fade;
      const j = i * 3;
      if (o[0] * m > out[j]) out[j] = o[0] * m;
      if (o[1] * m > out[j + 1]) out[j + 1] = o[1] * m;
      if (o[2] * m > out[j + 2]) out[j + 2] = o[2] * m;
    }
  }
  return out;
}

// ---------- music looks, approximated ----------
export function music(id: string, C: RGB[], t: number, g: Geom, out: Out, au: AudioFrame, past: PastFn): Out {
  const { n, a, h, r, si } = g;
  const o: Vec = [0, 0, 0];
  const k = C.length;
  switch (id) {
    case "power":
      for (let i = 0; i < n; i++) {
        const top = au.kick * (0.55 + 0.45 * g.rs[si[i] * 6 + 3]);
        if (h[i] < top) set(out, i, palLin(C, h[i] / Math.max(0.01, top), o), 0.4 + 0.6 * au.kick);
        else {
          const sp = r[i * 4] > 0.97 && frac(t * 3 + r[i * 4 + 1]) < 0.25;
          set(out, i, [1, 1, 1], sp ? 0.8 : 0);
        }
      }
      break;
    case "scroll": {
      const c0 = C[0];
      const c1 = C[Math.min(1, k - 1)];
      const c2 = C[Math.min(2, k - 1)];
      for (let i = 0; i < n; i++) {
        const A = past(h[i] * 1.2);
        const lo = A.kick;
        const mi = A.mid * 0.6;
        const hi = 0.3 * A.hi;
        o[0] = clamp(c0[0] * lo + c1[0] * mi + c2[0] * hi);
        o[1] = clamp(c0[1] * lo + c1[1] * mi + c2[1] * hi);
        o[2] = clamp(c0[2] * lo + c1[2] * mi + c2[2] * hi);
        set(out, i, o);
      }
      break;
    }
    case "water":
      for (let i = 0; i < n; i++) {
        const ring = au.bp * 1.2;
        const v = Math.exp(-Math.pow((h[i] - ring) / 0.09, 2)) * (1 - au.bp) + 0.12;
        set(out, i, palCyc(C, a[i] + h[i] * 0.3 + t * 0.02, o), clamp(v));
      }
      break;
    case "pulse": {
      pattern("blend", C, t * 0.5, g, out);
      const m = 0.18 + 0.82 * clamp(au.level * 1.2);
      for (let i = 0; i < n * 3; i++) out[i] *= m;
      break;
    }
    case "pitchSpectrum": {
      if (au.notes) {
        bands(au.notes, C, g, out);
        break;
      }
      const slot = Math.floor(t * 3.2);
      const age = frac(t * 3.2);
      for (let i = 0; i < n * 3; i++) out[i] = 0;
      for (let j = 0; j < 5; j++) {
        const hc = mulberry32(slot * 31 + j)();
        const fade = Math.exp(-age * 2.2);
        for (let i = 0; i < n; i++) {
          const d = Math.abs(h[i] - hc);
          if (d < 0.06) {
            palLin(C, hc, o);
            const m = (1 - d / 0.06) * fade;
            out[i * 3] = Math.max(out[i * 3], o[0] * m);
            out[i * 3 + 1] = Math.max(out[i * 3 + 1], o[1] * m);
            out[i * 3 + 2] = Math.max(out[i * 3 + 2], o[2] * m);
          }
        }
      }
      break;
    }
    case "melt":
      for (let i = 0; i < n; i++)
        set(out, i, palCyc(C, a[i] * 0.5 + 0.3 * Math.sin(TAU * (h[i] * 0.8 + t * 0.07 + a[i])) + t * 0.02, o), 0.45 + 0.55 * au.level);
      break;
    case "lava_lamp":
      for (let i = 0; i < n; i++) {
        let I = 0;
        for (let j = 0; j < 3; j++) {
          const ca = frac(0.3 * j + t * 0.03 * (j + 1));
          const ch = 0.5 + 0.35 * Math.sin(t * 0.25 * (j + 1) + j);
          let da = Math.abs(a[i] - ca);
          da = Math.min(da, 1 - da);
          I += Math.exp(-(da * da) / 0.012 - Math.pow(h[i] - ch, 2) / 0.03);
        }
        set(out, i, palCyc(C, clamp(I) * 0.6 + a[i] * 0.2, o), clamp(0.15 + I * (0.6 + 0.4 * au.level)));
      }
      break;
    case "multiBar": {
      const band = ((au.beat % 4) + 4) % 4;
      const col = C[((au.beat % k) + k) % k];
      for (let i = 0; i < n; i++) set(out, i, col, Math.floor(h[i] * 4) === band ? 0.4 + 0.6 * au.kick : 0.06);
      break;
    }
    case "fire": {
      pattern("fire", C, t, g, out);
      const m = 0.45 + 0.55 * au.level;
      for (let i = 0; i < n * 3; i++) out[i] *= m;
      break;
    }
    case "blade_power_plus": {
      pattern("blend", C, t * 0.4, g, out);
      const m = 0.25 + 0.75 * clamp(au.slow * 0.4 + au.kick * 0.6);
      for (let i = 0; i < n * 3; i++) out[i] *= m;
      break;
    }
    case "real_strobe": {
      const f = au.kick * au.kick;
      for (let i = 0; i < n; i++) set(out, i, palCyc(C, r[i * 4 + 3], o), f * (0.85 + 0.3 * r[i * 4]));
      break;
    }
    default:
      pattern("blend", C, t, g, out);
  }
  return out;
}

// ---------- the app's catalogue (same lists and colours as showui/index.html) ----------
export const MUSIC_LOOKS = [
  { id: "power", name: "Power", smooth: 0.3 },
  { id: "scroll", name: "Scroll", smooth: 0.4 },
  { id: "water", name: "Ripple", smooth: 0.5 },
  { id: "pulse", name: "Pulse", smooth: 0.45 },
  { id: "pitchSpectrum", name: "Piano", smooth: 0.7 },
  { id: "melt", name: "Flow", smooth: 0.7 },
  { id: "lava_lamp", name: "Lava", smooth: 0.8 },
  { id: "multiBar", name: "Beat Bars", smooth: 0.35 },
  { id: "fire", name: "Fire", smooth: 0.6 },
  { id: "blade_power_plus", name: "Glow", smooth: 0.6 },
  { id: "real_strobe", name: "Beat Flash", smooth: 0.25 },
] as const;

export const STEADY_LOOKS = [
  { id: "solid", name: "Solid" },
  { id: "blend", name: "Blend" },
  { id: "fade", name: "Fade" },
  { id: "sparkle", name: "Sparkle" },
  { id: "spiral", name: "Spiral" },
  { id: "strands", name: "Strands" },
  { id: "waves", name: "Waves" },
  { id: "rainbow", name: "Rainbow", noColour: true },
] as const;

export type Theme = { name: string; pattern: string; colours: string[]; speed?: number };

export const THEMES: Theme[] = [
  { name: "Christmas", pattern: "strands", colours: ["#ff0000", "#00c000", "#ffffff"] },
  { name: "Candy Cane", pattern: "spiral", colours: ["#ff0000", "#ffffff"] },
  { name: "Snowman", pattern: "snowfall", colours: ["#1e4fa3", "#9ad9ff", "#ffffff"] },
  { name: "Grinch", pattern: "heart", colours: ["#3cff14", "#ff1a1a"] },
  { name: "Santa", pattern: "snowfall", colours: ["#d00000", "#ff2a2a", "#ffffff"] },
  { name: "Rudolph", pattern: "rudolph", colours: ["#5a2d0c", "#c87533", "#ff0000"] },
  { name: "Elf", pattern: "spiral", colours: ["#00c853", "#ff1744", "#ffd600"], speed: 0.65 },
  { name: "Icicles", pattern: "icicles", colours: ["#0a1a5c", "#9ad9ff", "#ffffff"] },
  { name: "Fireplace", pattern: "fire", colours: ["#400000", "#ff2200", "#ff7a00", "#ffc400"] },
  { name: "Northern Lights", pattern: "aurora", colours: ["#00ff88", "#00c8c8", "#7a3cff"] },
  { name: "Ocean", pattern: "waves", colours: ["#001a66", "#0060ff", "#00e5ff"] },
  { name: "Halloween", pattern: "fire", colours: ["#200030", "#7a00ff", "#ff6a00", "#ffb000"] },
  { name: "Canada Day", pattern: "strands", colours: ["#ff0000", "#ffffff"] },
  { name: "Gold & White", pattern: "sparkle", colours: ["#ffb060", "#ffd27f", "#fff3d6"] },
  { name: "Candlelight", pattern: "candle", colours: ["#ff9a3c", "#ffc070"] },
  { name: "Party", pattern: "chase", colours: ["#ff0000"], speed: 0.7 },
];

export const SCHEMES: { name: string; colours: string[] }[] = [
  { name: "Warm White", colours: ["#ffb060", "#ffd9a0"] },
  { name: "Cool White", colours: ["#ffffff", "#cfe6ff"] },
  { name: "Classic Multi", colours: ["#ff0000", "#00c000", "#0040ff", "#ff7800", "#ffc800"] },
  { name: "Red & Green", colours: ["#ff0000", "#00c000"] },
  { name: "Red & White", colours: ["#ff0000", "#ffffff"] },
  { name: "Blue & White", colours: ["#0050ff", "#ffffff"] },
  { name: "Gold", colours: ["#ff9a00", "#ffd27f"] },
  { name: "Red, White & Blue", colours: ["#ff0000", "#ffffff", "#0040ff"] },
  { name: "Purple & Orange", colours: ["#7a00ff", "#ff6a00"] },
  { name: "Icy Blue", colours: ["#e0f7ff", "#64b5f6", "#1e40ff"] },
];

export type Selection = { kind: "theme"; name: string } | { kind: "music"; id: string } | { kind: "steady"; id: string };

export const themeByName = (name: string) => THEMES.find((t) => t.name === name) ?? THEMES[0];

/** Colours a selection actually uses: a theme brings its own, looks use the scheme. */
export function coloursFor(sel: Selection, scheme: string[]): string[] {
  return sel.kind === "theme" ? themeByName(sel.name).colours : scheme;
}

export function smoothFor(sel: Selection): number {
  if (sel.kind === "music") return MUSIC_LOOKS.find((m) => m.id === sel.id)?.smooth ?? 0.5;
  return 0.5;
}

/**
 * Render a selection into `out`. Themes play their pattern at their own speed and,
 * when `reactThemes` is on, pulse with the music level as the app's toggle does.
 */
export function renderSelection(
  sel: Selection,
  C: RGB[],
  t: number,
  g: Geom,
  out: Out,
  au: AudioFrame,
  past: PastFn,
  reactThemes = false,
): Out {
  if (sel.kind === "music") return music(sel.id, C, t, g, out, au, past);
  if (sel.kind === "steady") return pattern(sel.id, C, t, g, out);
  const th = themeByName(sel.name);
  pattern(th.pattern, C, t * Math.pow(2, ((th.speed ?? 0.5) - 0.5) * 4), g, out);
  if (reactThemes) {
    const m = 0.18 + 0.82 * Math.min(1, au.level * 1.6);
    for (let i = 0; i < g.n * 3; i++) out[i] *= m;
  }
  return out;
}

export const cssGradient = (cols: string[]) =>
  `linear-gradient(135deg, ${(cols.length === 1 ? [cols[0], cols[0]] : cols).join(", ")})`;
