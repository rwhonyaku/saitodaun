import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

const ERROR_GUIDES = [
  { href: "/errors/403-forbidden", label: "403 Forbidden" },
  { href: "/errors/404-not-found", label: "404 Not Found" },
  { href: "/errors/429-too-many-requests", label: "429 Too Many Requests" },
  { href: "/errors/500-internal-server-error", label: "500 Internal Server Error" },
  { href: "/errors/502-bad-gateway", label: "502 Bad Gateway" },
  { href: "/errors/503-service-unavailable", label: "503 Service Unavailable" },
  { href: "/errors/504-gateway-timeout", label: "504 Gateway Timeout" },
  { href: "/errors/err-connection-refused", label: "ERR_CONNECTION_REFUSED" },
  { href: "/errors/err-connection-timed-out", label: "ERR_CONNECTION_TIMED_OUT" },
  { href: "/errors/connection-reset", label: "Connection Reset" },
  { href: "/errors/dns-probe-finished-nxdomain", label: "DNS_PROBE_FINISHED_NXDOMAIN" },
  { href: "/errors/ssl-handshake-failed", label: "SSL Handshake Failed" },
  { href: "/errors/cloudflare-520", label: "Cloudflare 520" },
  { href: "/errors/cloudflare-522", label: "Cloudflare 522" },
  { href: "/errors/cloudflare-524", label: "Cloudflare 524" },
];

export const metadata: Metadata = {
  title: "HTTP・接続エラー解説 | サイトダウン",
  description: `${SITE.name}のエラー解説一覧です。HTTPステータスコードやDNS、SSL、接続エラーの原因と対処の入り口をまとめて確認できます。`,
  alternates: { canonical: "/errors" },
};

export default function ErrorsHubPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          HTTP・接続エラー解説
        </h1>
        <p className="text-base text-neutral-600">
          HTTPステータスコード、DNS、SSL、Cloudflare、接続エラーなど、
          表示されたメッセージから原因と対処の入り口を探すためのハブページです。
        </p>
      </header>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ERROR_GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-neutral-200 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{guide.label}</h2>
                <span className="text-sm text-neutral-500">見る</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">関連ページ</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="text-sm underline" href="/status-codes">
            ステータスコード一覧
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-dns">
            DNSトラブル対処
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-guide">
            トラブルシューティングガイド
          </Link>
        </div>
      </section>
    </main>
  );
}
