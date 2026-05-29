import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand({ title = "Ready to Restore Your Deck?" }: { title?: string }) {
  return (
    <section className="bg-[var(--accent)] py-14 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-extrabold text-white">{title}</h2>
          <p className="mt-2 text-white/90 text-lg">Most projects completed in just 2 days including drying time.</p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/contact-us" className="btn btn-white text-[var(--dark)] font-bold">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-dark">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
