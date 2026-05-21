import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  subtitle?: string;
};

export function CtaBand({
  title = "Ready to Transform Your Outdoor Space?",
  subtitle = `At ${site.name}, we are your reliable experts for driveways, patios, and concrete repairs across Brantford and Brant County.`,
}: Props) {
  return (
    <section className="bg-[var(--accent)] text-white py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3">{title}</h2>
        <p className="text-white/85 max-w-2xl mx-auto mb-8 normal-case">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn bg-white text-[var(--accent)] hover:bg-white/90 border-white">
            Get a Free Quote
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-white">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
