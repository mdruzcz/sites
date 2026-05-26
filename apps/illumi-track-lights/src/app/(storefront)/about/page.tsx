import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Illumi Track Lights",
  description: "Built in London, Ontario. Smart permanent LED soffit lighting kits engineered for Canadian homes and shipped across the country."
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/showcase/install-home-2.jpg"
            alt="Home with Illumi Track Lights"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-night)]/95 via-[var(--color-night)]/80 to-[var(--color-night)]/50" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28">
          <p className="eyebrow text-[var(--color-brand-bright)]">About us</p>
          <h1 className="font-display mt-3 text-4xl tracking-tight md:text-6xl">
            Smarter outdoor lighting,<br />
            <span className="gradient-text">built in Canada.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Illumi Track Lights designs and ships smart soffit-mounted LED systems for Canadian homes.
            Pro-grade aluminum tracks, 24V RGBW LED pucks, and a WiFi controller pre-flashed with WLED
            &mdash; the same open-source firmware professional installers trust.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 prose-clean">
        <h2 className="font-display text-3xl">Why we exist</h2>
        <p>
          Professional installers charge $25–$40 per linear foot to wrap your home in permanent lighting.
          We sell you the same gear &mdash; pro-grade aluminum track, 50,000-hour RGBW LED pucks, and a
          weatherproof IP68 controller &mdash; so you can install it yourself in a weekend for a fraction
          of the cost.
        </p>

        <h2 className="font-display mt-10 text-3xl">Where we ship from</h2>
        <p>
          Everything is stocked in London, Ontario and shipped via Canada Post anywhere in the country.
          Free shipping over $500. Most orders go out same- or next-business-day.
        </p>

        <h2 className="font-display mt-10 text-3xl">What we stand behind</h2>
        <p>
          Every LED kit is backed by a 5-year warranty against manufacturing defects. Real Canadian
          support, real fast email replies. <Link href="/contact-us">Get in touch any time.</Link>
        </p>

        <div className="not-prose mt-10 flex flex-wrap gap-3">
          <Link href="/diy-kits" className="btn-primary">See the kits →</Link>
          <Link href="/contact-us" className="btn-secondary">Contact us</Link>
        </div>
      </section>

      <section className="bg-[var(--color-bg)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-3">
          <Stat number="5,000+" label="Linear feet installed across Canada" />
          <Stat number="4.9★" label="Average customer rating" />
          <Stat number="5 yr" label="LED parts warranty on every kit" />
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center">
      <p className="font-display text-4xl text-[var(--color-brand)]">{number}</p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </div>
  );
}
