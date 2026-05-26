import { StoreSwitcher } from "@/components/store-switcher";
import { RefreshStorefront } from "@/components/refresh-storefront";
import { getActiveStore, getAllStores } from "@/lib/store-context";

export async function Topbar() {
  const [active, stores] = await Promise.all([getActiveStore(), getAllStores()]);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">{active?.name ?? "No active store"}</h2>
        {active && (
          <a
            href={`https://${active.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-500 hover:text-blue-600 hover:underline"
          >
            {active.domain} ↗
          </a>
        )}
      </div>
      <div className="flex items-center gap-2">
        {active && <RefreshStorefront storeId={active.id} storeName={active.name} />}
        <StoreSwitcher active={active} stores={stores} />
      </div>
    </header>
  );
}
