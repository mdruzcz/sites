import type { Metadata } from "next";
import { Footer } from "../_components/sections";
import { NavBar } from "../_components/sections-interactive";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of use for the London Deck Builder website and the scope of our deck building services — governed by the laws of Ontario, Canada.",
  alternates: { canonical: "/terms" },
  openGraph: {
    url: "/terms",
    title: "Terms of Service | London Deck Builder",
    description:
      "Terms of use for the London Deck Builder website and services.",
  },
};

export const revalidate = 3600;

export default function TermsPage() {
  const updated = "May 26, 2026";
  return (
    <main>
      <NavBar homeHref="/" />

      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--wood-dark)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Legal
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </section>

      <article className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream)" }}>
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:lg:text-lg [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:lg:text-lg [&_li]:leading-relaxed [&_a]:underline"
          style={{ color: "var(--wood)" }}
        >
          <p style={{ color: "var(--wood-dark)" }}>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the London Deck Builder website at <a href="https://londondeckbuilder.ca">londondeckbuilder.ca</a> and any services you contract with us. By using this site or requesting a quote, you agree to these Terms.
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>1. Scope of services</h2>
          <p>London Deck Builder designs, builds, repairs, refinishes, and maintains residential decks throughout London, St. Thomas, Woodstock, Strathroy and surrounding areas in Southwestern Ontario. We work with pressure-treated lumber, cedar, composite (including Trex and TimberTech), and PVC decking. Services may include permit assistance, footings, railings, stairs, lighting, and ancillary outdoor features.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>2. Quotes are not contracts</h2>
          <p>Estimates and quotes provided through this website, by phone, by email, or in person are non-binding until a written work order or contract is signed by both parties. Quote pricing is valid for 30 days unless otherwise stated, and is subject to revision based on:</p>
          <ul>
            <li>Final on-site measurements and structural assessment.</li>
            <li>Permit, inspection, or municipal requirements not visible at quote stage.</li>
            <li>Subsurface conditions (e.g., rock, soft fill, buried utilities) discovered during excavation.</li>
            <li>Material price changes outside of our control beyond the quote validity period.</li>
            <li>Customer-requested scope changes.</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>3. Workmanship warranty</h2>
          <p>We offer a <strong>5-year workmanship warranty</strong> on every deck we build, beginning from the date of substantial completion. This warranty covers defects in our installation work — for example, fastener failure due to improper installation, framing not built to code, or structural sagging caused by our crew&rsquo;s error. Material defects are covered separately by the manufacturer&rsquo;s warranty (typically 10&ndash;25 years for composite and PVC products).</p>
          <p>The workmanship warranty does <em>not</em> cover normal wear and tear, weathering of natural wood, damage caused by misuse, modifications by other contractors, acts of God (wind, hail, flooding, ice), or failure to perform recommended maintenance (sealing, fastener checks, snow removal).</p>
          <p>No other warranty — express or implied — is provided beyond what is stated here and in any signed work order.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>4. Permits and compliance</h2>
          <p>When permits are required by the local municipality, we will obtain them on your behalf (cost included in your quote unless stated otherwise) and build to the applicable Ontario Building Code. Final inspection sign-off is the responsibility of the property owner; we will coordinate scheduling with the municipal inspector.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>5. Limitation of liability</h2>
          <p>To the maximum extent permitted by Ontario law, our liability for any claim arising from work performed is limited to the amount you paid us for the affected work. We are not liable for indirect, consequential, or punitive damages — including loss of use, loss of property value, or emotional distress — except where such limitations are prohibited by law.</p>
          <p>We carry general commercial liability insurance and WSIB coverage for the protection of our crew on your property. Certificates of insurance are available on request.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>6. Website content &amp; intellectual property</h2>
          <p>All text, images, graphics, logos, design elements, and the structure of this website are the property of London Deck Builder or our licensors and are protected under Canadian copyright law. You may not reproduce, republish, or distribute any portion of this site without our prior written permission, except that you may share links to individual pages and quote our content briefly with attribution.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>7. Third-party links</h2>
          <p>This website contains links to third-party websites (sister companies, manufacturers, government resources). We do not control the content of those sites and are not responsible for their accuracy or availability.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>8. Governing law</h2>
          <p>These Terms and any work order signed with us are governed by the laws of the <strong>Province of Ontario</strong> and the federal laws of Canada applicable therein. Disputes will be resolved in the courts of Ontario, with venue in Middlesex County.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>9. Changes to these Terms</h2>
          <p>We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above will reflect the most recent change. Continued use of the website after we update these Terms constitutes acceptance of the revised version.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>10. Contact</h2>
          <p>Questions about these Terms? Email <a href="mailto:service@masterdecker.com">service@masterdecker.com</a> or call <a href="tel:5199141663">(519) 914-1663</a>.</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
