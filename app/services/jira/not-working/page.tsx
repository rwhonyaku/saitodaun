import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.jira;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "Jiraが使えない時の対処法 | サイトダウン",
  description:
    "Jiraが開かない・ログインできない・更新できない時に、障害か自分の環境（回線、DNS、ブラウザ、SSO、VPN）かを確認して対処します。",
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

export default function JiraNotWorkingPage() {
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
          Jiraが使えない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          Jiraの不具合は、Atlassian側の障害だけでなく、回線、DNS、ブラウザ、SSO、VPN、会社ネットワークの制限でも起きます。閲覧はできるのに更新や通知だけ失敗するケースも多いため、部分障害か自分側かを先に分けるのが重要です。
        </p>
        <p className="text-sm text-neutral-600">
          開かない・ログインできない・チケット更新できない・コメントや通知だけ失敗するなど、症状によって原因の確認が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                Jiraのステータスチェック
              </Link>
            </li>
            <li>画面は開くのに更新や通知だけ失敗するなら、全体障害ではなく一部機能障害や権限・SSO の問題を疑います。</li>
            <li>会社アカウントだけ不安定なら、SSO、Atlassian Access、社内VPN・プロキシの影響を先に確認します。</li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、Jiraは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。Atlassian 側の障害では、ログインはできても課題更新、通知、検索、添付など一部機能だけ不安定になることがあります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            Jiraのステータスを確認する
          </Link>
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.mainToolHref}
          >
            URL疎通チェック（メインツール）
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 最短の確認（2分）</h2>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>閲覧だけできるのか、更新・コメント・通知まで不安定なのかを分ける</li>
            <li>別ブラウザやシークレットモードで SSO ログインを試す</li>
            <li>会社VPN やプロキシを外して差が出るか確認する</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="text-sm underline" href="/troubleshooting/browser-not-loading-sites">
              ブラウザだけ開かない場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting-dns">
              DNS が怪しい場合
            </Link>
            <Link className="text-sm underline" href="/troubleshooting/site-blocked-by-firewall">
              ネットワーク制限が疑わしい場合
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">開けるのに更新や通知だけ失敗するケース</h3>
          <p className="mt-2 text-sm text-neutral-700">
            Jiraの画面は表示されるのに課題更新、コメント、通知、添付だけ失敗する場合は、全体障害よりもAtlassian側の部分障害、権限、SSO、ブラウザセッションの不整合を先に確認する方が有効です。
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) よくある原因</h2>
        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">Atlassian側の部分障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              閲覧はできても更新、通知、検索、添付、連携機能だけ不安定になることがあります。複数ユーザーで同時に同じ症状なら、まずここを疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">SSO・Atlassian Access・権限</h3>
            <p className="mt-2 text-sm text-neutral-700">
              ログインループ、会社アカウントだけ失敗、特定プロジェクトだけ更新できない場合は、SSO、組織ポリシー、権限の問題が隠れていることがあります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">社内VPN・ファイアウォール・プロキシ</h3>
            <p className="mt-2 text-sm text-neutral-700">
              会社PCだけ不安定、VPN 接続中だけログインや更新が失敗する場合は、ネットワーク制限やプロキシの影響を先に確認します。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ブラウザのキャッシュ・Cookie・拡張機能</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Web版だけ不安定、SSO 後に戻される、保存ボタンだけ反応しない場合は、ブラウザセッションや拡張機能が原因のことがあります。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>公式ステータスで Jira や Atlassian Cloud の状態を確認する。</li>
          <li>シークレットモードや別ブラウザでログインする。</li>
          <li>VPN やプロキシを一時的に外す。</li>
          <li>Jira 関連の Cookie とキャッシュを削除して再ログインする。</li>
          <li>閲覧だけできるか、更新・通知も失敗するかを分けて確認する。</li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、503、504 などが出たら、下の解説ページを確認してください。Jira自体の問題に見えても、通信経路やブラウザ側の症状であることがあります。
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
