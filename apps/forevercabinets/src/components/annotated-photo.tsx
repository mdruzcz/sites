"use client";

import Image from "next/image";
import { formatDim } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
  depth: number | null;
  className?: string;
};

// Renders a real product photo with red dimension arrows + measurement labels
// overlaid on top. Mimics a classic technical-drawing annotation while keeping
// the actual photo visible underneath.
export function AnnotatedPhoto({ src, alt, width, height, depth, className }: Props) {
  return (
    <div className={className ?? "relative aspect-square w-full"}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Width arrow (top) */}
        <defs>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d2c" />
          </marker>
        </defs>
        {/* Top horizontal arrow over the cabinet face */}
        <line
          x1="30"
          y1="18"
          x2="70"
          y2="18"
          stroke="#e11d2c"
          strokeWidth="0.6"
          markerStart="url(#arrow-red)"
          markerEnd="url(#arrow-red)"
        />
        {/* Right vertical arrow */}
        <line
          x1="82"
          y1="20"
          x2="82"
          y2="80"
          stroke="#e11d2c"
          strokeWidth="0.6"
          markerStart="url(#arrow-red)"
          markerEnd="url(#arrow-red)"
        />
      </svg>
      {/* Width label */}
      {width != null && (
        <span
          className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 rounded-sm bg-white px-2 py-0.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-200"
          aria-label={`Width ${formatDim(width)}`}
        >
          W {formatDim(width)}
        </span>
      )}
      {/* Height label */}
      {height != null && (
        <span
          className="pointer-events-none absolute right-[3%] top-1/2 -translate-y-1/2 rounded-sm bg-white px-2 py-0.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-200"
          aria-label={`Height ${formatDim(height)}`}
        >
          H {formatDim(height)}
        </span>
      )}
      {/* Depth label */}
      {depth != null && (
        <span
          className="pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2 rounded-sm bg-[var(--color-navy)] px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm"
          aria-label={`Depth ${formatDim(depth)}`}
        >
          Depth {formatDim(depth)}
        </span>
      )}
    </div>
  );
}
