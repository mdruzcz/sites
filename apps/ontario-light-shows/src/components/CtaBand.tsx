import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.4), transparent 50%), radial-gradient(ellipse at bottom left, rgba(0, 229, 255, 0.3), transparent 50%), linear-gradient(180deg, #0A0E1A 0%, #05070F 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <p className="eyebrow">Ready to Light It Up?</p>
            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
              Let's design your <span className="gradient-text">show</span>.
            </h2>
            <p className="text-muted-strong text-base sm:text-lg max-w-2xl">
              Tell us about your venue, building, or event. We'll come back with a tailored proposal and a sample sequence within {site.responseTime}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={site.phoneHref} className="btn btn-primary text-base">Call {site.phone}</a>
            <Link href="/contact" className="btn btn-ghost text-base">Request a Quote</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
