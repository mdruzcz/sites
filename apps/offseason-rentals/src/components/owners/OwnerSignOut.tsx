"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OwnerSignOut() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-quiet btn-sm"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/owners/logout", { method: "POST" });
        router.replace("/owners/login");
        router.refresh();
      }}
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
