import Link from "next/link";

export default function FloatingEmailButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold shadow-2xl shadow-purple-900/50 transition-all hover:scale-105 min-w-[44px] min-h-[44px] md:hidden"
      aria-label="Get a free quote"
    >
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span className="text-sm">Free Quote</span>
    </Link>
  );
}
