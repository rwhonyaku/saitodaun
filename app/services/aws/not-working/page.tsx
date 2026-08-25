import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.aws;
const issue = service.issues["not-working"];

export const metadata: Metadata = {
  title: "AWSが使えない時の対処法",
  description:
    "AWSコンソールが開かない・ログインできない・APIが失敗する時に、障害か自分の環境（回線、DNS、ブラウザ、VPN）かを確認して対処します。",
  alternates: { canonical: "/services/aws/not-working" }
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

export default function AwsNotWorkingPage() {
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
          AWSが使えない？（障害か自分側かを最短判定）
        </h1>

        <p className="text-base text-neutral-600">
          AWSの不具合は、AWS側の障害だけでなく、回線、DNS、ブラウザ、SSO、VPN、権限設定でも起きます。特にAWSはリージョン単位やサービス単位の障害が多いため、全体停止なのか一部機能だけの問題なのかを先に確認するのが重要です。
        </p>
        <p className="text-sm text-neutral-600">
          コンソールが開かない・ログインできない・特定リージョンだけ不安定・API だけ失敗するなど、症状によって原因の確認が変わります。
        </p>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold">結論（先にこれだけ）</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>
              まず状態を確認：{" "}
              <Link className="underline" href={issue.statusPageHref}>
                AWSのステータスチェック
              </Link>
            </li>
            <li>コンソールは開くが一部リージョンや一部サービスだけ失敗するなら、広域停止ではなくリージョン障害や部分障害の可能性があります。</li>
            <li>AWSだけだめなら、SSO、権限、ブラウザセッション、VPN、社内ネットワーク制限も疑います。</li>
          </ol>
        </div>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 今、AWSは障害？</h2>
        <p className="text-sm text-neutral-700">
          まずここから確認します。AWSではリージョン単位や特定サービス単位の障害が起きやすく、コンソール表示だけでは全体像が見えないことがあります。
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm underline"
            href={issue.statusPageHref}
          >
            AWSのステータスを確認する
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
            <li>コンソール全体が開かないのか、特定リージョンや特定サービスだけ失敗するのかを分ける</li>
            <li>ブラウザを変えて、SSO ログインやセッションの問題か確認する</li>
            <li>社内VPN やプロキシを外して差が出るか確認する</li>
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
          <h3 className="text-base font-semibold">コンソールは開くのに一部だけ失敗するケース</h3>
          <p className="mt-2 text-sm text-neutral-700">
            AWSコンソールは表示されるのに特定リージョン、CloudWatch、EC2、S3、API 呼び出しだけ失敗する場合は、全体障害よりもリージョン障害、サービス単位の劣化、権限、または一時的な API 側の問題を疑う方が判断しやすいです。
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) よくある原因</h2>
        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">リージョン障害・サービス単位の障害</h3>
            <p className="mt-2 text-sm text-neutral-700">
              AWSはリージョン単位で影響が出ることが多く、東京リージョンだけ不安定、特定サービスだけ API が失敗するといったケースが珍しくありません。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">SSO・認証・権限</h3>
            <p className="mt-2 text-sm text-neutral-700">
              AWS IAM Identity Center や組織アカウントを使っている場合、認証期限切れ、SSO ループ、権限不足でコンソールや API の一部だけ失敗することがあります。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">社内VPN・プロキシ・DNS</h3>
            <p className="mt-2 text-sm text-neutral-700">
              会社PCだけ不安定、VPN 接続中だけ遅い、特定のエンドポイントだけ失敗する場合は、社内ネットワーク制限、プロキシ、DNS の影響を先に疑います。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-base font-semibold">ブラウザセッション・キャッシュ</h3>
            <p className="mt-2 text-sm text-neutral-700">
              コンソールの読み込みだけ止まる、ログイン後に戻される場合は、ブラウザのキャッシュや Cookie の不整合が原因になることがあります。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) すぐ試せる対処（順番どおり）</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
          <li>公式ステータスでリージョンや対象サービスを確認する。</li>
          <li>別ブラウザやシークレットモードで AWS コンソールを開く。</li>
          <li>VPN やプロキシを一時的に外す。</li>
          <li>問題の出るリージョンと出ないリージョンがあるか確認する。</li>
          <li>SSO を再認証し、必要なら Cookie とキャッシュを削除する。</li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">5) 具体的なエラー表示が出る場合</h2>
        <p className="text-sm text-neutral-700">
          DNS、SSL、502、503、504 などが出たら、下の解説ページを確認してください。AWS自体の問題に見えても、通信経路や認証の問題が隠れていることがあります。
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
