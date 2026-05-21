export function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "var(--accent)" }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-10h10l4 10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="font-extrabold text-base tracking-tight" style={{ color: "var(--accent)" }}>
          Ontario
        </span>
        <span className="font-extrabold text-base tracking-tight text-gray-800"> Ramp</span>
        <br />
        <span className="font-bold text-xs tracking-widest uppercase text-gray-500">Solutions</span>
      </div>
    </div>
  );
}
