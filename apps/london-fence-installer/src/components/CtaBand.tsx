import Link from "next/link";
import { site } from "@/lib/site";

interface CtaBandProps {
  heading?: string;
  sub?: string;
}

export function CtaBand({ heading = "Upgrade Your Fence", sub = "Get Quote Today!" }: CtaBandProps) {
  return (
    <section className="bg-green py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">{heading}</h2>
        <p className="text-lg mb-6 text-gray-200">{sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact-us" className="btn btn-primary">
            Get a Quote
          </Link>
          <a href={site.phoneHref} className="btn btn-white">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
