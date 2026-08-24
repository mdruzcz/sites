"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminBar() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/admin/review" className="btn btn-quiet btn-sm">
        Owner queue
      </Link>
      <Link href="/" className="btn btn-quiet btn-sm" target="_blank" rel="noreferrer">
        View site
      </Link>
      <button type="button" onClick={signOut} className="btn btn-quiet btn-sm" disabled={busy}>
        {busy ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
