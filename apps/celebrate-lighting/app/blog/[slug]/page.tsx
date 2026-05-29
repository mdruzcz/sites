import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const posts: Record<string, {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  content: string;
}> = {
  "7-helpful-tips-choosing-permanent-outdoor-lighting": {
    title: "7 Helpful Tips for Choosing the Best Permanent Outdoor Lighting for Your Home in Ontario",
    description: "Expert guide on choosing permanent outdoor LED lighting for Ontario homes. Covers durability, colour range, app control, warranty, and installation best practices.",
    image: "/images/project-brantford.jpg",
    date: "2025-09-15",
    category: "Helpful Tips",
    content: `
When it comes to transforming your home's exterior, few upgrades make as much of an impact as permanent outdoor lighting. Whether you live in Kitchener, Cambridge, or Woodstock, choosing the right LED lighting system ensures your home looks stunning year-round—while saving you time, money, and hassle.

## 1. Choose a System Built for Canadian Winters

Ontario winters are harsh. Your lighting system needs to be rated for temperatures as low as −40°C, with waterproof and UV-resistant cables. Look for IP67-rated fixtures — they handle ice, snow, and freezing rain without issue.

## 2. Prioritize App-Based Control

The best permanent lighting systems let you control colours, brightness, and schedules from your phone. Look for a system with a well-reviewed mobile app, WiFi connectivity, and pre-set holiday themes. You shouldn't need to physically adjust your lights for every occasion.

## 3. Look for High Colour Range

A good permanent lighting system offers a wide colour temperature range (2800K warm white through 6000K daylight) as well as full-spectrum colour change. This means you can use warm white for everyday ambiance and switch to vibrant colours for holidays and events.

## 4. Verify the Warranty

A permanent lighting system is an investment. Only choose a provider that offers a comprehensive warranty covering LED modules, mounting hardware, and installation workmanship. Lifetime warranties are the gold standard.

## 5. Insist on Professional Installation

Permanent lighting must be installed correctly — improper installation can damage your home's fascia and soffit, create electrical hazards, and void warranties. Always use a licensed, insured contractor with a track record of successful installations.

## 6. Ask About Colour Matching

The best installers will colour-match your track and housing to your soffit and fascia, creating a seamless appearance that looks intentional — not bolted-on. This is a key differentiator between professional and DIY systems.

## 7. Consider Ongoing Support

Ask your installer about maintenance services, app support, and what happens if a component fails after a few years. The best providers offer ongoing service relationships, not just a one-time install.

---

Ready to install permanent outdoor lighting at your Ontario home? [Contact Celebrate Lighting](/contact) for a free, no-obligation consultation.
    `,
  },
  "recommended-lighting-supplier-ontario": {
    title: "Recommended Lighting Supplier in Ontario",
    description: "Celebrate Lighting's recommended permanent outdoor LED lighting supplier in Ontario — why product quality matters as much as installation.",
    image: "/images/blog-supplier.jpg",
    date: "2025-09-20",
    category: "Recommendations",
    content: `
When it comes to permanent outdoor lighting in Ontario, homeowners want products that are durable, energy-efficient, and stylish enough to enhance their home all year long. The truth is, the quality of your lighting system is just as important as the installation itself.

## Why Product Quality Matters

A poorly made LED module will fade, discolour, or fail within a few seasons — leaving you with patchy, dim lighting that's worse than no lighting at all. Premium LED systems use commercial-grade components designed to last 50,000+ hours.

## What We Look for in a Supplier

At Celebrate Lighting, we evaluate our suppliers on several key criteria:

- **LED quality:** We only use modules rated at 50,000+ hours with consistent colour rendering
- **Weatherproofing:** IP67 or better — fully waterproof, UV-resistant
- **Colour accuracy:** True colour reproduction across the full spectrum, including warm whites
- **App compatibility:** Reliable WiFi control with a well-maintained app
- **Support:** Local or Canadian-based technical support

## Our Recommendation

After testing multiple systems across hundreds of installations in Southwestern Ontario, we've settled on a supplier that meets all of these criteria. Our systems have performed flawlessly through multiple Canadian winters and consistently receive positive feedback from homeowners.

## The Bottom Line

Don't let a low-quality product undermine a professional installation. When you choose Celebrate Lighting, you get both — premium product and expert installation, backed by a lifetime warranty.

[Request a free quote](/contact) to learn more about the products we use and why we stand behind them.
    `,
  },
  "how-to-use-permanent-lighting-year-round": {
    title: "How to Use Your Permanent Lighting System Year-Round in Ontario",
    description: "A seasonal guide for Ontario homeowners on getting the most from permanent outdoor LED lighting — from summer ambiance to holiday displays and everything in between.",
    image: "/images/gallery-1.jpg",
    date: "2025-10-01",
    category: "Helpful Tips",
    content: `
One of the biggest advantages of a permanent LED lighting system is the ability to customize it for every season and occasion. Here's how Ontario homeowners get the most from their systems throughout the year.

## Spring: Soft Whites and Pastels

As the snow melts, switch your lights to soft warm white or pastel colours to complement spring flowers. Use the scheduler in your app to set lights to come on at dusk and turn off at bedtime automatically.

## Summer: Everyday Ambiance

Summer is about curb appeal and entertaining. Set your lights to a warm white or subtle colour to highlight your home's architecture during evening gatherings. Many homeowners also use soft blues or greens for a cool, refreshing look during hot months.

## Fall: Halloween and Harvest

October is one of the most popular times for colour changes. Switch to orange and purple for Halloween — or combine them with white for a sophisticated autumn palette. The app makes it easy to schedule the change days in advance.

## Winter: Holiday Brilliance

This is where permanent lighting truly shines. Pre-programmed Christmas themes, Hanukkah blue and white, New Year's midnight sequences — all available with a tap. No more climbing ladders in the cold.

## Year-Round: Security and Safety

Don't forget the practical benefits. Permanent lighting deters intruders, illuminates walkways, and makes your home safer year-round. Use the app to set dim, always-on white lighting during overnight hours.

---

Want to get started? [Contact us](/contact) for a free consultation in your Ontario city.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | Celebrate Lighting`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${slug}`,
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n").filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Blog", url: `${site.url}/blog` },
        { name: post.title, url: `${site.url}/blog/${slug}` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[var(--accent)]">Blog</Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{post.category}</span>
            <span className="text-sm text-[var(--muted)]">{new Date(post.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-8">{post.title}</h1>

          <div className="relative rounded-2xl overflow-hidden aspect-video mb-10">
            <Image src={post.image} alt={`${post.title} — Celebrate Lighting`} fill className="object-cover" />
          </div>

          <article className="prose prose-gray max-w-none">
            {paragraphs.map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-[var(--foreground)] mt-8 mb-3">{line.replace("## ", "")}</h2>;
              if (line.startsWith("- ")) return <li key={i} className="text-[var(--muted)] leading-relaxed ml-4">{line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
              if (line === "---") return <hr key={i} className="my-8 border-[var(--border)]" />;
              return <p key={i} className="text-[var(--muted)] leading-relaxed mb-4">{line.replace(/\[(.*?)\]\((.*?)\)/g, "$1")}</p>;
            })}
          </article>

          <div className="mt-12 p-6 rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
            <h3 className="font-bold text-[var(--foreground)] mb-2">Ready to get started?</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Contact Celebrate Lighting for a free, no-obligation consultation at your Ontario home.</p>
            <Link href="/contact" className="btn btn-primary text-sm">Get My Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
