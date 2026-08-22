import { Photo } from "@/components/photo";

export function Testimonial() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <p aria-hidden className="font-display text-6xl leading-none text-[var(--color-gold)]">&ldquo;</p>
            <blockquote className="font-display mt-4 text-[1.65rem] leading-[1.3] text-[var(--color-text)] md:text-[2.25rem]">
              We have been buying our C9 strings and the RGBW housing kits from Holiday Lights Direct all
              season. The gear holds up at −30°C and the installer pricing makes the math work.
            </blockquote>
            <footer className="mt-8 border-l-2 border-[var(--color-gold)] pl-5">
              <p className="text-sm font-semibold">Daniel F.</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Professional installer · Ontario · Verified customer
              </p>
            </footer>
          </div>

          <Photo
            name="home-install-1"
            ratio="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 460px"
            rounded="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
