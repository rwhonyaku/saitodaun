import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 524エラーとは？原因と直し方 | サイトダウン",
  description:
    "Cloudflare 524（A timeout occurred）の意味、オリジン処理が遅い原因、ユーザー側の対処、運営者側の改善ポイントを解説します。",
};

export default function Cloudflare524Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 524エラーとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "Cloudflare 524 は「Cloudflareはオリジンサーバーに接続できたが、応答が返ってくるまでに時間がかかりすぎた」時に出るエラーです。",
        "522が“接続できない”、524が“接続はできるが処理が終わらない/遅すぎる”という違いです。多くの場合、原因はサイト側（オリジン処理の遅延）にあります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：524で起きていること",
          items: [
            "ブラウザ → Cloudflare は到達できている",
            "Cloudflare → オリジンの接続はできている",
            "ただし、オリジンの処理が遅く、Cloudflareの待ち時間上限に達している",
          ],
        },

        // Convert pseudo-bullets into real list for readability/quality
        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "DBが遅い（スロークエリ、ロック、接続数逼迫）",
            "重い処理を同期で実行（集計、画像/動画処理、外部API待ち）",
            "サーバー過負荷（CPU/メモリ不足、ワーカー不足）",
            "キャッシュが効かず、毎回重い生成処理が走っている",
            "依存サービス遅延（決済/認証/検索など）で待ちが連鎖している",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 時間を置いて再試行（負荷が落ちると通ることがある）",
            "2) 別回線で試す（地域/ISP差の切り分け）",
            "3) 公式ステータスやSNSで障害情報を確認",
            "4) 同じ操作を連打しない（サーバー負荷を悪化させる）",
          ],
        },

        {
          type: "list",
          title: "運営者側の改善ポイント（サイト管理者向け）",
          items: [
            "最優先：遅いURL/処理を特定（APM/ログ/トレース）",
            "DB：スロークエリ、インデックス、ロック、接続数上限を確認",
            "外部API依存：タイムアウト/リトライ設計を見直し、可能なら非同期化（キュー/バックグラウンド処理）",
            "キャッシュ導入（ページキャッシュ/データキャッシュ）で同じ重い処理の繰り返しを避ける",
            "ワーカー/スケール（CPU/メモリ/同時処理）の増強（短期回避として有効）",
            "タイムアウトは“最後の調整”：延ばすだけだと根本改善にならない（ボトルネック解消が先）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "524はサイト側要因が多いですが、回線差や一時的な経路もあり得ます。外部地点から疎通確認して切り分けましょう。",
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
                外部でも遅い/失敗が出るなら、サイト側（オリジン処理遅延）が濃厚です。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 524と522の違いは？ → 522は「Cloudflareがオリジンに接続できない（接続確立できない）」、524は「接続はできたが“応答待ち”が時間切れ」です。",
            "Q. 524と504の違いは？ → どちらもタイムアウト系ですが、524はCloudflare特有の“オリジン応答待ち時間切れ”、504は一般に“ゲートウェイ/プロキシの応答待ち時間切れ”です。",
            "Q. リロード連打は有効？ → 混雑/遅延時は逆効果になりやすいです。時間を置いて再試行し、可能なら別回線で切り分けが安全です。",
            "Q. 復旧までどれくらい？ → 一時的な過負荷なら短時間で戻ることもありますが、長時間続く場合は運営側のボトルネック解消が必要です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-524" />],
        },
      ]}
    />
  );
}