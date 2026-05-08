import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.notion;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Notionが使えないときの切り分け | サイトダウン",
  description:
    "Notionが広く落ちていないのに使えない時に、読み込み、ログイン、同期、表示不良、アプリやブラウザ、ネットワーク制限の原因を切り分けるためのページです。",
};

const ERROR_LABELS: Record<string, string> = {
  "err-connection-timed-out": "接続がタイムアウトするとき",
  "err-connection-reset": "接続が途中でリセットされるとき",
  "dns-probe-finished-nxdomain": "DNS で接続先が見つからないとき",
  "ssl-handshake-failed": "SSL / TLS の接続に失敗するとき",
  "503-service-unavailable": "503 Service Unavailable が出るとき",
  "504-gateway-timeout": "504 Gateway Timeout が出るとき",
};

function ErrorLinks({ slugs }: { slugs: string[] }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {slugs.map((slug) => (
        <li key={slug} className="rounded-xl border border-neutral-200 px-4 py-3">
          <Link className="text-sm underline" href={`/errors/${slug}`}>
            {ERROR_LABELS[slug] ?? "関連エラーの解説"}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NotionNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm text-neutral-500">
          <Link className="underline" href="/services">
            サービス別トラブル
          </Link>{" "}
          /{" "}
          <Link className="underline" href={service.hubHref}>
            {service.name}
          </Link>{" "}
          / 不具合
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">
          Notionが開かない・重い・ログインできない？（自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Notion が広く落ちていないのに使えない場合、ページ読み込み・ログイン・同期・表示・アプリ・ネットワークのどこで問題が起きているかを分けると原因にたどり着きやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          開かない・重い・ログインできない・同期できないなど、症状によって原因の切り分けが変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold">最初に分けること</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず広く落ちていないか確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Notionのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネットにつながらない原因
              </Link>{" "}
              を優先
            </li>
            <li>Notionだけ重い・開かないなら、このページで自分側の不具合を切り分ける</li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 最短の切り分け</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Web版とアプリ版の両方で同じ症状か確認する</li>
            <li>別端末や別ブラウザで同じか確認する</li>
            <li>Wi-Fi とモバイル通信を切り替えて差が出るか確認する</li>
            <li>ログインし直す前に、公式ステータスで広い障害が出ていないか確認する</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
              ブラウザだけ開かない場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
              インターネット全体が不安定な場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting-dns">
              DNS が怪しい場合
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 自分側で見たい5つの不具合</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>ページが開かない / 読み込みが遅い</li>
            <li>ログイン・同期の問題</li>
            <li>データが表示されない / 消えたように見える</li>
            <li>アプリ / ブラウザの不具合</li>
            <li>ネットワーク・制限</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) よくある原因</h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ページが開かない / 読み込みが遅い</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ワークスペース自体は生きていても、ページ読み込みや検索だけが重いことがあります。まずは Web 版とアプリ版で差があるかを見ます。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ログイン・同期の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログインできない、認証後に戻る、同期が止まる場合は、セッション不整合や同期遅延が残っている可能性があります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">データが表示されない / 消えたように見える</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ページは開くのに一部ブロックやデータベースだけ見えない場合は、同期遅延、読み込み失敗、権限やフィルター条件も切り分け候補になります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">アプリ / ブラウザの不具合</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリだけ固まる、ブラウザだけ白画面になる場合は、キャッシュや拡張機能、アプリ更新不足の影響が出ていることがあります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ネットワーク・制限</h3>
            <p className="mt-2 text-sm text-neutral-700">
              社内ネットワーク、学校、VPN、プロキシ、DNS 変更の影響で Notion だけ開きにくくなることがあります。別回線で差が出るならこの方向を優先します。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting/site-blocked-by-firewall">
                ネットワーク制限が疑わしい場合
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
                Wi-Fi が不安定な場合
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
                端末だけつながらない場合
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 503 / 504 などが出たら、下の解説ページを確認してください。
          Notion の問題に見えても、実際は通信やブラウザ側の症状であることがあります。
        </p>

        <ErrorLinks slugs={issue.relatedErrorSlugs} />
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 公式情報</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          {issue.officialSources.map((s) => (
            <li key={s.href}>
              <a className="underline" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">関連リンク（サイト内）</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link className="text-sm underline" href={service.hubHref}>
            Notion のトラブル一覧
          </Link>
          <Link className="text-sm underline" href={issue.statusPageHref}>
            Notionのステータスチェック
          </Link>
          <Link className="text-sm underline" href={issue.mainToolHref}>
            接続チェックツール
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
            ブラウザでサイトが開かない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
            インターネットにつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-dns">
            DNSトラブル対処
          </Link>
        </div>
      </section>
    </main>
  );
}
