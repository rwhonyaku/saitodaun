import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "403 Forbiddenとは？原因と直し方",
  description:
    "403 Forbidden の意味、IP/地域制限・WAF・権限不足などの原因、ユーザー側の対処、運営者側の設定ポイントを解説します。",
  alternates: { canonical: "/errors/403-forbidden" }
};

export default function Error403ForbiddenPage() {
  return (
    <EvergreenPageShell
      h1="403 Forbiddenとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "403 Forbidden は「サーバーはリクエストを理解しているが、アクセスを許可しない」ことを示すエラーです。",
        "サイトが落ちているわけではなく、“拒否されている”状態なので、原因がユーザー側（権限や環境）にあることも、運営側の制限にあることもあります。まずは“自分だけ”か“他の人も同じ”かを確認するのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：403の典型原因",
          items: [
            "IP制限／国・地域制限（特定の回線・海外回線・VPNをブロック）",
            "ログイン・権限不足（会員限定ページ、管理画面など）",
            "WAF/セキュリティ製品の誤検知（Bot対策、アクセスパターンで弾かれる）",
            "URLは正しいが“公開されていない場所”にアクセスしている（ディレクトリ/権限）",
          ],
        },

        // Convert pseudo-bullets into real list for readability/quality
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 別回線で試す（Wi-Fi→モバイル回線。最速の確認）",
            "2) シークレットモードで開く（拡張機能やCookieの影響を切る）",
            "3) 一度ログアウト→再ログイン（権限周りのセッション不整合）",
            "4) VPNを切る／逆にVPNで接続元を変える（地域制限・誤ブロックの回避）",
            "5) 時間を置いて再試行（WAFの一時ブロック・レート制限の可能性）",
          ],
        },

        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "WAF/Firewall のルール（国別ブロック、Bot対策、Rate Limit）とログを確認（誤検知か意図か）",
            "CDN（Cloudflare等）のセキュリティ設定（Firewall Events / Access Rules）",
            "サーバー側のアクセス制御（.htaccess、Nginx allow/deny、Basic認証）",
            "特定URLだけ403なら：ディレクトリ権限、公開設定、ルーティングの不整合",
            "認証・権限が絡むなら：ロール設定、セッション、CSRF/Referer制限の影響",
          ],
        },

        {
          type: "div",
          title: "このエラーが「自分だけ」か確認する",
          body: [
            "403は“特定条件のアクセスだけ拒否”という性質上、他の人は見れている可能性があります。外部地点からの疎通確認で確認しましょう。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
              <p className="mt-2 text-xs text-slate-600">
                こちらで「オンライン」なのに自分だけ403の場合は、回線/地域/権限/WAF誤検知の可能性が高いです。
              </p>
            </div>,
          ],
        },

        {
          type: "note",
          title: "「海外からは見れない」ケース",
          body: [
            "海外アクセス制限があるサイトは、日本国内からは見れても、海外回線や一部VPNからは403になることがあります。",
            "旅行中や海外回線で困っている場合は、国内経由のVPNが有効なことがあります。",
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 403はサーバーダウンですか？ → いいえ。多くの場合サーバーは動いており、アクセスだけ拒否されています。",
            "Q. 404との違いは？ → 404は「ページが見つからない」、403は「ページは存在するがアクセス不可」です。",
            "Q. 急に403になりました。なぜ？ → WAFの一時ブロック、ログイン状態の不整合、IP/地域制限の変更などが原因になり得ます。",
            "Q. 直すには何が一番早い？ → 別回線（モバイル回線）で試すのが最速の確認です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="403-forbidden" />],
        },
      ]}
    />
  );
}