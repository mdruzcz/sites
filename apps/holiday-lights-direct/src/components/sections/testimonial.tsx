export function Testimonial() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="font-display text-[var(--color-gold)] text-7xl leading-none">&ldquo;</p>
        <blockquote className="font-display mt-2 text-2xl leading-snug text-slate-800 md:text-3xl">
          We&rsquo;ve been buying our C9 strings and the new RGBW housing kits from Holiday Lights Direct
          all season &mdash; the gear holds up in -30°C and the installer pricing makes the math work.
        </blockquote>
        <footer className="mt-6">
          <p className="text-sm font-semibold">Daniel F. · Professional Installer · Ontario</p>
          <p className="text-xs text-slate-500">Verified customer</p>
        </footer>
      </div>
    </section>
  );
}
