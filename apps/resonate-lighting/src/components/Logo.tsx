import Link from "next/link";
import { ResonateMark } from "./ResonateMark";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Resonate Lighting — Home">
      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
        <ResonateMark
          id="logo"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(255,154,60,0.35)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {!compact && (
        <div className="hidden sm:block">
          <div className="h-display text-base leading-none text-white tracking-tight">Resonate</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-resonant mt-1.5 font-semibold">Lighting</div>
        </div>
      )}
    </Link>
  );
}
