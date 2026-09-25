import type { VzTheme } from './VisualizerApp';

/** Maps the shared visualizer UI onto Forever Lights' globals.css component classes. */
export const vzTheme: VzTheme = {
  btnPrimary: 'btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed',
  btnSecondary: 'btn btn-outline disabled:opacity-60 disabled:cursor-not-allowed',
  btnGhost: 'btn btn-outline btn-sm bg-white disabled:opacity-40 disabled:cursor-not-allowed',
  card: 'card',
  input: 'input',
  label: 'label',
  eyebrow: 'eyebrow',
  heading: 'text-ink',
  muted: 'text-muted',
  accentText: 'text-ink',
  softBg: 'bg-soft',
  chipOn: 'bg-ink border-ink text-white',
  chipOff: 'bg-white border-line text-ink-soft hover:border-ink',
  success: 'bg-tint border border-accent/40 text-ink',
  danger: 'bg-dot-red/10 text-dot-red',
};
