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
  // Cloudflare origin error cluster
  {
    slugs: [
      "cloudflare-520",
      "cloudflare-521",
      "cloudflare-522",
      "cloudflare-523",
      "cloudflare-524",
      "cloudflare-526",
    ],
    items: [
      { href: "/errors/cloudflare-520", label: "520：オリジンから想定外の応答" },
      { href: "/errors/cloudflare-521", label: "521：オリジンが接続を拒否" },
      { href: "/errors/cloudflare-522", label: "522：オリジンへの接続がタイムアウト" },
      { href: "/errors/cloudflare-523", label: "523：オリジンへ到達できない" },
      { href: "/errors/cloudflare-524", label: "524：接続後の応答待ちがタイムアウト" },
      { href: "/errors/cloudflare-526", label: "526：オリジンのSSL証明書が無効" },
      { href: "/errors/err-connection-timed-out", label: "ブラウザの接続タイムアウト" },
      { href: "/errors", label: "エラー解説一覧へ →" },
    ],
  },

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
    slugs: [
      "401-unauthorized",
      "403-forbidden",
      "404-not-found",
      "408-request-timeout",
      "429-too-many-requests",
    ],
    items: [
      { href: "/errors/401-unauthorized", label: "401 Unauthorized" },
      { href: "/errors/403-forbidden", label: "403 Forbidden" },
      { href: "/errors/404-not-found", label: "404 Not Found" },
      { href: "/errors/408-request-timeout", label: "408 Request Timeout" },
      { href: "/errors/429-too-many-requests", label: "429 Too Many Requests" },
      { href: "/status-codes", label: "ステータスコード一覧へ →" },
    ],
  },

  // Connection / network error cluster (no HTTP code)
  {
    slugs: [
      "err-connection-refused",
      "err-connection-timed-out",
      "connection-reset",
      "err-address-unreachable",
      "err-empty-response",
      "err-internet-disconnected",
      "err-name-not-resolved",
      "err-network-changed",
      "err-tunnel-connection-failed",
    ],
    items: [
      { href: "/troubleshooting-dns", label: "DNS（名前解決）トラブル" },
      { href: "/errors/ssl-handshake-failed", label: "SSL/TLS ハンドシェイク失敗" },
      { href: "/errors/err-connection-refused", label: "接続が拒否されました（Connection Refused）" },
      { href: "/errors/err-connection-timed-out", label: "接続がタイムアウトしました（Timed Out）" },
      { href: "/errors/connection-reset", label: "接続がリセットされました（Connection Reset）" },
      { href: "/errors/err-empty-response", label: "応答データがありません（Empty Response）" },
      { href: "/errors/err-network-changed", label: "接続中にネットワークが変わりました" },
      { href: "/status-codes", label: "ステータスコード一覧へ →" },
    ],
  },

  // SSL / certificate error cluster
  {
    slugs: [
      "ssl-handshake-failed",
      "err-ssl-protocol-error",
      "err-cert-date-invalid",
      "net-err-cert-common-name-invalid",
      "your-connection-is-not-private",
    ],
    items: [
      { href: "/errors/ssl-handshake-failed", label: "SSL/TLS ハンドシェイク失敗" },
      { href: "/errors/err-ssl-protocol-error", label: "ERR_SSL_PROTOCOL_ERROR" },
      { href: "/errors/err-cert-date-invalid", label: "証明書の有効期限・端末時刻エラー" },
      { href: "/errors/net-err-cert-common-name-invalid", label: "証明書とドメイン名の不一致" },
      { href: "/errors/your-connection-is-not-private", label: "この接続ではプライバシーが保護されません" },
      { href: "/errors", label: "エラー解説一覧へ →" },
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
