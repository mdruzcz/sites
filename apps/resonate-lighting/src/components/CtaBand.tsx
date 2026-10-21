import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({ kit }: { kit?: string }) {
  const href = kit ? `/contact?kit=${kit}#quote` : "/contact#quote";
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(255, 154, 60, 0.28), transparent 50%), radial-gradient(ellipse at bottom left, rgba(76, 201, 240, 0.2), transparent 50%), linear-gradient(180deg, #101627 0%, #0B0F1A 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <p className="eyebrow">Request a quote</p>
            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
              Tell us about the <span className="gradient-text">space</span>.
            </h2>
            <p className="text-muted-strong text-base sm:text-lg max-w-2xl">
              Send a few photos and the rough size of the frontage, tree or street. We reply within {site.responseTime} with a recommendation and an itemised quote in Canadian dollars, installation and travel included.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href={href} className="btn btn-primary text-base">Request a Quote</Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base">Call {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
