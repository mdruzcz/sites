"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AudioEngine } from "./audioEngine";
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
type Scene = { tree: Pixel[]; roof: Pixel[]; roofPath: [number, number][]; w: number; h: number };

function buildScene(w: number, h: number, showTree: boolean, showRoof: boolean, dense: boolean): Scene {
  const tree: Pixel[] = [];
  const roof: Pixel[] = [];
  const roofPath: [number, number][] = [];

  const strings = dense ? 28 : 20;
  const perString = dense ? 34 : 26;
  const baseR = Math.max(5, w * 0.004 + 2);

  if (showTree) {
    const cx = showRoof ? w * 0.68 : w * 0.5;
    const topY = h * 0.1;
    const baseY = h * 0.9;
    const R = Math.min(w * (showRoof ? 0.2 : 0.3), (baseY - topY) * 0.55);
    for (let s = 0; s < strings; s++) {
      const theta = (s / strings) * Math.PI * 2 + Math.PI / 2; // start at front
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);
      for (let p = 0; p < perString; p++) {
        const k = p / (perString - 1);
        const radius = R * (1 - k * 0.92) + 2;
        const x = cx + radius * sin;
        const y = baseY - k * (baseY - topY) - radius * cos * 0.12;
        const depth = (cos + 1) / 2; // 1 = front
        tree.push({ x, y, u: s / strings, k, depth, r: baseR * (0.55 + 0.6 * depth) });
      }
    }
    // tree topper
    tree.push({ x: cx, y: topY - baseR * 1.5, u: 0, k: 1, depth: 1, r: baseR * 1.4 });
  }

  if (showRoof) {
    const left = w * 0.04;
    const right = showTree ? w * 0.47 : w * 0.96;
    const eave = h * 0.52;
    const ridge = h * 0.2;
    const mid = (left + right) / 2;
    const pts: [number, number][] = [
      [left, h * 0.9],
      [left, eave],
      [mid, ridge],
      [right, eave],
      [right, h * 0.9],
    ];
    roofPath.push(...pts);
    // pixels along the eave/gable segments (not the walls)
    const segs: [number, number][][] = [
      [pts[1], pts[2]],
      [pts[2], pts[3]],
    ];
    const count = dense ? 48 : 34;
    let idx = 0;
    const total = count * segs.length;
    for (const [a, b] of segs) {
      for (let i = 0; i < count; i++) {
        const f = i / (count - 1);
        const x = a[0] + (b[0] - a[0]) * f;
        const y = a[1] + (b[1] - a[1]) * f - baseR * 1.2;
        const u = idx / total;
        const k = 1 - Math.abs(u - 0.5) * 2; // ridge is "top"
        roof.push({ x, y, u, k, depth: 1, r: baseR * 1.05 });
        idx++;
      }
    }
  }

  return { tree, roof, roofPath, w, h };
}

export function LightShowDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<AudioEngine | null>(null);
  const stateRef = useRef<EffectState>(createEffectState());
  const sceneRef = useRef<Scene | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<Mode>("Pulse");
  const [theme, setTheme] = useState<ThemeName>("Christmas");
  const [showTree, setShowTree] = useState(true);
  const [showRoof, setShowRoof] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const palette = useMemo<RGB[]>(() => THEMES[theme].map(hexToRgb), [theme]);
  // Latest values for the animation loop, updated outside render.
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

  // Size canvas to container (DPR aware) and rebuild geometry.
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth;
    const h = Math.round(Math.min(Math.max(w * 0.62, 260), 520));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const dense = w >= 640;
    sceneRef.current = buildScene(w, h, showTree, showRoof, dense);
  }, [showTree, showRoof]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(() => resize());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [resize]);

  const draw = useCallback(
    (dt: number) => {
      const canvas = canvasRef.current;
      const scene = sceneRef.current;
      if (!canvas || !scene) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = canvas.width / scene.w;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const engine = engineRef.current;
      const analysis = engine ? engine.analyse(dt) : { energy: 0, bass: 0, mids: 0, highs: 0, beat: 0, beatCount: 0 };
      const st = stateRef.current;
      const isPlaying = playingRef.current && Boolean(engine?.playing);
      stepEffects(st, analysis, dt, modeRef.current, isPlaying);

      // Background
      ctx.fillStyle = "#0B0F1A";
      ctx.fillRect(0, 0, scene.w, scene.h);
      const grad = ctx.createRadialGradient(scene.w * 0.5, scene.h * 0.95, 10, scene.w * 0.5, scene.h * 0.9, scene.w * 0.8);
      grad.addColorStop(0, "rgba(255,154,60,0.10)");
      grad.addColorStop(1, "rgba(11,15,26,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, scene.w, scene.h);
      // Ground
      ctx.fillStyle = "#101627";
      ctx.fillRect(0, scene.h * 0.9, scene.w, scene.h * 0.1);

      // Roof silhouette
      if (scene.roofPath.length) {
        ctx.beginPath();
        ctx.moveTo(scene.roofPath[0][0], scene.roofPath[0][1]);
        for (let i = 1; i < scene.roofPath.length; i++) ctx.lineTo(scene.roofPath[i][0], scene.roofPath[i][1]);
        ctx.closePath();
        ctx.fillStyle = "#161E33";
        ctx.fill();
        ctx.strokeStyle = "#2A3454";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const out = { rgb: [0, 0, 0] as RGB, b: 0 };
      const pal = paletteRef.current;
      const m = modeRef.current;
      const glowScale = reducedRef.current ? 2.2 : 3;

      const drawPixels = (pixels: Pixel[], backPass: boolean) => {
        for (const p of pixels) {
          const front = p.depth > 0.45;
          if (backPass === front) continue;
          pixelColor(m, pal, st, analysis, p.u, p.k, isPlaying, out);
          const b = out.b * (front ? 1 : 0.35 * p.depth + 0.1);
          const [r, g, bl] = out.rgb;
          if (b > 0.18) {
            ctx.fillStyle = `rgba(${r},${g},${bl},${(b * 0.22).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * glowScale, 0, Math.PI * 2);
            ctx.fill();
          }
          const lum = 0.08 + b * 0.92;
          ctx.fillStyle = `rgba(${Math.round(r * lum)},${Math.round(g * lum)},${Math.round(bl * lum)},1)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawPixels(scene.tree, true);
      drawPixels(scene.tree, false);
      drawPixels(scene.roof, false);
    },
    [],
  );

  // Animation loop
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
      if (playing || reducedMotion === false) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        // reduced motion + paused: draw one static frame and stop
        rafRef.current = 0;
      }
    };
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, playing, reducedMotion, showTree, showRoof, mode, theme]);

  useEffect(() => () => engineRef.current?.dispose(), []);

  const togglePlay = useCallback(async () => {
    try {
      if (!engineRef.current) engineRef.current = new AudioEngine();
      const engine = engineRef.current;
      if (engine.playing) {
        engine.stop();
        setPlaying(false);
      } else {
        await engine.start();
        setPlaying(true);
      }
      setAudioError(null);
    } catch {
      setAudioError("Audio could not start in this browser. The simulation still runs with an idle pattern.");
    }
  }, []);

  return (
    <div className="card overflow-hidden">
      <div ref={wrapRef} className="relative w-full bg-ink">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="Simulated pixel mega tree and roofline reacting to music" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${playing ? "bg-[#3DDC84]" : "bg-[#8E98B4]"}`} aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-widest text-muted-strong font-semibold">
            {playing ? "Live · Für Elise (synthesised)" : "Demo · press Play"}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 border-t border-soft">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={togglePlay} className="btn btn-primary min-w-[128px]" aria-pressed={playing}>
            {playing ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                Play
              </>
            )}
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Props">
            <button type="button" className="seg" aria-pressed={showTree} onClick={() => setShowTree((v) => !v || !showRoof ? true : false)}>
              Mega tree
            </button>
            <button type="button" className="seg" aria-pressed={showRoof} onClick={() => setShowRoof((v) => !v)}>
              Roofline
            </button>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Mode</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Effect mode">
            {MODES.map((m) => (
              <button key={m} type="button" className="seg" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Colour theme</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Colour theme">
            {(Object.keys(THEMES) as ThemeName[]).map((t) => (
              <button key={t} type="button" className="seg gap-2" aria-pressed={theme === t} onClick={() => setTheme(t)}>
                <span className="flex -space-x-1" aria-hidden="true">
                  {THEMES[t].slice(0, 4).map((c, i) => (
                    <span key={i} className="swatch" style={{ background: c }} />
                  ))}
                </span>
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          The music is Beethoven&apos;s Für Elise (public domain), synthesised live in your browser with the Web Audio API — no recording is played. Pixels react to the energy and beats of the synthesised audio the same way a Resonate kit reacts to its microphone.
          {reducedMotion && " Reduced-motion is on: the simulation runs at a lower frame rate with softer transitions."}
        </p>
        {audioError && <p className="text-xs text-red-400" role="alert">{audioError}</p>}
      </div>
    </div>
  );
}
