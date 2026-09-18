"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

/**
 * Cloudflare Turnstile for the nomination form. The widget injects a hidden
 * `cf-turnstile-response` input into the surrounding <form>, which the
 * server action verifies through the shared Worker. Mounts when scrolled
 * into view; if no token arrives within 15s the submit button is enabled
 * anyway so a stalled challenge never dead-ends a real nominator.
 */
export function NominateCaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(!siteKey);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || ready) return;
    const t = setTimeout(() => setReady(true), 15000);
    return () => clearTimeout(t);
  }, [visible, ready]);

  useEffect(() => {
    const btn = ref.current?.closest("form")?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) btn.disabled = !ready;
  }, [ready]);

  return (
    <div ref={ref} className="min-h-[65px]">
      {siteKey && visible && <Turnstile siteKey={siteKey} options={{ theme: "light", size: "flexible" }} onSuccess={() => setReady(true)} onExpire={() => setReady(false)} />}
    </div>
  );
}
