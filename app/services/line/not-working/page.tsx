// app/services/line/not-working/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";
import IMobileAd from "@/components/ads/IMobileAd";

const service = SERVICES.line;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "LINEが使えない・送れない時の原因確認｜障害か自分側か | サイトダウン",
  description:
    "LINEが開かない、送れない、通話できない、通知が来ない時に、LINE側の障害か回線・Wi-Fi・DNS・端末・アプリ側かを確認します。",
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

export default function LineNotWorkingPage() {
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
          LINEが開かない・送れない・通話できない？（障害か自分側かを確認）
        </h1>

        <p className="text-base text-neutral-600">
          LINEの不具合は、LINE側の障害だけでなく、回線、Wi-Fi、DNS、端末状態、アプリの不調、権限設定でも起きます。
          最初に原因の方向を確認しておくと、不要な再インストールや設定変更を避けながら、より早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-700">
          メッセージは送れるが通話だけできない、通知だけ来ない、画像やスタンプ送信だけ失敗する場合は、見るべき原因が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                LINEのステータスチェック
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
              LINEだけだめなら、アプリ状態、権限、端末側、または通話時の回線品質の問題が多いです。
            </li>
          </ol>
        </div>
      </header>


      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、LINEは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。LINE側で障害が起きているときは、端末やアプリを触っても改善しないことが多いです。
          先に全体状況を見ておくと、無駄な再設定や再インストールを避けやすくなります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            LINEのステータスを確認する
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
        <h2 className="text-xl font-semibold">2) 最短で確認すること（2分）</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">まずはこの3つだけ</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              <b>回線を切り替える</b>（Wi-Fi ↔ モバイル通信）。片方で動くなら、回線、DNS、ルーター、VPNの可能性が高いです。
            </li>
            <li>
              <b>別端末</b>で試す。同じWi-Fiで複数端末がだめなら、回線やルーター寄りです。端末ごとに差が出るなら、端末やアプリ寄りです。
            </li>
            <li>
              <b>どの機能だけ使えないかを見る</b>。送受信だけ、通話だけ、ログインだけなど症状が分かれるなら、権限、アプリ状態、回線品質を確認しやすくなります。
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
            <h3 className="text-base font-semibold">LINE側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              メッセージ送信が遅い、通知が来ない、ログインしづらい、通話が不安定といった症状は、LINE側の障害でも起きます。
              この場合は利用者側でいろいろ変えても改善しにくいため、まずは状況確認が先です。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">DNSや通信経路の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              LINEだけ不安定に見えても、実際はDNS解決、通信経路、VPN、プロキシ、ルーター側の影響で起きていることがあります。
              特にWi-Fiではだめでモバイル通信では使える場合は、この方向を先に疑う方が効率的です。
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
            <h3 className="text-base font-semibold">アプリ状態・権限・端末側の問題</h3>
            <p className="mt-2 text-sm text-neutral-700">
              アプリの一時不具合、通知権限、マイク権限、バックグラウンド通信制限、壊れたキャッシュなどで、LINEだけ挙動がおかしくなることがあります。
              特に「開くが送れない」「通知だけ来ない」「通話だけ不安定」といった症状は、この方向を疑いやすいです。
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
            <h3 className="text-base font-semibold">通話時の回線品質不足</h3>
            <p className="mt-2 text-sm text-neutral-700">
              LINE通話は、単に「つながるか」だけでなく、通信の安定性や遅延の影響も受けます。
              Web閲覧は問題なくても、混雑したWi-Fi、公衆Wi-Fi、弱い電波環境では通話だけ不安定になることがあります。
            </p>
          </div>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>LINEを完全終了して、もう一度開く。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPNやプロキシを一時的にOFFにする。</li>
          <li>端末を再起動して、通信状態をリフレッシュする。</li>
          <li>アプリを最新版に更新する。</li>
          <li>障害ではないと見えたら、ルーターを再起動する。</li>
          <li>それでも改善しなければ、権限やバックグラウンド制限を確認する。</li>
        </ol>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「送れない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>他のサイトやアプリもだめなら、まず回線側を疑います。</li>
            <li>LINEだけだめなら、アプリの一時不具合やセッション不整合のことがあります。</li>
            <li>Wi-Fiだけだめなら、モバイル通信で試して回線差を確認します。</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">「通話できない」場合（追加チェック）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>回線品質の影響が大きいので、別回線で試すのが早いです。</li>
            <li>VPNやプロキシは一時的にOFFにします。</li>
            <li>ホテルや公衆Wi-Fiなど制限が強い回線では、モバイル通信の方が安定することがあります。</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、または 502、503、504 などが出たら、下の解説ページを確認してください。
          LINE自体の問題に見えても、実際は通信や端末側の症状であることがあります。
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
            <h3 className="text-base font-semibold">モバイル通信だと動くのに、Wi-Fiだとだめなのはなぜ？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Wi-Fi側のDNS、ルーター、VPN、プロキシの問題が濃厚です。まずは回線切り替えで差を確認し、DNSやルーター側を確認してください。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-base font-semibold">最初に避けたほうがいいことは？</h3>
            <p className="mt-2 text-sm text-neutral-700">
              障害確認をする前の再インストールや大きな設定変更は避けた方が安全です。原因が回線やDNSなら直らないうえ、再ログインや認証の手間だけ増えることがあります。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
