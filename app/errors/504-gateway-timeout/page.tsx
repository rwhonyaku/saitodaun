import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "504 Gateway Timeoutとは？原因と直し方 | サイトダウン",
  description:
    "504 Gateway Timeout の意味、上流サーバーの遅延・障害・DB/API遅延などの原因、ユーザー側でできる対処、運営者側の改善ポイントを解説します。",
};

export default function Error504GatewayTimeoutPage() {
  return (
    <EvergreenPageShell
      h1="504 Gateway Timeoutとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "504 Gateway Timeout は「中継役（ゲートウェイ／プロキシ）が、上流サーバーの応答を待ちきれずタイムアウトした」ことを示すエラーです。",
        "502が“不正な応答”、504が“応答が遅すぎる（時間切れ）”という違いです。多くの場合、原因はサイト側（サーバー／バックエンドの遅延）にあります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：504が出たときに起きていること",
          items: [
            "上流サーバー（アプリ/DB/API）が遅い、または固まっている",
            "中継（Cloudflare/Nginx/ロードバランサ）が待機時間上限に達した",
            "結果として、ユーザーには「時間切れ」でエラーが返る",
          ],
        },

        // Convert pseudo-bullets into real list for readability/quality
        {
          type: "list",
          title: "504 Gateway Timeoutの主な原因（サイト側）",
          items: [
            "DB遅延：ロック、スロークエリ、接続数逼迫",
            "アプリ遅延：重い処理（集計・変換・外部API待ち）を同期で実行している",
            "外部API障害・遅延：決済、認証、地図などの外部サービス応答が遅い",
            "サーバーリソース不足：CPU/メモリ不足で処理が進まない",
            "ネットワーク/上流障害：上流ホストへの到達性が不安定（瞬断・パケットロス）",
            "CDN/WAF/ロードバランサ設定：タイムアウト値が短すぎる、上流との相性問題",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 時間を置いて再試行（負荷が落ちると通ることがある）",
            "2) 別回線で試す（ISP/地域差の切り分け）",
            "3) ページを軽くする：別ページに移動→戻る、画像/動画が多いページなら少し時間を空ける",
            "4) 公式ステータスやSNSで障害情報を確認",
          ],
        },

        {
          type: "p",
          title: "502や503とどう見分けるか",
          body: [
            "504 は『上流から返事が遅すぎる』ときに出やすく、502 は『返ってきた応答が不正』、503 は『一時的に処理を受けられない』場面で出やすいのが違いです。",
            <>
              同じゲートウェイ系でも、{" "}
              <Link
                href="/errors/502-bad-gateway"
                className="underline hover:no-underline"
              >
                502 Bad Gateway
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/503-service-unavailable"
                className="underline hover:no-underline"
              >
                503 Service Unavailable
              </Link>{" "}
              と見比べると、より近い原因を絞りやすくなります。
            </>,
          ],
        },

        {
          type: "list",
          title: "運営者側の改善ポイント（サイト管理者向け）",
          items: [
            "最優先：何が遅いかを特定（APM/ログで“遅いエンドポイント”を把握）",
            "DB：スロークエリ、インデックス、ロック、接続プールを確認（504の大半がここ絡み）",
            "外部API依存：タイムアウト設計・リトライ設計を見直し、可能なら非同期化（キュー/バックグラウンド処理）",
            "キャッシュ導入：ページキャッシュ／データキャッシュ（“同じ重い処理”の繰り返しを避ける）",
            "リソース増強：CPU/メモリ、ワーカー数、DBのスケール（短期回避として有効）",
            "タイムアウト設定見直し：中継（CDN/LB/Proxy）と上流（アプリ/DB）の整合を取る（延ばすだけでは根本解決にならない）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "504はサイト側要因が多いですが、経路や回線差で発生することもあります。外部地点からの疎通確認で切り分けしましょう。",
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
                「オンライン」判定なのに遅い／開けない場合は、回線/DNSの可能性もあります。
              </p>
            </div>,
          ],
        },

        {
          type: "p",
          title: "読み込みが止まり続ける症状との関係",
          body: [
            "504 は、ユーザーから見ると『読み込み中のまま止まる』『しばらく待ったあと失敗する』形で見えることがあります。",
            <>
              症状ベースで確認したい場合は{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトがずっと読み込み中のまま終わらない原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },

        // Add FAQ to reduce "thin" perception and match intent
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 504と502の違いは？ → 504は「上流の応答が遅すぎて時間切れ」、502は「中継役が上流から正しい応答を受け取れない（不正/空/遮断など）」が主な違いです。",
            "Q. リロード連打は有効ですか？ → 混雑や遅延時は逆効果になりやすいです。時間を置いて再試行し、可能なら別回線で切り分けるのが安全です。",
            "Q. 特定のページだけ504になります。なぜ？ → そのURLだけ重い処理（集計/検索/外部API待ち）が走っている可能性が高いです。運営者ならAPM/ログで該当エンドポイントを確認します。",
            "Q. どれくらい待てば直りますか？ → 一時的な過負荷なら数分〜数十分で戻ることがあります。長時間続く場合は運営側のボトルネック/障害の可能性が高いです。",
          ],
        },

        // Related cluster links (keep only this system to avoid redundancy)
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="504-gateway-timeout"
            />,
          ],
        },
      ]}
    />
  );
}
