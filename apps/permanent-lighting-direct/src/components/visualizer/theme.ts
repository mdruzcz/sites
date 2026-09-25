import type { VzTheme } from "./VisualizerApp";

/** Maps the shared visualizer UI onto Permanent Lighting Direct's globals.css component classes. */
export const vzTheme: VzTheme = {
  btnPrimary: "btn-primary disabled:opacity-60 disabled:cursor-not-allowed",
  btnSecondary: "btn-secondary disabled:opacity-60 disabled:cursor-not-allowed",
  btnGhost: "btn-secondary btn-sm disabled:opacity-40 disabled:cursor-not-allowed",
  card: "card",
  input: "input",
  label: "label",
  eyebrow: "eyebrow text-[var(--color-accent-dark)]",
  heading: "text-[var(--color-text)]",
  muted: "text-[var(--color-text-soft)]",
  accentText: "text-[var(--color-accent-dark)]",
  softBg: "bg-[var(--color-bg-tint)]",
  chipOn: "bg-[var(--color-ink)] border-[var(--color-ink)] text-white",
  chipOff: "bg-white border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-ink)]",
  success: "bg-[var(--color-green-soft)] text-[var(--color-green)]",
  danger: "bg-[var(--color-red-soft)] text-[var(--color-red)]",
};
