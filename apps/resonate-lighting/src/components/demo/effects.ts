import type { Analysis } from "./audioEngine";

export const MODES = ["Pulse", "Ripple", "Scroll", "Power", "Rainbow", "Solid"] as const;
export type Mode = (typeof MODES)[number];

export const THEMES = {
  Christmas: ["#FF1E2D", "#19C53A", "#FFFFFF", "#FFD166"],
  "Candy Cane": ["#FF2A2A", "#FFFFFF"],
  Grinch: ["#58D13A", "#FF2A6A", "#F4FF5C"],
  Snowman: ["#FFFFFF", "#9AD8FF", "#FF8A3D", "#2B6CFF"],
  Halloween: ["#FF7A00", "#8A2BE2", "#39FF14", "#FFB000"],
  "Canada Day": ["#FF0000", "#FFFFFF", "#FF3B3B"],
  Ocean: ["#0077FF", "#00E5FF", "#20C997", "#A0F0FF"],
} as const;
export type ThemeName = keyof typeof THEMES;

export type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h = ((h % 1) + 1) % 1;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    t = ((t % 1) + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

export type Ripple = { pos: number; life: number; color: number };

export type EffectState = {
  time: number;
  scrollPhase: number;
  level: number;
  peak: number;
  ripples: Ripple[];
  lastBeatCount: number;
  paletteIndex: number;
};

export function createEffectState(): EffectState {
  return { time: 0, scrollPhase: 0, level: 0, peak: 0, ripples: [], lastBeatCount: 0, paletteIndex: 0 };
}

/** Advance per-frame state shared by all pixels. */
export function stepEffects(state: EffectState, a: Analysis, dt: number, mode: Mode, playing: boolean) {
  state.time += dt;
  const drive = playing ? a.energy : 0.15;
  state.scrollPhase += dt * (0.25 + drive * 2.2);

  if (a.beatCount !== state.lastBeatCount) {
    state.lastBeatCount = a.beatCount;
    state.paletteIndex++;
    if (mode === "Ripple") {
      state.ripples.push({ pos: 1.05, life: 1, color: state.paletteIndex });
      if (state.ripples.length > 6) state.ripples.shift();
    }
  }
  for (const r of state.ripples) {
    r.pos -= dt * 0.9;
    r.life -= dt * 0.45;
  }
  state.ripples = state.ripples.filter((r) => r.life > 0 && r.pos > -0.2);

  const target = playing ? Math.min(1, a.energy * 1.15 + a.bass * 0.2) : 0.35;
  state.level += (target - state.level) * Math.min(1, dt * (target > state.level ? 20 : 5));
  state.peak = Math.max(state.level, state.peak - dt * 0.35);
}

/**
 * Colour and brightness of one pixel.
 * @param u position around / along the prop, 0..1
 * @param k height on the prop, 0 (bottom) .. 1 (top)
 */
export function pixelColor(
  mode: Mode,
  palette: RGB[],
  state: EffectState,
  a: Analysis,
  u: number,
  k: number,
  playing: boolean,
  out: { rgb: RGB; b: number },
) {
  const n = palette.length;
  const e = playing ? a.energy : 0.3;
  const t = state.time;

  switch (mode) {
    case "Pulse": {
      out.rgb = palette[state.paletteIndex % n];
      const wobble = 0.85 + 0.15 * Math.sin(k * 7 + t * 2.5 + u * 6.28);
      out.b = (0.12 + 0.88 * Math.pow(e, 0.8)) * wobble + a.beat * 0.25;
      break;
    }
    case "Ripple": {
      let best = 0;
      let color = palette[0];
      for (const r of state.ripples) {
        const d = k - r.pos;
        const v = Math.exp(-(d * d) / 0.006) * r.life;
        if (v > best) {
          best = v;
          color = palette[r.color % n];
        }
      }
      out.rgb = best > 0.08 ? color : palette[(state.paletteIndex + 1) % n];
      out.b = Math.max(0.06 + e * 0.12, best);
      break;
    }
    case "Scroll": {
      const idx = Math.floor((u * n * 2 + state.scrollPhase * n) % (n * 2)) % n;
      out.rgb = palette[(idx + n) % n];
      out.b = 0.45 + 0.55 * e;
      break;
    }
    case "Power": {
      const lit = k <= state.level;
      const isPeak = Math.abs(k - state.peak) < 0.03;
      out.rgb = isPeak ? palette[(n - 1) % n] : palette[Math.min(n - 1, Math.floor(k * n))];
      out.b = lit ? 0.85 + a.beat * 0.15 : isPeak ? 0.9 : 0.04;
      break;
    }
    case "Rainbow": {
      const hue = u + k * 0.35 + t * 0.08 + a.bass * 0.15;
      out.rgb = hslToRgb(hue, 1, 0.5);
      out.b = 0.35 + 0.65 * e;
      break;
    }
    case "Solid":
    default: {
      out.rgb = palette[Math.floor(state.paletteIndex / 8) % n];
      out.b = 0.3 + 0.7 * e + a.beat * 0.1;
      break;
    }
  }
  if (out.b > 1) out.b = 1;
}
