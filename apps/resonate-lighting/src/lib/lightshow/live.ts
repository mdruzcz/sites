// Live input for the demo: the visitor's microphone (analysed in the browser,
// never recorded or sent anywhere) and a synthesised piano and drum kit built
// from Web Audio oscillators and noise. No samples, no music files.

import { clamp, frac, mulberry32, palLin, type AudioFrame, type Geom, type Note, type PastFn, type RGB } from "./core";

// ---------------------------------------------------------------------------
// Audio context + output
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let muted = false;

export function audioContext(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.7;
    master.connect(comp);
    comp.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noise.getChannelData(0);
    const rnd = mulberry32(99);
    for (let i = 0; i < d.length; i++) d[i] = rnd() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setMuted(m: boolean) {
  muted = m;
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : 0.7, ctx.currentTime, 0.02);
}

const midiHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

/** A short plucked-piano tone: triangle + sine overtone through a soft low-pass. */
export function playNote(midi: number, velocity = 0.8) {
  const ac = audioContext();
  if (!master) return;
  const t = ac.currentTime;
  const f = midiHz(midi);
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.42 * velocity, t + 0.008);
  env.gain.exponentialRampToValueAtTime(0.14 * velocity, t + 0.35);
  env.gain.exponentialRampToValueAtTime(0.0008, t + 1.5);
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(Math.min(9000, f * 9), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(400, f * 2.5), t + 0.9);
  const o1 = ac.createOscillator();
  o1.type = "triangle";
  o1.frequency.value = f;
  const o2 = ac.createOscillator();
  o2.type = "sine";
  o2.frequency.value = f * 2;
  const g2 = ac.createGain();
  g2.gain.value = 0.22;
  o1.connect(lp);
  o2.connect(g2).connect(lp);
  lp.connect(env).connect(master);
  o1.start(t);
  o2.start(t);
  o1.stop(t + 1.6);
  o2.stop(t + 1.6);
}

export type DrumKind = "kick" | "snare" | "hat" | "crash";

function noiseBurst(ac: AudioContext, t: number, dur: number, filters: BiquadFilterNode[], peak: number, decay: number) {
  if (!noise || !master) return;
  const src = ac.createBufferSource();
  src.buffer = noise;
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(peak, t + 0.003);
  env.gain.exponentialRampToValueAtTime(0.0005, t + decay);
  let node: AudioNode = src;
  for (const f of filters) node = node.connect(f);
  node.connect(env).connect(master);
  src.start(t, Math.random() * 1.5);
  src.stop(t + dur);
}

function filter(ac: AudioContext, type: BiquadFilterType, freq: number, q = 0.7) {
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

export function playDrum(kind: DrumKind) {
  const ac = audioContext();
  if (!master) return;
  const t = ac.currentTime;
  if (kind === "kick") {
    const o = ac.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(155, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(1, t + 0.004);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
    o.connect(env).connect(master);
    o.start(t);
    o.stop(t + 0.5);
    noiseBurst(ac, t, 0.03, [filter(ac, "highpass", 2500)], 0.18, 0.02);
  } else if (kind === "snare") {
    const o = ac.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(160, t + 0.08);
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.45, t + 0.003);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    o.connect(env).connect(master);
    o.start(t);
    o.stop(t + 0.15);
    noiseBurst(ac, t, 0.3, [filter(ac, "highpass", 1300), filter(ac, "peaking", 3500, 1)], 0.6, 0.22);
  } else if (kind === "hat") {
    noiseBurst(ac, t, 0.1, [filter(ac, "highpass", 7500), filter(ac, "bandpass", 10500, 0.8)], 0.5, 0.06);
  } else {
    noiseBurst(ac, t, 2.2, [filter(ac, "highpass", 4200), filter(ac, "peaking", 7000, 0.6)], 0.5, 1.9);
    noiseBurst(ac, t, 0.4, [filter(ac, "bandpass", 2500, 0.9)], 0.25, 0.3);
  }
}

// ---------------------------------------------------------------------------
// Microphone: the same quiet-room gate as the Pi engine, plus beat and band analysis.
export class MicError extends Error {
  constructor(public code: "unsupported" | "insecure" | "denied" | "notfound" | "busy" | "unknown", message: string) {
    super(message);
  }
}

type Sample = { t: number; kick: number; mid: number; hi: number };

export class MicListener {
  private stream: MediaStream | null = null;
  private src: MediaStreamAudioSourceNode | null = null;
  private an: AnalyserNode | null = null;
  private td: Float32Array<ArrayBuffer> = new Float32Array(0);
  private fd: Float32Array<ArrayBuffer> = new Float32Array(0);
  private t = 0;
  // engine.py Audio state
  db = -90;
  floor = -60;
  peak = -20;
  margin = 9;
  gate = false;
  level = 0;
  g = 0;
  private aboveT = 0;
  private loudAt = -10;
  // beats and bands
  private lowAvg = 0;
  private prevLow = 0;
  private lastBeat = -10;
  private interval = 0.5;
  private strength = 0;
  beat = 0;
  private midMax = 1e-6;
  private hiMax = 1e-6;
  private mid = 0;
  private hi = 0;
  private slow = 0;
  private hist: Sample[] = [];
  private notes: Note[] = [];
  private noteClock = 0;

  get running() {
    return !!this.stream;
  }

  async start() {
    if (typeof window !== "undefined" && !window.isSecureContext) throw new MicError("insecure", "The microphone only works on a secure (https) page.");
    if (!navigator.mediaDevices?.getUserMedia) throw new MicError("unsupported", "This browser does not offer microphone access.");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) {
      const name = (e as { name?: string })?.name;
      if (name === "NotAllowedError" || name === "SecurityError") throw new MicError("denied", "Microphone access was blocked.");
      if (name === "NotFoundError" || name === "OverconstrainedError") throw new MicError("notfound", "No microphone was found on this device.");
      if (name === "NotReadableError") throw new MicError("busy", "The microphone is in use by another app.");
      throw new MicError("unknown", "The microphone could not start.");
    }
    const ac = audioContext();
    this.stream = stream;
    this.src = ac.createMediaStreamSource(stream);
    this.an = ac.createAnalyser();
    this.an.fftSize = 2048;
    this.an.smoothingTimeConstant = 0.45;
    this.src.connect(this.an); // analysed only: never routed to the speakers
    this.td = new Float32Array(this.an.fftSize);
    this.fd = new Float32Array(this.an.frequencyBinCount);
    this.floor = -60;
    this.peak = -20;
    this.gate = false;
    this.g = 0;
  }

  stop() {
    this.stream?.getTracks().forEach((tr) => tr.stop());
    this.src?.disconnect();
    this.stream = null;
    this.src = null;
    this.an = null;
    this.gate = false;
    this.level = 0;
  }

  /** Music sensitivity 0..1, mapped like the app: margin = 15 − 10 × sensitivity dB. */
  setSensitivity(s: number) {
    this.margin = 15 - 10 * clamp(s);
  }

  update(dt: number) {
    this.t += dt;
    for (const n of this.notes) n.age += dt;
    this.notes = this.notes.filter((n) => n.age < 2);
    const an = this.an;
    if (!an || !ctx) return;
    an.getFloatTimeDomainData(this.td);
    let sum = 0;
    for (let i = 0; i < this.td.length; i++) sum += this.td[i] * this.td[i];
    const db = 20 * Math.log10(Math.sqrt(sum / this.td.length) + 1e-9);
    this.db = db;
    // engine.py runs this per 32 ms block; scale the rates to this frame's dt
    const blocks = dt * 31.25;
    const rate = (k: number) => 1 - Math.pow(1 - k, blocks);
    if (db < this.floor) this.floor += (db - this.floor) * rate(0.2);
    else this.floor += (db - this.floor) * rate(this.gate ? 0.0001 : 0.0015);
    this.peak = Math.max(db, this.peak - 0.01 * blocks);
    this.aboveT = db > this.floor + this.margin ? this.aboveT + dt : 0;
    if (db > this.floor + this.margin * 0.6) this.loudAt = this.t;
    if (this.aboveT >= 0.09) this.gate = true;
    else if (this.gate && this.t - this.loudAt > 1.5) this.gate = false;
    const span = Math.max(6, this.peak - this.floor - this.margin);
    this.level = clamp((db - this.floor - this.margin) / span);
    const want = this.gate ? 1 : 0;
    this.g += (want - this.g) * (1 - Math.pow(1 - (want > this.g ? 0.15 : 0.025), dt * 40));

    // bands
    an.getFloatFrequencyData(this.fd);
    const binHz = ctx.sampleRate / an.fftSize;
    const band = (lo: number, hi: number) => {
      const a = Math.max(1, Math.floor(lo / binHz));
      const b = Math.min(this.fd.length - 1, Math.ceil(hi / binHz));
      let e = 0;
      for (let i = a; i <= b; i++) e += Math.pow(10, this.fd[i] / 20);
      return e / Math.max(1, b - a + 1);
    };
    const low = band(40, 160);
    const midE = band(250, 2000);
    const hiE = band(4000, 10000);
    this.midMax = Math.max(midE, this.midMax * Math.exp(-dt * 0.25), 1e-5);
    this.hiMax = Math.max(hiE, this.hiMax * Math.exp(-dt * 0.25), 1e-5);
    this.mid += (midE / this.midMax - this.mid) * (1 - Math.exp(-dt * 12));
    this.hi += (hiE / this.hiMax - this.hi) * (1 - Math.exp(-dt * 18));

    // beat: a jump in bass energy well above its recent average
    this.lowAvg += (low - this.lowAvg) * (1 - Math.exp(-dt * 1.4));
    const since = this.t - this.lastBeat;
    if (this.gate && low > this.lowAvg * 1.38 && low > this.prevLow && since > 0.26) {
      if (since < 1.5) this.interval = this.interval * 0.7 + since * 0.3;
      this.lastBeat = this.t;
      this.beat += 1;
      this.strength = clamp(0.6 + (low / Math.max(1e-6, this.lowAvg) - 1.38) * 0.8, 0.6, 1);
    }
    this.prevLow = low;
    this.slow += (this.level - this.slow) * (1 - Math.exp(-dt * 0.6));

    // pitched peaks for the Piano look
    this.noteClock += dt;
    if (this.gate && this.noteClock > 0.12) {
      this.noteClock = 0;
      const lo = Math.ceil(110 / binHz);
      const hi = Math.floor(1760 / binHz);
      let avg = 0;
      for (let i = lo; i <= hi; i++) avg += this.fd[i];
      avg /= hi - lo + 1;
      const peaks: { i: number; v: number }[] = [];
      for (let i = lo + 1; i < hi; i++) {
        const v = this.fd[i];
        if (v > avg + 14 && v > this.fd[i - 1] && v >= this.fd[i + 1]) peaks.push({ i, v });
      }
      peaks.sort((a, b) => b.v - a.v);
      for (const p of peaks.slice(0, 3)) {
        const f = p.i * binHz;
        const h = clamp(Math.log2(f / 110) / Math.log2(1760 / 110));
        if (this.notes.some((n) => Math.abs(n.h - h) < 0.03 && n.age < 0.25)) continue;
        this.notes.push({ h, age: 0, strength: clamp((p.v - avg - 14) / 18 + 0.55) });
      }
    }

    const fr = this.frame();
    this.hist.push({ t: this.t, kick: fr.kick, mid: fr.mid, hi: fr.hi });
    while (this.hist.length > 2 && this.t - this.hist[0].t > 1.8) this.hist.shift();
  }

  frame(): AudioFrame {
    const since = this.t - this.lastBeat;
    const bp = clamp(since / Math.max(0.25, this.interval));
    const kick = Math.exp(-bp * 6) * this.strength;
    const g = this.g;
    return { bp, beat: this.beat, kick: kick * g, mid: clamp(this.mid) * g, hi: clamp(this.hi) * g, level: this.level * g, slow: this.slow, notes: this.notes };
  }

  past: PastFn = (ago) => {
    const target = this.t - ago;
    for (let i = this.hist.length - 1; i >= 0; i--) if (this.hist[i].t <= target) return this.hist[i];
    return this.hist[0] ?? { kick: 0, mid: 0, hi: 0 };
  };
}

// ---------------------------------------------------------------------------
// Piano and drum performance state → light
export const PIANO_LOW = 48; // C3
export const PIANO_HIGH = 72; // C5

export class Performance {
  notes: Note[] = [];
  hits: { kind: DrumKind; age: number; seed: number }[] = [];
  private beats = 0;
  private hist: Sample[] = [];
  private t = 0;
  private seed = 1;

  note(midi: number) {
    const h = 0.04 + (0.92 * (midi - PIANO_LOW)) / (PIANO_HIGH - PIANO_LOW);
    this.notes.push({ h, age: 0, strength: 1 });
  }

  hit(kind: DrumKind) {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    this.hits.push({ kind, age: 0, seed: (this.seed % 1000) / 1000 });
    if (kind === "kick") this.beats++;
  }

  update(dt: number) {
    this.t += dt;
    for (const n of this.notes) n.age += dt;
    for (const h of this.hits) h.age += dt;
    this.notes = this.notes.filter((n) => n.age < 2.2);
    this.hits = this.hits.filter((h) => h.age < 3);
    const f = this.frame();
    this.hist.push({ t: this.t, kick: f.kick, mid: f.mid, hi: f.hi });
    while (this.hist.length > 2 && this.t - this.hist[0].t > 1.8) this.hist.shift();
  }

  private env(kind: DrumKind, rate: number) {
    let v = 0;
    for (const h of this.hits) if (h.kind === kind) v = Math.max(v, Math.exp(-h.age * rate));
    return v;
  }

  frame(): AudioFrame {
    const kicks = this.hits.filter((h) => h.kind === "kick");
    const lastKick = kicks.length ? kicks[kicks.length - 1].age : 9;
    const noteLevel = this.notes.reduce((m, n) => Math.max(m, Math.exp(-n.age * 2.2)), 0);
    const lastNote = this.notes.length ? this.notes[this.notes.length - 1].age : 9;
    const kick = Math.max(Math.exp(-lastKick * 6), Math.exp(-lastNote * 6) * 0.8);
    const mid = Math.max(this.env("snare", 7), noteLevel * 0.7);
    const hi = Math.max(this.env("hat", 14), this.env("crash", 1.6));
    const level = clamp(Math.max(kick, mid, hi, noteLevel));
    return { bp: clamp(Math.min(lastKick, lastNote) / 0.5), beat: this.beats + this.notes.length, kick, mid, hi, level, slow: level * 0.6, notes: this.notes };
  }

  past: PastFn = (ago) => {
    const target = this.t - ago;
    for (let i = this.hist.length - 1; i >= 0; i--) if (this.hist[i].t <= target) return this.hist[i];
    return this.hist[0] ?? { kick: 0, mid: 0, hi: 0 };
  };

  /** Drum hits drawn over whatever is underneath (max-blend). */
  drumOverlay(C: RGB[], g: Geom, out: Float32Array, soft = false) {
    if (!this.hits.length) return;
    const { n, h, r } = g;
    const o = [0, 0, 0];
    const k = C.length;
    const top = C[k - 1];
    const put = (i: number, cr: number, cg: number, cb: number) => {
      const j = i * 3;
      if (cr > out[j]) out[j] = cr;
      if (cg > out[j + 1]) out[j + 1] = cg;
      if (cb > out[j + 2]) out[j + 2] = cb;
    };
    const s = soft ? 0.55 : 1;
    for (const hit of this.hits) {
      const a = hit.age;
      if (hit.kind === "kick") {
        // flash the whole prop from the bottom up
        const front = clamp(a / 0.15) * 1.08;
        const e = Math.exp(-a * 3.4) * s;
        if (e < 0.01) continue;
        for (let i = 0; i < n; i++) {
          if (h[i] > front) continue;
          palLin(C, h[i], o);
          const m = e * (1 - 0.3 * h[i]);
          put(i, o[0] * m, o[1] * m, o[2] * m);
        }
      } else if (hit.kind === "snare") {
        const e = Math.exp(-a * 6.5) * s;
        if (e < 0.01) continue;
        for (let i = 0; i < n; i++) {
          if (frac(r[i * 4 + 1] + hit.seed) > 0.2) continue;
          palLin(C, r[i * 4 + 2], o);
          const m = e;
          put(i, (0.45 + 0.55 * o[0]) * m, (0.45 + 0.55 * o[1]) * m, (0.45 + 0.55 * o[2]) * m);
        }
      } else if (hit.kind === "hat") {
        const e = Math.exp(-a * 15) * 0.85 * s;
        if (e < 0.01) continue;
        for (let i = 0; i < n; i++) {
          if (h[i] < 0.6 || frac(r[i * 4 + 3] + hit.seed) > 0.3) continue;
          put(i, 0.75 * e, 0.88 * e, e);
        }
      } else {
        // crash: a bright wash that lingers, with a twinkling tail
        const e = Math.exp(-a * 1.5) * 0.8 * s;
        if (e < 0.01) continue;
        for (let i = 0; i < n; i++) {
          const tw = frac(r[i * 4] + hit.seed) < 0.3 ? 0.6 + 0.4 * Math.sin(a * 18 + r[i * 4 + 2] * 6.28) : 0.7;
          const m = e * tw;
          put(i, (0.5 + 0.5 * top[0]) * m, (0.5 + 0.5 * top[1]) * m, (0.5 + 0.5 * top[2]) * m);
        }
      }
    }
  }
}
