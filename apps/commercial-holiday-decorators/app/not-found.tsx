import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap text-center max-w-2xl mx-auto py-16">
        <span className="pill mb-4">404</span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink">That page isn’t lit.</h1>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/services" className="btn btn-outline">Services</Link>
          <Link href="/gallery" className="btn btn-outline">Gallery</Link>
          <a href={site.phoneHref} className="btn btn-outline"><Icon.Phone width={16} height={16} /> {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
