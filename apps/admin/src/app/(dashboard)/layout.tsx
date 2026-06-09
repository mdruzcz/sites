import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { getActiveStore } from "@/lib/store-context";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const active = await getActiveStore();

  return (
    <div className="flex min-h-screen">
      <Sidebar activeStoreName={active?.name ?? null} activeStoreSlug={active?.slug ?? null} />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
