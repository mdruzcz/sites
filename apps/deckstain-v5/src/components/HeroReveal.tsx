import Image from "next/image";
import { BLUR } from "./ui";

/**
 * Auto-animating before/after "restoration video" effect — pure CSS sweep,
 * no JS, respects prefers-reduced-motion. The before image is clipped by an
 * animated-width wrapper while a divider line tracks the same motion.
 */
export function HeroReveal({
  before,
  after,
  beforeAlt,
  afterAlt,
  priority = false,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  priority?: boolean;
}) {
  return (
    <div className="ba w-full h-full">
      {/* after (full) */}
      <div className="ba-after">
        <Image src={after} alt={afterAlt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} priority={priority} sizes="100vw" />
      </div>
      {/* before (clipped, animated) */}
      <div className="ba-before">
        <div className="ba-img h-full">
          <Image src={before} alt={beforeAlt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} sizes="100vw" />
        </div>
      </div>
      {/* moving divider + knob */}
      <div className="ba-divider">
        <span className="ba-knob">
          <svg className="w-5 h-5 text-[var(--ink)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" /></svg>
        </span>
      </div>
      {/* corner labels */}
      <span className="absolute top-4 left-4 z-10 bg-black/55 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Before</span>
      <span className="absolute top-4 right-4 z-10 bg-[var(--green)] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">After</span>
    </div>
  );
}
