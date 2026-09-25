"use client";

// Catches render errors inside the planner so a bug never blanks the whole page.
// Shows what went wrong (so it can be screenshotted) with Try again / Start over.

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; onReset?: () => void; onStartOver?: () => void };
type State = { error: Error | null };

export class PlannerErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Planner error:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const err = this.state.error;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    return (
      <div role="alert" className="mx-auto max-w-xl px-4 py-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-accent-dark)]">Kitchen planner</p>
        <h1 className="mt-1 font-display text-3xl text-[var(--color-ink)]">Something went wrong</h1>
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          Sorry — the planner hit a problem while drawing your kitchen. Your design has been auto-saved, so try again first. If it keeps happening, start over or send us a screenshot of the details below.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              this.setState({ error: null });
              this.props.onReset?.();
            }}
          >
            Try again
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              this.props.onStartOver?.();
              this.setState({ error: null });
            }}
          >
            Start over
          </button>
          <a href="mailto:service@masterdecker.com?subject=Kitchen%20planner%20error" className="btn-secondary">
            Email us
          </a>
        </div>
        <details className="mt-6 rounded-md border border-[var(--color-border)] bg-white p-3 text-[11px] text-[var(--color-ink-soft)]">
          <summary className="cursor-pointer text-[var(--color-ink)]">Technical details</summary>
          <pre className="mt-2 whitespace-pre-wrap break-words font-mono">
            {err.name}: {err.message}
            {"\n"}
            {(err.stack || "").split("\n").slice(0, 6).join("\n")}
            {"\n\n"}
            {ua}
          </pre>
        </details>
      </div>
    );
  }
}
