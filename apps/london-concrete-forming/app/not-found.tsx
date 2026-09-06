import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found. Return to London Concrete Forming homepage.",
};

export default function NotFound() {
  return (
    <section className="section bg-[#f8fafc] flex items-center min-h-[50vh]">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-extrabold text-[#F7931E] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#333333] mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">The page you are looking for does not exist. It may have been moved or removed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary text-base">Go Home</Link>
          <Link href="/contact-us" className="btn btn-outline text-base">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}