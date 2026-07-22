"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// `onlyStore` limits a section to a specific active store slug (e.g. the
// Ready Kitchens module only makes sense under the Ready Kitchens store).
// `hideForStores` hides a section when one of those slugs is active (the ecom
// catalog/commerce sections are meaningless for quote-only stores).
const READY_KITCHENS_SLUG = "ready-kitchens";
const RTA_CABINETS_SLUG = "rta-cabinets-canada";
const QUOTE_ONLY_SLUGS = [READY_KITCHENS_SLUG, RTA_CABINETS_SLUG];

const NAV: Array<{
  section: string;
  onlyStore?: string;
  hideForStores?: string[];
  items: { href: string; label: string; storeScoped?: boolean }[];
}> = [
  {
    section: "Catalog",
    hideForStores: QUOTE_ONLY_SLUGS,
    items: [
      { href: "/products", label: "Products", storeScoped: true },
      { href: "/categories", label: "Categories", storeScoped: true },
      { href: "/inventory", label: "Inventory", storeScoped: true },
      { href: "/discounts", label: "Discounts", storeScoped: true }
    ]
  },
  {
    section: "Commerce",
    hideForStores: QUOTE_ONLY_SLUGS,
    items: [
      { href: "/orders", label: "Orders", storeScoped: true },
      { href: "/contact-messages", label: "Contact Messages", storeScoped: true },
      { href: "/customers", label: "Customers" },
      { href: "/applications", label: "B2B Applications" }
    ]
  },
  {
    section: "Forever Cabinets",
    onlyStore: "forevercabinets",
    items: [{ href: "/forever-cabinets/quote-requests", label: "Quote Requests" }]
  },
  {
    section: "Ready Kitchens",
    onlyStore: READY_KITCHENS_SLUG,
    items: [
      { href: "/ready-kitchens/kits", label: "Kit Packages" },
      { href: "/ready-kitchens/cabinets", label: "Cabinet Catalog" },
      { href: "/ready-kitchens/quote-requests", label: "Quote Requests" },
      { href: "/ready-kitchens/contact-messages", label: "Contact Messages" }
    ]
  },
  {
    section: "RTA Cabinets",
    onlyStore: RTA_CABINETS_SLUG,
    items: [{ href: "/rta-cabinets/quote-requests", label: "Quote Requests" }]
  },
  {
    section: "Operations",
    items: [
      { href: "/stores", label: "Stores" },
      { href: "/settings", label: "Settings" }
    ]
  }
];

export function Sidebar({
  activeStoreName,
  activeStoreSlug
}: {
  activeStoreName: string | null;
  activeStoreSlug: string | null;
}) {
  const pathname = usePathname();

  const sections = NAV.filter((section) => {
    if (section.onlyStore && activeStoreSlug !== section.onlyStore) return false;
    if (section.hideForStores && activeStoreSlug && section.hideForStores.includes(activeStoreSlug)) return false;
    return true;
  });

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="border-b border-slate-200 px-4 py-3">
        <Link href="/dashboard" className="flex flex-col">
          <span className="text-sm font-semibold">Master Decker</span>
          <span className="text-xs text-slate-500">Admin · {activeStoreName ?? "—"}</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3 text-sm scrollbar-thin">
        <Link
          href="/dashboard"
          className={cn(
            "block rounded-md px-3 py-2 hover:bg-slate-100",
            pathname === "/dashboard" && "bg-slate-100 font-medium"
          )}
        >
          Dashboard
        </Link>
        {sections.map((section) => (
          <div key={section.section} className="mt-4">
            <div className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              {section.section}
            </div>
            {section.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 hover:bg-slate-100",
                    active && "bg-slate-100 font-medium"
                  )}
                >
                  <span>{item.label}</span>
                  {item.storeScoped && (
                    <span className="text-[10px] uppercase tracking-wide text-slate-400">store</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <form action="/auth/signout" method="post" className="border-t border-slate-200 p-3">
        <button
          type="submit"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
