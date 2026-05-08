// app/services/chatgpt/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.chatgpt;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "ChatGPTが使えない？（障害か自分側か） | サイトダウン",
  description:
    "ChatGPTが開かない・使えない・ログインできない時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、ブラウザ、VPN）かを最短で切り分け、すぐ試せる対処をまとめます。",
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

export default function ChatGPTNotWorkingPage() {
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
          ChatGPTが開かない・使えない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          ChatGPTの不具合は、OpenAI側の障害だけでなく、回線、Wi-Fi、DNS、ブラウザ状態、VPN、混雑（429）などでも起きます。
          最初に原因の方向を切り分けておくと、無駄な設定変更を避けて早く復旧できます。
        </p>

        <p className="text-sm text-neutral-600">
          使えない・ログインできない・エラーが出る・読み込めないなど、症状によって原因の切り分けが変わります。
        </p>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                ChatGPTのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも開けない場合は、{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネット接続
              </Link>{" "}
              や{" "}
              <Link className="underline" href="/troubleshooting-dns">
                DNS
              </Link>{" "}
              の問題の可能性があります。
            </li>
            <li>
              ChatGPTだけ開けない場合は、ブラウザ、VPN、セッション、または混雑（429）が原因のことが多いです。
            </li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、ChatGPTは障害？</h2>

        <p className="text-sm text-neutral-700">
          まずOpenAI側で障害が発生していないか確認します。サービス障害のときは、ブラウザ設定を変えても改善しないことが多いです。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            ChatGPTのステータスを確認する
          </Link>

          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.mainToolHref}
          >
            URL疎通チェック（メインツール）
          </Link>
        </div>

        <p className="text-xs text-neutral-500">
          障害を先に確認しておくと、不要な再インストールや設定変更を避けられます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 最短の切り分け（2分）</h2>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">まずはこの3つ</h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信）。片方で動くなら、Wi-FiやDNSの問題の可能性があります。
            </li>
            <li>
              <b>シークレットモードや別ブラウザ</b>で試す。動くなら、Cookie、キャッシュ、拡張機能が原因の可能性があります。
            </li>
            <li>
              <b>VPNやプロキシをOFF</b>にする。一部VPNや企業ネットワークではアクセス制限がかかることがあります。
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
              インターネットにつながらない場合
            </Link>

            <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
              Wi-Fiがつながらない原因
            </Link>

            <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
              ブラウザでサイトが開かない場合
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
            <h3 className="text-base font-semibold">OpenAI側の障害</h3>

            <p className="mt-2 text-sm text-neutral-700">
              ChatGPTの画面が開かない、ログインできない、応答が止まるなどは、OpenAI側の障害やメンテナンスで発生することがあります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">混雑（429）・一時的な制限</h3>

            <p className="mt-2 text-sm text-neutral-700">
              「しばらくしてから再度お試しください」などの表示は、混雑や短期的なリクエスト制限で起きることがあります。
            </p>

            <div className="mt-3">
              <Link className="text-sm underline" href="/errors/429-too-many-requests">
                429（Too Many Requests）解説 →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>

            <p className="mt-2 text-sm text-neutral-700">
              回線を変えると開ける場合は、DNS、VPN、プロキシ、または通信経路の問題の可能性があります。
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting-dns">
                DNSトラブル対処
              </Link>

              <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
                インターネット接続トラブル
              </Link>

              <Link className="text-sm underline" href="/troubleshooting/router-not-working">
                ルーターの問題を確認
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ブラウザの状態（Cookie・キャッシュ・拡張機能）</h3>

            <p className="mt-2 text-sm text-neutral-700">
              ログインループや画面が真っ白になる症状は、ブラウザのキャッシュや拡張機能が原因のことがあります。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>ページを更新、またはアプリを完全終了して再起動する。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシをOFFにする。</li>
          <li>シークレットモードや別ブラウザで試す。</li>
          <li>chat.openai.com のCookieとキャッシュを削除して再ログインする。</li>
          <li>時間を少し置いて再試行する（混雑の場合）。</li>
          <li>障害ではないと確認できたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">ログインできない場合</h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>シークレットモードでログインを試す。</li>
            <li>別回線（モバイル通信など）で試す。</li>
            <li>VPNや企業ネットワークをOFFにする。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) エラー表示が出る場合</h2>

        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、429、502、503などのエラーが表示された場合は、下の解説ページを確認してください。
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
            <h3 className="text-base font-semibold">障害かどうかを見分けるには？</h3>

            <p className="mt-2 text-sm text-neutral-700">
              ステータス確認をしたうえで、回線やブラウザを変えても状況が変わらない場合は、OpenAI側の障害の可能性が高いです。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">429エラーが出る</h3>

            <p className="mt-2 text-sm text-neutral-700">
              ChatGPTの利用が集中しているときに発生します。少し時間を置いて再試行すると改善することがあります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">最初に避けたほうがいいこと</h3>

            <p className="mt-2 text-sm text-neutral-700">
              障害確認をせずにアプリ再インストールや大きな設定変更をするのはおすすめできません。回線や混雑が原因の場合は改善しません。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
