import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "500 Internal Server Errorとは？原因と対処",
  description:
    "500 Internal Server Error の意味、よくある原因（設定ミス/プログラム/DB/プラグイン）、ユーザー側でできること、運営者側の復旧手順を解説します。",
  alternates: { canonical: "/errors/500-internal-server-error" }
};

export default function Error500InternalServerErrorPage() {
  return (
    <EvergreenPageShell
      h1="500 Internal Server Errorとは？原因と対処"
      updatedAt="2026-03-03"
      lead={[
        "500 Internal Server Error は「サーバー内部で予期しないエラーが起きた」ことを示す代表的なサーバーエラーです。",
        "多くの場合、原因はサイト運営側（設定/プログラム/DB）にあり、ユーザー側で直接直すことはできません。まずは“復旧待ちが妥当か”と“自分だけの問題か”を確認しましょう。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：500が出たときの典型",
          items: [
            "サイトのコード/設定/プラグインなどが原因でサーバー処理が失敗している",
            "一時的な不具合なら、少し待つと戻ることもある",
            "長引く場合は運営者側の修正が必要（ユーザー側で直せないことが多い）",
          ],
        },

        // Convert pseudo-bullets into real list for readability/quality
        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "設定ミス（サーバー設定、環境変数、権限、.htaccessなど）",
            "アプリ/プログラムのバグ（例外で落ちる）",
            "DB接続エラーやDB障害",
            "WordPressのテーマ/プラグイン更新が原因で動作不能",
            "依存サービス（API/認証/決済）の異常に引きずられて失敗",
            "ディスク容量不足やメモリ不足で処理が継続できない",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 少し待って再試行（短時間の障害なら復旧することがある）",
            "2) 公式ステータスやSNSで障害情報を確認",
            "3) 別回線で試す（稀だが経路差/社内ネットの干渉の確認）",
            "4) リロード連打をしない（負荷悪化や制限の原因になる）",
          ],
        },

        {
          type: "list",
          title: "運営者側の復旧手順（サイト管理者向け）",
          items: [
            "直近のデプロイ/更新/設定変更を戻す（ロールバックで差分を最小化）",
            "サーバーログ（Web/アプリ/DB）でエラー箇所を特定（500の本体はログに出る）",
            "DB接続、環境変数、権限、依存APIの状態を確認",
            "WordPressならプラグイン無効化/テーマ切替で確認",
            "再発防止：監視/アラート、ロールバック手順、リリース前の検証を整備",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "500は基本サイト側ですが、外部地点から疎通確認して状況を整理すると判断が速くなります。",
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
                外部でも失敗ならサイト側障害の可能性が高く、復旧待ちが合理的です。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 500はサーバーダウンですか？ → 必ずしもダウンではありませんが、サーバー内部で処理が失敗しています（運営側の対応が必要なことが多い）。",
            "Q. 502/503/504との違いは？ → 500は“アプリ/サーバー内部の例外”、502/504は“ゲートウェイ/プロキシ経由での上流問題”、503は“過負荷/メンテで受け付け不能”が中心です。",
            "Q. 直るまでどれくらい？ → 一時的な不具合なら短時間で復旧することもありますが、長引くなら運営者側の修正が必要です。",
            "Q. 連打すると直りますか？ → 直らないことが多く、負荷悪化の原因になるため避けるのが安全です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="500-internal-server-error"
            />,
          ],
        },
      ]}
    />
  );
}