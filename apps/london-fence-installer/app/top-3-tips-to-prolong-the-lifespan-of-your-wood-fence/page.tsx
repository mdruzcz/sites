import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Extend Your Wood Fence Lifespan | London Fence Installer" },
  description: "Expert tips on extending the life of your wood fence. The top three maintenance practices that keep your fence looking great and standing strong for decades.",
  alternates: { canonical: "https://londonfenceinstaller.ca/top-3-tips-to-prolong-the-lifespan-of-your-wood-fence" },
  openGraph: {
    title: "Extend Your Wood Fence Lifespan | London Fence Installer",
    description: "3 expert tips for making your wood fence last longer in London, Ontario's climate.",
    url: `${site.url}/top-3-tips-to-prolong-the-lifespan-of-your-wood-fence`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Tips to extend wood fence lifespan" }],
  },
};

export default function BlogWoodFenceTipsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Top 3 Tips to Prolong Your Wood Fence", url: `${site.url}/top-3-tips-to-prolong-the-lifespan-of-your-wood-fence` },
  ]);
  const article = articleSchema({
    headline: "Top 3 Tips to Prolong the Lifespan of Your Wood Fence",
    description: "Expert maintenance tips to keep your wood fence looking great and lasting longer in Ontario's climate.",
    url: "/top-3-tips-to-prolong-the-lifespan-of-your-wood-fence",
    datePublished: "2026-01-10",
    image: "/images/wood-fence.jpg",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      <section className="bg-green py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Top 3 Tips to Prolong the Lifespan of Your Wood Fence</h1>
          <p className="text-gray-300 text-sm">By London Fence Installer | Expert Fencing Advice</p>
        </div>
      </section>

      <article className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)] mb-10 leading-relaxed text-lg">
            A wood fence is one of the most popular choices for Ontario homeowners — and for good reason. It&apos;s natural, versatile, and beautiful. But wood is also vulnerable to moisture, insects, and weathering. With proper care, however, a quality wood fence can last 20–30 years. Here are the top three things you can do to maximize its lifespan.
          </p>

          <div className="space-y-10">
            {[
              {
                number: 1,
                title: "Stain or Seal Your Fence Regularly",
                body: [
                  "This is the single most important thing you can do for your wood fence. Staining or sealing creates a moisture barrier that prevents the wood from absorbing water — the primary cause of rot, warping, and mould growth.",
                  "We recommend applying a quality exterior stain or sealant every 2–4 years, depending on your fence's sun and moisture exposure. South-facing fences that get full sun exposure may need attention more frequently.",
                  "Always start with a clean, dry surface, and choose a product with UV inhibitors to prevent sun-induced greying and cracking.",
                ],
              },
              {
                number: 2,
                title: "Keep Vegetation Away from the Fence",
                body: [
                  "Vines, plants, and grass growing directly against your fence are one of the biggest threats to its longevity. Plant matter retains moisture against the wood and can accelerate rot significantly.",
                  "Keep a gap of at least 6 inches between your fence boards and any vegetation. Regularly trim back any plants or vines that grow toward the fence. After heavy rainfall, check that mulch and soil aren't piled up against the base of your fence boards.",
                  "If possible, avoid ground contact altogether. Fence boards that touch the soil are the most vulnerable to rot — and this is why quality installation with proper post depth and concrete footings matters so much.",
                ],
              },
              {
                number: 3,
                title: "Inspect and Repair Promptly",
                body: [
                  "Small problems become big problems fast with wood fences. A single loose board or cracked post can allow moisture to penetrate and accelerate deterioration in nearby sections.",
                  "Make it a habit to walk your fence line each spring after the frost has left the ground. Look for: loose or missing fasteners, cracked or split boards, posts that have shifted or heaved, signs of rot or discolouration, and rust on any metal hardware.",
                  "Addressing these issues promptly — before they spread — is far more economical than waiting until large sections need replacement.",
                ],
              },
            ].map((tip) => (
              <div key={tip.number}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--green)] text-white text-xl font-extrabold flex items-center justify-center flex-shrink-0">
                    {tip.number}
                  </div>
                  <h2 className="text-2xl font-extrabold text-[var(--foreground)] mt-2">{tip.title}</h2>
                </div>
                {tip.body.map((para, i) => (
                  <p key={i} className="text-[var(--muted)] mb-4 leading-relaxed ml-16">{para}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 mt-8">
            <h3 className="font-bold text-lg text-[var(--green)] mb-2">When to Call a Professional</h3>
            <p className="text-[var(--muted)] text-sm">
              If your fence has significant rot, multiple leaning posts, or widespread damage, it may be time for professional repair or replacement. London Fence Installer offers free assessments and honest advice — we&apos;ll tell you if a repair makes more sense than a replacement, saving you money.
            </p>
          </div>
        </div>
      </article>

      <CtaBand heading="Need Fence Repair or Maintenance?" sub="Get a free quote from London Fence Installer" />
    </>
  );
}
