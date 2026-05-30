import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const posts: Record<string, {
  title: string;
  metaTitle: string;
  description: string;
  image: string;
  date: string;
  category: string;
  content: string;
}> = {
  "7-helpful-tips-choosing-permanent-outdoor-lighting": {
    title: "7 Helpful Tips for Choosing the Best Permanent Outdoor Lighting for Your Home in Ontario",
    metaTitle: "7 Tips for Permanent Outdoor Lighting",
    description: "Expert guide on choosing permanent outdoor LED lighting for Ontario homes — durability, colour range, app control, warranty, and installation best practices.",
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

Ask your installer about maintenance services, app support, and what happens if a component fails after a few years. The best providers offer ongoing service relationships, not just a one-time install. A company that's still around in five years — and still answering the phone — is worth more than the cheapest quote.

## Why Permanent Beats Temporary Lighting

It's worth stepping back to remember why homeowners across Southwestern Ontario are switching to permanent systems in the first place. Temporary string lights have to be bought, untangled, hung from a ladder, taken down, and stored — every single year. They fail in the cold, blow fuses, and rarely survive more than a couple of seasons. A permanent system is installed once, hidden in a colour-matched track, and controlled entirely from your phone. There's no ladder, no storage bins in the garage, and no annual trip to the hardware store for replacements.

Permanent lighting also does double duty the rest of the year. Beyond the holidays, a subtle warm-white setting adds curb appeal and architectural accent lighting every night, while a dim always-on mode improves security and helps you and your guests see walkways safely. You're not buying Christmas lights — you're buying a year-round exterior lighting system that happens to do the holidays beautifully.

## What Does It Cost — and Is It Worth It?

Most residential permanent lighting installations in Ontario range from roughly $2,500 to $8,000 depending on the size and complexity of the home. That sounds like a lot next to a $40 box of string lights — until you add up a decade of replacement strings, your time, and the risk of a ladder fall in icy conditions. Spread over the 50,000-hour-plus lifespan of quality LEDs and a lifetime warranty, the per-year cost is modest, and it's an investment that adds to your home's curb appeal rather than cluttering the garage.

## How to Plan Your Installation

A little planning makes for a better result. Walk your home's exterior and think about which rooflines, peaks, gables, and architectural features you want to highlight — corners and dormers create the most dramatic effect. Consider how the lighting will look from the street as well as from inside looking out. Note where your power sources are, and whether you want pathway, soffit, or full-roofline coverage. The best installers will turn this conversation into a design that suits your home rather than a one-size-fits-all run of lights, so come to your consultation with a sense of what you're hoping to achieve.

## Seasonal Versatility Is the Real Payoff

The seven tips above all point to one thing: you're not buying holiday lights, you're buying a year-round exterior lighting system. The homeowners who get the most out of their investment are the ones who use it beyond December — warm white for everyday curb appeal, team colours on game night, orange and purple at Halloween, red and green for the holidays, and a dim security setting overnight. When you choose a quality system that's built to do all of this reliably for years, the per-occasion cost becomes tiny and the convenience is enormous.

## Putting It All Together

When you weigh these seven factors — winter rating, app control, colour range, warranty, professional installation, colour matching, and ongoing support — you'll quickly separate the premium providers from the budget operators. The cheapest quote almost always cuts corners on at least one of them, and that's exactly where problems show up two or three winters later.

---

Ready to install permanent outdoor lighting at your Ontario home? [Contact Celebrate Lighting](/contact) for a free, no-obligation consultation.
    `,
  },
  "recommended-lighting-supplier-ontario": {
    title: "Recommended Lighting Supplier in Ontario",
    metaTitle: "Best Permanent Lighting Supplier in ON",
    description: "Celebrate Lighting's recommended permanent outdoor LED lighting supplier in Ontario — why product quality matters as much as the installation itself.",
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

## What Premium Components Actually Look Like

It's easy to say "we use quality products," so here's what that means in practice. The LED modules are individually addressable, so each point can display its own colour for true effects rather than one flat wash. The housings are fully potted and sealed to an IP67 rating, meaning they're protected against dust and immersion — essential when ice and meltwater are involved. The cabling is UV-stable and rated for sub-zero flexibility, so it doesn't crack in the cold. And the controller is a known, supported product with a maintained app, regular firmware updates, and reliable WiFi — not a generic board that loses connection the first time your router restarts. These details are invisible on a quote sheet but obvious three winters in.

## Why It's Worth Paying For

Homeowners sometimes ask why they shouldn't just buy the cheapest permanent system they can find online and have someone hang it. The answer is simple: the cost of a permanent lighting system is mostly in the labour and the warranty, not the parts. Saving a few hundred dollars on inferior LEDs and a flaky controller to redo the whole project in three years is a false economy. Spending a little more on components proven to last 50,000+ hours, installed by a team that warranties them for life, is the version that actually saves money over the lifetime of your home.

## How a Cheap System Fails

It helps to understand exactly how a low-grade lighting system breaks down, because the failure points are predictable. First, the LEDs themselves drift in colour — the "white" becomes pink or blue, and adjacent modules no longer match. Next, cheap potting and seals let moisture in, and a single Ontario freeze-thaw cycle cracks the housing and corrodes the contacts. Then the controller, often the lowest-quality component, loses its WiFi connection or stops holding schedules. By the third winter you're left with a patchy, half-working display that's worse than no lights at all — and because the installer used a no-name system, replacement parts are impossible to source.

## Why the Installer and the Product Have to Match

A premium product installed badly fails, and a flawless installation of a cheap product fails too. The two have to go together. That's why we treat product selection as part of our craft, not an afterthought. We've standardized on components we've personally tested through multiple Canadian winters, so we can warranty both the parts and the workmanship as a single promise. When something is covered end-to-end by one company, you never get stuck in the finger-pointing between an installer and a manufacturer that plagues budget jobs.

## Questions to Ask Any Supplier or Installer

Before you sign anything, ask a few pointed questions: What is the rated lifespan and IP rating of the LED modules? Is the system rated for −40°C? Who makes the controller and app, and how long has it been supported? What exactly does the warranty cover — parts, labour, or both — and for how long? Can you show me installations that have survived several winters? Honest providers answer these readily; the answers themselves tell you most of what you need to know.

## The Bottom Line

Don't let a low-quality product undermine a professional installation. When you choose Celebrate Lighting, you get both — premium product and expert installation, backed by a lifetime warranty.

[Request a free quote](/contact) to learn more about the products we use and why we stand behind them.
    `,
  },
  "how-to-use-permanent-lighting-year-round": {
    title: "How to Use Your Permanent Lighting System Year-Round in Ontario",
    metaTitle: "Using Permanent Lighting Year-Round",
    description: "A seasonal guide for Ontario homeowners on getting the most from permanent outdoor LED lighting — from summer ambiance to holiday displays and beyond.",
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

## Make the Most of Scheduling and Scenes

The single most underused feature on a permanent lighting system is the scheduler. Instead of toggling lights manually, set them once and forget them: on at dusk, dimmed at bedtime, off overnight, with a brighter "welcome home" scene timed to your evening arrival. Most apps let you save custom scenes, so a few taps recreate your favourite warm-white everyday look, a team-colour game-day display, or a full holiday sequence. Building a small library of saved scenes early means you'll actually use the system to its potential rather than leaving it on one static colour.

## A Month-by-Month Ontario Calendar

Ontario gives you a natural rhythm of occasions to light up. January is cool blues and whites that complement the snow; February brings reds and pinks for Valentine's Day. March is green for St. Patrick's Day, and April pastels for spring and Easter. Through the summer, Canada Day red-and-white in July and warm whites for backyard entertaining carry you to fall. October is the big one — orange and purple for Halloween — followed by remembrance themes in November and the full holiday spectrum in December. Because it's all in the app, you can schedule the whole year in an afternoon and let it run.

## Special Occasions Beyond the Calendar

Permanent lighting isn't only for the big holidays — it's perfect for the personal moments too. Light your home in pink and blue for a gender reveal, your child's school colours for graduation, a single colour to support a cause or awareness month, or a custom palette for a backyard wedding or anniversary party. Hosting a birthday? Set the guest of honour's favourite colours. Because it's all controlled from the app, you can switch for an evening and switch back the next morning. These spontaneous, personal uses are often what turn a permanent lighting system from a nice feature into something a family genuinely loves.

## A Few Tips to Get the Most From Your System

To keep your system looking its best year after year, a few habits help. Use the scheduler rather than leaving lights on manually — it saves energy and means you never forget to turn them off. Take advantage of dimming; a softer setting often looks more elegant than full brightness, especially for everyday use. Save your favourite scenes so they're a single tap away. And book an occasional maintenance check to clean the fixtures and update the controller firmware — a quick visit that keeps colours accurate and connections solid. Treated well, a quality permanent system will light up your home beautifully for decades.

## Don't Forget Everyday Curb Appeal

Holidays get the attention, but the quiet everyday value of permanent lighting is warm-white architectural accent lighting that makes your home look its best on an ordinary Tuesday in March. A tasteful, consistent warm-white wash highlights your roofline and entryway, boosts curb appeal, and — if you ever sell — photographs beautifully for evening listing shots. Many homeowners tell us this understated everyday mode, not the holiday displays, ends up being their favourite.

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
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n").filter(Boolean);
  const cities = getServiceAreas().cities;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ title: post.title, description: post.description, image: post.image, date: post.date, slug })) }} />
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

          {/* Internal links: service areas (link equity to city pages) */}
          <div className="mt-12 border-t border-[var(--border)] pt-8">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Permanent Lighting Near You</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Celebrate Lighting installs permanent outdoor LED lighting across Southwestern Ontario, including:
            </p>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
            <h3 className="font-bold text-[var(--foreground)] mb-2">Ready to get started?</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Contact Celebrate Lighting for a free, no-obligation consultation at your Ontario home.</p>
            <Link href="/contact" className="btn btn-primary text-sm">Get My Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
