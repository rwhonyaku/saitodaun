"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type RelatedItem = { href: string; label: string };

type Props = {
  /**
   * Slug part of the current error page path.
   * Example: "502-bad-gateway" for /errors/502-bad-gateway
   * Example: "err-connection-timed-out" for /errors/err-connection-timed-out
   */
  currentSlug: string;

  /**
   * Optional heading override. Default: "関連するエラー"
   */
  title?: string;

  className?: string;
};

const HUB_FALLBACK: RelatedItem[] = [
  { href: "/status-codes", label: "ステータスコード一覧（まとめ）" },
  { href: "/troubleshooting-dns", label: "DNSのトラブルシューティング" },
];

const GROUPS: Array<{
  slugs: string[];
  items: RelatedItem[];
}> = [
  // 5xx cluster
  {
    slugs: [
      "500-internal-server-error",
      "502-bad-gateway",
      "503-service-unavailable",
      "504-gateway-timeout",
    ],
    items: [
      { href: "/errors/500-internal-server-error", label: "500 Internal Server Error" },
      { href: "/errors/502-bad-gateway", label: "502 Bad Gateway" },
      { href: "/errors/503-service-unavailable", label: "503 Service Unavailable" },
      { href: "/errors/504-gateway-timeout", label: "504 Gateway Timeout" },
      { href: "/status-codes", label: "ステータスコード一覧へ →" },
    ],
  },

  // 4xx cluster (minimal but useful)
  {
    slugs: ["403-forbidden", "404-not-found", "429-too-many-requests"],
    items: [
      { href: "/errors/403-forbidden", label: "403 Forbidden" },
      { href: "/errors/404-not-found", label: "404 Not Found" },
      { href: "/errors/429-too-many-requests", label: "429 Too Many Requests" },
      { href: "/status-codes", label: "ステータスコード一覧へ →" },
    ],
  },

  // Connection / network error cluster (no HTTP code)
  {
    slugs: [
      "ssl-handshake-failed",
      "err-connection-refused",
      "err-connection-timed-out",
      "connection-reset",
    ],
    items: [
      { href: "/troubleshooting-dns", label: "DNS（名前解決）トラブル" },
      { href: "/errors/ssl-handshake-failed", label: "SSL/TLS ハンドシェイク失敗" },
      { href: "/errors/err-connection-refused", label: "接続が拒否されました（Connection Refused）" },
      { href: "/errors/err-connection-timed-out", label: "接続がタイムアウトしました（Timed Out）" },
      { href: "/errors/connection-reset", label: "接続がリセットされました（Connection Reset）" },
      { href: "/status-codes", label: "ステータスコード一覧へ →" },
    ],
  },
];

export function ErrorRelatedLinks({
  currentSlug,
  title = "関連するエラー",
  className = "",
}: Props) {
  const items = useMemo(() => {
    const slug = (currentSlug || "").trim();
    if (!slug) return HUB_FALLBACK;

    const group = GROUPS.find((g) => g.slugs.includes(slug));
    if (!group) return HUB_FALLBACK;

    // Remove self-link if present
    return group.items.filter((it) => it.href !== `/errors/${slug}`);
  }, [currentSlug]);

  return (
    <section
      className={`mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
      aria-label={title}
    >
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
        {title}
      </h2>

      <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              prefetch={false}
              className="block rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-100 transition-colors font-medium"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ErrorRelatedLinks;
