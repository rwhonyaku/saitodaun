import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.slack;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Slackが使えない・送れない時の原因確認｜障害か自分側か | サイトダウン",
  description:
    "Slackが開かない、メッセージを送れない、通知が来ない、ログインできない時に、Slack側の障害か回線・DNS・ブラウザ・アプリ・VPN側かを確認します。",
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

export default function SlackNotWorkingPage() {
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
          Slackが使えない・送れない？（障害か自分側かを確認）
        </h1>

        <p className="text-base text-neutral-600">
          Slackの不具合は、Slack側の障害だけでなく、回線、Wi-Fi、DNS、ブラウザ、アプリ、VPN、会社ネットワークの制限でも起きます。最初に原因の方向を確認しておくと、無駄な設定変更を減らしながら早く復旧しやすくなります。
        </p>
        <p className="text-sm text-neutral-600">
          送れない・通知が来ない・ログインできない・ワークスペースに入れないなど、症状によって見るべき原因が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Slackのステータスチェック
              </Link>
            </li>
            <li>
              他のサイトやアプリも不安定なら、{" "}
              <Link className="underline" href="/troubleshooting/internet-not-working">
                インターネット接続
              </Link>{" "}
              や{" "}
              <Link className="underline" href="/troubleshooting-dns">
                DNS
              </Link>{" "}
              の問題の可能性があります。
            </li>
            <li>Slackだけ不安定なら、ブラウザ、アプリ、通知設定、VPN、社内ネットワーク制限の問題が多いです。</li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Slackは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。Slack側で障害が起きているときは、送信、通知、ワークスペース切り替えなど一部機能だけ不安定になることもあります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Slackのステータスを確認する
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
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Web版とアプリ版の両方で同じ症状か確認する</li>
            <li>Wi-Fi とモバイル通信を切り替えて差が出るか確認する</li>
            <li>別端末やシークレットモードで再現するか確認する</li>
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

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">画面は開くのに一部だけ不安定なケース</h3>
          <p className="mt-2 text-sm text-neutral-700">
            SlackのUIは表示されるのにメッセージ送信、通知、ログイン、ワークスペース切り替えだけ失敗する場合は、全体障害よりも社内VPN・ファイアウォール、SSO、ブラウザセッション、通知設定の問題を先に確認する方が有効です。
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) よくある原因</h2>
        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">Slack側の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              メッセージ送信、通知、検索、ワークスペース切り替えなどの一部機能だけ不安定になることがあります。端末や回線を変えても状況が変わらないなら、まずここを疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">社内VPN・ファイアウォール・プロキシ</h3>
            <p className="mt-2 text-sm text-neutral-700">
              会社PCだけ不安定、社内Wi-FiやVPN接続中だけ使えない場合は、ネットワーク制限やプロキシ設定の影響を受けていることがあります。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="text-sm underline" href="/troubleshooting/site-blocked-by-firewall">
                ネットワーク制限が疑わしい場合
              </Link>
              <Link className="text-sm underline" href="/troubleshooting/wifi-not-working">
                Wi-Fi が不安定な場合
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ブラウザ・アプリ・通知設定</h3>
            <p className="mt-2 text-sm text-neutral-700">
              キャッシュ、Cookie、拡張機能、古いアプリ、OS側の通知制限で、Slackだけ不安定になることがあります。Web版だけだめ、アプリ版だけだめならこの方向を疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">SSO・ログインセッション</h3>
            <p className="mt-2 text-sm text-neutral-700">
              会社や組織のSSO連携を使っている場合、再認証ループや認証切れでログインだけ失敗することがあります。個人設定よりも組織側の認証条件が影響しているケースです。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>Web版とアプリ版を切り替えて差が出るか確認する。</li>
          <li>Wi-Fi ↔ モバイル通信に切り替える。</li>
          <li>VPN やプロキシを一時的に OFF にする。</li>
          <li>シークレットモードや別ブラウザで試す。</li>
          <li>Slack関連の Cookie とキャッシュを削除して再ログインする。</li>
          <li>アプリを最新化し、必要なら端末を再起動する。</li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、タイムアウト、503、504 などが出たら、下の解説ページを確認してください。Slack自体の問題に見えても、実際は通信やブラウザ側の症状であることがあります。
        </p>
        <ErrorLinks slugs={issue.relatedErrorSlugs} />
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
    </main>
  );
}
