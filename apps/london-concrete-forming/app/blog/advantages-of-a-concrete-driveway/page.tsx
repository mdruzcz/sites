import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Advantages of a Concrete Driveway",
  description: "Discover the top advantages of choosing a concrete driveway over asphalt or gravel in London, Ontario. Durability, low maintenance, and curb appeal.",
  openGraph: { title: "Advantages of a Concrete Driveway", description: "Why concrete driveways are the smart choice for London, Ontario homeowners." },
};
export default function AdvantagesPage() {
  return (
    <>
      <section className="bg-[#333333] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Advantages of a Concrete Driveway</h1>
          <p className="text-slate-300 text-xl">Why London homeowners choose concrete over asphalt or gravel</p>
        </div>
      </section>
      <article className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">When it comes to choosing a driveway material for your London, Ontario home, concrete stands out as the clear winner for most homeowners.</p>
          <h2 className="text-2xl font-extrabold text-[#333333] mt-8 mb-4">1. Exceptional Durability</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Concrete driveways last 30-50 years with minimal maintenance versus 15-20 years for asphalt. Concrete handles heavy vehicle loads without deforming and resists cracking far better in Ontario freeze-thaw conditions.</p>
          <h2 className="text-2xl font-extrabold text-[#333333] mt-8 mb-4">2. Low Maintenance</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Unlike asphalt, concrete does not require annual sealing. Simply keep it clean with occasional washing and your driveway will look great for decades.</p>
          <h2 className="text-2xl font-extrabold text-[#333333] mt-8 mb-4">3. Better Curb Appeal</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Concrete can be stamped, coloured, and finished in countless ways to enhance your home exterior and boost property value.</p>
          <h2 className="text-2xl font-extrabold text-[#333333] mt-8 mb-4">4. Handles Ontario Winters</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Air-entrained concrete resists scaling from road salt and handles freeze-thaw cycles beautifully when properly installed.</p>
          <h2 className="text-2xl font-extrabold text-[#333333] mt-8 mb-4">5. Better Return on Investment</h2>
          <p className="text-slate-600 leading-relaxed mb-6">While concrete costs more upfront ($10-$16/sq.ft. vs $5-$10/sq.ft.), the 30-50 year lifespan makes it far more cost-effective long-term.</p>
          <div className="mt-8 bg-[#333333] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Install a Concrete Driveway?</h2>
            <p className="text-slate-300 mb-5">Get a free quote from London Concrete Forming.</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
