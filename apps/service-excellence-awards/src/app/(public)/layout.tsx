import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getWinnerIndex, type WinnerIndex } from "@/lib/search-index";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // The header lookup needs the winner index; a DB hiccup must not take the whole site down.
  let index: WinnerIndex | null = null;
  try {
    index = await getWinnerIndex();
  } catch (e) {
    console.error("[layout] winner index unavailable:", e);
  }
  return (
    <>
      <SiteHeader index={index} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
