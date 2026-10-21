/**
 * Trepak (Russian Dance) from The Nutcracker, Op. 71 — Pyotr Ilyich Tchaikovsky, 1892.
 * The composition is public domain. This is our own simplified transcription of the
 * main themes, encoded as note events and synthesised at runtime with the Web Audio
 * API. No recording is embedded or played.
 *
 * Time unit: one eighth note. 2/4 time, so 4 units per bar. Key: G major.
 */

export type NoteEvent = {
  t: number;
  dur: number;
  voice: "melody" | "bass" | "chord" | "perc";
  midi: number; // for perc: 0 = tambourine tick, 1 = accent hit
};

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function toMidi(name: string): number {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
  if (!m) throw new Error(`bad note ${name}`);
  let n = NOTE_INDEX[m[1]];
  if (m[2] === "#") n += 1;
  if (m[2] === "b") n -= 1;
  return 12 * (parseInt(m[3], 10) + 1) + n;
}

/** "G4 G4 A4:2 -" → events. "-" rests one unit; ":n" sets duration in units. */
function parseLine(line: string, voice: NoteEvent["voice"], start: number, out: NoteEvent[]): number {
  let t = start;
  for (const tok of line.trim().split(/\s+/)) {
    if (!tok) continue;
    const [name, durStr] = tok.split(":");
    const dur = durStr ? parseInt(durStr, 10) : 1;
    if (name !== "-") out.push({ t, dur, voice, midi: toMidi(name) });
    t += dur;
  }
  return t;
}

type Bar = { m: string; b?: string; c?: string[] };

// Oom-pah bass helper: root on beat 1, fifth on beat 2.
const oom = (root: string, fifth: string) => `${root} - ${fifth} -`;
const G = oom("G2", "D3");
const D7 = oom("D2", "A2");
const C = oom("C3", "G3");
const Em = oom("E2", "B2");

// A theme: a stamping repeated-note figure that climbs by step, then tumbles back down.
const A_SECTION: Bar[] = [
  { m: "G4 G4 G4 G4", b: G, c: ["B3", "D4"] },
  { m: "A4 G4 F#4 G4", b: G, c: ["B3", "D4"] },
  { m: "A4 A4 A4 A4", b: D7, c: ["C4", "F#4"] },
  { m: "B4 A4 G4 A4", b: D7, c: ["C4", "F#4"] },
  { m: "B4 B4 B4 B4", b: G, c: ["D4", "G4"] },
  { m: "C5 B4 A4 B4", b: G, c: ["D4", "G4"] },
  { m: "C5 C5 C5 C5", b: C, c: ["E4", "G4"] },
  { m: "D5 C5 B4 C5", b: D7, c: ["C4", "F#4"] },
  { m: "D5 D5 D5 D5", b: G, c: ["D4", "G4"] },
  { m: "E5 D5 C5 D5", b: G, c: ["D4", "G4"] },
  { m: "E5 E5 E5 E5", b: C, c: ["E4", "G4"] },
  { m: "F#5 E5 D5 E5", b: D7, c: ["C4", "F#4"] },
  { m: "G5 F#5 E5 D5", b: G, c: ["D4", "G4"] },
  { m: "C5 B4 A4 G4", b: C, c: ["E4", "G4"] },
  { m: "D5:2 D4:2", b: D7, c: ["C4", "F#4"] },
  { m: "G4:2 -:2", b: G, c: ["B3", "D4"] },
];

// B theme: broader, minor-tinged answer before the stamping returns.
const B_SECTION: Bar[] = [
  { m: "E5 E5 D5 C5", b: Em, c: ["G4", "B4"] },
  { m: "B4 B4 A4 G4", b: Em, c: ["G4", "B4"] },
  { m: "F#4 G4 A4 B4", b: D7, c: ["C4", "F#4"] },
  { m: "A4:2 D5:2", b: D7, c: ["C4", "F#4"] },
  { m: "E5 E5 D5 C5", b: Em, c: ["G4", "B4"] },
  { m: "B4 B4 A4 G4", b: C, c: ["E4", "G4"] },
  { m: "F#4 A4 G4 F#4", b: D7, c: ["C4", "F#4"] },
  { m: "G4:2 -:2", b: G, c: ["B3", "D4"] },
];

// Coda: the scale rush and the final stamps.
const CODA: Bar[] = [
  { m: "G4 A4 B4 C5", b: G, c: ["B3", "D4"] },
  { m: "D5 E5 F#5 G5", b: D7, c: ["C4", "F#4"] },
  { m: "G5 G5 G5 G5", b: G, c: ["D4", "G4"] },
  { m: "G5:2 -:2", b: G, c: ["D4", "G4", "B4"] },
];

export function buildTrepak(): { events: NoteEvent[]; length: number } {
  const events: NoteEvent[] = [];
  let t = 0;
  const play = (bars: Bar[]) => {
    for (const bar of bars) {
      const end = parseLine(bar.m, "melody", t, events);
      if (bar.b) parseLine(bar.b, "bass", t, events);
      if (bar.c) {
        for (const n of bar.c) {
          events.push({ t: t + 1, dur: 1, voice: "chord", midi: toMidi(n) });
          events.push({ t: t + 3, dur: 1, voice: "chord", midi: toMidi(n) });
        }
      }
      // Tambourine: tick every beat, accent on beat 1.
      events.push({ t, dur: 1, voice: "perc", midi: 1 });
      events.push({ t: t + 2, dur: 1, voice: "perc", midi: 0 });
      t = end;
    }
  };
  play(A_SECTION);
  play(B_SECTION);
  play(A_SECTION);
  play(CODA);
  events.sort((a, b) => a.t - b.t);
  return { events, length: t };
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}
