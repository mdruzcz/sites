import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Ontario Light Shows — Home">
      <div
        className="relative w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
        style={{
          background:
            "linear-gradient(135deg, #00E5FF 0%, #7C3AED 50%, #FF2DAA 100%)",
          boxShadow: "0 0 16px rgba(0, 229, 255, 0.4)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
          <path d="M12 2a1 1 0 011 1v2.05a7.002 7.002 0 015.95 5.95H21a1 1 0 110 2h-2.05a7.002 7.002 0 01-5.95 5.95V21a1 1 0 11-2 0v-2.05A7.002 7.002 0 015.05 13H3a1 1 0 110-2h2.05A7.002 7.002 0 0111 5.05V3a1 1 0 011-1zm0 5a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      </div>
      {!compact && (
        <div className="hidden sm:block">
          <div className="font-extrabold text-base leading-none text-white tracking-tight">
            Ontario<span className="text-accent">Light</span>Shows
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1.5">
            Music · Architecture · Holiday
          </div>
        </div>
      )}
    </Link>
  );
}
