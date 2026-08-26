export function Testimonial() {
  return (
    <section className="bg-[var(--color-night)] text-white">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <p className="font-display text-[var(--color-gold)] text-8xl leading-none">&ldquo;</p>
        <blockquote className="font-display -mt-4 text-3xl font-medium italic leading-snug md:text-4xl">
          We&rsquo;ve been buying our C9 strings and G20 globes from Holiday Light Supplies all season
          &mdash; the gear holds up in -30°C and the bulk pricing makes the math work.
        </blockquote>
        <footer className="mt-8">
          <p className="font-semibold text-[var(--color-gold)]">Daniel F. · Professional Installer · Ontario</p>
          <p className="mt-1 text-sm text-white/60">Verified customer</p>
        </footer>
      </div>
    </section>
  );
}
