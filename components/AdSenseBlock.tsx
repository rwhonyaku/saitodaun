"use client";

import { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-2711217631458410";
const AD_SLOT = "1867811511";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdSenseBlock() {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const el = insRef.current as any;
    if (!el) return;

    // Prevent double-push from Strict Mode / HMR re-mounts
    if (pushedRef.current) return;

    // If AdSense already filled this <ins>, don’t push again
    const status = el.getAttribute("data-adsbygoogle-status");
    if (status === "done") return;

    pushedRef.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Don’t break the app if ads fail (dev + blockers)
    }
  }, []);

  return (
    <ins
      ref={insRef as any}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
