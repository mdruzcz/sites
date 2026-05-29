"use client";

export default function FloatingCallBtn() {
  return (
    <a
      href="tel:+15198786735"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 md:hidden"
      style={{ background: "var(--gold)", color: "#0A0F1E" }}
      aria-label="Call Matt Druzcz"
    >
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      Call Matt
    </a>
  );
}
