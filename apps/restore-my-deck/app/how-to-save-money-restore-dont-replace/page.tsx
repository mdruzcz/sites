import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "How to Save Money – Restore, Don't Replace! | Blog",
  description: "Learn why restoring your deck or fence is a smarter investment than full replacement. Expert tips from Restore My Deck in Kitchener-Waterloo.",
  openGraph: { title: "How to Save Money – Restore, Don't Replace!", url: `${site.url}/how-to-save-money-restore-dont-replace` },
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: "How to Save Money – Restore, Don't Replace!", href: "/how-to-save-money-restore-dont-replace" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-3xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Blog</p>
          <h1 className="text-3xl md:text-4xl font-extrabold font-[var(--font-montserrat)]">How to Save Money – Restore, Don&apos;t Replace!</h1>
          <p className="mt-4 text-gray-400">January 2024 · By Restore My Deck</p>
        </div>
      </div>

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>When homeowners see a weathered, grey, cracked deck — their first instinct is often to replace it. But in most cases, a professional restoration can bring that same deck back to near-new condition for a fraction of the cost of replacement.</p>

          <h2>The Real Cost of Replacement vs. Restoration</h2>
          <p>A full deck replacement in Ontario typically costs between <strong>$15,000 and $40,000</strong> depending on size, material and complexity. A professional deck restoration — including cleaning, sanding, repairs and staining — typically costs <strong>$800 to $2,500</strong>. That&apos;s a savings of up to 95%.</p>

          <h2>When Does Restoration Make Sense?</h2>
          <p>Restoration works well when:</p>
          <ul>
            <li>The structural joists and frame are still solid</li>
            <li>Surface boards are weathered or greyed but not deeply rotted</li>
            <li>Railings are intact and stable</li>
            <li>The deck is less than 15–20 years old</li>
          </ul>
          <p>Our team inspects your deck before quoting. If we find structural issues that require replacement, we&apos;ll tell you honestly — but in our experience, most decks are restorable.</p>

          <h2>What a Professional Restoration Includes</h2>
          <p>Our full restoration process:</p>
          <ol>
            <li><strong>Deep clean</strong> — eco-friendly solution removes mold, algae and grey wood fibres</li>
            <li><strong>Repairs</strong> — loose boards, rotted sections and unstable railings fixed before finishing</li>
            <li><strong>80-grit buff sanding</strong> — smooths the surface and opens wood pores for stain absorption</li>
            <li><strong>Brush-applied oil-based stain</strong> — Ready Seal or Penofin Verde penetrates deep for a lasting finish</li>
          </ol>

          <h2>How Long Will It Last?</h2>
          <p>With a premium oil-based stain and proper prep work, you can expect <strong>2–4 years</strong> before re-staining is needed. We also recommend a full restoration every 5–7 years to keep your deck looking its best and extend its lifespan significantly.</p>

          <h2>The Bottom Line</h2>
          <p>Restoring your deck instead of replacing it saves you thousands of dollars, extends the life of your existing structure and still delivers a beautiful result. Most of our restoration projects are completed in just 2 days including drying time.</p>

          <p>Ready to see what your deck could look like? <Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free no-obligation quote.</Link></p>
        </div>
      </article>

      <CtaBand title="Ready to Restore Your Deck?" />
    </>
  );
}
