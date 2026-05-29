import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section style={{ background: "var(--surface)" }} className="py-24 md:py-40">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-eyebrow mb-4">404 — Page Not Found</p>
        <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
          Lights Out on This Page
        </h1>
        <p className="text-[var(--muted)] mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Try navigating from the menu above, or contact us if you need help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary px-8">Go Home</Link>
          <Link href="/contact" className="btn btn-outline px-8">Contact Us</Link>
          <a href={site.phoneHref} className="btn btn-outline px-8">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
