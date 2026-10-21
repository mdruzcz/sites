"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AudioEngine, type Source } from "./audioEngine";
import {
  MODES,
  THEMES,
  createEffectState,
  hexToRgb,
  pixelColor,
  stepEffects,
  type EffectState,
  type Mode,
  type RGB,
  type ThemeName,
} from "./effects";

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MQ).matches;
}

type Pixel = { x: number; y: number; u: number; k: number; depth: number; r: number };
type Branch = { x1: number; y1: number; x2: number; y2: number; w: number };
type TreeKind = "mega" | "wrapped";
type Scene = {
  tree: Pixel[];
  topper: Pixel[];
  roof: Pixel[];
  roofPath: [number, number][];
  branches: Branch[];
  stars: { x: number; y: number; r: number; p: number }[];
  hills: [number, number][];
  treeBase: { x: number; y: number; w: number };
  w: number;
  h: number;
};

// Small deterministic PRNG so the scene is identical on every render.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function starPolygon(cx: number, cy: number, outer: number, inner: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? outer : inner;
    pts.push([cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad]);
  }
  return pts;
}

function buildScene(w: number, h: number, kind: TreeKind, showRoof: boolean, dense: boolean): Scene {
  const rnd = mulberry32(7);
  const tree: Pixel[] = [];
  const topper: Pixel[] = [];
  const roof: Pixel[] = [];
  const roofPath: [number, number][] = [];
  const branches: Branch[] = [];
  const baseR = Math.max(4.5, w * 0.0038 + 1.5);
  const groundY = h * 0.88;

  // Sky
  const stars = Array.from({ length: dense ? 140 : 80 }, () => ({
    x: rnd() * w,
    y: rnd() * h * 0.6,
    r: 0.4 + rnd() * 1.1,
    p: rnd() * Math.PI * 2,
  }));
  // Distant hills / treeline
  const hills: [number, number][] = [];
  for (let i = 0; i <= 24; i++) {
    const x = (i / 24) * w;
    hills.push([x, groundY - 10 - Math.abs(Math.sin(i * 0.9 + 1)) * h * 0.06 - rnd() * h * 0.02]);
  }

  const cx = showRoof ? w * 0.68 : w * 0.5;
  const topY = h * 0.1;
  const treeBase = { x: cx, y: groundY, w: 0 };

  if (kind === "mega") {
    const strings = dense ? 32 : 22;
    const perString = dense ? 40 : 28;
    const R = Math.min(w * (showRoof ? 0.19 : 0.27), (groundY - topY) * 0.5);
    treeBase.w = R * 2;
    for (let s = 0; s < strings; s++) {
      const theta = (s / strings) * Math.PI * 2 + Math.PI / 2;
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);
      for (let p = 0; p < perString; p++) {
        const k = p / (perString - 1);
        const radius = R * (1 - k * 0.94) + 2;
        const x = cx + radius * sin;
        const y = groundY - 6 - k * (groundY - 6 - topY - 10) - radius * cos * 0.16;
        const depth = (cos + 1) / 2;
        tree.push({ x, y, u: s / strings, k, depth, r: baseR * (0.6 + 0.5 * depth) });
      }
    }
    // Star topper
    const sr = Math.max(14, R * 0.22);
    const poly = starPolygon(cx, topY - sr * 0.2, sr, sr * 0.45);
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      const n = 3;
      for (let j = 0; j < n; j++) {
        const f = j / n;
        topper.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, u: i / poly.length, k: 1, depth: 1, r: baseR * 0.9 });
      }
    }
  } else {
    // Deciduous tree wrapped in pixel strings: recursive branches with pixels along each.
    const H = groundY - topY - 10;
    const trunkTop = groundY - H * 0.32;
    const spacing = baseR * (dense ? 3.6 : 4);
    let minX = cx;
    let maxX = cx;
    const addBranch = (x1: number, y1: number, ang: number, len: number, depth: number, width: number) => {
      const x2 = x1 + Math.sin(ang) * len;
      const y2 = y1 - Math.cos(ang) * len;
      branches.push({ x1, y1, x2, y2, w: width });
      minX = Math.min(minX, x2);
      maxX = Math.max(maxX, x2);
      const n = Math.max(1, Math.floor(len / spacing));
      for (let i = 0; i <= n; i++) {
        const f = i / n;
        const px = x1 + (x2 - x1) * f;
        const py = y1 + (y2 - y1) * f;
        tree.push({ x: px, y: py, u: 0, k: 0, depth: 1, r: baseR * (0.55 + 0.2 * (1 - depth / 5)) });
      }
      if (depth >= (dense ? 5 : 4)) return;
      const kids = depth < 2 ? 3 : 2;
      for (let i = 0; i < kids; i++) {
        const spread = 0.55 + rnd() * 0.3;
        const childAng = ang + (i - (kids - 1) / 2) * spread + (rnd() - 0.5) * 0.25;
        addBranch(x2, y2, childAng, len * (0.62 + rnd() * 0.12), depth + 1, width * 0.62);
      }
    };
    addBranch(cx, groundY, 0, H * 0.32, 0, Math.max(10, w * 0.02));
    const spanX = Math.max(1, maxX - minX);
    for (const p of tree) {
      p.u = (p.x - minX) / spanX;
      p.k = Math.min(1, Math.max(0, (groundY - p.y) / H));
    }
    treeBase.w = spanX;
    void trunkTop;
  }

  if (showRoof) {
    const left = w * 0.04;
    const right = kind === "mega" ? w * 0.46 : w * 0.4;
    const eave = h * 0.52;
    const ridge = h * 0.24;
    const mid = (left + right) / 2;
    const pts: [number, number][] = [
      [left, groundY],
      [left, eave],
      [mid, ridge],
      [right, eave],
      [right, groundY],
    ];
    roofPath.push(...pts);
    const segs: [number, number][][] = [
      [pts[1], pts[2]],
      [pts[2], pts[3]],
    ];
    const count = dense ? 44 : 30;
    const total = count * segs.length;
    let idx = 0;
    for (const [a, b] of segs) {
      for (let i = 0; i < count; i++) {
        const f = i / (count - 1);
        const u = idx / total;
        roof.push({
          x: a[0] + (b[0] - a[0]) * f,
          y: a[1] + (b[1] - a[1]) * f - baseR * 1.3,
          u,
          k: 1 - Math.abs(u - 0.5) * 2,
          depth: 1,
          r: baseR * 1.05,
        });
        idx++;
      }
    }
  }

  return { tree, topper, roof, roofPath, branches, stars, hills, treeBase, w, h };
}

export function LightShowDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const engineRef = useRef<AudioEngine | null>(null);
  const stateRef = useRef<EffectState>(createEffectState());
  const sceneRef = useRef<Scene | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState<Source>("synth");
  const [fileName, setFileName] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("Pulse");
  const [theme, setTheme] = useState<ThemeName>("Christmas");
  const [treeKind, setTreeKind] = useState<TreeKind>("mega");
  const [showRoof, setShowRoof] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const palette = useMemo<RGB[]>(() => THEMES[theme].map(hexToRgb), [theme]);
  const paletteRef = useRef(palette);
  const modeRef = useRef(mode);
  const playingRef = useRef(playing);
  const reducedRef = useRef(reducedMotion);
  useEffect(() => {
    paletteRef.current = palette;
    modeRef.current = mode;
    playingRef.current = playing;
    reducedRef.current = reducedMotion;
  }, [palette, mode, playing, reducedMotion]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth;
    const h = Math.round(Math.min(Math.max(w * 0.66, 280), 540));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    sceneRef.current = buildScene(w, h, treeKind, showRoof, w >= 640);
  }, [treeKind, showRoof]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(() => resize());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [resize]);

  const draw = useCallback((dt: number) => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = canvas.width / scene.w;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { w, h } = scene;

    const engine = engineRef.current;
    const analysis = engine ? engine.analyse(dt) : { energy: 0, bass: 0, mids: 0, highs: 0, beat: 0, beatCount: 0 };
    const st = stateRef.current;
    const isPlaying = playingRef.current && Boolean(engine?.playing);
    stepEffects(st, analysis, dt, modeRef.current, isPlaying);
    const t = st.time;
    const reduced = reducedRef.current;

    // --- Sky: dusk gradient, stars, hills, ground ---
    ctx.globalCompositeOperation = "source-over";
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#04060F");
    sky.addColorStop(0.45, "#0B1430");
    sky.addColorStop(0.78, "#1E1B45");
    sky.addColorStop(0.9, "#3A2A3C");
    sky.addColorStop(1, "#0B0F1A");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    for (const s of scene.stars) {
      const tw = reduced ? 0.75 : 0.55 + 0.45 * Math.sin(t * 1.3 + s.p);
      ctx.fillStyle = `rgba(220,230,255,${(0.35 + 0.5 * tw).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    const groundY = scene.treeBase.y;
    ctx.fillStyle = "#070A16";
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (const [x, y] of scene.hills) ctx.lineTo(x, y);
    ctx.lineTo(w, groundY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0E1424";
    ctx.fillRect(0, groundY, w, h - groundY);

    // Roof silhouette
    if (scene.roofPath.length) {
      ctx.beginPath();
      ctx.moveTo(scene.roofPath[0][0], scene.roofPath[0][1]);
      for (let i = 1; i < scene.roofPath.length; i++) ctx.lineTo(scene.roofPath[i][0], scene.roofPath[i][1]);
      ctx.closePath();
      ctx.fillStyle = "#121a30";
      ctx.fill();
      ctx.strokeStyle = "#263052";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Branches (wrapped tree)
    if (scene.branches.length) {
      ctx.strokeStyle = "#141a2b";
      ctx.lineCap = "round";
      for (const b of scene.branches) {
        ctx.lineWidth = b.w;
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(b.x2, b.y2);
        ctx.stroke();
      }
    }

    // --- Pixels ---
    const out = { rgb: [0, 0, 0] as RGB, b: 0 };
    const pal = paletteRef.current;
    const m = modeRef.current;
    const glowScale = reduced ? 2.6 : 3.4;
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let sumN = 0;

    const drawPixels = (pixels: Pixel[], backPass: boolean, forceColor?: RGB, minB = 0) => {
      // Halos (additive) then cores.
      ctx.globalCompositeOperation = "lighter";
      const cores: { x: number; y: number; r: number; c: string }[] = [];
      for (const p of pixels) {
        const front = p.depth > 0.45;
        if (backPass === front) continue;
        pixelColor(m, pal, st, analysis, p.u, p.k, isPlaying, out);
        const rgb = forceColor ?? out.rgb;
        const b = Math.max(minB, out.b) * (front ? 1 : 0.42 * p.depth + 0.12);
        const [r, g, bl] = rgb;
        if (b > 0.12) {
          ctx.fillStyle = `rgba(${r},${g},${bl},${(b * 0.3).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * glowScale, 0, Math.PI * 2);
          ctx.fill();
        }
        const lum = 0.1 + b * 0.9;
        const hot = Math.max(0, b - 0.8) * 2.5; // white-hot centre at full brightness
        const cr = Math.round(r * lum + (255 - r * lum) * hot * 0.6);
        const cg = Math.round(g * lum + (255 - g * lum) * hot * 0.6);
        const cb = Math.round(bl * lum + (255 - bl * lum) * hot * 0.6);
        cores.push({ x: p.x, y: p.y, r: p.r, c: `rgb(${cr},${cg},${cb})` });
        if (front) {
          sumR += r * b;
          sumG += g * b;
          sumB += bl * b;
          sumN += 1;
        }
      }
      ctx.globalCompositeOperation = "source-over";
      for (const c of cores) {
        ctx.fillStyle = c.c;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawPixels(scene.tree, true);
    drawPixels(scene.tree, false);
    drawPixels(scene.roof, false);
    if (scene.topper.length) {
      const starColor: RGB = m === "Rainbow" ? [255, 240, 200] : pal[0];
      // The star always stays lit and flares on beats.
      drawPixels(scene.topper, false, starColor, 0.55 + 0.45 * (isPlaying ? analysis.energy : 0.3) + analysis.beat * 0.3);
    }

    // Ground spill: average lit colour pooled under the tree.
    if (sumN > 0) {
      const ar = Math.round(sumR / sumN);
      const ag = Math.round(sumG / sumN);
      const ab = Math.round(sumB / sumN);
      const strength = Math.min(1, (sumR + sumG + sumB) / (sumN * 255 * 3) * 2.2);
      const spill = ctx.createRadialGradient(scene.treeBase.x, groundY + 4, 2, scene.treeBase.x, groundY + 4, scene.treeBase.w * 0.9 + 40);
      spill.addColorStop(0, `rgba(${ar},${ag},${ab},${(0.42 * strength).toFixed(3)})`);
      spill.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = spill;
      ctx.fillRect(0, groundY - 2, w, h - groundY + 2);
      ctx.globalCompositeOperation = "source-over";
    }
  }, []);

  useEffect(() => {
    let running = true;
    const minFrame = reducedMotion ? 1 / 15 : 0;
    const loop = (ts: number) => {
      if (!running) return;
      const last = lastRef.current || ts;
      const dt = Math.min(0.1, (ts - last) / 1000);
      if (dt >= minFrame) {
        lastRef.current = ts;
        draw(dt || 0.016);
      }
      if (playing || !reducedMotion) rafRef.current = requestAnimationFrame(loop);
      else rafRef.current = 0;
    };
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, playing, reducedMotion, treeKind, showRoof, mode, theme]);

  useEffect(() => () => engineRef.current?.dispose(), []);

  const engine = () => (engineRef.current ??= new AudioEngine());

  const startSource = useCallback(async (src: Source) => {
    try {
      setNotice(null);
      await engine().start(src);
      setSource(src);
      setPlaying(true);
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (src === "mic") setNotice(name === "NotAllowedError" ? "Microphone access was blocked. Allow it in your browser to try live mode." : "No microphone available in this browser.");
      else if (src === "file") setNotice("Choose an audio file first.");
      else setNotice("Audio could not start in this browser.");
    }
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    setPlaying(false);
  }, []);

  const onFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        setNotice(null);
        await engine().loadFile(file);
        setFileName(file.name);
        await startSource("file");
      } catch {
        setNotice("That file could not be decoded. Try an MP3, WAV, OGG or M4A.");
      }
    },
    [startSource],
  );

  const sourceLabel = source === "synth" ? "Trepak · Tchaikovsky (synthesised)" : source === "file" ? `Your track · ${fileName ?? ""}` : "Live microphone";

  return (
    <div className="card overflow-hidden">
      <div ref={wrapRef} className="relative w-full bg-ink">
        <canvas
          ref={canvasRef}
          className="block w-full"
          role="img"
          aria-label="Simulated pixel tree and roofline at dusk, reacting to music"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 max-w-[85%]">
          <span className={`w-2 h-2 rounded-full shrink-0 ${playing ? "bg-[#3DDC84]" : "bg-[#8E98B4]"}`} aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-widest text-muted-strong font-semibold truncate">
            {playing ? `Live · ${sourceLabel}` : "Demo · press Play"}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 border-t border-soft">
        <div className="flex flex-wrap items-center gap-2">
          {playing && source === "synth" ? (
            <button type="button" onClick={stop} className="btn btn-primary min-w-[128px]" aria-pressed="true">
              <PauseIcon /> Pause
            </button>
          ) : (
            <button type="button" onClick={() => startSource("synth")} className="btn btn-primary min-w-[128px]" aria-pressed="false">
              <PlayIcon /> Play Trepak
            </button>
          )}
          <button type="button" className="seg" onClick={() => fileRef.current?.click()} aria-pressed={playing && source === "file"}>
            <UploadIcon /> Your track
          </button>
          <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={onFile} aria-label="Choose an audio file from your device" />
          <button
            type="button"
            className="seg"
            onClick={() => (playing && source === "mic" ? stop() : startSource("mic"))}
            aria-pressed={playing && source === "mic"}
          >
            <MicIcon /> {playing && source === "mic" ? "Stop mic" : "Microphone"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Props</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Props">
              <button type="button" className="seg" aria-pressed={treeKind === "mega"} onClick={() => setTreeKind("mega")}>Mega tree</button>
              <button type="button" className="seg" aria-pressed={treeKind === "wrapped"} onClick={() => setTreeKind("wrapped")}>Wrapped tree</button>
              <button type="button" className="seg" aria-pressed={showRoof} onClick={() => setShowRoof((v) => !v)}>Roofline</button>
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Mode</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Effect mode">
              {MODES.map((mm) => (
                <button key={mm} type="button" className="seg" aria-pressed={mode === mm} onClick={() => setMode(mm)}>{mm}</button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Colour theme</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Colour theme">
            {(Object.keys(THEMES) as ThemeName[]).map((tn) => (
              <button key={tn} type="button" className="seg gap-2" aria-pressed={theme === tn} onClick={() => setTheme(tn)}>
                <span className="flex -space-x-1" aria-hidden="true">
                  {THEMES[tn].slice(0, 4).map((c, i) => (
                    <span key={i} className="swatch" style={{ background: c }} />
                  ))}
                </span>
                {tn}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Play Trepak (the Russian Dance from Tchaikovsky&apos;s Nutcracker, public domain) synthesised live in your browser, pick a track from your own device (it never leaves your phone), or use your microphone — exactly what a Resonate kit listens to. Pixels follow the energy and beats of whatever is playing.
          {reducedMotion && " Reduced-motion is on: the simulation runs at a lower frame rate with softer transitions."}
        </p>
        {notice && <p className="text-xs text-red-400" role="alert">{notice}</p>}
      </div>
    </div>
  );
}

function PlayIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>;
}
function UploadIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" /></svg>;
}
function MicIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path strokeLinecap="round" d="M5 11a7 7 0 0014 0M12 18v3" /></svg>;
}
