/**
 * Für Elise (Ludwig van Beethoven, WoO 59 — public domain), main theme,
 * encoded as note events and synthesised in the browser with the Web Audio API.
 * No recording is embedded; every sound is generated at runtime.
 *
 * Time unit: one sixteenth note. 3/8 time, so 6 units per bar.
 */

export type NoteEvent = { t: number; midi: number; dur: number; voice: "melody" | "bass" };

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function toMidi(name: string): number {
  // e.g. "D#5", "E4"
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
  if (!m) throw new Error(`bad note ${name}`);
  let n = NOTE_INDEX[m[1]];
  if (m[2] === "#") n += 1;
  if (m[2] === "b") n -= 1;
  const octave = parseInt(m[3], 10);
  return 12 * (octave + 1) + n;
}

/** Parse a bar string like "A4:2 - C4 E4 A4" into events. "-" is a one-unit rest, ":n" is a duration. */
function parseLine(line: string, voice: NoteEvent["voice"], start: number, out: NoteEvent[]): number {
  let t = start;
  for (const tok of line.trim().split(/\s+/)) {
    if (!tok) continue;
    const [name, durStr] = tok.split(":");
    const dur = durStr ? parseInt(durStr, 10) : 1;
    if (name !== "-") out.push({ t, midi: toMidi(name), dur, voice });
    t += dur;
  }
  return t;
}

type Bar = { m: string; b?: string };

// A section (bars with pickup). Each bar is 6 units; the pickup bar is 2 units.
const PICKUP: Bar = { m: "E5 D#5" };
const A_SECTION: Bar[] = [
  { m: "E5 D#5 E5 B4 D5 C5" },
  { m: "A4:2 - C4 E4 A4", b: "A2 E3 A3 -:3" },
  { m: "B4:2 - E4 G#4 B4", b: "E2 E3 G#3 -:3" },
  { m: "C5:2 - E4 E5 D#5", b: "A2 E3 A3 -:3" },
  { m: "E5 D#5 E5 B4 D5 C5" },
  { m: "A4:2 - C4 E4 A4", b: "A2 E3 A3 -:3" },
  { m: "B4:2 - E4 C5 B4", b: "E2 E3 G#3 -:3" },
];
const A_END_REPEAT: Bar = { m: "A4:2 - E5 D#5 -", b: "A2 E3 A3 -:3" }; // back to the top
const A_END_TO_B: Bar = { m: "A4:2 - B4 C5 D5", b: "A2 E3 A3 -:3" }; // into the B passage

const B_SECTION: Bar[] = [
  { m: "E5:2 - G4 F5 E5", b: "C3 G3 C4 -:3" },
  { m: "D5:2 - F4 E5 D5", b: "G2 G3 B3 -:3" },
  { m: "C5:2 - E4 D5 C5", b: "A2 E3 A3 -:3" },
  { m: "B4:2 - E4 E5 -", b: "E2 E3 E4 -:3" },
  { m: "- E5 E6 - D#5 E5" },
  { m: "- D#5 E5 D#5 E5 D#5" },
];

export function buildFurElise(): { events: NoteEvent[]; length: number } {
  const events: NoteEvent[] = [];
  let t = 0;
  const play = (bars: Bar[]) => {
    for (const bar of bars) {
      const end = parseLine(bar.m, "melody", t, events);
      if (bar.b) parseLine(bar.b, "bass", t, events);
      t = end;
    }
  };
  play([PICKUP]);
  play(A_SECTION);
  play([A_END_REPEAT]);
  play(A_SECTION);
  play([A_END_TO_B]);
  play(B_SECTION);
  play(A_SECTION);
  play([A_END_REPEAT]);
  events.sort((a, b) => a.t - b.t);
  return { events, length: t };
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}
