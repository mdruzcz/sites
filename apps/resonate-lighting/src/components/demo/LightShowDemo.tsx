"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  audio,
  bands,
  clamp,
  coloursFor,
  cssGradient,
  hexRgb,
  MUSIC_LOOKS,
  renderSelection,
  SCHEMES,
  smoothFor,
  STEADY_LOOKS,
  syntheticPast,
  THEMES,
  type AudioFrame,
  type PastFn,
  type RGB,
  type Selection,
} from "@/lib/lightshow/core";
import { MicError, MicListener, Performance, PIANO_HIGH, PIANO_LOW, playDrum, playNote, setMuted, audioContext, type DrumKind } from "@/lib/lightshow/live";
import { SceneRenderer } from "@/lib/lightshow/renderer";
import { buildScene, SCENES, type SceneId } from "@/lib/lightshow/scenes";
import { addTicker } from "@/lib/lightshow/ticker";
import { deviceQuality, useReducedMotion } from "./useReducedMotion";

type Mode = "preview" | "mic" | "piano" | "drums";
type Tab = "themes" | "looks" | "colours";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "preview", label: "Preview", hint: "Themes and steady looks play on their own. Music looks follow a simulated beat." },
  { id: "mic", label: "Microphone", hint: "Play music near your device. The lights follow its loudness and beats, like the kit's USB microphone." },
  { id: "piano", label: "Piano", hint: "Each note lights a band at its pitch: low notes at the bottom, high notes at the top." },
  { id: "drums", label: "Drums", hint: "Kick flashes the prop from the bottom, snare sparkles, hi-hat twinkles the top, crash washes it all." },
];

const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const KEYMAP: Record<string, number> = {
  z: 48, s: 49, x: 50, d: 51, c: 52, v: 53, g: 54, b: 55, h: 56, n: 57, j: 58, m: 59, ",": 60,
  q: 60, "2": 61, w: 62, "3": 63, e: 64, r: 65, "5": 66, t: 67, "6": 68, y: 69, "7": 70, u: 71, i: 72,
};
const KEY_FOR_MIDI: Record<number, string> = {};
for (const [k, v] of Object.entries(KEYMAP)) if (!(v in KEY_FOR_MIDI) || k === "q") KEY_FOR_MIDI[v] = k.toUpperCase();

const DRUMS: { id: DrumKind; label: string; keys: string[]; note: string }[] = [
  { id: "kick", label: "Kick", keys: ["a", "1"], note: "Flash from the bottom" },
  { id: "snare", label: "Snare", keys: ["s", "2"], note: "Sparkles" },
  { id: "hat", label: "Hi-hat", keys: ["d", "3"], note: "Top twinkle" },
  { id: "crash", label: "Crash", keys: ["f", "4"], note: "Full wash" },
];

const isBlack = (m: number) => [1, 3, 6, 8, 10].includes(m % 12);
const midiName = (m: number) => `${NOTE_NAMES[m % 12]}${Math.floor(m / 12) - 1}`;

function selectionName(sel: Selection) {
  if (sel.kind === "theme") return sel.name;
  if (sel.kind === "music") return MUSIC_LOOKS.find((m) => m.id === sel.id)?.name ?? sel.id;
  return STEADY_LOOKS.find((m) => m.id === sel.id)?.name ?? sel.id;
}

function typingInField(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

export function LightShowDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const threshRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [scene, setScene] = useState<SceneId>("mega");
  const [mode, setMode] = useState<Mode>("preview");
  const [sel, setSel] = useState<Selection>({ kind: "theme", name: "Candy Cane" });
  const [scheme, setScheme] = useState("Red & Green");
  const [tab, setTab] = useState<Tab>("themes");
  const [react, setReact] = useState(true);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(true);
  const [mic, setMic] = useState<"off" | "starting" | "on" | "error">("off");
  const [micMsg, setMicMsg] = useState("");
  const [gate, setGate] = useState(false);
  const [sens, setSens] = useState(0.5);

  const live = useRef({
    renderer: null as SceneRenderer | null,
    mic: null as MicListener | null,
    perf: new Performance(),
    t: 3,
    mode: "preview" as Mode,
    sel: sel,
    C: [] as RGB[],
    react: true,
    paused: false,
    reduced: false,
    gate: false,
    visible: false,
  });

  // renderer + scene
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const L = live.current;
    const s = buildScene(scene, deviceQuality());
    try {
      if (!L.renderer) L.renderer = new SceneRenderer(cv, { camera: s.camera, reduced: L.reduced || L.paused });
      L.renderer.setProps(s.props, s.camera);
    } catch {
      return;
    }
  }, [scene]);

  // keep the loop's view of React state current
  useEffect(() => {
    const L = live.current;
    L.mode = mode;
    L.sel = sel;
    L.react = react;
    L.paused = paused;
    L.reduced = reduced;
    L.C = coloursFor(sel, SCHEMES.find((s) => s.name === scheme)?.colours ?? SCHEMES[3].colours).map(hexRgb);
    if (L.renderer) {
      L.renderer.reduced = reduced || paused;
      const base = mode === "piano" || mode === "drums" ? 0.12 : mode === "mic" ? smoothFor(sel) * 0.8 : 0;
      L.renderer.smoothing = reduced ? Math.max(0.75, base) : base;
    }
  }, [mode, sel, scheme, react, paused, reduced]);

  // the one animation loop
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const L = live.current;
    let lastGate = false;
    const stop = addTicker(cv, (dt) => {
      const r = L.renderer;
      if (!r) return;
      const interactive = L.mode !== "preview";
      if (L.paused && !interactive) return;
      const speed = L.reduced ? 0.35 : 1;
      L.t += dt * speed;
      const t = L.t;
      let au: AudioFrame;
      let past: PastFn;
      if (L.mode === "mic" && L.mic?.running) {
        L.mic.update(dt);
        au = L.mic.frame();
        past = L.mic.past;
        if (meterRef.current && threshRef.current) {
          const lo = L.mic.floor - 3;
          const hi = L.mic.floor + 35;
          const pos = (x: number) => clamp((x - lo) / (hi - lo)) * 100;
          meterRef.current.style.width = `${pos(L.mic.db)}%`;
          meterRef.current.style.background = L.mic.gate ? "#3DDC84" : "#5a6480";
          threshRef.current.style.left = `${pos(L.mic.floor + L.mic.margin)}%`;
        }
        if (L.mic.gate !== lastGate) {
          lastGate = L.mic.gate;
          setGate(lastGate);
        }
      } else if (L.mode === "piano" || L.mode === "drums") {
        L.perf.update(dt);
        au = L.perf.frame();
        past = L.perf.past;
      } else {
        au = audio(t);
        past = syntheticPast(t);
      }
      const C = L.C;
      const sel = L.sel;
      const mode = L.mode;
      r.draw(dt, (p, out) => {
        const g = p.g;
        if (mode === "piano") {
          if (sel.kind === "music" && sel.id === "pitchSpectrum") {
            bands(L.perf.notes, C, g, out);
          } else {
            renderSelection(sel, C, t, g, out, au, past, false);
            bands(L.perf.notes, C, g, out, 0.07, 0.16);
          }
          return;
        }
        if (mode === "drums") {
          renderSelection(sel, C, t, g, out, au, past, false);
          for (let i = 0; i < g.n * 3; i++) out[i] *= 0.2;
          L.perf.drumOverlay(C, g, out, L.reduced);
          return;
        }
        if (mode === "mic") {
          if (!L.mic?.running) {
            renderSelection(sel, C, t, g, out, { ...au, kick: 0, level: 0, mid: 0, hi: 0, notes: [] }, () => ({ kick: 0, mid: 0, hi: 0 }), false);
          } else renderSelection(sel, C, t, g, out, au, past, L.react);
          if (sel.kind === "music") {
            // quiet room: music looks rest on an always-on glow, as on the Pi
            const { a, h } = g;
            const k = C.length;
            for (let i = 0; i < g.n; i++) {
              const x = (((a[i] + h[i] * 0.2) % 1) + 1) % 1;
              const c0 = C[Math.floor(x * k) % k];
              const j = i * 3;
              out[j] = Math.max(out[j], c0[0] * 0.06);
              out[j + 1] = Math.max(out[j + 1], c0[1] * 0.06);
              out[j + 2] = Math.max(out[j + 2], c0[2] * 0.06);
            }
          }
          return;
        }
        renderSelection(sel, C, t, g, out, au, past, false);
      });
    });
    return () => {
      stop();
    };
  }, []);

  // release the microphone when leaving mic mode or the page
  useEffect(() => {
    const L = live.current;
    if (mode !== "mic" && L.mic?.running) {
      L.mic.stop();
      setMic("off");
      setGate(false);
    }
  }, [mode]);
  useEffect(() => () => live.current.mic?.stop(), []);

  useEffect(() => {
    live.current.mic?.setSensitivity(sens);
  }, [sens]);

  const startMic = useCallback(async () => {
    const L = live.current;
    setMic("starting");
    setMicMsg("");
    try {
      L.mic ??= new MicListener();
      L.mic.setSensitivity(sens);
      await L.mic.start();
      setMic("on");
    } catch (e) {
      setMic("error");
      const code = e instanceof MicError ? e.code : "unknown";
      setMicMsg(
        code === "denied"
          ? "Microphone access was blocked, so nothing was recorded. To try it, allow the microphone for this site in your browser settings and press Start again. Piano and Drums work without it."
          : code === "notfound"
            ? "No microphone was found on this device. Try Piano or Drums instead."
            : code === "busy"
              ? "Another app is using the microphone. Close it and press Start again."
              : code === "insecure"
                ? "The microphone needs a secure (https) connection."
                : "The microphone could not start in this browser. Try Piano or Drums instead.",
      );
    }
  }, [sens]);

  const stopMic = useCallback(() => {
    live.current.mic?.stop();
    setMic("off");
    setGate(false);
  }, []);

  // instruments
  const flash = (el: Element | null) => {
    if (!el) return;
    el.classList.add("is-down");
    window.setTimeout(() => el.classList.remove("is-down"), 160);
  };
  const playKey = useCallback(
    (midi: number) => {
      audioContext();
      if (sound) playNote(midi);
      live.current.perf.note(midi);
      flash(wrapRef.current?.querySelector(`[data-midi="${midi}"]`) ?? null);
    },
    [sound],
  );
  const hitDrum = useCallback(
    (kind: DrumKind) => {
      audioContext();
      if (sound) playDrum(kind);
      live.current.perf.hit(kind);
      flash(wrapRef.current?.querySelector(`[data-drum="${kind}"]`) ?? null);
    },
    [sound],
  );

  useEffect(() => setMuted(!sound), [sound]);

  useEffect(() => {
    if (mode !== "piano" && mode !== "drums") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || typingInField(e)) return;
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const k = e.key.toLowerCase();
      if (mode === "piano" && k in KEYMAP) {
        e.preventDefault();
        playKey(KEYMAP[k]);
      } else if (mode === "drums") {
        const d = DRUMS.find((x) => x.keys.includes(k));
        if (d) {
          e.preventDefault();
          hitDrum(d.id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, playKey, hitDrum]);

  const sceneMeta = SCENES.find((s) => s.id === scene)!;
  const usesScheme = sel.kind !== "theme" && !(sel.kind === "steady" && sel.id === "rainbow");
  const nowLabel = `${selectionName(sel)} · ${sel.kind === "theme" ? "theme" : sel.kind === "music" ? "music look" : "steady look"}${usesScheme ? ` · ${scheme}` : ""}`;
  const modeBadge =
    mode === "preview"
      ? sel.kind === "music"
        ? "Preview · simulated beat"
        : "Preview"
      : mode === "mic"
        ? mic === "on"
          ? gate
            ? "Live mic · music detected"
            : "Live mic · quiet, resting on the glow"
          : "Microphone · press Start"
        : mode === "piano"
          ? "Piano · play a key"
          : "Drums · hit a pad";

  const whites: number[] = [];
  const blacks: number[] = [];
  for (let m = PIANO_LOW; m <= PIANO_HIGH; m++) (isBlack(m) ? blacks : whites).push(m);

  return (
    <div ref={wrapRef} className="card overflow-hidden">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#04060b]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          role="img"
          aria-label={`3D simulation: ${sceneMeta.label.toLowerCase()} running ${nowLabel}`}
        >
          {sceneMeta.blurb}
        </canvas>
        <div className="absolute top-3 left-3 right-14 flex flex-col gap-1 pointer-events-none">
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${mode === "preview" ? "bg-[#8E98B4]" : "bg-[#3DDC84]"}`} aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-widest text-muted-strong font-semibold truncate">{modeBadge}</span>
          </span>
          <span className="text-sm text-white/90 font-semibold truncate">{nowLabel}</span>
        </div>
        {mode === "preview" && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="absolute top-2 right-2 w-11 h-11 rounded-full bg-black/40 border border-white/15 text-white flex items-center justify-center hover:bg-black/60"
            aria-label={paused ? "Play animation" : "Pause animation"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
        {mode === "mic" && mic === "on" && (
          <div className="absolute left-3 right-3 bottom-3 pointer-events-none" aria-hidden="true">
            <div className="relative h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div ref={meterRef} className="absolute left-0 top-0 bottom-0 rounded-full transition-[background] duration-300" style={{ width: "0%" }} />
              <div ref={threshRef} className="absolute -top-1 -bottom-1 w-0.5 bg-white" style={{ left: "50%" }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 space-y-4 border-t border-soft">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Prop</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1" role="group" aria-label="Choose a prop">
            {SCENES.map((s) => (
              <button key={s.id} type="button" className="seg shrink-0" aria-pressed={scene === s.id} onClick={() => setScene(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Try it</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Interaction mode">
            {MODES.map((m) => (
              <button key={m.id} type="button" className="seg justify-center gap-2" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                <ModeIcon id={m.id} />
                {m.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-2 leading-relaxed">{MODES.find((m) => m.id === mode)!.hint}</p>
        </div>

        {mode === "mic" && (
          <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {mic === "on" ? (
                <button type="button" className="btn btn-ghost" onClick={stopMic}>
                  <MicIcon /> Stop microphone
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={startMic} disabled={mic === "starting"}>
                  <MicIcon /> {mic === "starting" ? "Waiting for permission…" : "Start microphone"}
                </button>
              )}
              <label className="flex items-center gap-2 text-sm text-muted-strong min-h-[44px] cursor-pointer">
                <input type="checkbox" checked={react} onChange={(e) => setReact(e.target.checked)} className="w-5 h-5 accent-[#FF9A3C]" />
                Themes react to music
              </label>
            </div>
            <div>
              <label htmlFor="demo-sens" className="flex justify-between text-sm text-muted-strong mb-1">
                <span>Music sensitivity</span>
                <span className="text-muted">{Math.round(sens * 100)}%</span>
              </label>
              <input id="demo-sens" type="range" min={0} max={1} step={0.01} value={sens} onChange={(e) => setSens(+e.target.value)} className="w-full h-10 accent-[#FF9A3C]" />
              <p className="text-xs text-muted leading-relaxed">
                The same quiet-room gate as the controller: it tracks the room&apos;s background noise and only lets music looks move when sound stays above the line on the meter. Talking and fans are ignored; the lights rest on a soft glow.
              </p>
            </div>
            <p className="text-xs text-muted" aria-live="polite">
              {mic === "on"
                ? gate
                  ? "Music detected."
                  : "Listening. Quiet, so music looks are resting on the glow."
                : "Your microphone is analysed in this browser only. Nothing is recorded or sent anywhere."}
            </p>
            {mic === "error" && (
              <p className="text-sm text-[#FFB4C0]" role="alert">
                {micMsg}
              </p>
            )}
          </div>
        )}

        {mode === "piano" && (
          <div className="space-y-2">
            <div className="relative h-36 sm:h-40 select-none touch-manipulation" role="group" aria-label="Piano keyboard, C3 to C5">
              <div className="absolute inset-0 flex">
                {whites.map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-midi={m}
                    aria-label={midiName(m)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      playKey(m);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        playKey(m);
                      }
                    }}
                    className="piano-white flex-1 relative rounded-b-md border border-[#2A3454] bg-[#E9EDF7] flex items-end justify-center pb-1.5 text-[10px] font-semibold text-[#4a5470]"
                  >
                    <span className="hidden sm:inline">{KEY_FOR_MIDI[m]}</span>
                  </button>
                ))}
              </div>
              {blacks.map((m) => {
                const whiteIndex = whites.filter((w) => w < m).length;
                return (
                  <button
                    key={m}
                    type="button"
                    data-midi={m}
                    aria-label={midiName(m)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      playKey(m);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        playKey(m);
                      }
                    }}
                    className="piano-black absolute top-0 h-[60%] rounded-b-md bg-[#161E33] border border-black flex items-end justify-center pb-1 text-[9px] font-semibold text-white/60 z-10"
                    style={{ left: `calc(${(whiteIndex / whites.length) * 100}% - ${(0.62 / whites.length) * 50}%)`, width: `${(0.62 / whites.length) * 100}%` }}
                  >
                    <span className="hidden sm:inline">{KEY_FOR_MIDI[m]}</span>
                  </button>
                );
              })}
            </div>
            <InstrumentFoot sound={sound} setSound={setSound} keysNote="Computer keys: Z–M and Q–I rows." />
          </div>
        )}

        {mode === "drums" && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 select-none touch-manipulation" role="group" aria-label="Drum pads">
              {DRUMS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  data-drum={d.id}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    hitDrum(d.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      hitDrum(d.id);
                    }
                  }}
                  className="drum-pad rounded-xl border border-line bg-surface-200 min-h-[84px] flex flex-col items-center justify-center gap-1 text-white"
                >
                  <span className="font-bold">{d.label}</span>
                  <span className="text-[11px] text-muted">{d.note}</span>
                  <span className="hidden sm:inline text-[10px] text-muted uppercase tracking-widest">Key {d.keys[0].toUpperCase()}</span>
                </button>
              ))}
            </div>
            <InstrumentFoot sound={sound} setSound={setSound} keysNote="Computer keys: A S D F (or 1 2 3 4)." />
          </div>
        )}

        <div>
          <div className="flex gap-1 border-b border-soft mb-3" role="tablist" aria-label="Pickers">
            {(["themes", "looks", "colours"] as Tab[]).map((tb) => (
              <button
                key={tb}
                type="button"
                role="tab"
                aria-selected={tab === tb}
                onClick={() => setTab(tb)}
                className={`px-3 min-h-[44px] text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${tab === tb ? "border-resonant text-white" : "border-transparent text-muted hover:text-white"}`}
              >
                {tb}
              </button>
            ))}
          </div>

          {tab === "themes" && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Themes">
              {THEMES.map((th) => (
                <button key={th.name} type="button" className="seg gap-2" aria-pressed={sel.kind === "theme" && sel.name === th.name} onClick={() => setSel({ kind: "theme", name: th.name })}>
                  <span className="swatch" style={{ background: cssGradient(th.colours) }} aria-hidden="true" />
                  {th.name}
                </button>
              ))}
            </div>
          )}

          {tab === "looks" && (
            <div className="space-y-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Music looks</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Music looks">
                  {MUSIC_LOOKS.map((m) => (
                    <button key={m.id} type="button" className="seg" aria-pressed={sel.kind === "music" && sel.id === m.id} onClick={() => setSel({ kind: "music", id: m.id })}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Steady looks</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Steady looks">
                  {STEADY_LOOKS.map((m) => (
                    <button key={m.id} type="button" className="seg" aria-pressed={sel.kind === "steady" && sel.id === m.id} onClick={() => setSel({ kind: "steady", id: m.id })}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted">Looks use the colour scheme from the Colours tab.</p>
            </div>
          )}

          {tab === "colours" && (
            <div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1" role="group" aria-label="Colour schemes">
                {SCHEMES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    aria-pressed={scheme === s.name}
                    onClick={() => {
                      setScheme(s.name);
                      if (sel.kind === "theme") setSel({ kind: "steady", id: themeToSteady(sel.name) });
                    }}
                    className="shrink-0 w-[72px] min-h-[44px] flex flex-col items-center gap-1.5 text-[11px] text-muted aria-pressed:text-white"
                  >
                    <span
                      className={`block w-12 h-12 rounded-full border-[3px] ${scheme === s.name && sel.kind !== "theme" ? "border-white" : "border-transparent"}`}
                      style={{ background: cssGradient(s.colours), boxShadow: "0 0 0 1px #2A3454" }}
                      aria-hidden="true"
                    />
                    <span className="text-center leading-tight">{s.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">
                {sel.kind === "theme" ? "Picking colours switches the theme's pattern to a look in those colours, as in the app." : `Current: ${scheme}`}
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-muted leading-relaxed">
          The patterns, themes, colour schemes and looks here are the same ones in the Light Show app on every kit. This is a simulation of our props in your browser; nothing you play or say leaves your device.
          {reduced && " Reduced motion is on, so the camera holds still and changes are softened."}
        </p>
      </div>
    </div>
  );
}

/** The app turns a theme into a steady look when you pick colours; use the closest one we list. */
function themeToSteady(name: string) {
  const pattern = THEMES.find((t) => t.name === name)?.pattern ?? "blend";
  return STEADY_LOOKS.some((s) => s.id === pattern) ? pattern : "blend";
}

function InstrumentFoot({ sound, setSound, keysNote }: { sound: boolean; setSound: (v: boolean) => void; keysNote: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-xs text-muted hidden sm:block">{keysNote}</p>
      <label className="flex items-center gap-2 text-sm text-muted-strong min-h-[44px] cursor-pointer">
        <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} className="w-5 h-5 accent-[#FF9A3C]" />
        Sound
      </label>
    </div>
  );
}

function ModeIcon({ id }: { id: Mode }) {
  const common = { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true } as const;
  if (id === "mic") return <MicIcon />;
  if (id === "piano")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M8 5v8M13 5v8M18 5v8M6 13h4M11 13h4M16 13h4" />
      </svg>
    );
  if (id === "drums")
    return (
      <svg {...common}>
        <ellipse cx="12" cy="9" rx="8" ry="3" />
        <path d="M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9M15 3l-3 6M9 3l3 6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 2l6 15H6z" />
      <path d="M12 17v4" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path strokeLinecap="round" d="M5 11a7 7 0 0014 0M12 18v3" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
