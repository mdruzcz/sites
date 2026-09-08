import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section bg-paper">
      <div className="container-x max-w-2xl text-center">
        <p className="kicker justify-center">404</p>
        <h1 className="display mt-3 text-4xl">That page has been backfilled</h1>
        <p className="mt-4 text-[17px] text-ink-2">The address does not exist on this site. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-ink">Home</Link>
          <Link href="/services" className="btn btn-outline">Services</Link>
          <Link href="/gallery" className="btn btn-outline">Gallery</Link>
          <a href={site.phoneHref} className="btn btn-accent">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
