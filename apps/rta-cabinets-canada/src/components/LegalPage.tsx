import Link from "next/link";
import { site } from "@/lib/site";
import { getLegal, type LegalKey } from "@/lib/content";
import ArticleBody from "./ArticleBody";

export default function LegalPage({ doc: key, path }: { doc: LegalKey; path: string }) {
  const doc = getLegal(key);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: doc.title,
    url: `${site.url}${path}`,
    dateModified: doc.updated,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-ink-soft mb-4">
        <Link href="/" className="hover:text-accent">Home</Link> / {doc.title}
      </nav>
      <h1 className="text-4xl font-bold mb-2">{doc.title}</h1>
      <p className="text-sm text-ink-soft mb-8">Last updated {new Date(doc.updated + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>
      <ArticleBody sections={doc.sections} />
      <div className="mt-12 rounded-lg border border-border bg-sand p-5 text-sm text-ink-soft">
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`} className="text-accent font-medium underline">
          {site.email}
        </a>{" "}
        or call <a href={site.phoneHref} className="text-accent font-medium">{site.phone}</a>.
      </div>
    </div>
  );
}
