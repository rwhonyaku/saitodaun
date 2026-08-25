// app/services/netflix/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";
import IMobileAd from "@/components/ads/IMobileAd";

const service = SERVICES.netflix;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Netflixが見れない・再生できない？（障害か自分側か）",
  description:
    "Netflixが再生できない・読み込めない・途中で止まる時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、アプリ）かを最短で確認し、すぐ試せる対処をまとめます。",
  alternates: { canonical: "/services/netflix/not-working" }
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

export default function NetflixNotWorkingPage() {
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
          Netflixが見れない・再生できない・止まる？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Netflixの不具合は、Netflix側の障害だけでなく、回線、Wi-Fi、DNS、端末状態、アプリの不調、VPN、テレビやストリーミング機器の問題でも起きます。
          最初に原因の方向を確認しておくと、無駄な設定変更を減らしながら、より早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          見れない・再生できない・止まる・ログインできないなど、症状によって原因の確認が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Netflixのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトや動画サービスも不安定なら、自分側の可能性が高いです：{" "}
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
              Netflixだけ止まるなら、回線品質、端末、アプリ、テレビや再生機器側の問題が多いです。
            </li>
          </ol>
        </div>
      </header>


      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Netflixは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。Netflix側で障害が起きているときは、端末やアプリをいろいろ触っても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Netflixのステータスを確認する
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
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信、可能なら別Wi-Fi）。改善するなら、回線、DNS、ルーター寄りです。
            </li>
            <li>
              <b>別端末</b>で再生してみる（スマホ、PC、テレビなど）。端末で差があるなら、端末やアプリ寄りです。
            </li>
            <li>
              <b>画質を落として</b>再生できるか試す。止まる、バッファが続く場合は、回線品質が原因のことが多いです。
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/internet-not-working">
              インターネット全体が不安定な場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
              Wi-Fiが怪しい場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/router-not-working">
              ルーターが怪しい場合
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
            <h3 className="text-base font-semibold">Netflix側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログインしづらい、再生できない、全体的に重い、検索やプロフィール切り替えが不安定といった症状は、Netflix側の障害でも起きます。
              この場合は利用者側でいろいろ変えても改善しにくいため、まず状況確認が先です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">回線品質の不足（速度より安定性）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              動画再生は、単に速度が出ているかだけでなく、通信が安定しているかも重要です。
              Wi-Fiの混雑、ルーターとの距離、電波干渉などで一瞬途切れるだけでも、Netflixは止まりやすくなります。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
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
            <h3 className="text-base font-semibold">DNSや通信経路・VPNの問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              DNS解決、通信経路、VPN、プロキシの影響で読み込みや再生が止まることがあります。
              特に回線切り替えで差が出る場合は、この方向を先に疑う方が効率的です。
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
            <h3 className="text-base font-semibold">端末やアプリの状態</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリのキャッシュ破損、古いアプリ、端末の空き容量不足、テレビやストリーミング機器の一時不具合などで再生が止まることがあります。
              端末によって差が大きい場合は、この方向を疑いやすいです。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting/device-cannot-connect">
                端末だけつながらない場合
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
                ブラウザ側の原因を確認する
              </Link>
            </div>
          </div>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリを完全終了して、もう一度開く。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える（可能なら別Wi-Fiでも試す）。</li>
          <li>VPNやプロキシを一時的にOFFにする。</li>
          <li>端末を再起動する。テレビやストリーミング機器も対象です。</li>
          <li>Netflixアプリを最新版に更新する。</li>
          <li>止まる場合は、ルーターに近づく、有線接続にする、混雑時間帯を避ける。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「途中で止まる・バッファが続く」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>同じ回線で他の動画サービスも止まるなら、回線品質が原因の可能性が高いです。</li>
            <li>端末を変えても止まるなら、回線、DNS、ルーター寄りです。</li>
            <li>端末によって差が大きいなら、端末側やアプリ側の問題を疑います。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「テレビではだめでスマホでは見られる」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>テレビやストリーミング端末側の不具合、古いアプリ、Wi-Fi感度不足の可能性があります。</li>
            <li>同じWi-Fiでも端末によって受信状態が違うことがあります。</li>
            <li>まずはテレビ側の再起動とアプリ更新を優先してください。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 502、503、504 などが出たら、下の解説ページを確認してください。
          Netflix自体の問題に見えても、実際は通信や端末側の症状であることがあります。
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
              ステータス確認をしたうえで、端末や回線を変えても状況がほぼ変わらないなら、障害の可能性が高いです。
              その場合は大きく触らず待つ方が近道です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">速度はあるのに止まるのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              動画は速度だけでなく、通信の安定性にも強く影響されます。Wi-Fi干渉、距離、ルーター混雑などで一瞬途切れるだけでも、再生が止まりやすくなります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">最初に避けたほうがいいことは？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              障害確認前の再インストールや大幅な設定変更は避けた方が安全です。原因が回線やDNSなら直らないうえ、後で元に戻す手間だけ増えることがあります。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
