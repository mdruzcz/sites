"use client";

import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client. Reads auth cookie, can listen to auth changes. */
export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
