// app/services/youtube/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.youtube;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "YouTubeが見れない・開かない？（障害か自分側か） | サイトダウン",
  description:
    "YouTubeが見れない・読み込めない・再生できない時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、ブラウザ、アプリ）かを最短で切り分け、すぐ試せる対処をまとめます。",
};

function ErrorLinks({ slugs }: { slugs: string[] }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {slugs.map((slug) => (
        <li key={slug} className="rounded-xl border border-neutral-200 px-4 py-3">
          <Link className="text-sm underline" href={`/errors/${slug}`}>
            /errors/{slug}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function YouTubeNotWorkingPage() {
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
          YouTubeが見れない・開かない・再生できない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          YouTubeの不具合は、YouTube側の障害だけでなく、回線、Wi-Fi、DNS、端末状態、ブラウザ、アプリ、拡張機能の影響でも起きます。
          最初に原因の方向を切り分けておくと、無駄な設定変更を減らしながら早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          見れない・再生できない・読み込めない・ログインできないなど、症状によって原因の切り分けが変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                YouTubeのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、自分側の可能性が高いです：{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネットにつながらない原因
              </Link>
            </li>
            <li>
              Wi-Fiではだめでモバイル通信では使えるなら、{" "}
              <Link className="underline" href="/troubleshooting/wifi-not-working">
                Wi-Fi
              </Link>
              、{" "}
              <Link className="underline" href="/troubleshooting/router-not-working">
                ルーター
              </Link>
              、{" "}
              <Link className="underline" href="/troubleshooting-dns">
                DNS
              </Link>{" "}
              を優先して確認します。
            </li>
            <li>
              YouTubeだけだめなら、障害またはブラウザ、アプリ、拡張機能、回線品質の問題が多いです。
            </li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、YouTubeは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。YouTube側で障害が起きているときは、端末設定やアプリをいろいろ触っても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            YouTubeのステータスを確認する
          </Link>
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.mainToolHref}
          >
            URL疎通チェック（メインツール）
          </Link>
        </div>

        <p className="text-xs text-neutral-500">
          先に障害を除外してから自分側の切り分けに進む方が、全体として早く原因にたどり着けます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 最短の切り分け（2分）</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">まずはこの3つだけ</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信）。片方で動くなら、回線、DNS、ルーター、VPNの可能性が高いです。
            </li>
            <li>
              <b>別の端末</b>で試す。同じ症状が続くなら障害や回線寄り、端末で差があるなら端末やアプリ寄りです。
            </li>
            <li>
              <b>シークレットモードや別ブラウザで試す</b>。これで動くなら、拡張機能、キャッシュ、Cookieが原因のことが多いです。
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
              インターネット全体が不安定な場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
              Wi-Fiが怪しい場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
              ブラウザだけ開かない場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
              端末だけつながらない場合
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) よくある原因</h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">YouTube側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログイン、再生、検索、コメント、ライブ配信などが不安定になることがあります。
              この場合は利用者側でいろいろ変えても改善しにくいため、まず状況確認が先です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              YouTubeだけ不安定、または一部だけ読み込みが止まる場合でも、実際はDNS解決や通信経路の問題で起きていることがあります。
              特にWi-Fiではだめでモバイル通信では使える場合は、この方向を先に疑う方が効率的です。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting-dns">
                DNSトラブル対処へ
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
                インターネット全体の切り分け
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
                Wi-Fiがつながらない原因
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/router-not-working">
                ルーターが原因か確認する
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ブラウザやアプリの問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              拡張機能、広告ブロック、プライバシー設定、壊れたキャッシュ、古いアプリが原因で再生や読み込みが失敗することがあります。
              特にブラウザだけだめ、アプリだけだめといった差がある場合は、この方向を疑いやすいです。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
                ブラウザ側の原因を確認する
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
                端末だけつながらない場合
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">回線品質の不足</h3>
            <p className="mt-2 text-sm text-neutral-700">
              YouTubeは開けても、動画再生だけ止まる、画質が極端に落ちる、バッファが続く場合は、単純な速度ではなく通信の安定性が足りていないことがあります。
              Wi-Fi干渉やルーター混雑でも起きやすいです。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリやブラウザを完全に閉じて、再起動してから再読み込みする。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPN、プロキシ、広告ブロックを一時的にOFFにする。</li>
          <li>シークレットモードや別ブラウザで試す。</li>
          <li>YouTubeのサイトデータ（Cookie、キャッシュ）を削除して再ログインする。</li>
          <li>アプリやブラウザを最新版に更新する。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「再生できない・途中で止まる」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>別回線で試して、回線やDNSの問題を除外します。</li>
            <li>別端末で試して、端末やアプリの問題を除外します。</li>
            <li>障害の可能性が高いときは、無理に繰り返さず少し待ちます。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「開けるが一部機能だけ使えない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>検索、再生、コメント、ログインなど、どの機能だけ不安定かを切り分けます。</li>
            <li>ブラウザ版とアプリ版の両方で試すと、どちら側の問題かを見分けやすくなります。</li>
            <li>Wi-Fiとモバイル通信の両方で試して、回線差が出るか確認します。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、Cloudflare系、または 502、503、504 などが出たら、下の解説ページを確認してください。
          YouTube自体の問題に見えても、実際は通信やブラウザ側の症状であることがあります。
        </p>

        <ErrorLinks slugs={issue.relatedErrorSlugs} />

        <div className="mt-4 text-sm">
          <Link className="underline" href="/status-codes">
            ステータスコード一覧 →
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">6) 公式情報</h2>
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
            {service.name}のトラブル一覧
          </Link>
          <Link className="text-sm underline" href={issue.statusPageHref}>
            {service.name}のステータスチェック
          </Link>
          <Link className="text-sm underline" href={issue.mainToolHref}>
            接続チェックツール
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
            インターネットにつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
            Wi-Fiがつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/router-not-working">
            ルーターがつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
            ブラウザでサイトが開かない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
            端末だけつながらない原因
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-dns">
            DNSトラブル対処
          </Link>
          <Link className="text-sm underline" href="/status-codes">
            ステータスコード一覧
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">よくある質問</h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">障害かどうかを確実に見分けるには？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ステータス確認をしたうえで、回線や端末を変えても状況がほぼ変わらないなら、障害の可能性が高いです。
              その場合は大きく触らず待つ方が近道です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">モバイル通信だと見れるのに、Wi-Fiだとだめなのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              自宅や職場の回線側にあるDNS、ルーター、VPN、プロキシの問題が濃厚です。まずは回線差を確認し、DNSやルーター側の切り分けを進めてください。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">403、429、5xx などが出たら？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              上のエラー解説ページに進んでください。意味と、試す価値のある対処だけを整理しています。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
