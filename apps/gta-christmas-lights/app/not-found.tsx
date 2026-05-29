import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[var(--dark-bg)] px-4">
      <div className="text-center max-w-md">
        <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          404 — Not Found
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          That page isn&apos;t lit yet.
        </h1>
        <p className="text-white/65 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you somewhere helpful.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
