import type { ReactNode } from "react";

type Tone = "stone" | "zinc" | "slate" | "neutral";

interface ComingSoonProps {
  /** Big top headline, e.g. "London Concrete Forming". */
  title: string;
  /** One-line description below the title. */
  tagline: string;
  /** Tailwind tone palette. Defaults to neutral. */
  tone?: Tone;
  /** Pill text above the headline. */
  badge?: string;
  /** Call-to-action — pass a link element. */
  cta?: ReactNode;
}

const toneMap: Record<Tone, { from: string; to: string; border: string; pill: string; text: string; subtext: string; btn: string }> = {
  stone: {
    from: "from-stone-100", to: "to-stone-200",
    border: "border-stone-300", pill: "bg-white/70 text-stone-700",
    text: "text-stone-900", subtext: "text-stone-600",
    btn: "bg-stone-900 hover:bg-stone-700"
  },
  zinc: {
    from: "from-zinc-50", to: "to-zinc-100",
    border: "border-zinc-200", pill: "bg-white/60 text-zinc-600",
    text: "text-zinc-900", subtext: "text-zinc-600",
    btn: "bg-zinc-900 hover:bg-zinc-700"
  },
  slate: {
    from: "from-slate-50", to: "to-slate-100",
    border: "border-slate-200", pill: "bg-white/60 text-slate-600",
    text: "text-slate-900", subtext: "text-slate-600",
    btn: "bg-slate-900 hover:bg-slate-700"
  },
  neutral: {
    from: "from-neutral-50", to: "to-neutral-100",
    border: "border-neutral-200", pill: "bg-white/60 text-neutral-600",
    text: "text-neutral-900", subtext: "text-neutral-600",
    btn: "bg-neutral-900 hover:bg-neutral-700"
  }
};

export function ComingSoon({ title, tagline, tone = "neutral", badge = "Coming soon", cta }: ComingSoonProps) {
  const t = toneMap[tone];
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ${t.from} ${t.to} px-6 font-sans`}>
      <main className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <span className={`rounded-full border ${t.border} ${t.pill} px-3 py-1 text-xs uppercase tracking-widest`}>
          {badge}
        </span>
        <h1 className={`text-balance text-4xl font-semibold leading-tight tracking-tight ${t.text} sm:text-6xl`}>
          {title}
        </h1>
        <p className={`max-w-md text-balance text-lg ${t.subtext}`}>{tagline}</p>
        {cta}
      </main>
      <footer className={`mt-16 text-xs ${t.subtext}`}>
        © {new Date().getFullYear()} {title}
      </footer>
    </div>
  );
}
