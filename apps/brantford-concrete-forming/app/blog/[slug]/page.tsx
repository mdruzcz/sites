import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import QuoteForm from "@/components/QuoteForm";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageAlt: string;
  content: React.ReactNode;
};

const posts: BlogPost[] = [
  {
    slug: "how-long-does-concrete-take-to-cure",
    title: "How Long Does Concrete Take to Cure in Ontario?",
    description: "Concrete curing timelines for Ontario homeowners. Learn the difference between initial set, walkable, driveable, and full-strength milestones — and why it matters.",
    date: "2025-04-15",
    readTime: "5 min read",
    category: "Concrete Tips",
    image: "/images/man-working-on-smoothing-concrete-600nw-2413949341.png",
    imageAlt: "Concrete worker finishing a freshly poured slab in Brantford, ON",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          One of the most common questions we get from Brantford homeowners after a pour: <strong>&ldquo;When can I use my driveway?&rdquo;</strong> The answer depends on what you mean by &ldquo;use&rdquo; — and understanding the stages of concrete curing can save you from a costly repair.
        </p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">The Stages of Concrete Curing</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">Concrete doesn&apos;t simply &ldquo;dry&rdquo; — it undergoes a chemical reaction called hydration, where water reacts with cement particles to form a crystal matrix. This process takes place over weeks, not hours.</p>
        <ul className="space-y-3 mb-6">
          {[
            { label: "Initial Set (4–8 hours)", desc: "The concrete is firm enough to walk on lightly with care. No heavy foot traffic or items placed on the surface." },
            { label: "Walkable (24 hours)", desc: "Normal foot traffic is fine. Avoid dragging items across the surface." },
            { label: "Driveable (7 days)", desc: "Light passenger vehicles can use the driveway. This is the minimum cure time before any vehicle traffic." },
            { label: "Full Strength (28 days)", desc: "The concrete has reached its rated 32 MPa compressive strength. No restrictions on use." },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E8751A] mt-2 flex-shrink-0" />
              <div><strong className="text-[#1a2332]">{item.label}:</strong> <span className="text-slate-700">{item.desc}</span></div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Ontario Weather Considerations</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">Ontario&apos;s climate presents unique curing challenges. In summer, high heat can cause rapid moisture evaporation, weakening the surface. We use curing compounds and wet burlap curing to counteract this. In cool weather (below 5°C), hydration slows significantly, and we may use thermal blankets to maintain temperature.</p>
        <p className="text-slate-700 mb-4 leading-relaxed">This is why we never pour in temperatures below freezing — and why our schedule is weather-dependent. Your slab&apos;s long-term performance depends on proper early curing.</p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">What Damages Concrete During Curing</h2>
        <ul className="space-y-2 mb-6 text-slate-700">
          {[
            "Driving on it too soon (before 7 days)",
            "Applying de-icing salt in the first winter",
            "Power washing before full cure",
            "Heavy vehicle traffic before 28 days",
            "Rapid drying in direct sun without curing compound",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="bg-[#E8751A]/10 border border-[#E8751A]/20 rounded-xl p-5 mt-6">
          <p className="text-slate-700 font-medium">
            <strong className="text-[#E8751A]">Pro tip:</strong> For your first winter, avoid using rock salt or calcium chloride de-icers on new concrete. Use sand for traction instead. Salt can penetrate the still-hydrating matrix and cause surface scaling.
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: "concrete-vs-asphalt-driveway",
    title: "Concrete vs. Asphalt Driveways: Which is Better for Brantford?",
    description: "A practical comparison of concrete and asphalt driveways for Brantford homeowners — covering upfront cost, longevity, maintenance, and ROI.",
    date: "2025-03-22",
    readTime: "7 min read",
    category: "Buyer's Guide",
    image: "/images/Concrete-Driveway-Installation-1.png",
    imageAlt: "Freshly installed concrete driveway in Brantford, Ontario",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          When replacing a driveway, most Brantford homeowners face the same choice: asphalt or concrete? Asphalt wins on upfront cost; concrete wins on almost everything else. Here&apos;s the honest comparison.
        </p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Upfront Cost</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">Asphalt typically costs $4–$8/sq.ft. installed. Concrete runs $8–$14/sq.ft. depending on finish. For a typical 400 sq.ft. driveway, that&apos;s roughly $1,600–$3,200 for asphalt versus $3,200–$5,600 for concrete.</p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Lifespan</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">Properly installed asphalt driveways last 15–20 years in Ontario conditions. Concrete? 30–50 years or more. The freeze-thaw cycle that destroys asphalt is far less damaging to steel-reinforced 32 MPa concrete.</p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Maintenance Costs</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-100 rounded-xl p-4">
            <h3 className="font-bold text-[#1a2332] mb-2">Asphalt</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Seal coat every 3–5 years (~$200–$400)</li>
              <li>• Crack filling annually</li>
              <li>• Full replacement at 15–20 years</li>
            </ul>
          </div>
          <div className="bg-[#E8751A]/10 rounded-xl p-4">
            <h3 className="font-bold text-[#1a2332] mb-2">Concrete</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Optional sealer every 5 years</li>
              <li>• Essentially zero annual maintenance</li>
              <li>• 30–50 year lifespan</li>
            </ul>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">The Verdict</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">Over 30 years, a concrete driveway typically costs less in total (installation + maintenance) than two asphalt replacements. Add the curb appeal and home value premium of a stamped or clean broom finish, and concrete wins outright for most Brantford homeowners planning to stay in their home for more than 10 years.</p>
        <div className="bg-[#1a2332] text-white rounded-xl p-6 mt-6">
          <p className="font-semibold text-lg mb-2">Bottom Line</p>
          <p className="text-slate-300">If budget is the only factor, start with asphalt. If you want a permanent, zero-maintenance solution that adds curb appeal and home value, concrete is the clear choice.</p>
        </div>
      </div>
    ),
  },
  {
    slug: "stamped-concrete-cost-guide",
    title: "Stamped Concrete Cost Guide for Brantford Homeowners",
    description: "Real pricing for stamped concrete in Brantford, ON — by pattern type, project size, and complexity. Updated 2025.",
    date: "2025-02-10",
    readTime: "6 min read",
    category: "Cost Guide",
    image: "/images/Stamped-Concrete-1.jpg",
    imageAlt: "Beautiful stamped concrete patio installation in Brantford, Ontario",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Stamped concrete is one of the most sought-after upgrades for Brantford homeowners — and one of the most misunderstood when it comes to pricing. Here&apos;s what you can realistically expect to pay.
        </p>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Stamped Concrete Price Ranges (2025)</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1a2332] text-white">
                <th className="text-left p-3">Project Type</th>
                <th className="text-center p-3">Est. Range (per sq.ft.)</th>
                <th className="text-center p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Basic Stamped Patio", range: "$12–$16", notes: "Single pattern, 1–2 colors" },
                { type: "Stamped Driveway", range: "$14–$18", notes: "Reinforced, larger area" },
                { type: "Pool Surround", range: "$14–$20", notes: "Non-slip additive required" },
                { type: "Multi-color / Complex", range: "$18–$25+", notes: "Borders, antiquing, multi-tone" },
              ].map((row, i) => (
                <tr key={i} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                  <td className="p-3 font-medium text-[#1a2332]">{row.type}</td>
                  <td className="p-3 text-center text-[#E8751A] font-bold">{row.range}</td>
                  <td className="p-3 text-center text-slate-600">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">What Affects the Price?</h2>
        <ul className="space-y-3 mb-6 text-slate-700">
          {[
            { label: "Pattern complexity", desc: "A simple ashlar slate costs less than a detailed cobblestone or random flagstone pattern." },
            { label: "Number of colors", desc: "Base color + accent color + antiquing release = higher cost but stunning results." },
            { label: "Site accessibility", desc: "Tight spaces, slopes, and retaining walls add to the total." },
            { label: "Sealer type", desc: "High-gloss wet-look sealers cost more than standard satin options." },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E8751A] mt-2 flex-shrink-0" />
              <div><strong className="text-[#1a2332]">{item.label}:</strong> {item.desc}</div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Is Stamped Concrete Worth It?</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">For patios, pool surrounds, and entranceways where appearance matters, yes — stamped concrete delivers the look of natural stone at roughly 40–60% of the cost of pavers, with no shifting, weeds, or annual re-sanding. When properly sealed, it lasts as long as standard concrete.</p>
        <div className="bg-[#E8751A]/10 border border-[#E8751A]/20 rounded-xl p-5 mt-6">
          <p className="text-slate-700"><strong className="text-[#E8751A]">Get an accurate quote:</strong> Stamped concrete pricing varies by project. The best way to get a real number is to have us assess your site and provide a detailed written estimate — completely free.</p>
        </div>
      </div>
    ),
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Brantford Concrete Forming`,
      description: post.description,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Blog", url: `${site.url}/blog` },
      { name: post.title, url: `${site.url}/blog/${post.slug}` },
    ]),
  ];

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#E8751A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{post.category}</span>
            <time dateTime={post.date} className="text-slate-400 text-sm">
              {new Date(post.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <span className="text-slate-400 text-sm">· {post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-0 max-w-3xl">{post.title}</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.content}

              {/* Author bio */}
              <div className="mt-10 border-t border-slate-200 pt-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8751A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">BCF</div>
                <div>
                  <p className="font-bold text-[#1a2332]">{site.name}</p>
                  <p className="text-slate-600 text-sm">Expert concrete contractors serving Brantford and Brant County since 2019.</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8fafc] rounded-2xl p-6 mb-6 sticky top-24">
                <h3 className="text-lg font-bold text-[#1a2332] mb-1">Ready to Start Your Project?</h3>
                <p className="text-slate-500 text-sm mb-4">Get a free quote — we respond within {site.responseTime}.</p>
                <QuoteForm compact />
              </div>

              {/* Related posts */}
              {otherPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#1a2332] mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="flex gap-3 group">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.imageAlt} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1a2332] group-hover:text-[#E8751A] transition-colors leading-tight">{p.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{p.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
