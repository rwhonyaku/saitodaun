// app/services/paypay/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";
import IMobileAd from "@/components/ads/IMobileAd";

const service = SERVICES.paypay;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "PayPayが使えない・支払いできない？（障害か自分側か）",
  description:
    "PayPayが開かない・使えない・支払いできない時に、障害か自分の環境（回線、Wi-Fi、DNS、端末、アプリ、アカウント）かを最短で確認し、すぐ試せる対処をまとめます。",
  alternates: { canonical: "/services/paypay/not-working" }
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

export default function PayPayNotWorkingPage() {
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
          PayPayが使えない・支払いできない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          PayPayの不具合は、PayPay側の障害だけでなく、回線、Wi-Fi、DNS、端末状態、アプリの不調、ログイン状態、支払い条件でも起きます。
          最初に原因の方向を確認しておくと、無駄な設定変更を減らしながら、より早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          ログインできない・支払いできない・エラーが出るなど、症状によって原因の確認が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                PayPayのステータスチェック
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
              PayPayだけだめなら、アプリ、端末、アカウント状態、支払い条件の問題が多いです。
            </li>
          </ol>
        </div>
      </header>


      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、PayPayは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。PayPay側で障害が起きているときは、アプリ削除や設定変更をしても改善しないことが多いです。
          最初に全体状況を見ておくと、無駄な作業を避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            PayPayのステータスを確認する
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
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信）。片方で動くなら、回線、DNS、ルーター、VPNの可能性が高いです。
            </li>
            <li>
              <b>別端末</b>で試す。どの端末でも同じなら障害やアカウント寄り、端末ごとに違うならアプリや端末寄りです。
            </li>
            <li>
              <b>アプリを再起動して再ログインできるか確認する</b>。改善するなら、一時的なセッション不整合の可能性が高いです。
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
            <h3 className="text-base font-semibold">PayPay側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリが開かない、残高表示が不安定、支払い画面が進まない、読み込みが極端に遅いなどは、PayPay側の障害でも起きます。
              この場合は利用者側でいろいろ変えても改善しにくいため、まず状況確認が先です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              PayPayだけ不安定に見えても、DNS解決、通信経路、VPN、プロキシの影響で起きることがあります。
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
            <h3 className="text-base font-semibold">アプリの状態（更新不足・キャッシュ・一時不具合）</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリが古い、バックグラウンドで不安定になっている、端末側の一時不具合などで起きることがあります。
              特に「開けるが支払いだけできない」「バーコード表示が遅い」といった症状は、この方向を疑いやすいです。
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

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">アカウント・本人確認・支払い条件の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログインできない、支払いだけ通らない、本人確認や利用制限で止まるケースもあります。
              ただし、最初は「障害か」「回線か」「アプリか」を確認してから、この方向に進む方が効率的です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">加盟店側やコード読取環境の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              自分のPayPayではなく、店舗側端末や通信状況、QRコード表示環境の問題で決済が通らないこともあります。
              ほかの決済方法や別店舗で再現するかを見ると、確認がしやすくなります。
            </p>
          </div>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>PayPayアプリを完全に閉じて、もう一度開く。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシを一時的にOFFにする。</li>
          <li>アプリの更新がないか確認する。</li>
          <li>一度ログアウトして、再ログインできるか試す。</li>
          <li>端末を再起動する。</li>
          <li>障害ではないと見えたら、回線やDNS側も見直す。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「ログインできない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>別回線で試して、回線やDNSの問題を排除します。</li>
            <li>別端末で試して、端末やアプリの問題を排除します。</li>
            <li>障害情報や公式案内が出ていないか確認します。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「支払いできない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>別の通信環境で再試行して、回線差があるか確認します。</li>
            <li>加盟店や時間帯を変えると再現するか確認します。</li>
            <li>バーコード表示やQR読取部分が正常か確認します。</li>
            <li>障害の可能性が高いときは、無理に繰り返さず少し待ちます。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 502、503、504 などが出たら、下の解説ページを確認してください。
          PayPay自体の問題に見えても、実際は通信や端末側の症状であることがあります。
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
            <h3 className="text-base font-semibold">モバイル通信だと使えるのに、Wi-Fiだとだめなのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Wi-Fi側のDNS、ルーター、VPN、通信制限の問題が濃厚です。まずは回線差を確認し、DNSやルーター側の確認を進めてください。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">最初に避けたほうがいいことは？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              障害確認前の再インストールや大幅な設定変更は避けた方が安全です。原因が障害や回線側の場合、直らないうえ、後で元に戻す手間だけ増えることがあります。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
