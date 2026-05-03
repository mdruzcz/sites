import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-stone-50/40">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-serif text-base">SEA Admin</Link>
            {user && (
              <nav className="flex items-center gap-5 text-sm text-stone-700">
                <Link href="/admin" className="hover:text-stone-900">Dashboard</Link>
                <Link href="/admin/winners" className="hover:text-stone-900">Winners</Link>
                <Link href="/admin/winners/new" className="hover:text-stone-900">+ New winner</Link>
                <Link href="/admin/nominations" className="hover:text-stone-900">Nominations</Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-stone-600">
            {user ? (
              <>
                <span className="hidden md:inline">{user.email}</span>
                <form action="/admin/signout" method="post">
                  <button className="rounded-md border border-stone-200 px-3 py-1.5 text-xs hover:bg-stone-100">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/admin/login" className="text-xs">Sign in</Link>
            )}
            <Link href="/" className="text-xs text-stone-500 hover:text-stone-900">View site →</Link>
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
