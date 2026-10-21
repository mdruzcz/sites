import { buildFurElise, midiToFreq, type NoteEvent } from "./furElise";

export type Analysis = {
  energy: number; // 0..1 smoothed overall level
  bass: number; // 0..1
  mids: number; // 0..1
  highs: number; // 0..1
  beat: number; // 1 on a detected beat, decays to 0
  beatCount: number;
};

const SIXTEENTH_SECONDS = 0.165; // ~ 91 bpm (dotted quarter), a relaxed Für Elise

/**
 * Synthesises Für Elise with oscillators and exposes an AnalyserNode-driven
 * energy / beat analysis for the pixel simulation.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private freqData: Uint8Array<ArrayBuffer> | null = null;
  private timeData: Uint8Array<ArrayBuffer> | null = null;

  private events: NoteEvent[] = [];
  private songLength = 0;
  private nextIndex = 0;
  private loopStart = 0;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;

  private avgEnergy = 0.05;
  private lastBeatAt = 0;
  readonly analysis: Analysis = { energy: 0, bass: 0, mids: 0, highs: 0, beat: 0, beatCount: 0 };

  get playing() {
    return this.schedulerTimer !== null;
  }

  async start() {
    if (!this.ctx) {
      const Ctor = (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.28;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.ratio.value = 4;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.smoothingTimeConstant = 0.6;
      this.master.connect(comp);
      comp.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeData = new Uint8Array(this.analyser.fftSize);
      const song = buildFurElise();
      this.events = song.events;
      this.songLength = song.length;
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.nextIndex = 0;
    this.loopStart = this.ctx.currentTime + 0.1;
    this.schedule();
    this.schedulerTimer = setInterval(() => this.schedule(), 80);
  }

  stop() {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = null;
    if (this.ctx && this.ctx.state === "running") void this.ctx.suspend();
    this.analysis.energy = 0;
    this.analysis.bass = 0;
    this.analysis.mids = 0;
    this.analysis.highs = 0;
    this.analysis.beat = 0;
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
        this.loopStart += this.songLength * SIXTEENTH_SECONDS;
      }
      const ev = this.events[this.nextIndex];
      const when = this.loopStart + ev.t * SIXTEENTH_SECONDS;
      if (when > now + lookahead) break;
      this.playNote(ev, Math.max(when, now + 0.005));
      this.nextIndex++;
    }
  }

  private playNote(ev: NoteEvent, when: number) {
    const ctx = this.ctx!;
    const master = this.master!;
    const freq = midiToFreq(ev.midi);
    const dur = ev.dur * SIXTEENTH_SECONDS;
    const isBass = ev.voice === "bass";

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, when);
    const peak = isBass ? 0.55 : 0.75;
    gain.gain.linearRampToValueAtTime(peak, when + 0.012);
    gain.gain.exponentialRampToValueAtTime(peak * 0.35, when + Math.min(dur, 0.6));
    const release = isBass ? 0.25 : 0.18;
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur + release);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isBass ? 900 : 2600, when);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 400 : 1200, when + dur + release);

    const osc1 = ctx.createOscillator();
    osc1.type = isBass ? "triangle" : "triangle";
    osc1.frequency.value = freq;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * (isBass ? 1 : 2);
    const g2 = ctx.createGain();
    g2.gain.value = isBass ? 0.5 : 0.22;

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
    if (!this.analyser || !this.freqData || !this.timeData || !this.playing) {
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
    // 48 kHz / 1024 → ~47 Hz per bin.
    const bass = band(1, 7); // ~50–330 Hz
    const mids = band(7, 30); // ~330–1400 Hz
    const highs = band(30, 110); // ~1.4–5 kHz

    let rms = 0;
    for (let i = 0; i < this.timeData.length; i += 4) {
      const v = (this.timeData[i] - 128) / 128;
      rms += v * v;
    }
    rms = Math.sqrt(rms / (this.timeData.length / 4));
    const level = Math.min(1, rms * 3.2);

    // Fast attack, slower release.
    const target = level * 0.7 + mids * 0.3;
    a.energy += (target - a.energy) * (target > a.energy ? Math.min(1, dt * 18) : Math.min(1, dt * 6));
    a.bass += (bass - a.bass) * Math.min(1, dt * 14);
    a.mids += (mids - a.mids) * Math.min(1, dt * 14);
    a.highs += (highs - a.highs) * Math.min(1, dt * 14);

    // Onset detection against a running average.
    this.avgEnergy += (target - this.avgEnergy) * Math.min(1, dt * 1.5);
    const now = performance.now() / 1000;
    if (target > this.avgEnergy * 1.22 && target > 0.08 && now - this.lastBeatAt > 0.17) {
      a.beat = 1;
      a.beatCount++;
      this.lastBeatAt = now;
    } else {
      a.beat = Math.max(0, a.beat - dt * 4);
    }
    return a;
  }
}
