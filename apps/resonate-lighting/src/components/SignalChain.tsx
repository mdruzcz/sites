const STEPS = [
  { title: "Mic or music", body: "USB microphone hears your speakers, a band or the street. Or play MP3s from a USB stick." },
  { title: "Light Show engine", body: "Raspberry Pi 5 runs LedFx and our engine: beat and loudness analysis, looks, themes, smoothing." },
  { title: "Pixel controller", body: "Receives every frame over Ethernet, 40 times a second, and drives each port." },
  { title: "Props", body: "12 V WS2811 mega trees, rooflines, wrapped trees, evergreens and arches." },
];

/** The kit's signal chain, drawn in HTML so it reflows on phones. */
export function SignalChain() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0" aria-label="How a Resonate kit turns sound into light">
      {STEPS.map((s, i) => (
        <li key={s.title} className="relative flex md:flex-col items-stretch">
          <div className="card p-5 flex-1 md:mx-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-resonant/15 border border-resonant/40 text-resonant text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <h3 className="font-bold text-white">{s.title}</h3>
            </div>
            <p className="text-sm text-muted-strong leading-relaxed">{s.body}</p>
          </div>
          {i < STEPS.length - 1 && (
            <span className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10 text-resonant" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
