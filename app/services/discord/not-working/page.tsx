// app/services/discord/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";
import IMobileAd from "@/components/ads/IMobileAd";

const service = SERVICES.discord;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Discordがつながらない？（障害か自分側か） | サイトダウン",
  description:
    "Discordがつながらない・読み込めない・通話が不安定な時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、アプリ、VPN）かを最短で確認し、すぐ試せる対処をまとめます。",
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

export default function DiscordNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
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
          Discordがつながらない・読み込めない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Discordの不具合は、単純な障害だけでなく、回線、Wi-Fi、DNS、アプリ状態、VPN、音声通話の品質でも起きます。
          最初に問題の方向を絞るだけで、無駄な再設定や再インストールをかなり減らせます。
        </p>
        <p className="text-sm text-neutral-700">
          ログインできない・接続できない・メッセージが送れない・ボイスチャットが使えない・通知が来ないなど、症状によって原因の確認が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Discordのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、自分側の可能性が高いです：{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネットにつながらない原因
              </Link>
            </li>
            <li>
              Wi-Fiでは不安定でモバイル通信だと動くなら、{" "}
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
              Discordだけだめなら、アプリ、ブラウザ、VPN、端末、通話品質の問題が多いです。
            </li>
          </ol>
        </div>
      </header>


      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Discordは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。障害中は、端末側をいろいろ触っても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Discordのステータスを確認する
          </Link>
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.mainToolHref}
          >
            URL疎通チェック（メインツール）
          </Link>
        </div>

        <p className="text-xs text-neutral-500">
          先に障害を除外してから自分側の確認に進む方が、全体として早く原因にたどり着けます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 最短の確認（2分）</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">まずはこの3つだけ</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信）。片方で安定するなら、回線、DNS、ルーター、VPNの可能性が高いです。
            </li>
            <li>
              <b>別端末</b>で試す。端末で差があるなら端末やアプリ寄り、どれでも同じなら障害や回線寄りです。
            </li>
            <li>
              <b>ブラウザ版でも試す</b>。ブラウザでは動くなら、アプリ側の問題がかなり濃厚です。
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
            <h3 className="text-base font-semibold">Discord側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              サーバー接続、メッセージ送受信、通知、音声通話などが不安定になることがあります。
              まずステータスを確認して、サービス全体の問題かどうかを見ておくのが最短です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路・VPNの問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              回線を切り替えると挙動が変わるなら、DNS、VPN、プロキシ、通信経路の影響が濃厚です。
              特にWi-Fiだけ不安定なときは、この方向から見る方が効率的です。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting-dns">
                DNSトラブル対処へ
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
                インターネット全体の確認
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
              アプリが古い、キャッシュが壊れている、通知やマイク権限がずれている、バックグラウンド制限が強いなどで接続が不安定になることがあります。
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
            <h3 className="text-base font-semibold">音声通話が不安定（回線品質）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              音声通話は単純な速度よりも、遅延や安定性に影響を受けやすいです。Wi-Fi干渉、距離、混雑、同時通信が多い環境では途切れやすくなります。
            </p>
          </div>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリを完全終了して再起動する。PCなら端末ごと再起動も有効です。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシを一時的にOFFにする。</li>
          <li>ブラウザ版で試して、アプリ起因かどうかを確認する。</li>
          <li>アプリを最新版に更新する。</li>
          <li>端末を再起動して、詰まった状態をリセットする。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">通話が途切れる場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>ルーターに近づく、または可能なら5GHz帯へ切り替える。</li>
            <li>同時に動画視聴や大容量通信が走っていないか確認する。</li>
            <li>Wi-Fiよりモバイル通信の方が安定することもあります。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 502、503 などが出たら、下の解説ページを確認してください。
          Discord自体の問題に見えても、実際は通信や端末側の症状であることがあります。
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
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">モバイル通信だと動くのに、Wi-Fiだと不安定なのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Wi-Fi側の問題が濃厚です。DNS、ルーター、VPN、干渉や混雑の順で確認すると見分けやすくなります。
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
