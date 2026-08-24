import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

/**
 * The root 404 sits outside the (site) group, so it renders the public chrome
 * itself rather than inheriting it.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container-page py-24 text-center">
        <span
          className="mx-auto grid place-items-center rounded-full"
          style={{ width: 64, height: 64, background: "var(--surface-2)", color: "var(--muted)" }}
          aria-hidden="true"
        >
          <Icon name="search" size={28} />
        </span>
        <h1 className="mt-6 text-[30px] sm:text-[38px] font-extrabold tracking-tight">
          We could not find that page
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[16px] text-[var(--muted)]">
          The listing may have been taken for the season, or the link may be out of date. The current
          list is always on the rentals page.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/rentals" className="btn btn-primary">
            Browse Off-Season Stays
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Tell us what you need
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
