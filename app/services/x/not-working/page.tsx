// app/services/x/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";
import IMobileAd from "@/components/ads/IMobileAd";

const service = SERVICES.x;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "X（旧Twitter）が使えないときの切り分け | サイトダウン",
  description:
    "X（旧Twitter）が広く落ちていないのに使えないときに、回線、DNS、端末、ブラウザ、アプリ、ログイン状態など自分側の原因を切り分けるためのページです。",
};

const ERROR_LABELS: Record<string, string> = {
  "err-connection-timed-out": "接続がタイムアウトするとき",
  "err-connection-reset": "接続が途中でリセットされるとき",
  "dns-probe-finished-nxdomain": "DNS で接続先が見つからないとき",
  "ssl-handshake-failed": "SSL / TLS の接続に失敗するとき",
  "503-service-unavailable": "503 Service Unavailable が出るとき",
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

export default function XNotWorkingPage() {
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
          X（旧Twitter）が開かない・読み込めない・ログインできない？（自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          X（旧Twitter）が広く落ちていないのに使えないときは、回線、Wi-Fi、DNS、端末、ブラウザ、アプリ、ログイン状態など自分側の条件を切り分ける方が早いです。
          まず全体障害を除外したうえで、このページでは「自分だけかもしれない」不具合を整理します。
        </p>
        <p className="text-sm text-neutral-700">
          見れない・投稿できない・ログインできない・通知が来ないなど、症状によって原因の切り分けが変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold">最初に分けること</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず広く落ちていないか確認：
              {" "}
              <Link className="underline" href={issue.statusPageHref}>
                X（旧Twitter）のステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、
              {" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネットにつながらない原因
              </Link>
              {" "}
              を優先
            </li>
            <li>X（旧Twitter）だけ使いにくいなら、このページで自分側の不具合を切り分ける</li>
          </ol>
        </div>
      </header>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、X（旧Twitter）は広く落ちている？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。広く落ちているなら、端末やブラウザの設定を触っても改善しないことが多いです。
          逆に広く落ちていないなら、この先の切り分けが有効です。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            X（旧Twitter）のステータスを確認する
          </Link>
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.mainToolHref}
          >
            URL疎通チェック（メインツール）
          </Link>
        </div>

        <p className="text-xs text-neutral-500">
          広く落ちていないことを確認してから自分側の切り分けに進む方が、無駄が少なくなります。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 自分側で見たい4つの不具合</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>アプリだけ不具合</li>
            <li>ログインできない</li>
            <li>一部機能だけ使えない</li>
            <li>通信環境や端末の問題</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) 最短の切り分け</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Wi-Fi とモバイル通信を切り替えて差が出るか確認する</li>
            <li>別端末で同じ症状か確認する</li>
            <li>ブラウザ版とアプリ版の両方で試す</li>
            <li>シークレットモードや別ブラウザで試して、Cookie や拡張機能の影響を外す</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
              インターネット全体が不安定な場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
              ブラウザだけ開かない場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting-dns">
              DNS が怪しい場合
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) よくある原因</h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">アプリだけ不具合</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリだけ落ちる、更新後から開きにくい、タイムラインだけ止まる場合は、アプリ再起動や更新不足、端末側のキャッシュ不整合を疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ログインできない</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログイン画面がループする、認証後に戻る、セッションが続かない場合は、Cookie やログイン状態の不整合を優先して見ます。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">一部機能だけ使えない</h3>
            <p className="mt-2 text-sm text-neutral-700">
              タイムラインは見えるのに投稿、通知、DM、メディアだけ不安定なら、X（旧Twitter）側の部分不具合か、機能ごとの通信失敗を疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">通信環境や端末の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Wi-Fi ではだめでモバイル通信では使える、端末を変えると改善する場合は、回線、DNS、ルーター、VPN、端末側の条件が原因のことが多いです。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
                Wi-Fi がつながらない原因
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/router-not-working">
                ルーターが原因か確認する
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
                端末だけつながらない場合
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリやブラウザを完全に閉じて再起動する</li>
          <li>Wi-Fi とモバイル通信を切り替える</li>
          <li>シークレットモードや別ブラウザで試す</li>
          <li>X の Cookie / キャッシュを削除して再ログインする</li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">6) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 503 などが出たら、下の解説ページを確認してください。
          X（旧Twitter）の問題に見えても、実際は通信やブラウザ側の症状であることがあります。
        </p>

        <ErrorLinks slugs={issue.relatedErrorSlugs} />
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">7) 公式情報</h2>
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
            X のトラブル一覧
          </Link>
          <Link className="text-sm underline" href={issue.statusPageHref}>
            X（旧Twitter）のステータスチェック
          </Link>
          <Link className="text-sm underline" href={issue.mainToolHref}>
            接続チェックツール
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
            インターネットにつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
            ブラウザでサイトが開かない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-dns">
            DNSトラブル対処
          </Link>
        </div>
      </section>
    </main>
  );
}
