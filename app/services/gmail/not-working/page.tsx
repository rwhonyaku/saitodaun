// app/services/gmail/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.gmail;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Gmailが送受信できない？（障害か自分側か） | サイトダウン",
  description:
    "Gmailが開かない・送れない・受信できない時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、ブラウザ、アプリ）かを最短で切り分け、すぐ試せる対処をまとめます。",
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

export default function GmailNotWorkingPage() {
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
          Gmailが開かない・送受信できない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Gmailの不具合は、Google側の障害だけでなく、回線、Wi-Fi、DNS、ブラウザ状態、アプリ、同期設定でも起きます。
          最初に問題の方向を切り分けておくと、無駄な設定変更を減らしながら早く復旧しやすくなります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Gmailのステータスチェック
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
              Gmailだけだめなら、ブラウザ、アプリ、同期設定、端末側の問題が多いです。
            </li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Gmailは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。Google側で障害が起きているときは、端末やアプリをいろいろ触っても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Gmailのステータスを確認する
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
              <b>Web版とアプリ版の両方で試す</b>。片方だけだめなら、その側の問題を疑いやすくなります。
            </li>
            <li>
              <b>別端末</b>で試す。同じ症状が続くなら障害や回線寄り、端末で差があるなら端末やアプリ寄りです。
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
            <h3 className="text-base font-semibold">Google側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              送受信が遅い、ログインが不安定、画面が開かないなどは、Google側の障害でも起きます。
              この場合は利用者側でいろいろ変えても改善しにくいため、まず状況確認が先です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Gmailだけ不安定に見えても、DNS解決、通信経路、VPN、プロキシの影響で起きることがあります。
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
            <h3 className="text-base font-semibold">ブラウザ状態（Cookie・キャッシュ・拡張機能）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Web版で開かない、読み込みが終わらない、ログイン画面がループするといった症状は、拡張機能や壊れたキャッシュが原因のことがあります。
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
            <h3 className="text-base font-semibold">アプリの同期・通知・省電力設定</h3>
            <p className="mt-2 text-sm text-neutral-700">
              「受信できない」と感じても、実際は同期が止まっているだけということがあります。省電力設定やバックグラウンド制限が強い端末では特に起こりやすいです。
              まずはWeb版で受信できているかを見ると切り分けが早くなります。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>ページを更新、またはアプリを完全終了して再起動する。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシを一時的にOFFにする。</li>
          <li>シークレットモードや別ブラウザでWeb版を試す。</li>
          <li>GmailやGoogle関連のサイトデータ（Cookie、キャッシュ）を削除して再ログインする。</li>
          <li>アプリを最新版に更新し、必要なら端末も再起動する。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「送れない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Web版で送信できるか試して、アプリ起因かどうかを切り分ける。</li>
            <li>別回線で試して、回線やDNSの問題を除外する。</li>
            <li>障害の可能性が高いときは、無理に連打せず少し待つ。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「受信できない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>まずWeb版で受信できているか確認して、同期停止かどうかを見る。</li>
            <li>アプリの省電力設定やバックグラウンド制限で同期が止まることがあります。</li>
            <li>Wi-Fiとモバイル通信の両方で試して、回線差が出るか確認する。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 502、503、504 などが出たら、下の解説ページを確認してください。
          Gmail自体の問題に見えても、実際は通信やブラウザ側の症状であることがあります。
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
            <h3 className="text-base font-semibold">Web版は見れるのに、アプリだけ受信が遅いのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              同期が止まっている可能性があります。省電力設定やバックグラウンド制限、アプリ側の一時不具合を優先して確認してください。
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