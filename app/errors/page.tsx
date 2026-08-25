import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

const ERROR_GROUPS = [
  {
    title: "HTTP 4xx：リクエスト・権限・アクセス制限",
    guides: [
      ["401-unauthorized", "401 Unauthorized"],
      ["403-forbidden", "403 Forbidden"],
      ["404-not-found", "404 Not Found"],
      ["408-request-timeout", "408 Request Timeout"],
      ["429-too-many-requests", "429 Too Many Requests"],
    ],
  },
  {
    title: "HTTP 5xx：サーバー・上流サービス",
    guides: [
      ["500-internal-server-error", "500 Internal Server Error"],
      ["502-bad-gateway", "502 Bad Gateway"],
      ["503-service-unavailable", "503 Service Unavailable"],
      ["504-gateway-timeout", "504 Gateway Timeout"],
    ],
  },
  {
    title: "Cloudflare：オリジンサーバーとの通信",
    guides: [
      ["cloudflare-520", "520 Unknown Error"],
      ["cloudflare-521", "521 Web Server Is Down"],
      ["cloudflare-522", "522 Connection Timed Out"],
      ["cloudflare-523", "523 Origin Is Unreachable"],
      ["cloudflare-524", "524 A Timeout Occurred"],
      ["cloudflare-526", "526 Invalid SSL Certificate"],
    ],
  },
  {
    title: "接続・ネットワーク：ブラウザにコードが出る",
    guides: [
      ["connection-reset", "ERR_CONNECTION_RESET"],
      ["err-connection-refused", "ERR_CONNECTION_REFUSED"],
      ["err-connection-timed-out", "ERR_CONNECTION_TIMED_OUT"],
      ["err-address-unreachable", "ERR_ADDRESS_UNREACHABLE"],
      ["err-empty-response", "ERR_EMPTY_RESPONSE"],
      ["err-internet-disconnected", "ERR_INTERNET_DISCONNECTED"],
      ["err-network-changed", "ERR_NETWORK_CHANGED"],
      ["err-tunnel-connection-failed", "ERR_TUNNEL_CONNECTION_FAILED"],
      ["err-too-many-redirects", "ERR_TOO_MANY_REDIRECTS"],
    ],
  },
  {
    title: "DNS・SSL・証明書：名前解決や安全な接続",
    guides: [
      ["dns-probe-finished-nxdomain", "DNS_PROBE_FINISHED_NXDOMAIN"],
      ["err-name-not-resolved", "ERR_NAME_NOT_RESOLVED"],
      ["ssl-handshake-failed", "SSL Handshake Failed"],
      ["err-ssl-protocol-error", "ERR_SSL_PROTOCOL_ERROR"],
      ["err-cert-date-invalid", "ERR_CERT_DATE_INVALID"],
      ["net-err-cert-common-name-invalid", "NET::ERR_CERT_COMMON_NAME_INVALID"],
      ["your-connection-is-not-private", "この接続ではプライバシーが保護されません"],
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "HTTP・ブラウザ接続エラー解説一覧",
  description: `${SITE.name}のエラー解説一覧です。表示されたHTTPコード、Cloudflare番号、ブラウザの接続・DNS・SSLエラーから原因と対処を確認できます。`,
  alternates: { canonical: "/errors" },
};

export default function ErrorsHubPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 text-slate-900">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">HTTP・ブラウザ接続エラー解説</h1>
        <p className="text-base text-neutral-600">
          画面に表示された番号やエラー名を選んでください。コードが分からない場合は、まず接続チェックでHTTP応答の有無を確認できます。
        </p>
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-sky-600 px-5 text-sm font-bold text-white hover:bg-sky-700">
          URLを入力して接続チェック
        </Link>
      </header>

      <div className="mt-10 space-y-10">
        {ERROR_GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-bold">{group.title}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.guides.map(([slug, label]) => (
                <Link key={slug} href={`/errors/${slug}`} className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
                  <span className="break-words text-sm font-semibold">{label}</span>
                  <span aria-hidden="true" className="text-sky-600">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">コードが表示されていない場合</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/troubleshooting/specific-site-not-working">特定サイトだけ開かない</Link>
          <Link className="underline" href="/troubleshooting-dns">DNSトラブルを確認</Link>
          <Link className="underline" href="/troubleshooting-guide">症状から確認方法を探す</Link>
        </div>
      </section>
    </main>
  );
}
