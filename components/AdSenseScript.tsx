"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function AdSenseScript() {
  const pathname = usePathname();

  if (pathname === "/en") return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711217631458410"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
