import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "An Ultimate Guide to Staining Fences: Tips and Tricks from the Experts",
  description: "Learn everything you need to know about staining your fence the right way. Expert tips on preparation, product selection, application techniques, and maintenance from London Fence Installer.",
  openGraph: {
    title: "Ultimate Guide to Staining Fences | London Fence Installer",
    description: "Expert tips and tricks for fence staining. Preparation, products, and application techniques.",
    url: `${site.url}/an-ultimate-guide-to-staining-fences-tips-and-tricks-from-the-experts`,
  },
};

export default function BlogStainingGuidePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "An Ultimate Guide to Staining Fences", url: `${site.url}/an-ultimate-guide-to-staining-fences-tips-and-tricks-from-the-experts` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">An Ultimate Guide to Staining Fences: Tips and Tricks from the Experts</h1>
          <p className="text-gray-300 text-sm">By London Fence Installer | Expert Fencing Advice</p>
        </div>
      </section>

      <article className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <h2>Why Staining Your Fence Matters</h2>
          <p>
            A wood fence is a significant investment that enhances your property&apos;s privacy, security, and curb appeal. Without proper protection, however, even the best-quality cedar or pressure-treated pine will begin to show its age within a few years. Staining your fence is one of the most effective ways to protect that investment and keep it looking great for decades.
          </p>

          <h2>Step 1: Prepare Your Fence Properly</h2>
          <p>
            Preparation is the most important step in any fence staining project. A clean, dry, smooth surface ensures the stain adheres properly and provides maximum protection.
          </p>
          <ul>
            <li><strong>Clean the fence:</strong> Remove dirt, mildew, and old stain with a pressure washer or deck cleaner solution.</li>
            <li><strong>Let it dry completely:</strong> Wait at least 48–72 hours after washing before applying stain. Staining wet wood leads to poor adhesion and early peeling.</li>
            <li><strong>Sand rough spots:</strong> Lightly sand any rough or splintered areas for a smoother finish.</li>
            <li><strong>Check for mildew:</strong> Treat any mildew with a bleach solution before staining.</li>
          </ul>

          <h2>Step 2: Choose the Right Stain</h2>
          <p>
            Not all stains are created equal. Choosing the right product for your wood type and climate is critical.
          </p>
          <ul>
            <li><strong>Solid stain:</strong> Provides the most colour coverage and UV protection. Best for older fences with imperfections.</li>
            <li><strong>Semi-transparent stain:</strong> Allows some wood grain to show through while providing good protection.</li>
            <li><strong>Clear/natural stain:</strong> Preserves the natural look of the wood while offering moisture and UV protection.</li>
          </ul>
          <p>
            In Ontario&apos;s climate, we recommend a water-repellent formula with UV inhibitors. Look for stains specifically formulated for exterior wood exposed to freeze-thaw cycles.
          </p>

          <h2>Step 3: Apply the Stain Correctly</h2>
          <p>
            Application technique matters as much as product selection.
          </p>
          <ul>
            <li><strong>Choose the right tools:</strong> A brush or roller works well for flat boards. A pump sprayer is faster for larger areas, but always back-brush to work the stain into the wood.</li>
            <li><strong>Work in the shade:</strong> Avoid applying stain in direct sunlight or when temperatures are below 10°C or above 35°C.</li>
            <li><strong>Apply thin, even coats:</strong> Two thin coats are better than one thick coat. Allow adequate drying time between coats as specified on the product label.</li>
            <li><strong>Start at the top:</strong> Work from the top of the fence down to avoid drips on freshly stained surfaces.</li>
          </ul>

          <h2>Step 4: Maintain Your Stained Fence</h2>
          <p>
            Regular maintenance extends the life of your stain and your fence.
          </p>
          <ul>
            <li>Clean your fence annually with a mild soap and water solution.</li>
            <li>Inspect for peeling, cracking, or discolouration each spring.</li>
            <li>Plan to re-stain every 2–4 years, depending on your fence&apos;s exposure to sun and moisture.</li>
            <li>Touch up any damaged areas promptly to prevent moisture penetration.</li>
          </ul>

          <h2>Professional Fence Staining Services in London</h2>
          <p>
            If you&apos;d prefer to leave it to the professionals, London Fence Installer offers expert fence staining services throughout London, St. Thomas, Woodstock, and surrounding areas. Our team uses premium products and proven techniques to deliver a beautiful, long-lasting finish.
          </p>
        </div>
      </article>

      <CtaBand heading="Get a Professional Staining Quote" sub="We serve London, St. Thomas, Woodstock & area" />
    </>
  );
}
