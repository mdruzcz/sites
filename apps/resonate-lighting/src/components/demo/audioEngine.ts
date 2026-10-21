import { buildTrepak, midiToFreq, type NoteEvent } from "./trepak";

export type Analysis = {
  energy: number; // 0..1 smoothed overall level
  bass: number; // 0..1
  mids: number; // 0..1
  highs: number; // 0..1
  beat: number; // 1 on a detected beat, decays to 0
  beatCount: number;
};

export type Source = "synth" | "file" | "mic";

const EIGHTH_SECONDS = 0.205; // quarter ≈ 146 bpm — molto vivace, but readable

/**
 * Audio for the simulation. Three sources share one AnalyserNode:
 *  - synth: Tchaikovsky's Trepak synthesised from note events (nothing embedded)
 *  - file:  a track the visitor picks from their own device (decoded locally, never uploaded)
 *  - mic:   the visitor's microphone (what a real Resonate kit listens to)
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private freqData: Uint8Array<ArrayBuffer> | null = null;
  private timeData: Uint8Array<ArrayBuffer> | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  // synth
  private events: NoteEvent[] = [];
  private songLength = 0;
  private nextIndex = 0;
  private loopStart = 0;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;

  // file
  private fileBuffer: AudioBuffer | null = null;
  private fileSource: AudioBufferSourceNode | null = null;

  // mic
  private micStream: MediaStream | null = null;
  private micNode: MediaStreamAudioSourceNode | null = null;

  source: Source = "synth";
  private _playing = false;

  private avgEnergy = 0.05;
  private lastBeatAt = 0;
  readonly analysis: Analysis = { energy: 0, bass: 0, mids: 0, highs: 0, beat: 0, beatCount: 0 };

  get playing() {
    return this._playing;
  }

  private ensureContext() {
    if (this.ctx) return this.ctx;
    const Ctor = (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.3;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 4;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.55;
    this.master.connect(comp);
    comp.connect(this.analyser);
    this.analyser.connect(ctx.destination);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeData = new Uint8Array(this.analyser.fftSize);
    const song = buildTrepak();
    this.events = song.events;
    this.songLength = song.length;
    // 0.3 s of white noise for the tambourine.
    const len = Math.floor(ctx.sampleRate * 0.3);
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }

  /** Decode a file the visitor chose. Stays in memory only. */
  async loadFile(file: File) {
    const ctx = this.ensureContext();
    const buf = await file.arrayBuffer();
    this.fileBuffer = await ctx.decodeAudioData(buf);
  }

  get hasFile() {
    return Boolean(this.fileBuffer);
  }

  async start(source: Source) {
    const ctx = this.ensureContext();
    this.stopInternal();
    if (ctx.state === "suspended") await ctx.resume();
    this.source = source;

    if (source === "synth") {
      this.nextIndex = 0;
      this.loopStart = ctx.currentTime + 0.1;
      this.schedule();
      this.schedulerTimer = setInterval(() => this.schedule(), 80);
    } else if (source === "file") {
      if (!this.fileBuffer) throw new Error("no-file");
      const src = ctx.createBufferSource();
      src.buffer = this.fileBuffer;
      src.loop = true;
      src.connect(this.master!);
      src.start();
      this.fileSource = src;
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
      this.micStream = stream;
      this.micNode = ctx.createMediaStreamSource(stream);
      // Analyse only — never route the mic to the speakers.
      this.micNode.connect(this.analyser!);
    }
    this._playing = true;
  }

  private stopInternal() {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = null;
    if (this.fileSource) {
      try {
        this.fileSource.stop();
      } catch {}
      this.fileSource.disconnect();
      this.fileSource = null;
    }
    if (this.micNode) {
      this.micNode.disconnect();
      this.micNode = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    this._playing = false;
  }

  stop() {
    this.stopInternal();
    const a = this.analysis;
    a.energy = 0;
    a.bass = 0;
    a.mids = 0;
    a.highs = 0;
    a.beat = 0;
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
  }

  private schedule() {
    if (!this.ctx) return;
    const lookahead = 0.35;
    const now = this.ctx.currentTime;
    while (true) {
      if (this.nextIndex >= this.events.length) {
        this.nextIndex = 0;
        this.loopStart += this.songLength * EIGHTH_SECONDS;
      }
      const ev = this.events[this.nextIndex];
      const when = this.loopStart + ev.t * EIGHTH_SECONDS;
      if (when > now + lookahead) break;
      this.playEvent(ev, Math.max(when, now + 0.005));
      this.nextIndex++;
    }
  }

  private playEvent(ev: NoteEvent, when: number) {
    const ctx = this.ctx!;
    const master = this.master!;
    const dur = ev.dur * EIGHTH_SECONDS;

    if (ev.voice === "perc") {
      const accent = ev.midi === 1;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = accent ? 2600 : 5200;
      bp.Q.value = 1.2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(accent ? 0.5 : 0.22, when + 0.004);
      g.gain.exponentialRampToValueAtTime(0.001, when + (accent ? 0.16 : 0.08));
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(when);
      src.stop(when + 0.2);
      return;
    }

    const freq = midiToFreq(ev.midi);
    const isBass = ev.voice === "bass";
    const isChord = ev.voice === "chord";

    const gain = ctx.createGain();
    const peak = isBass ? 0.6 : isChord ? 0.16 : 0.55;
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(peak, when + 0.008);
    gain.gain.exponentialRampToValueAtTime(peak * 0.3, when + Math.min(dur, 0.35));
    const release = isBass ? 0.12 : 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur + release);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isBass ? 700 : isChord ? 1800 : 3800, when);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 300 : 1200, when + dur + release);

    const osc1 = ctx.createOscillator();
    osc1.type = isBass ? "triangle" : "sawtooth";
    osc1.frequency.value = freq;
    const osc2 = ctx.createOscillator();
    osc2.type = isBass ? "sine" : "square";
    osc2.frequency.value = isBass ? freq : freq * 2;
    const g2 = ctx.createGain();
    g2.gain.value = isBass ? 0.5 : 0.08;

    osc1.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc1.start(when);
    osc2.start(when);
    const stopAt = when + dur + release + 0.05;
    osc1.stop(stopAt);
    osc2.stop(stopAt);
  }

  /** Call once per frame. dt in seconds. */
  analyse(dt: number) {
    const a = this.analysis;
    if (!this.analyser || !this.freqData || !this.timeData || !this._playing) {
      a.beat = Math.max(0, a.beat - dt * 4);
      return a;
    }
    this.analyser.getByteFrequencyData(this.freqData);
    this.analyser.getByteTimeDomainData(this.timeData);

    const f = this.freqData;
    const band = (lo: number, hi: number) => {
      let s = 0;
      for (let i = lo; i < hi; i++) s += f[i];
      return s / ((hi - lo) * 255);
    };
    // ~47 Hz per bin at 48 kHz / 1024.
    const bass = band(1, 7);
    const mids = band(7, 30);
    const highs = band(30, 120);

    let rms = 0;
    for (let i = 0; i < this.timeData.length; i += 4) {
      const v = (this.timeData[i] - 128) / 128;
      rms += v * v;
    }
    rms = Math.sqrt(rms / (this.timeData.length / 4));
    const gainTrim = this.source === "mic" ? 5 : 3.2;
    const level = Math.min(1, rms * gainTrim);

    const target = Math.min(1, level * 0.65 + mids * 0.25 + highs * 0.25);
    a.energy += (target - a.energy) * (target > a.energy ? Math.min(1, dt * 20) : Math.min(1, dt * 6));
    a.bass += (bass - a.bass) * Math.min(1, dt * 14);
    a.mids += (mids - a.mids) * Math.min(1, dt * 14);
    a.highs += (highs - a.highs) * Math.min(1, dt * 14);

    this.avgEnergy += (target - this.avgEnergy) * Math.min(1, dt * 1.5);
    const now = performance.now() / 1000;
    if (target > this.avgEnergy * 1.2 && target > 0.07 && now - this.lastBeatAt > 0.16) {
      a.beat = 1;
      a.beatCount++;
      this.lastBeatAt = now;
    } else {
      a.beat = Math.max(0, a.beat - dt * 4.5);
    }
    return a;
  }
}
