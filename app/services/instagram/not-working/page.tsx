// app/services/instagram/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.instagram;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Instagramが読み込めない？（障害か自分側か） | サイトダウン",
  description:
    "Instagram（インスタ）が読み込めない・表示されない・ログインできない時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、アプリ）かを最短で切り分け、すぐ試せる対処をまとめます。",
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

export default function InstagramNotWorkingPage() {
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
          Instagramが読み込めない・表示されない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Instagramの不具合は、障害だけでなく、回線、Wi-Fi、DNS、アプリ状態、キャッシュ、権限、アカウント周りでも起きます。
          最初に問題の方向を切り分けておくと、無駄な再設定を減らしながら早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          見れない・表示されない・投稿できない・ログインできないなど、症状によって原因の切り分けが変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Instagramのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、自分側の可能性が高いです：{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネットにつながらない原因
              </Link>
            </li>
            <li>
              Wi-Fiではだめでモバイル通信では見られるなら、{" "}
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
              Instagramだけだめなら、アプリ、キャッシュ、権限、端末、アカウント周りの問題が多いです。
            </li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Instagramは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。障害中にアプリを入れ直したり設定をいじっても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Instagramのステータスを確認する
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
              <b>別端末</b>で試す。同じWi-Fiで全部だめなら、回線、DNS、ルーター寄りです。
            </li>
            <li>
              <b>Web版（ブラウザ）でも試す</b>。アプリだけだめならアプリ状態、Web版もだめなら回線や障害の可能性が上がります。
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
            <h3 className="text-base font-semibold">Instagram側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              フィード、ストーリー、DMが重い、読み込めない、ログインが不安定といった症状は障害でも起きます。
              まずステータスを確認し、障害中は待つのが最短です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Instagramだけが遅い、開かないように見えても、DNS解決、通信経路、VPN、プロキシの影響で起きることがあります。
              回線を切り替えて差が出たら、この方向を先に疑う方が効率的です。
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
            <h3 className="text-base font-semibold">アプリ状態（キャッシュ・権限・バックグラウンド制限）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              キャッシュ破損、権限不足、バックグラウンド制限、古いアプリで表示が止まることがあります。
              アプリだけおかしいときは、ここを疑う価値があります。
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
            <h3 className="text-base font-semibold">アカウント周り（ログイン・認証・制限）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログインできない、操作が急に制限されるといった場合、本人確認や不審判定が絡むことがあります。
              ただし先に「障害か、自分側の通信か、アプリ状態か」を切り分けるのが先です。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリを完全終了して再起動し、もう一度読み込みます。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシを一旦OFFにする。</li>
          <li>端末を再起動して、詰まった状態をリセットする。</li>
          <li>Instagramアプリを最新版に更新する。</li>
          <li>改善しない場合は、アプリのキャッシュやストレージを整理する。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">ログインできない場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>別回線で試して、回線やDNSの問題を除外する。</li>
            <li>Web版でログインできるか試して、アプリ起因かどうかを切り分ける。</li>
            <li>パスワード再設定が必要な場合もありますが、まずは障害確認が先です。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">読み込みが終わらない場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>回線を変えて試す（Wi-Fi ↔ モバイル通信）。</li>
            <li>VPNやプロキシをOFFにする。</li>
            <li>端末の空き容量が極端に少ないと挙動が不安定になることがあります。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト系の表示が出たら、下の解説ページを確認してください。
          必要なものだけに絞ってリンクしています。
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
              その場合は待つのが最短です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">モバイル通信だと見られるのに、Wi-Fiだとだめなのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Wi-Fi側の問題が濃厚です。DNS、ルーター、VPN、通信経路の順で確認すると切り分けやすくなります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">最初に避けたほうがいいことは？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              障害確認をする前の再インストールや大きな設定変更は避けた方が安全です。原因が回線やDNSなら直らないうえ、後で元に戻す手間が増えます。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
