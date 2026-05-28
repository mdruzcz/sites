import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="eyebrow mb-4">404 Error</p>
        <h1 className="h-display text-5xl md:text-7xl text-[var(--charcoal)] mb-4">
          Page Not Found
        </h1>
        <p className="text-[var(--concrete)] text-lg mb-8 max-w-md mx-auto leading-relaxed normal-case font-normal">
          The page you&apos;re looking for may have moved. If you were looking for deck staining
          information, try one of the links below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Get a Free Quote
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Service Areas", href: "/service-areas" },
            { label: "FAQ", href: "/faq" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--accent)] hover:text-[var(--accent-600)] text-sm font-semibold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
