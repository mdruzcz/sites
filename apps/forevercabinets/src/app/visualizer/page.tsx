import type { Metadata } from "next";
import Link from "next/link";
import { VisualizerForm } from "@/components/visualizer-form";

export const metadata: Metadata = {
  title: "Kitchen Visualizer — Build Your Wall, See What Fits",
  description:
    "Enter your wall length and see an exact-fit combination of White Shaker cabinets. Add sinks, lazy susans, and corner cabinets. One-click add to a quote.",
  alternates: { canonical: "/visualizer" },
};

export default function VisualizerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-navy)]">Kitchen Visualizer</span>
      </nav>

      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Kitchen visualizer
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
          Build your wall.
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          Enter the wall length you&rsquo;re filling. We&rsquo;ll suggest an exact-fit combination of White Shaker cabinets from our catalog — including sinks, drawer stacks, and lazy susans if you want them. One click adds everything to your Request List.
        </p>
      </header>

      <VisualizerForm />
    </div>
  );
}
