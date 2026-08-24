import Link from "next/link";
import { AdminBar } from "@/components/admin/AdminBar";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--surface-2)]">
      <header className="border-b bg-[var(--surface)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page flex items-center justify-between gap-4" style={{ minHeight: 64 }}>
          <Link href="/admin" className="flex items-center gap-2">
            <span
              className="grid place-items-center rounded-full text-white text-[12px] font-bold"
              style={{ width: 28, height: 28, background: "var(--ink)" }}
              aria-hidden="true"
            >
              OS
            </span>
            <span className="text-[15px] font-bold">Listing manager</span>
          </Link>
          <AdminBar />
        </div>
      </header>
      <main id="main" className="container-page py-8">{children}</main>
    </div>
  );
}
