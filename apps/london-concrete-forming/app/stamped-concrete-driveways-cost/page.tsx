import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Stamped Concrete Driveways Cost Guide | London Concrete Forming",
  description: "How much does a stamped concrete driveway cost in London, Ontario? Full pricing breakdown by size, pattern, and colour. Free quotes from LCF.",
  openGraph: { title: "Stamped Concrete Driveways Cost Guide", description: "Complete pricing guide for stamped concrete driveways in London, Ontario." },
};
export default function StampedCostPage() {
  return (
    <>
      <section className="bg-[#1a2332] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Stamped Concrete Driveways Cost</h1>
          <p className="text-slate-300 text-xl">Complete pricing guide for London, Ontario homeowners</p>
        </div>
      </section>
      <article className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">Stamped concrete driveways add incredible curb appeal to any home. Here is everything you need to know about the cost of stamped concrete driveways in London, Ontario.</p>
          <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Average Cost Per Square Foot</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-[#1a2332] text-white"><th className="p-3 text-left">Finish Type</th><th className="p-3 text-left">Cost Per Sq.Ft.</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Standard Broom Finish</td><td className="p-3 font-bold text-[#F7931E]">$10-$16</td></tr>
                <tr className="border-b bg-slate-50"><td className="p-3">Basic Stamped Pattern</td><td className="p-3 font-bold text-[#F7931E]">$15-$20</td></tr>
                <tr className="border-b"><td className="p-3">Stamped + Single Colour</td><td className="p-3 font-bold text-[#F7931E]">$18-$25</td></tr>
                <tr className="border-b bg-slate-50"><td className="p-3">Complex Multi-Pattern</td><td className="p-3 font-bold text-[#F7931E]">$22-$35+</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1a2332] mt-8 mb-4">Factors That Affect Cost</h2>
          <ul className="text-slate-600 leading-relaxed mb-6 list-disc list-inside space-y-2">
            <li>Driveway size (larger driveways have lower per sq.ft. cost)</li>
            <li>Pattern complexity</li>
            <li>Number of colours</li>
            <li>Site preparation required</li>
            <li>Existing concrete removal</li>
          </ul>
          <div className="mt-8 bg-[#1a2332] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Get Your Stamped Concrete Quote</h2>
            <p className="text-slate-300 mb-5">Contact London Concrete Forming for an accurate, detailed quote.</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
