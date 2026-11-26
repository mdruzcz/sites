import Link from "next/link";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="shell max-w-3xl py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="crumbs crumbs-dark mb-6">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <h1 className="h2 !text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated {updated}</p>
      <div className="card prose-block mt-8 p-6 md:p-10">{children}</div>
    </div>
  );
}
