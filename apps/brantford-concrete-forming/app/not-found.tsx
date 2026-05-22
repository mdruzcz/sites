import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section bg-white flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="container-custom max-w-xl">
        <div className="text-8xl font-extrabold text-[#E8751A] mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-[#1a2332] mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary text-base">Go to Homepage</Link>
          <a href={site.phoneHref} className="btn btn-outline text-base">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
